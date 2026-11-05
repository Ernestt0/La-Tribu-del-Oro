// ==========================================================================
// COMPONENTES GLOBALES MAESTROS (LA TRIBU DEL ORO)
// ==========================================================================

// ==========================================================================
// CINTAS DE PRECIOS (TradingView) reutilizables
// ==========================================================================
const TV_SYMBOLS = [
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
        ];
// Instantánea de referencia (28 oct 2026, 4:52 p. m.) para cuando el widget no puede cargar.
// En el sitio publicado se ven los precios en vivo del widget oficial.
const TV_SNAPSHOT = [
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

function mountTicker(container, symbols) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbols,
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: 'regular',
    colorTheme: 'dark',
    locale: 'es',
    largeChartUrl: '',
  });
  // Respaldo: si el widget no carga (sin internet o bloqueado) se muestran los nombres de los activos
  const showFallback = () => {
    if (container.querySelector('iframe') || container.querySelector('.tv-fallback')) return;
    const keys = new Set(symbols.map((x) => x.proName));
    const syms = TV_SNAPSHOT.filter((x) => keys.has(x[0]));
    const row = syms.map(([pro, n, ico, px, ch, up]) => `<a class="tv-fallback-item" href="https://es.tradingview.com/symbols/${pro.replace(':', '-')}/" target="_blank" rel="noopener" title="Ver ${n} en TradingView"><span class="tv-ico">${ico}</span><span class="tv-name">${n}</span><span class="tv-px">${px}</span><span class="${up ? 'tv-up' : 'tv-down'}">${ch}</span></a>`).join('');
    container.innerHTML = `<div class="tv-fallback">${row}${row}<a class="tv-fallback-note" href="https://es.tradingview.com/" target="_blank" rel="noopener">Precios de referencia · Ver en vivo en TradingView</a></div>`;
  };
  script.onerror = showFallback;
  setTimeout(showFallback, 15000);
  container.appendChild(script);
}

