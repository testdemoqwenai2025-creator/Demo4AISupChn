#!/bin/bash
set -e

echo "🚀 Deploying Enhanced Homepage to Demo4AISupChn..."
echo "================================================"

# Change to deployment directory
cd /tmp/demo4aisupchn

echo "📁 Current directory: $(pwd)"
echo "📋 Git remote: $(git remote get-url origin)"
echo "🌿 Current branch: $(git branch --show-current)"

# Check if index.html exists
if [ -f "index.html" ]; then
    echo "✅ index.html found ($(ls -lh index.html | awk '{print $5}'))"
else
    echo "❌ index.html not found!"
    exit 1
fi

# Show git status
echo ""
echo "📊 Git Status:"
git status --short

# Add modified files
echo ""
echo "➕ Adding changes..."
git add index.html

# Commit with detailed message
echo ""
echo "💾 Committing changes..."
git commit -m "✨ ENHANCED HOMEPAGE - Added all requested features:

🌙 Dark/Light Mode Toggle - Smooth theme switching with localStorage persistence
🔍 Search Bar - Expandable search with dropdown results, Ctrl/Cmd+K shortcut  
👤 Login Button - Styled authentication button ready for SSO integration
🟢 Get Started CTA - Prominent gradient call-to-action button
▾ Rich Dropdown Menus - Content from 8+ premium sources:

Platform: Yahoo Finance, WSJ, Reuters, ML/XAI capabilities
Solutions: AP News, Bloomberg, CNBC, RSS feeds, Industry-specific
Intelligence: Live news feeds, Financial markets, Risk alerts
Resources: Documentation, Research reports, External insights

Design: Glass morphism, Smooth animations, Mobile responsive, Keyboard shortcuts"

# Push to GitHub Pages
echo ""
echo "🚀 Pushing to GitHub Pages..."
git push origin gh-pages

echo ""
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "🔗 Live URL: https://testdemoqwenai2025-creator.github.io/Demo4AISupChn/"
echo ""
echo "⏱️  GitHub Pages will update within 30 seconds"
echo "🎉 Your enhanced homepage is now live with all new features!"
