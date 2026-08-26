#!/bin/bash

# Extract GitHub credentials from existing repo
cd /tmp/demo4aisupchn
REMOTE_URL=$(git remote get-url origin)
GITHUB_TOKEN=$(echo $REMOTE_URL | grep -oP '(?<=:)[^@]+(?=@)' | sed 's/.*://')
GITHUB_USER="testdemoqwenai2025-creator"

echo "Cloning Demo4AISupChn to Demo5AISupChn..."
cd /tmp
git clone --bare https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/Demo4AISupChn.git demo5-temp
cd demo5-temp
git push --mirror https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/Demo5AISupChn.git
cd /tmp
rm -rf demo5-temp

echo "✅ Demo5AISupChn cloned successfully!"

echo ""
echo "Cloning AISupChn4 to AISupChn5..."
cd /tmp/aisupchn4-source/working-copy
git remote get-url origin
# Clone from the working copy's origin (which is AISupChn4)
cd /tmp
git clone --bare https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/AISupChn.git aisup5-temp
cd aisup5-temp
git push --mirror https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/AISupChn5.git
cd /tmp
rm -rf aisup5-temp

echo "✅ AISupChn5 cloned successfully!"
