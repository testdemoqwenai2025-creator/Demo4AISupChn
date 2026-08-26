# 🔐 AISupChn5 - Private Source Code Repository

<div align="center">

![Repository Type](https://img.shields.io/badge/Type-PRIVATE-red?style=for-the-badge&logo=github)
![Purpose](https://img.shields.io/badge/Purpose-Source_Code-blue?style=for-the-badge)
![Workflow](https://img.shields.io/badge/Workflow-Development_to_Preview-green?style=for-the-badge)

**🔒 ENTERPRISE SOURCE CODE - Development Repository**

**Preview Deployment Target:** [Demo5AISupChn](https://github.com/testdemoqwenai2025-creator/Demo5AISupChn)

</div>

---

## 🎯 Repository Purpose

### **This is the PRIVATE source code repository** where all development happens.

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT WORKFLOW                      │
│                                                             │
│   📁 AISupChn5 (THIS REPOSITORY)                           │
│   ├─ Source Code (Next.js, React, TypeScript)              │
│   ├─ Configuration Files                                   │
│   ├─ Environment Variables (.env)                          │
│   ├─ API Keys & Secrets (gitignored)                       │
│   ├─ Development Scripts                                   │
│   └─ Test Suites                                           │
│                         │                                   │
│                         ▼ (Build & Deploy)                  │
│                                                             │
│   📁 Demo5AISupChn (PUBLIC PREVIEW)                        │
│   ├─ Static HTML/CSS/JS Output                             │
│   ├─ Compiled & Optimized Assets                           │
│   ├─ Production Build Only                                 │
│   └─ Client-Facing Preview                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Repository Structure

```
AISupChn5/
├── src/                          # Next.js Application Source
│   ├── app/                      # App Router pages
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   ├── command-center/      # Procurement module
│   │   ├── dashboard/           # Analytics dashboard
│   │   ├── about/               # About page
│   │   └── ...                  # Other pages
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Base UI elements
│   │   ├── forms/               # Form components
│   │   └── charts/              # Data visualization
│   ├── lib/                     # Utilities & helpers
│   │   ├── api/                 # API client functions
│   │   ├── utils/               # General utilities
│   │   └── constants/           # App constants
│   ├── hooks/                   # Custom React hooks
│   ├── styles/                  # Global styles
│   └── types/                   # TypeScript definitions
│
├── config/                      # Configuration Files
│   ├── environment/             # Env-specific configs
│   ├── integrations/            # Third-party setups
│   └── security/                # Auth & encryption
│
├── public/                      # Static Assets
│   ├── images/                  # Images & icons
│   ├── fonts/                   # Custom fonts
│   └── favicon.ico             # Site icon
│
├── tests/                       # Test Suites
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests
│
├── scripts/                     # Automation Scripts
│   ├── deploy/                  # Deployment scripts
│   ├── build/                   # Build automation
│   └── monitoring/             # Health checks
│
├── .github/                     # GitHub Configuration
│   └── workflows/              # CI/CD pipelines
│       ├── build-and-deploy.yml # Main deployment workflow
│       ├── test.yml            # Testing pipeline
│       └── security-scan.yml   # Security scanning
│
├── docs/                        # Documentation
│   ├── api/                    # API documentation
│   ├── setup/                  # Setup guides
│   └── architecture/          # System design docs
│
├── .env.example                 # Environment template
├── .env.local                   # Local env (gitignored)
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── docker-compose.yml          # Containerized setup
├── README.md                   # This file
└── LICENSE                     # Enterprise license
```

---

## 🚀 Development Workflow

### **Step 1: Clone This Repository**
```bash
# You'll receive access credentials after approval
git clone https://[YOUR-TOKEN]@github.com/testdemoqwenai2025-creator/AISupChn5.git
cd AISupChn5
```

### **Step 2: Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### **Step 3: Configure Environment**
```bash
cp .env.example .env.local
# Edit .env.local with your settings:
# - API keys (Yahoo Finance, Reuters, etc.)
# - Database URLs
# - Authentication secrets
# - Feature flags
```

### **Step 4: Run Development Server**
```bash
npm run dev
# Application runs at http://localhost:3000
```

### **Step 5: Make Changes & Test**
```bash
# Run tests
npm run test

# Run linting
npm run lint

# Build for production (local test)
npm run build
npm start
```

### **Step 6: Push Changes**
```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

### **Step 7: Automatic Preview Deployment**
After pushing to `main` branch:
1. ✅ GitHub Actions triggers automatically
2. ✅ Code is built and optimized
3. ✅ Tests are executed
4. ✅ Security scan runs
5. ✅ Output deploys to **Demo5AISupChn** (public preview)
6. ✅ Preview available within 2-3 minutes

---

## 🔗 Connection to Public Preview (Demo5AISupChn)

### **How It Works:**

This repository (**AISupChn5**) automatically deploys its built output to the public preview repository (**Demo5AISupChn**) via GitHub Actions.

```
Push to AISubChn5 (main branch)
         │
         ▼
┌─────────────────┐
│  GitHub Actions  │
│  Pipeline        │
│                 │
│  1. Checkout     │
│  2. Install      │
│  3. Build        │
│  4. Test         │
│  5. Optimize     │
│  6. Deploy →     │
└────────┬────────┘
         │
         ▼
Demo5AISupChn (gh-pages branch)
         │
         ▼
🌐 https://testdemoqwenai2025-creator.github.io/Demo5AISupChn/
(PUBLIC PREVIEW - Available to clients 24/7)
```

### **What Gets Deployed to Public Preview:**

✅ **INCLUDED in Preview:**
- Static HTML pages (compiled from Next.js)
- CSS stylesheets (optimized & minified)
- JavaScript bundles (tree-shaken & minified)
- Images and static assets
- Responsive design functionality
- Dark/Light theme switching
- All UI features and interactions

❌ **NOT INCLUDED in Preview:**
- Source code (TypeScript, JSX, etc.)
- Environment variables & API keys
- Server-side logic
- Database configurations
- Internal APIs
- Development tools
- Test files
- Sensitive business logic

---

## 🛡️ Security & Access Control

### **Repository Protection:**
- 🔒 **Private Repository** - Only authorized contributors
- 👥 **Access Control** - Team-based permissions
- 🔐 **Secrets Management** - Encrypted environment variables
- 📋 **Audit Trail** - Complete change history
- 🚫 **No Force Pushes** - Protected branches

### **Code Security:**
- 🔍 **Dependency Scanning** - Automated vulnerability checks
- 🛡️ **CodeQL Analysis** - Static code analysis
- 🔑 **Secrets Detection** - Prevents credential leaks
- ✅ **Signed Commits** - Verified contributor identity
- 📊 **SBOM Tracking** - Software bill of materials

### **Data Protection:**
- 🆔 **PII Handling** - GDPR/CCPA compliant
- 🔐 **Encryption** - Data at rest & in transit
- 🌐 **CORS Policies** - Controlled API access
- 🚫 **Rate Limiting** - Abuse prevention
- 📝 **Logging** - Security event tracking

---

## 📦 Technology Stack

### **Core Framework:**
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework (App Router) |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |

### **State & Data:**
| Technology | Purpose |
|------------|---------|
| Zustand | Client state management |
| TanStack Query | Server state & caching |
| Prisma ORM | Database operations |
| Redis | Caching layer |

### **Integrations:**
| Service | Usage |
|---------|-------|
| Yahoo Finance | Stock/commodity data |
| Reuters News | Market news feeds |
| AP News | Global news coverage |
| Alpha Vantage | Forex data |
| OpenExchangeRates | Currency conversion |
| Bloomberg | Financial data |

### **DevOps:**
| Tool | Purpose |
|------|---------|
| GitHub Actions | CI/CD pipeline |
| Docker | Containerization |
| Vercel/Cloudflare | CDN & hosting |
| Sentry | Error monitoring |
| Datadog | Performance monitoring |

---

## 🧪 Testing Strategy

### **Test Categories:**
```bash
# Unit Tests
npm run test:unit
# Coverage: Components, hooks, utilities

# Integration Tests
npm run test:integration
# Coverage: API calls, database ops, auth flows

# E2E Tests
npm run test:e2e
# Coverage: User journeys, critical paths

# Visual Regression
npm run test:visual
# Coverage: UI consistency
```

### **Quality Gates:**
- ✅ Minimum 80% code coverage required
- ✅ No critical/high vulnerabilities allowed
- ✅ All tests must pass before merge
- ✅ Linting errors block deployment
- ✅ Type checking must pass

---

## 📊 Deployment Pipeline

### **GitHub Actions Workflow:**

See `.github/workflows/build-and-deploy.yml` for complete pipeline definition.

**Pipeline Stages:**
1. **Setup** - Install Node.js, dependencies
2. **Lint** - Code quality checks
3. **Type Check** - TypeScript validation
4. **Test** - Unit + integration tests
5. **Build** - Next.js production build
6. **Security Scan** - Dependency & code analysis
7. **Optimize** - Asset optimization
8. **Deploy** - Push to Demo5AISupChn gh-pages
9. **Notify** - Slack/email deployment status

**Environment-Specific Configs:**
- `development` - Local dev with hot reload
- `staging` - Pre-production testing
- `production` - Live public preview

---

## 👥 Collaboration Guidelines

### **Branch Strategy:**
```
main (protected)
  │
  ├── develop (integration branch)
  │     │
  │     ├── feature/xxx (feature work)
  │     ├── bugfix/xxx (bug fixes)
  │     └── hotfix/xxx (urgent fixes)
  │
  └── release/x.x.x (release preparation)
```

### **Commit Conventions:**
```
type(scope): subject

body (optional)

footer (optional)

Types: feat, fix, docs, style, refactor, test, chore
Scopes: ui, api, auth, deploy, ci, docs
```

### **Pull Request Process:**
1. Create feature branch from `develop`
2. Make changes with clear commits
3. Open PR with description & screenshots
4. Request review from maintainers
5. Address feedback
6. Get approvals (minimum 2)
7. Squash merge to `develop`
8. Periodic merge to `main` triggers preview deploy

---

## 🔧 Configuration

### **Environment Variables:**
```env
# Required
NEXT_PUBLIC_APP_URL=https://testdemoqwenai2025-creator.github.io/Demo5AISupChn
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# API Keys (Free Tier)
YAHOO_FINANCE_API_KEY=...
REUTERS_API_KEY=...
AP_NEWS_API_KEY=...
ALPHA_VANTAGE_API_KEY=...
OPENEXCHANGERATES_API_KEY=...

# Optional Features
ENABLE_ANALYTICS=true
ENABLE_CHAT_SUPPORT=false
ENABLE_AI_SUGGESTIONS=true
```

### **Feature Flags:**
```typescript
// config/features.ts
export const features = {
  darkMode: true,
  multiLanguage: false,
  advancedAnalytics: true,
  aiRecommendations: true,
  erpIntegration: false, // Enterprise only
  whiteLabel: false, // Enterprise only
}
```

---

## 📈 Monitoring & Observability

### **Metrics Tracked:**
- 📊 Page load times & Core Web Vitals
- 📈 API response times & error rates
- 👥 Active users & session duration
- 🔄 Conversion funnels
- ⚠️ Error rates & exceptions

### **Alerting:**
- 🚨 P0: System down (< 15 min response)
- ⚠️ P1: Degraded performance (< 1 hour)
- ℹ️ P2: Non-critical issues (< 24 hours)
- 📝 P3: Improvements (next sprint)

### **Dashboards:**
- **Operations**: Uptime, latency, error rates
- **Business**: Users, conversions, engagement
- **Development**: Build times, test coverage, debt

---

## 🆘 Support & Troubleshooting

### **Common Issues:**

**Issue:** Build fails with TypeScript errors
```bash
# Solution: Clear cache and rebuild
rm -rf .next node_modules/.cache
npm run build
```

**Issue:** Environment variables not working
```bash
# Solution: Verify .env.local exists and is gitignored
cat .env.local
git check-ignore .env.local
```

**Issue:** Preview not updating after push
```bash
# Solution: Check GitHub Actions logs
# Navigate to: Actions tab → Latest workflow run
```

### **Getting Help:**
- 📚 Documentation: `/docs/` directory
- 💬 Slack: `#dev-support` channel
- 📧 Email: dev-support@aisupplychain.ai
- 🐛 Issues: GitHub Issues (this repo)

---

## 📄 License & Terms

**Enterprise License Agreement applies:**

- ✅ Authorized use for development purposes
- ❌ No redistribution or resale allowed
- ❌ No reverse engineering permitted
- 🔒 Confidentiality obligations apply
- 📝 See full LICENSE file for details

---

## 🚀 Quick Start Commands

```bash
# Clone & Setup
git clone https://[TOKEN]@github.com/testdemoqwenai2025-creator/AISupChn5.git
cd AISupChn5
npm install
cp .env.example .env.local

# Development
npm run dev          # Start dev server
npm run test         # Run all tests
npm run lint         # Check code quality

# Building
npm run build        # Production build
npm run start        # Start production server

# Deployment (automatic on push to main)
git push origin main # Triggers preview deployment
```

---

<div align="center">

**🔒 Private Source Code Repository**

**Deploys To:** [Demo5AISupChn Public Preview](https://github.com/testdemoqwenai2025-creator/Demo5AISupChn)

**Live Preview:** [https://testdemoqwenai2025-creator.github.io/Demo5AISupChn/](https://testdemoqwenai2025-creator.github.io/Demo5AISupChn/)

*Last Updated: August 26, 2026*

*Workflow Version: 1.0 - Source to Preview Pipeline*

</div>
