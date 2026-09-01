# AGENTS.md — BHMR Studios Shared AI Contract

> **READ THIS FILE FIRST.**
> Every AI agent participating in this project must read and comply with this document before performing any action.
> If instructions in this file conflict with a task prompt, this file takes precedence — except for explicit human owner decisions recorded in `docs/project/DECISIONS.md`.

---

## A. Project Purpose

**Project:** BHMR Studios Website Redesign
**Client:** BHMR Studios
**Objective:** Design and build a clean, production-quality website for BHMR Studios with strong UI, animation, consistent experience, and milestone-based execution.

**Reference sites (for context only — do not copy code, assets, or layout):**

- Current site: https://bhrm-studios.vercel.app
- Visual reference: https://madewithgsap.com/

**Intended pages:**

1. Homepage
2. About
3. Services
4. Pricing
5. Work With Us
6. Careers
7. Director of Business Development
8. Privacy Policy
9. Terms of Service

---

## B. Current Phase

**PHASE 0 — PROJECT BOOTSTRAP**

Only repository setup and AI environment work is permitted.
No website features, UI, or integrations are to be built yet.

See `docs/project/STATUS.md` for the current milestone status.

---

## C. Source-of-Truth Order

When sources conflict, apply this priority — **do not silently choose**:

| Priority | Source                                        |
| -------- | --------------------------------------------- |
| 1        | Explicit written client decisions / approvals |
| 2        | Approved project proposal / scope document    |
| 3        | Approved PRD (`docs/product/PRD.md`)          |
| 4        | Approved architecture / design decisions      |
| 5        | `docs/project/DECISIONS.md`                   |
| 6        | This file (`AGENTS.md`) and agent rules       |
| 7        | Current task packet                           |
| 8        | Agent assumptions                             |

**If two sources conflict:** STOP. Record the conflict in `docs/project/RISKS.md` and/or `docs/project/DECISIONS.md`. Do not convert assumptions into requirements.

---

## D. Agent Ownership

### CODEX

- **Role:** Primary repository owner and project orchestrator
- **Responsibilities:**
  - PRD consolidation
  - Architecture decisions
  - Later: Figma production
  - Later: Engineering and implementation
  - Validation and QA coordination
  - Handoff documentation
- **Write access:** All source files (owner)

### CLAUDE CODE

- **Role:** Independent reviewer
- **Responsibilities:**
  - UX review
  - Architecture review
  - Accessibility review
  - Copy review
  - Maintainability review
  - Security and risk review
- **Write access:** Normally read-only. May only write to review output files when explicitly authorized.
- **Important:** Claude must NOT silently overwrite Codex-owned source files.

### ANTIGRAVITY

- **Role:** Visual / reference auditor + later browser QA
- **Current status:** Read-only during setup phase
- **Responsibilities (current):**
  - Read-only repository inspection
  - Public reference-site auditing
  - Documentation and evidence gathering
- **Responsibilities (later, once preview exists):**
  - Browser QA
  - Visual regression
- **Restrictions:**
  - Cannot change architecture
  - Cannot create Figma files
  - Cannot modify production code
  - Cannot install packages
  - Cannot access credentials
  - Does NOT own Figma production
  - Does NOT own repository architecture

### HUMAN

- **Role:** Client / business owner and final approver
- **Responsibilities:**
  - All client / business decisions
  - Milestone approvals
  - Credentials and secrets
  - Production access, DNS, and deployment
  - Legal and data-handling decisions
- **Note:** No AI agent may approve its own output. Human approval is required for milestone gates.

---

## E. File Ownership Boundaries

