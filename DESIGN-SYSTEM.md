# Kartribe — Guía de marca y desarrollo del landing

> **Versión:** 1.2 

> **Última actualización:** 10/11/2026

> **Mantenida por:** Denys Sifonte Cano - Pablo Martinez Adones - Elena Maria Gonzales Perez - Roberto Guizado Garcia
> **Aplica a:** todo el repositorio del landing.

> **fuente de verdad:** Este documento es la fuente de verdad del proyecto. Si algo de aquí no se cumple, el PR se rechaza. Si crees que algo debe cambiar, se propone en una issue y se actualiza este archivo **antes** de tocar código.

---

## 1. El proyecto en 30 segundos

| Campo | Valor |
|---|---|
| **Nombre comercial** | **Kartribe** (siempre con K mayúscula y una sola palabra) |
| **Sector** | Karting: experiencias, competiciones, eventos de empresa y cumpleaños |
| **Tagline oficial** | **“Tu tribu. Tu pista.”** |
| **Claim secundario** | “Velocidad real. Sin carné.” |
| **Público** | 16–45 años, grupos de amigos, familias y empresas |
| **Objetivo del landing** | Que el usuario reserve una tanda o pida presupuesto para un evento |
| **CTA principal** | **Reservar ahora** → `#reserva` |
| **CTA secundario** | **Ver experiencias** → `#experiencias` |
| **Idioma** | Español (España), tuteo, sin anglicismos innecesarios |
| **Estética** | Japonés contemporáneo (sumi, kin, vermilion) + **liquid glass** |
| **Paleta activa** | **Sumi Mono (C)** — tinta cálida + vermilion + oro kin |

### Personalidad de marca

- **Energía:** rápida, directa, con actitud. Frases cortas.
- **Cercanía:** hablamos como un amigo que te reta a bajar tu mejor tiempo.
- **Confianza:** seguridad, material en buen estado, monitores.
- **Nunca:** tono corporativo aburrido, mayúsculas gritadas en párrafos, emojis en la UI, humor machista.

### Tono de voz (ejemplos)

| ✅ Sí | ❌ No |
|---|---|
| “Baja de 45 segundos y te invitamos a la siguiente.” | “Ofrecemos experiencias de ocio de alto valor añadido.” |
| “Trae a tu equipo. Nosotros ponemos el cronómetro.” | “Soluciones integrales para team building.” |
| “Casco, mono y adrenalina incluidos.” | “Equipamiento de seguridad homologado incluido.” |

---

## 2. Reglas que NO se pueden cambiar

| # | Elemento | Regla |
|---|---|---|
| 1 | Nombre | **Kartribe**. Nunca “Kart Tribe”, “KartTribe” ni “Kartribu”. |
| 2 | Tagline | **“Tu tribu. Tu pista.”** |
| 3 | Paleta | Solo los hex de la **paleta activa** (sección 4.2). Prohibido inventar colores. |
| 4 | Tipografías | **Anton** (títulos) + **Inter** (texto) + **Noto Sans JP** solo para kanji decorativos. Nada más. |
| 5 | Botones | Un único estilo base `.btn` + variantes definidas. Prohibido botones “a mano”. |
| 6 | Espaciado | Escala de la sección 6. Nada de `margin: 13px` o valores sueltos. |
| 7 | Nomenclatura CSS | **BEM** obligatorio (`.bloque__elemento--modificador`). |
| 8 | IDs de sección | Los de la sección 9. No se renombran. |
| 9 | Breakpoints | 640 / 768 / 1024 / 1280 px. No se añaden otros. |
| 10 | Contenedor | Máx. **1200 px**, padding lateral 24 px (16 px en móvil). |
| 11 | Radio de borde | Solo `4 / 8 / 12 / 24 / 999` px. |
| 12 | Idioma del código | Inglés (clases, variables, archivos). Textos visibles en español. |
| 13 | Una sección = una rama = un PR | No se mezclan secciones en el mismo PR. |
| 14 | Dependencias | Ninguna librería nueva sin aprobación del responsable. |
| 15 | Liquid glass | Solo con la receta de la sección 4.5. Prohibido inventar blurs, bordes o brillos. |

> **Zona negociable:** el copy dentro de cada sección, las fotos, el orden interno de tarjetas y las animaciones suaves. Todo lo demás está bloqueado.

---

## 3. Stack y estructura de archivos

**Stack:** HTML5 + CSS3 + JavaScript vanilla (ES Modules). Sin frameworks ni build step.
Si el equipo decide usar Tailwind, los tokens de la sección 4 se mapean en `tailwind.config.js` y **se mantienen los mismos nombres**.

```text
kartribe/
├─ index.html
├─ DESIGN-SYSTEM.md             ← este documento
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css             ← variables (NO editar sin aprobación)
│  │  ├─ base.css               ← reset, tipografía, utilidades
│  │  ├─ layout.css             ← container, grid, section
│  │  ├─ components.css         ← botones, cards, forms, badges
│  │  └─ sections/
│  │     ├─ header.css
│  │     ├─ hero.css
│  │     ├─ experiences.css
│  │     ├─ pricing.css
│  │     ├─ gallery.css
│  │     ├─ testimonials.css
│  │     ├─ faq.css
│  │     ├─ contact.css
│  │     └─ footer.css
│  ├─ js/
│  │  ├─ main.js                ← punto de entrada
│  │  └─ modules/
│  │     ├─ header.js           ← estado del header al hacer scroll
│  │     ├─ menu.js             ← panel móvil accesible
│  │     ├─ scrollspy.js        ← enlace activo del menú
│  │     ├─ faq.js
│  │     └─ form.js
│  ├─ img/
│  │  ├─ hero/
│  │  ├─ experiences/
│  │  ├─ gallery/
│  │  └─ icons/
│  └─ fonts/
└─ README.md
```

