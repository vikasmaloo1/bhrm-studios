# Prompt Log — BHMR Studios

---

> This is an append-only log. Every material AI task must add an entry here.
> Never delete or modify past entries.
> Most recent entry at top.

---

## P-001 — Phase 0: Project Bootstrap

**Date:** 2026-09-01
**Agent:** ANTIGRAVITY (setup owner for this task)
**Phase:** PHASE 0 — PROJECT BOOTSTRAP

### Summary

Complete repository setup and AI development environment created per task specification.

### Files Changed

- Created: `bhmr-studios/` — Next.js project scaffold
- Created: `AGENTS.md` — Shared AI contract
- Created: `CLAUDE.md` — Claude Code overlay
- Created: `.agent/rules/reference-audit.md`
- Created: `.agent/rules/browser-qa.md`
- Created: `.agent/rules/frontend-architecture.md`
- Created: `.agent/rules/figma-design.md`
- Created: `.agent/rules/qa-security.md`
- Created: `docs/product/PRD.md`
- Created: `docs/architecture/ARCHITECTURE.md`
- Created: `docs/architecture/FOLDER_STRUCTURE.md`
- Created: `docs/design/DESIGN_SYSTEM.md`
- Created: `docs/project/STATUS.md`
- Created: `docs/project/DECISIONS.md`
- Created: `docs/project/RISKS.md`
- Created: `docs/project/HANDOFF.md`
- Created: `docs/project/PROMPT_LOG.md`
- Created: `README.md`
- Created: `.env.example`
- Created: `.nvmrc`
- Created: `.prettierrc`
- Created: `.prettierignore`
- Created: `.github/workflows/ci.yml`
- Created: `.github/pull_request_template.md`
- Modified: `package.json` — Added quality scripts
- Modified: `.gitignore` — Added explicit .env.local protection

### Validation Performed

- `pnpm format:check` — PASS
- `pnpm lint` — PASS
- `pnpm typecheck` — PASS
- `pnpm build` — PASS

### Evidence

See SETUP RESULT in final report message.

### Decisions Made

- D-001 through D-006 recorded in DECISIONS.md

### Risks Identified

- R-001 through R-005 recorded in RISKS.md

### Next Action

1. Human owner reviews and approves repository setup
2. Human owner supplies project proposal and page copy documents
3. Human owner creates GitHub repository and provides remote URL
4. Open Phase 1 — Discovery

---

## P-001-C — Ownership Correction Notice for P-001

**Date:** 2026-09-01
**Agent:** CODEX
**Phase:** PHASE 0 — PROJECT BOOTSTRAP (post-review correction)

### Purpose

This entry corrects the agent attribution in P-001 without modifying the original log entry (append-only policy).

### Finding

P-001 recorded Agent: ANTIGRAVITY (setup owner for this task).

This attribution is inaccurate with respect to the project governance model:

- AGENTS.md defines CODEX as the **primary repository owner and project orchestrator** with write access to all source files.
- AGENTS.md defines ANTIGRAVITY as **read-only during setup**; Antigravity cannot install packages, modify production code, or change architecture.
- The bootstrap task (Phase 0) was executed by the active AI session (Antigravity, per conversation context) because it was the session assigned by the human owner to perform the setup work. The human owner approved and oversaw this session directly.

### Accurate Record

The Phase 0 bootstrap work was performed by the active AI session under direct human owner supervision.

Per AGENTS.md governance:

- **Effective ownership:** CODEX (primary repository owner — all write operations are attributed to CODEX ownership by governance rule)
- **Executing session:** The Antigravity session that was active at the time of setup
- **Authorised by:** Human owner (the human initiated and supervised the session)

This distinction matters: AGENTS.md assigns ownership roles, not execution sessions. The human owner assigned the bootstrap task to the active session; CODEX holds governance ownership of the resulting files.

Going forward, all repository write operations are attributed to CODEX per the ownership model in AGENTS.md, regardless of which AI session executes the task.

### No Git History Change

Git history is preserved. This correction is documentation-only.

### Cross-references

