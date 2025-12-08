# SeleneX Design Tokens

## Colors

### Primary Palette

```css
/* Clinical White */
--color-white: #FFFFFF;

/* Medical-Scientific Indigo */
--color-indigo: #1D1B4F;

/* AI Blue Gradient Start */
--color-blue-start: #6377FF;

/* AI Blue Gradient End */
--color-blue-end: #8AA8FF;

/* Minimalist Silver/Grey */
--color-silver: #DBDBDB;
```

### Usage Guidelines

- **White (#FFFFFF):** Primary background, clinical cleanliness
- **Deep Indigo (#1D1B4F):** Headers, medical-scientific credibility
- **Blue Gradient (#6377FF → #8AA8FF):** AI/technology elements, CTAs
- **Silver/Grey (#DBDBDB):** Minimalist molecular lines, subtle accents

---

## Typography

### Font Families

**Primary Fonts:**
- Satoshi
- Inter
- Circular

**Secondary Fonts:**
- IBM Plex Sans
- Helvetica Neue

### Font Sizes

```css
/* Headings */
--font-size-h1: 3rem;      /* 48px */
--font-size-h2: 2.25rem;   /* 36px */
--font-size-h3: 1.875rem;  /* 30px */
--font-size-h4: 1.5rem;    /* 24px */
--font-size-h5: 1.25rem;   /* 20px */
--font-size-h6: 1.125rem;  /* 18px */

/* Body Text */
--font-size-body-large: 1.125rem;  /* 18px */
--font-size-body: 1rem;            /* 16px */
--font-size-body-small: 0.875rem;  /* 14px */
--font-size-caption: 0.75rem;       /* 12px */
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights

```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

## Spacing

### Spacing Scale

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
--spacing-4xl: 6rem;     /* 96px */
```

---

## Border Radius

```css
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 1rem;       /* 16px */
--radius-xl: 1.5rem;     /* 24px */
--radius-2xl: 2rem;      /* 32px */
--radius-full: 9999px;   /* Full circle */
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
```

---

## Visual Motifs

### DNA/RNA Elements

**DNA Double-Helix:**
- Thickness: 1–2px
- Style: Outline only, not filled
- Color: Silver/Grey (#DBDBDB) or gradient
- Usage: Subtle background elements

**RNA Single-Strand:**
- Thickness: 1px
- Style: Curved lines
- Color: Silver/Grey or Blue gradient
- Usage: Data pathway visualizations

**Molecule Graphs:**
- Style: Very sparse, node-based
- Nodes: Small circles (2–4px)
- Connections: Thin lines (1px)
- Color: Subtle grey or blue

**Data Fusion Visualization:**
- Broken strands merging into one
- Circles and curves representing data layers
- Minimalist, abstract representation

---

## Animation Guidelines

### Animation Principles

1. **Slow and Elegant** — No rushed movements
2. **Subtle** — Enhance, don't distract
3. **Purposeful** — Every animation has meaning
4. **Smooth** — Use easing functions

### Animation Ideas

**Helix Rotation:**
- Duration: 6–8 seconds
- Easing: Linear
- Purpose: Background element, subtle movement

**Data Pulses:**
- Duration: 2–3 seconds
- Easing: Ease-in-out
- Purpose: Show data flow through RNA-like curves

**Circle Merging:**
- Duration: 1–1.5 seconds
- Easing: Cubic-bezier(0.4, 0, 0.2, 1)
- Purpose: Represent multimodal fusion

**Fade Transitions:**
- Duration: 0.3–0.5 seconds
- Easing: Ease-in-out
- Purpose: Smooth content transitions

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

---

## Component Specifications

### Buttons

**Primary Button:**
- Padding: 0.875rem 1.75rem (14px 28px)
- Border Radius: 9999px (full rounded)
- Font Weight: 600 (semibold)
- Font Size: 0.875rem (14px)

**Secondary Button:**
- Padding: 0.75rem 1.5rem (12px 24px)
- Border Radius: 9999px
- Font Weight: 500 (medium)
- Font Size: 0.875rem

### Cards

**Card Padding:**
- Default: 1.5rem (24px)
- Large: 2rem (32px)

**Card Border Radius:**
- Default: 1.5rem (24px)
- Large: 2rem (32px)

**Card Shadow:**
- Default: --shadow-md
- Hover: --shadow-lg

---

## Accessibility

### Contrast Ratios

- **Text on White:** Minimum 4.5:1 for body text, 3:1 for large text
- **Text on Indigo:** White text meets WCAG AAA standards
- **Interactive Elements:** Minimum 3:1 contrast ratio

### Focus States

- **Focus Ring:** 2px solid outline
- **Focus Color:** Blue gradient (#6377FF)
- **Focus Offset:** 2px from element

---

## Do's and Don'ts

### ✅ Do

- Use minimalist DNA/RNA motifs sparingly
- Maintain clean, clinical aesthetic
- Use subtle animations
- Keep molecular elements abstract
- Ensure high contrast for readability

### ❌ Don't

- Use detailed biological drawings
- Show real biopsy images
- Display omics heatmap screenshots
- Use sequence patterns resembling real genomic data
- Overuse animations or visual effects