**Orden de importación CSS (obligatorio):**

```css
@import url("./tokens.css");
@import url("./base.css");
@import url("./layout.css");
@import url("./components.css");
@import url("./sections/hero.css");
/* ...resto de secciones */
```

Reglas:

- Cada sección tiene **su propio CSS** dentro de `assets/css/sections/`.
- Prohibido usar `style=""` inline y `!important` (salvo utilidad documentada).
- Un archivo JS por comportamiento, exportando una función `init...()`.
- `main.js` solo importa e inicializa módulos.

---

## 4. Paleta de colores — Sumi Mono Liquid Glass

La estética del landing es **Japón contemporáneo**: tinta sumi, oro kin, vermilion y cristal líquido. La paleta debe sentirse rápida y premium, con la elegancia editorial del diseño japonés (contraste, asimetría, espacio negativo).

### 4.1 Opciones evaluadas

| Opción | Base | Acento | Sensación | Veredicto |
|---|---|---|---|---|
| **A. Neo-Tokyo** | Sumi `#07080C` | Vermilion + sakura + ai | Nocturna, neón, tecnológica | Alternativa nocturna |
| **B. Sakura Drift** | Washi `#F7F3EC` | Sakura + ai | Clara, lifestyle, familiar | Alternativa diurna |
| **C. Sumi Mono** | Tinta `#0D0C0F` | Vermilion + kin | Editorial, premium, luminosa | ✅ **ELEGIDA** |

> **Decisión:** se implementa **Sumi Mono (C)** en su versión luminosa: tinta cálida, vermilion más brillante y oro kin de alta luminosidad. Las opciones A y B quedan documentadas como referencia y **no se mezclan** con la activa.

#### Opción A — Neo-Tokyo

Ideal si se busca una noche de neón: el sumi hace que las fotos y el cristal brillen, y la sakura/ai/cyan aportan vibración japonesa moderna. Riesgo: menos sobria y más “gaming”.

#### Opción B — Sakura Drift

`#F7F3EC` · `#FFFDFA` · `#17141A` · `#514C59` · `#C42E28` · `#A62A50` · `#2E3A78`

Pensada para un público familiar y luz de día. El liquid glass se vuelve sutil (cristal blanco lechoso). Riesgo: menos contraste y menos “adrenalina”.

#### Opción C — Sumi Mono (activa)

`#0D0C0F` · `#17151A` · `#FFFDF7` · `#B9B1BE` · `#DE3529` · `#FFD24A`

La opción elegida. Tinta cálida, vermilion brillante y oro kin. El cristal gana luminosidad, el oro aporta energía y la base oscura mantiene la sobriedad editorial. Es la que mejor equilibra karting, Japón y liquid glass.

---

### 4.2 Paleta activa (Sumi Mono)

#### Base

| Token | Hex | Nombre | Uso |
|---|---|---|---|
| `--krt-color-bg` | `#0D0C0F` | Sumi (墨) | Fondo general |
| `--krt-color-surface` | `#17151A` | Sumi elevado | Tarjetas y superficies sólidas |
| `--krt-color-surface-alt` | `#211C25` | Sumi claro | Inputs, hover de superficie |
| `--krt-color-border` | `#3A323C` | Borde tinta | Bordes de 1 px |
| `--krt-color-text` | `#FFFDF7` | Washi (和紙) | Texto principal |
| `--krt-color-text-muted` | `#B9B1BE` | Gris niebla | Texto secundario |

#### Acción

| Token | Hex | Nombre | Uso |
|---|---|---|---|
| `--krt-color-primary` | `#DE3529` | Shu (朱) | Fondo de CTA y acentos fuertes |
| `--krt-color-primary-hover` | `#C92C21` | Shu oscuro | Hover |
| `--krt-color-primary-active` | `#B0251B` | Shu profundo | Active |
| `--krt-color-primary-bright` | `#FF6A5C` | Shu neón | **Texto e iconos** sobre fondo oscuro |

> El vermilion `#DE3529` con texto blanco cumple AA justo (4.5:1). Para texto pequeño sobre fondo oscuro se usa `--krt-color-primary-bright`, nunca el `primary` de relleno.

#### Acentos japoneses

| Token | Hex | Nombre | Uso |
|---|---|---|---|
| `--krt-color-accent` | `#FFD24A` | Kin (金) | Eyebrows, foco, detalles, métricas |
| `--krt-color-accent-strong` | `#FFE38A` | Kin claro | Hover de detalles, líneas |
| `--krt-color-accent-text` | `#1A1206` | Tinta dorada | Texto sobre kin |
| `--krt-color-ai` | `#C9BED8` | Ai (藍) | Gradientes, glows, datos secundarios |
| `--krt-color-mizu` | `#E9E4DA` | Mizu (水) | Gradientes, highlights, enlaces |
| `--krt-color-kin` | `#E8B84A` | Kin profundo | Líneas finas, sellos, detalles premium |

#### Semánticos

| Token | Hex | Uso |
|---|---|---|
| `--krt-color-success` | `#5CEB9A` | Confirmaciones |
| `--krt-color-warning` | `#FFD166` | Avisos |
| `--krt-color-error` | `#FF7A70` | Errores de formulario |
| `--krt-color-info` | `#7CC4FF` | Información |

---

### 4.3 Proporción de uso (60/25/10/5)

- **60 %** tinta `bg` + malla aurora + superficies oscuras.
- **25 %** washi `text` / `text-muted`.
- **10 %** vermilion `primary` (solo acciones y acentos importantes).
- **5 %** kin, shu, ai y mizu (detalles puntuales; nunca grandes bloques).

### 4.4 Reglas de color

