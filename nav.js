/**
 * nav.js — Navegação e idioma compartilhados entre todas as páginas do portfólio
 * Leandro Guimarães Portfolio
 */

(function () {
    // ── CONFIG ──────────────────────────────────────────────────────────────
    const STORAGE_KEY = 'portfolio_lang';
    const DEFAULT_LANG = 'pt-BR';

    const PAGES = [
        { key: 'home',    href: 'index.html',   labelPT: 'Início',   labelEN: 'Home' },
        { key: 'sobre',   href: 'sobre.html',    labelPT: 'Sobre',    labelEN: 'About' },
        { key: 'fit',     href: 'fit.html',      labelPT: 'Fit IA',   labelEN: 'Fit IA' },
        { key: 'ra',      href: 'RA.html',       labelPT: 'Rec. 3D',  labelEN: '3D Rec.' },
        { key: 'hiia',    href: 'HIIA.html',     labelPT: 'HIIA',     labelEN: 'HIIA' },
        { key: 'contato', href: 'contato.html',  labelPT: 'Contato',  labelEN: 'Contact' },
    ];

    // Detect current page
    function getCurrentPage() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        return PAGES.find(p => p.href === path)?.key || 'home';
    }

    // ── LANGUAGE ─────────────────────────────────────────────────────────────
    function getLang() {
        try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch { return DEFAULT_LANG; }
    }

    function setLang(lang) {
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang);
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        document.querySelectorAll('.nav-label-pt').forEach(el => el.style.display = lang === 'pt-BR' ? '' : 'none');
        document.querySelectorAll('.nav-label-en').forEach(el => el.style.display = lang === 'en-US' ? '' : 'none');
        try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    }

    // Expose globally so inline onclick still works
    window.setLang = setLang;

    // ── BUILD SHARED HEADER ──────────────────────────────────────────────────
    function buildHeader() {
        const existing = document.querySelector('.site-header');
        if (!existing) return;

        const current = getCurrentPage();

        existing.innerHTML = `
            <a class="nav-logo" href="index.html">
                Leandro<span>Guimarães</span>
            </a>

            <nav class="nav-links" id="nav-links">
                ${PAGES.map(p => `
                    <a href="${p.href}"
                       class="nav-link ${p.key === current ? 'nav-link--active' : ''}">
                        <span class="nav-label-pt">${p.labelPT}</span>
                        <span class="nav-label-en">${p.labelEN}</span>
                    </a>
                `).join('')}
            </nav>

            <div class="nav-right">
                <div class="lang-toggle">
                    <button class="lang-btn" data-lang="pt-BR" onclick="setLang('pt-BR')">PT</button>
                    <button class="lang-btn" data-lang="en-US" onclick="setLang('en-US')">EN</button>
                </div>
                <button class="hamburger" id="hamburger" aria-label="Menu" onclick="toggleMobileMenu()">
                    <span></span><span></span><span></span>
                </button>
            </div>
        `;

        // Inject mobile menu after header if not present
        if (!document.getElementById('mobile-menu')) {
            const mob = document.createElement('nav');
            mob.id = 'mobile-menu';
            mob.className = 'mobile-menu';
            mob.innerHTML = PAGES.map(p => `
                <a href="${p.href}" class="${p.key === current ? 'nav-link--active' : ''}" onclick="closeMobileMenu()">
                    <span class="nav-label-pt">${p.labelPT}</span>
                    <span class="nav-label-en">${p.labelEN}</span>
                </a>
            `).join('');
            existing.insertAdjacentElement('afterend', mob);
        }
    }

    // ── BUILD SHARED FOOTER ──────────────────────────────────────────────────
    function buildFooter() {
        const existing = document.querySelector('footer');
        if (!existing) return;

        existing.innerHTML = `
            <span class="nav-label-pt">© 2025 Leandro Guimarães · Todos os direitos reservados</span>
            <span class="nav-label-en">© 2025 Leandro Guimarães · All rights reserved</span>
            <div class="footer-links">
                ${PAGES.map(p => `
                    <a href="${p.href}">
                        <span class="nav-label-pt">${p.labelPT}</span>
                        <span class="nav-label-en">${p.labelEN}</span>
                    </a>
                `).join('')}
            </div>
        `;
    }

    // ── INJECT NAV STYLES ────────────────────────────────────────────────────
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ── SHARED NAV STYLES ── */
            .site-header {
                position: fixed; top: 0; left: 0; right: 0; z-index: 200;
                display: flex; align-items: center; justify-content: space-between;
                padding: 0 48px; height: 62px;
                background: rgba(14,14,14,0.92); backdrop-filter: blur(16px);
                border-bottom: 1px solid rgba(15,218,241,0.15);
            }

            .nav-logo {
                font-family: 'Space Mono', monospace; font-size: 14px;
                color: #fff; text-decoration: none; letter-spacing: 0.06em;
                white-space: nowrap; flex-shrink: 0;
            }
            .nav-logo span { color: #0fdaf1; }

            .nav-links {
                display: flex; align-items: center; gap: 4px;
                flex: 1; justify-content: center;
            }

            .nav-link {
                font-family: 'Space Mono', monospace; font-size: 11px;
                color: #666; text-decoration: none; letter-spacing: 0.08em;
                padding: 6px 12px; border-radius: 6px;
                transition: color 0.2s, background 0.2s;
                white-space: nowrap;
            }
            .nav-link:hover { color: #0fdaf1; background: rgba(15,218,241,0.07); }
            .nav-link--active { color: #0fdaf1 !important; background: rgba(15,218,241,0.1) !important; }

            .nav-right {
                display: flex; align-items: center; gap: 12px; flex-shrink: 0;
            }

            .lang-toggle {
                display: flex; gap: 3px;
                background: #1a1a1a; border: 1px solid rgba(15,218,241,0.18);
                border-radius: 6px; padding: 3px;
            }
            .lang-btn {
                font-family: 'Space Mono', monospace; font-size: 11px;
                padding: 4px 10px; border: none; border-radius: 4px;
                cursor: pointer; background: transparent; color: #666;
                letter-spacing: 0.08em; transition: all 0.2s;
            }
            .lang-btn.active { background: #0fdaf1; color: #000; font-weight: 700; }

            .hamburger {
                display: none; flex-direction: column; gap: 5px;
                background: none; border: none; cursor: pointer; padding: 4px;
            }
            .hamburger span {
                display: block; width: 20px; height: 2px;
                background: #e8e8e8; border-radius: 2px; transition: all 0.3s;
            }
            .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
            .hamburger.open span:nth-child(2) { opacity: 0; }
            .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

            /* Mobile menu */
            .mobile-menu {
                display: none; position: fixed;
                top: 62px; left: 0; right: 0; z-index: 199;
                flex-direction: column; gap: 0;
                background: rgba(14,14,14,0.98); backdrop-filter: blur(16px);
                border-bottom: 1px solid rgba(15,218,241,0.15);
            }
            .mobile-menu.open { display: flex; }
            .mobile-menu a {
                font-family: 'Space Mono', monospace; font-size: 13px;
                color: #666; text-decoration: none; letter-spacing: 0.1em;
                padding: 18px 32px;
                border-bottom: 1px solid rgba(15,218,241,0.06);
                transition: color 0.2s, background 0.2s;
            }
            .mobile-menu a:hover,
            .mobile-menu a.nav-link--active { color: #0fdaf1; background: rgba(15,218,241,0.05); }

            /* Footer */
            footer {
                border-top: 1px solid rgba(15,218,241,0.15);
                padding: 28px 48px;
                display: flex; align-items: center; justify-content: space-between;
                gap: 24px; flex-wrap: wrap;
            }
            footer > span {
                font-family: 'Space Mono', monospace; font-size: 11px;
                color: #555; letter-spacing: 0.06em;
            }
            .footer-links {
                display: flex; gap: 20px; flex-wrap: wrap; justify-content: flex-end;
            }
            .footer-links a {
                font-family: 'Space Mono', monospace; font-size: 11px;
                color: #555; text-decoration: none; letter-spacing: 0.06em;
                transition: color 0.2s;
            }
            .footer-links a:hover { color: #0fdaf1; }

            /* Language visibility (for elements outside header/footer) */
            html[data-lang="pt-BR"] .en-only { display: none !important; }
            html[data-lang="en-US"] .pt-only { display: none !important; }

            /* Responsive */
            @media (max-width: 960px) {
                .site-header { padding: 0 20px; }
                .nav-links { display: none; }
                .hamburger { display: flex; }
                footer { padding: 20px 24px; flex-direction: column; align-items: flex-start; gap: 16px; }
                .footer-links { justify-content: flex-start; }
            }
        `;
        document.head.appendChild(style);
    }

    // ── MOBILE MENU TOGGLE ───────────────────────────────────────────────────
    window.toggleMobileMenu = function () {
        const ham = document.getElementById('hamburger');
        const mob = document.getElementById('mobile-menu');
        if (ham) ham.classList.toggle('open');
        if (mob) mob.classList.toggle('open');
    };

    window.closeMobileMenu = function () {
        const ham = document.getElementById('hamburger');
        const mob = document.getElementById('mobile-menu');
        if (ham) ham.classList.remove('open');
        if (mob) mob.classList.remove('open');
    };

    // ── INIT ─────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        injectStyles();
        buildHeader();
        buildFooter();
        setLang(getLang());
    });

})();
