# Repository Contamination Prevention Framework
# =============================================
# How to prevent "scope creep" and repository corruption in AI assistant sessions

## The Problem (What Happened)
---------------------------------
SCENARIO: User asked for email templates for investor outreach
EXPECTED: Create documents in appropriate location
ACTUAL: Created .docx files in Demo4AISupChn (AI demo) repository
ROOT CAUSE: Session continuation without context verification

## Why This Is Dangerous
-----------------------
1. **Repository Identity Confusion**: Clones will contain irrelevant business docs
2. **Git History Pollution**: Commit history mixed with wrong content type
3. **Deployment Risk**: GitHub Pages might deploy wrong files
4. **Team Confusion**: Contributors won't understand repo purpose
5. **Security Concerns**: Business-sensitive data in public demo repo

## Prevention System: 3-Layer Defense
======================================

### LAYER 1: Pre-Action Verification (Before Creating ANY File)
-----------------------------------------------------------------
MANDATORY CHECKS (Run these EVERY time):

□ **Repository Identity Check**
  ```bash
  # Run this before any file creation
  pwd
  cat README.md | head -20
  cat .git/description 2>/dev/null
  ls -la *.html *.js 2>/dev/null | head -5
  ```

□ **Scope Alignment Check**
  - What is this repo's PURPOSE? (Check README, .SCOPE_GUARD)
  - Does my intended action MATCH that purpose?
  - If NO → STOP and find correct location

□ **File Type Validation**
  - Are .docx/.xlsx/.pptx allowed here? (Usually NO for code repos)
  - Should this be a separate repository?
  - Am I confusing "working directory" with "output directory"?

### LAYER 2: Session Context Awareness
--------------------------------------
WHEN SESSION CONTINUES:

□ **Re-Verify Context**
  - "What were we working on?" 
  - "Is the user request STILL within original scope?"
  - "Has the conversation drifted to unrelated topics?"

□ **Watch for Scope Drift Indicators**
  - User asks for something completely different from repo content
  - File types don't match existing codebase
  - Deliverable would confuse someone cloning the repo
  - You're about to create business docs in a tech project

□ **Explicit Confirmation Required**
  When scope is UNCLEAR, ASK:
  - "This seems different from [repo name]'s purpose. Should I create this in [alternative location] instead?"
  - "Just confirming: you want [X] created in [current repo], or should it go elsewhere?"

### LAYER 3: Output Location Rules
-------------------------------
WHERE TO PUT DIFFERENT CONTENT TYPES:

| Content Type | Correct Location | Wrong Location |
|-------------|-----------------|----------------|
| Code/HTML/CSS | In the project repo | ~/business-docs/ |
| Business Documents (.docx) | Separate repo or ~/docs/ | Code repos |
| Email Templates | CRM tooling repo | AI demo repos |
| Investor Lists | BD/Sales repo | Any code repo |
| Generated Reports | Output directory, not source | src/ directory |
| Temporary Scripts | /tmp or scripts/ (cleanup after) | Root of repo |

## Quick Reference: Danger Signals
==================================

🚨 **STOP IMMEDIATELY IF:**

1. You're creating .docx in a directory full of .html files
2. You're creating spreadsheets in a frontend project
3. The file would make no sense to a developer cloning the repo
4. You can't explain WHY this file belongs HERE specifically
5. The user's request has nothing to do with the repo's README/purpose

## Recovery Procedures
====================

IF YOU REALIZE YOU'VE CONTAMINATED A REPO:

**Immediate Actions (within 1 minute):**
```bash
# 1. Stop creating more files
# 2. Move contaminated files
mkdir -p ~/correct-location/
mv wrong-file.* ~/correct-location/

# 3. Restore git cleanliness
git checkout -- .
git clean -fd

# 4. Verify status
git status
```

**Post-Incident Review:**
1. What was I asked to create?
2. Where did I put it? (Wrong!)
3. Where SHOULD it have gone?
4. Why didn't I check first?
5. How do I prevent this specific mistake?

## Implementation Checklist
==========================

For EACH new session:

□ [ ] Identify current working directory
□ [ ] Read repo README or .SCOPE_GUARD file  
□ [ ] Confirm user request matches repo purpose
□ [ ] If mismatch → Propose correct location BEFORE acting
□ [ ] After creating files → Verify they belong here
□ [ ] Git status check → Only expected changes shown

## Training Scenarios (Test Yourself)
===================================

**Scenario A**: User in python-web-scraper repo asks for "investor pitch deck"
→ ❌ WRONG: Create .pptx in scraper repo
→ ✅ RIGHT: "This is a web scraper project. Pitch deck should go in your business repo. Shall I create it there?"

**Scenario B**: User in mobile-app repo asks for "email templates"
→ ❌ WRONG: Generate .docx in mobile-app/src/
→ ✅ RIGHT: Suggest separate location or confirm intent

**Scenario C**: Continued session, context lost
→ ❌ WRONG: Assume previous context still applies
→ ✅ RIGHT: Re-verify repo identity before any actions

## Success Metrics
=================

Track these to measure prevention effectiveness:
- Zero scope violations per month
- All files in repo match ACCEPTABLE_FILES list
- No business documents in code repositories
- Clean git history (no "oops, deleted wrong file" commits)

## Version History
===============
v1.0 - 2025-08-28 - Initial version after contamination incident
