# Decisions Log — BHMR Studios

---

> This file is append-only. Add new decisions at the top. Never delete or modify past decisions.
> Decisions require human owner confirmation to be considered final.

> **Recorded exception to append-only (2026-09-01):** The `**Decision:**` lines of **D-007** and **D-008** were repaired in place under D-009 authorization. They contained literal control characters — a `0x08` backspace and stray CR/LF — that had eaten the first letter of several words (`reactCompiler`→`eactCompiler`, `next.config.ts`→`ext.config.ts`, `babel-plugin`→`abel-plugin`, `review-checklist`→`eview-checklist`). Root cause: the entries were written through a PowerShell double-quoted string, where `` `r ``, `` `n `` and `` `b `` are escape sequences. **Only the corrupted characters were restored — no decision, rationale, status, or attribution was altered.** Future entries must be written with single-quoted here-strings (`@'…'@`) to avoid backtick interpretation.

---

## D-014 — Page-Copy Documents Unavailable: PRD Evidence-Status Policy

**Date:** 2026-09-01
**Decision:** The nine approved page-copy documents referenced by the proposal ("supplied page copy covers nine core routes/pages") are **not present in the local workspace** and were not accessible to this run. The PRD will therefore label every requirement with an explicit evidence status — `CONFIRMED` (traceable to the approved proposal or execution plan), `INFERRED` (observed on the current live site, needs client confirmation), or `MISSING` (no evidence available) — rather than presenting a uniformly authoritative document.
**Reason:** AGENTS.md RULE 5 forbids inventing requirements. Producing a PRD that reads as complete when a primary source was never read would be a governance failure disguised as a deliverable. Marking evidence status keeps the document honest and makes the remaining input gap visible to the client.
**Impact:** The PRD is a **Discovery baseline**, not an approved scope lock. Sections 8 (page purposes) and parts of 9–11 cannot be finalised until the copy documents are supplied via the shared Google Drive.
**Status:** SUPERSEDED (2026-09-01) — all nine page-copy documents were supplied to `docs/references/` later in the same run. The evidence-status policy remains good practice for the eventual PRD rewrite, but the input gap that motivated it is closed. See R-009.
**Decided by:** CLAUDE CODE (acting under D-009 authorization)
**Human confirmation:** N/A — resolved by the owner supplying the documents

---

## D-013 — POC Is Not a Line Item in the Approved Quotation

**Date:** 2026-09-01
**Decision:** The coded POC built in this run is recorded as **commercially unclassified**. The approved proposal (`BHMR_Studios_Website_Proposal_Quotation_Final`, 30 Aug 2026, ₹52,000) contains six phases — Discovery, Figma + Design System, Prototype & Interaction, Engineering, Forms + Integrations + QA, Deployment + DNS + Handover. **A coded POC is not one of them.**
**Reason:** The execution plan and the current task both direct that a POC be built before Figma, and the client has agreed a POC would be useful. But absorbing unquoted effort silently would be exactly the kind of undocumented scope drift AGENTS.md RULE 4 exists to prevent — in this case working against the delivering party rather than the client.
**Options for the human owner:** (a) treat the POC as goodwill/pre-sales effort outside the fee; (b) treat it as a partial draw-down of Phase 3 "Prototype & Interaction Direction" (₹3,000), which it functionally substitutes for; (c) agree a separate small fee.
**Status:** OPEN — requires a human commercial decision. Does not block the POC itself.
**Decided by:** Flagged by CLAUDE CODE; decision reserved to Vikas Maloo
**Human confirmation:** PENDING

---

## D-012 — Phase Numbering: Three Conflicting Schemes Reconciled

**Date:** 2026-09-01
**Decision:** Three source documents number the project phases differently. The repository's own scheme (`AGENTS.md` / `STATUS.md`) is adopted as canonical for all repository documentation, with this mapping recorded so cross-references to the client-facing proposal remain traceable:

| Repository (canonical) | Approved Proposal                         | AI Execution Plan            |
| ---------------------- | ----------------------------------------- | ---------------------------- |
| Phase 0 — Bootstrap    | _(not billed)_                            | 0. Bootstrap                 |
| Phase 1 — Discovery    | Phase 1 — Discovery                       | 1. Discovery + 2. Scope lock |
| Phase 2 — POC          | _(no equivalent)_                         | 3. POC                       |
| Phase 3 — Design       | Phase 2 — Figma + Phase 3 — Prototype     | 4. Figma                     |
| Phase 4 — Engineering  | Phase 4 — Engineering                     | 5. Engineering               |
| Phase 5 — QA & Handoff | Phase 5 — Forms/QA + Phase 6 — Deployment | 6–8                          |

**Reason:** AGENTS.md Section C requires that conflicting authoritative sources be recorded rather than silently resolved. Without this table, "Phase 2" means Figma to the client and POC to the repository — a guaranteed miscommunication at an approval gate.
**Impact:** Client-facing documents must use proposal numbering; repository documents use repository numbering. Never use a bare phase number in cross-party communication.
**Status:** ACCEPTED
**Decided by:** CLAUDE CODE (acting under D-009 authorization)
**Human confirmation:** PENDING

---

## D-011 — GSAP Approved for POC Motion

**Date:** 2026-09-01
**Decision:** Install `gsap` as a production dependency for the coded POC.
**Reason:** Direct human authorization in the current task packet ("Use GSAP only where it materially improves the experience"). This supersedes, for the POC only, the earlier gate in `docs/design/DESIGN_SYSTEM.md` §13 and `.agent/rules/frontend-architecture.md` §10 that deferred animation-library installation to Phase 3+. The POC's stated purpose is to prove motion quality, which cannot be demonstrated without it.
**Scope of the exception:** GSAP is confined to `src/lib/motion/`. Components consume motion through wrapper utilities, never by importing GSAP directly. All motion degrades to a static, fully readable layout under `prefers-reduced-motion`.
**Dependencies added:** `gsap` (1 package, no transitive runtime dependencies).
**Status:** ACCEPTED — scoped exception, POC only
**Decided by:** Human owner (Vikas Maloo), current task packet
**Human confirmation:** CONFIRMED

---

## D-010 — GitHub Remote Spelling Discrepancy (`bhrm` vs `bhmr`)

**Date:** 2026-09-01
**Decision:** The configured Git remote is `https://github.com/vikasmaloo1/bhrm-studios.git` — note **`bhrm`**, a transposition of the brand name **BHMR**. This is recorded, **not changed**.
**Reason:** The current task packet explicitly instructs: "Do not silently change the remote. If the spelling/domain is questionable, record it as a human decision item rather than guessing." The same transposition already exists in the live site URL (`bhrm-studios.vercel.app`), so it may be deliberate or a pre-existing typo carried forward. Either way, renaming a remote is an outward-facing action requiring human authorization.
**Observed state:** remote reachable, `main` tracking `origin/main`, push access working.
**Status:** OPEN — human decision required
**Decided by:** Flagged by CLAUDE CODE; decision reserved to Vikas Maloo
**Human confirmation:** PENDING — confirm whether `bhrm` is intended, in both the GitHub repo name and the production domain

