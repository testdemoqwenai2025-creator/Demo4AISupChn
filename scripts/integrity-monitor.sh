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
