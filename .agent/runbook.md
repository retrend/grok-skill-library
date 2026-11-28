# Runbook — `retrend/grok-skill-library`

## Ephemeral Cloud-First Worktree Flow
1. Fetch & branch in an isolated worktree:
   `git clone https://github.com/retrend/grok-skill-library.git C:\dev\_wt\grok-skill-library-work`
2. Run verification & secret checks before pushing:
   - Ensure zero files `> 5 MB` and zero `.env`/secret tokens staged.
   - Run project unit/smoke tests (see `.github/workflows/ci.yml`).
3. Push branch & open PR against `main`; remove ephemeral worktree once merged.
