#!/bin/bash
# ============================================
# Scope Guard - Pre-Action Repository Check
# ============================================
# Run this BEFORE creating any files in a repository
# Usage: ./scope-guard.sh [file-type] [description]
# Example: ./scope-guard.sh docx "Investor email templates"

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "🔍 SCOPE GUARD - Repository Verification"
echo "=========================================="
echo ""

# Get current directory
CURRENT_DIR=$(pwd)
REPO_NAME=$(basename "$CURRENT_DIR")

echo "📁 Current Directory: $CURRENT_DIR"
echo "📦 Repository Name: $REPO_NAME"
echo ""

# Check if we're in a git repo
if [ -d ".git" ]; then
    echo "✅ Git repository detected"
    
    # Check for .SCOPE_GUARD file
    if [ -f ".SCOPE_GUARD" ]; then
        echo "✅ .SCOPE_GUARD file found (reading scope rules...)"
        echo ""
        grep -E "^(REPO_NAME|PURPOSE|TYPE):" .SCOPE_GUARD | head -5
        echo ""
    fi
    
    # Check README for purpose clues
    if [ -f "README.md" ]; then
        PURPOSE=$(head -10 README.md | grep -i "purpose\|about\|description" || true)
        if [ -n "$PURPOSE" ]; then
            echo "📄 From README: $PURPOSE"
            echo ""
        fi
    fi
    
    # Analyze existing file types
    echo "📊 Existing File Types in Repo:"
    find . -maxdepth 2 -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.py" \) 2>/dev/null | \
        sed 's/.*\.//' | sort | uniq -c | sort -rn | head -5
    echo ""
else
    echo "⚠️  Not a git repository (or not in repo root)"
fi

# Check what user wants to create
FILE_TYPE="${1:-unknown}"
DESCRIPTION="${2:-no description provided}"

echo "------------------------------------------"
echo "🎯 INTENDED ACTION:"
echo "   File Type: .$FILE_TYPE"
echo "   Description: $DESCRIPTION"
echo "------------------------------------------"
echo ""

# Danger file types that rarely belong in code repos
DANGER_TYPES="docx xlsx pptx pdf email investor template business report contract"

# Check if file type is dangerous
if echo "$DANGER_TYPES" | grep -qw "$FILE_TYPE"; then
    echo -e "${RED}🚨 DANGER: This file type is SUSPICIOUS for this repository${NC}"
    echo ""
    echo "Questions to ask yourself:"
    echo "  ❓ Is this a BUSINESS document in a CODE repository?"
    echo "  ❓ Would this confuse someone cloning the repo?"
    echo "  ❓ Is there a BETTER location for this content?"
    echo ""
    echo -e "${YELLOW}Suggested Actions:${NC}"
    echo "  1. Create in ~/business-docs/ instead"
    echo "  2. Create a separate repository for this content"
    echo "  3. Confirm with user BEFORE proceeding"
    echo ""
    
    # Try to suggest better location
    case "$FILE_TYPE" in
        docx|xlsx|pptx)
            echo "💡 SUGGESTION: Move to ~/business-docs/ or dedicated docs repo"
            ;;
        *)
            echo "💡 SUGGESTION: Verify this is the correct working directory"
            ;;
    esac
    
    echo ""
    read -p "Are you sure you want to proceed? (yes/no) " CONFIRM
    
    if [ "$CONFIRM" != "yes" ]; then
        echo -e "${RED}❌ ABORTED: Action cancelled by scope guard${NC}"
        exit 1
    else
        echo -e "${YELLOW}⚠️  PROCEEDING WITH CAUTION...${NC}"
    fi
else
    echo -e "${GREEN}✅ File type appears acceptable for this context${NC}"
fi

echo ""
echo "=========================================="
echo "Scope guard check complete"
echo "=========================================="
