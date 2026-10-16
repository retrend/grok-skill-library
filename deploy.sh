#!/usr/bin/env bash
# Rebuild skills.json + embeddings.json, then push to GitHub Pages.
# One-time setup: gh auth login (scopes: repo), then run this script.
set -euo pipefail
cd "$(dirname "$0")"
REPO="${REPO:-grok-skill-library}"
[ -d node_modules/@xenova/transformers ] || npm i --no-save @xenova/transformers@2.17.2
python3 build_skills.py
node build_embeddings.mjs
gh auth status >/dev/null 2>&1 || { echo "Not logged in to GitHub. Run: gh auth login"; exit 1; }
OWNER="$(gh api user -q .login)"
[ -d .git ] || { git init -q -b main; }
git add index.html app.js ask.js styles.css skills.json embeddings.json build_skills.py build_embeddings.mjs deploy.sh README.md .gitignore
git -c user.name="$OWNER" -c user.email="$OWNER@users.noreply.github.com" commit -qm "Update skill library $(date +%F)" || echo "No changes to commit"
if ! gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  gh repo create "$OWNER/$REPO" --public --source . --remote origin --push
  gh api -X POST "repos/$OWNER/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null
else
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$OWNER/$REPO.git"
  git push -u origin main
fi
URL="https://$OWNER.github.io/$REPO/"
echo "Waiting for Pages: $URL"
for i in $(seq 1 30); do
  if curl -sf "${URL}skills.json" | python3 -c "import json,sys;print(len(json.load(sys.stdin)['skills']),'skills live')"; then exit 0; fi
  sleep 10
done
echo "Pushed; Pages may still be building. Check $URL"
