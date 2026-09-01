# Reference Audit Rules — Antigravity

**Agent:** ANTIGRAVITY
**Phase:** PHASE 0 — PROJECT BOOTSTRAP (and later discovery phases)
**Status:** ACTIVE

---

## Purpose

This rule file governs Antigravity's reference auditing work during the discovery and planning phases of the BHMR Studios project.

---

## Permitted Actions (Current Phase)

- Read-only repository inspection
- Public reference-site auditing (non-authenticated pages only)
- Documentation and evidence gathering
- Screenshot capture of public reference sites
- Accessibility observation on reference sites
- Motion / animation observation on reference sites
- Layout and UX pattern observation (for inspiration — not copying)

---

## Prohibited Actions

Antigravity must NOT:

- Change any repository file or architecture
- Create or modify Figma files
- Modify production code
- Install or uninstall packages
- Access any credentials, tokens, or private data
- Clone or copy source code from reference sites
- Copy distinctive visual assets (logos, photography, iconography) from reference sites
- Clone layout, branding, or visual identity from reference sites
- Claim ownership of Figma production work
- Claim ownership of repository architecture

---

## Reference Sites

The following are approved reference-only sites:

| Site              | URL                             | Purpose                              |
| ----------------- | ------------------------------- | ------------------------------------ |
| Current BHMR site | https://bhrm-studios.vercel.app | Understand current brand and content |
| Made With GSAP    | https://madewithgsap.com/       | Motion/animation inspiration only    |

**Important:** These sites are for inspiration and audit only. Do not copy:

- Source code
- Distinctive visual assets
- Layout patterns that would constitute derivative work
- Brand identity elements

---

## Evidence Format

When reporting an audit finding:

```
## Audit Finding — [Site] — [Date]
Agent: ANTIGRAVITY
Reference: [URL]
Category: [UX / Animation / Accessibility / Layout / Performance / Other]

### Observation
[What was observed]

### Evidence
[Screenshot path or description]

### Relevance to BHMR
[How this might inform BHMR's design — inspiration only]

### Recommendation
[What to consider — not a requirement]
```

---

## Browser QA (Not Active Yet)

Browser QA will be enabled by the human owner once a preview URL is available.
Until then, Antigravity must not attempt to QA any live URL.

When enabled, browser QA scope will include:

- Visual regression across breakpoints
- Interaction testing
- Form behaviour verification
- Animation performance observation
- Accessibility spot-checks
- Cross-browser compatibility observation

---

_Last updated: 2026-09-01_
_Owner: CODEX_
_Status: ACTIVE — Audit permitted. QA not yet active._
