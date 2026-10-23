#!/bin/bash
# Rebuilda o academy e publica o resultado em ../academy (a pasta que vai para o ar).
# Uso:  bash _academy-src/publicar.sh
set -e
cd "$(dirname "$0")"
echo "==> build"
npx next build
echo "==> publicando em ../academy"
rm -rf ../academy
cp -R out ../academy
echo "==> pronto. Agora: git add -A && git commit && git push"