---

## D-009 — Human Authorization to Close Phase 0 and Execute Through POC

**Date:** 2026-09-01
**Decision:** The human project owner, **Vikas Maloo**, granted Claude Code temporary **execution ownership** of the repository, spanning Phase 0 closure → Phase 1 Discovery → Scope & Architecture → coded POC → POC review package.
**Authorization source:** Direct written instruction in the current task packet: _"Let Claude do the updates through the POC and close the current phase."_
**Scope of authorization — Claude MAY:**

- Correct Phase 0 / Phase 1 governance documentation
- Update project memory (STATUS, DECISIONS, RISKS, HANDOFF, PROMPT_LOG)
- Finalise Discovery artifacts and the scope baseline
- Create the proposed architecture
- Implement the coded POC
- Commit and push to `origin/main`

**Scope of authorization — Claude MAY NOT:**

- Approve any client milestone (AGENTS.md Section H is unchanged)
- Start Figma production — **remains gated**
- Build the remaining eight pages or begin production engineering
- Implement HubSpot or Google Sheets integrations
- Deploy to production, or touch DNS or credentials

**Note on role change:** Claude Code's standing role under `CLAUDE.md` is independent reviewer, normally read-only. This authorization is a **temporary, task-scoped exception**, not a permanent change to the ownership model in AGENTS.md Section D. Codex remains the governance owner of record; Claude's independence as a reviewer is compromised for anything it authored in this run, which is itself a recorded risk (see R-008).
**Status:** ACCEPTED — ACTIVE for this task only
**Decided by:** Human owner (Vikas Maloo)
**Human confirmation:** CONFIRMED — this decision _is_ the authorization