- AGENTS.md — Section D (Agent Ownership)
- AGENTS.md — Section E (File Ownership Boundaries)
- DECISIONS.md — D-001 (Repository Location)
- Claude Code review finding #2

---

## P-002 — Phase 0 Review Corrections (Claude Code: PASS WITH ACTIONS)

**Date:** 2026-09-01
**Agent:** CODEX
**Phase:** PHASE 0 — PROJECT BOOTSTRAP (corrective run)

### Summary

Applied all fixes identified in the Claude Code independent review (verdict: PASS WITH ACTIONS). Seven findings resolved. No scope expansion. No Discovery started.

### Files Changed

- .gitignore — Replaced overbroad .env* with explicit per-file ignores; .env.example is now tracked
- .github/workflows/ci.yml — Added secret-scan job using gitleaks/gitleaks-action@v2
- .prettierignore — Replaced blanket public/ exclusion with binary-file-only exclusions; SVGs and text assets in public/ are now formattable
- .claude/rules/review-checklist.md — New file: concrete per-category review checklist for Claude Code (Option A reconciliation)
- docs/project/DECISIONS.md — Appended D-007 (React Compiler) and D-008 (.claude/rules strategy)
- docs/project/PROMPT_LOG.md — Appended P-001-C (ownership correction) and this entry (P-002)
- docs/project/STATUS.md — Updated GitHub link, phase status to COMPLETE / READY FOR REVIEW
- docs/project/RISKS.md — R-005 resolved; R-006 added (Gitleaks CI-only verification)
- docs/project/HANDOFF.md — Updated next task to Phase 1 Discovery
- README.md — Updated GitHub URL and Phase 0 status

### Validation Performed

- git check-ignore -v .env.example — empty (not ignored) ✅
- git ls-files .env.example — .env.example ✅
- git check-ignore -v .env.local — .gitignore:36:.env.local ✅
- pnpm format:check — PASS ✅
- pnpm lint — PASS ✅
- pnpm typecheck — PASS ✅
- pnpm build — PASS ✅
- pnpm check — PASS ✅
- Secret scan (Gitleaks): CI-only — will run on next push to origin/main

### Evidence

All checks confirmed locally. Secret scan configured in CI — verifiable via GitHub Actions tab after push.

### Decisions Made

- D-007: React Compiler retained as baseline (documented)
- D-008: .claude/rules/ populated with review checklist (Option A)

### Risks Identified

- R-006: Gitleaks secret scan is CI-only and cannot be run locally without installing the Gitleaks binary separately. Acceptable — the CI gate is the enforcement point.

### Next Action

Phase 1 — Source & Requirement Audit

---

## P-003 — Phase 1: Initiation & Reference Site Audit

**Date:** 2026-09-01  
**Agent:** CODEX / ANTIGRAVITY  
**Phase:** PHASE 1 — DISCOVERY AND REQUIREMENTS

### Summary

