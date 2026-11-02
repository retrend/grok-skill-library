#!/usr/bin/env python3
"""Convert Library Scout's catalog.jsonl into library.json for the Library tab.

Read-only over the catalogue. Safe to re-run: if the entries are unchanged, library.json
is left as it is (generatedAt stays the same).

  python3 build_library.py
  LIBRARY_CATALOG=/tmp/library-test/catalog.jsonl python3 build_library.py
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CATALOG = Path(os.environ.get("LIBRARY_CATALOG", "/workspace/library-catalog/catalog.jsonl"))
OUT = Path(os.environ.get("LIBRARY_OUT", ROOT / "library.json"))

sys.path.insert(0, str(ROOT))
from build_skills import secret_hits  # noqa: E402  same scan as the skills build

TYPES = ["skill", "agent", "bot", "plugin", "template", "prompt"]
STATUSES = ["new", "starred", "skip"]
OWN_RE = re.compile(
    r"already\s+(own|have|present|installed)|\bwe\s+own\b|have\s+a\s+matching\s+skill|duplicate\s+of",
    re.I,
)
TEXT_FIELDS = ["name", "summary", "use_when", "source_site", "author", "licence", "found_on", "notes"]


def text(v) -> str:
    if v is None:
        return ""
    if isinstance(v, (list, tuple)):
        return ", ".join(text(x) for x in v if text(x))
    return re.sub(r"\s+", " ", str(v)).strip()


def tags_of(v) -> list[str]:
    if isinstance(v, str):
        items = v.split(",")
    elif isinstance(v, (list, tuple)):
        items = [x for x in v if isinstance(x, (str, int, float))]
    else:
        items = []
    out: list[str] = []
    for t in items:
        t = re.sub(r"\s+", "-", str(t).strip().lower().lstrip("#"))
        if t and t not in out:
            out.append(t)
    return out


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:80] or "entry"


def safe_url(v) -> str:
    u = text(v)
    return u if re.match(r"^https?://[^\s]+$", u, re.I) else ""


def normalise(raw: dict) -> dict | None:
    e = {k: text(raw.get(k)) for k in TEXT_FIELDS}
    if not e["name"]:
        e["name"] = text(raw.get("id"))
    if not e["name"]:
        return None
    typ = text(raw.get("type")).lower()
    status = text(raw.get("status")).lower()
    e["id"] = slug(text(raw.get("id")) or e["name"])
    e["type"] = typ if typ in TYPES else ("other" if typ else "other")
    e["status"] = status if status in STATUSES else "new"
    e["tags"] = tags_of(raw.get("tags"))
    e["source_url"] = text(raw.get("source_url"))
    e["link"] = safe_url(raw.get("source_url"))
    e["alreadyOwn"] = bool(OWN_RE.search(e["notes"]))
    return e


def main() -> None:
    entries: list[dict] = []
    blank = 0
    bad: list[int] = []
    excluded: list[str] = []
    if not CATALOG.exists():
        print(f"Catalogue not found at {CATALOG}; writing an empty library.json")
        lines: list[str] = []
    else:
        lines = CATALOG.read_text(encoding="utf-8", errors="replace").splitlines()
    seen: set[str] = set()
    for n, line in enumerate(lines, 1):
        if not line.strip():
            blank += 1
            continue
        try:
            raw = json.loads(line)
        except json.JSONDecodeError:
            bad.append(n)
            continue
        e = normalise(raw) if isinstance(raw, dict) else None
        if e is None:
            bad.append(n)
            continue
        hits = secret_hits(json.dumps(raw, ensure_ascii=False))
        if hits:
            excluded.append(f"{e['id']} (line {n}: {', '.join(hits)})")
            continue
        base, i = e["id"], 2
        while e["id"] in seen:
            e["id"] = f"{base}-{i}"
            i += 1
        seen.add(e["id"])
        entries.append(e)

    content_hash = hashlib.sha256(json.dumps(entries, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    try:
        old = json.loads(OUT.read_text(encoding="utf-8"))
        unchanged = old.get("contentHash") == content_hash
    except Exception:
        old, unchanged = {}, False
    if unchanged:
        print(f"library.json up to date ({len(entries)} entries)")
    else:
        data = {
            "name": "Grok Bot Skill Library: catalogue",
            "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "contentHash": content_hash,
            "count": len(entries),
            "entries": entries,
        }
        OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"Wrote {OUT.name}: {len(entries)} entries")
    if blank:
        print(f"Skipped {blank} blank line(s)")
    if bad:
        print(f"Skipped {len(bad)} malformed line(s): {', '.join(map(str, bad))}")
    for x in excluded:
        print(f"EXCLUDED {x}")


if __name__ == "__main__":
    main()