- El vermilion **nunca** se usa para párrafos largos: solo botones, iconos, líneas y palabras sueltas.
- El oro kin **nunca** se usa como fondo de sección completa.
- Texto sobre `primary`: siempre `#FFFFFF`. Texto sobre `accent`: siempre `--krt-color-accent-text`.
- Prohibido usar blanco puro `#FFFFFF` como texto de párrafo: usar `--krt-color-text`.
- `ai`, `mizu` y `kin` son colores de **apoyo**: no compiten con el CTA. Máximo 2 de ellos en una misma sección.
- Todo texto debe cumplir **WCAG AA (4.5:1)**. El texto atenuado solo se usa en ≥16 px o en negrita.
- Nunca se mezcla la paleta clara (Opción B) con la oscura (Opción C).

### 4.5 Liquid Glass (cristal líquido)

El liquid glass **no es un color**: es una superficie translúcida con blur, saturación y un brillo especular en el borde superior. En Sumi Mono se sube el brillo para que el cristal se note sobre la tinta.

#### Tokens de cristal

| Token | Valor | Uso |
|---|---|---|
| `--krt-glass-bg` | `rgba(255, 255, 255, .08)` | Cristal base |
| `--krt-glass-bg-strong` | `rgba(255, 255, 255, .14)` | Cristal con texto encima |
| `--krt-glass-border` | `rgba(255, 255, 255, .20)` | Borde de 1 px |
| `--krt-glass-highlight` | `rgba(255, 255, 255, .60)` | Brillo interior superior |
| `--krt-glass-blur` | `24px` | Desenfoque |
| `--krt-glass-saturate` | `165%` | Saturación del fondo |
| `--krt-glass-shadow` | `0 10px 40px rgba(0, 0, 0, .50)` | Profundidad |

#### Receta obligatoria

```css
.glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, .16) 0%,
    rgba(255, 255, 255, .06) 45%,
    rgba(255, 255, 255, .10) 100%
  );
  border: 1px solid var(--krt-glass-border);
  border-radius: var(--krt-radius-lg);
  -webkit-backdrop-filter: blur(var(--krt-glass-blur)) saturate(var(--krt-glass-saturate));
  backdrop-filter: blur(var(--krt-glass-blur)) saturate(var(--krt-glass-saturate));
  box-shadow:
    inset 0 1px 0 var(--krt-glass-highlight),
    var(--krt-glass-shadow);
}
```

#### Dónde se aplica

- Header fijo, menú móvil, tarjetas, badges, modales, inputs y paneles flotantes.
- **Nunca** en el botón primario: el CTA debe ser sólido para no perder contraste.
- **Nunca** sobre negro plano: el cristal necesita una imagen o la malla aurora detrás para que se note.

#### Reglas de uso

1. Máximo **2 capas de cristal** apiladas.
2. Máximo **6 superficies de cristal visibles** a la vez (rendimiento).
3. El texto sobre cristal siempre lleva detrás `--krt-glass-bg-strong` o un overlay oscuro.
4. No se anima `backdrop-filter`; solo `opacity` y `transform`.
5. Profundidad: borde claro arriba, sombra abajo. Sin biseles de colores.
6. Fallback obligatorio:

```css
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: var(--krt-color-surface); }
}
```

### 4.6 Gradientes y fondo aurora (los únicos permitidos)

```css
/* Malla aurora: va fija detrás de todo el landing */
--krt-gradient-aurora:
  radial-gradient(60% 75% at 10% 0%, rgba(222, 53, 41, .30) 0%, transparent 62%),
  radial-gradient(50% 60% at 90% 10%, rgba(255, 210, 74, .20) 0%, transparent 65%),
  radial-gradient(45% 60% at 60% 100%, rgba(201, 190, 216, .12) 0%, transparent 70%);

/* Overlay de héroe para legibilidad sobre foto */
--krt-gradient-hero:
  linear-gradient(180deg, rgba(13, 12, 15, .25) 0%, rgba(13, 12, 15, .94) 100%);

/* Sheen de cristal (opcional, para cards destacadas) */
--krt-gradient-sheen:
  linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, .16) 50%, transparent 80%);
```

- La malla aurora se coloca en `body::before` a `opacity: .95` y **nunca** por encima del contenido.
- Prohibido usar degradados de arcoíris, cian-magenta puros o `linear-gradient` de dos colores saturados.
- Los degradados solo decoran; ningún texto depende de ellos para su contraste.

### 4.7 Motivos visuales japoneses

- **Ma (間):** espacio negativo generoso; las secciones respiran.
- **Líneas shoji:** retículas finas de 1 px con `--krt-color-border` al 40 % de opacidad.
- **Ensō (円):** círculo incompleto como elemento gráfico, en `kin` o `shu` al 30 %.
- **Kanji de marca de agua:** `走` (correr), `速` (velocidad), `風` (viento) al 4–6 % de opacidad, tamaño enorme y recortado. Nunca como texto legible.
- **Sellos (hanko):** cuadrado vermilion con inicial “K” en washi, solo en footer o detalles.
- **Asimetría:** bloques 7/5 o 8/4, nunca todo centrado.
- **Nada de clichés:** sin cerezos clipart, sin torii gigantes, sin geishas, sin texto japonés inventado. Si no sabes qué significa un kanji, no se usa.

### 4.8 Contraste verificado

| Combinación | Ratio aprox. | Uso |
|---|---|---|
| `text` sobre `bg` | 18.5:1 | Párrafos ✅ |
| `text-muted` sobre `bg` | 9.3:1 | Texto secundario ✅ |
| `#FFFFFF` sobre `primary` | 4.5:1 | Botón primario ✅ |
| `primary-bright` sobre `bg` | 6.9:1 | Enlaces y acentos ✅ |
| `accent` sobre `bg` | 13.5:1 | Eyebrows y métricas ✅ |
| `accent-text` sobre `accent` | 11.8:1 | Badge kin ✅ |
| `mizu` sobre `bg` | 15.4:1 | Highlights ✅ |
| `kin` sobre `bg` | 10.5:1 | Líneas y sellos ✅ |

