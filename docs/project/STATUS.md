# Project Status — BHMR Studios Website Redesign

---

## Project Overview

| Field               | Value                                                               |
| ------------------- | ------------------------------------------------------------------- |
| **Project**         | BHMR Studios Website Redesign                                       |
| **Current Phase**   | PHASE 2 — POC — READY FOR CLIENT REVIEW                             |
| **Status**          | BUILT — awaiting client review                                      |
| **Last Updated**    | 2026-09-01 (POC rework)                                             |
| **Execution owner** | CLAUDE CODE (temporary, per D-009) — Codex remains governance owner |

---

## Milestone Status

### PHASE 0 — PROJECT BOOTSTRAP ✅ COMPLETE

| Task                              | Status  | Notes                                                                                        |
| --------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| Repository created                | ✅ DONE | C:\Users\Vikas\Documents\bhmr\bhmr-studios                                                   |
| Next.js scaffold                  | ✅ DONE | Next.js 16, TypeScript strict, Tailwind v4, App Router                                       |
| pnpm setup                        | ✅ DONE | pnpm v11.25.0                                                                                |
| Prettier installed                | ✅ DONE | v3.9.6                                                                                       |
| Quality scripts                   | ✅ DONE | format, format:check, lint, typecheck, check                                                 |
| .nvmrc                            | ✅ DONE | Node 24                                                                                      |
| .env.example                      | ✅ DONE | Placeholders only — tracked in Git                                                           |
| .gitignore                        | ✅ DONE | .env.local protected; .env.example explicitly tracked                                        |
| AGENTS.md                         | ✅ DONE | Shared AI contract                                                                           |
| CLAUDE.md                         | ✅ DONE | Claude overlay                                                                               |
| .agent/rules/                     | ✅ DONE | 5 rule files (reference-audit, browser-qa, frontend-architecture, figma-design, qa-security) |
| .claude/rules/review-checklist.md | ✅ DONE | Per-category review checklist for Claude Code                                                |
| docs/product/PRD.md               | ✅ DONE | DRAFT status                                                                                 |
| docs/architecture/                | ✅ DONE | PROPOSED status                                                                              |
| docs/design/DESIGN_SYSTEM.md      | ✅ DONE | PLANNING status                                                                              |
| docs/project/ memory files        | ✅ DONE | STATUS, DECISIONS, RISKS, HANDOFF, PROMPT_LOG                                                |
| README.md                         | ✅ DONE | Project overview & developer guide                                                           |
| .github/workflows/ci.yml          | ✅ DONE | Quality checks + Gitleaks secret scan                                                        |
| .github/pull_request_template.md  | ✅ DONE | PR template & quality gate checklist                                                         |
| Git initialized                   | ✅ DONE | main branch                                                                                  |
| GitHub remote                     | ✅ DONE | https://github.com/vikasmaloo1/bhrm-studios                                                  |
| Initial commit                    | ✅ DONE | chore: initialize BHMR project foundation                                                    |
| Quality validation                | ✅ DONE | pnpm check — all pass                                                                        |
| Claude Code independent review    | ✅ DONE | Verdict: PASS WITH ACTIONS — all findings resolved                                           |
| Phase 0 corrective commit         | ✅ DONE | chore: resolve phase 0 review findings                                                       |

**Phase 0 closure**

