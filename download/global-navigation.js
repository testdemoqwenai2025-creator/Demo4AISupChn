/*
 * AI SUPPLY CHAIN - GLOBAL NAVIGATION SYSTEM v4.0
 * ================================================
 * 
 * This file contains the complete global navigation system
 * to be included on ALL pages for consistent UX.
 * 
 * FEATURES:
 * - 🌙 Dark/Light Theme Toggle (localStorage persistent)
 * - 🏠 Return to Home Button
 * - ← Back/Return Navigation  
 * - 🔍 Global Search (Ctrl/Cmd+K)
 * - 🔔 Notification Center
 * - 👤 User Profile/Settings
 * - 📱 Mobile Responsive
 * - ♿ Accessibility Features
 * - 🌐 Multi-language Ready
 * 
 * IMPLEMENTATION: Include this script on every page
 */

// ===== GLOBAL NAVIGATION CONFIGURATION =====
const GlobalNavConfig = {
    version: '4.0.0',
    platformName: 'AI SupChn',
    baseUrl: '/Demo4AISupChn/',
    pages: [
        { name: 'Home', url: 'index.html', icon: '🏠' },
        { name: 'Dashboard', url: 'dashboard.html', icon: '📊' },
        { name: 'Command Center', url: 'command-center.html', icon: '🎛️' },
        { name: 'Platform', url: 'platform.html', icon: '🏗️' },
        { name: 'Intelligence', url: 'intelligence.html', icon: '🧠' },
        { name: 'Resources', url: 'resources.html', icon: '📚' },
        { name: 'About', url: 'about.html', icon: 'ℹ️' },
        { name: 'Events', url: 'events.html', icon: '📅' },
        { name: 'Industries', url: 'industries.html', icon: '🏭' },
        { name: 'Product', url: 'product.html', icon: '📦' },
        { name: 'Support', url: 'support.html', icon: '💬' },
        { name: 'AI Agents', url: 'agents.html', icon: '🤖' },
        { name: 'Customers', url: 'customers.html', icon: '👥' }
    ],
    theme: {
        defaultTheme: 'dark',
        storageKey: 'aisupchn_theme'
    }
};

// ===== THEME MANAGEMENT SYSTEM =====
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem(GlobalNavConfig.theme.storageKey) || 
                          GlobalNavConfig.theme.defaultTheme;
        this.applyTheme();
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem(GlobalNavConfig.theme.storageKey, this.currentTheme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: this.currentTheme } 
        }));
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update all theme toggle buttons on page
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            const sunIcon = btn.querySelector('.icon-sun');
            const moonIcon = btn.querySelector('.icon-moon');
            
            if (this.currentTheme === 'light') {
                if (sunIcon) sunIcon.style.display = 'inline-block';
                if (moonIcon) moonIcon.style.display = 'none';
                btn.title = 'Switch to Dark Mode';
            } else {
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'inline-block';
                btn.title = 'Switch to Light Mode';
            }
        });
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager globally
window.themeManager = new ThemeManager();

