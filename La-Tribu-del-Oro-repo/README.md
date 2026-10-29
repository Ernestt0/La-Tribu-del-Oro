# SPEC SHEET v2 — LA TRIBU DEL ORO (sitio rediseñado)

> Documento de contexto para continuar la edición del sitio en otra IA (Gemini).
> Pégalo como primer mensaje junto con el archivo `La_tribu_v2.zip`.
> Estado: rediseño v2 terminado en las 11 páginas, listo para publicar en Netlify.

---

## 1. Qué es el proyecto

- **Nombre:** La Tribu del Oro (proyecto de Legacy Minds).
- **Tipo:** plataforma educativa y comunidad de trading y activos digitales (cripto / Web3).
- **Propuesta:** educación práctica y no especulativa, herramientas (calculadora, precios en vivo) y soluciones: Curso, Copy Trading, Señales, Cripto, Ether.fi (restaking), Programa IB.
- **Público:** personas que empiezan en trading y cripto, más líderes de comunidad (aliados IB).
- **Objetivo del rediseño:** que la página sea **fácil de entender, dinámica y que enganche**, sin verse saturada. Referencia de estilo: **tradequo.com** (banner principal con varios videos, mucho espacio, botones tipo píldora, bloques redondeados).
- **Publicación:** Netlify (sitio actual `roaring-cupcake-b2bd55.netlify.app`, protegido con contraseña). También corre en StackBlitz.

---

## 2. Stack y arquitectura (NO cambiar)

- HTML5 multipágina estático, **sin frameworks y sin paso de compilación**.
- CSS3 + JavaScript vanilla (ES6). Web Components para el header y el footer globales.
- `package.json` solo trae `servor` para servir en local (`npm start`).
- Integraciones: widget oficial **TradingView Ticker Tape** (script `s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js`) y videos de **YouTube** (iframe en modal).

### Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Inicio rediseñado (v2). Trae su propio JS al final. |
| `curso.html`, `copy-trading.html`, `senales.html`, `cripto.html`, `ether-fi.html`, `programa-ib.html`, `calculadora.html`, `videos.html`, `glosario.html`, `ayuda.html` | Páginas internas. Conservan su contenido y su `<style>` original; el rediseño se aplica por encima. |
| `components.js` | `<site-header>` (logo, menú, buscador, menú móvil, cinta TradingView) y `<site-footer>` (4 columnas, aviso de riesgo, botón WhatsApp, modales de video y búsqueda). **Todo cambio global de navegación va aquí.** |
| `styles.css` | Estilos base originales + menú móvil + respaldo de la cinta. |
| `tribu-v2.css` | **Sistema de diseño v2**: tokens, header flotante de vidrio, efecto vidrio, secciones del inicio. Lo cargan todas las páginas. |
| `tribu-pages.css` | Capa que adapta las 10 páginas internas al v2. Todo con prefijo `body.page`. |
| `etherfi.png` | Logo de Ether.fi (fondo transparente, `object-fit: contain`, sin caja negra). |