| Field                  | Value                                                                       |
| ---------------------- | --------------------------------------------------------------------------- |
| **Completion date**    | 2026-09-01                                                                  |
| **Closing commit**     | `chore: close phase 0 and authorize phase 1`                                |
| **Validation**         | `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — all PASS |
| **Authorization**      | D-009 — human owner (Vikas Maloo)                                           |
| **Independent review** | Claude Code, 2026-09-01 — PASS WITH ACTIONS, all findings closed            |
| **Next phase**         | Phase 1 — Discovery and Requirements                                        |

### PHASE 1 — DISCOVERY AND REQUIREMENTS — PARTIAL / DEFERRED

Authorized by **D-009**. See R-007 for how the earlier undocumented transition was reconciled.

> **Scope note (2026-09-01):** The human owner narrowed this run to the coded POC only. Full
> Discovery consolidation — the 24-section PRD rewrite, architecture baseline and scope-lock
> red-team — was **deliberately not performed** and is deferred to a later authorized run.
> What is marked DONE below is genuinely done; nothing else is claimed.

| Task                        | Status      | Notes                                                                                  |
| --------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| Phase 1 authorization       | ✅ DONE     | D-009 — written human authorization                                                    |
| Client proposal review      | ✅ DONE     | `BHMR_Studios_Website_Proposal_Quotation_Final` (30 Aug 2026, ₹52,000) read and mapped |
| AI execution plan review    | ✅ DONE     | `BHMR_Studios_AI_Project_Execution_Plan` read and mapped                               |
| Phase 1 playbook review     | ✅ DONE     | `BHMR_Studios_Phase_1_Execution_and_AI_Prompt_Playbook` read and mapped                |
| Page copy documents         | ✅ RECEIVED | All 9 supplied to `docs/references/` during this run — R-009 resolved                  |
| Reference / visual audit    | ✅ DONE     | `docs/product/REFERENCE_AUDIT.md` (from `870744b`)                                     |
| Homepage copy → POC content | ✅ DONE     | Extracted verbatim into `src/content/home.ts`                                          |
| PRD consolidation           | ⏸️ DEFERRED | Out of scope for this run — PRD remains the earlier DRAFT skeleton                     |
| Architecture baseline       | ⏸️ DEFERRED | `docs/architecture/ARCHITECTURE.md` remains PROPOSED from Phase 0                      |
| Discovery red-team review   | ⏸️ DEFERRED | Not performed                                                                          |
| PRD approval / Scope Lock   | ⏳ PENDING  | Requires the deferred work above, then human sign-off                                  |

### PHASE 2 — PROOF OF CONCEPT ← CURRENT · READY FOR CLIENT REVIEW

Authorized by **D-009**. Boundary held: no additional pages, no forms, no
integrations, no backend, no Figma.

| Task                     | Status      | Notes                                                                                                        |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------ |
| POC scope agreed         | ✅ DONE     | Nav, hero, editorial, process, CTA, footer                                                                   |
| Design tokens            | ✅ DONE     | `src/app/globals.css` `@theme` — no hard-coded values in components                                          |
| Component library        | ✅ DONE     | 13 components + 4 motion modules                                                                             |
| Content wiring           | ✅ DONE     | Verbatim from `docs/references/Homepage_Copy.docx`                                                           |
| Motion (6 patterns)      | ✅ DONE     | GSAP + CSS; full reduced-motion fallback                                                                     |
| Responsive               | ✅ DONE     | Verified 320 / 375 / 768 / 1440 — zero horizontal overflow                                                   |
| Accessibility            | ✅ DONE     | All 23 text pairs pass WCAG AA (min 4.89:1); skip link; focus management                                     |
| Quality gates            | ✅ DONE     | `pnpm check` — format, lint, typecheck, build all pass                                                       |
| POC review pack          | ✅ DONE     | `docs/poc/POC_REVIEW.md`, `docs/poc/CLIENT_POC_SUMMARY.md`                                                   |
| Visual motion playback   | ⚠️ NOT DONE | Verification browser delivered zero frames — check in a real browser                                         |
| Independent review       | ⏳ PENDING  | R-008 — recommended before the client sees it                                                                |
| Client feedback pass     | ✅ DONE     | Removed "gaming" motion, DM Serif Display hero, white process section, added missing client type — see below |
| **Client review of POC** | ⏳ PENDING  | **Next action. Client decision — not ours to mark.**                                                         |

**Client feedback pass (2026-09-01)** — Nikky reviewed the live POC and called it
"more gaming type, not professional." Reworked in place, not committed:

- Removed all continuous decorative motion: rotating conic sun, breathing
  orange disc, orbiting badge, levitating card, custom pointer-tracking
  cursor. Motion now comes only from typography, components and scroll.
- Hero headline set in DM Serif Display (client's explicit request), large
  and immediately visible; grotesk caps kept for labels/UI only.
- Hero's glossy 3D-render image replaced with an original typographic
  service-stack card (Brand / Product / Front end / Back end).
- Added the missing third client type — **Pre-launch founders** — as its
  own major section (`ClientTypesSection.tsx`) alongside Growing SMBs and
  Funded Startups. Previously only two of three were present, and buried in
  a sub-block.
- Process section (seven stages) flipped from dark to **white** background,
  per explicit client direction; pinned horizontal scroll-driven motion
  retained.
- New `DriftText` motion primitive gives Sections 1–2 (Address, Beliefs)
  differential scroll-scrubbed line movement per the client's reference.
- Removed three Emergent-hosted third-party images; kept the one the owner
  asked to keep (CTA flowing-light background) by regenerating it as a
  self-hosted original — see `docs/poc/ASSETS.md`.
- Fixed a real bug found via owner screenshot: `ProcessTimeline`'s vertical
  (mobile) layout had no horizontal gutter, running stage text flush against
  the screen edge below 1024px.
- `pnpm check` passes. Verified 360/390/768/1024/1440 — zero horizontal
  overflow, zero stranded-invisible elements, all client-type cards present.

**POC refinement pass — motion + mobile (2026-09-01, P-010)** — second round
of client feedback on the deployed POC: mobile text-scroll felt abrupt, the
seven-stage motion should run top-to-bottom (not left-to-right), and the
workspace/lamp photo should go. Reworked in place, not committed:

- New `WordFillReveal` primitive: word-by-word scrubbed ink-in (opacity
  0.2→1) with overlapping stagger and a constant per-word scroll budget, so
  Sections 1–2 read as a smooth moving gradient on every device — replaces
  the earlier chunkier `DriftText` fade on the Address/Beliefs body copy.
- Seven-stage process flipped from pinned **horizontal** to pinned
  **vertical single-card progression** (client-specified top-to-bottom): each
  stage lifts away as the next clip-reveals in; desktop vertical rail + dot,
  mobile slim bottom progress bar and shorter pinned scene. Same design idea
  on all breakpoints, not disabled on mobile.
- Address section workspace/lamp photograph **removed with no replacement**
  (typography-only now); Statement orange gradient wash removed; giant
  outline wordmarks now show on mobile too.
- Automated Playwright verification (motion on, real viewports) at
  1440/768/390: 8/8 pass — progressive word-fill (0.20→1.00), process counter
  01→07 vertically at every width, no horizontal overflow, no nav overlap,
  no lamp image. `pnpm check` passes. Frame-by-frame playback smoothness
  still needs a real-browser eye check (standing env limitation).

### PHASE 3 — DESIGN

| Task        | Status     | Notes                    |
| ----------- | ---------- | ------------------------ |
| Figma setup | ⏳ PENDING | Not active until Phase 3 |

### PHASE 4 — ENGINEERING

| Task               | Status     | Notes |
| ------------------ | ---------- | ----- |
| Engineering begins | ⏳ PENDING |       |

### PHASE 5 — QA AND HANDOFF

| Task           | Status     | Notes |
| -------------- | ---------- | ----- |
| QA and handoff | ⏳ PENDING |       |

---

## Completed Milestones

- ✅ PHASE 0 — PROJECT BOOTSTRAP (2026-09-01)
- ✅ Phase 0 Claude Code independent review: PASS WITH ACTIONS — all findings resolved (2026-09-01)
- ✅ Phase 1 Initial Reference Audit (2026-09-01)
- ✅ PHASE 2 — Coded POC built (2026-09-01)
- ✅ PHASE 2 — Vercel Production POC deployed at https://bhmr-studios.vercel.app (2026-09-01)

## Currently Blocked / Pending External Inputs

- **Awaiting Client Proposal / Scope Document:** To verify exact deliverables, exclusions, and business constraints.
- **Awaiting Page Copy Documents:** Copy for Homepage, About, Services, Pricing, Work With Us, Careers, Director of BD, Privacy Policy, Terms of Service.

## Next Recommended Task

**CLIENT REVIEW / POC FEEDBACK.**

1. Open the POC in a normal browser and confirm the motion plays correctly.
2. Optionally run an independent review pass (R-008).
3. Send the POC to the client with `docs/poc/CLIENT_POC_SUMMARY.md`.
4. Settle the commercial position on POC effort (D-013).

Deferred until after the client confirms direction: PRD reconsolidation
against the received page copy, architecture baseline, Scope Lock.

---

## Important Links

| Resource              | URL / Path                                          |
| --------------------- | --------------------------------------------------- |
| Repository            | C:\Users\Vikas\Documents\bhmr\bhmr-studios          |
| GitHub                | https://github.com/vikasmaloo1/bhrm-studios         |
| Branch                | main                                                |
| CI                    | https://github.com/vikasmaloo1/bhrm-studios/actions |
| Vercel Production POC | https://bhmr-studios.vercel.app                     |
| Reference site        | https://madewithgsap.com/                           |
| Figma                 | [PENDING — not yet created]                         |
| Project tracker       | [PENDING]                                           |

---

## Phase Gate Approvals

Every approval row must cite a decision ID. A row without one is invalid (see R-007).

| Phase                         | Approval  | Date       | By                  | Decision                                 |
| ----------------------------- | --------- | ---------- | ------------------- | ---------------------------------------- |
| Phase 0 → Phase 1             | APPROVED  | 2026-09-01 | Vikas Maloo (owner) | D-009                                    |
| Phase 1 → Phase 2 (POC build) | APPROVED  | 2026-09-01 | Vikas Maloo (owner) | D-009                                    |
| Scope Lock (PRD approval)     | PENDING   | —          | BHMR client + owner | —                                        |
| POC acceptance                | PENDING   | —          | BHMR client         | —                                        |
| Phase 2 → Phase 3 (Figma)     | **GATED** | —          | BHMR client         | — — must not start before POC acceptance |
