# Claude Code — Review Checklist

**Read CLAUDE.md and AGENTS.md before using this file.**
**This file supplements CLAUDE.md — it does not replace it.**

---

## Purpose

This checklist gives Claude a concrete, per-category review guide to use during phase reviews.
It translates the high-level responsibilities in CLAUDE.md into actionable inspection points.

---

## How to Use

1. Run through each section relevant to the current review task.
2. Record findings using the format defined in CLAUDE.md (PASS / PASS WITH ACTIONS / BLOCKED).
3. Separate blockers, major issues, minor issues, and preferences.
4. Do NOT modify source files — record findings only.

---

## Architecture Checklist

- [ ] Directory structure matches docs/architecture/FOLDER_STRUCTURE.md
- [ ] No feature code lives in documentation directories
- [ ] Components are organized by responsibility (layout / ui / sections)
- [ ] No business logic in page components
- [ ] "use client" is used only where genuine interactivity requires it
- [ ] No unnecessary global state (context, Zustand, Redux) introduced
- [ ] Dependencies are justified and documented in DECISIONS.md

## UX Checklist

- [ ] User flows are logical and complete
- [ ] All interactive elements have visible purpose
- [ ] Error states are handled — not just happy paths
- [ ] Loading states are present where async operations occur
- [ ] CTA hierarchy is clear (primary vs. secondary actions)
- [ ] Navigation is complete and consistent across pages

## Accessibility Checklist

- [ ] Semantic HTML used throughout (nav, main, article, section, header, footer)
- [ ] Heading hierarchy is correct (h1 → h2 → h3, no skipped levels)
- [ ] All images have meaningful alt text (or lt="" for decorative)
- [ ] All interactive elements are keyboard-accessible
- [ ] Focus indicators are visible and styled
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text / UI)
- [ ] ARIA attributes used only where semantic HTML is insufficient
- [ ] prefers-reduced-motion respected in animations

## Copy Checklist

- [ ] Content matches approved copy documents
- [ ] No placeholder text left in production-bound files
- [ ] No invented or assumed client content
- [ ] Page titles and meta descriptions present and accurate
- [ ] Tone is consistent across pages

## Security Checklist

- [ ] No credentials, tokens, or secrets in any tracked file
- [ ] No dangerouslySetInnerHTML without documented sanitization
- [ ] Environment variables used for all sensitive values
- [ ] API routes validate and sanitize all inputs
- [ ] Error responses do not expose internal implementation details
- [ ] Third-party integrations use server-side handlers only

## Scope Checklist

- [ ] No feature was built that is not in the approved PRD
- [ ] No new dependency was introduced without a DECISIONS.md entry
- [ ] Phase boundary was respected (no Phase N+1 work in Phase N)
- [ ] No assumptions converted into requirements

## Maintainability Checklist

- [ ] No duplicated logic across components
- [ ] TypeScript: no ny types without documented justification
- [ ] No disabled lint rules without comment explaining why
- [ ] Component props are typed and documented where non-obvious
- [ ] All TODO comments reference a specific future task or issue

## Performance Checklist (Spot-check)

- [ ] Images use Next.js Image component with proper sizing
- [ ] No blocking render patterns in the critical path
- [ ] No unnecessary client-side data fetching for static content
- [ ] Font loading does not cause layout shift

---

_This file is read-only for Claude. Claude records findings in review output — it does not edit source files._
_Owner: CODEX_
_Last updated: 2026-09-01_