### Orden de carga en el `<head>` de cada página interna

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="tribu-v2.css">
<link rel="stylesheet" href="tribu-pages.css">
<!-- luego el <style> propio de la página -->
```

El `<body>` de las páginas internas lleva `class="v2 page"`. El del inicio lleva `class="v2"`.
Como el `<style>` de cada página va **después** de `tribu-pages.css`, en ese archivo todo usa `body.page .clase` para ganar especificidad. Mantener esa regla.

---

## 3. Sistema de diseño v2

### 3.1 Dirección visual
- **Base clara** (no fondo negro): transmite claridad, orden y confianza a quien empieza; cansa menos.
- **Oscuro solo como contraste:** banner principal de videos, cinta de precios, reproductores y footer.
- **Rojo** solo en acciones (botones, estado activo). Nunca en grandes áreas: en trading el rojo también se asocia a pérdida.
- **Oro** como acento de valor: "Oro" del logo, íconos de confianza, cifras de la calculadora, bloque final.
- **Efecto vidrio (glassmorphism)** en barra superior, tarjetas, botones y burbujas. Para que el vidrio se note, el fondo de la página tiene manchas suaves de dorado y rojo (fijas).

### 3.2 Tokens (`tribu-v2.css`, `:root`)

```css
--ink: #0f172a;      /* títulos */
--text: #334155;     /* texto */
--muted: #64748b;    /* texto secundario */
--line: #e2e8f0;
--paper: #ffffff;
--mist: #f6f7f9;
--red: #e50914;      /* acción / activo */
--red-h: #c40811;
--gold: #c59b27;
--gold-l: #dfb748;
--gold-soft: #fbf5e3;
--night: #0d1117;    /* bandas oscuras */
--display: 'Inter Tight', 'Inter', system-ui, sans-serif;  /* títulos, 800 */
--body: 'Inter', system-ui, sans-serif;                     /* texto */
```

Fondo de página (`body.v2`): `#fbfbfc` con 3 `radial-gradient` suaves (oro arriba a la derecha y abajo, rojo a la izquierda), `background-attachment: fixed`.

### 3.3 Receta del vidrio

```css
background: rgba(255,255,255,0.55);
backdrop-filter: blur(16px) saturate(160%);
-webkit-backdrop-filter: blur(16px) saturate(160%);
border: 1px solid rgba(255,255,255,0.75);
box-shadow: 0 12px 32px -18px rgba(15,23,42,.25), inset 0 1px 0 rgba(255,255,255,.9);
```

### 3.4 Botones (forma píldora, `border-radius: 999px`, alto mínimo 48–50px)
- **Rojo sobre fondo oscuro** (banner): vidrio transparente rojo → `background: rgba(229,9,20,.24)`, borde `rgba(255,90,100,.65)`, texto blanco.
- **Rojo sobre fondo claro:** tinte suave → `background: rgba(229,9,20,.10)`, borde `rgba(229,9,20,.45)`, **texto rojo**.
- ⚠️ El cliente pidió explícitamente **rojo transparente y sutil**. Una versión con degradado y brillo fuerte fue rechazada por "muy fea". No volver a eso.
- **Blanco/secundario:** vidrio blanco; sobre fondo oscuro, `rgba(255,255,255,.16)` con texto blanco.
- **Telegram:** vidrio azul `rgba(34,158,217,.85)`. **WhatsApp:** vidrio verde.
- Clases: inicio → `.btn .btn-red`, `.btn-white`, `.btn-line`; páginas internas → `.btn-hero-red`, `.btn-hero-outline`, `.btn-telegram`, `.btn-referral`, `.btn-support-wa`.

### 3.5 Tipografía
- Títulos: Inter Tight 800, `letter-spacing: -0.025em`, `text-wrap: balance`.
- En las páginas internas la segunda línea del título (`.hero-title span`) va en rojo.
- Sin etiquetas en MAYÚSCULAS sobre cada título, sin números decorativos (01/02) y sin flechas "→" en todos los botones. Se quitaron por saturar.

---

## 4. Componentes globales (`components.js`)

### 4.1 Header: barra flotante de vidrio
- `.header` con `position: fixed`, centrada (`left:50%; transform:translateX(-50%)`), ancho `min(1200px, 100% - 24px)`, `top: 12px`, píldora (`border-radius: 999px`), vidrio blanco 62%.
- Al hacer scroll gana opacidad (clase `.scrolled`, la pone el JS del inicio).
- `site-header` tiene `padding-top: 86px` para no tapar la cinta.
- Menú: Inicio · Videos gratis · Soluciones (desplegable: Curso, Copy Trading, Señales, Cripto, Ether.fi) · Programa IB · Calculadora · Glosario. Buscador a la derecha.
- **Menú móvil (nuevo):** botón ☰ (`.menu-toggle`) visible bajo 960px; abre `#mobileNav` con todos los enlaces. Función global `toggleMobileNav(btn)`. Antes, en celular, el menú desaparecía sin alternativa.