> Cualquier combinación nueva se comprueba antes del PR. Si no llega a 4.5:1, no se usa para texto.

---

## 5. Tipografía

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| Display | **Anton** | 400 | H1, H2, cifras grandes, nombres de sección |
| Texto | **Inter** | 400 / 500 / 600 / 700 | Párrafos, botones, labels, nav |
| Japonés decorativo | **Noto Sans JP** | 400 / 700 | Solo kanji decorativos y sellos. Nunca texto corrido. |

Carga (en `<head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
```

### Escala tipográfica

| Token | Tamaño | Line-height | Uso |
|---|---|---|---|
| `--krt-text-display` | `clamp(3rem, 8vw, 6rem)` | 0.95 | Hero H1 |
| `--krt-text-h1` | `clamp(2.5rem, 6vw, 4.5rem)` | 1.0 | Título de sección |
| `--krt-text-h2` | `clamp(2rem, 4vw, 3rem)` | 1.05 | Subtítulos |
| `--krt-text-h3` | `1.5rem` | 1.2 | Títulos de tarjeta |
| `--krt-text-body-lg` | `1.125rem` | 1.65 | Entradillas |
| `--krt-text-body` | `1rem` | 1.65 | Párrafos |
| `--krt-text-sm` | `0.875rem` | 1.5 | Notas, labels |
| `--krt-text-xs` | `0.75rem` | 1.4 | Eyebrows, legales |

### Reglas

- **Anton siempre en mayúsculas** (`text-transform: uppercase`) y con `letter-spacing: 0.02em`.
- **Anton nunca** en párrafos ni en botones.
- Máximo **65 caracteres** por línea de párrafo (`max-width: 65ch`).
- Un solo `<h1>` por página (el del hero). Las secciones usan `<h2>`.
- No usar más de **3 tamaños** distintos en una misma sección.
- Números de métricas: `font-variant-numeric: tabular-nums;`.
- **Noto Sans JP** solo para kanji decorativos de la sección 4.7; nunca para párrafos, botones ni navegación.

---

## 6. Espaciado, radios, sombras y capas

### Espaciado (base 4 px)

| Token | px | Uso típico |
|---|---|---|
| `--krt-space-1` | 4 | Separaciones mínimas |
| `--krt-space-2` | 8 | Gap de iconos |
| `--krt-space-3` | 12 | Padding interno compacto |
| `--krt-space-4` | 16 | Gap de grid móvil |
| `--krt-space-5` | 24 | Gap de grid, padding de tarjeta |
| `--krt-space-6` | 32 | Separación de bloques |
| `--krt-space-7` | 48 | Separación de subsecciones |
| `--krt-space-8` | 64 | Padding vertical de sección (móvil) |
| `--krt-space-9` | 96 | Padding vertical de sección (desktop) |
| `--krt-space-10` | 128 | Aire en hero |

- Padding vertical de sección: `clamp(64px, 10vw, 128px)`.
- Prohibido usar valores que no estén en esta escala.

### Radios

| Token | Valor | Uso |
|---|---|---|
| `--krt-radius-sm` | 4 px | Badges pequeños, inputs |
| `--krt-radius-md` | 8 px | Botones, cards, imágenes |
| `--krt-radius-lg` | 12 px | Contenedores grandes |
| `--krt-radius-xl` | 24 px | Bloques destacados |
| `--krt-radius-full` | 999 px | Pills, avatares |

### Sombras

```css
--krt-shadow-card: 0 8px 24px rgba(0, 0, 0, .35);
--krt-shadow-elevated: 0 16px 48px rgba(0, 0, 0, .50);
--krt-shadow-focus: 0 0 0 3px rgba(255, 210, 74, .50);
```

- Sin sombras de colores, salvo el foco kin y el glow del cristal.
- Sin `box-shadow` en botones primarios (se usa color, no sombra).

### Z-index (solo estos valores)

| Token | Valor | Uso |
|---|---|---|
| `--krt-z-base` | 0 | Contenido |
| `--krt-z-dropdown` | 10 | Desplegables |
| `--krt-z-sticky` | 100 | Elementos sticky |
| `--krt-z-header` | 200 | Header fijo |
| `--krt-z-overlay` | 300 | Fondo de menú móvil |
| `--krt-z-modal` | 400 | Modales |
| `--krt-z-toast` | 500 | Notificaciones |

---

## 7. Layout y responsive

### Contenedor

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 24px;
}

