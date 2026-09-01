# Risk Register — BHMR Studios

---

> Record all risks here as they are discovered. Format: ID, description, likelihood, impact, mitigation.
> Resolved risks should be marked RESOLVED — never deleted.

---

## Active Risks

### R-001 — Scope Creep Into CMS or Backend

| Field          | Value                                                                       |
| -------------- | --------------------------------------------------------------------------- |
| **Risk**       | Scope may expand to include a CMS or backend during later phases            |
| **Likelihood** | Medium                                                                      |
| **Impact**     | High — significant additional development effort                            |
| **Mitigation** | Phase gate approvals required before any scope expansion. AGENTS.md RULE 4. |
| **Status**     | OPEN                                                                        |
| **Date Added** | 2026-09-01                                                                  |

---

### R-002 — Brand Assets / Copy Delays

| Field          | Value                                                                            |
| -------------- | -------------------------------------------------------------------------------- |
| **Risk**       | Client may not supply brand assets or final page copy before design phase begins |
| **Likelihood** | Medium                                                                           |
| **Impact**     | High — design work cannot begin without brand assets                             |
| **Mitigation** | Discovery phase runs first; PRD review captures what is available.               |
| **Status**     | OPEN                                                                             |
| **Date Added** | 2026-09-01                                                                       |

---

### R-003 — Integration Credentials Not Available at Build Time

| Field          | Value                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| **Risk**       | HubSpot, Google Sheets, and other integration credentials may not be available when engineering begins |
| **Likelihood** | Low                                                                                                    |
| **Impact**     | Medium — forms can be mocked, but integration testing is blocked                                       |
| **Mitigation** | Placeholders in .env.example. Integration work deferred to Phase 4.                                    |
| **Status**     | OPEN                                                                                                   |
| **Date Added** | 2026-09-01                                                                                             |

---

### R-004 — Design Approval Delays

| Field          | Value                                                                     |
| -------------- | ------------------------------------------------------------------------- |
| **Risk**       | Client review and approval of designs may take longer than planned        |
| **Likelihood** | Medium                                                                    |
| **Impact**     | High — engineering is blocked until designs are approved                  |
| **Mitigation** | Milestone-based approach; no engineering begins until design is approved. |
| **Status**     | OPEN                                                                      |
| **Date Added** | 2026-09-01                                                                |

---

### R-006 — Gitleaks Secret Scan Is CI-Only

| Field          | Value                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Risk**       | The Gitleaks secret scan step runs in GitHub Actions CI only. It cannot be verified locally without installing the Gitleaks binary. |
| **Likelihood** | Low — CI will catch secrets before they reach origin/main                                                                           |
| **Impact**     | Low — the CI gate is the correct enforcement point for secret scanning                                                              |
| **Mitigation** | CI runs on every push and PR to main. Do not commit secrets. .env.local is gitignored. AGENTS.md RULE 7–10 enforced.                |
| **Status**     | OPEN — accepted; CI-only is intentional                                                                                             |
| **Date Added** | 2026-09-01                                                                                                                          |

---

## Resolved Risks

### R-005 — GitHub Repository Not Yet Created

| Field             | Value                                                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Risk**          | GitHub remote had not been created. CI cannot push. Remote backup does not exist.                                                         |
| **Resolution**    | GitHub repository created at https://github.com/vikasmaloo1/bhrm-studios. Remote added as origin. main branch pushed. CI workflow active. |
| **Status**        | RESOLVED                                                                                                                                  |
| **Date Added**    | 2026-09-01                                                                                                                                |
| **Date Resolved** | 2026-09-01                                                                                                                                |
