# Decisions Log — BHMR Studios

---

> This file is append-only. Add new decisions at the top. Never delete or modify past decisions.
> Decisions require human owner confirmation to be considered final.

---

## D-001 — Repository Location

**Date:** 2026-09-01
**Decision:** Repository created at `C:\Users\Vikas\Documents\bhmr\bhmr-studios`
**Reason:** The `C:\Users\Vikas\Documents\bhmr` directory existed and was empty. On Windows, filesystem paths are case-insensitive so this is equivalent to the specified `%USERPROFILE%\Documents\BHMR\bhmr-studios`.
**Status:** ACCEPTED
**Decided by:** CODEX (setup agent)
**Human confirmation:** PENDING

---

## D-002 — Package Manager

**Date:** 2026-09-01
**Decision:** pnpm v11.25.0 is the sole package manager. No npm or yarn.
**Reason:** Required by project specification. Single lockfile policy.
**Status:** ACCEPTED
**Decided by:** Project specification
**Human confirmation:** CONFIRMED (in setup instructions)

---

## D-003 — Technology Stack

**Date:** 2026-09-01
**Decision:** Next.js 16, App Router, TypeScript (strict), Tailwind CSS v4, pnpm
**Reason:** Required by project specification.
**Status:** ACCEPTED
**Decided by:** Project specification
**Human confirmation:** CONFIRMED (in setup instructions)

---

## D-004 — Node.js Version

**Date:** 2026-09-01
**Decision:** Node.js v24 (current Active LTS). Recorded in `.nvmrc` as `24`.
**Reason:** Specification said to use current Active LTS — do not hard-code old documentation versions.
**Status:** ACCEPTED
**Decided by:** CODEX (per specification rule)
**Human confirmation:** PENDING

---

## D-005 — No CMS in Current Scope

**Date:** 2026-09-01
**Decision:** No CMS is included in Phase 0 scope. Content managed in code.
**Reason:** Not in current approved scope. PRD marks this as an exclusion with a pending note.
**Status:** ACCEPTED
**Decided by:** Project specification
**Human confirmation:** PENDING — confirm during PRD review

---

## D-006 — Deployment Target (Proposed)

**Date:** 2026-09-01
**Decision:** Vercel is the proposed deployment target.
**Reason:** Standard choice for Next.js; consistent with current site (bhrm-studios.vercel.app).
**Status:** PROPOSED — needs human confirmation
**Decided by:** CODEX
**Human confirmation:** PENDING

---
