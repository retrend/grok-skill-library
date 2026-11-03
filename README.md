# Skill Library — Grok Bot

Searchable browser for Steven Calvert’s Grok Bot skill library (Tweet → Skill).

## Open locally

```bash
cd /workspace/skill-browser
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/

Or use the helper:

```bash
./serve.sh
```

Live: https://retrend.github.io/grok-skill-library/

## Rebuild and publish (one command)

After new skills land under `/home/box/agent-data/workflows/*/SKILL.md`:

```bash
cd /workspace/skill-browser && GH_TOKEN="$GITHUB_TOKEN" ./deploy.sh
```

It rebuilds everything, commits and pushes only if something changed, then waits until the live
`index.json` count matches the local build. Re-running with no changes is safe. The daily routine runs
this same command; the build also regenerates `webmcp.json` and `.well-known/mcp.json`, and the deploy
commits `webmcp.js`, `webmcp.json` and `.well-known/`.

Build only (no push):

```bash
python3 build_skills.py && node build_embeddings.mjs
python3 build_library.py && node build_library_embeddings.mjs
```

Any SKILL.md that looks like it holds a key, token, password, email address or phone number is
left out of the build and listed as `EXCLUDED <id>` in the output.

## Library tab

The **Library** tab (`#library`) lists outside finds from Library Scout's catalogue:
skills, agents, bots, plugins, templates and prompts.

- Source: `/workspace/library-catalog/catalog.jsonl`, one JSON object per line. Library Scout owns it;
  the build only reads it. Override the path with `LIBRARY_CATALOG=/path/to/catalog.jsonl`.
- `build_library.py` writes `library.json`. Blank and malformed lines are skipped and counted, tags can
  be a list or a comma string, unknown types become `other`, unknown statuses become `new`. Entries
  that trip the same key/personal-details scan as the skills are left out (`EXCLUDED`). If the entries
  haven't changed, the file isn't rewritten. A missing or empty catalogue gives an empty
  `library.json` and the tab shows "Catalogue is empty".
- `build_library_embeddings.mjs` writes `library-embeddings.json` (one vector per entry, same model),
  so **Ask** answers across both, labelled **Skill** or **Library · type**. Entries with status
  `skip` are left out of Ask. If the file is missing, the browser embeds the entries itself.
- Search covers name, summary, use_when, tags and author. Filters: type, tag, status (skipped hidden by
  default) and **Already own** (notes mention "already own", "already have", "already present",
  "we own", "have a matching skill" or "duplicate of").
- Links: `#library` opens the tab, `#library/<id>` jumps to one entry, `#skill/<id>` still opens a skill.
- All catalogue text is shown as plain text. Only `http(s)` source URLs become links.

Test build with a sample catalogue: `LIBRARY_CATALOG=/tmp/library-test/catalog.jsonl python3 build_library.py`

## For AI agents

| URL | What |
|-----|------|
| `llms.txt` | How to use the library, plus one line per skill |
| `index.json` | id, name, description, tags, sources, url, updated (no bodies) |
| `skills/<id>.md` | Raw SKILL.md for one skill |
| `llms-full.txt` | All skills in one file |
| `library.json` | Library catalogue entries (outside finds, not your skills) |

Agents should fetch `index.json`, match the task against `description` (each starts with
"Use this when"), then fetch `skills/<id>.md`.

## WebMCP

`webmcp.js` registers read-only tools through `navigator.modelContext` when the page is opened in a
WebMCP-capable browser. There is no server endpoint; the tools run in the page and only read this
site's own files.

| Tool | Inputs | What |
|------|--------|------|
| `search_skills` | `query`, `limit` | Keyword search over skills |
| `get_skill` | `id` | Full SKILL.md plus metadata for one skill |
| `list_skills` | `tag`, `source` | Compact list of all skills, optionally filtered |
| `search_library` | `query`, `type`, `need`, `licence`, `limit` | Keyword search over the Library catalogue |
| `get_library_entry` | `id` | One catalogue entry |

- `webmcp.json` and `.well-known/mcp.json` are the same manifest (tool names, descriptions, input schemas),
  written by `build_skills.py` from its `WEBMCP_TOOLS` list. `llms.txt` lists the tools under "WebMCP tools".
- Search in the tools is keyword-only (no embeddings), so it works without loading the model.
- Change a tool in both `webmcp.js` and `WEBMCP_TOOLS` in `build_skills.py`.

## Keyboard

| Key | Action |
|-----|--------|
| `/` | Focus search |
| `Esc` | Close detail / clear |
| `j` / `↓` | Next skill (browse) |
| `k` / `↑` | Previous skill (browse) |
| `Enter` | Open focused card |
| `j` / `→` | Next in detail |
| `k` / `←` | Previous in detail |
| `r` | Random skill |

## Files

- `index.html` / `styles.css` / `app.js` — SPA
- `skills.json` — generated data for the SPA
- `embeddings.json` — vectors for the Ask chat (`build_embeddings.mjs`)
- `index.json`, `llms.txt`, `llms-full.txt`, `skills/*.md` — generated files for AI agents
- `build_skills.py` — parser and secret scan (read-only over workflows)
- `library.js` — Library tab
- `build_library.py`, `build_library_embeddings.mjs` — catalogue → `library.json`, `library-embeddings.json`
- `webmcp.js` — WebMCP tool registration
- `webmcp.json`, `.well-known/mcp.json` — generated WebMCP manifest
- `deploy.sh` — build, commit, push, verify
