# Handoff Document — BHMR Studios

**STATUS: TEMPLATE — to be completed at project handover**
**Last updated: 2026-09-01**

---

## Current State

| Field             | Value                                                  |
| ----------------- | ------------------------------------------------------ |
| **Phase 0**       | ✅ COMPLETE (2026-09-01)                               |
| **Phase 1**       | 🔄 IN PROGRESS — Discovery authorized under D-009      |
| **Phase 2 (POC)** | ⏳ NOT STARTED                                         |
| **Current owner** | CLAUDE CODE (temporary execution owner, D-009)         |
| **Next action**   | Phase 1 Discovery — reference audit, PRD, architecture |
| **Authorization** | D-009                                                  |

### ⛔ Hard stop currently in force

> **Do not move into Figma or the full production build until the client has reviewed the POC
> and the visual direction is confirmed.**

Also gated until explicitly authorized: the remaining eight pages, HubSpot and Google Sheets
integrations, production deployment, and DNS.

### Open items the human owner must resolve

| #   | Item                                                     | Reference    |
| --- | -------------------------------------------------------- | ------------ |
| 1   | Supply the nine approved page-copy documents             | R-009, D-014 |
| 2   | Confirm the `bhrm` vs `bhmr` spelling (repo + domain)    | D-010        |
| 3   | Set the commercial position for the POC effort           | D-013, R-010 |
| 4   | Confirm primary conversion goal and audience priority    | PRD §6, §4   |
| 5   | Confirm analytics provider and cookie-consent obligation | PRD §16, §17 |

---

## Purpose

This document defines the format and checklist for a complete project handover from the development team to the client (BHMR Studios). It will be completed when the project is ready for handover.

---

## Handover Checklist

### Repository

- [ ] All feature branches merged to main
- [ ] Repository is clean (no uncommitted changes)
- [ ] All TODO comments resolved or documented
- [ ] README.md is accurate and current
- [ ] No debug code or console.logs remaining

### Environment & Deployment

- [ ] Environment variables documented in .env.example
- [ ] Vercel project set up under client's account [PENDING — confirm owner]
- [ ] Production environment variables configured in Vercel
- [ ] Domain connected and SSL active
- [ ] Redirects configured if needed

### Access Handover

- [ ] Repository access transferred to client
- [ ] Vercel project ownership transferred
- [ ] HubSpot integration credentials owned by client
- [ ] Google Sheets access owned by client
- [ ] Analytics account access transferred
- [ ] Domain / DNS access confirmed

### Quality Validation

- [ ] pnpm check passes (format, lint, typecheck, build)
- [ ] All E2E tests pass
- [ ] Accessibility: no critical violations
- [ ] Performance: Core Web Vitals green
- [ ] All pages tested on mobile, tablet, desktop
- [ ] All forms tested end-to-end
- [ ] Careers functionality tested end-to-end

### Documentation

- [ ] DECISIONS.md complete and current
- [ ] RISKS.md all resolved or accepted
- [ ] PROMPT_LOG.md complete
- [ ] Architecture documented
- [ ] Form data flow documented
- [ ] Integration setup instructions documented

### Training

- [ ] Client briefed on content update process
- [ ] Client briefed on environment variable management
- [ ] Client briefed on deployment process
- [ ] Support and maintenance terms agreed

---

## Deliverables at Handover

| Deliverable                 | Status  |
| --------------------------- | ------- |
| Source code repository      | PENDING |
| Production deployment       | PENDING |
| Design files (Figma)        | PENDING |
| Design system documentation | PENDING |
| Architecture documentation  | PENDING |
| Environment setup guide     | PENDING |
| QA report                   | PENDING |
| Accessibility audit report  | PENDING |
| Performance audit report    | PENDING |

---

## Post-Handover Support

[PENDING — to be agreed with client]

---

_Owner: CODEX_
_Status: TEMPLATE_
_Next task: Phase 1 — Discovery (authorized under D-009)_
