# Architecture Document — BHMR Studios

**STATUS: PROPOSED**
**APPROVAL: PENDING — Human owner sign-off required before this governs engineering**

---

## Application Overview

BHMR Studios is a marketing / portfolio website built with:

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Package Manager:** pnpm
- **Deployment:** Vercel [PROPOSED — to confirm]
- **Node.js:** v24 LTS

The site is primarily a server-rendered static / hybrid application. Most pages are statically generated at build time. Server-side logic (if any) is minimal and limited to form handling via API routes.

---

## Route Structure

All routes live under `src/app/` following the Next.js App Router convention.

```
src/app/
├── layout.tsx              — Root layout (HTML shell, fonts, global styles)
├── page.tsx                — Homepage (/)
├── about/
│   └── page.tsx            — About (/about)
├── services/
│   └── page.tsx            — Services (/services)
├── pricing/
│   └── page.tsx            — Pricing (/pricing)
├── work-with-us/
│   └── page.tsx            — Work With Us (/work-with-us)
├── careers/
│   └── page.tsx            — Careers (/careers)
├── director-of-business-development/
│   └── page.tsx            — Director of BD (/director-of-business-development)
├── privacy-policy/
│   └── page.tsx            — Privacy Policy (/privacy-policy)
├── terms-of-service/
│   └── page.tsx            — Terms of Service (/terms-of-service)
├── api/                    — API routes (form handlers — future)
│   └── (empty during Phase 0)
└── not-found.tsx           — 404 page
```

**[PROPOSED]** Route structure above reflects the approved sitemap. Routes must not be created until the design phase begins.

---

## Component Architecture

Components are organized by responsibility:

```
src/components/
├── layout/         — Site-wide layout primitives (Header, Footer, Container, Section)
├── ui/             — Reusable UI elements (Button, Input, Card, Badge, etc.)
├── sections/       — Page section components (Hero, Services grid, etc.)
└── (page-specific) — Kept inside src/app/[route]/ if truly page-specific
```

**Principles:**

- Compose pages from components
- No duplicated layout logic
- All UI elements are reusable
- See `.agent/rules/frontend-architecture.md` for full principles

---

## Content Architecture

Static content and copy is managed in:

```
src/content/
├── pages/          — Per-page copy and data (once copy is approved)
└── shared/         — Shared content (navigation items, footer links, etc.)
```

No CMS is in scope. Content is managed in code.

**[PENDING DECISION]** If a CMS is added to scope, this architecture will need revision.

---

## Future Form Flow [PROPOSED]

```
User submits form
    ↓
Client-side validation (React Hook Form + Zod)
    ↓
API Route Handler (src/app/api/forms/[form-type]/route.ts)
    ↓
Server-side validation
    ↓
Submit to HubSpot (CRM)    +    Submit to Google Sheets (backup)
    ↓                           ↓
Return success/error response
    ↓
Display success or error state to user
```

**Important:** Forms are NOT implemented during Phase 0. This is a proposed architecture only.

---

## Future Integration Boundaries [PROPOSED]

| Integration   | Layer                                  | Implementation                 |
| ------------- | -------------------------------------- | ------------------------------ |
| HubSpot       | API Route only — never client-side     | Server action or API handler   |
| Google Sheets | API Route only                         | Server action or API handler   |
| Analytics     | Client-side script (approved provider) | Next.js Script component       |
| Email         | Server-side only                       | API handler + SMTP or provider |

**All secrets are server-side only. No integration credentials are exposed to the browser.**

---

## Deployment Concept [PROPOSED]

- **Platform:** Vercel [to confirm]
- **Strategy:** Static generation (SSG) for all marketing pages; API routes for form handling
- **Environments:**
  - `main` branch → Production
  - Feature branches → Preview deployments
- **Domain:** [PENDING — client to confirm]

---

## Environment Strategy

```
.env.local          — Local development secrets (NEVER committed)
.env.example        — Template with placeholder names only
Vercel dashboard    — Production and preview environment variables
```

Required environment variables are documented in `.env.example`.

---

## Error Handling Approach

- All pages: custom 404 (`not-found.tsx`) and error boundary (`error.tsx`) [PROPOSED]
- All API routes: structured error responses with appropriate HTTP status codes
- All forms: explicit success and error states — never expose raw errors
- No unhandled promise rejections in production

---

## Future Testing Approach [PROPOSED]

| Layer         | Tool                   | What                           |
| ------------- | ---------------------- | ------------------------------ |
| Unit          | Vitest                 | Utility functions, hooks       |
| Integration   | Vitest                 | API route handlers, form logic |
| E2E           | Playwright             | Critical user journeys         |
| Accessibility | axe-core               | Automated a11y checks          |
| Visual        | Playwright screenshots | Regression (if needed)         |

Testing frameworks will be introduced in Phase 2. See `.agent/rules/qa-security.md`.

---

_Document status: PROPOSED_
_Approval: PENDING_
_Last updated: 2026-09-01_
_Owner: CODEX_