@media (max-width: 640px) {
  .container { padding-inline: 16px; }
}
```

### Grid

- Móvil: **4 columnas**, gap 16 px.
- Tablet: **8 columnas**, gap 24 px.
- Desktop: **12 columnas**, gap 24 px.

Utilidades permitidas:

```css
.u-grid { display: grid; gap: var(--krt-space-5); }
.u-grid--2 { grid-template-columns: repeat(2, 1fr); }
.u-grid--3 { grid-template-columns: repeat(3, 1fr); }
.u-grid--4 { grid-template-columns: repeat(4, 1fr); }
```

### Breakpoints

| Nombre | Valor | Comportamiento |
|---|---|---|
| `sm` | `640px` | Móvil grande |
| `md` | `768px` | Tablet |
| `lg` | `1024px` | Desktop |
| `xl` | `1280px` | Desktop ancho |

- Mobile-first: los `@media` se escriben con `min-width`.
- Prohibido `max-width` en media queries nuevas (excepto el patrón del contenedor ya definido).
- El menú de navegación pasa a hamburguesa **por debajo de 768 px**.

### Reglas de composición

- Máximo **2 niveles de anidación** visual por sección.
- Cada sección lleva un `eyebrow` (texto kin, 12 px, mayúsculas, `letter-spacing: .18em`) + `h2` + `lead` opcional.
- Las tarjetas de una misma fila deben tener la misma altura.
- Imágenes siempre con `aspect-ratio` definido para evitar saltos de layout.

---

## 8. Componentes obligatorios

### 8.1 Botones

```html
<button class="btn btn--primary" type="button">Reservar ahora</button>
<a class="btn btn--secondary" href="#experiencias">Ver experiencias</a>
<button class="btn btn--ghost btn--sm" type="button">Ver más</button>
```

| Clase | Apariencia |
|---|---|
| `.btn` | Base: Inter 600, 14 px, mayúsculas, `letter-spacing: .06em`, padding `14px 24px`, radius 8 px, altura mínima 44 px |
| `.btn--primary` | Fondo `primary`, texto blanco. Hover `primary-hover`. |
| `.btn--secondary` | Cristal líquido: `--krt-glass-bg`, borde `--krt-glass-border`, texto `text`. Hover `--krt-glass-bg-strong`. |
| `.btn--ghost` | Sin borde, texto `text-muted`. Hover texto `text`. |
| `.btn--accent` | Fondo `accent` (kin), texto `accent-text`. Solo 1 por sección como máximo. |
| `.btn--sm` / `.btn--lg` | `padding: 10px 16px` / `16px 32px` |
| `.btn--block` | `width: 100%` |
| `.btn:disabled` | `opacity: .45`, `cursor: not-allowed` |

- Nunca crear un botón con `<div onclick>`.
- Todo botón sin `type` en un formulario es un bug.

### 8.2 Tarjetas

```html
<article class="card">
  <div class="card__media">
    <img src="..." alt="..." width="640" height="400" loading="lazy">
  </div>
  <div class="card__body">
    <span class="card__tag">Experiencia</span>
    <h3 class="card__title">Karting indoor</h3>
    <p class="card__text">...</p>
    <a class="btn btn--primary btn--sm" href="#reserva">Reservar</a>
  </div>
</article>
```

- Fondo: cristal líquido (receta 4.5) con `--krt-glass-bg`, borde `--krt-glass-border`, radius `lg` (12 px).
- Hover: borde `accent-strong` + `translateY(-2px)`, transición 250 ms.
- La imagen ocupa el ancho completo con `aspect-ratio: 16 / 10` y `object-fit: cover`.
- `.card--featured` añade borde `accent` de 2 px, badge kin y un `--krt-gradient-sheen` sutil.

### 8.3 Badges y eyebrows

```html
<span class="badge badge--accent">Nuevo</span>
<span class="section__eyebrow">Experiencias</span>
```

- `.badge`: pill, 12 px, 600, padding `4px 10px`.
- `.badge--accent`: fondo `accent`, texto `accent-text`.
- `.badge--outline`: borde `--krt-glass-border`, texto `text-muted`, fondo `--krt-glass-bg`.
- `.section__eyebrow`: `accent`, 12 px, 600, mayúsculas, `letter-spacing: .18em`; puede llevar un kanji decorativo separado por un punto medio (ej. `走 · EXPERIENCIAS`).

### 8.4 Sección estándar

```html
<section class="section" id="experiencias" aria-labelledby="experiencias-title">
  <div class="container">
    <header class="section__header">
      <span class="section__eyebrow">Experiencias</span>
      <h2 class="section__title" id="experiencias-title">Elige tu carrera</h2>
      <p class="section__lead">Tres formatos. Una sola regla: darlo todo.</p>
    </header>
    <!-- contenido -->
  </div>
</section>
```

### 8.5 Formularios

```html
<div class="field">
  <label class="field__label" for="nombre">Nombre</label>
  <input class="field__input" id="nombre" name="nombre" type="text" autocomplete="name" required>
  <p class="field__error" role="alert">Escribe tu nombre.</p>
</div>
```

- `.field__input`, `.field__select`, `.field__textarea`.
- Fondo `--krt-glass-bg`, borde `--krt-glass-border`, radius `sm`, altura mínima 44 px, `backdrop-filter: blur(12px) saturate(140%)`.
- Foco: borde `accent` + `--krt-shadow-focus`.
- Error: borde `error` + mensaje con `role="alert"`.
- Todos los inputs deben tener `label` asociado y `name`.

### 8.6 Header y navegación

Barra-píldora de cristal flotante. No es una barra de borde a borde.

```html
<header class="site-header" id="inicio" data-site-header>
  <div class="site-header__surface" aria-hidden="true"></div>
  <div class="site-header__inner">
    <div class="site-header__brand">
      <a class="brand" href="#inicio">...</a>
      <span class="site-header__tagline" aria-hidden="true">Karting indoor · 3 circuitos</span>
    </div>
    <nav class="site-nav" id="site-menu" aria-label="Navegación principal" data-site-nav>...</nav>
    <button class="site-header__toggle" data-menu-toggle>...</button>
  </div>
  <div class="site-menu-overlay" aria-hidden="true" data-menu-overlay></div>