// ===== GLOBAL NAVIGATION HTML GENERATOR =====
function generateGlobalNavigation(currentPage) {
    const currentPageData = GlobalNavConfig.pages.find(p => 
        window.location.pathname.includes(p.url)
    ) || GlobalNavConfig.pages[0];

    return `
    <!-- ===== GLOBAL NAVIGATION BAR v4.0 ===== -->
    <nav class="global-nav" role="navigation" aria-label="Main Navigation">
        <div class="global-nav-container">
            <!-- Left Section: Brand & Home -->
            <div class="global-nav-left">
                <a href="${GlobalNavConfig.baseUrl}" class="global-nav-brand" title="Return to Home">
                    <span class="brand-icon">🤖</span>
                    <span class="brand-text">${GlobalNavConfig.platformName}</span>
                </a>
                
                <!-- Home Button -->
                <a href="${GlobalNavConfig.baseUrl}index.html" class="global-nav-home-btn" title="Go to Homepage">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-label">Home</span>
                </a>
                
                <!-- Breadcrumb / Current Page Indicator -->
                <div class="breadcrumb-container">
                    <a href="${GlobalNavConfig.baseUrl}index.html" class="breadcrumb-item">Home</a>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-current">${currentPageData.name}</span>
                </div>
            </div>

            <!-- Center Section: Main Navigation -->
            <div class="global-nav-center">
                <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Toggle Menu">
                    ☰
                </button>
                
                <ul class="global-nav-links" id="mainNavLinks">
                    ${GlobalNavConfig.pages.map(page => `
                        <li class="nav-item ${page.url === currentPageData.url ? 'active' : ''}">
                            <a href="${GlobalNavConfig.baseUrl}${page.url}" 
                               class="nav-link"
                               title="${page.name}">
                                <span class="nav-icon">${page.icon}</span>
                                <span class="nav-label">${page.name}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Right Section: Actions & Tools -->
            <div class="global-nav-right">
                <!-- Global Search -->
                <div class="global-search-container">
                    <button class="global-search-btn" onclick="openGlobalSearch()" title="Global Search (Ctrl/Cmd + K)">
                        <span>🔍</span>
                    </button>
                </div>

                <!-- Notifications -->
                <button class="global-notifications-btn" onclick="toggleNotifications()" title="Notifications">
                    <span>🔔</span>
                    <span class="notification-badge">3</span>
                </button>

                <!-- Theme Toggle -->
                <button class="global-theme-toggle theme-toggle-btn" onclick="window.themeManager.toggle()" title="Toggle Theme">
                    <span class="icon-moon">🌙</span>
                    <span class="icon-sun">☀️</span>
                </button>

                <!-- User/Profile -->
                <button class="global-user-btn" onclick="toggleUserMenu()" title="User Menu">
                    <span>👤</span>
                </button>

                <!-- Back Button (visible on inner pages) -->
                ${currentPageData.name !== 'Home' ? `
                <button class="global-back-btn" onclick="goBack()" title="Go Back">
                    <span>←</span>
                    <span class="nav-label">Back</span>
                </button>
                ` : ''}
            </div>
        </div>

        <!-- Notifications Panel (Hidden by default) -->
        <div class="notifications-panel" id="notificationsPanel">
            <div class="notifications-header">
                <h3>🔔 Notifications</h3>
                <button onclick="markAllRead()" class="btn-text">Mark all read</button>
            </div>
            <div class="notifications-list">
                <div class="notification-item unread">
                    <div class="notification-icon">⚠️</div>
                    <div class="notification-content">
                        <strong>Typhoon Alert</strong>
                        <p>TechComp Industries Ltd may be affected</p>
                        <span class="notification-time">2 min ago</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-icon">📈</div>
                    <div class="notification-content">
                        <strong>Price Alert: Semiconductors</strong>
                        <p>Market price increased 5.2% today</p>
                        <span class="notification-time">15 min ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">✅</div>
                    <div class="notification-content">
                        <strong>PO Approved</strong>
                        <td>PO-2025-0842 has been approved</td>
                        <span class="notification-time">1 hour ago</span>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <!-- User Menu (Hidden by default) -->
        <div class="user-menu-panel" id="userMenuPanel">
            <div class="user-menu-header">
                <div class="user-avatar">👤</div>
                <div class="user-info">
                    <strong>User Name</strong>
                    <span>user@company.com</span>
                </div>
            </div>
            <ul class="user-menu-items">
                <li><a href="#" onclick="showProfile()">👤 My Profile</a></li>
                <li><a href="#" onclick="showSettings()">⚙️ Settings</a></li>
                <li><a href="#" onclick="showSubscription()">💎 Subscription</a></li>
                <li><a href="#" onclick="showHelp()">❓ Help & Support</a></li>
                <li class="divider"></li>
                <li><a href="#" onclick="logout()" style="color:#ef4444;">🚪 Logout</a></li>
            </ul>
        </div>
    </nav>

    <!-- Global Search Modal (Hidden by default) -->
    <div class="global-search-modal" id="globalSearchModal">
        <div class="search-modal-overlay" onclick="closeGlobalSearch()"></div>
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h2>🔍 Global Search</h2>
                <button onclick="closeGlobalSearch()" class="close-btn">×</button>
            </div>
            <input type="text" 
                   class="search-modal-input" 
                   placeholder="Search features, docs, suppliers, tenders..." 
                   id="globalSearchInput"
                   oninput="performGlobalSearch(this.value)">
            <div class="search-results-container" id="globalSearchResults">
                <div class="search-category">
                    <h4>📄 Pages</h4>
                    <a href="${GlobalNavConfig.baseUrl}dashboard.html" class="search-result-item">
                        <span>📊 Dashboard</span>
                        <span>KPIs, analytics, real-time monitoring</span>
                    </a>
                    <a href="${GlobalNavConfig.baseUrl}command-center.html" class="search-result-item">
                        <span>🎛️ Command Center</span>
                        <span>Procurement, tenders, orders</span>
                    </a>
                </div>
                <div class="search-category">
                    <h4>🔧 Quick Actions</h4>
                    <button onclick="createNewTender()" class="search-result-item">
                        <span>📋 Create Tender</span>
                        <span>Start a new procurement process</span>
                    </button>
                    <button onclick="generatePO()" class="search-result-item">
                        <span>📦 Generate PO</span>
                        <span>Create purchase order</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenuOverlay" onclick="toggleMobileMenu()"></div>
    `;
}

// ===== GLOBAL NAVIGATION FUNCTIONS =====

// Initialize navigation on page load
function initGlobalNavigation() {
    // Insert global navigation CSS
    insertGlobalNavCSS();
    
    // Generate and insert navigation HTML
    const navHTML = generateGlobalNavigation(window.location.pathname);
    
    // Insert at beginning of body
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = navHTML;
    document.body.insertBefore(tempDiv.firstElementChild, document.body.firstChild);
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    console.log(`[GLOBAL NAV v${GlobalNavConfig.version}] Initialized`);
}

// Go back in history or to home
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = GlobalNavConfig.baseUrl;
    }
}

// Open global search modal
function openGlobalSearch() {
    const modal = document.getElementById('globalSearchModal');
    modal.classList.add('active');
    setTimeout(() => {
        document.getElementById('globalSearchInput').focus();
    }, 100);
}

// Close global search modal
function closeGlobalSearch() {
    document.getElementById('globalSearchModal').classList.remove('active');
}

// Perform global search
function performGlobalSearch(query) {
    const resultsContainer = document.getElementById('globalSearchResults');
    
    if (!query || query.length < 2) {
        resultsContainer.innerHTML = `
            <div style="padding:2rem;text-align:center;color:var(--text-secondary);">
                Type at least 2 characters to search...
            </div>
        `;
        return;
    }
    
    // Simulated search results (would connect to actual search API)
    const results = GlobalNavConfig.pages.filter(page => 
        page.name.toLowerCase().includes(query.toLowerCase())
    ).map(page => `
        <a href="${GlobalNavConfig.baseUrl}${page.url}" class="search-result-item">
            <span>${page.icon} ${page.name}</span>
            <span>Navigate to ${page.name}</span>
        </a>
    `).join('');
    
    resultsContainer.innerHTML = `
        <div class="search-category">
            <h4>🔍 Results for "${query}"</h4>
            ${results || '<p style="color:var(--text-secondary);padding:1rem;">No results found</p>'}
        </div>
    `;
}

// Toggle notifications panel
function toggleNotifications() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.toggle('active');
    
    // Close user menu if open
    document.getElementById('userMenuPanel').classList.remove('active');
}

// Toggle user menu
function toggleUserMenu() {
    const panel = document.getElementById('userMenuPanel');
    panel.classList.toggle('active');
    
    // Close notifications if open
    document.getElementById('notificationsPanel').classList.remove('active');
}

// Mark all notifications as read
function markAllRead() {
    document.querySelectorAll('.notification-item.unread').forEach(item => {
        item.classList.remove('unread');
    });
    document.querySelector('.notification-badge').style.display = 'none';
}

// Mobile menu toggle
function toggleMobileMenu() {
    const links = document.getElementById('mainNavLinks');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    links.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Keyboard shortcuts initialization
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Global search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openGlobalSearch();
        }
        
        // Escape: Close modals/panels
        if (e.key === 'Escape') {
            closeGlobalSearch();
            document.getElementById('notificationsPanel').classList.remove('active');
            document.getElementById('userMenuPanel').classList.remove('active');
        }
        
        // Ctrl/Cmd + /: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            openGlobalSearch();
        }
    });
}

// User menu actions (placeholders)
function showProfile() { alert('Profile management would open here'); }
function showSettings() { alert('Settings panel would open here'); }
function showSubscription() { alert('Subscription management would open here'); }
function showHelp() { alert('Help & support center would open here'); }
function logout() { 
    if (confirm('Are you sure you want to logout?')) {
        alert('You have been logged out');
        window.location.href = GlobalNavConfig.baseUrl;
    }
}
function createNewTender() {
    closeGlobalSearch();
    window.location.href = `${GlobalNavConfig.baseUrl}command-center.html#tenders`;
}
function generatePO() {
    closeGlobalSearch();
    window.location.href = `${GlobalNavConfig.baseUrl}command-center.html#orders`;
}

