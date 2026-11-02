#!/usr/bin/env bash
# Rebuild everything (skills.json, agent files, embeddings) and publish to GitHub Pages.
# Safe to re-run: if nothing changed it skips the commit and push, then just checks the live site.
# Auth: uses GH_TOKEN (or GITHUB_TOKEN) from the environment, else your `gh auth login` session.
set -euo pipefail
cd "$(dirname "$0")"
OWNER="${OWNER:-retrend}"
REPO="${REPO:-grok-skill-library}"
URL="https://$OWNER.github.io/$REPO/"
export GH_TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
[ -n "$GH_TOKEN" ] || unset GH_TOKEN

# 1. Build
[ -d node_modules/@xenova/transformers ] || npm i --no-save --prefix "$PWD" @xenova/transformers@2.17.2 >/dev/null
SITE_URL="$URL" python3 build_skills.py
node build_embeddings.mjs
# Library tab: always built from the real catalogue (read-only). Missing or empty file -> empty library.json.
unset LIBRARY_CATALOG LIBRARY_OUT
python3 build_library.py
node build_library_embeddings.mjs
touch .nojekyll   # serve skills/*.md raw instead of letting Jekyll render them
LOCAL_COUNT="$(python3 -c "import json;print(json.load(open('index.json'))['count'])")"

# 2. Commit (only if something changed)
gh auth status >/dev/null 2>&1 || { echo "Not signed in to GitHub. Set GH_TOKEN or run: gh auth login"; exit 1; }
gh repo view "$OWNER/$REPO" >/dev/null 2>&1 || { echo "Repo $OWNER/$REPO not found or not accessible."; exit 1; }
[ -d .git ] || git init -q -b main
git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO.git"
git add -A index.html app.js ask.js library.js styles.css skills.json embeddings.json index.json llms.txt llms-full.txt \
  library.json library-embeddings.json build_library.py build_library_embeddings.mjs \
  skills .nojekyll build_skills.py build_embeddings.mjs deploy.sh serve.sh README.md .gitignore
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git -c user.name="$OWNER" -c user.email="$OWNER@users.noreply.github.com" commit -qm "Update skill library $(date +%F) ($LOCAL_COUNT skills)"
fi

# 3. Push (only if ahead of the remote)
git -c credential.helper= -c 'credential.helper=!gh auth git-credential' fetch -q origin main || true
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main 2>/dev/null || echo none)" ]; then
  git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push -q -u origin main
  echo "Pushed to $OWNER/$REPO."
else
  echo "Remote already up to date."
fi

# 4. Wait until the live index.json shows the local count
echo "Checking $URL (expecting $LOCAL_COUNT skills)…"
for _ in $(seq 1 36); do
  LIVE="$(curl -sf "${URL}index.json?t=$(date +%s)" 2>/dev/null \
    | python3 -c "import json,sys
try: print(json.load(sys.stdin)['count'])
except Exception: print('')" 2>/dev/null || true)"
  if [ "$LIVE" = "$LOCAL_COUNT" ]; then echo "Live: $LIVE skills at $URL"; exit 0; fi
  sleep 10
done
echo "Pushed, but Pages still shows '${LIVE:-nothing}' after 6 min. Check $URL shortly."