</header>
```

**Superficie**

- `.site-header`: `position: fixed`, `top: var(--krt-header-offset)` (12 px), altura **72 px** desktop / **64 px** móvil.
- `.site-header__surface`: capa visual con `border-radius: var(--krt-radius-full)`, borde `--krt-glass-border`, gradiente de cristal y `backdrop-filter: blur(var(--krt-glass-blur)) saturate(var(--krt-glass-saturate))`. Se separa de los bordes laterales con `max(--krt-space-3, (100% - var(--krt-container)) / 2)`.
- Al hacer scroll (`.is-scrolled`) el fondo se oscurece y la sombra crece; nunca cambia de forma.
- El blur vive en la superficie, no en `.site-header`, para no crear un containing block que rompa el panel móvil.

**Interior**

- `.site-header__inner`: `width: min(var(--krt-container), 100% - 20 px)`, `padding-inline: 20 px`, marca a la izquierda y nav + CTA a la derecha.
- Marca: solo wordmark `KARTRIBE.`. El sello hanko no se usa en el header (sigue disponible como `.brand__mark`).
- Descriptor `Karting indoor · 3 circuitos`: visible solo `≥1280px`, 10 px, mayúsculas, `letter-spacing: .18em`, `text-muted`.
- CTA **Reservar**: `.btn--primary.btn--sm`, sólido vermilion y radio completo. Nunca de cristal.
- Enlaces: `.site-nav__link`, 10–11 px desktop, 700, mayúsculas, `letter-spacing: .08em`. Cada enlace lleva una tecla circular `.site-nav__key` (E / P / G / O / F / C) y una flecha `.site-nav__arrow` en el panel móvil.
- Activo: `.is-active` → fondo `--krt-glass-bg-strong`, borde `--krt-glass-border`, texto `text` y tecla con fondo `accent` / texto `accent-text`.

**Responsive**

| Ancho | Header |
|---|---|
| `< 768px` | Hamburguesa + panel flotante de cristal bajo la píldora |
| `768–1023px` | Nav horizontal sin teclas ni descriptor |
| `1024–1279px` | Nav horizontal con teclas circulares, sin descriptor |
| `≥ 1280px` | Nav con teclas + descriptor de marca |

**Panel móvil**

- `.site-nav` es un panel flotante (`top: offset + altura + 8 px`, `right: 12 px`, `bottom: 12 px`), radio `xl`, blur fuerte y sin borde a borde.
- Abre con `.is-open`; el overlay `.site-menu-overlay` cubre el resto y `html.has-menu-open` bloquea el scroll.
- Incluye los seis enlaces, el CTA y el tagline `Tu tribu. / Tu pista.` al pie.
- Teclado: Escape cierra, el foco queda atrapado y vuelve al toggle (o al último elemento enfocado) al cerrar.
- El panel lleva `overflow-x: hidden` para que el contenido no ensanche el viewport.

**Comportamiento**

- Enlace activo: `aria-current="true"` además de `.is-active`; lo gestiona `scrollspy.js` cuando existan secciones.
- El logo y el enlace de inicio apuntan siempre a `#inicio`.
- Los IDs del menú son los reservados de la sección 9; el CTA apunta a `#reserva`.

### 8.7 Footer

- Fondo `surface`, borde superior `border`.
- 4 columnas en desktop → 1 en móvil.
- Incluye: logo, tagline, navegación, contacto, redes y legales.
- Copyright dinámico: `© <span id="year"></span> Kartribe`.

---

## 9. Estructura de secciones e IDs reservados

Estos IDs **no se renombran** (los usan la navegación y los CTAs):

| Orden | Sección | ID | Archivo CSS | Responsable |
|---|---|---|---|---|
| 1 | Header / nav | `#inicio` | `header.css` | _[nombre]_ |
| 2 | Hero | `#hero` | `hero.css` | _[nombre]_ |
| 3 | Experiencias | `#experiencias` | `experiences.css` | _[nombre]_ |
| 4 | Precios | `#precios` | `pricing.css` | _[nombre]_ |
| 5 | Galería | `#galeria` | `gallery.css` | _[nombre]_ |
| 6 | Opiniones | `#opiniones` | `testimonials.css` | _[nombre]_ |
| 7 | FAQ | `#faq` | `faq.css` | _[nombre]_ |
| 8 | Contacto / reserva | `#contacto` | `contact.css` | _[nombre]_ |
| 9 | CTA final + Footer | `#reserva` / `#footer` | `footer.css` | _[nombre]_ |

Estructura de `index.html`:

```html
<header class="site-header" id="inicio">...</header>
<main>
  <section class="hero" id="hero">...</section>
  <section class="section" id="experiencias">...</section>
  <section class="section" id="precios">...</section>
  <section class="section" id="galeria">...</section>
  <section class="section" id="opiniones">...</section>
  <section class="section" id="faq">...</section>
  <section class="section" id="contacto">...</section>
</main>
<footer class="site-footer" id="footer">...</footer>
```

- Cada sección se entrega en su propio bloque `<section>` autónomo.
- No se toca el HTML de una sección ajena: solo su archivo y su CSS.
- El header y el footer se integran **al final**, cuando todas las secciones estén cerradas.

---

## 10. Nomenclatura

### 10.1 Archivos y carpetas

- **kebab-case**, minúsculas, sin acentos ni espacios: `hero.css`, `mobile-menu.js`.
- Nombres en **inglés** para código; contenido en español.
- Imágenes: `{seccion}-{tema}-{variante}.{ext}` → `hero-kart-01.webp`, `gallery-drift-03.avif`.
- Iconos: `icon-{nombre}.svg` → `icon-flag.svg`.

### 10.2 CSS — BEM obligatorio

```css
/* Bloque */
.card { }

/* Elemento */
.card__title { }
.card__media { }

/* Modificador */
.card--featured { }
.btn--primary { }

/* Estado (solo con JS) */
.is-open { }
.is-active { }

/* Utilidad */
.u-grid { }
.u-visually-hidden { }
```

Reglas:

- Un bloque = una sección o un componente. Sin anidar bloques.
- Máximo **2 niveles** de elementos: `.card__body`, nunca `.card__body__title`.
- Nada de selectores por etiqueta para estilos de componente (`div.card` ❌).
- Nada de IDs para estilos.
- Profundidad máxima de anidación CSS: **2 niveles**.
- Variables CSS con prefijo `--krt-`.
- Estados JS: `.is-*`; nunca estilos a `[data-js]`.

