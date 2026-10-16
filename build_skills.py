#!/usr/bin/env python3
"""Parse all SKILL.md files into skills.json for the skill browser."""
from __future__ import annotations

import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

WORKFLOWS = Path("/home/box/agent-data/workflows")
OUT = Path(__file__).resolve().parent / "skills.json"

# Keyword → tag mapping (checked against name + description + body head)
TAG_RULES: list[tuple[str, list[str]]] = [
    ("agents", [r"\bagents?\b", r"\bsubagents?\b", r"\bgrok bot\b", r"\bclassifier\b", r"\borchestrat"]),
    ("content", [r"\bcontent\b", r"\bhooks?\b", r"\btiktok\b", r"\bshorts\b"]),
    ("seo", [r"\bseo\b", r"\baeo\b", r"\bgsc\b", r"\bstriking.?distance\b"]),
    ("ai-search", [r"\bai search\b", r"\binformation.?gain\b", r"\bcitations?\b", r"\baeo\b"]),
    ("youtube", [r"\byoutube\b", r"\bshorts\b", r"\bfaceless\b"]),
    ("landing-pages", [r"\blanding pages?\b", r"\blanding page\b", r"\bmobbin\b"]),
    ("design", [r"\btypography\b", r"\bfont presets?\b", r"\bdesign patterns?\b", r"\bresearch-first\b"]),
    ("outreach", [r"\blinkedin\b", r"\boutbound\b", r"\bleads?\b"]),
    ("ads", [r"\bmeta ads\b", r"\bfacebook ads\b", r"\bmarketing api\b", r"\bads mcp\b"]),
    ("verification", [r"\bverification\b", r"\bpstack\b", r"\bpoteto-mode\b"]),
    ("workflows", [r"\bcodex\b", r"\bremote workflow\b", r"\bbuzz\b"]),
    ("prompting", [r"\bindirect prompts?\b", r"\bcompound skills?\b", r"\bprompt pack\b"]),
    ("ugc", [r"\bugc\b", r"\btalking.?head\b"]),
    ("engineering", [r"\bpr smells?\b", r"\bcodebase\b", r"\bgardener\b", r"\blasting rules\b"]),
    ("tiktok", [r"\btiktok\b"]),
    ("shorts", [r"\bshorts\b"]),
]


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Minimal YAML frontmatter parser for name/description."""
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    fm_block = text[3:end].strip()
    body = text[end + 4 :].lstrip("\n")
    meta: dict = {}
    # Handle folded description (>-)
    lines = fm_block.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if ":" not in line:
            i += 1
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        if val in (">-", ">", "|", "|-"):
            # Collect folded/block scalar
            parts: list[str] = []
            i += 1
            while i < len(lines) and (lines[i].startswith("  ") or lines[i].startswith("\t") or lines[i] == ""):
                parts.append(lines[i].strip())
                i += 1
            meta[key] = " ".join(p for p in parts if p)
            continue
        # Strip quotes
        if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
            val = val[1:-1]
        meta[key] = val
        i += 1
    return meta, body


def extract_source_section(body: str) -> str | None:
    m = re.search(r"^##\s+Source\s*$", body, re.MULTILINE | re.IGNORECASE)
    if not m:
        return None
    rest = body[m.end() :]
    # Until next ## heading or end
    next_h = re.search(r"^##\s+", rest, re.MULTILINE)
    if next_h:
        rest = rest[: next_h.start()]
    return rest.strip()


def extract_urls(text: str) -> list[str]:
    urls = re.findall(r"https?://[^\s\)\]\>\"']+", text)
    # Dedupe preserving order
    seen = set()
    out = []
    for u in urls:
        u = u.rstrip(".,);")
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out


def extract_handles(text: str) -> list[str]:
    handles = re.findall(r"@([A-Za-z0-9_]{2,30})", text)
    # Also from x.com/handle/status URLs
    for m in re.finditer(r"(?:x\.com|twitter\.com)/([A-Za-z0-9_]{2,30})/", text):
        handles.append(m.group(1))
    seen = set()
    out = []
    for h in handles:
        key = h.lower()
        if key in ("status", "i", "intent", "share", "home", "search"):
            continue
        if key not in seen:
            seen.add(key)
            out.append("@" + h if not h.startswith("@") else h)
    return out


def derive_tags(name: str, description: str, body: str) -> list[str]:
    hay = f"{name}\n{description}\n{body[:2000]}".lower()
    tags = []
    for tag, patterns in TAG_RULES:
        for pat in patterns:
            if re.search(pat, hay, re.IGNORECASE):
                tags.append(tag)
                break
    # Always add a couple from name words if still thin
    if len(tags) < 2:
        for word in re.findall(r"[a-z]{4,}", name.lower()):
            if word not in ("with", "from", "then", "into", "only", "like", "this", "when", "that"):
                if word not in tags:
                    tags.append(word)
                if len(tags) >= 3:
                    break
    return tags[:8]


def word_count(text: str) -> int:
    return len(re.findall(r"\S+", text))


def main() -> None:
    skills = []
    for skill_path in sorted(WORKFLOWS.glob("*/SKILL.md")):
        folder = skill_path.parent.name
        raw = skill_path.read_text(encoding="utf-8")
        meta, body = parse_frontmatter(raw)
        name = meta.get("name") or folder.replace("-", " ").title()
        description = meta.get("description") or ""
        source_sec = extract_source_section(body)
        source_text = source_sec or ""
        # Also scan whole body for handles/urls if source missing
        search_src = source_text if source_text else body
        source_urls = extract_urls(search_src) if source_text else extract_urls(source_text)
        # Prefer source section URLs; if no Source section, leave empty (don't pollute with body links)
        if source_sec:
            source_urls = extract_urls(source_sec)
            handles = extract_handles(source_sec)
        else:
            source_urls = []
            handles = []

        mtime = datetime.fromtimestamp(skill_path.stat().st_mtime, tz=timezone.utc).isoformat()
        tags = derive_tags(name, description, body)
        skills.append(
            {
                "id": folder,
                "name": name,
                "description": description,
                "body": body,
                "sourceUrls": source_urls,
                "authors": handles,
                "tags": tags,
                "wordCount": word_count(body),
                "mtime": mtime,
                "hasSource": bool(source_sec),
            }
        )

    OUT.write_text(json.dumps({"generatedAt": datetime.now(timezone.utc).isoformat(), "count": len(skills), "skills": skills}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(skills)} skills → {OUT}")
    missing = [s["id"] for s in skills if not s["hasSource"]]
    if missing:
        print(f"Missing Source section ({len(missing)}): {', '.join(missing)}")
    else:
        print("All skills have a Source section.")


if __name__ == "__main__":
    main()
