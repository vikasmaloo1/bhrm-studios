# Figma Design Rules

**Agent:** CODEX (Figma owner) / CLAUDE (reviewer) / ANTIGRAVITY (not a Figma owner)
**Status:** PENDING — Figma work has NOT started

---

## Important Notice

**Figma production has NOT been activated.**

Do not:

- Create any Figma file or frame
- Create any production screen
- Create any design tokens with final visual values
- Begin Figma work of any kind

This file is preparation only. It defines the rules that will govern Figma work when the design phase begins.

---

## Activation Gate

Figma production starts ONLY after:

1. The approved scope document is signed off
2. The PRD has been approved by the human owner
3. The design phase has been explicitly opened by the human owner
4. The design brief / brand assets have been received from the client

---

## Figma Ownership

| Role                 | Agent       | Access                                               |
| -------------------- | ----------- | ---------------------------------------------------- |
| Production owner     | CODEX       | Creates and owns all Figma screens                   |
| Independent reviewer | CLAUDE CODE | Reviews for UX, accessibility, copy, and consistency |
| Reference auditor    | ANTIGRAVITY | Audit evidence only — NOT a production owner         |
| Final approver       | HUMAN       | All design gates require human sign-off              |

Antigravity is NOT a Figma production owner and must not create production design screens.

---

## Design Production Rules (For When Active)

### Reusability

- Use components for every repeating element
- Use semantic variable names for all design tokens (colors, type, spacing)
- Do not create page-by-page hard-coded design — compose from components

### Variables and Tokens

- Define a variable library before creating page designs
- Use semantic names: `color/surface/primary`, `text/heading/1`, not `#FFFFFF`
- Token values will be established with client during the design phase
- Do not invent final BHMR brand tokens before client input

### Auto Layout

- Use Auto Layout for all frames and components
- No fixed-position elements inside responsive containers
- All components must be responsive-ready

### Page Structure

- One Figma page per major page type
- Plus: `Design System`, `Components`, `Icons`, `Tokens`
- Plus: `Archive` for iterations

### Review Gate

Before any page design is considered complete:

1. Claude Code must review for UX and accessibility
2. Human owner must approve the page design
3. No engineering begins on a page before design is approved

---

## What Not to Clone

Do not clone or reproduce:

- The Made With GSAP website visual design
- Any other reference site's layout, branding, or visual identity
- Any copyrighted visual assets

The BHMR Studios design must be original and specific to the client.

---

_Last updated: 2026-09-01_
_Owner: CODEX_
_Status: PENDING — not yet active_
