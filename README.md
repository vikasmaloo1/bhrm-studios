# BHMR Studios — Website Redesign

**Phase:** PHASE 0 — PROJECT BOOTSTRAP
**Status:** PHASE 0 COMPLETE — AWAITING PHASE 1 APPROVAL

---

## What This Is

A clean, production-quality website redesign for BHMR Studios. Built with Next.js, TypeScript, and Tailwind CSS, with a milestone-based, AI-assisted development workflow.

**This repository is in active setup. The website has not been built yet.**

---

## Tech Stack

| Technology   | Version    | Purpose                |
| ------------ | ---------- | ---------------------- |
| Next.js      | 16         | Framework (App Router) |
| React        | 19         | UI library             |
| TypeScript   | 5 (strict) | Type safety            |
| Tailwind CSS | 4          | Styling                |
| pnpm         | 11         | Package manager        |
| Node.js      | 24 LTS     | Runtime                |

---

## Local Development

### Prerequisites

- Node.js v24 ([nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) recommended)
- pnpm v11+

### Setup

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local
# Fill in your local values in .env.local (never commit this file)

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Quality Commands

```bash
# Format all files
pnpm format

# Check formatting (CI)
pnpm format:check

# Lint
pnpm lint

# TypeScript type check
pnpm typecheck

# Production build
pnpm build

# Run all checks (format + lint + typecheck + build)
pnpm check
```

All checks must pass before committing or opening a PR.

---

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in the required values (see `.env.example` for the full list)
3. **Never commit `.env.local`** — it is gitignored

See `docs/architecture/ARCHITECTURE.md` for environment strategy details.

---

## Repository Structure

```
bhmr-studios/
├── .agent/rules/       — AI agent behavioral rules
├── .claude/rules/      — Claude Code overlay rules
├── .github/workflows/  — CI/CD configuration
├── docs/               — Project and product documentation
│   ├── product/        — PRD
│   ├── architecture/   — Architecture and folder structure docs
│   ├── design/         — Design system planning
│   └── project/        — Status, decisions, risks, handoff, prompt log
├── prompts/            — Reusable AI task prompt templates
├── public/             — Static assets
├── src/                — Application source code
│   ├── app/            — Next.js App Router pages
│   ├── components/     — Reusable React components
│   ├── content/        — Static copy and content
│   ├── lib/            — Utilities, hooks, types, constants
│   └── styles/         — Global styles
└── tests/              — Test suites (added in Phase 2+)
```

See `docs/architecture/FOLDER_STRUCTURE.md` for full details.

---

## AI Workflow

This project uses a structured, multi-agent AI development workflow.

| Agent       | Role                                                         |
| ----------- | ------------------------------------------------------------ |
| CODEX       | Primary repository owner, architecture, engineering, handoff |
| CLAUDE CODE | Independent reviewer (UX, accessibility, security, copy)     |
| ANTIGRAVITY | Reference auditing, later browser QA                         |
| HUMAN       | All approvals, credentials, production access                |

**Governance:** See `AGENTS.md` for the full AI contract.
**Rules:** See `.agent/rules/` for per-agent rule files.
**No AI agent may approve its own output.**

---

## Project Memory

All project state is tracked in `docs/project/`:

| File            | Purpose                             |
| --------------- | ----------------------------------- |
| `STATUS.md`     | Current phase and milestone tracker |
| `DECISIONS.md`  | Record of all material decisions    |
| `RISKS.md`      | Risk register                       |
| `HANDOFF.md`    | Handover checklist and format       |
| `PROMPT_LOG.md` | Log of all material AI tasks        |

---

## Current Scope

**PHASE 0 — PROJECT BOOTSTRAP**

Only repository setup and AI environment preparation. No website pages, UI, or integrations have been built.

**Planned pages:**
Homepage · About · Services · Pricing · Work With Us · Careers · Director of Business Development · Privacy Policy · Terms of Service

---

## Important URLs

| Resource       | URL                                         |
| -------------- | ------------------------------------------- |
| Current site   | https://bhrm-studios.vercel.app             |
| Reference site | https://madewithgsap.com/                   |
| GitHub         | https://github.com/vikasmaloo1/bhrm-studios |
| Figma          | [PENDING — not yet created]                 |

---

## Contributing

This project follows a milestone-based, agent-governed workflow.

Before contributing:

1. Read `AGENTS.md`
2. Read the relevant `.agent/rules/` files
3. Check `docs/project/STATUS.md` for current phase
4. Open a branch: `feat/your-feature-name`
5. Run `pnpm check` before committing
6. Follow the PR template in `.github/pull_request_template.md`