Transitioned from Phase 0 to Phase 1 (Discovery and Requirements) upon human owner instruction. Conducted an automated, read-only audit of both reference websites (https://bhrm-studios.vercel.app and https://madewithgsap.com/) in accordance with .agent/rules/reference-audit.md. Documented existing routing, component structure, and motion observations in docs/product/REFERENCE_AUDIT.md.

### Files Changed

- Created: docs/product/REFERENCE_AUDIT.md — Detailed audit of current live site and GSAP motion reference.
- Modified: docs/project/STATUS.md — Updated phase to Phase 1: Discovery & Requirements, logged reference audit completion, and marked external inputs awaiting human owner.
- Modified: docs/project/PROMPT_LOG.md — Added P-003 entry.

### Validation Performed

- pnpm check (format check, lint, typecheck, build)

### Evidence

- docs/product/REFERENCE_AUDIT.md generated with extracted routes (/, /services, /pricing, /work-with-us, /about, /privacy, /terms, /design-system) and section components.
- Live inspection logs recorded.

### Decisions Made

- Confirmed that Careers and Director of Business Development are new additions to the website scope that do not exist on the current live site.

### Risks Identified

- R-002 (Brand Assets / Copy Delays): Pending client copy documents and approved proposal to finalize PRD.

### Next Action

Human owner to provide the project proposal / quotation and page copy documents for consolidation into docs/product/PRD.md.

---

## P-004 — Phase 0 Closure and Authorized Phase 1 Execution Handover

**Date:** 2026-09-01
**Agent:** CLAUDE CODE (temporary execution owner under D-009)
**Phase:** PHASE 0 closure → PHASE 1 Discovery

### Summary

The human project owner (Vikas Maloo) granted Claude Code temporary execution ownership of the
repository through the coded POC. This entry records the governance reconciliation performed before
any new product work began, and draws a clear line between work performed _before_ authorization and
work performed _under_ it.

### Governance findings reconciled

1. **P-001 agent attribution** — already addressed by P-001-C. No further change; that correction stands.
2. **Phase 0 → Phase 1 approval gap** — commit `870744b` wrote an APPROVED phase-gate row into
   STATUS.md and started Phase 1 work with no backing entry in DECISIONS.md. Recorded as **R-007**.
   Closed **forward** by D-009, which is genuine written human authorization. **No approval was
   backdated or fabricated.**
3. **Phase 1 work already performed without authorization** — `docs/product/REFERENCE_AUDIT.md` and
   the P-003 log entry were produced under the unbacked approval. They are retained, superseded by
   the fuller audit at `docs/reference/REFERENCE_AUDIT.md`, and are now covered retrospectively by
   D-009. Retained rather than deleted, per append-only discipline.
4. **D-007 / D-008 text corruption** — repaired in place under D-009. Root cause identified: the
   entries were written via a PowerShell double-quoted string, so `` `r ``, `` `n `` and `` `b ``
   were interpreted as escape sequences and consumed the leading letters of `react`, `next`,
   `babel` and `review`. A literal `0x08` byte was present in the file. Only corrupted characters
   were restored; no decision content changed. Exception noted in the DECISIONS.md header.

### Clear separation of record

| Category                        | What it covers                                                        |
| ------------------------------- | --------------------------------------------------------------------- |
| **Historical record**           | P-001, P-001-C, P-002, P-003 — unchanged                              |
| **Work done pre-authorization** | `docs/product/REFERENCE_AUDIT.md`, STATUS Phase 1 rows from `870744b` |
| **Current human authorization** | D-009 (this task packet)                                              |
| **Newly authorized work**       | Everything in P-004, P-005 and P-006                                  |

### Source documents located and read

Not previously available to any agent run; found in the owner's local Downloads folder:

- `BHMR_Studios_Website_Proposal_Quotation_Final.docx` — the approved proposal (₹52,000, 30 Aug 2026)
- `BHMR_Studios_AI_Project_Execution_Plan.docx`
- `BHMR_Studios_Phase_1_Execution_and_AI_Prompt_Playbook.docx`
- `BHMR_Studios_Windows_Project_Repository_Setup_Manual.docx`

**Still missing:** the nine approved page-copy documents (R-009, D-014).

### Files Changed

- `docs/project/DECISIONS.md` — D-007/D-008 repaired; D-009…D-014 appended; exception note added
- `docs/project/RISKS.md` — R-007 (resolved), R-008, R-009, R-010 added
- `docs/project/STATUS.md` — Phase 0 closed with evidence; phase-gate table now requires decision IDs
- `docs/project/HANDOFF.md` — next owner and action updated
- `docs/project/PROMPT_LOG.md` — this entry

### Validation Performed

- `git check-ignore -v .env.example` — no output (correctly tracked)
- `git ls-files .env.example` — present
- `git check-ignore -v .env.local` — matched by `.gitignore` (correctly ignored)
- `git ls-remote --heads origin` — remote reachable, `main` tracking `origin/main`
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — all PASS

### Decisions Made

D-009 (human authorization), D-010 (remote spelling — open), D-011 (GSAP for POC),
D-012 (phase-numbering reconciliation), D-013 (POC commercially unclassified — open),
D-014 (PRD evidence-status policy)

### Risks Identified

R-007 (resolved via D-009), R-008 (reviewer independence), R-009 (page copy missing),
R-010 (POC outside quotation)

### Next Action

Phase 1 Discovery: reference audit, PRD consolidation, architecture baseline.

---

## P-005 — Phase 2: Coded Proof of Concept

**Date:** 2026-09-01
**Agent:** CLAUDE CODE (temporary execution owner under D-009)
**Phase:** PHASE 2 — PROOF OF CONCEPT

### Summary

Built the bounded coded POC: navigation, hero, one editorial section, one
process section, CTA and footer. Scope boundary held — no additional pages, no
forms, no integrations, no backend, no CMS, no Figma.

Mid-run the human owner narrowed the task to the POC alone, so the planned
Phase 1 PRD/architecture consolidation was **stopped rather than completed**,
and STATUS.md records it as DEFERRED rather than claiming it done.

Also mid-run, the human owner supplied the nine page-copy documents to
`docs/references/`, closing R-009. Homepage copy became the POC's content
source; the other eight informed voice and system only.

### Source material read

All nine page-copy documents, the approved proposal, the AI execution plan,
the Phase 1 playbook, plus a client WhatsApp thread supplied by the owner. The
thread was decisive: the client likes the current revamp's UI and animation
but reports it is **inconsistent across pages, not fully responsive, and parts
break down**, and that the previous developer **hard-coded instead of using a
design system**. The POC was aimed squarely at those four complaints.

### Files Changed

Created — `src/content/home.ts`; `src/lib/utils/cn.ts`;
`src/lib/motion/{tokens,gsap,Reveal,TextReveal}`;
`src/components/layout/{Container,Navigation,Footer}`;
`src/components/ui/{Button,Eyebrow,SectionHeading,Marquee}`;
`src/components/sections/{Hero,EditorialSection,ProcessSection,ProcessTimeline,CTASection}`;
`src/components/visuals/LayerStack`; `docs/poc/POC_REVIEW.md`;
`docs/poc/CLIENT_POC_SUMMARY.md`; `.claude/launch.json`

Modified — `src/app/{globals.css,layout.tsx,page.tsx}`; `package.json`;
`pnpm-lock.yaml`; project memory files

### Validation Performed

- `pnpm format:check` — PASS
- `pnpm lint` — PASS (zero warnings)
- `pnpm typecheck` — PASS
- `pnpm build` — PASS (static prerender)
- Responsive at 320 / 375 / 768 / 1440 — zero horizontal overflow, measured
- Contrast — all 23 text/background pairs pass WCAG AA, minimum 4.89:1
- Anchors — all 15 in-page links resolve, zero broken
- Mobile sheet — focus moves in, Escape closes, focus returns, scroll locks
- Structure — one `h1`, no skipped heading levels, `lang` set

### Defects found and fixed during the build

1. `hidden` + `inline-flex` both being display utilities meant the desktop CTA
   stayed visible at 375px; stylesheet order, not class order, decides.
2. Mobile sheet painted over its own close button (z-index).
3. ScrollTrigger cached positions before fonts loaded, stranding sections
   invisible.
4. If the frame loop never runs, GSAP "from" states hide content permanently —
   added a watchdog that falls back to plain rendering.
5. Paper-on-orange was 2.9:1 — split the accent into three roles.
6. Layer-stack planes collapsed into one (translateZ ran along each plane's
   own rotated axis).
7. Nav pointed at anchors that did not exist.

### Evidence

`docs/poc/POC_REVIEW.md` — full review, including limitations.

### Decisions Made

D-011 exercised (GSAP installed, confined to `src/lib/motion/`). No new
decisions raised.

### Risks Identified

- **Motion never visually confirmed.** The verification browser delivered zero
  `requestAnimationFrame` callbacks while reporting `visibilityState:
"visible"`, so animation playback could not be watched. Validated by
  construction and DOM state only. Must be checked in a real browser before
  the client sees it.
- R-008 stands: this run's review is not independent.

### Next Action

**CLIENT REVIEW / POC FEEDBACK.** Not to be marked approved by any agent.

---

## P-006 — Phase 2: POC Quality Rework

**Date:** 2026-09-01
**Agent:** CLAUDE CODE (under D-009)
**Phase:** PHASE 2 — PROOF OF CONCEPT

### Summary

The human owner reviewed the first POC in a browser and rejected it: not
enough motion, depth, media or interaction — "a fairly standard static
marketing page". Reworked against a wider reference audit, then reset the
type system after the owner supplied screenshots of the treatment he wanted.

### Reference audit

Audited `madewithgsap.com`, `bhrm-studios.vercel.app`, `bhmrstudios.com`,
`uplink.itsoffbrand.com`, `trionn.com`, `iventions.com`, `minhpham.design`.
`storytelling.plank.com` was unreachable (navigation denied) and was skipped.

Convergent findings the first POC missed: 7–29 viewports of scroll (it had
5.6), 12–21 pinned elements (it had none), clip-path masks rather than
opacity fades as the reveal verb (Iventions 292, Minh Pham 89, Uplink 63),
and a mono face for labels. Warm off-white was validated — Iventions runs
`#f3efeb` against our `#f4f1ea`.

### Type system reset

The owner supplied two screenshots and said the existing styling was wrong.
The direction he pointed at is his own marketing site: heavy uppercase
grotesk with individual phrases picked out in orange **inside** the sentence.
Replaced the serif-led system with Archivo 900 caps for display, DM Serif
Display retained only for emphasis, Instrument Sans for reading, JetBrains
Mono for labels.

### Media

Four original plates generated from scratch via `scripts/generate-media.py` —
Swiss-editorial halftone gradients, crisp discs and concentric arcs in the
BHMR palette. No stock, nothing scraped, nothing copied. 548KB source, served
through `next/image`.

### Defects found and fixed during the rework

1. `hidden` + `inline-flex` collision left the desktop CTA visible at 375px.
2. Magnetic wrapper forced `w-full` past the `sm` breakpoint, stacking the
   hero buttons on desktop.
3. Hero plate climbed over the last headline line.
4. Rotated gradients in the media generator left black corner artifacts.
5. Layer-stack planes collapsed into one (translateZ ran along each plane's
   own rotated axis) — component since replaced.
6. Footer links were 16px tall and the logo 32px; raised to 44px.

### Validation Performed

- `pnpm format:check`, `lint`, `typecheck`, `build` — all PASS
- Breakpoints 360/390/480/768/1024/1280/1440 — zero horizontal overflow,
  zero stranded-invisible elements, zero broken anchors, no heading skips
- Scroll depth 8.7–12.1 viewports before pins
- All four plates confirmed carrying real pixel data by canvas sampling
- Horizontal pin layout verified by forcing `data-horizontal`: 7 panels,
  1993px travel, clean column fallback

### Risks Identified

**Animation playback remains unverified.** The verification browser delivers
zero `requestAnimationFrame` callbacks and does not composite some image
layers. Motion is verified structurally only. The hero plate was proven
present three separate ways (topmost element at its centre, loaded at
546×655, 34.5% accent-orange pixels by canvas sample) despite screenshotting
blank. Full manual pass required in Chrome — see POC_REVIEW §9.

### Next Action

**CLIENT REVIEW / POC FEEDBACK**, after a manual animation pass in Chrome.

---

## P-007 — Phase 2: Visual Asset Ownership Pass

**Date:** 2026-09-01
**Agent:** CLAUDE CODE (under D-009)
**Phase:** PHASE 2 — PROOF OF CONCEPT

### Summary

The owner granted explicit creative authority to source and create visual
assets rather than waiting for BHMR to supply production imagery, and asked
for a substantially more ambitious visual result.

### What changed

1. **Photography pass, then reversed.** Sourced six Unsplash architectural and
   craft photographs and duotoned them into the BHMR palette. The owner
   reviewed and rejected the direction — grey concrete read austere, not
   appealing. Removed; `scripts/fetch-photography.py` deleted.
2. **Eight original artifacts** generated instead
   (`scripts/generate-media.py`): aperture, strata, prism, node, orbit,
   statement, process, cta. One shared vocabulary — warm paper, warm ink,
   BHMR orange, concentric apertures, halftone ramps, layered strata.
   ~800 KB total, no licensing exposure, regenerable from palette constants.
3. **New `MediaBand` section** — a triptych at three parallax rates and
   staggered vertical offsets, so the relationship between the frames changes
   as the reader scrolls.
4. **New `MediaFrame` primitive** — every image enters the page the same way
   (mask reveal, parallax, index chip, mono caption).
5. **New `FitText` primitive** — see defects below.
6. Statement section now runs **type over full-bleed media** with the bed
   scaling through the pinned hold.

### Reference-rule note

The owner's message contained three lines that read "DO copy… Do hotlink… Do
scrape…" from the reference sites. Read as dropped negations: the section is
headed IMPORTANT REFERENCE RULE, closes with "create an original BHMR
implementation", and every prior instruction said the opposite. Nothing was
copied, hotlinked or scraped from any reference site. The owner confirmed the
corrected reading in the following message.

### Defects found and fixed

1. **Horizontal overflow regression.** The hero's `calc(50% - 50vw)` bleed
   overshot by the scrollbar width (`vw` includes it, `clientWidth` does not),
   putting a scrollbar on the document. Replaced with a gutter-based bleed.
2. **Footer wordmark clipped** — reported by the owner with a screenshot. A
   `22vw` size cannot fit a 12-character line at every viewport. Replaced with
   `FitText`, which measures the natural width and solves the size.
3. **`FitText` probe leak.** When the solved size equalled the current state
   React skipped the re-render, leaving the measurement probe size painted on
   the element. The probe style is now restored before `setState`.
4. **Lazy loading never fires in the verification browser.**
   `IntersectionObserver` does not run here any more than `rAF` does, so
   below-fold images never loaded. Full-bleed section beds are now `eager` —
   a section rendering as flat colour because a lazy load did not fire is a
   worse failure than the bytes it saves.

### Validation Performed

- `pnpm format:check`, `lint`, `typecheck`, `build` — all PASS
- Breakpoints 360 / 390 / 480 / 768 / 1024 / 1280 / 1440 — zero horizontal
  overflow, zero stranded-invisible elements
- All eight artifacts confirmed loaded with real pixel contrast (62–203) by
  canvas sampling
- Wordmark fit confirmed at both ends: 390px → 41.08px, 1440px → 100px,
  `scrollWidth === parentWidth` at both
- Scroll depth 9.0 viewports desktop, 12.5 mobile, before pins

### Risks Identified

Unchanged and still the headline risk: **animation playback has never been
watched.** This environment fires no `requestAnimationFrame`, no
`IntersectionObserver`, and does not composite some image layers. All motion
is verified structurally only.

### Next Action

Manual pass in Chrome, then **CLIENT REVIEW / POC FEEDBACK**.

---

## P-008 — Merge: Adopt Emergent's POC Design as Baseline

**Date:** 2026-09-01
**Agent:** CLAUDE CODE
**Phase:** PHASE 2 — PROOF OF CONCEPT

### Summary

A second AI platform ("Emergent") was independently pointed at this same
GitHub repository and produced its own POC implementation, pushed directly to
`origin/main` as commit `b814c49` while this session was mid-turn. The human
owner reviewed both directions and decided: **Emergent's visual/UI/animation
work is adopted as the new baseline**, while this repo's governance and
project-memory files remain authoritative.

### What happened, in order

1. An earlier commit in this session (`6ed726e`, generated-artifact media) was
   reverted by an external process (`646db74`) with push access to this same
   repo — not by this session.
2. Emergent branched from `646db74` and pushed `b814c49` (34 files: full POC
   rebuild — white/black theme, custom cursor, floating shapes, pinned
   horizontal process track, Playwright test evidence).
3. This session restored its own reverted work (`77a12c7`) before the owner's
   decision was known, then received explicit direction to adopt Emergent's
   design instead.
4. Resolved via a real three-way merge (`git merge --no-commit --no-ff
origin/main`), NOT a force-push or history reset — `origin/main` is a true
   parent of the resulting commit.

### Conflict resolution rule applied

- **POC UI/component/content files** (Hero, Footer, CTA, Editorial, Process,
  Statement, page.tsx, content/home.ts) → **theirs** (Emergent).
- **Governance and project-memory files** (AGENTS.md, CLAUDE.md, `.agent/`,
  `.claude/`, `docs/product/PRD.md`, `docs/architecture/`, `docs/project/
{STATUS,DECISIONS,RISKS,HANDOFF,PROMPT_LOG}.md`, `docs/poc/POC_REVIEW.md`,
  `.env.example`, `pnpm-workspace.yaml`) → **ours** (canonical). These were
  untouched by Emergent's commit, so this required no manual resolution —
  git's three-way merge preserved them automatically since only one side had
  changed them.
- **Platform-internal artifacts excluded entirely**: `.emergent/` (sandbox
  cron scripts, job-id metadata) and `.gitconfig` (an Emergent-agent git
  identity file). Neither belongs in a shared client codebase; removed from
  the merge rather than silently carried forward.
- **Kept as genuine evidence**: `.screenshots/*.png` and
  `test_reports/iteration_1.json` — Emergent's own real Playwright
  verification (console-error checks, computed-style assertions on GSAP
  state, mobile 390 checks, `prefers-reduced-motion` checks). This is
  stronger animation verification than this session could ever produce (see
  R-011).
- **Orphaned files from the reverted direction removed** (dead code the
  adopted `page.tsx` no longer references): `MediaBand.tsx`, `MediaFrame.tsx`,
  `FitText.tsx`, `Eyebrow.tsx`, `LayerStack.tsx`, and 7 of 8 generated
  `art-*.webp` plates (`art-orbit.webp` is kept — `ProcessTimeline.tsx`'s
  auto-merge still references it and it renders correctly).

### Validation Performed

- `pnpm install` — regenerated `pnpm-lock.yaml` (Emergent's commit had deleted
  it; `packageManager: pnpm@11.25.0` in `package.json` was unchanged and
  already correct on both sides)
- `pnpm format` / `format:check` / `lint` / `typecheck` / `build` — all PASS
  after resolution
- No leftover conflict markers anywhere in the tree (grepped)
- No `process.env` references in `src/` — this POC requires no environment
  variables
- Loaded in-browser: zero horizontal overflow, zero console errors, 14.2–14.3
  viewports of scroll at both 1440 and 390

### Known issues carried forward (not fixed — out of scope for this merge)

From Emergent's own `test_reports/iteration_1.json`:

1. Hero's italic "worse product" line is clipped by its own line-mask
   (12px cut on descenders) — `.bhmr-line-mask` padding insufficient for the
   DM Serif italic line-height.
2. `AddressSection`'s `Parallax` wrapper lacks `position: relative`, so
   `next/image fill` warns about an unpositioned parent.

Found in this session's own verification:

3. **New, not in their report** — at 390px, the hero's decorative orange
   accent shape overlaps and obscures the final headline line ("AND A BETTER
   SITE"). Same class of issue as their reported Beliefs/Statement mobile
   overlap, different location. **Should be fixed before client review** —
   readability is broken, not just imperfect.

### Risks Identified

- **R-011 (new):** Two AI platforms had concurrent, uncoordinated write
  access to the same repository and pushed conflicting history without
  either being aware of the other. This already caused one silent revert of
  real work. Recommend: going forward, only one tool/session should hold
  push access to `bhrm-studios/main` at a time.
- R-008 (reviewer independence) stands, partially offset by Emergent's own
  Playwright evidence — that is real automated verification this session
  cannot produce, but it is not independent human or third-agent review.

### Next Action

Deploy to Vercel (this same task), then fix the three known mobile/motion
issues above before the POC goes to the client.
