# Product Requirements Document — BHMR Studios Website

**STATUS: DRAFT**
**APPROVAL: PENDING — Human owner sign-off required before this PRD governs engineering work**

---

> **Note to agents:** This PRD is a draft skeleton. Many sections are marked with `[PENDING]` or `[TBD]`. Do not treat draft entries as approved requirements. Do not build features based on this document until APPROVAL status changes to APPROVED.

---

## 1. Product / Website Overview

**Project:** BHMR Studios Website Redesign
**Client:** BHMR Studios
**Type:** Marketing / portfolio website with lead capture
**Technology:** Next.js, App Router, TypeScript, Tailwind CSS

A clean rebuild of the BHMR Studios web presence, delivering strong UI, animation, consistent experience, proper responsiveness, and design-system thinking. Milestone-based execution with strong project visibility, reliable forms, QA, and clean handover.

---

## 2. Problem Statement

[PENDING — to be confirmed with client during discovery]

Current site limitations to explore during discovery:

- Performance issues?
- Brand inconsistency?
- Poor mobile experience?
- Conversion issues?
- Missing pages or content?
- Outdated technology?

---

## 3. Business Goals

[PENDING — to be confirmed with client during discovery]

Likely goals (to be validated, not assumed):

- Increase qualified lead generation
- Establish credibility and authority in market
- Support talent attraction (Careers)
- Enable business development
- Support services and pricing discovery

---

## 4. Target Users

[PENDING — to be confirmed with client during discovery]

---

## 5. User Needs

[PENDING — to be confirmed with client during discovery]

---

## 6. Primary Conversion Goal

[PENDING — to be confirmed with client during discovery]

---

## 7. Sitemap

Current intended scope:

| Page                             | Route                               | Priority |
| -------------------------------- | ----------------------------------- | -------- |
| Homepage                         | `/`                                 | P0       |
| About                            | `/about`                            | P0       |
| Services                         | `/services`                         | P0       |
| Pricing                          | `/pricing`                          | P0       |
| Work With Us                     | `/work-with-us`                     | P0       |
| Careers                          | `/careers`                          | P1       |
| Director of Business Development | `/director-of-business-development` | P1       |
| Privacy Policy                   | `/privacy-policy`                   | P0       |
| Terms of Service                 | `/terms-of-service`                 | P0       |

Additional pages/routes to confirm during discovery:

- Error pages (404, 500)
- Thank you / confirmation pages
- Individual careers listing pages?

---

## 8. Page Purposes

[PENDING — to be detailed with approved copy documents]

Each page purpose will be documented once the client's page copy documents have been reviewed and approved.

---

## 9. Functional Requirements

[PENDING]

General requirements (to confirm during discovery):

- Server-side rendering / static generation where appropriate
- SEO metadata on all pages
- Open Graph tags for social sharing
- Sitemap.xml
- Robots.txt
- 404 and error handling

---

## 10. Forms

[PENDING — do not implement until design phase and approval]

Forms expected (to confirm):

- Contact / Work With Us form
- Careers application form (possibly)
- Director of Business Development inquiry form (possibly)

Requirements per form (to confirm):

- Validation: client-side + server-side
- Submissions: HubSpot integration (to confirm) / Google Sheets (to confirm)
- Spam protection (to confirm mechanism)
- Success and error states

---

## 11. Careers

[PENDING — do not implement until Phase 2+]

Scope to confirm:

- Static listings vs. dynamic CMS
- Application submission method
- Data storage and privacy
- Notification to HR/recruiter

---

## 12. Integrations

[PENDING — do not activate until authorized]

Potential integrations:

- HubSpot (CRM / form submissions)
- Google Sheets (form data backup)
- Analytics (to confirm provider)
- Email / notifications (to confirm)

No integration SDK may be installed or configured during Phase 0.

---

## 13. SEO

[PENDING]

Expected requirements:

- Page titles and meta descriptions per page
- Canonical URLs
- Open Graph and Twitter Card tags
- Structured data (to confirm)
- Sitemap.xml
- Robots.txt

---

## 14. Accessibility

Target: WCAG 2.1 AA minimum

Requirements:

- Semantic HTML throughout
- Keyboard navigation on all interactive elements
- Visible focus indicators
- Alt text on all images
- Color contrast WCAG AA minimum
- ARIA only where semantic HTML is insufficient
- Reduced motion support (`prefers-reduced-motion`)

---

## 15. Responsive Requirements

Required breakpoints:

- Mobile: 375px
- Tablet: 768px
- Laptop: 1280px
- Desktop: 1440px+

All pages must be fully functional and visually correct at all breakpoints.

---

## 16. Analytics

[PENDING — provider and implementation to be confirmed with client]

---

## 17. Privacy / Data Handling

[PENDING — to be confirmed with client's legal/data decisions]

Requirements to confirm:

- Privacy policy content (page exists — content TBD)
- Cookie consent mechanism
- Data storage locations and retention
- GDPR / applicable regulations compliance
- Form data handling and retention

---

## 18. Non-Functional Requirements

| Requirement   | Target                                                     |
| ------------- | ---------------------------------------------------------- |
| Performance   | Core Web Vitals green (LCP < 2.5s, CLS < 0.1, INP < 200ms) |
| Uptime        | 99.9% (depends on hosting — to confirm)                    |
| Deployment    | Vercel (assumed — to confirm)                              |
| Build         | Reproducible production builds                             |
| TypeScript    | Strict mode — zero type errors                             |
| Accessibility | WCAG 2.1 AA                                                |

---

## 19. Exclusions

The following are explicitly NOT in scope for this project:

- Content Management System (CMS) — unless added to scope
- User authentication / accounts
- E-commerce
- Blog (unless added to scope)
- Admin dashboard
- Custom analytics platform
- Native mobile app

---

## 20. Assumptions

[PENDING — to be validated during discovery]

Current working assumptions:

- Deployment target: Vercel
- Hosting: Vercel
- Primary form handler: HubSpot + Google Sheets (to confirm)
- No CMS in current scope
- Client will supply brand assets and final copy

---

## 21. Risks

| ID    | Risk                                  | Likelihood | Impact | Mitigation                  |
| ----- | ------------------------------------- | ---------- | ------ | --------------------------- |
| R-001 | Scope creep into CMS or backend       | Medium     | High   | Phase gate approvals        |
| R-002 | Brand assets / copy delayed           | Medium     | High   | Discovery phase first       |
| R-003 | Integration credentials not available | Low        | Medium | Placeholders until handover |
| R-004 | Design approval delays                | Medium     | High   | Milestone-based approach    |

---

## 22. Acceptance Criteria

[PENDING — to be defined with client at milestone gates]

---

## 23. Open Questions

1. What is the primary conversion goal for the homepage?
2. What CRM / form handler does the client currently use?
3. Are there existing brand guidelines / design system assets?
4. What analytics platform is preferred?
5. Is there existing content / copy approved for all pages?
6. Are individual careers listing pages required, or a single page?
7. What is the expected traffic volume?
8. Are there specific browser or device requirements beyond standard?
9. What is the deployment timeline and target go-live date?
10. Does the client own the domain / DNS? Who manages it?

---

_Document status: DRAFT_
_Approval: PENDING_
_Last updated: 2026-09-01_
_Owner: CODEX_
