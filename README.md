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
`index.json` count matches the local build. Re-running with no changes is safe.

Build only (no push): `python3 build_skills.py && node build_embeddings.mjs`

Any SKILL.md that looks like it holds a key, token, password, email address or phone number is
left out of the build and listed as `EXCLUDED <id>` in the output.

## For AI agents

| URL | What |
|-----|------|
| `llms.txt` | How to use the library, plus one line per skill |
| `index.json` | id, name, description, tags, sources, url, updated (no bodies) |
| `skills/<id>.md` | Raw SKILL.md for one skill |
| `llms-full.txt` | All skills in one file |

Agents should fetch `index.json`, match the task against `description` (each starts with
"Use this when"), then fetch `skills/<id>.md`.

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
- `deploy.sh` — build, commit, push, verify
