# Design System — BHMR Studios

**STATUS: PLANNING**
**APPROVAL: PENDING — Final values require client brand input and design phase approval**

---

> **Important:** This document is a planning skeleton only. All values marked `[TBD]` or `[PENDING]` are placeholders. Do not implement these values in code until they are approved during the design phase.

---

## Purpose

This document will become the single source of truth for all visual design decisions on the BHMR Studios website. It governs:

- Visual language and brand expression
- Component appearance and behavior
- Responsive rules
- Accessibility standards
- Motion behavior

---

## 1. Color

**Status: PENDING — Requires client brand input**

```
color/
├── brand/
│   ├── primary:        [TBD]
│   ├── secondary:      [TBD]
│   └── accent:         [TBD]
│
├── neutral/
│   ├── 50 → 950:       [TBD — scale]
│
├── surface/
│   ├── background:     [TBD]
│   ├── foreground:     [TBD]
│   ├── card:           [TBD]
│   └── overlay:        [TBD]
│
├── text/
│   ├── primary:        [TBD]
│   ├── secondary:      [TBD]
│   ├── muted:          [TBD]
│   └── inverse:        [TBD]
│
├── border:             [TBD]
│
└── semantic/
    ├── success:        [TBD]
    ├── warning:        [TBD]
    ├── error:          [TBD]
    └── info:           [TBD]
```

All colors must meet WCAG AA contrast requirements for their usage context.

---

## 2. Typography

**Status: PENDING — Font selection requires design phase**

```
typography/
├── font-family/
│   ├── heading:        [TBD — likely variable font]
│   ├── body:           [TBD]
│   └── mono:           [TBD — for code or technical content if needed]
│
├── font-size/
│   ├── display-2xl:    [TBD]
│   ├── display-xl:     [TBD]
│   ├── display-lg:     [TBD]
│   ├── display-md:     [TBD]
│   ├── display-sm:     [TBD]
│   ├── text-xl:        [TBD]
│   ├── text-lg:        [TBD]
│   ├── text-md:        [TBD]
│   ├── text-sm:        [TBD]
│   └── text-xs:        [TBD]
│
├── font-weight/
│   ├── regular:        [TBD]
│   ├── medium:         [TBD]
│   ├── semibold:       [TBD]
│   └── bold:           [TBD]
│
├── line-height/
│   ├── tight:          [TBD]
│   ├── normal:         [TBD]
│   └── relaxed:        [TBD]
│
└── letter-spacing/
    ├── tight:          [TBD]
    ├── normal:         [TBD]
    └── wide:           [TBD]
```

---

## 3. Spacing

**Status: PLANNING — Will follow a consistent scale**

Spacing will use a base-4 or base-8 scale (to be confirmed during design phase):

```
spacing/
├── 1:    4px   [TBD]
├── 2:    8px   [TBD]
├── 3:    12px  [TBD]
├── 4:    16px  [TBD]
├── 5:    20px  [TBD]
├── 6:    24px  [TBD]
├── 8:    32px  [TBD]
├── 10:   40px  [TBD]
├── 12:   48px  [TBD]
├── 16:   64px  [TBD]
├── 20:   80px  [TBD]
├── 24:   96px  [TBD]
└── ...
```

Section padding will use a semantic scale (e.g., `section/sm`, `section/md`, `section/lg`).

---

## 4. Grid

**Status: PLANNING**

```
grid/
├── columns:     12 (desktop) / 4 (mobile)   [TBD]
├── gutter:      [TBD]
├── margin:      [TBD]
└── max-width:   [TBD — likely ~1280px or 1440px]
```

---

## 5. Border Radius

**Status: PENDING**

```
radius/
├── none:    0px      [TBD]
├── sm:      [TBD]
├── md:      [TBD]
├── lg:      [TBD]
├── xl:      [TBD]
└── full:    9999px
```

---

## 6. Elevation / Shadow

**Status: PENDING**

```
shadow/
├── none:    none
├── sm:      [TBD]
├── md:      [TBD]
├── lg:      [TBD]
└── xl:      [TBD]
```

---

## 7. Breakpoints

```
breakpoints/
├── sm:     640px
├── md:     768px
├── lg:     1024px
├── xl:     1280px
└── 2xl:    1536px
```

Key design targets:

- Mobile: 375px
- Tablet: 768px
- Laptop: 1280px
- Desktop: 1440px+

---

## 8. Button System

**Status: PENDING — Final styles require design phase**

Button variants (expected — to design):

- `primary` — main CTA
- `secondary` — supporting CTA
- `outline` — secondary action
- `ghost` — subtle action
- `destructive` — dangerous action

Button sizes (expected):

- `sm`, `md`, `lg`

All buttons must:

- Have hover and focus states
- Have disabled state
- Meet minimum touch target (44x44px)
- Have visible focus indicator

---

## 9. Form System

**Status: PENDING — Forms not in scope until Phase 2+**

Form elements to design:

- Text input
- Textarea
- Select
- Checkbox
- Radio
- File upload (if needed for careers)
- Form labels
- Helper text
- Error state
- Success state

---

## 10. Navigation

**Status: PENDING**

Expected navigation elements:

- Primary navigation (desktop)
- Mobile navigation / drawer
- Active state
- Hover state

---

## 11. Cards

**Status: PENDING**

---

## 12. CTA (Call to Action)

**Status: PENDING**

---

## 13. Motion

**Status: PENDING — GSAP not installed until Phase 3+**

Motion principles (when active):

- All animations must respect `prefers-reduced-motion`
- Animations should enhance — not distract
- Easing: [TBD — likely custom ease curves]
- Duration tokens: [TBD]
- Entrance animations: [TBD]
- Scroll animations: [TBD]
- Page transitions: [TBD]

GSAP will be installed and configured only after:

1. Design phase is approved
2. Animation specifications are documented
3. Human owner authorizes installation

---

## 14. Accessibility

Requirements:

- Color contrast: WCAG AA minimum (4.5:1 for text, 3:1 for large text/UI)
- Focus indicators: visible and styled
- Touch targets: minimum 44x44px
- Text resizing: layout must not break at 200% text size
- Reduced motion: all animations must degrade gracefully

---

## 15. Responsive Rules

- Mobile-first implementation
- All components responsive by default
- No fixed widths that break at smaller viewports
- Typography scales with viewport (fluid type — to confirm approach)
- Images: responsive, properly sized, optimized

---

_Document status: PLANNING_
_Approval: PENDING_
_Last updated: 2026-09-01_
_Owner: CODEX_
_Final values: to be established during design phase with client input_
