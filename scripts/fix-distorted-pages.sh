#!/bin/bash

# 🛠️ CAREFUL THEME TOGGLE ADDITION - Fix distorted pages
# This script properly adds theme toggle WITHOUT breaking layout

echo "🔧 Fixing Dashboard, Intelligence, and Agents pages..."
echo "=================================================="

FILES_TO_FIX=(
    "/tmp/demo4aisupchn/dashboard.html"
    "/tmp/demo4aisupchn/intelligence.html"
    "/tmp/demo4aisupchn/agents.html"
)

for FILE in "${FILES_TO_FIX[@]}"; do
    echo ""
    echo "📄 Processing: $(basename $FILE)"
    
    # 1. Add data-theme attribute to <html> tag if not present
    if ! grep -q 'data-theme=' "$FILE"; then
        sed -i 's/<html/<html data-theme="dark"/' "$FILE"
        echo "✅ Added data-theme attribute"
    else
        echo "⏭️  data-theme already exists"
    fi
    
    # 2. Add theme CSS variables after :root block (before html { )
    if ! grep -q '\[data-theme="light"\]' "$FILE"; then
        # Find the line with "html {" and add light theme vars before it
        sed -i '/^        html {/i\
        \
        /* ===== LIGHT THEME VARIABLES ===== */\
        [data-theme="light"] {\
            --dark: #f8fafc;\
            --dark-lighter: #e2e8f0;\
            --glass-bg: rgba(255,255,255,0.7);\
            --glass-border: rgba(0,0,0,0.1);\
            --text-primary: #0f172a;\
            --text-secondary: #475569;\
        }' "$FILE"
        echo "✅ Added light theme CSS variables"
    else
        echo "⏭️  Light theme CSS already exists"
    fi
    
    # 3. Add theme toggle CSS styles (find a good spot in style section)
    if ! grep -q 'theme-toggle' "$FILE"; then
        # Add before </style> tag
        sed -i '/<\/style>/i\
        \
        /* ===== THEME TOGGLE BUTTON ===== */\
        .theme-toggle {\
            width: 40px;\
            height: 40px;\
            border-radius: 10px;\
            background: var(--glass-bg);\
            border: 1px solid var(--glass-border);\
            color: var(--text-secondary);\
            cursor: pointer;\
            display: flex;\
            align-items: center;\
            justify-content: center;\
            font-size: 1.1rem;\
            transition: all 0.3s ease;\
            margin-left: 0.5rem;\
        }\
        .theme-toggle:hover {\
            background: rgba(59,130,246,0.15);\
            color: var(--text-primary);\
            transform: rotate(15deg);\
            border-color: rgba(59,130,246,0.3);\
        }\
        .theme-toggle .icon-sun { display: none; }\
        .theme-toggle .icon-moon { display: inline-block; }\
        [data-theme="light"] .theme-toggle .icon-sun { display: inline-block; }\
        [data-theme="light"] .theme-toggle .icon-moon { display: none; }' "$FILE"
        echo "✅ Added theme toggle CSS"
    else
        echo "⏭️  Theme toggle CSS already exists"
    fi
    
    # 4. Add theme toggle button in navigation (before </nav>)
    if ! grep -q 'id="themeToggle"' "$FILE"; then
        sed -i 's|</nav>|                <!-- Theme Toggle -->\
                <button class="theme-toggle" id="themeToggle" title="Toggle dark/light mode">\
                    <span class="icon-moon">🌙</span>\
                    <span class="icon-sun">☀️</span>\
                </button>\
</nav>|' "$FILE"
        echo "✅ Added theme toggle button to nav"
    else
        echo "⏭️  Theme toggle button already exists"
    fi
    
    # 5. Add JavaScript before </body>
    if ! grep -q 'THEME TOGGLE FUNCTIONALITY' "$FILE"; then
        sed -i '/<\/body>/i\
    <script>\
        // ===== THEME TOGGLE FUNCTIONALITY =====\
        document.addEventListener("DOMContentLoaded", function() {\
            const themeToggle = document.getElementById("themeToggle");\
            const htmlElement = document.documentElement;\
            \
            // Check for saved theme preference or default to dark\
            const savedTheme = localStorage.getItem("theme") || "dark";\
            htmlElement.setAttribute("data-theme", savedTheme);\
            \
            if (themeToggle) {\
                themeToggle.addEventListener("click", function() {\
                    const currentTheme = htmlElement.getAttribute("data-theme");\
                    const newTheme = currentTheme === "dark" ? "light" : "dark";\
                    \
                    htmlElement.setAttribute("data-theme", newTheme);\
                    localStorage.setItem("theme", newTheme);\
                    \
                    // Smooth transition\
                    document.body.style.transition = "background 0.3s ease, color 0.3s ease";\
                });\
            }\
        });\
    </script>' "$FILE"
        echo "✅ Added theme toggle JavaScript"
    else
        echo "⏭️  Theme toggle JS already exists"
    fi
    
    echo "✅ $(basename $FILE) fixed successfully!"
done

echo ""
echo "=================================================="
echo "✅ All pages fixed with proper theme toggle!"
echo "=================================================="
