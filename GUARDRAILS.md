# 🛡️ Guardrail System v4.0 - Repository Protection

## Overview
This document outlines the comprehensive guardrail system implemented to protect **Demo4AISupChn** and **AISupChn4** from corruption, unauthorized changes, and data loss.

---

## 📋 Table of Contents
1. [Protection Levels](#protection-levels)
2. [Integrity Checks](#integrity-checks)
3. [Backup Systems](#backup-systems)
4. [Access Control](#access-control)
5. [Automated Monitoring](#automated-monitoring)
6. [Recovery Procedures](#recovery-procedures)

---

## 🛡️ Protection Levels

### Level 1: File Integrity (Every 30 seconds)
```javascript
// Automatic integrity verification
const INTEGRITY_CHECK_INTERVAL = 30000; // 30 seconds

setInterval(() => {
    const currentHash = calculateDirectoryHash('/tmp/demo4aisupchn');
    if (currentHash !== lastKnownHash) {
        logIntegrityViolation(currentHash);
        triggerBackup();
    }
}, INTEGRITY_CHECK_INTERVAL);
```

### Level 2: Auto-Backup (Every 5 minutes)
```bash
#!/bin/bash
# Auto-backup script - runs every 5 minutes
BACKUP_INTERVAL=300

while true; do
    timestamp=$(date +%Y%m%d_%H%M%S)
    tar -czf /home/z/my-project/backups/demo4_${timestamp}.tar.gz /tmp/demo4aisupchn/
    echo "Backup created: demo4_${timestamp}.tar.gz"
    sleep $BACKUP_INTERVAL
done
```

### Level 3: Corruption Detection
```yaml
# GitHub Actions workflow for corruption detection
name: Repository Integrity Check
on:
  schedule:
    - cron: '*/30 * * * *'  # Every 30 minutes
  push:
    branches: [gh-pages, main]

jobs:
  check-integrity:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Verify file integrity
        run: |
          find . -type f -exec sha256sum {} \; > checksums.txt
          git diff checksums.txt || echo "Changes detected"
      - name: Check for malicious patterns
        run: |
          grep -r "eval(" --include="*.js" && exit 1 || echo "No malicious code found"
```

---

## 🔍 Integrity Checks

### Automated Verification Points:
1. **File Hash Monitoring**: SHA-256 hashes of all files monitored in real-time
2. **Structure Validation**: Ensures critical files exist and are not modified
3. **Content Scanning**: Detects injection attacks, malware signatures
4. **Dependency Validation**: Verifies package.json integrity

### Critical Files Protected:
- `index.html` (Main entry point)
- `command-center.html` (Procurement hub)
- `styles/main.css` (Core styling)
- `scripts/app.js` (Application logic)
- `.git/config` (Repository configuration)

---

## 💾 Backup Systems

### Local Backups (Automatic)
```
/home/z/my-project/backups/
├── demo4_20260826_123000.tar.gz    # Hourly backup
├── demo4_20260826_124500.tar.gz    # Latest backup
└── integrity_logs/
    └── checks.json                  # Integrity check history
```

### Remote Backups (GitHub)
- **Primary**: GitHub repository (origin)
- **Secondary**: Demo5AISupChn (Mirror)
- **Tertiary**: AISupChn5 (Private mirror)

### Retention Policy:
- **Hourly backups**: Keep 24 hours
- **Daily backups**: Keep 7 days
- **Weekly backups**: Keep 4 weeks
- **Monthly archives**: Keep 12 months

---

## 🔐 Access Control

### Branch Protection Rules:
```yaml
branch_protection:
  gh-pages:
    required_pull_request_reviews: 1
    dismiss_stale_reviews: true
    require_code_owner reviews: true
    required_status_checks:
      - integrity-check
      - build-verification
    enforce_admins: true
    restrictions:
      users: []
      teams: [maintainers]
    
  main:
    required_pull_request_reviews: 2
    require_branches_up_to_date: true
    enforce_admins: true
```

### API Rate Limiting:
| Endpoint | Limit | Window |
|----------|-------|--------|
| Yahoo Finance | 500 req/day | Rolling 24h |
| Reuters | 250 req/day | Rolling 24h |
| AP News | 100 req/day | Rolling 24h |
| Alpha Vantage | 25 req/day | Rolling 24h |
| OpenExchangeRates | 1000/month | Calendar month |

---

## 📊 Automated Monitoring

### Health Dashboard Metrics:
1. **Uptime Monitoring**: 99.9% availability target
2. **Response Time**: < 200ms average
3. **Error Rate**: < 0.1% threshold
4. **Backup Success**: 100% completion rate

### Alert Triggers:
- ⚠️ **Warning**: Integrity hash mismatch
- 🚨 **Critical**: File deletion detected
- 🔴 **Emergency**: Core file modification without authorization

---

## 🔄 Recovery Procedures

### Scenario 1: Single File Corruption
```bash
# Restore from latest backup
git checkout HEAD~1 -- corrupted_file.html
git commit -m "Restore corrupted file from backup"
git push origin gh-pages
```

### Scenario 2: Complete Repository Corruption
```bash
# Clone from mirror repository
cd /tmp
rm -rf demo4aisupchn
git clone https://github.com/testdemoqwenai2025-creator/Demo5AISupChn.git demo4aisupchn
cd demo4aisupchn
git remote set-url origin https://github.com/testdemoqwenai2025-creator/Demo4AISupChn.git
```

### Scenario 3: Unauthorized Access Detected
```bash
# 1. Revoke all sessions
# 2. Rotate GitHub tokens
# 3. Enable branch protection
# 4. Audit all recent commits
# 5. Restore from pre-breach backup
```

---

## 📝 Maintenance Checklist

### Daily Tasks:
- [ ] Review integrity logs
- [ ] Verify backup completion
- [ ] Monitor error rates
- [ ] Check API usage quotas

### Weekly Tasks:
- [ ] Test recovery procedures
- [ ] Review access logs
- [ ] Update dependency versions
- [ ] Clean up old backups

### Monthly Tasks:
- [ ] Security audit
- [ ] Performance review
- [ ] Documentation update
- [ ] Disaster recovery drill

---

## 🚨 Emergency Contacts

**Platform Administrator**: System Admin  
**GitHub Support**: https://support.github.com  
**Incident Response**: Activate within 15 minutes of detection

---

## Version History
- **v4.0** (Current): Multi-repository protection with mirroring
- **v3.0**: Command center guardrails
- **v2.0**: Basic integrity checks
- **v1.0**: Initial implementation

---

*Last Updated: 2026-08-26*  
*Protected Repositories: Demo4AISupChn, AISupChn4*  
*Mirror Repositories: Demo5AISupChn, AISupChn5*
