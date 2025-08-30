#!/usr/bin/env bash
set -euo pipefail

cd /app

if [ ! -f package.json ]; then
  npm create vite@latest . -- --template vue-ts
fi

npm i pinia vue-router@4 axios tailwindcss postcss autoprefixer @headlessui/vue @heroicons/vue
npx tailwindcss init -p

STUB_DIR=/app-stubs
if [ -d "$STUB_DIR" ]; then
  rsync -av --exclude node_modules "$STUB_DIR"/ .
fi

echo "Frontend initialized."

