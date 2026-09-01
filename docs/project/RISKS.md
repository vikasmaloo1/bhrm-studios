# Risk Register — BHMR Studios

---

> Record all risks here as they are discovered. Format: ID, description, likelihood, impact, mitigation.
> Resolved risks should be marked RESOLVED — never deleted.

---

## Active Risks

### R-010 — POC Effort Is Outside the Approved Quotation

| Field          | Value                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Risk**       | The coded POC is not a billable line item in the ₹52,000 approved proposal. Unquoted effort delivered without a commercial position set can become an expectation of free work. |
| **Likelihood** | High — the work is already done                                                                                                                                                 |
| **Impact**     | Medium — commercial, not technical                                                                                                                                              |
| **Mitigation** | D-013 records three explicit options for the human owner. Resolve before the POC is presented to the client, not after.                                                         |
| **Owner**      | Vikas Maloo                                                                                                                                                                     |
| **Status**     | OPEN                                                                                                                                                                            |
| **Date Added** | 2026-09-01                                                                                                                                                                      |

---

### R-009 — Page-Copy Documents Were Missing at Start of Run

| Field             | Value                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Risk**          | The nine approved page-copy documents were cited by the proposal but absent from the workspace, forcing the PRD to rely on inference.                         |
| **Resolution**    | The human owner supplied all nine documents to `docs/references/` during this run (2026-09-01). Homepage copy is now the verbatim content source for the POC. |
| **Residual**      | The PRD has **not** yet been reconsolidated against the received copy — that work is deferred (see STATUS Phase 1). Scope Lock still cannot close.            |
| **Owner**         | Vikas Maloo                                                                                                                                                   |
| **Status**        | RESOLVED — inputs received; downstream PRD work deferred, not blocked                                                                                         |
| **Date Added**    | 2026-09-01                                                                                                                                                    |
| **Date Resolved** | 2026-09-01                                                                                                                                                    |

---

### R-008 — Reviewer Independence Compromised for This Run

| Field          | Value                                                                                                                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Risk**       | Under D-009, Claude Code both authored and reviewed the Phase 1 and POC output. AGENTS.md Section H states no AI agent may approve its own output. The self-review in `docs/poc/POC_REVIEW.md` is genuinely weaker evidence than an independent pass. |
| **Likelihood** | — (structural consequence of the authorization)                                                                                                                                                                                                       |
| **Impact**     | Medium — raises the chance a defect survives to the client demo                                                                                                                                                                                       |
| **Mitigation** | Self-review is explicitly labelled as non-independent. Recommend a Codex or fresh-session review of the POC before it is sent to the client. The human owner remains the approval gate regardless.                                                    |
| **Owner**      | Vikas Maloo                                                                                                                                                                                                                                           |
| **Status**     | OPEN — accepted for the duration of D-009                                                                                                                                                                                                             |
| **Date Added** | 2026-09-01                                                                                                                                                                                                                                            |

---

### R-007 — Phase 0 → Phase 1 Approval Was Recorded Without a Decision Entry

| Field             | Value                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Risk**          | Commit `870744b` wrote `Phase 0 → Phase 1 \| APPROVED \| 2026-09-01 \| Human owner` into STATUS.md and began Phase 1 work, with no corresponding entry in DECISIONS.md. An AI-authored approval claim with no decision record is indistinguishable from an invented approval (AGENTS.md RULE 6). |
| **Likelihood**    | — (occurred)                                                                                                                                                                                                                                                                                     |
| **Impact**        | High at the time — governance integrity                                                                                                                                                                                                                                                          |
| **Resolution**    | D-009 supplies genuine, written human authorization covering the transition and the work already performed. The gap is closed **forward** by real authorization, not backdated. P-004 in PROMPT_LOG.md distinguishes what was done before authorization from what was done after.                |
| **Mitigation**    | Every future phase-gate row in STATUS.md must cite a `D-xxx` decision ID. A gate row without one is invalid.                                                                                                                                                                                     |
| **Status**        | RESOLVED — via D-009                                                                                                                                                                                                                                                                             |
| **Date Added**    | 2026-09-01                                                                                                                                                                                                                                                                                       |
| **Date Resolved** | 2026-09-01                                                                                                                                                                                                                                                                                       |

---

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