// Dos filas de píldoras de cripto en sentidos contrarios, a la misma velocidad (se usa con <market-rows>)
// Precios en vivo desde la API pública de Binance; si no carga, se muestran los activos sin precio.
// Top 10 cripto (sin stablecoins) y principales pares de forex
const MK_COINS = [
  ['BTC', 'Bitcoin', '#F7931A', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path fill="#fff" d="M22.3 14c.3-2.1-1.3-3.2-3.4-4l.7-2.8-1.7-.4-.7 2.7-1.4-.3.7-2.7-1.7-.4-.7 2.8-1.1-.3-2.4-.6-.4 1.8s1.3.3 1.2.3c.7.2.8.6.8 1l-.8 3.2.2.1-.2-.1-1.1 4.5c-.1.2-.3.5-.8.4l-1.2-.3-.8 1.9 2.2.6 1.2.3-.7 2.8 1.7.4.7-2.8 1.4.4-.7 2.8 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1 0-3.3-1.5-4.1 1.1-.3 1.9-1 2.1-2.5zm-3.8 5.4c-.5 2.1-4.1 1-5.2.7l.9-3.7c1.2.3 4.9.9 4.3 3zm.5-5.4c-.5 1.9-3.4.9-4.4.7l.8-3.3c1 .2 4.1.7 3.6 2.6z"/></svg>'], ['ETH', 'Ethereum', '#627EEA', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path fill="#fff" fill-opacity=".6" d="M16.5 4v8.9l7.5 3.3z"/><path fill="#fff" d="M16.5 4 9 16.2l7.5-3.3z"/><path fill="#fff" fill-opacity=".6" d="M16.5 22v6l7.5-10.4z"/><path fill="#fff" d="M16.5 28v-6L9 17.6z"/><path fill="#fff" fill-opacity=".2" d="m16.5 20.6 7.5-4.4-7.5-3.3z"/><path fill="#fff" fill-opacity=".6" d="m9 16.2 7.5 4.4v-7.7z"/></svg>'], ['XRP', 'XRP', '#23292F', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#23292F"/><path fill="#fff" d="M23.1 8h2.9l-6 5.9a5.7 5.7 0 0 1-8 0L6 8h2.9l4.6 4.5a3.6 3.6 0 0 0 5 0zM8.9 24H6l6-5.9a5.7 5.7 0 0 1 8 0l6 5.9h-2.9l-4.6-4.5a3.6 3.6 0 0 0-5 0z"/></svg>'],
  ['BNB', 'BNB', '#F3BA2F', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#F3BA2F"/><path fill="#fff" d="m12.1 14.3 3.9-3.9 3.9 3.9 2.3-2.3L16 5.8 9.8 12zm-6.3 1.7 2.3-2.3 2.3 2.3-2.3 2.3zm6.3 1.7 3.9 3.9 3.9-3.9 2.3 2.3-6.2 6.2-6.2-6.2zm9.8-1.7 2.3-2.3 2.3 2.3-2.3 2.3zM18.3 16 16 13.7 14.3 15.4l-.2.2-.4.4L16 18.3z"/></svg>'], ['SOL', 'Solana', '#9945FF', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><defs><linearGradient id="solg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#9945FF"/><stop offset="1" stop-color="#14F195"/></linearGradient></defs><circle cx="16" cy="16" r="16" fill="#0b0b12"/><path fill="url(#solg)" d="M10.4 19.9a.6.6 0 0 1 .4-.2h12.6c.3 0 .4.3.2.5l-2.4 2.4a.6.6 0 0 1-.4.2H8.2c-.3 0-.4-.3-.2-.5zm0-9.6a.6.6 0 0 1 .4-.2h12.6c.3 0 .4.3.2.5l-2.4 2.4a.6.6 0 0 1-.4.2H8.2c-.3 0-.4-.3-.2-.5zm11.2 4.7a.6.6 0 0 0-.4-.2H8.6c-.3 0-.4.3-.2.5l2.4 2.4c.1.1.2.2.4.2h12.6c.3 0 .4-.3.2-.5z"/></svg>'], ['DOGE', 'Dogecoin', '#C2A633', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#C2A633"/><path fill="#fff" d="M13.2 14.8h4.4v2.1h-4.4v4.5h2.8c1.1 0 2-.2 2.7-.5.7-.3 1.2-.8 1.6-1.5.4-.7.6-1.9.6-3.4 0-1.5-.2-2.6-.6-3.4a3.5 3.5 0 0 0-1.6-1.5c-.7-.3-1.6-.5-2.7-.5h-2.8zM10.4 16.9H9v-2.1h1.4V8h6.2c1.5 0 2.7.3 3.7.8 1 .5 1.8 1.3 2.3 2.4.5 1.1.8 2.6.8 4.4 0 1.9-.3 3.4-.8 4.5-.5 1.1-1.3 1.9-2.3 2.4-1 .5-2.3.8-3.7.8h-6.2z"/></svg>'],
  ['ADA', 'Cardano', '#0033AD', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#0033AD"/><g fill="#fff"><circle cx="16" cy="16" r="2.6"/><circle cx="16" cy="9.2" r="1.3"/><circle cx="16" cy="22.8" r="1.3"/><circle cx="10.1" cy="12.6" r="1.3"/><circle cx="21.9" cy="12.6" r="1.3"/><circle cx="10.1" cy="19.4" r="1.3"/><circle cx="21.9" cy="19.4" r="1.3"/><circle cx="16" cy="5.6" r=".8"/><circle cx="16" cy="26.4" r=".8"/><circle cx="7" cy="10.8" r=".8"/><circle cx="25" cy="10.8" r=".8"/><circle cx="7" cy="21.2" r=".8"/><circle cx="25" cy="21.2" r=".8"/></g></svg>'], ['TRX', 'TRON', '#EB0029', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#EB0029"/><path fill="#fff" d="M21.9 9.2 7 6.5l7.8 19.7L25.8 12.8zm-.2 1.2 2.3 2.2-6.3 1.1zm-5.4 3.1-6.6-5.5 10.8 2zm-.5 1-1.1 8.9L8.9 8.6zm1 .5 6.9-1.2-7.9 9.6z"/></svg>'], ['LINK', 'Chainlink', '#2A5ADA', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#2A5ADA"/><path fill="#fff" d="m16 6-1.8 1-5 2.9-1.8 1v10.2l1.8 1 5 2.9 1.8 1 1.8-1 5-2.9 1.8-1V10.9l-1.8-1-5-2.9zm-5 13.1v-6.2l5-2.9 5 2.9v6.2l-5 2.9z"/></svg>'], ['AVAX', 'Avalanche', '#E84142', '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#E84142"/><path fill="#fff" d="M11.1 22.5H8.2c-.6 0-.9 0-1-.2a.6.6 0 0 1 0-.6l7.2-12.7c.3-.5.4-.7.6-.8.2-.1.4-.1.6 0 .2.1.3.3.6.8l1.5 2.6v.1c.3.6.5.9.6 1.2.1.3.1.7 0 1-.1.3-.3.6-.6 1.2l-3.8 6.8v.1c-.3.6-.5.8-.7 1-.2.2-.5.3-.8.4-.3.1-.6.1-1.3.1zm7.4 0h4.3c.6 0 .9 0 1-.2a.6.6 0 0 0 0-.6l-2.2-3.7c-.3-.5-.4-.7-.6-.8a.6.6 0 0 0-.6 0c-.2.1-.3.3-.6.8l-2.1 3.7c-.3.5-.4.7-.4.9 0 .2.1.3.3.4.2.1.4.1 1 .1z"/></svg>']
];
const MK_FX = [
  ['EURUSD', 'EUR/USD', 'eu', 'EUR', 'USD'], ['GBPUSD', 'GBP/USD', 'gb', 'GBP', 'USD'], ['USDJPY', 'USD/JPY', 'jp', 'USD', 'JPY'],
  ['USDCHF', 'USD/CHF', 'ch', 'USD', 'CHF'], ['AUDUSD', 'AUD/USD', 'au', 'AUD', 'USD'], ['USDCAD', 'USD/CAD', 'ca', 'USD', 'CAD'],
  ['NZDUSD', 'NZD/USD', 'nz', 'NZD', 'USD'], ['EURGBP', 'EUR/GBP', 'eu', 'EUR', 'GBP'], ['EURJPY', 'EUR/JPY', 'eu', 'EUR', 'JPY'], ['XAUUSD', 'Oro/USD', 'Au', 'XAU', 'USD']
];
class MarketRows extends HTMLElement {
  connectedCallback() {
    const cpill = ([s, n, col, ic]) => `<a class="mk-pill" data-sym="${s}" href="https://es.tradingview.com/symbols/${s}USDT/" target="_blank" rel="noopener" title="Ver ${n} en TradingView"><span class="mk-ico mk-svg">${ic}</span><span class="mk-txt"><b>${n}</b><small><span class="mk-px">${s}/USDT</span> <span class="mk-ch"></span></small></span></a>`;
    const fpill = ([s, n, ic]) => `<a class="mk-pill" data-fx="${s}" href="https://es.tradingview.com/symbols/${s === 'XAUUSD' ? 'OANDA-XAUUSD' : 'FX-' + s}/" target="_blank" rel="noopener" title="Ver ${n} en TradingView"><span class="mk-ico mk-flag" style="background:${s === 'XAUUSD' ? '#D3AC00' : '#1f2430'}">${s === 'XAUUSD' ? '<svg viewBox="0 0 24 24" width="62%" height="62%" aria-hidden="true"><path fill="#fff6c8" d="M7 6h10l2 5H5z"/><path fill="#fff" d="M3.5 13h7.5l1.5 5H2z" opacity=".95"/><path fill="#fff" d="M13 13h7.5l1.5 5h-10.5z" opacity=".85"/></svg>' : `<img src="https://flagcdn.com/w80/${ic}.png" alt="" loading="lazy">`}</span><span class="mk-txt"><b>${n}</b><small><span class="mk-px">Forex</span> <span class="mk-ch"></span></small></span></a>`;
    const line = (set, rev) => `<div class="mk-line${rev ? ' mk-rev' : ''}"><div class="mk-track">${set}${set.replace(/class="mk-pill"/g, 'class="mk-pill" aria-hidden="true" tabindex="-1"')}</div></div>`;
    const compact = this.hasAttribute('compact');
    if (compact) {
      const mix = []; MK_COINS.forEach((x, i) => { mix.push(cpill(x)); if (MK_FX[i]) mix.push(fpill(MK_FX[i])); });
      this.innerHTML = '<div class="mk-rows mk-compact" aria-label="Precios de mercado">' + line(mix.join(''), false) + '</div>';
    } else {
      this.innerHTML = '<div class="mk-rows" aria-label="Precios de mercado">' + line(MK_COINS.map(cpill).join(''), false) + line(MK_FX.map(fpill).join(''), true) + '</div>';
    }
    const SPEED = 45;
    const fit = () => this.querySelectorAll('.mk-track').forEach((t) => { const half = t.scrollWidth / 2; t.style.setProperty('--shift', half + 'px'); t.style.animationDuration = (half / SPEED).toFixed(1) + 's'; });
    requestAnimationFrame(fit); addEventListener('load', fit); addEventListener('resize', fit);
    const fmt = (p) => p.toLocaleString('es-CO', { maximumFractionDigits: p >= 100 ? 2 : p >= 1 ? 4 : 5 });
    const setPill = (sel, price, ch) => this.querySelectorAll(sel).forEach((el) => {
      el.querySelector('.mk-px').textContent = price;
      const c = el.querySelector('.mk-ch');
      if (ch == null) { c.textContent = ''; return; }
      c.textContent = (ch >= 0 ? '+' : '') + ch.toFixed(2) + '%'; c.className = 'mk-ch ' + (ch >= 0 ? 'up' : 'down');
    });
    const loadCrypto = async () => {
      try {
        const syms = JSON.stringify(MK_COINS.map((c) => c[0] + 'USDT').concat(['PAXGUSDT']));
        const r = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=' + encodeURIComponent(syms)); if (!r.ok) return;
        (await r.json()).forEach((d) => {
          const s = d.symbol.replace('USDT', ''), p = +d.lastPrice, ch = +d.priceChangePercent;
          if (s === 'PAXG') setPill('.mk-pill[data-fx="XAUUSD"]', fmt(p), ch);
          else setPill(`.mk-pill[data-sym="${s}"]`, '$' + fmt(p), ch);
        });
      } catch (e) {}
    };
    // Forex: tipos de referencia del Banco Central Europeo (se actualizan una vez al día)
    const loadFx = async () => {
      try {
        const get = async (path) => { for (const h of ['https://api.frankfurter.dev/v1/', 'https://api.frankfurter.app/']) { try { const r = await fetch(h + path); if (r.ok) return await r.json(); } catch (e) {} } return null; };
        const [now, prev] = await Promise.all([get('latest?from=USD'), get(new Date(Date.now() - 6 * 864e5).toISOString().slice(0, 10) + '..?from=USD')]);
        if (!now) return;
        const days = Object.keys((prev && prev.rates) || {}).sort(); const before = days.length > 1 ? prev.rates[days[days.length - 2]] : null;
        const rate = (R, a, b) => { const u = (x) => (x === 'USD' ? 1 : R[x]); return u(b) / u(a); };
        MK_FX.forEach(([s, , , a, b]) => {
          if (s === 'XAUUSD') return;
          const p = rate(now.rates, a, b), q = before ? rate(before, a, b) : null;
          setPill(`.mk-pill[data-fx="${s}"]`, fmt(p), q ? ((p - q) / q) * 100 : null);
        });
      } catch (e) {}
    };
    loadCrypto(); loadFx(); setInterval(loadCrypto, 30000);
  }
}
customElements.define('market-rows', MarketRows);

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const activePage = this.getAttribute('active') || '';

    this.innerHTML = `
      <!-- HEADER CON MENÚ CENTRADO -->
      <header class="header">
        <div class="container header-content">
          <!-- 1. LOGOTIPO COMPLETO: SÍMBOLO + LA TRIBU DEL ORO -->
          <a href="index.html" class="brand-logo brand-logo-new" aria-label="La Tribu del Oro, inicio"><span class="logo-coin" aria-hidden="true"><img src="logo-coin.png" alt="" width="38" height="38"></span><span class="logo-words"><img class="logo-mark lm-light" src="logo-text-light-bg.png" alt="La Tribu del Oro" height="23"><img class="logo-mark lm-dark" src="logo-text-dark-bg.png" alt="" aria-hidden="true" height="23"></span></a>

          <!-- 2. NAVEGACIÓN EN EL CENTRO -->
          <nav class="nav">
            <a href="index.html" class="nav-link ${
              activePage === 'inicio' ? 'active' : ''
            }">Inicio</a>
            <a href="videos.html" class="nav-link ${
              activePage === 'videos' ? 'active' : ''
            }">Videos</a>
            
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
                <a href="curso.html" class="dd t-curso">
                  <span class="dd-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="cap" d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#e5b909"/><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="#e5b909" opacity=".75"/></svg></span>
                  <span class="dd-txt"><b>Curso</b><small>De lo básico a lo avanzado</small></span>
                </a>
                <a href="copy-trading.html" class="dd t-copy">
                  <span class="dd-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="13" height="13" rx="3" fill="#cfc083" opacity=".85"/><rect class="front" x="9" y="8" width="13" height="13" rx="3" fill="#a7995f"/><path class="arrow" d="M13 12h5m-2.5-2.5L18 12l-2.5 2.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg></span>
                  <span class="dd-txt"><b>Copy Trading</b><small>Traders con experiencia</small></span>
                </a>
                <a href="senales.html" class="dd t-senales">
                  <span class="dd-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#229ED9"/><path class="plane" d="M5.4 11.9l11.7-4.5c.5-.2 1 .1.8.7l-2 9.4c-.1.6-.5.7-1 .4l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-2.9 5.3-4.8c.2-.2 0-.3-.3-.1l-6.6 4.1-2.8-.9c-.6-.2-.6-.6.1-.8z" fill="#fff"/></svg></span>
                  <span class="dd-txt"><b>Señales</b><small>Análisis en tiempo real</small></span>
                </a>
                <a href="cripto.html" class="dd t-cripto">
                  <span class="dd-ico"><svg viewBox="0 0 32 32" aria-hidden="true"><g class="coin"><circle cx="16" cy="16" r="16" fill="#F7931A"/><text x="16" y="22.5" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="18" fill="#fff">₿</text></g></svg></span>
                  <span class="dd-txt"><b>Cripto</b><small>Explicado fácil</small></span>
                </a>
                <a href="ether-fi.html" class="dd t-ether">
                  <span class="dd-ico"><img src="etherfi.png" alt="" width="24" height="24" style="width:24px;height:24px;object-fit:contain"></span>
                  <span class="dd-txt"><b>Ether.fi</b><small>Guía paso a paso</small></span>
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
            <a href="login.html" class="account-btn" aria-label="Iniciar sesión" title="Iniciar sesión"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg></a>
            <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" onclick="toggleMobileNav(this)">
              <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
            </button>
          </div>
        </div>
      </header>

      <!-- MENÚ MÓVIL -->
      <nav class="mobile-nav" id="mobileNav" aria-label="Menú principal">
        <a href="index.html">Inicio</a>
        <a href="videos.html">Videos</a>
        <button type="button" class="m-group-btn" aria-expanded="false" onclick="toggleMobileGroup(this)">Soluciones<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
        <div class="m-group"><div class="m-group-in"><a class="sub dd t-curso" href="curso.html"><span class="dd-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#e5b909"/><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="#e5b909" opacity=".75"/></svg></span>Curso</a>
        <a class="sub dd t-copy" href="copy-trading.html"><span class="dd-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="13" height="13" rx="3" fill="#cfc083" opacity=".85"/><rect x="9" y="8" width="13" height="13" rx="3" fill="#a7995f"/><path d="M13 12h5m-2.5-2.5L18 12l-2.5 2.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg></span>Copy Trading</a>
        <a class="sub dd t-senales" href="senales.html"><span class="dd-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#229ED9"/><path class="plane" d="M5.4 11.9l11.7-4.5c.5-.2 1 .1.8.7l-2 9.4c-.1.6-.5.7-1 .4l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-2.9 5.3-4.8c.2-.2 0-.3-.3-.1l-6.6 4.1-2.8-.9c-.6-.2-.6-.6.1-.8z" fill="#fff"/></svg></span>Señales</a>
        <a class="sub dd t-cripto" href="cripto.html"><span class="dd-ico"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#F7931A"/><text x="16" y="22.5" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="18" fill="#fff">₿</text></svg></span>Cripto</a>
        <a class="sub dd t-ether" href="ether-fi.html"><span class="dd-ico"><img src="etherfi.png" alt="" width="24" height="24" style="width:24px;height:24px;object-fit:contain"></span>Ether.fi</a></div></div>
        <a href="programa-ib.html">Programa IB</a>
        <a href="calculadora.html">Calculadora</a>
        <a href="glosario.html">Glosario</a>
      </nav>

      <!-- TICKER MARQUEE CON MOVIMIENTO FORZADO (se omite con el atributo no-ticker) -->
      ${this.hasAttribute('no-ticker') ? '' : '<div class="mk-bar"><market-rows compact></market-rows></div>'}
    `;

    // Cinta de precios en vivo (widget oficial de TradingView)
    const tvContainer = this.querySelector('#tv-ticker-container');
    if (tvContainer) mountTicker(tvContainer, TV_SYMBOLS); // (sin uso: la cinta ahora es <market-rows compact>)
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
              <a href="index.html" class="brand-logo footer-logo" style="margin-bottom: 14px;" aria-label="La Tribu del Oro, inicio"><img src="logo-tribu-dark-bg.png" alt="La Tribu del Oro" width="120" height="48" style="height:48px;width:auto;display:block"></a>
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
                <li><a href="videos.html">Videos</a></li>
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
                <li><a href="politica-datos.html">Política de datos</a></li>
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
            <a href="curso.html" class="search-result-item"><span>Curso de Trading</span> <span style="font-size: 11px; color:#D3AC00;">Solución</span></a>
            <a href="copy-trading.html" class="search-result-item"><span>Copy Trading</span> <span style="font-size: 11px; color:#D3AC00;">Solución</span></a>
            <a href="senales.html" class="search-result-item"><span>Señales en vivo</span> <span style="font-size: 11px; color:#D3AC00;">Solución</span></a>
            <a href="cripto.html" class="search-result-item"><span>Ecosistema Cripto</span> <span style="font-size: 11px; color:#D3AC00;">Solución</span></a>
            <a href="ether-fi.html" class="search-result-item"><span>Ether.fi & Restaking</span> <span style="font-size: 11px; color:#D3AC00;">Solución</span></a>
            <a href="calculadora.html" class="search-result-item"><span>Calculadora de Riesgo & Pips</span> <span style="font-size: 11px; color:#D3AC00;">Herramienta</span></a>
            <a href="ayuda.html#faq" class="search-result-item"><span>Centro de Ayuda / Preguntas Frecuentes</span> <span style="font-size: 11px; color:#64748B;">Recurso</span></a>
            <a href="ayuda.html#terminos" class="search-result-item"><span>Términos y Condiciones</span> <span style="font-size: 11px; color:#64748B;">Legal</span></a>
            <a href="ayuda.html#riesgos" class="search-result-item"><span>Aviso Legal de Riesgos</span> <span style="font-size: 11px; color:#64748B;">Legal</span></a>
            <a href="videos.html" class="search-result-item"><span>Videos educativos</span> <span style="font-size: 11px; color:#64748B;">Contenido</span></a>
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
function toggleContactFab(btn) {
  const fab = btn.closest('.contact-fab');
  const open = !fab.classList.contains('open');
  fab.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
document.addEventListener('click', (e) => {
  const fab = document.getElementById('contactFab');
  if (fab && fab.classList.contains('open') && !fab.contains(e.target)) { fab.classList.remove('open'); fab.querySelector('.cf-main').setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const f = document.getElementById('contactFab'); if (f) f.classList.remove('open'); } });

function toggleMobileGroup(btn) {
  const open = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.nextElementSibling.classList.toggle('open', open);
}

function toggleMobileNav(btn) {
  const nav = document.getElementById('mobileNav');
  if (!nav) return;
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.style.overflow = open ? 'hidden' : '';
  requestAnimationFrame(() => dispatchEvent(new Event('scroll')));
}

function playVideo(url) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  let own = document.getElementById('videoOwn');
  if (/\.mp4(\?|$)/.test(url)) {
    if (!own && iframe) { own = document.createElement('video'); own.id = 'videoOwn'; own.controls = true; own.playsInline = true; own.setAttribute('controlslist', 'nodownload');
      own.style.cssText = 'width:100%;height:100%;max-height:80vh;object-fit:contain;background:#000;display:block'; iframe.after(own); }
    if (iframe) iframe.style.display = 'none';
    own.style.display = 'block'; own.src = url; own.play();
  } else {
    if (own) { own.pause(); own.style.display = 'none'; }
    if (iframe) { iframe.style.display = ''; iframe.src = url; }
  }
  if (modal) modal.style.display = 'flex';
}

function closeVideoModal() {
  const ov = document.getElementById('videoOwn'); if (ov) { ov.pause(); ov.removeAttribute('src'); ov.load(); }
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

// ==========================================================================
// MENÚ FLOTANTE ADAPTATIVO: cambia a oscuro/claro según el fondo que pasa detrás
// ==========================================================================
(function adaptiveHeader() {
  const lum = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const parse = (str) => {
    const out = [];
    const re = /rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+%?))?\s*\)/g;
    let m;
    while ((m = re.exec(str))) {
      let a = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
      out.push({ l: lum(+m[1], +m[2], +m[3]), a });
    }
    return out;
  };
  // Devuelve true (oscuro), false (claro) o null (no se puede saber en este elemento)
  const darkness = (el) => {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      if (n.dataset && n.dataset.nav) return n.dataset.nav === 'dark';
      if (/^(VIDEO|CANVAS)$/.test(n.tagName)) return true;
      const cs = getComputedStyle(n);
      const bgi = cs.backgroundImage;
      if (bgi && bgi !== 'none' && /gradient/.test(bgi)) {
        const cols = parse(bgi).filter((c) => c.a > 0.5);
        if (cols.length) return cols.reduce((s, c) => s + c.l, 0) / cols.length < 0.45;
      }
      const c = parse(cs.backgroundColor)[0];
      if (c && c.a > 0.6) return c.l < 0.45;
    }
    return false;
  };
  let queued = false;
  const update = () => {
    queued = false;
    const h = document.querySelector('.header');
    if (!h) return;
    const r = h.getBoundingClientRect();
    const x = Math.min(innerWidth - 2, Math.max(2, innerWidth / 2));
    const y = r.top + r.height / 2;
    const stack = document.elementsFromPoint(x, y).filter((e) => !h.contains(e) && e !== h && e.tagName !== 'HTML');
    let dark = null;
    for (const e of stack) { dark = darkness(e); if (dark !== null) break; }
    h.classList.toggle('on-dark', !!dark);
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  addEventListener('load', queue);
  document.addEventListener('DOMContentLoaded', queue);
  setTimeout(queue, 300);
  setTimeout(queue, 1200);
})();


// ==========================================================================
// CUENTAS: carga la configuración y el módulo de sesión en todas las páginas
// ==========================================================================
(function loadAuth() {
  if (window.tribuAuth) return;
  const add = (src) => new Promise((r) => { const s = document.createElement('script'); s.src = src; s.onload = r; s.onerror = r; document.head.appendChild(s); });
  window.tribuAuthLoaded = add('supabase-config.js?v=202611032032').then(() => add('auth.js?v=202611032032')).then(() => {
    const paint = () => document.querySelectorAll('.account-btn').forEach((a) => {
      const u = window.tribuAuth && tribuAuth.user;
      a.setAttribute('aria-label', u ? 'Mi cuenta' : 'Iniciar sesión');
      a.title = u ? 'Mi cuenta' : 'Iniciar sesión';
      a.classList.toggle('logged', !!u);
    });
    if (window.tribuAuth && tribuAuth.configured) { tribuAuth.ready.then(paint); tribuAuth.onChange(paint); }
  });
})();

// ==========================================================================
// ACCESO A VIDEOS: pide iniciar sesión antes de reproducir.
// Nota: esto controla la experiencia; la protección total de los videos requiere alojarlos de forma privada.
// ==========================================================================
(function videoGate() {
  const isVideoTrigger = (el) => el && el.closest && el.closest('[onclick*="playVideo"], [onclick*="playGlossaryVideo"], .hero-video-box, .vcard, .video-card-slide, .play-btn, .hero-play-btn');
  document.addEventListener('click', (e) => {
    const A = window.tribuAuth;
    if (!A || !A.configured) return;            // sin configurar: el sitio funciona como antes
    if (A.user) return;                          // con sesión: se reproduce normal
    if (!isVideoTrigger(e.target)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    const page = (location.pathname.split('/').pop() || 'index.html');
    location.href = 'registro.html?next=' + encodeURIComponent(page);
  }, true);
})();

// Cápsula del menú: invisible arriba del todo, aparece al bajar
(function headerCapsule() {
  const upd = () => { const h = document.querySelector('.header'); if (h) h.classList.toggle('scrolled', scrollY > 20); };
  addEventListener('scroll', upd, { passive: true }); addEventListener('load', upd); setTimeout(upd, 50);
})();

// ==========================================================================
// REPRODUCTOR PROPIO: <div class="own-player"><video>…</video><button class="op-play">…</button></div>
// ==========================================================================
function initOwnPlayers() {
  document.querySelectorAll('.own-player').forEach((box) => {
    if (box.dataset.ready) return; box.dataset.ready = 1;
    const vid = box.querySelector('video'), btn = box.querySelector('.op-play');
    const start = () => { box.classList.add('playing'); vid.controls = true; vid.play(); };
    if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); start(); });
    vid.addEventListener('click', () => { if (!box.classList.contains('playing')) start(); });
    vid.addEventListener('ended', () => { box.classList.remove('playing'); vid.controls = false; vid.load(); });
  });
}
document.addEventListener('DOMContentLoaded', initOwnPlayers);


