# BHMR Studios — Homepage POC

## Original Problem Statement

Build a single-page visual POC for BHMR Studios — a premium digital studio homepage. Clean white background, near-black typography, BHMR orange accent (#FF5A1F). Bold modern typography, rich imagery, real motion (GSAP/ScrollTrigger), premium studio aesthetic. No backend, no auth, no CMS.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Compiler enabled), TypeScript 5 strict
- **Styling:** Tailwind CSS v4 with `@theme` design tokens
- **Motion:** GSAP + ScrollTrigger (masked reveals, parallax, pinned horizontal scroll, magnetic buttons, word-by-word ink reveal)
- **Fonts:** Archivo Black display / DM Serif Display italic emphasis / Instrument Sans body / JetBrains Mono meta
- **Runtime:** supervisor → `npm run dev` on port 3000
- **Media:** Unsplash + inline SVG accents (no stock handshakes / rocks / meeting photos)

## Architecture

```
src/
├── app/
│   ├── layout.tsx        — root layout + font stack
│   ├── page.tsx          — homepage composition
│   └── globals.css       — design tokens + utilities
├── components/
│   ├── layout/           — Navigation, Footer, Container
│   ├── sections/         — Hero, Address, Editorial, Statement, Process (+timeline), CTA
│   ├── ui/               — Button (label-swap + magnetic), Marquee, SectionHeading, Eyebrow
│   └── visuals/          — LayerStack (isometric 3D CSS)
├── content/home.ts       — all copy verbatim from BHMR sources
└── lib/motion/           — gsap.ts, TextReveal, primitives (MaskReveal, Parallax, Magnetic, Counter), tokens
```

## What's Been Implemented (2026-01)

- **Navigation** — pill nav that condenses on scroll, mobile sheet menu with focus containment
- **Hero** — rotating orange sun-burst, oversized display headline w/ accent + serif italic emphasis, two overlapping media plates with parallax, meta strip, marquee band
- **The Honest Address** — asymmetric two-col with sticky studio image, client-type cards, industries pills, region strip
- **What We Believe** — sticky editorial heading + belief list with hover color shift
- **Statement (hinge)** — pinned section, word-by-word ink reveal on scroll scrub, orange rule fills across
- **How We Work** — dark section with pinned horizontal 7-stage timeline (progress rail), gates aside
- **CTA** — full-bleed dark, oversized caps, magnetic button, meta strip
- **Footer** — brand recap, email w/ hover underline, registration details, oversized cropped wordmark
- **Motion language** — coherent tokens (durations, eases, staggers), respects `prefers-reduced-motion`, frame-loop watchdog fallback
- **Responsive** — tested at 1920 desktop and 390 mobile; asymmetric layouts adapt independently, not just shrunk

## Design Tokens

- Surface: `#ffffff` (pure white), depth breaks with `#f4f4f2`
- Ink: `#0a0a0a`
- Accent: `#ff5a1f` (surfaces), `#d63f0a` (as text), `#ff7a44` (hover)
- Display: Archivo 900 caps, tight tracking; DM Serif italic for emphasis

## Backlog / Out of Scope

- Other 8 pages (About, Services, Pricing, Work With Us, Careers, DBD, Privacy, ToS)
- Backend, database, auth, CMS
- HubSpot / Google Sheets integration
- Careers functionality, dashboards
- Production deployment (POC preview only)

## Deferred Next Steps

- P1: About + Services pages sharing the same design system
- P1: Real case studies / work section once client provides assets
- P2: Multi-step enquiry form (currently the CTA is an anchor)
- P2: Analytics + performance tuning + accessibility audit against WCAG AA
