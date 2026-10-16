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

## Rebuild skills.json

After new skills land under `/home/box/agent-data/workflows/*/SKILL.md`:

```bash
python3 build_skills.py
```

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
- `skills.json` — generated data
- `build_skills.py` — parser (read-only over workflows)