// ===== Palabras clave de los títulos: se convierten en velas o giran como moneda =====
// Para agregar una palabra: ponla en la lista con 'velas' o 'moneda'. Se usa solo una por título.
const KW_LISTA = [
  ['Trading', 'velas'], ['trading', 'velas'], ['Señales', 'velas'], ['Ether.fi', 'moneda'], ['IB', 'moneda'],
  ['Oro', 'moneda'], ['Cripto', 'moneda'], ['cripto', 'moneda'], ['Forex', 'velas'], ['mercados', 'velas'],
  ['Mercados', 'velas'], ['Glosario', 'moneda'], ['Monetiza', 'moneda'], ['Análisis', 'velas'], ['riesgo', 'velas'],
];
function initKeywords() {
  const L = 'A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9';
  const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const bgOf = (el) => { for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const v = rgb(getComputedStyle(n).backgroundColor); if (v.length && (v[3] === undefined || v[3] > .5)) return v; } return [255, 255, 255]; };
  const used = new Set();
  document.querySelectorAll('main h1, main h2, body > section h1, body > section h2, section h1, section h2').forEach((h, hi) => {
    if (h.dataset.kw || h.closest('.slide-copy, site-header, site-footer, .header, footer, button, a')) return; h.dataset.kw = 1;
    const txt = h.textContent;
    const hit = KW_LISTA.find(([w]) => !used.has(w.toLowerCase()) && new RegExp('(^|[^' + L + '])' + w.replace('.', '\\.') + '(?![' + L + '])').test(txt));
    if (!hit) return;
    const [word, fx] = hit; used.add(word.toLowerCase());
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    const re = new RegExp('(^|[^' + L + '])(' + word.replace('.', '\\.') + ')(?![' + L + '])');
    for (let node; (node = walker.nextNode());) {
      const m = re.exec(node.nodeValue); if (!m) continue;
      const start = m.index + m[1].length, rest = node.splitText(start); rest.splitText(word.length);
      const kw = document.createElement('span'); kw.className = 'kw kw-' + (fx === 'velas' ? 'velas' : 'coin'); kw.setAttribute('aria-label', word);
      rest.parentNode.replaceChild(kw, rest);
      const cs = getComputedStyle(kw.parentElement);
      let col = cs.webkitTextFillColor || cs.color; const cv = rgb(col);
      if (!cv.length || cv[3] === 0) col = '#D3AC00';
      const tc = rgb(col), light = (tc[0] * .3 + tc[1] * .59 + tc[2] * .11) > 150;
      const bg = bgOf(kw), goldBg = bg[0] > 170 && bg[1] > 130 && bg[2] < 90;
      kw.style.setProperty('--kc', col);
      kw.style.setProperty('--kdim', `rgba(${tc[0]},${tc[1]},${tc[2]},.14)`);
      kw.style.setProperty('--kg', goldBg ? '#ffffff' : '#D3AC00');
      kw.style.setProperty('--kglow', goldBg ? 'rgba(255,255,255,.75)' : 'rgba(211,172,0,.55)');
      const COL = goldBg ? ['#0b0b0f', '#ffffff'] : light ? ['#D3AC00', '#ffffff'] : ['#D3AC00', '#0b0b0f'];
      let seed = 7 + hi * 29; const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
      kw.innerHTML = [...word].map((ch, i) => {
        const cd = fx === 'velas' ? `<i class="cd" style="--h:${(0.3 + rnd() * 0.42).toFixed(2)}em;--o:${(rnd() * 0.2).toFixed(2)}em;--c:${COL[(i + (rnd() > .6 ? 1 : 0)) % 2]}"></i>` : '';
        return `<span class="ch" aria-hidden="true" style="--i:${i}">${ch}${cd}</span>`;
      }).join('');
      break;
    }
  });
  // Pantallas táctiles: el efecto se reproduce solo cuando la palabra aparece en pantalla
  if (!matchMedia('(hover: hover)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; const k = e.target; io.unobserve(k);
      setTimeout(() => { k.classList.add('auto'); setTimeout(() => k.classList.remove('auto'), 1900); }, 350);
    }), { threshold: .9 });
    document.querySelectorAll('.kw').forEach((k) => io.observe(k));
  }
}
window.addEventListener('load', () => setTimeout(initKeywords, 60));