### 4.2 Cinta de precios TradingView (OBLIGATORIA)
- Contenedor `#tv-ticker-container` debajo del header, fondo oscuro, se mueve sola y se pausa con el mouse.
- 15 activos: BTC, ETH, Oro/USD, EUR/USD, SOL, Ether.fi, S&P 500, Nasdaq 100, BNB, GBP/USD, USD/JPY, ADA, XRP, Petróleo WTI, Plata/USD.
- Config: `showSymbolLogo: true`, `isTransparent: true`, `colorTheme: 'dark'`, `locale: 'es'`. Debe verse **con banderas/íconos, precio, variación y porcentaje** (verde sube, rojo baja), igual que la página original. Al dar clic abre el activo en TradingView.
- **Respaldo:** solo si el script de TradingView no carga (`script.onerror` o 15 s sin iframe), se dibuja `.tv-fallback` con los mismos activos, íconos, precios de referencia tomados el 28/10/2026 y enlaces a `es.tradingview.com/symbols/...`. Termina con "Precios de referencia · Ver en vivo en TradingView". Existe porque algunas vistas previas bloquean scripts externos. En Netlify se ve el widget en vivo.
- No copiar datos de TradingView a mano en el sitio publicado: los precios en vivo los trae el widget.

### 4.3 Footer
- 4 columnas: marca + redes (YouTube, X, Telegram) · Navegación · Soluciones · Recursos (calculadora, ayuda#faq, ayuda#terminos, ayuda#riesgos).
- **Aviso de riesgo legal obligatorio** (fines educativos, sin asesoría financiera). No quitar.
- Botón flotante de WhatsApp (`.whatsapp-bubble`, vidrio verde) con burbuja "¿Dudas? ¡Chatea con nosotros!" en vidrio.
- Modales: `#videoModal` (`playVideo(url)`) y `#searchModal` (búsqueda rápida).

---

## 5. Inicio (`index.html`)

Orden de secciones (simple, de arriba a abajo):

1. **Banner principal con 3 videos** (`#hero.hero-slider`, estilo TradeQuo). Rota cada 7 s, con barras de progreso doradas abajo, botón de pausa, swipe en celular y flechas del teclado.
   - Slide 1: "Aprende trading y cripto a tu ritmo" → Ver videos gratis / Ver introducción.
   - Slide 2: "Opera en vivo con la comunidad" (Lun–Vie 8:00 AM EST) → Unirme al canal en vivo / Ver señales.
   - Slide 3: "Sigue a traders con experiencia" → Conocer copy trading / Ver el curso.
   - **Videos propios:** en cada `<div class="slide" data-video="">` poner la ruta del clip (ej. `data-video="videos/hero-1.mp4"`). Recomendado: 8–15 s, horizontal, sin sonido, menos de 5 MB. Si está vacío o falla, se muestra una animación de gráfico en canvas (escenas `velas`, `vivo`, `copy`).
2. **Franja de confianza** (3 ítems de vidrio): Educación práctica · Riesgo primero · Tu dinero es tuyo (nunca custodiamos capital).
3. **"¿Qué quieres hacer hoy?"**: 5 tarjetas de vidrio con acciones en lenguaje simple (Aprender desde cero, Copiar a traders, Recibir señales, Entender cripto, Conocer Ether.fi).
4. **Bloque de presentación** (`#presentacion`, rojo profundo redondeado de 40px) con el video de introducción. URL en la constante `INTRO_URL` del JS.
5. **"Empieza en 3 pasos"** + franja "Sesiones en vivo de lunes a viernes".
6. **Testimonios** (3, con iniciales; sin fotos de banco).
7. **Videos gratis**: carrusel horizontal (lista en el array `VIDEOS` del JS: título, categoría, duración).
8. **Cierre:** "Tu primer paso es gratis" (fondo dorado suave de vidrio).

---

## 6. Páginas internas (`tribu-pages.css`)

No se cambió su HTML ni su contenido; solo el estilo:
- Héroes internos (`.course-hero`, `.classroom-header`, `.signals-hero`, `.efi-hero`, `.ib-hero`, `.calc-page-hero`, `.page-header`, `.glossary-hero`, `.help-hero`) transparentes sobre el fondo con brillos.
- Etiquetas de los héroes (`.course-tag`, `.signals-tag`, etc.) como píldoras de vidrio con texto rojo.
- Tarjetas → vidrio (`.module-card`, `.playlist-card`, `.safety-box`, `.feature-card`, `.step-card`, `.benefit-card`, `.ib-form-box`, `.calc-widget`, `.calc-guide-card`, `.glossary-item-card`, `.faq-item`, `.legal-document`, `.video-card-slide`…).
- Filtros, pestañas y abecedario del glosario → píldoras de vidrio; la activa en rojo suave.
- Banners oscuros (`.cta-banner`, `.referral-banner`, `.ib-cta-banner`, `.support-box`) → el mismo rojo profundo del bloque de presentación del inicio.
- Calculadora: panel de resultados oscuro con cifras en dorado.
- Info bajo los reproductores (`.player-meta`, `.video-info-box`) en blanco sólido para que se lea.

---

## 7. Preferencias del cliente (respetar)

- Página **fácil de entender, dinámica y que enganche**. Nada saturado.
- **No** fondo negro general: claro con contraste oscuro puntual.
- Efecto vidrio en barra superior, burbujas y tarjetas, **respetando los colores** de cada elemento.
- Botones rojos **transparentes y sutiles**, no con brillo pesado.
- La cinta de TradingView **con banderas, precios y porcentajes**, y que al dar clic lleve a TradingView.
- Referencia principal: **tradequo.com**.

---

## 8. Pendientes antes de publicar

1. **Videos de relleno:** todos los videos de YouTube apuntan a `dQw4w9WgXcQ` (un video de prueba). Reemplazar por los reales en `index.html` (`INTRO_URL`, `VIDEOS`) y en cada página (`playVideo('...')`).
2. **Testimonios** (Sofía Martínez, Daniel Restrepo, Andrés Palacios): confirmar que sean personas reales con permiso. Si no, quitarlos o cambiarlos. En un sitio de trading, testimonios inventados son un riesgo legal.
3. **Links vacíos:** Telegram (`https://t.me/`) y WhatsApp (`https://wa.me/`) en varias páginas y en `components.js`.
4. **Videos del banner principal:** subir 3 clips propios y ponerlos en `data-video` (se pueden generar tomas de ambiente con IA de video).
5. Las fotos de Unsplash de las páginas internas siguen siendo de banco. Idealmente reemplazarlas por material propio.

---

## 9. Reglas para editar

1. Entregar cambios como **fragmentos pequeños** indicando archivo y selector, no reescribir archivos completos.
2. No eliminar los Web Components de `components.js`. Cambios de navegación global, solo ahí.
3. No quitar el aviso de riesgo, la cinta de TradingView ni el logo `etherfi.png`.
4. Estilos nuevos de páginas internas → `tribu-pages.css` con prefijo `body.page`. Estilos globales o del inicio → `tribu-v2.css`.
5. Usar siempre los tokens de color de la sección 3.2. No inventar colores nuevos.
6. Probar en celular (390px) y escritorio (1440px): sin scroll horizontal, menú ☰ funcionando.
7. Respetar `prefers-reduced-motion` (ya está implementado: detiene animaciones y el carrusel).

---

## 10. Cómo publicar en Netlify

1. Descomprimir `La_tribu_v2.zip`.
2. Netlify → sitio `roaring-cupcake-b2bd55` → **Deploys** → arrastrar la carpeta.
3. Revisar en el enlace publicado que la cinta de precios cargue en vivo y que los botones de video abran los videos reales.
