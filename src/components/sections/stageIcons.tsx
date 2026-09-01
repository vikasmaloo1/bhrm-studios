import type { ReactNode } from 'react';

/**
 * One meaningful line-icon per stage — a small visual cue for each step in the
 * seven-stage story, not decoration. Stroke uses `currentColor`, sized by the
 * caller. Kept as inline SVGs so the POC pulls in no icon dependency.
 *
 * Index-aligned to `process.stages`:
 * 01 Discovery · 02 Scope/Roadmap Lock · 03 Design · 04 Engineering ·
 * 05 Testing · 06 Launch · 07 Post-Launch Support.
 */
const svg = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
} as const;

export const STAGE_ICONS: ReactNode[] = [
  // 01 — Discovery & Alignment: target / find
  <svg key="01" {...svg} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <circle cx="11" cy="11" r="2.4" />
    <path d="M20.5 20.5 17 17" />
  </svg>,
  // 02 — Scope & Roadmap Lock: padlock
  <svg key="02" {...svg} aria-hidden="true">
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    <path d="M12 14.5v2.5" />
  </svg>,
  // 03 — Design: pen nib
  <svg key="03" {...svg} aria-hidden="true">
    <path d="M12 3 5 10l-1.5 8.5L12 17l8.5 1.5L19 10Z" />
    <path d="m12 3 0 14" />
    <circle cx="12" cy="17" r="1.6" />
  </svg>,
  // 04 — Engineering & Build: code
  <svg key="04" {...svg} aria-hidden="true">
    <path d="m8.5 7-5 5 5 5" />
    <path d="m15.5 7 5 5-5 5" />
    <path d="m13.5 5-3 14" />
  </svg>,
  // 05 — Testing & Hardening: shield check
  <svg key="05" {...svg} aria-hidden="true">
    <path d="M12 3.5 5 6.5v5c0 4.2 3 7.3 7 9 4-1.7 7-4.8 7-9v-5Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>,
  // 06 — Launch & Handover: rocket
  <svg key="06" {...svg} aria-hidden="true">
    <path d="M12 3c3.5 2 5 5.5 5 9l-2.5 3h-5L7 12c0-3.5 1.5-7 5-9Z" />
    <circle cx="12" cy="10" r="1.7" />
    <path d="M9.5 18c-1 1.5-1 3-1 3s1.5 0 3-1M14.5 18c1 1.5 1 3 1 3s-1.5 0-3-1" />
  </svg>,
  // 07 — Post-Launch Support: life-buoy
  <svg key="07" {...svg} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.2" />
    <path d="m6 6 3.6 3.6M18 6l-3.6 3.6M6 18l3.6-3.6M18 18l-3.6-3.6" />
  </svg>,
];
