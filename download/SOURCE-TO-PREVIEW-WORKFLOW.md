================================================================================
                    🔄 SOURCE-TO-PREVIEW WORKFLOW DOCUMENTATION
                    AISupChn5 (Private) → Demo5AISupChn (Public)
================================================================================

Generated: 2026-08-26
Workflow Version: 1.0
Status: ✅ READY FOR IMPLEMENTATION

================================================================================
                              📋 EXECUTIVE SUMMARY
================================================================================

This document describes the complete workflow for managing the AI Supply Chain
Platform using a dual-repository architecture:

┌─────────────────────────────────────────────────────────────┐
│                    WORKFLOW ARCHITECTURE                     │
│                                                             │
│   🔒 PRIVATE (Source Code)          🌐 PUBLIC (Preview)     │
│   ──────────────────────           ───────────────────      │
│   Repository: AISupChn5            Repository: Demo5AISupChn│
│   Access: Authorized only          Access: Anyone (24/7)    │
│   Content: Full source code        Content: Built output    │
│   Purpose: Development             Purpose: Client preview  │
│                                                             │
│                         ▼                                   │
│              GitHub Actions Pipeline                         │
│              (Build, Test, Deploy)                           │
│                         │                                   │
│                         ▼                                   │
│              https://testdemoqwenai2025-creator.github.io/   │
│              Demo5AISupChn/                                  │
│              (Available to clients worldwide)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

BENEFITS:
✅ Source code remains private and secure
✅ Public preview always shows latest approved version
✅ Automated deployment reduces human error
✅ Clear separation of concerns
✅ Enterprise-grade guardrails on both repos

================================================================================
                          🎯 WORKFLOW STAGES
================================================================================

STAGE 1: DEVELOPMENT (In AISupChn5 - Private)
---------------------------------------------
1. Developer clones AISupChn5 repository
2. Creates feature branch from develop/main
3. Makes changes, writes tests
4. Submits Pull Request
5. Code review by team (minimum 2 approvals)
6. Tests pass, security scan clears
7. PR merged to main branch

STAGE 2: AUTOMATED BUILD (GitHub Actions)
------------------------------------------
Trigger: Push to main branch or manual dispatch

Step 1: Checkout source code from AISupChn5
Step 2: Install dependencies (npm ci)
Step 3: Run linting (eslint, prettier)
Step 4: Type checking (TypeScript)
Step 5: Execute unit & integration tests
Step 6: Build application (Next.js static export)
Step 7: Optimize assets (minification, compression)
Step 8: Security vulnerability scan
Step 9: Secrets detection check
Step 10: Package build artifacts

STAGE 3: DEPLOYMENT (To Demo5AISupChn - Public)
-------------------------------------------------
Step 1: Download build artifacts
Step 2: Checkout Demo5AISupChn repository
Step 3: Clear old preview content
Step 4: Copy new build output
Step 5: Add deployment metadata
Step 6: Commit with deployment info
Step 7: Push to gh-pages branch
Step 8: Trigger GitHub Pages rebuild
Step 9: Update deployment record
Step 10: Send notifications (Slack/email)

STAGE 4: PUBLIC ACCESS (Client-Facing)
----------------------------------------
✅ Preview available at:
   https://testdemoqwenai2025-creator.github.io/Demo5AISupChn/

✅ Available 24/7, 365 days
✅ No login required
✅ No NDA needed
✅ Global CDN distribution
✅ Automatic HTTPS

================================================================================
                        🔧 TECHNICAL SETUP GUIDE
================================================================================

PREREQUISITES:
--------------
1. GitHub account with access to both repositories
2. Node.js 18+ installed locally (for development)
3. GitHub Personal Access Token (for deployment)

INITIAL SETUP STEPS:
--------------------

STEP 1: Configure Repository Access
-----------------------------------
# Both repositories should exist:
- AISupChn5 (Private) - Source code
- Demo5AISupChn (Public) - Preview target

# Generate Deployment Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with 'repo' scope
3. Name it: "deploy-to-demo5"
4. Copy token value

STEP 2: Add GitHub Secret to AISupChn5
---------------------------------------
1. Navigate to: AISupChn5 repository
2. Go to: Settings → Secrets and variables → Actions
3. Click: "New repository secret"
4. Name: DEPLOY_TOKEN
5. Value: [Your generated PAT]
6. Click: "Add secret"

