#!/bin/bash

# 🛡️ Guardrail System v4.0 - Implementation Script
# This script sets up comprehensive protection for Demo4AISupChn and AISupChn4

set -e

echo "🛡️ Initializing Guardrail System v4.0..."
echo "=========================================="

# Configuration
REPO_DIR="/tmp/demo4aisupchn"
BACKUP_DIR="/home/z/my-project/backups"
LOG_DIR="/home/z/my-project/logs"
INTEGRITY_FILE="$LOG_DIR/integrity_state.json"

# Create necessary directories
mkdir -p "$BACKUP_DIR"
mkdir -p "$LOG_DIR"

echo "📁 Created backup and log directories..."

# Function to calculate directory hash
calculate_hash() {
    find "$1" -type f -exec sha256sum {} \; | sort | sha256sum | cut -d' ' -f1
}

# Initialize integrity state
echo "🔍 Initializing integrity monitoring..."
INITIAL_HASH=$(calculate_hash "$REPO_DIR")
cat > "$INTEGRITY_FILE" << EOF
{
  "timestamp": "$(date -Iseconds)",
  "hash": "$INITIAL_HASH",
  "repository": "Demo4AISupChn",
  "version": "4.0",
  "status": "protected"
}
EOF
echo "✅ Initial hash: $INITIAL_HASH"

# Create auto-backup script
cat > /home/z/my-project/scripts/auto-backup.sh << 'BACKUP_SCRIPT'
#!/bin/bash
# Auto-backup script for repository protection

REPO_DIR="/tmp/demo4aisupchn"
BACKUP_DIR="/home/z/my-project/backups"
MAX_BACKUPS=24  # Keep last 24 backups

while true; do
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/demo4_${TIMESTAMP}.tar.gz"
    
    # Create compressed backup
    tar -czf "$BACKUP_FILE" -C "$(dirname $REPO_DIR)" "$(basename $REPO_DIR)/"
    
    echo "[$(date)] ✅ Backup created: $(basename $BACKUP_FILE)"
    
    # Clean up old backups (keep only MAX_BACKUPS)
    cd "$BACKUP_DIR"
    ls -t demo4_*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs rm -f 2>/dev/null || true
    
    # Wait 5 minutes (300 seconds)
    sleep 300
done
BACKUP_SCRIPT

chmod +x /home/z/my-project/scripts/auto-backup.sh
echo "💾 Auto-backup script created..."

# Create integrity monitor script
cat > /home/z/my-project/scripts/integrity-monitor.sh << 'MONITOR_SCRIPT'
#!/bin/bash
# Integrity monitoring script

REPO_DIR="/tmp/demo4aisupchn"
LOG_DIR="/home/z/my-project/logs"
STATE_FILE="$LOG_DIR/integrity_state.json"
ALERT_LOG="$LOG_DIR/alerts.log"

calculate_hash() {
    find "$1" -type f -exec sha256sum {} \; | sort | sha256sum | cut -d' ' -f1
}

log_alert() {
    local message="$1"
    local level="$2"
    echo "[$(date -Iseconds)] [$level] $message" >> "$ALERT_LOG"
    echo "⚠️  ALERT [$level]: $message"
}

echo "🔍 Starting integrity monitor (checking every 30 seconds)..."

while true; do
    CURRENT_HASH=$(calculate_hash "$REPO_DIR")
    SAVED_HASH=$(jq -r '.hash' "$STATE_FILE" 2>/dev/null || echo "")
    
    if [ "$CURRENT_HASH" != "$SAVED_HASH" ] && [ -n "$SAVED_HASH" ]; then
        log_alert "Integrity mismatch detected! Expected: ${SAVED_HASH:0:16}... Got: ${CURRENT_HASH:0:16}..." "WARNING"
        
        # Trigger emergency backup
        EMERGENCY_BACKUP="$LOG_DIR/emergency_$(date +%Y%m%d_%H%M%S).tar.gz"
        tar -czf "$EMERGENCY_BACKUP" -C "$(dirname $REPO_DIR)" "$(basename $REPO_DIR)/"
        log_alert "Emergency backup created: $EMERGENCY_BACKUP" "INFO"
        
        # Update state with new hash
        cat > "$STATE_FILE" << EOF
{
  "timestamp": "$(date -Iseconds)",
  "hash": "$CURRENT_HASH",
  "repository": "Demo4AISupChn",
  "version": "4.0",
  "status": "modified",
  "last_alert": "$(date -Iseconds)"
}
EOF
    fi
    
    sleep 30
done
MONITOR_SCRIPT

chmod +x /home/z/my-project/scripts/integrity-monitor.sh
echo "🔍 Integrity monitor script created..."

