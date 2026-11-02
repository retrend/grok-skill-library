#!/usr/bin/env python3
"""Parse all SKILL.md files into skills.json for the skill browser."""
from __future__ import annotations

import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

WORKFLOWS = Path("/home/box/agent-data/workflows")
ROOT = Path(__file__).resolve().parent
OUT = ROOT / "skills.json"
SITE_URL = os.environ.get("SITE_URL", "https://retrend.github.io/grok-skill-library/").rstrip("/") + "/"

# Files matching any of these are left out of the public build (reported on stdout).
SECRET_PATTERNS = [
    ("github-token", r"gh[pousr]_[A-Za-z0-9]{20,}"),
    ("github-pat", r"github_pat_[A-Za-z0-9_]{20,}"),
    ("sk-api-key", r"\bsk-[A-Za-z0-9_-]{20,}"),
    ("slack-token", r"xox[abprs]-[A-Za-z0-9-]{10,}"),
    ("aws-key", r"AKIA[0-9A-Z]{16}"),
    ("google-key", r"AIza[0-9A-Za-z_-]{30,}"),
    ("private-key", r"-----BEGIN [A-Z ]*PRIVATE KEY"),
    ("bearer-token", r"(?i)bearer\s+[A-Za-z0-9._-]{24,}"),
    ("key-assignment", r"(?i)(api[_-]?key|secret|token|password)\s*[:=]\s*['\"]?[A-Za-z0-9/+_.-]{16,}"),
    ("email", r"[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z0-9.-]*[A-Za-z]{2,}"),
    ("phone", r"(?<![\d/=-])\+\d{1,3}[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}(?!\d)"),
]


def secret_hits(text: str) -> list[str]:
    return [label for label, pat in SECRET_PATTERNS if re.search(pat, text)]

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
    """Return the '# Source(s)' section (any heading level), else any 'Source:' lines."""
    m = re.search(r"^(#{1,4})\s+Sources?\b[^\n]*$", body, re.MULTILINE | re.IGNORECASE)
    if m:
        rest = body[m.end() :]
        next_h = re.search(r"^#{1,%d}\s+" % len(m.group(1)), rest, re.MULTILINE)
        if next_h:
            rest = rest[: next_h.start()]
        return rest.strip()
    lines = re.findall(r"^\W{0,4}Sources?\W{0,4}:.*$", body, re.MULTILINE | re.IGNORECASE)
    return "\n".join(lines).strip() or None


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
    excluded: list[tuple[str, list[str]]] = []
    raws: dict[str, str] = {}
    for skill_path in sorted(WORKFLOWS.glob("*/SKILL.md")):
        folder = skill_path.parent.name
        raw = skill_path.read_text(encoding="utf-8")
        hits = secret_hits(raw)
        if hits:
            excluded.append((folder, hits))
            continue
        raws[folder] = raw
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

    # Deterministic: newest skill's mtime, so a rebuild with no skill changes produces identical files.
    generated = max((s["mtime"] for s in skills), default=datetime.now(timezone.utc).isoformat())
    OUT.write_text(json.dumps({"generatedAt": generated, "count": len(skills), "skills": skills}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(skills)} skills → {OUT}")
    write_agent_files(skills, raws, generated)
    if excluded:
        for folder, hits in excluded:
            print(f"EXCLUDED {folder}: possible secret/personal data ({', '.join(hits)})")
    missing = [s["id"] for s in skills if not s["hasSource"]]
    if missing:
        print(f"Missing Source section ({len(missing)}): {', '.join(missing)}")
    else:
        print("All skills have a Source section.")


def write_agent_files(skills: list[dict], raws: dict[str, str], generated: str) -> None:
    """Emit skills/<id>.md, index.json, llms.txt, llms-full.txt for AI agents."""
    sdir = ROOT / "skills"
    sdir.mkdir(exist_ok=True)
    keep = {f"{s['id']}.md" for s in skills}
    for old in sdir.glob("*.md"):
        if old.name not in keep:
            old.unlink()
    for s in skills:
        (sdir / f"{s['id']}.md").write_text(raws[s["id"]], encoding="utf-8")

    by_name = sorted(skills, key=lambda s: s["id"])
    index = {
        "name": "Grok Bot Skill Library",
        "site": SITE_URL,
        "generatedAt": generated,
        "count": len(by_name),
        "skills": [
            {
                "id": s["id"],
                "name": s["name"],
                "description": s["description"],
                "tags": s["tags"],
                "sources": s["sourceUrls"],
                "url": f"{SITE_URL}skills/{s['id']}.md",
                "updated": s["mtime"][:10],
            }
            for s in by_name
        ],
    }
    (ROOT / "index.json").write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    lines = [
        "# Grok Bot Skill Library",
        "",
        f"> {len(by_name)} reusable playbooks (skills) for marketing, content, SEO/AI search, outreach, ads, design and AI-agent workflows.",
        "> Each skill is a Markdown file with YAML front matter (name, description) and step-by-step instructions.",
        "",
        "## How to use this library",
        "",
        f"1. Fetch the index (one call, no bodies): {SITE_URL}index.json",
        "   Fields per skill: id, name, description, tags, sources, url, updated.",
        "2. Pick skills by matching your task against `description`. Every description starts with",
        "   'Use this when ...', so treat it as the trigger condition. `tags` help narrow by topic.",
        f"3. Fetch the full skill as raw Markdown: {SITE_URL}skills/<id>.md",
        "4. Follow the skill's steps. Skills may link to each other by id; fetch those the same way.",
        "",
        f"All skills in one file: {SITE_URL}llms-full.txt",
        f"Human browser with search: {SITE_URL}",
        f"Last skill update: {generated[:10]}",
        "",
        "## Skills",
        "",
    ]
    for s in by_name:
        lines.append(f"- [{s['id']}]({SITE_URL}skills/{s['id']}.md): {s['description']}")
    (ROOT / "llms.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")

    full = [f"# Grok Bot Skill Library (full text, {len(by_name)} skills)", f"Index: {SITE_URL}index.json", ""]
    for s in by_name:
        full += ["", "=" * 72, f"# skill: {s['id']}", f"# url: {SITE_URL}skills/{s['id']}.md", "=" * 72, "", raws[s["id"]].rstrip(), ""]
    (ROOT / "llms-full.txt").write_text("\n".join(full) + "\n", encoding="utf-8")
    print(f"Wrote skills/*.md ({len(by_name)}), index.json, llms.txt, llms-full.txt")


if __name__ == "__main__":
    main()