// =====================================================================
// ANIMACIONES EXPLICATIVAS (reemplazan los videos que aún no existen)
// Cada escena tiene 3 pasos que se construyen uno tras otro y se repiten.
// Uso: TA.mount(elemento, 'clave')  ·  playVideo('anim:clave') abre la escena en el modal.
// =====================================================================
const TA_ICO = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.8-4 3.8-6 7.5-6s6.7 2 7.5 6z"/>',
  copy: '<rect x="3.5" y="7" width="11" height="13" rx="2.5" opacity=".5"/><rect x="9.5" y="3.5" width="11" height="13" rx="2.5"/>',
  shield: '<path d="M12 2.5l8 3v6.2c0 4.7-3.2 8.2-8 9.8-4.8-1.6-8-5.1-8-9.8V5.5z"/>',
  coin: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5v11M15 9c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3.2 6 1.7 6 4.8 0 1.3-1.3 2.3-3 2.3-1.4 0-2.6-.6-3.2-1.6" fill="none" style="stroke:var(--in)" stroke-width="1.8" stroke-linecap="round"/>',
  chain: '<rect x="2.5" y="8" width="8" height="8" rx="2"/><rect x="13.5" y="8" width="8" height="8" rx="2"/><rect x="9" y="11" width="6" height="2" rx="1"/>',
  wallet: '<rect x="3" y="5.5" width="18" height="14.5" rx="3.5"/><rect x="13.5" y="11" width="7.5" height="4.6" rx="2.3" style="fill:var(--in)"/>',
  contract: '<path d="M6 2.5h8l4.5 4.5v14.5H6z"/><path d="M9 11h6M9 14.5h6M9 18h4" style="stroke:var(--in)" stroke-width="1.6" stroke-linecap="round"/>',
  people: '<circle cx="8" cy="8.5" r="3.2"/><circle cx="16.5" cy="9.5" r="2.7" opacity=".7"/><path d="M2.5 19.5c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5z"/><path d="M12.5 19.5c.4-2.7 2-4.2 4-4.2s3.6 1.5 4 4.2z" opacity=".7"/>',
  chart: '<rect x="3.5" y="12" width="4.5" height="8.5" rx="1.5" opacity=".55"/><rect x="9.8" y="7" width="4.5" height="13.5" rx="1.5" opacity=".8"/><rect x="16" y="3" width="4.5" height="17.5" rx="1.5"/>',
  key: '<circle cx="8" cy="12" r="5"/><path d="M12 11h9v3h-2v2.5h-3V14h-4z"/><circle cx="8" cy="12" r="1.8" style="fill:var(--in)"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="2.2"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.6 2.2" fill="none" style="stroke:var(--in)" stroke-width="2" stroke-linecap="round"/>',
  news: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 9h10M7 12.5h10M7 16h6" style="stroke:var(--in)" stroke-width="1.7" stroke-linecap="round"/>',
  broker: '<path d="M3 9.5L12 4l9 5.5z"/><rect x="5" y="11" width="2.6" height="7"/><rect x="10.7" y="11" width="2.6" height="7"/><rect x="16.4" y="11" width="2.6" height="7"/><rect x="3" y="19" width="18" height="2" rx="1"/>',
  calc: '<rect x="4.5" y="2.5" width="15" height="19" rx="3"/><rect x="7" y="5" width="10" height="4" rx="1" style="fill:var(--in)"/><circle cx="8.5" cy="13" r="1.2" style="fill:var(--in)"/><circle cx="12" cy="13" r="1.2" style="fill:var(--in)"/><circle cx="15.5" cy="13" r="1.2" style="fill:var(--in)"/><circle cx="8.5" cy="17" r="1.2" style="fill:var(--in)"/><circle cx="12" cy="17" r="1.2" style="fill:var(--in)"/><circle cx="15.5" cy="17" r="1.2" style="fill:var(--in)"/>',
  download: '<path d="M12 3v11m-4.5-4.5L12 14l4.5-4.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="17" width="16" height="4" rx="2"/>',
  link: '<path d="M10 14l4-4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M8.5 11.5l-2 2a3.5 3.5 0 0 0 5 5l2-2M15.5 12.5l2-2a3.5 3.5 0 0 0-5-5l-2 2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  swap: '<path d="M5 8h12l-3-3M19 16H7l3 3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  bank: '<circle cx="12" cy="12" r="9.5"/><path d="M8 15.5h8M9 9.5v5M12 9.5v5M15 9.5v5M7.5 9h9L12 6.5z" style="stroke:var(--in)" stroke-width="1.5" fill="none" stroke-linejoin="round"/>',
};
const TA_SCENES = {
  // ---------- Empieza desde cero ----------
  trading: { t: 'chart', title: '¿Qué es el trading?', shape: 'up', L: [[], [{ o: 'buy', i: 6 }], [{ o: 'sell', i: 21 }, { o: 'gain', a: 6, b: 21 }]],
    cap: ['El precio de un activo sube y baja durante todo el día.', 'Compras cuando tu análisis dice que puede subir…', '…y vendes más arriba. Esa diferencia es tu resultado.'] },
  oferta: { t: 'chart', title: 'Oferta y demanda', shape: 'updown', L: [[], [{ o: 'note', i: 7, up: 1, txt: 'Más compradores', c: 'g' }], [{ o: 'note', i: 19, up: 0, txt: 'Más vendedores', c: 'w' }]],
    cap: ['El precio se mueve por la fuerza de quienes compran y venden.', 'Si hay más compradores que vendedores, el precio sube.', 'Si dominan los vendedores, el precio baja.'] },
  mercados: { t: 'tiles', title: 'Tipos de mercados', items: [['€ $', 'Forex', 'Pares de divisas'], ['▲▼', 'Índices', 'Grupos de empresas'], ['Au', 'Oro', 'El refugio clásico'], ['₿', 'Cripto', 'Bitcoin, Ethereum…']],
    cap: ['Forex e índices: los mercados más operados del mundo.', 'El oro: un activo de refugio que se mueve con fuerza.', 'Cripto: abierto 24/7 y con mucha volatilidad.'] },
  demo: { t: 'chart', title: 'Tu primera operación', shape: 'up', L: [[{ o: 'entry', i: 9 }], [{ o: 'sl', i: 9, d: -.12 }, { o: 'tp', i: 9, d: .24 }], [{ o: 'ticket', l: ['Cuenta demo', 'Comprar · 0.01 lote', 'Dinero ficticio'] }]],
    cap: ['Eliges un punto de entrada en el gráfico.', 'Antes de entrar defines tu Stop Loss y tu Take Profit.', 'Practicas en cuenta demo: dinero ficticio, aprendizaje real.'] },
  // ---------- Consejos rápidos ----------
  errores: { t: 'list', title: '3 errores que queman cuentas', mark: 'x', items: [['Operar sin Stop Loss', 'Una sola operación puede llevarse la cuenta.'], ['Arriesgar demasiado', 'Lotes grandes para un saldo pequeño.'], ['Querer recuperar rápido', 'Operar con rabia después de perder.']],
    cap: ['Error 1: entrar sin un límite de pérdida.', 'Error 2: un tamaño de lote que tu cuenta no aguanta.', 'Error 3: la venganza contra el mercado.'] },
  noopera: { t: 'list', title: 'Cuándo NO operar', mark: 'x', items: [['Antes de noticias fuertes', 'El precio puede saltar sin aviso.'], ['Cansado o con emociones', 'Decides peor y te saltas el plan.'], ['Sin un plan claro', 'Si no sabes por qué entras, no entres.']],
    cap: ['Las noticias de alto impacto mueven el precio de golpe.', 'Tu estado de ánimo también es parte de la operación.', 'Sin plan, cada operación es una apuesta.'] },
  broker: { t: 'list', title: 'Elige un broker confiable', mark: 'ok', items: [['Regulado', 'Supervisado por una entidad reconocida.'], ['Retiros claros', 'Sabes cómo y cuándo recibes tu dinero.'], ['Costos transparentes', 'Spreads y comisiones a la vista.']],
    cap: ['Primero: que esté regulado.', 'Segundo: que retirar sea simple y claro.', 'Tercero: que los costos no sean una sorpresa.'] },
  uno: { t: 'bars', title: 'La regla del 1%', items: [['Tu cuenta', 1, 'Ejemplo: $1.000', 'g'], ['Riesgo por operación', .06, '1% = $10', 'r'], ['Tras 5 pérdidas seguidas', .95, 'Aún tienes ~95%', 'w']],
    cap: ['Parte de tu saldo total.', 'En cada operación arriesgas como máximo el 1%.', 'Así una mala racha no te saca del juego.'] },
  // ---------- Tutoriales ----------
  tradingview: { t: 'chart', title: 'TradingView desde cero', shape: 'range', L: [[], [{ o: 'band', a: .3, b: .38, txt: 'Zona marcada', c: 'g' }], [{ o: 'ma' }]],
    cap: ['Abres el gráfico del activo que quieres estudiar.', 'Marcas zonas importantes con las herramientas de dibujo.', 'Agregas indicadores solo si te ayudan a decidir.'] },
  mt5: { t: 'flow', title: 'MetaTrader 5', items: [['download', 'Descarga', 'La plataforma oficial'], ['link', 'Conecta', 'Tu cuenta del broker'], ['chart', 'Opera', 'Abre y gestiona órdenes']],
    cap: ['Descarga MetaTrader 5 desde la web de tu broker.', 'Inicia sesión con los datos de tu cuenta.', 'Abre órdenes con Stop Loss y Take Profit desde el gráfico.'] },
  calc: { t: 'flow', title: 'Calcula tu lotaje', items: [['coin', 'Riesgo en $', 'Cuánto aceptas perder'], ['chart', 'Distancia del stop', 'En pips o puntos'], ['calc', 'Tamaño de lote', 'Lo da la calculadora']],
    cap: ['Decide cuánto dinero estás dispuesto a arriesgar.', 'Mide la distancia entre tu entrada y tu Stop Loss.', 'La calculadora te dice el lote exacto.'] },
  wallet: { t: 'flow', title: 'Crea una wallet segura', items: [['wallet', 'Crea la wallet', 'Desde la app oficial'], ['contract', '12 palabras', 'Anótalas en papel'], ['lock', 'Nunca las compartas', 'Ni con soporte']],
    cap: ['Descarga la wallet solo desde su sitio oficial.', 'Escribe tu frase de recuperación en papel, sin fotos.', 'Quien tenga esas palabras tiene tu dinero.'] },
  // ---------- Gestión de riesgo ----------
  riesgo: { t: 'list', title: 'Gestión de riesgo', mark: 'ok', items: [['Define el riesgo antes', 'Sabes cuánto puedes perder.'], ['Siempre con Stop Loss', 'Tu seguro en cada operación.'], ['Lote acorde a tu cuenta', 'Nunca más de lo que planeaste.']],
    cap: ['La pérdida máxima se decide antes de entrar.', 'El Stop Loss la hace cumplir sin emociones.', 'El tamaño de lote une las dos cosas.'] },
  sltp: { t: 'chart', title: 'Stop Loss y Take Profit', shape: 'up', L: [[{ o: 'entry', i: 9 }], [{ o: 'sl', i: 9, d: -.12 }], [{ o: 'tp', i: 9, d: .24 }]],
    cap: ['Primero eliges tu punto de entrada.', 'El Stop Loss va donde tu idea deja de ser válida.', 'El Take Profit, donde tomas la ganancia planeada.'] },
  rr: { t: 'bars', title: 'Riesgo / beneficio', items: [['Arriesgas', .33, '1', 'r'], ['Buscas ganar', .66, '2', 'g'], ['Resultado', .5, 'Ganas más de lo que pierdes', 'w']],
    cap: ['Lo que pones en riesgo en una operación…', '…frente a lo que buscas ganar: aquí, el doble.', 'Con 1:2 no necesitas acertar siempre.'] },
  // ---------- Análisis técnico ----------
  tecnico: { t: 'chart', title: 'Análisis técnico', shape: 'range', L: [[], [{ o: 'band', a: .22, b: .3, txt: 'Soporte', c: 'g' }, { o: 'band', a: .66, b: .74, txt: 'Resistencia', c: 'w' }], [{ o: 'ma' }]],
    cap: ['El gráfico muestra la historia del precio.', 'Las zonas donde rebota te dicen dónde reacciona.', 'Con estructura decides, sin adivinar.'] },
  soportes: { t: 'chart', title: 'Soportes y resistencias', shape: 'range', L: [[], [{ o: 'band', a: .22, b: .3, txt: 'Soporte', c: 'g' }], [{ o: 'band', a: .66, b: .74, txt: 'Resistencia', c: 'w' }]],
    cap: ['El precio no se mueve al azar: rebota en zonas.', 'Soporte: donde los compradores lo frenan al bajar.', 'Resistencia: donde los vendedores lo frenan al subir.'] },
  velas: { t: 'candle', title: 'Velas japonesas', cap: ['Cada vela resume el precio en un periodo.', 'Las mechas marcan el máximo y el mínimo.', 'El cuerpo va de la apertura al cierre.'] },
  // ---------- Criptomonedas ----------
  cripto: { t: 'flow', title: 'Criptomonedas', items: [['chain', 'Blockchain', 'Un registro público'], ['coin', 'Bitcoin', 'Dinero digital escaso'], ['contract', 'Ethereum', 'Contratos y DeFi']],
    cap: ['La blockchain guarda cada movimiento a la vista de todos.', 'Bitcoin fue la primera criptomoneda.', 'Ethereum permite crear aplicaciones financieras sin bancos.'] },
  bitcoin: { t: 'bars', title: 'Bitcoin y la escasez', items: [['Límite máximo', 1, '21 millones', 'g'], ['Ya emitidos', .95, 'Casi todos', 'w'], ['Halving', .5, 'Cada ~4 años', 'g']],
    cap: ['Nunca existirán más de 21 millones de bitcoin.', 'La mayoría ya está en circulación.', 'Cada ~4 años se reduce a la mitad la nueva emisión.'] },
  autocustodia: { t: 'flow', title: 'Autocustodia', items: [['broker', 'Exchange', 'Ellos guardan tus llaves'], ['wallet', 'Tu wallet', 'Tú guardas tus llaves'], ['key', 'Tus llaves', 'Tus monedas']],
    cap: ['En un exchange, un tercero custodia tus fondos.', 'Con tu propia wallet, el control es tuyo.', 'Tus llaves, tus monedas: y también tu responsabilidad.'] },
  // ---------- Mentalidad ----------
  mente: { t: 'list', title: 'Psicología y disciplina', mark: 'ok', items: [['Sigue tu plan', 'No tus emociones del momento.'], ['Acepta pérdidas pequeñas', 'Son parte del proceso.'], ['Registra cada operación', 'Lo que se mide, mejora.']],
    cap: ['La disciplina vale más que cualquier indicador.', 'Perder poco es parte de ganar con el tiempo.', 'Tu diario de trading es tu mejor profesor.'] },
  racha: { t: 'list', title: 'Una racha de pérdidas', mark: 'num', items: [['Reduce el tamaño', 'Baja tu lote mientras recuperas confianza.'], ['Haz una pausa', 'Revisa qué cambió en el mercado.'], ['Vuelve con tu plan', 'Sin prisa por recuperar.']],
    cap: ['Primero: protege lo que queda.', 'Segundo: aléjate y analiza con calma.', 'Tercero: regresa con reglas, no con ansiedad.'] },
  rutina: { t: 'flow', title: 'Tu rutina diaria', items: [['news', 'Noticias', 'Qué mueve hoy el mercado'], ['chart', 'Tus zonas', 'Marca niveles clave'], ['clock', 'Espera', 'Entra solo con tu plan']],
    cap: ['Empieza revisando el calendario de noticias.', 'Marca tus zonas antes de que abra la sesión.', 'Luego espera: el mejor trade suele requerir paciencia.'] },
  // ---------- Copy trading ----------
  copy1: { t: 'flow', title: 'Cómo funciona la copia', items: [['user', 'El trader opera', 'Un perfil que tú elegiste'], ['copy', 'Se copia', 'En proporción a tu saldo'], ['shield', 'Tu cuenta', 'El dinero sigue en tu broker']],
    cap: ['El proveedor de estrategia abre una operación.', 'Tu cuenta la copia ajustando el tamaño a tu saldo.', 'Tus fondos nunca salen de tu propio broker.'] },
  copy2: { t: 'chart', title: 'Audita al trader', shape: 'equity', L: [[], [{ o: 'dd' }], [{ o: 'note', i: 23, up: 1, txt: 'Consistencia', c: 'g' }]],
    cap: ['Revisa la curva de resultados de varios meses.', 'Mira su peor caída (drawdown): ¿la soportarías?', 'Busca consistencia, no un solo mes espectacular.'] },
  copy3: { t: 'chart', title: 'Stop de emergencia', shape: 'equityDown', L: [[], [{ o: 'floor', v: .3 }], [{ o: 'note', i: 22, up: 0, txt: 'Se desconecta', c: 'r' }]],
    cap: ['Tu cuenta sigue los resultados del trader.', 'Defines una pérdida máxima para tu cuenta.', 'Si se toca, la copia se detiene automáticamente.'] },
  copy4: { t: 'list', title: 'Vinculación paso a paso', mark: 'num', items: [['Crea tu cuenta de inversor', 'En tu broker regulado.'], ['Elige un proveedor', 'Revisado con criterio.'], ['Asigna capital y verifica', 'Que copie y cierre igual.']],
    cap: ['Abres tu cuenta de inversor.', 'Seleccionas al proveedor que auditaste.', 'Asignas el capital y compruebas que todo se sincronice.'] },
  // ---------- Cripto (mini-curso) ----------
  cr1: { t: 'bars', title: 'Bitcoin: escasez digital', items: [['Límite máximo', 1, '21 millones', 'g'], ['Ya emitidos', .95, 'Casi todos', 'w'], ['Nueva emisión', .3, 'Cada vez menor', 'g']],
    cap: ['Bitcoin tiene un límite fijo de 21 millones.', 'Cada bloque queda en un registro que no se puede alterar.', 'Su emisión decrece con el tiempo: por eso es escaso.'] },
  cr2: { t: 'flow', title: 'Ethereum y DeFi', items: [['contract', 'Smart contract', 'Reglas en código'], ['bank', 'Préstamos', 'Sin un banco en medio'], ['swap', 'Intercambios', 'De un token a otro']],
    cap: ['Un smart contract se ejecuta solo, según su código.', 'Con ellos existen préstamos sin intermediarios.', 'Y plataformas para intercambiar tokens directamente.'] },
  cr3: { t: 'tiles', title: 'Stablecoins y wallets', items: [['CEX', 'Exchange', 'Custodia de terceros'], ['🔑', 'Wallet propia', 'Tú tienes las llaves'], ['$1', 'USDT', 'Atada al dólar'], ['$1', 'USDC', 'Atada al dólar']],
    cap: ['Exchange o wallet propia: ¿quién guarda tus llaves?', 'Las stablecoins buscan valer siempre 1 dólar.', 'Sirven para mover valor rápido y sin volatilidad.'] },
  cr4: { t: 'wave', title: 'Ciclos de mercado', cap: ['Acumulación: el precio está bajo y casi nadie mira.', 'Euforia: todos compran… y suele ser tarde.', 'Pánico: todos venden… y suele ser tarde también.'] },
  // ---------- Programa IB ----------
  ib1: { t: 'flow', title: 'Modelo IB', items: [['people', 'Tu comunidad', 'Opera en un broker regulado'], ['broker', 'El broker', 'Paga un rebate por lote'], ['coin', 'Tú', 'Recibes tus comisiones']],
    cap: ['Las personas de tu comunidad operan en su cuenta.', 'Por cada lote, el broker paga un rebate.', 'Tú recibes esas comisiones sin cobrarle nada a tus miembros.'] },
  ib2: { t: 'list', title: 'Beneficios del aliado', mark: 'ok', items: [['Material para tu comunidad', 'Gráficos y contenido educativo.'], ['Webinars educativos', 'Para formar a tu audiencia.'], ['Soporte prioritario', 'Comunicación directa con el equipo.']],
    cap: ['Recibes material listo para compartir.', 'Formación para que tu comunidad opere con criterio.', 'Y un canal directo cuando lo necesites.'] },
  ib3: { t: 'flow', title: 'Del registro al lanzamiento', items: [['user', 'Registro', 'Abrimos tu cuenta IB'], ['link', 'Tu enlace', 'Seguimiento personalizado'], ['chart', 'Tu panel', 'Revisas tus métricas']],
    cap: ['Te acompañamos a abrir tu cuenta IB.', 'Recibes tus enlaces de seguimiento.', 'Y verificas tus métricas en tu panel.'] },
};