// ===== GLOBAL NAVIGATION CSS STYLES =====
function insertGlobalNavCSS() {
    const css = `
    /* ===== GLOBAL NAVIGATION STYLES v4.0 ===== */
    .global-nav {
        position: fixed; top: 0; left: 0; right: 0;
        z-index: 9999;
        background: var(--nav-bg, rgba(15,23,42,0.95));
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.1));
        padding: 0.5rem 1.5rem;
        transition: all 0.3s ease;
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }
    
    [data-theme="light"] .global-nav {
        background: var(--nav-bg, rgba(248,250,252,0.98));
    }
    
    .global-nav-container {
        max-width: 1800px; margin: 0 auto;
        display: flex; justify-content: space-between; align-items: center;
        gap: 1rem; flex-wrap: wrap;
    }
    
    /* Left Section */
    .global-nav-left {
        display: flex; align-items: center; gap: 1rem;
    }
    
    .global-nav-brand {
        display: flex; align-items: center; gap: 0.5rem;
        text-decoration: none; color: inherit;
        font-size: 1.15rem; font-weight: 800;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: transform 0.3s ease;
    }
    
    .global-nav-brand:hover { transform: scale(1.05); }
    
    .brand-icon { font-size: 1.5rem; -webkit-text-fill-color: initial; }
    
    .global-nav-home-btn {
        display: flex; align-items: center; gap: 0.35rem;
        padding: 0.5rem 0.75rem;
        background: var(--glass-bg, rgba(255,255,255,0.05));
        border: 1px solid var(--border-color, rgba(255,255,255,0.1));
        border-radius: 8px;
        color: var(--text-secondary, #94a3b8);
        text-decoration: none;
        font-size: 0.85rem; font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .global-nav-home-btn:hover {
        background: var(--glass-bg, rgba(59,130,246,0.1));
        color: var(--text-primary, #f8fafc);
        border-color: rgba(59,130,246,0.3);
        transform: translateY(-1px);
    }
    
    /* Breadcrumb */
    .breadcrumb-container {
        display: flex; align-items: center; gap: 0.5rem;
        font-size: 0.82rem; color: var(--text-secondary, #94a3b8);
    }
    
    .breadcrumb-item {
        color: var(--text-secondary, #94a3b8); text-decoration: none;
        transition: color 0.3s ease;
    }
    
    .breadcrumb-item:hover { color: var(--accent-blue, #3b82f6); }
    .breadcrumb-current { color: var(--text-primary, #f8fafc); font-weight: 600; }
    .breadcrumb-separator { opacity: 0.5; }
    
    /* Center Section */
    .global-nav-center { position: relative; }
    
    .mobile-menu-toggle {
        display: none; background: var(--glass-bg, rgba(255,255,255,0.05));
        border: 1px solid var(--border-color, rgba(255,255,255,0.1));
        color: var(--text-primary, #f8fafc); font-size: 1.25rem;
        padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer;
    }
    
    .global-nav-links {
        display: flex; list-style: none; gap: 0.25rem;
        margin: 0; padding: 0;
    }
    
    .nav-item { position: relative; }
    
    .nav-link {
        display: flex; align-items: center; gap: 0.35rem;
        padding: 0.55rem 0.85rem;
        color: var(--text-secondary, #94a3b8); text-decoration: none;
        font-size: 0.82rem; font-weight: 500;
        border-radius: 8px; border: 1px solid transparent;
        transition: all 0.3s ease;
        white-space: nowrap;
    }
    
    .nav-link:hover {
        background: var(--glass-bg, rgba(255,255,255,0.05));
        color: var(--text-primary, #f8fafc);
        border-color: var(--border-color, rgba(255,255,255,0.1));
        transform: translateY(-1px);
    }
    
    .nav-item.active .nav-link {
        background: rgba(59,130,246,0.15);
        color: #93c5fd;
        border-color: rgba(59,130,246,0.3);
    }
    
    .nav-icon { font-size: 0.9rem; }
    
    /* Right Section */
    .global-nav-right {
        display: flex; align-items: center; gap: 0.5rem;
    }
    
    .global-search-btn,
    .global-notifications-btn,
    .global-theme-toggle,
    .global-user-btn,
    .global-back-btn {
        width: 38px; height: 38px;
        display: flex; align-items: center; justify-content: center;
        background: var(--glass-bg, rgba(255,255,255,0.05));
        border: 1px solid var(--border-color, rgba(255,255,255,0.1));
        border-radius: 10px;
        color: var(--text-secondary, #94a3b8);
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
        position: relative;
    }
    
    .global-search-btn:hover,
    .global-notifications-btn:hover,
    .global-theme-toggle:hover,
    .global-user-btn:hover,
    .global-back-btn:hover {
        background: var(--glass-bg, rgba(255,255,255,0.1));
        color: var(--text-primary, #f8fafc);
        border-color: rgba(59,130,246,0.3);
        transform: translateY(-2px);
    }
    
    .global-back-btn {
        width: auto; padding: 0 0.75rem;
        gap: 0.35rem;
        font-size: 0.88rem; font-weight: 600;
    }
    
    .notification-badge {
        position: absolute; top: -4px; right: -4px;
        width: 18px; height: 18px;
        background: #ef4444; color: white;
        border-radius: 50%;
        font-size: 0.65rem; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        animation: pulse-badge 2s infinite;
    }
    
    @keyframes pulse-badge {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .theme-toggle-btn .icon-sun { display: none; }
    .theme-toggle-btn .icon-moon { display: inline-block; }
    
    /* Panels */
    .notifications-panel,
    .user-menu-panel {
        position: absolute; top: 100%; right: 1.5rem;
        width: 350px;
        background: var(--bg-secondary, #1e293b);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-color, rgba(255,255,255,0.1));
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        opacity: 0; visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        z-index: 10000;
        max-height: 500px; overflow-y: auto;
    }
    
    [data-theme="light"] .notifications-panel,
    [data-theme="light"] .user-menu-panel {
        background: var(--bg-secondary, #ffffff);
        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    }
    
    .notifications-panel.active,
    .user-menu-panel.active {
        opacity: 1; visibility: visible; transform: translateY(10px);
    }
    
    .notifications-header,
    .user-menu-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.1));
    }
    
    .notifications-header h3 { font-size: 1rem; margin: 0; }
    .btn-text {
        background: none; border: none; color: var(--accent-blue, #3b82f6);
        cursor: pointer; font-size: 0.85rem; font-weight: 600;
    }
    
    .notification-item {
        display: flex; gap: 0.75rem; padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.05));
        transition: background 0.3s ease; cursor: pointer;
    }
    
    .notification-item:hover { background: var(--glass-bg, rgba(255,255,255,0.03)); }
    .notification-item.unread { background: rgba(59,130,246,0.08); }
    
    .notification-icon { font-size: 1.25rem; }
    .notification-content strong { display: block; font-size: 0.9rem; margin-bottom: 0.25rem; }
    .notification-content p { font-size: 0.82rem; color: var(--text-secondary, #94a3b8); margin: 0; }
    .notification-time { font-size: 0.72rem; color: var(--text-secondary, #94a3b8); opacity: 0.7; }
    
    .user-avatar {
        width: 48px; height: 48px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.5rem;
    }
    
    .user-info { flex: 1; margin-left: 0.75rem; }
    .user-info strong { display: block; font-size: 0.95rem; }
    .user-info span { font-size: 0.82rem; color: var(--text-secondary, #94a3b8); }
    
    .user-menu-items { list-style: none; padding: 0.5rem 0; margin: 0; }
    .user-menu-items li a {
        display: block; padding: 0.65rem 1.25rem;
        color: var(--text-primary, #f8fafc); text-decoration: none;
        font-size: 0.88rem; transition: background 0.3s ease;
    }
    .user-menu-items li a:hover { background: var(--glass-bg, rgba(255,255,255,0.05)); }
    .user-menu-items .divider { height: 1px; background: var(--border-color, rgba(255,255,255,0.1)); margin: 0.5rem 0; }
    
    /* Global Search Modal */
    .global-search-modal {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        z-index: 20000;
        display: none; align-items: flex-start; justify-content: center;
        padding-top: 10vh;
    }
    
    .global-search-modal.active { display: flex; }
    
    .search-modal-overlay {
        position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.7); backdrop-filter: blur(5px);
    }
    
    .search-modal-content {
        position: relative; width: 90%; max-width: 700px;
        background: var(--bg-secondary, #1e293b);
        border: 1px solid var(--border-color, rgba(255,255,255,0.1));
        border-radius: 20px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        overflow: hidden;
    }
    
    .search-modal-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 1.5rem; border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.1));
    }
    
    .search-modal-header h2 { margin: 0; font-size: 1.25rem; }
    .close-btn {
        background: none; border: none; color: var(--text-secondary, #94a3b8);
        font-size: 2rem; cursor: pointer; line-height: 1;
    }
    
    .search-modal-input {
        width: 100%; padding: 1.25rem 1.5rem;
        background: var(--bg-tertiary, #334155);
        border: none; border-bottom: 2px solid var(--accent-blue, #3b82f6);
        color: var(--text-primary, #f8fafc);
        font-size: 1.1rem; outline: none;
    }
    
    .search-results-container {
        max-height: 400px; overflow-y: auto; padding: 1rem;
    }
    
    .search-category h4 {
        font-size: 0.85rem; text-transform: uppercase;
        letter-spacing: 0.05em; color: var(--text-secondary, #94a3b8);
        margin: 0 0 0.75rem; padding: 0 0.5rem;
    }
    
    .search-result-item {
        display: flex; justify-content: space-between; align-items: center;
        padding: 0.75rem 1rem;
        background: var(--bg-tertiary, #334155);
        border-radius: 10px; margin-bottom: 0.5rem;
        color: var(--text-primary, #f8fafc); text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .search-result-item:hover {
        background: rgba(59,130,246,0.15);
        transform: translateX(5px);
    }
    
    .search-result-item span:first-child { font-weight: 600; }
    .search-result-item span:last-child { font-size: 0.82rem; color: var(--text-secondary, #94a3b8); }
    
    /* Mobile Menu */
    .mobile-menu-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5); z-index: 9998;
        display: none;
    }
    
    .mobile-menu-overlay.active { display: block; }
    
    /* Responsive */
    @media (max-width: 1200px) {
        .breadcrumb-container { display: none; }
        .nav-link .nav-label { display: none; }
    }
    
    @media (max-width: 768px) {
        .global-nav { padding: 0.5rem 1rem; }
        
        .mobile-menu-toggle { display: block; }
        
        .global-nav-links {
            position: fixed; top: 60px; left: 0; right: 0;
            background: var(--bg-secondary, #1e293b);
            flex-direction: column; padding: 1rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: 10px 0 30px rgba(0,0,0,0.3);
            max-height: calc(100vh - 60px); overflow-y: auto;
        }
        
        .global-nav-links.active { transform: translateX(0); }
        
        .global-nav-right { gap: 0.35rem; }
        
        .global-back-btn .nav-label { display: none; }
        
        .notifications-panel,
        .user-menu-panel {
            position: fixed; left: 10px; right: 10px; width: auto;
        }
    }
    
    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .global-nav { border-width: 2px; }
        .nav-link { border-width: 2px; }
    }
    `;
    
    // Inject styles into head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = css;
    document.head.appendChild(styleSheet);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalNavigation);
} else {
    initGlobalNavigation();
}

// Export for use in other scripts
window.GlobalNavConfig = GlobalNavConfig;
window.generateGlobalNavigation = generateGlobalNavigation;
