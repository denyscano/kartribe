# Kartribe · Cascarón del landing

Landing de karting indoor con estética japonesa contemporánea y **liquid glass**.
Este repositorio contiene únicamente la estructura: fondo decorativo, header fijo y menú de navegación. Las secciones de contenido se añaden después, una por persona.

- **Marca:** Kartribe
- **Tagline:** Tu tribu. Tu pista.
- **Paleta activa:** C · Sumi Mono (bright)
- **Stack:** HTML5 + CSS3 + JavaScript vanilla (ES Modules). Sin frameworks ni build step.

---

## Arrancar en local

```bash
python -m http.server 8765
```

Abre <http://127.0.0.1:8765/>.

> No abras `index.html` con doble clic: los módulos ES no funcionan desde `file://`.

---

## Estructura

```text
Landing/
├─ index.html
├─ README.md
├─ DESIGN-SYSTEM.md
└─ assets/
   ├─ css/
   │  ├─ tokens.css          ← variables (no editar sin aprobación)
   │  ├─ base.css            ← reset, tipografía, fondo, utilidades
   │  ├─ layout.css          ← container, section, grids
   │  ├─ components.css      ← glass, botones, marca, badges, campos
   │  └─ sections/
   │     └─ header.css       ← barra-píldora flotante + panel móvil
   ├─ js/
   │  ├─ main.js             ← punto de entrada
   │  └─ modules/
   │     ├─ header.js        ← estado del header al hacer scroll
   │     ├─ menu.js          ← panel móvil accesible
   │     └─ scrollspy.js     ← enlace activo del menú
   └─ img/
      └─ favicon.svg
```

---

## Cómo añadir una sección

### 1. Crea su CSS

Cada sección tiene su propio archivo dentro de `assets/css/sections/`:

```text
assets/css/sections/experiences.css
```

### 2. Enlázalo en `index.html`

Añade el `<link>` **después** de `header.css` y antes del cierre de `</head>`:

```html
<link rel="stylesheet" href="./assets/css/sections/experiences.css">
```

### 3. Pega la sección dentro de `<main>`

Usa el ID reservado que ya apunta el menú:

```html
<section class="section" id="experiencias" aria-labelledby="experiencias-title">
  <div class="container">
    <header class="section__header">
      <p class="section__eyebrow">
        <span class="section__eyebrow-jp" lang="ja" aria-hidden="true">速</span>
        Experiencias
      </p>
      <h2 class="section__title" id="experiencias-title">Elige tu carrera</h2>
      <p class="section__lead">Texto de apoyo breve.</p>
    </header>

    <div class="grid grid--3">
      <!-- tarjetas -->
    </div>
  </div>
</section>
```

### 4. Si la sección tiene comportamiento propio

Crea un módulo en `assets/js/modules/` que exporte una función `init...()` y llámala desde `main.js`.

---

## IDs reservados

No renombres estos IDs: los usan el menú y los CTAs.

| Orden | Sección | ID | CSS sugerido |
|---|---|---|---|
| 1 | Header / nav | `#inicio` | `header.css` |
| 2 | Hero | `#hero` | `hero.css` |
| 3 | Experiencias | `#experiencias` | `experiences.css` |
| 4 | Precios | `#precios` | `pricing.css` |
| 5 | Galería | `#galeria` | `gallery.css` |
| 6 | Opiniones | `#opiniones` | `testimonials.css` |
| 7 | FAQ | `#faq` | `faq.css` |
| 8 | Contacto | `#contacto` | `contact.css` |
| 9 | Reserva / CTA final | `#reserva` | `booking.css` |
| 10 | Footer | `#footer` | `footer.css` |

El menú de escritorio enlaza a `#experiencias`, `#precios`, `#galeria`, `#opiniones`, `#faq` y `#contacto`. El CTA **Reservar** enlaza a `#reserva`. El logo enlaza a `#inicio`.

---

## Header y navegación

El header es una **barra-píldora de cristal flotante**, no una barra de borde a borde: 12 px de separación superior, radio completo, marca a la izquierda, nav compacta y CTA sólido **Reservar** a la derecha.

- Los enlaces llevan teclas circulares **E / P / G / O / F / C**.
- La tecla del enlace activo se pinta en `accent` y el enlace gana fondo de cristal.
- El descriptor **Karting indoor · 3 circuitos** solo aparece a partir de **1280 px**.
- Las teclas aparecen a partir de **1024 px**; entre 768 y 1023 px la nav va sin teclas para que quepan los seis enlaces.
- Por debajo de **768 px** el menú pasa a panel flotante de cristal con overlay, bloqueo de scroll y foco atrapado.

No cambies los `href` del menú: apuntan a los IDs reservados de la tabla siguiente.

---

## Componentes disponibles

- `.container`, `.container--narrow`
- `.site-header`, `.site-header__surface`, `.site-header__inner`, `.site-header__brand`, `.site-header__tagline`, `.site-header__toggle`
- `.site-nav`, `.site-nav__list`, `.site-nav__item`, `.site-nav__link`, `.site-nav__key`, `.site-nav__label`, `.site-nav__arrow`, `.site-nav__cta`, `.site-nav__tagline`, `.site-menu-overlay`
- `.section`, `.section--tinted`, `.section__header`, `.section__eyebrow`, `.section__eyebrow-jp`, `.section__title`, `.section__lead`
- `.grid`, `.grid--auto`, `.grid--2`, `.grid--3`, `.grid--4`, `.stack`, `.cluster`
- `.glass`
- `.btn` + `.btn--primary`, `.btn--secondary`, `.btn--accent`, `.btn--ghost`, `.btn--sm`, `.btn--lg`, `.btn--block`, `.btn--icon`
- `.brand`, `.brand__mark`, `.brand__name`, `.brand__dot`
- `.badge`, `.badge--accent`, `.badge--outline`, `.badge--live`, `.badge__dot`
- `.field`, `.field__label`, `.field__input`, `.field__select`, `.field__textarea`, `.field__hint`, `.field__error`
- `.u-visually-hidden`, `.skip-link`

---

## Reglas rápidas

- **BEM** y nombres de código en inglés; copy visible en español.
- Usa solo tokens `--krt-*`. No inventes colores ni valores sueltos.
- Breakpoints: **640 / 768 / 1024 / 1280 px**, mobile-first con `min-width`.
- Contenedor máximo: **1200 px**.
- Escala de espaciado: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px.
- Nada de `style=""` inline. Nada de `!important` salvo la utilidad documentada de movimiento reducido.
- Todo texto debe cumplir **WCAG AA**. El botón primario siempre es sólido, nunca de cristal.
- El menú pasa a hamburguesa por debajo de **768 px**.

La referencia completa está en [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).
