#!/bin/bash

# Script to delete Demo2AISupChn and Demo3AISupChn
# Keeping AISupChn2 as requested

echo "🗑️  Starting repository cleanup..."
echo "=================================="

# Extract GitHub credentials from existing repo
cd /tmp/demo4aisupchn
REMOTE_URL=$(git remote get-url origin)
GITHUB_TOKEN=$(echo $REMOTE_URL | grep -oP '(?<=:)[^@]+(?=@)' | sed 's/.*://')
GITHUB_USER="testdemoqwenai2025-creator"

echo ""
echo "📋 Repositories to DELETE:"
echo "1. Demo2AISupChn (Public) - https://github.com/${GITHUB_USER}/Demo2AISupChn"
echo "2. Demo3AISupChn (Local)  - /tmp/demo3aisupchn/"
echo ""
echo "♻️  Repository to KEEP:"
echo "✅ AISupChn2 (Private)   - /tmp/aisupchn2-source/"

echo ""
read -p "⚠️  Are you sure you want to proceed with deletion? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Deletion cancelled."
    exit 1
fi

echo ""
echo "🗑️  Deleting Demo2AISupChn (GitHub repository)..."
DELETE_RESPONSE=$(curl -s -X DELETE \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/${GITHUB_USER}/Demo2AISupChn")

if [ -z "$DELETE_RESPONSE" ]; then
    echo "✅ Demo2AISupChn deleted successfully from GitHub!"
else
    echo "❌ Error deleting Demo2AISupChn: $DELETE_RESPONSE"
fi

echo ""
echo "🗑️  Removing Demo3AISupChn (local directory)..."
if [ -d "/tmp/demo3aisupchn" ]; then
    rm -rf /tmp/demo3aisupchn
    echo "✅ Demo3AISupChn local directory removed!"
else
    echo "⚠️  Demo3AISupChn directory not found at /tmp/demo3aisupchn"
fi

echo ""
echo "🔍 Verifying deletions..."
echo ""

# Check if Demo2AISupChn still exists on GitHub
CHECK_DEMO2=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/${GITHUB_USER}/Demo2AISupChn")

if [ "$CHECK_DEMO2" = "404" ]; then
    echo "✅ Confirmed: Demo2AISupChn no longer exists on GitHub"
else
    echo "⚠️  Warning: Demo2AISupChn may still exist (HTTP $CHECK_DEMO2)"
fi

# Check if demo3 directory still exists locally
if [ ! -d "/tmp/demo3aisupchn" ]; then
    echo "✅ Confirmed: Demo3AISupChn local directory removed"
else
    echo "⚠️  Warning: Demo3AISupChn directory may still exist"
fi

# Confirm AISupChn2 is preserved
if [ -d "/tmp/aisupchn2-source" ]; then
    echo "✅ Confirmed: AISupChn2 private repository preserved"
else
    echo "⚠️  Note: AISupChn2 directory not found at expected location"
fi

echo ""
echo "=================================="
echo "✅ Repository cleanup completed!"
echo "=================================="
echo ""
echo "📊 Final Status:"
echo "• Deleted: Demo2AISupChn (GitHub), Demo3AISupChn (Local)"
echo "• Preserved: AISupChn2 (Private)"
echo "• Active: Demo4AISupChn, Demo5AISupChn, AISupChn4, AISupChn5"
