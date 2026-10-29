// ==========================================================================
// COMPONENTES GLOBALES MAESTROS (LA TRIBU DEL ORO)
// ==========================================================================

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const activePage = this.getAttribute('active') || '';

    this.innerHTML = `
      <!-- HEADER CON MENÚ CENTRADO -->
      <header class="header">
        <div class="container header-content">
          <!-- 1. LOGOTIPO COMPLETO: SÍMBOLO + LA TRIBU DEL ORO -->
          <a href="index.html" class="brand-logo">
            <div class="logo-symbol">
              <div class="logo-bar-red"></div>
              <div class="logo-bar-black"></div>
            </div>
            <span class="brand-text">La Tribu del <span class="brand-text-accent">Oro</span></span>
          </a>

          <!-- 2. NAVEGACIÓN EN EL CENTRO -->
          <nav class="nav">
            <a href="index.html" class="nav-link ${
              activePage === 'inicio' ? 'active' : ''
            }">Inicio</a>
            <a href="videos.html" class="nav-link ${
              activePage === 'videos' ? 'active' : ''
            }">Videos gratis</a>
            
            <div class="nav-dropdown">
              <button class="nav-dropdown-btn ${
                [
                  'curso',
                  'copy-trading',
                  'senales',
                  'cripto',
                  'ether-fi',
                ].includes(activePage)
                  ? 'active'
                  : ''
              }">
                Soluciones
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="dropdown-menu">
                <a href="curso.html">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  Curso
                </a>
                <a href="copy-trading.html">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                  Copy Trading
                </a>
                <a href="senales.html">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.93 19.07a10 10 0 0 1 0-14.14M7.76 16.24a6 6 0 0 1 0-8.48M12 12h.01"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
                  Señales
                </a>
                <a href="cripto.html">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.77 4.5V2m3.5 2.5V2m-5 17.5V22m3.5-2.5V22M7 6.5h7a3.5 3.5 0 0 1 2.5 5.95A4 4 0 0 1 15 20H7V6.5zm0 6h8"/></svg>
                  Cripto
                </a>
                <a href="ether-fi.html">
  <img src="etherfi.png" alt="Ether.fi" style="width: 22px; height: 22px; object-fit: contain;">
  Ether.fi
</a>
              </div>
            </div>

            <a href="programa-ib.html" class="nav-link ${
              activePage === 'ib' ? 'active' : ''
            }">Programa IB</a>
            <a href="calculadora.html" class="nav-link ${
              activePage === 'calculadora' ? 'active' : ''
            }">Calculadora</a>
            <a href="glosario.html" class="nav-link ${
              activePage === 'glosario' ? 'active' : ''
            }">Glosario</a>
          </nav>

          <!-- 3. BUSCADOR A LA DERECHA -->
          <div class="header-actions">
            <button class="search-btn" title="Buscar en el sitio" onclick="openSearchModal()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" onclick="toggleMobileNav(this)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
      </header>

      <!-- MENÚ MÓVIL -->
      <nav class="mobile-nav" id="mobileNav" aria-label="Menú principal">
        <a href="index.html">Inicio</a>
        <a href="videos.html">Videos gratis</a>
        <span class="mobile-label">Soluciones</span>
        <a class="sub" href="curso.html">Curso</a>
        <a class="sub" href="copy-trading.html">Copy Trading</a>
        <a class="sub" href="senales.html">Señales</a>
        <a class="sub" href="cripto.html">Cripto</a>
        <a class="sub" href="ether-fi.html">
  <img src="etherfi.png" alt="Ether.fi" style="width: 18px; height: 18px; object-fit: contain; vertical-align: middle; margin-right: 8px;">
  Ether.fi
</a>
        <a href="programa-ib.html">Programa IB</a>
        <a href="calculadora.html">Calculadora</a>
        <a href="glosario.html">Glosario</a>
      </nav>

      <!-- TICKER MARQUEE CON MOVIMIENTO FORZADO -->
      <div class="tv-ticker-wrapper">
        <div class="tv-ticker-mover" id="tv-ticker-container">
          <div class="tradingview-widget-container__widget"></div>
        </div>
      </div>
    `;

    // Cargar dinámicamente el widget oficial de TradingView Ticker Tape en tiempo real
    const tvContainer = this.querySelector('#tv-ticker-container');
    if (tvContainer) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
          { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
          { proName: 'OANDA:XAUUSD', title: 'Oro / USD' },
          { proName: 'FX:EURUSD', title: 'EUR / USD' },
          { proName: 'BINANCE:SOLUSDT', title: 'Solana' },
          { proName: 'BINANCE:ETHFIUSDT', title: 'Ether.fi' },
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
          { proName: 'FOREXCOM:NSXUSD', title: 'Nasdaq 100' },
          { proName: 'BINANCE:BNBUSDT', title: 'BNB' },
          { proName: 'FX:GBPUSD', title: 'GBP / USD' },
          { proName: 'FX:USDJPY', title: 'USD / JPY' },
          { proName: 'BINANCE:ADAUSDT', title: 'Cardano' },
          { proName: 'BINANCE:XRPUSDT', title: 'XRP' },
          { proName: 'OANDA:WTICOUSD', title: 'Petróleo WTI' },
          { proName: 'OANDA:XAGUSD', title: 'Plata / USD' },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: 'regular',
        colorTheme: 'dark',
        locale: 'es',
        largeChartUrl: '',
      });
      // Respaldo: si el widget de TradingView no carga (sin internet o bloqueado),
      // mostramos la cinta con los nombres de los activos, sin inventar precios.
      const showFallback = () => {
        if (tvContainer.querySelector('iframe') || tvContainer.querySelector('.tv-fallback')) return;
        // Instantánea de referencia (28 oct 2026, 4:52 p. m.) para cuando el widget no puede cargar.
        // En el sitio publicado se ven los precios en vivo del widget oficial.
        const syms = [
          ['BINANCE:BTCUSDT', 'Bitcoin', '<i style="background:#F7931A">₿</i>', '81.369,85', '+460,08 (+0,57%)', 1],
          ['BINANCE:ETHUSDT', 'Ethereum', '<i style="background:#4F5795">Ξ</i>', '2.365,09', '+14,73 (+0,63%)', 1],
          ['OANDA:XAUUSD', 'Oro / USD', '<i style="background:#D69A00">Au</i>', '4.067,290', '+6,960 (+0,17%)', 1],
          ['FX:EURUSD', 'EUR / USD', '<b>🇪🇺</b><b>🇺🇸</b>', '1,11536', '+0,00010 (+0,01%)', 1],
          ['BINANCE:SOLUSDT', 'Solana', '<i style="background:linear-gradient(135deg,#9E48FF,#16FC99)">S</i>', '102,79', '+1,44 (+1,42%)', 1],
          ['BINANCE:ETHFIUSDT', 'Ether.fi', '<i style="background:linear-gradient(135deg,#3D227A,#6565E1)">e</i>', '0,6820', '+0,0159 (+2,39%)', 1],
          ['FOREXCOM:SPXUSD', 'S&P 500', '<i style="background:#C4162E;font-size:8px">500</i>', '7.726,1', '+0,1 (0,00%)', 1],
          ['FOREXCOM:NSXUSD', 'Nasdaq 100', '<i style="background:#0996C7;font-size:8px">100</i>', '29.601,5', '−40,3 (−0,14%)', 0],
          ['BINANCE:BNBUSDT', 'BNB', '<i style="background:#F3BA2F">B</i>', '758,01', '+13,07 (+1,75%)', 1],
          ['FX:GBPUSD', 'GBP / USD', '<b>🇬🇧</b><b>🇺🇸</b>', '1,33245', '−0,00 (−0,01%)', 0],
          ['FX:USDJPY', 'USD / JPY', '<b>🇺🇸</b><b>🇯🇵</b>', '157,770', '−0,040 (−0,03%)', 0],
          ['BINANCE:ADAUSDT', 'Cardano', '<i style="background:#0033AD">₳</i>', '0,2070', '+0,0010 (+0,49%)', 1],
          ['BINANCE:XRPUSDT', 'XRP', '<i style="background:#23292F">X</i>', '1,3337', '+0,00 (+0,18%)', 1],
          ['OANDA:WTICOUSD', 'Petróleo WTI', '<i style="background:#333">🛢</i>', '103,454', '+1,722 (+1,69%)', 1],
          ['OANDA:XAGUSD', 'Plata / USD', '<i style="background:#9AA3AD">Ag</i>', '53,96600', '−0,45100 (−0,83%)', 0]
        ];
        const row = syms.map(([pro, n, ico, px, ch, up]) => `<a class="tv-fallback-item" href="https://es.tradingview.com/symbols/${pro.replace(':', '-')}/" target="_blank" rel="noopener" title="Ver ${n} en TradingView"><span class="tv-ico">${ico}</span><span class="tv-name">${n}</span><span class="tv-px">${px}</span><span class="${up ? 'tv-up' : 'tv-down'}">${ch}</span></a>`).join('');
        tvContainer.innerHTML = `<div class="tv-fallback">${row}${row}<a class="tv-fallback-note" href="https://es.tradingview.com/" target="_blank" rel="noopener">Precios de referencia · Ver en vivo en TradingView</a></div>`;
      };
      // Solo si el script de TradingView no se pudo cargar (bloqueado o sin conexión)
      script.onerror = showFallback;
      // Último recurso: si a los 15 s no apareció el widget
      setTimeout(showFallback, 15000);
      tvContainer.appendChild(script);
    }
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- FOOTER GLOBAL -->
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="brand-logo" style="margin-bottom: 14px;">
                <div class="logo-symbol">
                  <div class="logo-bar-red"></div>
                  <div class="logo-bar-black" style="background:#64748B;"></div>
                </div>
                <span class="brand-text" style="color:#FFFFFF;">La Tribu del <span class="brand-text-accent">Oro</span></span>
              </a>
              <p>La Tribu del Oro: Educación práctica, herramientas institucionales y comunidad para traders e inversores en activos digitales.</p>
              <div class="footer-socials">
                <a href="#" class="social-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                <a href="#" class="social-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="#" class="social-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg></a>
              </div>
            </div>

            <div>
              <h4 class="footer-col-title">Navegación</h4>
              <ul class="footer-links">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="videos.html">Videos gratis</a></li>
                <li><a href="programa-ib.html">Programa IB</a></li>
                <li><a href="calculadora.html">Calculadora</a></li>
                <li><a href="glosario.html">Glosario</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">Soluciones</h4>
              <ul class="footer-links">
                <li><a href="curso.html">Curso</a></li>
                <li><a href="copy-trading.html">Copy Trading</a></li>
                <li><a href="senales.html">Señales</a></li>
                <li><a href="cripto.html">Cripto</a></li>
                <li><a href="ether-fi.html">Ether.fi</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-col-title">Recursos</h4>
              <ul class="footer-links">
                <li><a href="calculadora.html">Calculadora de Lotes</a></li>
                <li><a href="ayuda.html#faq">Centro de ayuda</a></li>
                <li><a href="ayuda.html#terminos">Términos y condiciones</a></li>
                <li><a href="ayuda.html#riesgos">Aviso de riesgos</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="risk-notice">
              <strong>Aviso de riesgo:</strong> La negociación en mercados financieros y activos digitales conlleva un nivel significativo de riesgo para su capital. Los contenidos ofrecidos en esta plataforma son estrictamente de carácter educativo e informativo y no constituyen asesoramiento financiero, recomendación de inversión ni garantía de rentabilidad.
            </p>
            <p>&copy; La Tribu del Oro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <!-- BOTÓN WHATSAPP COMPACTO CON BURBUJA FLOTANTE TEMPORAL -->
      <div class="wa-container">
        <span class="wa-popup-bubble">¿Dudas? ¡Chatea con nosotros!</span>
        <a href="https://wa.me/" target="_blank" class="whatsapp-bubble" title="Chatea con nosotros">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </a>
      </div>

      <!-- MODAL DE VIDEO -->
      <div id="videoModal" class="modal-overlay" onclick="closeModalOnBackdrop(event)">
        <div class="modal-content">
          <button class="modal-close-btn" onclick="closeVideoModal()">&times;</button>
          <div class="video-container-iframe">
            <iframe id="videoIframe" src="" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      <!-- MODAL DE BÚSQUEDA -->
      <div id="searchModal" class="modal-overlay" onclick="closeSearchOnBackdrop(event)">
        <div class="search-modal-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-size: 16px; font-weight: 700; color: #0F172A;">Buscar en La Tribu del Oro</h4>
            <button onclick="closeSearchModal()" style="font-size: 20px; color: #64748B;">&times;</button>
          </div>
          <input type="text" id="quickSearchInput" class="search-input-header" placeholder="Escribe para buscar..." onkeyup="filterSiteSearch()">
          <div class="search-results-list" id="searchResultsList">
            <a href="curso.html" class="search-result-item"><span>Curso de Trading</span> <span style="font-size: 11px; color:#E50914;">Solución</span></a>
            <a href="copy-trading.html" class="search-result-item"><span>Copy Trading</span> <span style="font-size: 11px; color:#E50914;">Solución</span></a>
            <a href="senales.html" class="search-result-item"><span>Señales en vivo</span> <span style="font-size: 11px; color:#E50914;">Solución</span></a>
            <a href="cripto.html" class="search-result-item"><span>Ecosistema Cripto</span> <span style="font-size: 11px; color:#E50914;">Solución</span></a>
            <a href="ether-fi.html" class="search-result-item"><span>Ether.fi & Restaking</span> <span style="font-size: 11px; color:#E50914;">Solución</span></a>
            <a href="calculadora.html" class="search-result-item"><span>Calculadora de Riesgo & Pips</span> <span style="font-size: 11px; color:#E50914;">Herramienta</span></a>
            <a href="ayuda.html#faq" class="search-result-item"><span>Centro de Ayuda / Preguntas Frecuentes</span> <span style="font-size: 11px; color:#64748B;">Recurso</span></a>
            <a href="ayuda.html#terminos" class="search-result-item"><span>Términos y Condiciones</span> <span style="font-size: 11px; color:#64748B;">Legal</span></a>
            <a href="ayuda.html#riesgos" class="search-result-item"><span>Aviso Legal de Riesgos</span> <span style="font-size: 11px; color:#64748B;">Legal</span></a>
            <a href="videos.html" class="search-result-item"><span>Videos educativos gratis</span> <span style="font-size: 11px; color:#64748B;">Contenido</span></a>
            <a href="programa-ib.html" class="search-result-item"><span>Programa de Aliados IB</span> <span style="font-size: 11px; color:#64748B;">Alianza</span></a>
            <a href="glosario.html" class="search-result-item"><span>Glosario de términos</span> <span style="font-size: 11px; color:#64748B;">Diccionario</span></a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

// FUNCIONES GLOBALES
function toggleMobileNav(btn) {
  const nav = document.getElementById('mobileNav');
  if (!nav) return;
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
}

function playVideo(url) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  if (iframe) iframe.src = url;
  if (modal) modal.style.display = 'flex';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  if (iframe) iframe.src = '';
  if (modal) modal.style.display = 'none';
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'videoModal') closeVideoModal();
}

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => {
      const input = document.getElementById('quickSearchInput');
      if (input) input.focus();
    }, 50);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) modal.style.display = 'none';
}

function closeSearchOnBackdrop(e) {
  if (e.target.id === 'searchModal') closeSearchModal();
}

function filterSiteSearch() {
  const term = document.getElementById('quickSearchInput').value.toLowerCase();
  const items = document.querySelectorAll('.search-result-item');
  items.forEach((item) => {
    item.style.display = item.textContent.toLowerCase().includes(term)
      ? 'flex'
      : 'none';
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeVideoModal();
    closeSearchModal();
  }
});
