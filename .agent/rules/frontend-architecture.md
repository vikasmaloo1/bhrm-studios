# Frontend Architecture Rules

**Agent:** CODEX (owner) / All agents (read)
**Phase:** Applies from PHASE 1 onwards
**Status:** ACTIVE — governs all future engineering work

---

## Purpose

These rules define the architectural principles for the BHMR Studios website. They must be followed during all engineering phases.

---

## Core Principles

### 1. Component-Driven Architecture

- Build from small, reusable, well-typed components
- Compose pages from components — not the other way around
- Each component should have a single, clear responsibility
- Components must be independently testable

### 2. Shared Layout Primitives

- Create shared layout components (Container, Section, Grid) used across all pages
- Do not duplicate layout logic in individual pages
- Layout primitives must support responsive behavior by default

### 3. Reusable UI Components

- All UI elements (Button, Input, Card, Badge, etc.) live in `src/components/ui/`
- Do not create one-off styled elements for individual pages
- Components must accept and forward className props for flexibility

### 4. Shared Design Tokens

- All colors, typography, spacing, and other design values live as CSS variables or Tailwind theme values
- Do not hard-code visual values in components
- Tokens must be defined in a single source of truth (the design system)
- Final token values will be established during the design phase — do not invent them

### 5. Responsive-First Behavior

- Design and implement for mobile-first
- Use Tailwind breakpoints consistently: `sm`, `md`, `lg`, `xl`, `2xl`
- Never create desktop-only layouts without a mobile fallback
- Test all breakpoints before marking a feature complete

### 6. Accessibility-Conscious Implementation

- Use semantic HTML elements (nav, main, article, section, header, footer)
- All interactive elements must be keyboard-accessible
- Images must have meaningful alt text
- Color contrast must meet WCAG AA minimum
- ARIA attributes only when semantic HTML is insufficient

### 7. Semantic HTML

- Use the correct HTML element for its meaning — not for its appearance
- Do not use divs where a button, a, nav, or other semantic element is correct
- Headings must follow a logical hierarchy (h1 → h2 → h3)

### 8. Controlled Dependency Usage

- Every new package must be justified against the approved scope
- Do not install convenience packages for things achievable with framework primitives
- Document the reason for every significant dependency added

### 9. Minimal Client-Side JavaScript

- Prefer React Server Components (RSC) where content is static or server-fetched
- Use `"use client"` only when interactivity requires it
- Do not add client-side state for things that do not require it

### 10. Motion Isolated in Reusable Utilities

- Animations must be encapsulated in dedicated motion utilities/hooks — not scattered across components
- GSAP (when approved) must be initialized and managed through a controlled utility
- Animations must respect `prefers-reduced-motion`
- No animation library installation during Phase 0

### 11. No Unnecessary Global State

- Do not reach for context or state management for things that can be passed as props
- If global state is genuinely needed, use React Context with clear ownership
- Do not install Redux, Zustand, or similar unless specifically justified and approved

---

## Prohibited Patterns

- Inline styles (use Tailwind or CSS variables)
- `!important` overrides
- `any` in TypeScript
- Disabled TypeScript strict checks
- Direct DOM manipulation outside of useRef/useEffect patterns
- Mixing page-specific and shared styles in the same file
- Importing animation libraries that are not approved for the current phase

---

## File Placement

| What                | Where                      |
| ------------------- | -------------------------- |
| Page components     | `src/app/[route]/page.tsx` |
| Layout components   | `src/components/layout/`   |
| UI primitives       | `src/components/ui/`       |
| Section components  | `src/components/sections/` |
| Shared hooks        | `src/lib/hooks/`           |
| Utilities           | `src/lib/utils/`           |
| Type definitions    | `src/lib/types/`           |
| Constants           | `src/lib/constants/`       |
| Motion utilities    | `src/lib/motion/`          |
| Global styles       | `src/styles/globals.css`   |
| Static content/copy | `src/content/`             |

---

_Last updated: 2026-09-01_
_Owner: CODEX_
_Status: ACTIVE_
