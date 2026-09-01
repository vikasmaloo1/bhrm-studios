# Folder Structure — BHMR Studios

**STATUS: ACTIVE**
**Last updated: 2026-09-01**

---

This document explains the intended responsibility and ownership of every top-level directory and important subdirectory in the repository.

---

## Root

```
bhmr-studios/
├── .agent/              — AI agent rules and workflows
├── .claude/             — Claude Code specific configuration
├── .github/             — GitHub configuration: CI, PR templates
├── docs/                — Project and product documentation
├── prompts/             — Reusable AI task prompt templates
├── public/              — Static assets served directly
├── src/                 — All application source code
└── tests/               — Test suites (to be populated in Phase 2+)
```

---

## `.agent/`

**Owner:** CODEX
**Purpose:** Agent governance rules and workflow definitions

```
.agent/
├── rules/               — Per-agent behavioral rules
│   ├── reference-audit.md        — Antigravity: what is allowed during audits
│   ├── browser-qa.md             — Antigravity: browser QA rules (not yet active)
│   ├── frontend-architecture.md  — Engineering principles for all agents
│   ├── figma-design.md           — Figma governance (not yet active)
│   └── qa-security.md            — QA and security requirements
└── workflows/           — Future: workflow automation definitions
```

---

## `.claude/`

**Owner:** CODEX + HUMAN
**Purpose:** Claude Code specific overlay rules

```
.claude/
└── rules/               — Claude-specific behavioral rules (supplements AGENTS.md)
```

---

## `.github/`

**Owner:** CODEX
**Purpose:** GitHub repository configuration

```
.github/
├── workflows/
│   └── ci.yml           — CI: format, lint, typecheck, build
└── pull_request_template.md — Standard PR checklist
```

---

## `docs/`

**Owner:** CODEX (content), HUMAN (approval)
**Purpose:** Living project documentation — the single source of truth for product, architecture, design, and project management decisions

```
docs/
├── product/
│   └── PRD.md                   — Product Requirements Document (DRAFT → APPROVED)
│
├── architecture/
│   ├── ARCHITECTURE.md          — Proposed application architecture
│   └── FOLDER_STRUCTURE.md      — This file
│
├── design/
│   └── DESIGN_SYSTEM.md         — Design system planning (PLANNING stage)
│
└── project/
    ├── STATUS.md                — Current project status and milestone tracker
    ├── DECISIONS.md             — Record of all material decisions
    ├── RISKS.md                 — Risk register
    ├── HANDOFF.md               — Format and checklist for project handoff
    └── PROMPT_LOG.md            — Append-only log of material AI tasks
```

---

## `prompts/`

**Owner:** CODEX
**Purpose:** Reusable AI task prompt templates organized by project phase

```
prompts/
├── setup/               — Phase 0: bootstrap prompts
├── discovery/           — Phase 1: discovery and requirements prompts
├── poc/                 — Phase 2: proof-of-concept prompts
├── design/              — Phase 3: design and Figma prompts
├── engineering/         — Phase 4: engineering prompts
└── qa/                  — Phase 5: QA prompts
```

---

## `src/`

**Owner:** CODEX
**Purpose:** All application source code

```
src/
├── app/                 — Next.js App Router pages and API routes
│   ├── layout.tsx       — Root HTML layout
│   ├── page.tsx         — Homepage
│   ├── [route]/         — Page routes (created during engineering phase)
│   └── api/             — API routes (form handlers — future)
│
├── components/          — Reusable React components
│   ├── layout/          — Layout primitives: Header, Footer, Container, Section
│   ├── ui/              — Design system components: Button, Input, Card, etc.
│   └── sections/        — Page section components (hero, services, etc.)
│
├── content/             — Static copy and content data
│   ├── pages/           — Per-page copy (populated when copy is approved)
│   └── shared/          — Navigation, footer links, global constants
│
├── lib/                 — Utilities, hooks, types, constants
│   ├── hooks/           — Shared React hooks
│   ├── utils/           — Pure utility functions
│   ├── types/           — TypeScript type definitions
│   ├── constants/       — Application constants
│   └── motion/          — Animation utilities (future — when approved)
│
└── styles/
    └── globals.css      — Global styles and CSS variables (Tailwind entry point)
```

---

## `tests/`

**Owner:** CODEX
**Purpose:** Test suites (to be populated starting Phase 2)

```
tests/
├── unit/                — Unit tests for utilities and hooks
├── integration/         — Integration tests for API routes
└── e2e/                 — End-to-end tests (Playwright)
```

No test files are expected in Phase 0.

---

## `public/`

**Owner:** CODEX (engineering phase)
**Purpose:** Static files served directly at the root URL

```
public/
├── favicon.ico          — Site favicon (placeholder until design phase)
├── og/                  — Open Graph images (created during design phase)
└── fonts/               — Self-hosted font files (if needed — TBD)
```

---

## Rules

- Do not create subdirectories that are not represented in this document without updating it
- Do not create implementation code in documentation directories
- Do not place documentation in source directories
- Keep the structure flat where possible — nested structure only where it genuinely adds clarity

---

_Owner: CODEX_
_Status: ACTIVE_