const TA = (() => {
  const W = 640, H = 360, X0 = 54, X1 = 586, N = 26;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ico = (k) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${TA_ICO[k] || TA_ICO.chart}</svg>`;
  const col = (c) => (c === 'g' ? '#D3AC00' : c === 'r' ? '#ef4444' : '#ffffff');
  function series(shape) {
    let s = 17; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280) - .5;
    const f = {
      up: (i) => .22 + i / N * .5 + Math.sin(i * .9) * .05,
      updown: (i) => (i < 13 ? .25 + i / 13 * .5 : .75 - (i - 13) / 13 * .45) + Math.sin(i * 1.3) * .03,
      range: (i) => .48 + Math.sin(i * .62) * .2,
      equity: (i) => .25 + i / N * .5 - (i > 11 && i < 16 ? (i - 11) * .045 - (i > 13 ? (i - 13) * .09 : 0) : 0),
      equityDown: (i) => .72 - i / N * .4 + Math.sin(i * .8) * .03,
    }[shape] || ((i) => .5);
    const out = []; let prev = f(0);
    for (let i = 0; i < N; i++) { const c = Math.min(.88, Math.max(.1, f(i) + r() * .05)); out.push([prev, c]); prev = c; }
    return out;
  }
  const xi = (i) => X0 + (i + .5) * (X1 - X0) / N, yv = (v) => 300 - v * 230;
  function chart(sc) {
    const data = series(sc.shape), line = /equity/.test(sc.shape), cw = (X1 - X0) / N * .56;
    let base = '';
    if (line) {
      const pts = data.map((d, i) => `${xi(i).toFixed(1)},${yv(d[1]).toFixed(1)}`).join(' ');
      base = `<polygon class="ta-area" points="${xi(0)},300 ${pts} ${xi(N - 1)},300"/><polyline class="ta-line" points="${pts}" pathLength="1"/>`;
    } else {
      base = data.map(([o, c], i) => { const up = c >= o, top = yv(Math.max(o, c)), bot = yv(Math.min(o, c)), x = xi(i);
        return `<g class="ta-cd" style="--d:${i}"><line x1="${x}" x2="${x}" y1="${top - 9}" y2="${bot + 9}" stroke="${up ? '#D3AC00' : '#e5e7eb'}" stroke-width="2"/><rect x="${x - cw / 2}" y="${top}" width="${cw}" height="${Math.max(3, bot - top)}" rx="2" fill="${up ? '#D3AC00' : '#e5e7eb'}"/></g>`; }).join('');
    }
    const ov = (o) => {
      const v = (i) => data[Math.max(0, Math.min(N - 1, i))][1];
      switch (o.o) {
        case 'buy': { const x = xi(o.i), y = yv(Math.min(...data[o.i])) + 26; return `<path d="M${x} ${y - 14}l10 14h-20z" fill="#D3AC00"/><text x="${x}" y="${y + 20}" class="ta-tx g" text-anchor="middle">Compra</text>`; }
        case 'sell': { const x = xi(o.i), y = yv(Math.max(...data[o.i])) - 26; return `<path d="M${x} ${y + 14}l10 -14h-20z" fill="#fff"/><text x="${x}" y="${y - 10}" class="ta-tx" text-anchor="middle">Venta</text>`; }
        case 'gain': { const y1 = yv(v(o.b)), y2 = yv(v(o.a)), x = xi(o.b) + 22; return `<rect x="${xi(o.a)}" y="${y1}" width="${xi(o.b) - xi(o.a)}" height="${y2 - y1}" fill="rgba(211,172,0,.12)" stroke="rgba(211,172,0,.5)" stroke-dasharray="4 5"/><text x="${Math.min(x, 600)}" y="${(y1 + y2) / 2}" class="ta-tx g" text-anchor="end">Tu resultado</text>`; }
        case 'entry': case 'sl': case 'tp': {
          const val = v(o.i) + (o.d || 0), y = yv(val), c = o.o === 'sl' ? '#ef4444' : o.o === 'tp' ? '#D3AC00' : '#ffffff', t = { entry: 'Entrada', sl: 'Stop Loss', tp: 'Take Profit' }[o.o];
          return `<line x1="${xi(o.i)}" x2="${X1}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="2" stroke-dasharray="7 6" class="ta-draw"/><rect x="${X1 - 104}" y="${y - 24}" width="104" height="20" rx="10" fill="${c}"/><text x="${X1 - 52}" y="${y - 10}" class="ta-tx k" text-anchor="middle">${t}</text>`; }
        case 'band': { const y1 = yv(o.b), y2 = yv(o.a), c = col(o.c); return `<rect x="${X0}" y="${y1}" width="${X1 - X0}" height="${y2 - y1}" fill="${c}" opacity=".16" class="ta-grow-x"/><line x1="${X0}" x2="${X1}" y1="${(y1 + y2) / 2}" y2="${(y1 + y2) / 2}" stroke="${c}" stroke-width="1.5" opacity=".6"/><text x="${X0 + 6}" y="${y1 - 7}" class="ta-tx ${o.c === 'g' ? 'g' : ''}">${o.txt}</text>`; }
        case 'ma': { let acc = [], pts = data.map((d, i) => { acc.push(d[1]); if (acc.length > 5) acc.shift(); return `${xi(i).toFixed(1)},${yv(acc.reduce((a, b) => a + b) / acc.length).toFixed(1)}`; }).join(' ');
          return `<polyline points="${pts}" fill="none" stroke="#D3AC00" stroke-width="3" stroke-linecap="round" pathLength="1" class="ta-path"/><text x="${X1}" y="72" class="ta-tx g" text-anchor="end">Indicador</text>`; }
        case 'note': { const x = xi(o.i), y = o.up ? yv(Math.max(...data[o.i])) - 34 : yv(Math.min(...data[o.i])) + 46, c = col(o.c), w = o.txt.length * 8.6 + 26, bx = Math.max(X0, Math.min(X1 - w, x - w / 2));
          return `<rect x="${bx}" y="${y - 18}" width="${w}" height="28" rx="14" fill="${c}"/><text x="${bx + w / 2}" y="${y + 1}" class="ta-tx k" text-anchor="middle">${esc(o.txt)}</text>`; }
        case 'ticket': return `<g transform="translate(${X1 - 210} 58)"><rect width="210" height="104" rx="16" fill="#17171e" stroke="rgba(255,255,255,.12)"/>${o.l.map((t, k) => `<text x="18" y="${32 + k * 28}" class="ta-tx ${k === 0 ? 'g' : k === 2 ? 'm' : ''}">${esc(t)}</text>`).join('')}</g>`;
        case 'dd': { const hi = Math.max(...data.slice(0, 13).map((d) => d[1])), lo = Math.min(...data.slice(10, 18).map((d) => d[1])); return `<rect x="${xi(10)}" y="${yv(hi)}" width="${xi(17) - xi(10)}" height="${yv(lo) - yv(hi)}" fill="rgba(239,68,68,.16)" stroke="#ef4444" stroke-dasharray="4 5"/><text x="${xi(13.5)}" y="${yv(lo) + 22}" class="ta-tx r" text-anchor="middle">Drawdown</text>`; }
        case 'floor': { const y = yv(o.v); return `<line x1="${X0}" x2="${X1}" y1="${y}" y2="${y}" stroke="#ef4444" stroke-width="2.5" class="ta-draw"/><text x="${X0 + 6}" y="${y + 22}" class="ta-tx r">Límite de pérdida</text>`; }
      }
      return '';
    };
    const grid = [90, 150, 210, 270].map((y) => `<line x1="${X0}" x2="${X1}" y1="${y}" y2="${y}" stroke="rgba(255,255,255,.05)"/>`).join('');
    return `<svg class="ta-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${grid}<g class="ta-l ta-l0 on">${base}${sc.L[0].map(ov).join('')}</g>${sc.L.slice(1).map((l, k) => `<g class="ta-l ta-l${k + 1}">${l.map(ov).join('')}</g>`).join('')}</svg>`;
  }
  const list = (sc) => `<div class="ta-list">${sc.items.map(([t, d], i) => `<div class="ta-l ta-l${i} ta-it"><span class="ta-mk ${sc.mark}">${sc.mark === 'x' ? '✕' : sc.mark === 'num' ? i + 1 : '✓'}</span><div><b>${esc(t)}</b><small>${esc(d)}</small></div></div>`).join('')}</div>`;
  const flow = (sc) => `<div class="ta-flow">${sc.items.map(([k, t, d], i) => `${i ? `<span class="ta-l ta-l${i} ta-con"><i></i></span>` : ''}<div class="ta-l ta-l${i} ta-node"><span class="ta-ic">${ico(k)}</span><b>${esc(t)}</b><small>${esc(d)}</small></div>`).join('')}</div>`;
  const bars = (sc) => `<div class="ta-bars">${sc.items.map(([l, v, t, c], i) => `<div class="ta-l ta-l${i} ta-bar"><span class="lb">${esc(l)}</span><span class="tr"><i style="--v:${v};--c:${col(c)}"></i></span><b style="color:${col(c)}">${esc(t)}</b></div>`).join('')}</div>`;
  const tiles = (sc) => `<div class="ta-tiles">${sc.items.map(([s, l, d], i) => `<div class="ta-l ta-l${Math.max(0, i - 1)} ta-tile"><span class="sy">${esc(s)}</span><b>${esc(l)}</b><small>${esc(d)}</small></div>`).join('')}</div>`;
  const candle = () => `<svg class="ta-svg" viewBox="0 0 ${W} ${H}" aria-hidden="true"><g class="ta-l ta-l0 on"><line x1="260" x2="260" y1="60" y2="300" stroke="#D3AC00" stroke-width="5"/><rect x="215" y="110" width="90" height="140" rx="8" fill="#D3AC00"/><line x1="420" x2="420" y1="100" y2="290" stroke="#e5e7eb" stroke-width="4"/><rect x="390" y="140" width="60" height="100" rx="6" fill="#e5e7eb"/><text x="260" y="330" class="ta-tx g" text-anchor="middle">Alcista</text><text x="420" y="330" class="ta-tx" text-anchor="middle">Bajista</text></g>
    <g class="ta-l ta-l1"><line x1="270" x2="330" y1="60" y2="60" stroke="#fff" stroke-dasharray="4 4"/><text x="336" y="65" class="ta-tx">Máximo</text><line x1="270" x2="330" y1="300" y2="300" stroke="#fff" stroke-dasharray="4 4"/><text x="336" y="305" class="ta-tx">Mínimo</text></g>
    <g class="ta-l ta-l2"><line x1="150" x2="210" y1="250" y2="250" stroke="#D3AC00" stroke-dasharray="4 4"/><text x="144" y="255" class="ta-tx g" text-anchor="end">Apertura</text><line x1="150" x2="210" y1="110" y2="110" stroke="#D3AC00" stroke-dasharray="4 4"/><text x="144" y="115" class="ta-tx g" text-anchor="end">Cierre</text></g></svg>`;
  const wave = () => { const Y = (x) => 178 - 92 * Math.sin((x - 40) / 560 * Math.PI * 2 - Math.PI / 2) * -1 * -1, p = [];
    for (let x = 40; x <= 600; x += 8) p.push(`${x},${Y(x).toFixed(1)}`);
    return `<svg class="ta-svg" viewBox="0 0 ${W} ${H}" aria-hidden="true"><g class="ta-l ta-l0 on"><polyline points="${p.join(' ')}" fill="none" stroke="#D3AC00" stroke-width="4" stroke-linecap="round" pathLength="1" class="ta-path"/><circle cx="56" cy="${Y(56).toFixed(1)}" r="9" fill="#D3AC00"/><text x="72" y="${(Y(56) + 6).toFixed(1)}" class="ta-tx g">Acumulación</text></g>
    <g class="ta-l ta-l1"><circle cx="320" cy="${Y(320).toFixed(1)}" r="9" fill="#fff"/><text x="320" y="${(Y(320) - 20).toFixed(1)}" class="ta-tx" text-anchor="middle">Euforia</text></g>
    <g class="ta-l ta-l2"><circle cx="440" cy="${Y(440).toFixed(1)}" r="9" fill="#ef4444"/><text x="456" y="${(Y(440) + 6).toFixed(1)}" class="ta-tx r">Pánico</text></g></svg>`; };
  const T = { chart, list, flow, bars, tiles, candle, wave };
  function mount(el, key, ms = 3600) {
    const sc = TA_SCENES[key]; if (!el || !sc) return;
    if (el._ta) clearInterval(el._ta);
    el.innerHTML = `<div class="ta" data-t="${sc.t}"><div class="ta-glow" aria-hidden="true"></div><span class="ta-title">${esc(sc.title)}</span><div class="ta-stage">${T[sc.t](sc)}</div>
      <div class="ta-cap" aria-live="polite"><span class="ta-dots">${sc.cap.map(() => '<i></i>').join('')}</span><p></p></div><span class="ta-badge">Animación</span></div>`;
    const root = el.firstChild, p = root.querySelector('.ta-cap p'), dots = [...root.querySelectorAll('.ta-dots i')];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let s = 0;
    const set = () => {
      root.querySelectorAll('.ta-l').forEach((g) => { const n = +g.getAttribute('class').match(/ta-l(\d)/)[1]; g.classList.toggle('on', n <= s); });
      if (s === 0) { root.classList.remove('ta-go'); void root.offsetWidth; root.classList.add('ta-go'); }
      p.classList.remove('in'); void p.offsetWidth; p.textContent = sc.cap[s]; p.classList.add('in');
      dots.forEach((d, k) => d.classList.toggle('on', k <= s));
    };
    if (reduce) { s = 2; set(); return; }
    set();
    el._ta = setInterval(() => { if (!el.isConnected) return clearInterval(el._ta); s = (s + 1) % 3; set(); }, ms);
  }
  function unmount(el) { if (el && el._ta) { clearInterval(el._ta); el._ta = null; } if (el) el.innerHTML = ''; }
  return { mount, unmount };
})();

// El modal de video también muestra animaciones: playVideo('anim:clave')
(() => {
  const base = playVideo, baseClose = closeVideoModal;
  playVideo = function (url) {
    const iframe = document.getElementById('videoIframe'); let host = document.getElementById('videoAnim');
    if (String(url).startsWith('anim:')) {
      const own = document.getElementById('videoOwn'); if (own) { own.pause(); own.style.display = 'none'; }
      if (iframe) { iframe.src = ''; iframe.style.display = 'none'; }
      if (!host && iframe) { host = document.createElement('div'); host.id = 'videoAnim'; host.className = 'ta-host'; iframe.after(host); }
      host.style.display = 'block'; TA.mount(host, url.slice(5));
      const modal = document.getElementById('videoModal'); if (modal) modal.style.display = 'flex';
      return;
    }
    if (host) { TA.unmount(host); host.style.display = 'none'; }
    base(url);
  };
  closeVideoModal = function () { const host = document.getElementById('videoAnim'); if (host) { TA.unmount(host); host.style.display = 'none'; } baseClose(); };
})();