### 10.3 JavaScript

| Tipo | Convención | Ejemplo |
|---|---|---|
| Variables y funciones | `camelCase` | `const menuButton`, `function toggleMenu()` |
| Constantes | `UPPER_SNAKE_CASE` | `const SCROLL_OFFSET = 72` |
| Booleanos | `is` / `has` / `can` | `isOpen`, `hasError` |
| Clases (si hiciera falta) | `PascalCase` | `class Accordion` |
| Archivos | `kebab-case` | `mobile-menu.js` |
| Hooks en HTML | `data-js="nombre"` | `data-js="menu-toggle"` |
| Eventos personalizados | `kartribe:*` | `kartribe:menu-open` |

- `const` por defecto, `let` solo si se reasigna. Nunca `var`.
- Funciones con verbo: `initMenu`, `openModal`, `validateForm`.
- Nada de variables globales: cada módulo exporta su `init`.
- Usar `addEventListener`, nunca `onclick` en HTML.
- `querySelector` siempre con scope dentro del componente.

### 10.4 IDs y atributos

- IDs en **kebab-case**: `form-reserva`, `faq-item-1`.
- Los IDs de sección están reservados (sección 9).
- `aria-*` solo cuando aporte semántica real; no duplicar texto visible.
- `data-*` en kebab-case: `data-js`, `data-open`, `data-index`.

---

## 11. Contenido y copy

- Español de España, tuteo, frases de máximo **18 palabras**.
- CTA siempre en infinitivo o imperativo: “Reservar”, “Descubre”, “Ven a probar”.
- Precios: `desde 25 €` (espacio antes del €), nunca `25€` ni `€25`.
- Fechas: `DD/MM/AAAA`. Horarios: `10:00–22:00`.
- Teléfono y email centralizados en un único bloque de contacto; no inventar datos distintos por sección.
- Prohibido inventar cifras, premios o reseñas. Si no hay dato real, se usa un placeholder marcado:
  `<!-- TODO: sustituir por dato real -->`.
- Sin lorem ipsum en la entrega final.
- Cada imagen necesita `alt` descriptivo (o `alt=""` si es decorativa).

---

## 12. Accesibilidad (obligatorio, no opcional)

