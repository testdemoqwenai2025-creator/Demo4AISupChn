#!/bin/bash

# Script to add dark/light toggle to ALL pages in Demo4AISupChn
# This ensures consistent theming across the entire platform

REPO_DIR="/tmp/demo4aisupchn"
PAGES=("about.html" "dashboard.html" "intelligence.html" "platform.html" 
       "resources.html" "customers.html" "agents.html" "events.html" 
       "industries.html" "product.html" "support.html")

echo "🌙 Adding Dark/Light Toggle to All Pages..."
echo "=========================================="

# Theme Toggle CSS (to be added to <style> section)
THEME_CSS='
        /* ===== THEME TOGGLE ===== */
        .theme-toggle {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: var(--input-bg);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.15rem;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            background: var(--glass-bg);
            color: var(--text-primary);
            transform: rotate(15deg);
            border-color: var(--primary-light);
        }
        
        .theme-toggle .icon-sun { display: none; }
        .theme-toggle .icon-moon { display: inline-block; }
        
        [data-theme="light"] .theme-toggle .icon-sun { display: inline-block; }
        [data-theme="light"] .theme-toggle .icon-moon { display: none; }
'

# Theme Toggle HTML Button
THEME_BUTTON='                <!-- Theme Toggle -->
                <button class="theme-toggle" id="themeToggle" title="Toggle dark/light mode">
                    <span class="icon-moon">🌙</span>
                    <span class="icon-sun">☀️</span>
                </button>'

# Theme Toggle JavaScript
THEME_JS='
        // ===== THEME TOGGLE FUNCTIONALITY =====
        const themeToggle = document.getElementById("themeToggle");
        const htmlElement = document.documentElement;
        
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem("theme") || "dark";
        htmlElement.setAttribute("data-theme", savedTheme);
        
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            // Add a smooth transition effect
            document.body.style.transition = "background 0.3s ease, color 0.3s ease";
        });
'

for page in "${PAGES[@]}"; do
    FILE_PATH="$REPO_DIR/$page"
    
    echo ""
    echo "📄 Processing: $page"
    
    # Check if file exists
    if [ ! -f "$FILE_PATH" ]; then
        echo "⚠️  File not found: $FILE_PATH"
        continue
    fi
    
    # Check if theme toggle already exists
    if grep -q "theme-toggle" "$FILE_PATH"; then
        echo "✅ Theme toggle already present in $page"
        continue
    fi
    
    echo "➕ Adding theme toggle to $page..."
    
    # Create backup
    cp "$FILE_PATH" "${FILE_PATH}.backup"
    
    # 1. Ensure data-theme attribute is on <html> tag
    sed -i 's/<html/<html data-theme="dark"/g' "$FILE_PATH"
    
    # 2. Add CSS before closing </style> tag (find last occurrence)
    # Insert theme CSS before the first closing style tag we find that's not followed by another style
    if grep -q "</style>" "$FILE_PATH"; then
        # Use Python for more reliable text insertion
        python3 << PYEOF
import re

file_path = "$FILE_PATH"
theme_css = '''$THEME_CSS'''

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if theme CSS already exists
if '/* ===== THEME TOGGLE ===== */' not in content:
    # Find the last </style> tag and insert before it
    # We'll insert after the first major CSS section ends
    # Look for patterns like /* ===== [SECTION NAME] ===== */ and insert before next one
    
    # Simple approach: insert before the last </style>
    style_count = content.count('</style>')
    if style_count > 0:
        # Find position of last </style>
        pos = content.rfind('</style>')
        if pos != -1:
            content = content[:pos] + theme_css + '\n' + content[pos:]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Added CSS to $page")
else:
    print(f"⚠️  CSS already exists in $page")
PYEOF
    fi
    
    # 3. Add HTML button - look for navigation area patterns
    python3 << PYEOF
import re

file_path = "$FILE_PATH"
button_html = '''$THEME_BUTTON'''

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if button already exists
if 'id="themeToggle"' not in content:
    # Try to find navigation area by looking for common patterns
    # Pattern 1: Look for nav-right or similar container
    patterns = [
        (r'(<div class="nav-right">)', r'\1\n' + button_html),
        (r'(<div class="header-actions">)', r'\1\n' + button_html),
        (r'(<div class="nav-actions">)', r'\1\n' + button_html),
        (r'(<!-- Login Button -->)', button_html + '\n\1'),
        (r'(<button[^>]*class="[^"]*login[^"]*"[^>]*>)', button_html + '\n\1'),
    ]
    
    inserted = False
    for pattern, replacement in patterns:
        if re.search(pattern, content, re.IGNORECASE):
            content = re.sub(pattern, replacement, content, count=1, flags=re.IGNORECASE)
            inserted = True
            break
    
    # If no pattern found, try to find end of header/nav and insert there
    if not inserted:
        # Look for header or nav closing tags
        header_patterns = [
            (r'(</header>)', button_html + '\n\1'),
            (r'(</nav>)', button_html + '\n\1'),
        ]
        for pattern, replacement in header_patterns:
            if re.search(pattern, content, re.IGNORECASE):
                content = re.sub(pattern, replacement, content, count=1, flags=re.IGNORECASE)
                inserted = True
                break
    
    if inserted:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Added button to $page")
    else:
        print(f"⚠️  Could not find insertion point for button in $page")
else:
    print(f"⚠️  Button already exists in $page")
PYEOF
    
    # 4. Add JavaScript before closing </script> tag or at end of body
    python3 << PYEOF
import re

file_path = "$FILE_PATH"
js_code = '''$THEME_JS'''

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check if JS already exists
if 'THEME TOGGLE FUNCTIONALITY' not in content:
    # Find existing script tag or add new one
    if '<script>' in content or '<script ' in content:
        # Find last script tag and add before its closing
        # Look for pattern: add before </script> that's near end of file
        script_pos = content.rfind('</script>')
        if script_pos != -1:
            # Make sure it's not inside an already complex script
            content = content[:script_pos] + js_code + '\n' + content[script_pos:]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Added JS to $page")
        else:
            # Add before </body>
            content = content.replace('</body>', '<script>' + js_code + '</script>\n</body>')
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Added JS (new script) to $page")
    else:
        # No script tag exists, add before </body>
        content = content.replace('</body>', '<script>' + js_code + '</script>\n</body>')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Added JS (before body) to $page")
else:
    print(f"⚠️  JS already exists in $page")
PYEOF
    
    # Remove backup on success
    rm -f "${FILE_PATH}.backup"
done

echo ""
echo "=========================================="
echo "✅ Dark/Light Toggle Addition Complete!"
echo "=========================================="
echo ""
echo "📊 Summary:"
for page in "${PAGES[@]}"; do
    FILE_PATH="$REPO_DIR/$page"
    if [ -f "$FILE_PATH" ] && grep -q "theme-toggle" "$FILE_PATH"; then
        echo "✅ $page - Toggle added"
    elif [ -f "$FILE_PATH" ]; then
        echo "⚠️  $page - May need manual check"
    else
        echo "❌ $page - File missing"
    fi
done