---

## D-008 — .claude/rules/ Content Strategy

**Date:** 2026-09-01
**Decision:** Populate `.claude/rules/` with `review-checklist.md` — a concrete, per-category inspection checklist for Claude to use during phase reviews.
**Reason:** Claude Code review identified that .claude/rules/ was empty while AGENTS.md listed it as containing active Claude behavior rules (Option A of the reconciliation choice). A checklist that translates CLAUDE.md responsibilities into actionable inspection points was the simplest consistent solution. It does not duplicate AGENTS.md governance — it operationalises it.
**Status:** ACCEPTED
**Decided by:** CODEX (per Claude Code review finding #5)
**Human confirmation:** PENDING

---

## D-007 — React Compiler Enabled (Baseline Infrastructure)

**Date:** 2026-09-01
**Decision:** `reactCompiler: true` in `next.config.ts` and `babel-plugin-react-compiler` in devDependencies are intentionally retained as baseline infrastructure.
**Reason:** These were scaffolded by create-next-app as part of the Next.js 16 + React 19 default template. The React Compiler automatically optimises component re-renders by inferring memoisation — functionally equivalent to manually wrapping with useMemo / useCallback, but without the maintenance burden. Enabling it at the scaffold level is correct for a React 19 project. It is a build-time optimisation with no runtime API surface and no bearing on the current phase's scope boundary.
**What it does:** Compiles React components to automatically apply memoisation where safe, improving runtime performance without code changes.
**Status:** ACCEPTED — retain as baseline. Review if any component behaves unexpectedly during Phase 4 engineering.
**Decided by:** CODEX (per Claude Code review finding #6)
**Human confirmation:** PENDING

---

## D-001 — Repository Location

**Date:** 2026-09-01
**Decision:** Repository created at C:\Users\Vikas\Documents\bhmr\bhmr-studios
**Reason:** The C:\Users\Vikas\Documents\bhmr directory existed and was empty. On Windows, filesystem paths are case-insensitive so this is equivalent to the specified %USERPROFILE%\Documents\BHMR\bhmr-studios.
**Status:** ACCEPTED
**Decided by:** CODEX (setup agent)
**Human confirmation:** PENDING

---

## D-002 — Package Manager

**Date:** 2026-09-01
**Decision:** pnpm v11.25.0 is the sole package manager. No npm or yarn.
**Reason:** Required by project specification. Single lockfile policy.
**Status:** ACCEPTED
**Decided by:** Project specification
**Human confirmation:** CONFIRMED (in setup instructions)

---

## D-003 — Technology Stack

**Date:** 2026-09-01
**Decision:** Next.js 16, App Router, TypeScript (strict), Tailwind CSS v4, pnpm
**Reason:** Required by project specification.
**Status:** ACCEPTED
**Decided by:** Project specification
**Human confirmation:** CONFIRMED (in setup instructions)

---

## D-004 — Node.js Version

**Date:** 2026-09-01
**Decision:** Node.js v24 (current Active LTS). Recorded in .nvmrc as 24.
**Reason:** Specification said to use current Active LTS — do not hard-code old documentation versions.
**Status:** ACCEPTED
**Decided by:** CODEX (per specification rule)
**Human confirmation:** PENDING

---

## D-005 — No CMS in Current Scope

**Date:** 2026-09-01
**Decision:** No CMS is included in Phase 0 scope. Content managed in code.
**Reason:** Not in current approved scope. PRD marks this as an exclusion with a pending note.
**Status:** ACCEPTED
**Decided by:** Project specification
**Human confirmation:** PENDING — confirm during PRD review

---

## D-006 — Deployment Target (Proposed)

**Date:** 2026-09-01
**Decision:** Vercel is the proposed deployment target.
**Reason:** Standard choice for Next.js; consistent with current site (bhrm-studios.vercel.app).
**Status:** PROPOSED — needs human confirmation
**Decided by:** CODEX
**Human confirmation:** PENDING

---
