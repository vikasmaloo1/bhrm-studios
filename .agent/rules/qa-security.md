# QA & Security Rules

**Agent:** CODEX (owner) / All agents (read)
**Status:** ACTIVE — governs all phases

---

## Purpose

Defines quality assurance and security requirements for the BHMR Studios project. These rules apply to all phases and all agents.

---

## Quality Gates (Phase 1+)

Every pull request and phase transition must pass all applicable quality gates:

### Automated Checks (must always pass)

- [ ] TypeScript: `pnpm typecheck` — zero errors
- [ ] Lint: `pnpm lint` — zero errors (warnings acceptable; document if unavoidable)
- [ ] Format: `pnpm format:check` — zero diff
- [ ] Build: `pnpm build` — production build succeeds

### Testing (introduced in appropriate phases)

- Unit tests: For pure utility functions and non-trivial logic
- Integration tests: For form submission flows and API interactions
- E2E tests: For critical user journeys (contact form, careers application)
- Accessibility: axe or similar — no critical violations

### Manual QA Checklist (per feature)

- [ ] Responsive: desktop, tablet, mobile
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Keyboard navigation complete
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] All form states: empty, valid, invalid, submitting, success, error
- [ ] All error states handled gracefully
- [ ] Loading states present where appropriate

---

## Security Requirements

### Credentials

- NEVER store in: source code, markdown, Git history, screenshots, test fixtures, logs, Figma
- ALWAYS use environment variables (`.env.local` — never committed)
- `.env.example` contains names only — never values

### Third-Party Integrations

- Validate all external API responses before use
- Handle integration failures gracefully — never expose raw errors to users
- Rate limiting: protect all form endpoints
- Input sanitization: all user inputs must be sanitized before processing

### Environment Variables

- Server-only secrets: no `NEXT_PUBLIC_` prefix
- Client-safe values: `NEXT_PUBLIC_` prefix only for genuinely public data
- Validate required env vars at build time or startup

### Content Security

- No `dangerouslySetInnerHTML` without explicit justification and sanitization
- No user-controlled data rendered without escaping

---

## Testing Frameworks (Not Yet Installed)

Frameworks will be installed when testing work begins (Phase 2+):

- **Unit/Integration:** Vitest (preferred) or Jest
- **E2E:** Playwright
- **Accessibility:** @axe-core/playwright or jest-axe

Do NOT install testing frameworks during Phase 0.

---

## What Must Not Be Done

- Disabling TypeScript strictness to make a task pass
- Setting `eslint-disable` without documented reason
- Skipping quality checks to meet a deadline
- Marking something as tested when it has not been tested
- Storing secrets in any non-environment-variable location
- Committing `.env.local` or any credentials file

---

## Failure Handling

If a quality check fails:

1. Do not proceed to the next step
2. Fix the root cause — do not suppress the check
3. Document in `docs/project/RISKS.md` if the failure reveals a systemic issue
4. Re-run the full check suite after fixing

---

_Last updated: 2026-09-01_
_Owner: CODEX_
_Status: ACTIVE_
