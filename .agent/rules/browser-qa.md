# Browser QA Rules — Antigravity

**Agent:** ANTIGRAVITY
**Phase:** NOT YET ACTIVE (will be enabled post-preview)
**Status:** PENDING — do not execute until enabled by human owner

---

## Activation Gate

Browser QA is only active when:

1. A preview URL has been deployed
2. The human owner has explicitly enabled this rule
3. A specific QA task has been assigned

Until all three conditions are true: **do nothing**.

---

## QA Scope (When Active)

### Visual Checks

- [ ] Desktop (1440px) render
- [ ] Laptop (1280px) render
- [ ] Tablet (768px) render
- [ ] Mobile (375px) render
- [ ] Visual regression vs. approved designs

### Interaction Checks

- [ ] All navigation links functional
- [ ] All CTA buttons functional
- [ ] All forms submit correctly
- [ ] All form validation states display correctly
- [ ] Animation timing and easing correct
- [ ] Hover/focus states present

### Accessibility Checks

- [ ] Keyboard navigation complete
- [ ] Focus indicators visible
- [ ] Alt text present on images
- [ ] ARIA labels correct
- [ ] Color contrast passing (WCAG AA minimum)
- [ ] Headings properly structured

### Performance Observation

- [ ] Page load time reasonable
- [ ] No layout shift visible
- [ ] Images optimized
- [ ] Fonts loading correctly

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## QA Report Format

```
## QA Report — [Page] — [Date]
Agent: ANTIGRAVITY
Preview URL: [URL]
Breakpoint: [Width tested]
Browser: [Browser + version]

### PASS / FAIL / PARTIAL

### Issues Found
| ID | Severity | Description | Screenshot |
|----|----------|-------------|-----------|
| QA-001 | CRITICAL / MAJOR / MINOR | Description | path |

### Evidence
[Screenshots or recordings]
```

---

## Prohibited During QA

- Modifying source code
- Making architectural decisions
- Changing configuration files
- Installing packages
- Accessing credentials

---

_Last updated: 2026-09-01_
_Owner: CODEX_
_Status: PENDING — not yet active_
