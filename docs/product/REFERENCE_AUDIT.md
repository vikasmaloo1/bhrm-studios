# Reference Audit & Source Discovery — BHMR Studios

**Phase:** PHASE 1 — DISCOVERY AND REQUIREMENTS  
**Date:** 2026-09-01  
**Agent:** ANTIGRAVITY (Reference Auditor) / CODEX (Documentation Owner)  
**Status:** INITIAL AUDIT COMPLETE

---

## 1. Executive Summary

As part of Phase 1 Discovery, an automated read-only audit of the two primary reference websites was conducted:

1. **Current Site:** https://bhrm-studios.vercel.app
2. **Visual & Motion Reference:** https://madewithgsap.com/

This audit establishes the baseline of what currently exists, identifies key architectural and UX patterns, and provides inspiration for motion design without copying code, assets, or branding.

---

## 2. Audit: Current BHMR Studios Site

- **URL:** https://bhrm-studios.vercel.app
- **Title:** BHMR Studios — The embedded build partner
- **Architecture:** Client-rendered Single Page Application (Vite + React + React Router)

### Existing Site Structure & Routes

From bundle analysis of the live deployment, the following routes were discovered:

- / — Main Homepage / Landing
- /services — Services offering
- /pricing — Pricing / engagement models
- /work-with-us — Intake / partnership inquiry
- /about — About the studio & team
- /privacy — Privacy policy
- /terms — Terms of service
- /design-system — Internal design system preview

### Discovered Component & Section Architecture

The existing application is broken into distinct narrative sections:

- FounderSection — Leadership & studio founder background
- FitSection — Target client fit ("Who we are for / not for")
- CommitmentsSection — Core studio commitments & delivery standards
- WorkingWithUsSection — Collaboration methodology
- WorkingTogetherSection — Engagement mechanics
- DistanceSection — Remote collaboration & async communication philosophy
- PracticalDetailsSection — Day-to-day operations, communication cadences
- StandardsSection — Engineering & design quality bar
- MeasureSuccessSection — KPIs and success metrics for client builds
- FAQSection — Frequently asked questions
- DiscoveryCallSection — Primary call-to-action for scheduling consultation

### Key Observations & Takeaways for Redesign

1. **Strong Narrative Flow:** The current site uses a modular section-by-section narrative that effectively communicates value, culture, and operational rigor.
2. **Sitemap Alignment:**
   - Redesign scope includes: Homepage, About, Services, Pricing, Work With Us, Careers, Director of Business Development, Privacy Policy, Terms of Service.
   - The current site lacks a dedicated **Careers** page and a dedicated **Director of Business Development** page. These represent brand-new requirements in the new scope.
3. **SEO & Performance Need:** The current site is a client-side Vite SPA (<div id="root"></div>). Transitioning to Next.js 16 App Router with Server-Side Rendering (SSR) / Static Site Generation (SSG) will dramatically improve initial load times, Core Web Vitals, and organic search indexing.

---

## 3. Audit: Made With GSAP (Visual & Motion Reference)

- **URL:** https://madewithgsap.com/
- **Purpose:** Animation and visual interaction inspiration only. No copying of source code, layout, or assets.

### Key Interaction & Motion Observations

1. **Interactive Hero Component:**
   - Interactive drag/scroll gallery showcasing media cards with smooth physics.
   - Immediate visual impact that invites user tactile exploration without blocking critical information.
2. **Scroll-Driven Storytelling:**
   - Pinned text sections with progressive highlight/fade-in on scroll (ScrollTrigger pinning).
   - High-contrast section alternations (e.g., #FFFFFF to #000000 surfaces) with smooth background transition triggers.
3. **Micro-Interactions:**
   - Magnetic or rolling button hover states (dual-layer text translate on hover).
   - Smooth badge and counter animations.
4. **Performance & Accessibility Considerations:**
   - The site uses Lenis smooth scroll and hardware-accelerated transforms.
   - **Critical Redesign Requirement:** Any motion designed for BHMR Studios must respect prefers-reduced-motion and degrade gracefully on low-power mobile devices.

---

## 4. Input Requirements for PRD Finalization

To advance from Initial Audit to PRD Consolidation and Approval, the following inputs are required from the Human Owner:

1. **Approved Project Proposal / Quotation:** To verify scope boundaries, deliverables, and commercial terms.
2. **BHMR Page Copy Documents:** Text copy for all 9 pages (Homepage, About, Services, Pricing, Work With Us, Careers, Director of BD, Privacy Policy, Terms of Service).
3. **Brand Assets:** Vector logos, color palettes, typographic preferences, and photography/media guidelines.