STEP 3: Enable GitHub Pages on Demo5AISupChn
-------------------------------------------
1. Navigate to: Demo5AISupChn repository
2. Go to: Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "gh-pages" / root: "/" (or /docs)
5. Click: "Save"
6. Note the preview URL

STEP 4: Add Workflow File to AISupChn5
--------------------------------------
Create file: .github/workflows/build-and-deploy.yml
(See: build-and-deploy-workflow.yml in this package)

STEP 5: Configure Branch Protection (Optional but Recommended)
---------------------------------------------------------------
For AISupChn5 (Private):
- Require PR reviews before merge
- Require status checks to pass
- Enforce linear history
- Block force pushes

For Demo5AISupChn (Public):
- Set as read-only (no direct pushes)
- Only allow deployment bot to push
- Enable required status checks

================================================================================
                        📁 FILE STRUCTURE MAPPING
================================================================================

WHAT GOES WHERE:

AISUPCHN5 (PRIVATE - Source Code):
----------------------------------
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage component
│   ├── layout.tsx         # Root layout with providers
│   ├── command-center/    # Procurement module pages
│   │   └── page.tsx       # Command center main page
│   ├── dashboard/         # Analytics dashboard
│   ├── about/             # About page
│   ├── intelligence/      # AI insights
│   ├── platform/          # Platform overview
│   ├── resources/         # Documentation
│   ├── customers/         # Client showcase
│   ├── agents/            # AI agents info
│   ├── events/            # Events calendar
│   ├── industries/         # Industry solutions
│   ├── product/           # Product details
│   └── support/           # Help center
│
components/
├── ui/                     # Base UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   └── ThemeToggle.tsx     # Dark/light mode toggle
│
├── forms/                  # Form components
│   ├── LoginForm.tsx
│   ├── ContactForm.tsx
│   └── TenderForm.tsx
│
├── charts/                 # Data visualization
│   ├── LineChart.tsx
│   ├── BarChart.tsx
│   └── PieChart.tsx
│
lib/
├── api/                    # API client functions
│   ├── yahoo-finance.ts
│   ├── reuters.ts
│   ├── ap-news.ts
│   └── alpha-vantage.ts
│
├── utils/                  # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── helpers.ts
│
└── constants/              # App constants
    ├── endpoints.ts
    ├── config.ts
    └── features.ts

config/
├── environment/
│   ├── development.env
│   ├── staging.env
│   └── production.env
│
├── integrations/
│   ├── sap-connector.ts
│   ├── oracle-config.ts
│   └── netsuite-setup.ts
│
└── security/
    ├── auth.config.ts
    ├── encryption.ts
    └── permissions.ts

tests/
├── unit/
│   ├── components/
│   ├── hooks/
│   └── utils/
│
├── integration/
│   ├── api/
│   └── workflows/
│
└── e2e/
    ├── user-journeys.spec.ts
    └── critical-paths.spec.ts

scripts/
├── deploy/
│   ├── deploy.sh
│   └── rollback.sh
│
├── build/
│   ├── optimize.sh
│   └── generate-meta.sh
│
└── monitoring/
    ├── health-check.sh
    └── performance-test.sh

docs/
├── api/
│   ├── endpoints.md
│   └── authentication.md
│
├── setup/
│   ├── installation.md
│   ├── configuration.md
│   └── troubleshooting.md
│
└── architecture/
    ├── system-design.md
    ├── data-flow.md
    └── security-model.md

.github/
└── workflows/
    ├── build-and-deploy.yml    # MAIN DEPLOYMENT PIPELINE
    ├── test.yml               # Testing pipeline
    ├── security-scan.yml      # Security scanning
    └── release.yml            # Release automation

# Configuration Files
package.json
tsconfig.json
next.config.js
tailwind.config.ts
docker-compose.yml
.env.example                 # Template (not actual secrets)
.gitignore                   # Excludes .env, node_modules, etc.
README.md                    # This documentation
LICENSE                      # Enterprise license terms


