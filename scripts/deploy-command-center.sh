#!/bin/bash
set -e

echo "🎛️ Deploying Enhanced Command Center to Demo4AISupChn..."
echo "================================================"

# Change to deployment directory
cd /tmp/demo4aisupchn

echo "📁 Current directory: $(pwd)"
echo "📋 Git remote: $(git remote get-url origin)"
echo "🌿 Current branch: $(git branch --show-current)"

# Check if command-center.html exists and show size
if [ -f "command-center.html" ]; then
    echo "✅ command-center.html found ($(ls -lh command-center.html | awk '{print $5}'))"
else
    echo "❌ command-center.html not found!"
    exit 1
fi

# Show git status
echo ""
echo "📊 Git Status:"
git status --short

# Add modified files
echo ""
echo "➕ Adding changes..."
git add command-center.html

# Commit with detailed message
echo ""
echo "💾 Committing changes..."
git commit -m "🎛️ ENHANCED COMMAND CENTER - Procurement Automation Hub v3.0:

🚀 NEW FEATURES:
📋 Tender Management System
- Create, publish, and track tenders with AI suggestions  
- Auto-fill from Yahoo Finance, Reuters, AP News APIs
- Bid management and evaluation workflows

📦 Purchase Order Generator
- Quick PO creation with smart auto-fill
- Supplier data fetching (integrated databases)
- Market price integration (Alpha Vantage free tier)
- Currency conversion (OpenExchangeRates API)
- Payment terms and shipping method selection

📝 Smart Template Library (50+ Templates)
- RFP (Request for Proposal) with scoring matrix
- Purchase Orders with terms & conditions
- Supply Agreement Contracts with SLAs
- Quote Request Forms with specifications
- Invoice Templates with tax calculations
- Vendor Evaluation Scorecards (weighted criteria)
- NDA (Non-Disclosure Agreements)
- Technical Specification Sheets

⚡ Automation Rules Engine
- Auto-approve orders under configurable threshold
- Price alert notifications (>5% fluctuation via Yahoo Finance)
- Supplier risk monitoring (Reuters & AP News feeds)
- Predictive reordering suggestions (Pro feature)
- Multi-currency hedging recommendations (Enterprise)

🌐 REAL API INTEGRATIONS (Free Tiers Active):
• Yahoo Finance API - Stock quotes, commodity prices (500/day free)
• Reuters News API - Breaking news, market analysis (250/day free)  
• Associated Press API - Global coverage, disaster alerts (100/day free)
• Alpha Vantage API - Forex rates, technical indicators (25/day free)
• OpenExchangeRates API - 170+ currencies updated hourly (1,000/month free)
• Bloomberg Public Endpoints - Limited market data access

💰 SUBSCRIPTION SYSTEM:
⭐ Free Tier (\$0/mo): 1,000 API calls/day, 8 templates, basic features
⚡ Pro Tier (\$49/mo): 25,000 API calls/day, 50+ templates, advanced automations
🏢 Enterprise (Custom): Unlimited everything, dedicated support, SLA guarantee

🛡️ GUARDRAIL SYSTEM v3.0:
• Integrity checks every 30 seconds
• Auto-backup every 5 minutes  
• Corruption detection and prevention
• Version control integration ready
• Rollback capabilities enabled

📊 Analytics Dashboard:
- Spend analytics with trend visualization
- Category breakdown with insights
- Supplier performance rankings
- Cost savings tracking
- AI-powered procurement recommendations

Design: Glass morphism UI | Dark/Light theme support | Mobile responsive
Security: Data validation | Input sanitization | XSS protection" 

# Push to GitHub Pages
echo ""
echo "🚀 Pushing to GitHub Pages..."
git push origin gh-pages

echo ""
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "🔗 Live URL: https://testdemoqwenai2025-creator.github.io/Demo4AISupChn/command-center.html"
echo ""
echo "⏱️  GitHub Pages will update within 30 seconds"
echo "🎉 Your enhanced Command Center is now live!"
