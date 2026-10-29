# GUÍA DE DISEÑO — instrucciones para la IA que edita La Tribu del Oro

> Reúne las guías de diseño que se usaron para rediseñar el sitio, adaptadas para usarse fuera de Claude.
> Úsala junto con `La_Tribu_del_Oro_SPEC_v2.md`. Si algo choca, manda el spec sheet y lo que pida el cliente.

---

## 1. Postura
- Trabaja como el líder de diseño de un estudio: decisiones intencionales de color, tipografía y composición, específicas para este proyecto. Evita lo genérico o "de plantilla".
- Prioridad: (1) lo que dice el cliente, (2) el sistema de diseño existente del proyecto (`tribu-v2.css`), (3) tu criterio.
- Pon la audacia en un solo lugar (aquí: el banner de videos y el efecto vidrio) y deja lo demás tranquilo y ordenado. Antes de entregar, quita un adorno.

## 2. Contenido primero
- Diseña desde el tema real: trading, cripto, comunidad, gestión de riesgo. Usa su vocabulario y sus detalles (precios, pares, horarios de sesión, stop loss) como contenido, no como decoración.
- Nada de "lorem ipsum". Nunca inventes cifras, testimonios ni resultados presentados como reales.

## 3. Tipografía
- Una o dos familias, claramente distintas. Aquí: **Inter Tight** (títulos, 800) e **Inter** (texto).
- Escala clara y constante. Títulos con `text-wrap: balance`. Líneas de texto de menos de ~70–80 caracteres.
- Evita estos tics de diseño generado:
  - etiquetas en MAYÚSCULAS con letras espaciadas encima de cada título;
  - numeración decorativa (01 / 02 / 03) cuando el contenido no es una secuencia real;
  - flechas "→" agregadas a todos los botones y enlaces;
  - textos tipo "A · B · C" unidos con puntos medios.

## 4. Color
- Define todos los colores como variables (tokens) y úsalos siempre. No pongas colores sueltos.
- Elige los neutros a propósito (un gris con un toque del tono de marca se ve intencional).
- Color de acción (rojo) solo en botones y estados activos. Color semántico (verde sube / rojo baja) aparte del color de marca.
- Contraste legible en todo; el texto sobre vidrio debe leerse igual de bien.

## 5. Composición y espaciado
- Usa flex/grid con `gap` en vez de márgenes sueltos entre elementos.
- Margen lateral mínimo de 16px en celular. Nada debe causar scroll horizontal.
- Las filas se apilan en una columna en pantallas angostas (~400px).
- Elementos repetidos (tarjetas en fila) con los mismos bordes, rellenos y alineaciones. Elige un número de columnas que se llene completo; que nada quede solo en una fila.
- Bordes, sombras y radios marcan "objetos": úsalos con criterio. Dar el mismo radio y sombra a todo aplana la jerarquía.
- La estructura (bordes, numeración, separadores, etiquetas) debe comunicar algo real del contenido, no decorar.

## 6. Movimiento
- Poco y con intención. Un momento orquestado (el carrusel del banner) pesa más que animar cada sección.
- Evita el "aparece y sube" en todas las secciones y el hover en cada tarjeta: se ve generado por IA.
- El movimiento que responde a una acción del usuario (abrir, expandir, confirmar) sí es bienvenido.
- Respeta siempre `prefers-reduced-motion`.

## 7. La página debe estar completa al cargar
- Todo lo que se va a leer debe verse sin necesidad de hacer scroll para "activarlo". Nada esperando en `opacity: 0`.
- El hero se dimensiona a su contenido (aquí el banner usa `min(78vh, 720px)`).

## 8. Textos (copy)
- Escribe desde el lado del usuario y en lenguaje simple: "Recibir señales", no "Módulo de alertas".
- Voz activa. El botón dice exactamente lo que pasa: "Unirme al canal en vivo", "Ver videos gratis".
- La misma acción se llama igual en todo el sitio.
- Los errores explican qué pasó y cómo arreglarlo, sin disculpas ni frases vagas.
- Nada de relleno ni frases de vendedor. Específico es mejor que ingenioso.
- Evita giros de estilo IA: "no es X, sino Y", frases con dos puntos y revelación, comillas para inventar etiquetas.

## 9. Calidad mínima (siempre)
- Responsive de 390px a 1440px.
- Foco visible con teclado (`:focus-visible`).
- Cada control de formulario con `id` y etiqueta.
- Cerrar todas las etiquetas HTML y usar comillas dobles en los atributos.
- Revisar que los selectores CSS no se anulen entre sí: en este proyecto los estilos de páginas internas van con `body.page` por esa razón.
- Revisa tu trabajo con una captura en escritorio y otra en celular antes de entregar.

## 10. Patrones de diseño "por defecto" que hay que evitar
Salvo que el cliente lo pida, no caigas en:
1. Fondo crema cálido con titulares en serif y acento terracota.
2. Fondo casi negro con un solo acento verde ácido o bermellón.
3. Diseño tipo periódico con líneas finas, sin bordes redondeados y columnas densas.
4. El "kit SaaS": todo cortado en tarjetas iguales, mismo radio, misma sombra gris y degradados de adorno.
5. Etiquetas en mayúsculas sobre cada título, fuente monoespaciada para datos pequeños y "→" en todos los botones.

---

## Reglas específicas de este proyecto (resumen)
- Fondo claro con brillos suaves de oro y rojo. Oscuro solo en el banner de videos, la cinta de precios, los reproductores y el footer.
- Efecto vidrio: `background rgba(255,255,255,.55)` + `backdrop-filter: blur(16px) saturate(160%)` + borde blanco translúcido + brillo interior arriba.
- Botón rojo: vidrio rojo **transparente y sutil**. Sobre fondo claro, tinte rojo suave con texto rojo; sobre fondo oscuro, `rgba(229,9,20,.24)` con texto blanco. Nada de degradados ni brillos fuertes.
- La cinta de TradingView es obligatoria y debe mostrar íconos o banderas, precio, variación y porcentaje.
- Cambios en fragmentos pequeños, indicando archivo y selector.
