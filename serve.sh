#!/usr/bin/env bash
cd "$(dirname "$0")"
PORT="${1:-8765}"
echo "Skill Library → http://127.0.0.1:${PORT}/"
exec python3 -m http.server "$PORT"