DEMO5AISUPCHN (PUBLIC - Preview Output):
--------------------------------------
out/ or root/               # Static export from Next.js build
├── index.html              # Homepage (compiled)
├── command-center.html     # Command center (compiled)
├── about.html              # About page (compiled)
├── dashboard.html          # Dashboard (compiled)
├── intelligence.html       # Intelligence page (compiled)
├── platform.html           # Platform page (compiled)
├── resources.html          # Resources page (compiled)
├── customers.html          # Customers page (compiled)
├── agents.html             # Agents page (compiled)
├── events.html             # Events page (compiled)
├── industries.html         # Industries page (compiled)
├── product.html            # Product page (compiled)
├── support.html            # Support page (compiled)
│
css/                       # Compiled CSS files
├── main.css               # Main stylesheet (optimized)
├── themes/
│   ├── dark.css           # Dark theme variables
│   └── light.css          # Light theme variables
│
js/                        # Compiled JavaScript bundles
├── app.js                 # Main app bundle (minified)
├── theme-toggle.js        # Theme switching logic
├── search.js              # Search functionality
└── vendor.js              # Third-party libraries
│
images/                    # Optimized images
├── logo.svg
├── icons/
└── backgrounds/
│
fonts/                     # Web fonts
├── inter-var.woff2
└── icons.woff2
│
README.md                 # Public-facing documentation
CHANGELOG.md              # Update history
deploy-info.json          # Deployment metadata (auto-generated)

================================================================================
                        🛡️ SECURITY CONSIDERATIONS
================================================================================

PROTECTING SOURCE CODE (AISupChn5):
-----------------------------------
✅ Private repository - No public access
✅ Team-based access control
✅ Encrypted secrets via GitHub Actions
✅ Signed commits requirement
✅ Protected branches (no force push)
✅ Dependency vulnerability scanning
✅ Secrets detection in code
✅ Audit logging of all changes

PROTECTING PREVIEW (Demo5AISupChn):
------------------------------------
✅ Read-only deployment (only bot can push)
✅ No source code included (only compiled output)
✅ No API keys or credentials
✅ No environment variables
✅ No server-side logic
✅ DDoS protection via GitHub
✅ SSL/TLS encryption automatic
✅ Content Security Headers recommended

DATA FLOW SECURITY:
------------------
Development Machine → (Git Push) → AISupChn5 (Private)
                                          ↓
                              GitHub Actions (Secure Environment)
                                          ↓
                                    Build & Compile
                                          ↓
                              Remove Sensitive Data
                                          ↓
                              Optimize & Minify
                                          ↓
Demo5AISupChn (Public) ← (Deploy Token) ← Package Artifacts

At each stage, sensitive data is removed or protected.

================================================================================
                        📊 MONITORING & OBSERVABILITY
================================================================================

KEY METRICS TO TRACK:

Deployment Metrics:
---------------------
- Deployment frequency (target: multiple/day during dev)
- Lead time for changes (target: < 1 hour)
- Change failure rate (target: < 5%)
- Mean time to recovery (target: < 30 min)

Preview Performance:
-------------------
- Page load time (target: < 2s)
- Uptime percentage (target: 99.9%)
- Error rate (target: < 0.1%)
- Core Web Vitals scores

Security Metrics:
----------------
- Vulnerability count (target: 0 critical/high)
- Secrets exposure incidents (target: 0)
- Unauthorized access attempts (monitor + alert)
- Dependency update frequency (weekly minimum)

DASHBOARDS TO CREATE:
---------------------
1. **Deployment Dashboard**
   - Recent deployments
   - Success/failure rates
   - Deployment duration
   - Rollback history

2. **Performance Dashboard**
   - Page load times
   - Error rates
   - User sessions
   - Geographic distribution

3. **Security Dashboard**
   - Vulnerability status
   - Scan results
   - Access logs
   - Incident reports

================================================================================
                        🚨 TROUBLESHOOTING GUIDE
================================================================================

COMMON ISSUES AND SOLUTIONS:

ISSUE 1: Deployment fails with authentication error
--------------------------------------------------
Cause: Invalid or missing DEPLOY_TOKEN secret
Solution:
1. Verify token exists in AISupChn5 Settings → Secrets
2. Check token has 'repo' scope
3. Regenerate token if expired
4. Re-run workflow manually

ISSUE 2: Preview not updating after push
----------------------------------------
Cause: Workflow not triggered or failed silently
Solution:
1. Check Actions tab in AISupChn5
2. Look for recent workflow runs
3. Review logs for errors
4. Manually trigger: Actions → Build & Deploy → Run workflow

ISSUE 3: Build fails due to test failures
-----------------------------------------
Cause: Tests not passing before deployment
Solution:
1. Review test output in workflow logs
2. Fix failing tests locally
3. Push fixes to feature branch
4. Merge after tests pass

ISSUE 4: Preview shows old version
----------------------------------
Cause: GitHub Pages cache or CDN delay
Solution:
1. Wait 2-3 minutes for CDN propagation
2. Hard refresh browser (Ctrl+F5)
3. Clear browser cache
4. Check if latest commit triggered deployment

