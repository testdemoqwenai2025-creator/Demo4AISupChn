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