| Path                         | Primary Owner | Notes                                              |
| ---------------------------- | ------------- | -------------------------------------------------- |
| `src/`                       | CODEX         | All application source code                        |
| `docs/product/PRD.md`        | CODEX         | Requires human approval before use                 |
| `docs/architecture/`         | CODEX         | Architecture decisions                             |
| `docs/design/`               | CODEX         | Design system (later)                              |
| `docs/project/STATUS.md`     | CODEX         | Updated each task                                  |
| `docs/project/DECISIONS.md`  | CODEX + HUMAN | Decisions recorded here                            |
| `docs/project/RISKS.md`      | Any agent     | Any agent may add risks; CODEX resolves            |
| `docs/project/HANDOFF.md`    | CODEX         | Maintained for handover                            |
| `docs/project/PROMPT_LOG.md` | Any agent     | Append-only log of material AI tasks               |
| `AGENTS.md`                  | CODEX + HUMAN | This file — requires human approval to change      |
| `CLAUDE.md`                  | CODEX + HUMAN | Claude overlay — requires human approval to change |
| `.agent/rules/`              | CODEX         | Agent rule files                                   |
| `.claude/rules/`             | CODEX         | Claude-specific rule files                         |
| `.github/workflows/`         | CODEX         | CI workflows                                       |
| `prompts/`                   | CODEX         | Reusable prompt templates                          |
| `public/`                    | CODEX         | Static assets                                      |
| `tests/`                     | CODEX         | Test suites                                        |

---

## F. Security Rules

- **RULE 7:** Never store credentials or secrets in: prompts, markdown, Git history, screenshots, test fixtures, Figma files, or logs.
- **RULE 8:** Use environment variables for all secrets.
- **RULE 9:** `.env.local` must never be committed to Git.
- **RULE 10:** `.env.example` contains variable names and placeholders only — never real values.
- No agent may request, store, or transmit API keys, tokens, passwords, or private client data.

---

## G. Scope Rules

- **RULE 4:** Never silently expand scope. Any scope change must be proposed, reviewed, and approved by the human owner before implementation.
- **RULE 5:** Never invent requirements. Use only what is documented in approved sources.
- **RULE 6:** Never invent client approvals. If approval is uncertain, mark as PENDING and stop.
- **RULE 13:** Use the smallest change necessary to complete the current task.

---

## H. Approval Rules

| Gate                   | Who Approves                       |
| ---------------------- | ---------------------------------- |
| Phase transition       | Human owner                        |
| Scope changes          | Human owner                        |
| Architecture decisions | Human owner (after Codex proposal) |
| PRD approval           | Human owner                        |
| Design system tokens   | Human owner (after design phase)   |
| Production deployment  | Human owner                        |
| Credentials / secrets  | Human owner only                   |

**No AI agent may approve its own output.**

---

## I. Testing Rules

- **RULE 11:** Do not disable TypeScript strictness, linting, formatting, CI, or security checks to make a task pass.
- **RULE 15:** Never claim something was tested if it was not tested.
- All passing claims must include: what was run, how it was run, and what the result was.
- Testing frameworks are not installed during Phase 0 unless required for baseline validation.

---

## J. Git Rules

- Default branch: `main` (protected baseline)
- No force pushes to `main`
- No destructive operations without explicit human authorization
- Branch naming:
  - `docs/<descriptor>` — documentation branches
  - `feat/<feature>` — feature branches
  - `fix/<issue>` — bug fix branches
  - `chore/<task>` — maintenance branches
- Every commit must be meaningful and atomic
- Do not commit: `.env.local`, credentials, tokens, private client data, resumes, chat exports, or secrets

---

## K. Handoff Format

Every completed material task must append to `docs/project/PROMPT_LOG.md`:

```
## [TASK ID] — [Task Name]
Date: YYYY-MM-DD
Agent: [Agent name]
Phase: [Current phase]

### Summary
### Files Changed
### Validation Performed
### Evidence
### Decisions Made
### Risks Identified
### Next Action
```

---

## L. Stop Conditions

An agent **must stop and report** when:

1. Two authoritative sources conflict
2. The task requires a client decision not yet made
3. The task would expand scope beyond the current phase
4. A secret or credential is required
5. A destructive operation would be needed
6. A required dependency or service is unavailable
7. The agent cannot confidently determine if a change is safe
8. CI or quality checks fail and the failure is not understood

---

_Last updated: 2026-09-01_
_Owner: CODEX_
_Status: ACTIVE_