- Contraste mínimo **4.5:1** en texto normal y **3:1** en texto grande.
- Texto sobre cristal o imagen: overlay mínimo `rgba(13, 12, 15, .55)` detrás del bloque; si no, se usa `--krt-glass-bg-strong`.
- Foco visible siempre: `outline: 2px solid var(--krt-color-accent); outline-offset: 3px;`.
- Navegación completa con teclado (Tab, Enter, Escape).
- Menú móvil: `aria-expanded`, `aria-controls`, bloqueo de scroll y cierre con Escape.
- FAQ: `<button aria-expanded>` + panel con `hidden`.
- Formularios: `label` visible, `autocomplete`, mensajes de error con `role="alert"`.
- Imágenes con `width` y `height` para evitar CLS.
- Respetar `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Texto mínimo: 16 px en móvil, 14 px solo para labels y notas.

---

## 13. Movimiento y animaciones

| Token | Valor |
|---|---|
| `--krt-duration-fast` | `150ms` |
| `--krt-duration-base` | `250ms` |
| `--krt-duration-slow` | `400ms` |
| `--krt-ease` | `cubic-bezier(.2, .8, .2, 1)` |

- Permitido: fade-in al entrar en viewport, hover de tarjetas, subrayado de nav, contador de métricas.
- Prohibido: parallax agresivo, autoplay con sonido, animaciones infinitas, `transform` en textos largos.
- Toda animación debe poder desactivarse con `prefers-reduced-motion`.
- Nada de librerías de animación (GSAP, AOS…) sin aprobación.

---

## 14. Imágenes, iconos y rendimiento

- Formatos: **AVIF** o **WebP**. PNG/JPG solo si no hay alternativa.
- Hero: máximo **250 KB**. Resto: máximo **150 KB** por imagen.
- Ancho máximo servido: 1920 px (hero) / 1200 px (secciones).
- `loading="lazy"` en todo lo que esté bajo el pliegue; `fetchpriority="high"` solo en la imagen del hero.
- Iconos en **SVG inline** o sprite; nunca emojis como iconos.
- Iconos con `stroke="currentColor"` y `aria-hidden="true"` si son decorativos.
- Sin vídeos en autoplay con sonido. Si hay vídeo de fondo: `muted`, `loop`, `playsinline` y poster.
- JS total del landing < **30 KB** sin comprimir. Sin jQuery.
- `backdrop-filter` es caro: máximo 6 superficies de cristal por vista y nunca animado. En móvil se reduce el blur a **16 px**.
- El fondo aurora va en un solo pseudo-elemento fijo; no se repite por sección.

---

## 15. Git y flujo de trabajo

### Ramas

```text
main                  ← solo merges revisados
feat/hero             ← una sección o componente
feat/experiencias
fix/menu-movil
content/faq
```

### Commits (Conventional Commits, descripción en español)

```text
feat(hero): añadir titular y CTA de reserva
fix(menu): cerrar menú al pulsar un enlace
style(pricing): ajustar separación de tarjetas
docs(readme): documentar estructura del proyecto
```

Tipos permitidos: `feat`, `fix`, `style`, `docs`, `refactor`, `perf`, `test`, `chore`.

### PRs

- Un PR = **una sección**. Máximo ~400 líneas de diff.
- Título: `feat(hero): sección hero`.
- Descripción obligatoria: qué se hizo, capturas a **375 / 768 / 1440 px**, y checklist marcada.
- Revisión de al menos **1 compañero** antes de merge.
- Prohibido mergear con conflictos, `console.log` o código comentado.

### Checklist antes de pedir revisión

- [ ] Solo he tocado mi sección y su CSS/JS.
- [ ] Uso únicamente tokens de color, espacio y tipografía.
- [ ] BEM correcto y sin estilos inline.
- [ ] Responsive probado en 375, 768, 1024 y 1440 px.
- [ ] Navegación con teclado y foco visible.
- [ ] Contraste AA verificado.
- [ ] Imágenes en WebP/AVIF con `alt`, `width` y `height`.
- [ ] Sin errores en consola.
- [ ] Sin `console.log`, `TODO` sin marcar ni código muerto.
- [ ] Copy en español, sin lorem ipsum.
- [ ] `prefers-reduced-motion` respetado.

---

## 16. Anexo: `tokens.css` de referencia

> Copiar tal cual en `assets/css/tokens.css`. **No modificar sin aprobación.**

```css
:root {
  /* Color — base */
  --krt-color-bg: #0D0C0F;
  --krt-color-surface: #17151A;
  --krt-color-surface-alt: #211C25;
  --krt-color-border: #3A323C;
  --krt-color-text: #FFFDF7;
  --krt-color-text-muted: #B9B1BE;

  /* Color — acción */
  --krt-color-primary: #DE3529;
  --krt-color-primary-hover: #C92C21;
  --krt-color-primary-active: #B0251B;
  --krt-color-primary-bright: #FF6A5C;

  /* Color — acentos japoneses */
  --krt-color-accent: #FFD24A;
  --krt-color-accent-strong: #FFE38A;
  --krt-color-accent-text: #1A1206;
  --krt-color-ai: #C9BED8;
  --krt-color-mizu: #E9E4DA;
  --krt-color-kin: #E8B84A;

  /* Color — semánticos */
  --krt-color-success: #5CEB9A;
  --krt-color-warning: #FFD166;
  --krt-color-error: #FF7A70;
  --krt-color-info: #7CC4FF;

  /* Liquid Glass */
  --krt-glass-bg: rgba(255, 255, 255, .08);
  --krt-glass-bg-strong: rgba(255, 255, 255, .14);
  --krt-glass-border: rgba(255, 255, 255, .20);
  --krt-glass-highlight: rgba(255, 255, 255, .60);
  --krt-glass-blur: 24px;
  --krt-glass-saturate: 165%;
  --krt-glass-shadow: 0 10px 40px rgba(0, 0, 0, .50);

  /* Gradientes */
  --krt-gradient-aurora:
    radial-gradient(60% 75% at 10% 0%, rgba(222, 53, 41, .30) 0%, transparent 62%),
    radial-gradient(50% 60% at 90% 10%, rgba(255, 210, 74, .20) 0%, transparent 65%),
    radial-gradient(45% 60% at 60% 100%, rgba(201, 190, 216, .12) 0%, transparent 70%);
  --krt-gradient-hero:
    linear-gradient(180deg, rgba(13, 12, 15, .25) 0%, rgba(13, 12, 15, .94) 100%);
  --krt-gradient-sheen:
    linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, .16) 50%, transparent 80%);

  /* Tipografía */
  --krt-font-display: "Anton", Impact, sans-serif;
  --krt-font-body: "Inter", system-ui, -apple-system, sans-serif;
  --krt-font-jp: "Noto Sans JP", sans-serif;

  --krt-text-display: clamp(3rem, 8vw, 6rem);
  --krt-text-h1: clamp(2.5rem, 6vw, 4.5rem);
  --krt-text-h2: clamp(2rem, 4vw, 3rem);
  --krt-text-h3: 1.5rem;
  --krt-text-body-lg: 1.125rem;
  --krt-text-body: 1rem;
  --krt-text-sm: 0.875rem;
  --krt-text-xs: 0.75rem;

  /* Espaciado */
  --krt-space-1: 4px;
  --krt-space-2: 8px;
  --krt-space-3: 12px;
  --krt-space-4: 16px;
  --krt-space-5: 24px;
  --krt-space-6: 32px;
  --krt-space-7: 48px;
  --krt-space-8: 64px;
  --krt-space-9: 96px;
  --krt-space-10: 128px;

  /* Radios */
  --krt-radius-sm: 4px;
  --krt-radius-md: 8px;
  --krt-radius-lg: 12px;
  --krt-radius-xl: 24px;
  --krt-radius-full: 999px;

  /* Sombras */
  --krt-shadow-card: 0 8px 24px rgba(0, 0, 0, .35);
  --krt-shadow-elevated: 0 16px 48px rgba(0, 0, 0, .50);
  --krt-shadow-focus: 0 0 0 3px rgba(255, 210, 74, .50);

  /* Movimiento */
  --krt-duration-fast: 150ms;
  --krt-duration-base: 250ms;
  --krt-duration-slow: 400ms;
  --krt-ease: cubic-bezier(.2, .8, .2, 1);

  /* Capas */
  --krt-z-base: 0;
  --krt-z-dropdown: 10;
  --krt-z-sticky: 100;
  --krt-z-header: 200;
  --krt-z-overlay: 300;
  --krt-z-modal: 400;
  --krt-z-toast: 500;
}
```

---

## 17. Definición de “terminado”

Una sección está terminada cuando:

1. Cumple todas las reglas de este documento.
2. Se ve correctamente en 375, 768, 1024 y 1440 px.
3. Pasa la checklist de la sección 15.
4. Tiene capturas en el PR y revisión aprobada.
5. No rompe ninguna otra sección ni el header/footer.

---

**Dudas o cambios:** se comentan en la issue `[docs] Design system` antes de tocar código. Este documento se actualiza en el mismo PR que introduce el cambio.