ISSUE 5: Environment variables not working in preview
-----------------------------------------------------
Cause: Variables not set or not prefixed correctly
Solution:
1. Use NEXT_PUBLIC_ prefix for client-side vars
2. Add to repository secrets (not in code)
3. Reference via process.env in Next.js
4. Rebuild after adding variables

ROLLBACK PROCEDURE:
-------------------
If bad deployment reaches preview:

1. Identify last good commit SHA
2. In AISupChn5, run: git revert [bad-commit-sha]
3. Push revert to main
4. Auto-deployment will restore previous version
5. Or use: Actions → Re-run workflow with previous commit

================================================================================
                        📝 BEST PRACTICES
================================================================================

DEVELOPMENT BEST PRACTICES:
----------------------------
1. Write meaningful commit messages following conventional commits
2. Keep PRs focused and small (< 400 lines changed)
3. Always include tests with new features
4. Review your own code before requesting review
5. Update documentation alongside code changes
6. Use feature flags for incomplete work
7. Run full test suite locally before pushing

SECURITY BEST PRACTICES:
-------------------------
1. Never commit secrets or credentials
2. Use .env.example for templates (not real values)
3. Rotate deployment tokens every 90 days
4. Enable 2FA on all contributor accounts
5. Review dependency updates weekly
6. Scan for vulnerabilities regularly
7. Monitor access logs for anomalies

DEPLOYMENT BEST PRACTICES:
---------------------------
1. Test builds locally before pushing
2. Use semantic versioning for releases
3. Maintain CHANGELOG.md with updates
4. Tag releases for easy rollback
5. Monitor deployments for first 15 minutes
6. Have rollback plan ready
7. Communicate changes to stakeholders

COLLABORATION BEST PRACTICES:
------------------------------
1. Create descriptive PR titles and descriptions
2. Request reviews from appropriate team members
3. Provide context for complex changes
4. Address feedback promptly
5. Squash merge clean history
6. Celebrate team wins! 🎉

================================================================================
                        🔄 WORKFLOW OPTIMIZATIONS
================================================================================

CURRENT STATE: Basic automated pipeline

PHASE 2 ENHANCEMENTS (Recommended):
------------------------------------
[ ] Add preview deployments for PRs (separate URL per PR)
[ ] Implement canary deployments (gradual rollout)
[ ] Add A/B testing framework
[ ] Integrate feature flagging system
[ ] Set up automated dependency updates
[ ] Add performance regression testing
[ ] Implement chaos engineering tests

PHASE 3 ADVANCED (Future):
---------------------------
[ ] Multi-region deployment
[ ] Blue-green deployments
[ ] Progressive delivery
[ ] AI-powered testing
[ ] Self-healing infrastructure
[ ] Predictive scaling
[ ] Cost optimization automation

================================================================================
                            📞 SUPPORT
================================================================================

FOR DEVELOPMENT ISSUES:
-----------------------
📧 Email: dev-support@aisupplychain.ai
💬 Slack: #dev-support channel
📚 Docs: /docs/setup/troubleshooting.md
🐛 Issues: GitHub Issues in AISupChn5 repo

FOR DEPLOYMENT ISSUES:
-----------------------
📧 Email: ops-support@aisupplychain.ai
📱 PagerDuty: (for P0/P1 issues)
📊 Status Page: status.aisupplychain.ai

FOR SECURITY CONCERNS:
-----------------------
📧 Email: security@aisupplychain.ai
🔐 PGP Key: Available on request
⚡ Response: < 4 hours for critical issues

================================================================================
                                ✨ SUMMARY
================================================================================

This workflow provides:

✅ SECURE development environment (private source code)
✅ AUTOMATIC deployments to public preview
✅ QUALITY gates (tests, linting, security scans)
✅ TRANSPARENT deployment tracking
✅ RELIABLE 24/7 availability for clients
✅ SCALABLE architecture for growth
✅ MAINTAINABLE clear separation of concerns

NEXT STEPS:
-----------
1. Clone AISupChn5 and start developing
2. Set up GitHub secrets for deployment
3. Make your first commit and push to main
4. Watch automatic deployment to Demo5AISupChn
5. Share preview link with stakeholders!

LIVE PREVIEW: https://testdemoqwenai2025-creator.github.io/Demo5AISupChn/

================================================================================
*End of Workflow Documentation*
*Version: 1.0 | Last Updated: August 26, 2026*
*Guardrail System: v4.0 Active on Both Repositories*
================================================================================
