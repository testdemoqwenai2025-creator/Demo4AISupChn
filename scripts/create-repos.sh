#!/bin/bash

# Extract GitHub credentials from existing repo
cd /tmp/demo4aisupchn
REMOTE_URL=$(git remote get-url origin)
GITHUB_TOKEN=$(echo $REMOTE_URL | grep -oP '(?<=:)[^@]+(?=@)' | sed 's/.*://')
GITHUB_USER="testdemoqwenai2025-creator"

echo "Creating Demo5AISupChn (public repository)..."
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"Demo5AISupChn\",
    \"description\": \"AI Supply Chain Platform v5 - Next Generation Procurement Automation\",
    \"private\": false,
    \"has_issues\": true,
    \"has_projects\": true,
    \"has_wiki\": true,
    \"auto_init\": false
  }" | jq '{name, html_url, private, created_at}'

echo ""
echo "Creating AISupChn5 (private repository)..."
curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{
    \"name\": \"AISupChn5\",
    \"description\": \"AI Supply Chain Private Platform v5 - Enterprise Edition\",
    \"private\": true,
    \"has_issues\": true,
    \"has_projects\": true,
    \"has_wiki\": true,
    \"auto_init\": false
  }" | jq '{name, html_url, private, created_at}'
