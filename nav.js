/**
 * nav.js — Navegação e idioma compartilhados
 * Leandro Guimarães Portfolio
 *
 * FIX: GitHub Pages é case-sensitive.
 * Certifique-se que os nomes dos arquivos no repositório
 * correspondem EXATAMENTE aos hrefs abaixo (incluindo maiúsculas).
 *
 * Arquivos esperados na raiz do repositório:
 *   index.html
 *   sobre.html
 *   contato.html
 *   fit.html
 *   RA.html        ← R e A maiúsculos
 *   HIIA.html      ← tudo maiúsculo
 *   nav.js
 */

(function () {
    const STORAGE_KEY = 'portfolio_lang';
    const DEFAULT_LANG = 'pt-BR';

    const PAGES = [
        { key: 'index',   href: 'index.html',   labelPT: 'Início',   labelEN: 'Home'    },
        { key: 'sobre',   href: 'sobre.html',    labelPT: 'Sobre',    labelEN: 'About'   },
        { key: 'fit',     href: 'fit.html',      labelPT: 'Fit IA',   labelEN: 'Fit IA'  },
        { key: 'ra',      href: 'RA.html',       labelPT: 'Rec. 3D',  labelEN: '3D Rec.' },
        { key: 'hiia',    href: 'HIIA.html',     labelPT: 'HIIA',     labelEN: 'HIIA'    },
        { key: 'contato', href: 'contato.html',  labelPT: 'Contato',  labelEN: 'Contact' },
    ];

    // ── Detect current page (case-insensitive) ──────────────────────────────
    function getCurrentPage() {
        const raw = window.location.pathname.split('/').pop() || 'index.html';
        const lower = raw.toLowerCase();
        // match against lowercased hrefs
        const found = PAGES.find(p => p.href.toLowerCase() === lower);
        return found ? found.key : 'index';
    }

    // ── Language helpers ─────────────────────────────────────────────────────
    function getLang() {
        try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) { return DEFAULT_LANG; }
    }

    function setLang(lang) {
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang);

        // toggle lang-btn active state
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });

        // toggle nav label visibility (inside header built by this script)
        document.querySelectorAll('.nlpt').forEach(el => {
            el.style.display = lang === 'pt-BR' ? '' : 'none';
        });
        document.querySelectorAll('.nlen').forEach(el => {
            el.style.display = lang === 'en-US' ? '' : 'none';
        });

        // toggle page-level .pt-only / .en-only elements
        // (handled by CSS rules injected below, but also set display for
        //  elements that may have inline styles overriding CSS)
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }

    window.setLang = setLang;

    // ── Build shared header ──────────────────────────────────────────────────
    function buildHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        const current = getCurrentPage();

        const navLinks = PAGES.map(p => {
            const active = p.key === current ? ' nav-link--active' : '';
            return `<a href="${p.href}" class="nav-link${active}">
                        <span class="nlpt">${p.labelPT}</span>
                        <span class="nlen">${p.labelEN}</span>
                    </a>`;
        }).join('');

        header.innerHTML = `
            <a class="nav-logo" href="index.html">
                Leandro<span>Guimarães</span>
            </a>
            <nav class="nav-links" id="nav-links">${navLinks}</nav>
            <div class="nav-right">
                <div class="lang-toggle">
                    <button class="lang-btn" data-lang="pt-BR" onclick="setLang('pt-BR')">PT</button>
                    <button class="lang-btn" data-lang="en-US" onclick="setLang('en-US')">EN</button>
                </div>
                <button class="hamburger" id="hamburger" aria-label="Menu" onclick="toggleMobileMenu()">
                    <span></span><span></span><span></span>
                </button>
            </div>`;

        // Mobile menu
        if (!document.getElementById('mobile-menu')) {
            const mob = document.createElement('nav');
            mob.id = 'mobile-menu';
            mob.className = 'mobile-menu';
            mob.innerHTML = PAGES.map(p => {
                const active = p.key === current ? ' class="nav-link--active"' : '';
                return `<a href="${p.href}"${active} onclick="closeMobileMenu()">
                            <span class="nlpt">${p.labelPT}</span>
                            <span class="nlen">${p.labelEN}</span>
                        </a>`;
            }).join('');
            header.insertAdjacentElement('afterend', mob);
        }
    }

    // ── Build shared footer ──────────────────────────────────────────────────
    function buildFooter() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        footer.innerHTML = `
            <span>
                <span class="nlpt">© 2025 Leandro Guimarães · Todos os direitos reservados</span>
                <span class="nlen">© 2025 Leandro Guimarães · All rights reserved</span>
            </span>
            <div class="footer-links">
                ${PAGES.map(p => `
                    <a href="${p.href}">
                        <span class="nlpt">${p.labelPT}</span>
                        <span class="nlen">${p.labelEN}</span>
                    </a>`).join('')}
            </div>`;
    }

    // ── Mobile menu controls ─────────────────────────────────────────────────
    window.toggleMobileMenu = function () {
        document.getElementById('hamburger')?.classList.toggle('open');
        document.getElementById('mobile-menu')?.classList.toggle('open');
    };
    window.closeMobileMenu = function () {
        document.getElementById('hamburger')?.classList.remove('open');
        document.getElementById('mobile-menu')?.classList.remove('open');
    };

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        const mob = document.getElementById('mobile-menu');
        const ham = document.getElementById('hamburger');
        if (mob && mob.classList.contains('open') &&
            !mob.contains(e.target) && !ham.contains(e.target)) {
            mob.classList.remove('open');
            ham.classList.remove('open');
        }
    });

    // ── Inject CSS ───────────────────────────────────────────────────────────
    function injectStyles() {
        if (document.getElementById('nav-shared-styles')) return;
        const s = document.createElement('style');
        s.id = 'nav-shared-styles';
        s.textContent = `
/* ── SHARED NAVIGATION STYLES ── */
.site-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 62px;
    background: rgba(14,14,14,0.93); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(15,218,241,0.15);
}
.nav-logo {
    font-family: 'Space Mono', monospace; font-size: 14px;
    color: #fff; text-decoration: none; letter-spacing: 0.06em;
    white-space: nowrap; flex-shrink: 0;
}
.nav-logo span { color: #0fdaf1; }
.nav-links {
    display: flex; align-items: center; gap: 2px;
    flex: 1; justify-content: center;
}
.nav-link {
    font-family: 'Space Mono', monospace; font-size: 11px;
    color: #555; text-decoration: none; letter-spacing: 0.08em;
    padding: 6px 11px; border-radius: 6px;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
}
.nav-link:hover { color: #0fdaf1; background: rgba(15,218,241,0.07); }
.nav-link--active { color: #0fdaf1 !important; background: rgba(15,218,241,0.1) !important; }
.nav-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.lang-toggle {
    display: flex; gap: 3px;
    background: #1a1a1a; border: 1px solid rgba(15,218,241,0.18);
    border-radius: 6px; padding: 3px;
}
.lang-btn {
    font-family: 'Space Mono', monospace; font-size: 11px;
    padding: 4px 10px; border: none; border-radius: 4px;
    cursor: pointer; background: transparent; color: #555;
    letter-spacing: 0.08em; transition: all 0.2s;
}
.lang-btn.active { background: #0fdaf1; color: #000; font-weight: 700; }
.hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
}
.hamburger span {
    display: block; width: 20px; height: 2px;
    background: #ccc; border-radius: 2px; transition: all 0.3s;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.mobile-menu {
    display: none; position: fixed;
    top: 62px; left: 0; right: 0; z-index: 199;
    flex-direction: column;
    background: rgba(14,14,14,0.98); backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(15,218,241,0.12);
}
.mobile-menu.open { display: flex; }
.mobile-menu a {
    font-family: 'Space Mono', monospace; font-size: 13px;
    color: #555; text-decoration: none; letter-spacing: 0.1em;
    padding: 17px 32px;
    border-bottom: 1px solid rgba(15,218,241,0.06);
    transition: color 0.2s, background 0.2s;
}
.mobile-menu a:hover,
.mobile-menu a.nav-link--active { color: #0fdaf1; background: rgba(15,218,241,0.05); }
footer {
    border-top: 1px solid rgba(15,218,241,0.12);
    padding: 24px 48px;
    display: flex; align-items: center;
    justify-content: space-between; gap: 20px; flex-wrap: wrap;
}
footer > span {
    font-family: 'Space Mono', monospace; font-size: 11px;
    color: #444; letter-spacing: 0.06em;
}
.footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
.footer-links a {
    font-family: 'Space Mono', monospace; font-size: 11px;
    color: #444; text-decoration: none; letter-spacing: 0.06em;
    transition: color 0.2s;
}
.footer-links a:hover { color: #0fdaf1; }

/* Nav language labels */
.nlen { display: none; }

/* Page-level language classes */
html[data-lang="pt-BR"] .en-only { display: none !important; }
html[data-lang="en-US"] .pt-only { display: none !important; }

@media (max-width: 960px) {
    .site-header { padding: 0 20px; }
    .nav-links { display: none !important; }
    .hamburger { display: flex; }
    footer { padding: 18px 24px; flex-direction: column; align-items: flex-start; gap: 14px; }
    .footer-links { gap: 14px; }
}`;
        document.head.appendChild(s);
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        injectStyles();
        buildHeader();
        buildFooter();
        setLang(getLang());
    });

})();
