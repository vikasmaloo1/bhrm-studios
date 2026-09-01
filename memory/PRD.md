# BHMR Studios — POC PRD (working memory)

## What this is
Single-page marketing POC for BHMR Studios (embedded design + build studio).
Stack: Next.js 16 (App Router) + React 19 + Tailwind v4 + GSAP/ScrollTrigger.
pnpm 11, Node 24. Scroll-driven, motion-forward. NO backend / forms / CMS /
integrations — POC only.

## Environment notes (this pod)
- App is a Next.js project at the repo root `/app` (NOT the standard
  frontend/backend split). Cloned from github.com/vikasmaloo1/bhrm-studios (main).
- Node 24 lives at `/root/.node24/bin` (pod base only ships Node 20, too old
  for pnpm 11). Always `export PATH=/root/.node24/bin:$PATH` before pnpm.
- Dev server runs via supervisor program **nextjs** (`next dev` on 0.0.0.0:3000).
  Restart: `sudo supervisorctl restart nextjs`.
- Preview host added to `next.config.ts` allowedDevOrigins.

## Core requirements (client, static)
- Hero title in **DM Serif Display**; white bg, near-black ink, BHMR orange (#FF5A1F) accent.
- Must contain: Hero · scroll-text Section 01 (Honest Address) · Section 02
  (Beliefs) · **7-stage process (white, vertical top-to-bottom pinned motion)** ·
  three client types (Pre-launch founders / Growing SMBs / Funded startups) · CTA · Footer.
- Motion from TEXT + COMPONENTS + SCROLL only — no floating blobs/dots/lamp/decoration.
- Word-by-word smooth scroll-fill text (reference: bhrm-studios.vercel.app).
- Everything responsive & motioned on mobile/tablet/desktop (1440/1280/1024/768/480/390/360).

## Implemented (2026-09-01)
- `WordFillReveal` — smooth overlapping word-by-word scrubbed ink-in (Sections 01 & 02).
- Vertical pinned 7-stage progression (`ProcessTimeline.tsx`) — desktop rail + dot,
  mobile bottom progress bar; same idea all breakpoints.
- Address section rebuilt typography-only; workspace/lamp photo removed (no replacement).
- Statement orange gradient wash removed; outline wordmarks now show on mobile.
- Client-type cards: staggered parallax + clip reveal + hover.
- Validation: `pnpm check` passes; Playwright 8/8 at 1440/768/390 (no overflow,
  progressive fill, counter 01→07, no nav overlap).

## Backlog / next (all gated on client acceptance)
- P1: Real-browser playback smoothness sign-off (env can't render frames).
- P2: Remaining pages, Figma, forms/HubSpot/Sheets, backend, DNS, production deploy — OUT OF SCOPE now.

## Status
PHASE 2 — POC — READY FOR CLIENT REVIEW. Rework in working tree only (not committed/deployed).