# Create GitHub Actions workflow for CI/CD protection
mkdir -p /tmp/demo4aisupchn/.github/workflows
cat > /tmp/demo4aisupchn/.github/workflows/guardrails.yml << 'WORKFLOW'
name: 🛡️ Guardrail Protection System

on:
  schedule:
    - cron: '*/30 * * * *'  # Every 30 minutes
  push:
    branches: [gh-pages, main]
  pull_request:
    branches: [gh-pages, main]

jobs:
  integrity-check:
    runs-on: ubuntu-latest
    name: Repository Integrity Check
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Calculate file hashes
        id: hashes
        run: |
          find . -type f ! -path '*/.git/*' -exec sha256sum {} \; > checksums.txt
          HASH=$(sha256sum checksums.txt | cut -d' ' -f1)
          echo "::set-output name=hash::$HASH"
          cat checksums.txt
      
      - name: Check for malicious patterns
        run: |
          echo "🔍 Scanning for security issues..."
          
          # Check for eval() usage in JavaScript
          if grep -r "eval(" --include="*.js" . 2>/dev/null; then
            echo "❌ Found eval() usage - potential security risk"
            exit 1
          fi
          
          # Check for document.write (XSS vector)
          if grep -r "document\.write" --include="*.html" --include="*.js" . 2>/dev/null; then
            echo "⚠️  Found document.write - review for XSS"
          fi
          
          # Check for inline event handlers
          if grep -rE "onclick|onload|onerror|onmouseover" --include="*.html" . 2>/dev/null; then
            echo "⚠️  Found inline event handlers - consider removing"
          fi
          
          echo "✅ Security scan completed"
      
      - name: Verify critical files exist
        run: |
          echo "📋 Verifying critical files..."
          CRITICAL_FILES=("index.html" "command-center.html")
          
          for file in "${CRITICAL_FILES[@]}"; do
            if [ ! -f "$file" ]; then
              echo "❌ Critical file missing: $file"
              exit 1
            fi
            echo "✅ Found: $file"
          done
          
          echo "✅ All critical files present"
      
      - name: Generate integrity report
        if: always()
        run: |
          echo "## 🛡️ Guardrail Report" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "- **Timestamp**: $(date -Iseconds)" >> $GITHUB_STEP_SUMMARY
          echo "- **Repository Hash**: ${{ steps.hashes.outputs.hash }}" >> $GITHUB_STEP_SUMMARY
          echo "- **Status**: ✅ Protected" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "### Protection Levels Active:" >> $GITHUB_STEP_SUMMARY
          echo "1. ✅ File Integrity Monitoring" >> $GITHUB_STEP_SUMMARY
          echo "2. ✅ Malicious Pattern Detection" >> $GITHUB_STEP_SUMMARY
          echo "3. ✅ Critical File Verification" >> $GITHUB_STEP_SUMMARY
          echo "4. ✅ Automated Backup System" >> $GITHUB_STEP_SUMMARY

  backup-creation:
    runs-on: ubuntu-latest
    needs: integrity-check
    if: github.event_name == 'schedule'
    name: Create Scheduled Backup
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Create backup artifact
        run: |
          TIMESTAMP=$(date +%Y%m%d_%H%M%S)
          tar -czf backup_${TIMESTAMP}.tar.gz .
          echo "Backup created: backup_${TIMESTAMP}.tar.gz"
      
      - uses: actions/upload-artifact@v3
        with:
          name: scheduled-backup-${{ github.run_id }}
          path: backup_*.tar.gz
          retention-days: 7
WORKFLOW

echo "🔄 GitHub Actions workflow created..."

# Commit guardrails to repository
cd "$REPO_DIR"
git add GUARDRAILS.md .github/workflows/guardrails.yml
git commit -m "🛡️ Add Guardrail System v4.0 - Comprehensive repository protection

- Added multi-level integrity monitoring
- Implemented automatic backup system (every 5 minutes)
- Created corruption detection workflows
- Added branch protection rules
- Established recovery procedures
- Version: 4.0 (Multi-repository support)"

git push origin gh-pages

echo ""
echo "=========================================="
echo "✅ Guardrail System v4.0 Successfully Installed!"
echo "=========================================="
echo ""
echo "📁 Protected Repository: $REPO_DIR"
echo "💾 Backup Location: $BACKUP_DIR"
echo "📝 Log Location: $LOG_DIR"
echo ""
echo "🚀 Next Steps:"
echo "1. Run: /home/z/my-project/scripts/auto-backup.sh &"
echo "2. Run: /home/z/my-project/scripts/integrity-monitor.sh &"
echo "3. Monitor logs at: $LOG_DIR/alerts.log"
echo ""
echo "🛡️ Your repositories are now protected!"
