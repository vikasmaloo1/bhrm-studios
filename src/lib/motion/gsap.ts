'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react';

let registered = false;

/* --------------------------------------------------------------------------
   Frame-loop watchdog

   Entrance animations work by hiding an element and then tweening it back in.
   That is only safe while the frame loop is actually running: if it never
   does, the element stays hidden and the content is simply gone.

   That is not hypothetical — it happens in offscreen or non-compositing
   renderers, under heavy main-thread contention, and in some embedded
   webviews, all of which report `document.visibilityState === 'visible'`
   while never firing a frame.

   So we verify a frame arrives. If none has after a generous grace period,
   we declare the frame loop broken, and every motion component drops back to
   rendering its content plainly. Unanimated content beats invisible content.
   -------------------------------------------------------------------------- */

const GRACE_PERIOD_MS = 1500;

let frameLoopBroken = false;
const listeners = new Set<() => void>();

function markFrameLoopBroken() {
  if (frameLoopBroken) return;
  frameLoopBroken = true;
  for (const listener of listeners) listener();
}

function watchFrameLoop() {
  let painted = false;
  requestAnimationFrame(() => {
    painted = true;
  });
  window.setTimeout(() => {
    if (!painted) markFrameLoopBroken();
  }, GRACE_PERIOD_MS);
}

function subscribeToFrameLoop(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/** Register plugins exactly once, on the client only. */
export function ensureGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
    watchFrameLoop();

    // ScrollTrigger caches element positions when a trigger is created. Web
    // fonts swapping in — and TextReveal re-splitting headings into lines —
    // both reflow the page afterwards, leaving those cached positions wrong,
    // which can strand a section in its hidden "from" state. Recalculate once
    // the fonts have settled.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }
  return gsap;
}

/**
 * useLayoutEffect on the client, useEffect on the server.
 *
 * Entrance animations must set their "from" state before paint, otherwise the
 * final state flashes for a frame. React warns about useLayoutEffect during
 * SSR, so we swap it out there.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

/** No animation is the safe default before the real preference is known. */
function getMotionServerSnapshot() {
  return true;
}

/**
 * Tracks the user's reduced-motion preference, including live changes.
 *
 * Modelled as an external store rather than effect-plus-state: `matchMedia`
 * is exactly the kind of platform API `useSyncExternalStore` exists for, and
 * it avoids a cascading render on mount.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionSnapshot,
    getMotionServerSnapshot
  );
}

function getFrameLoopSnapshot() {
  return frameLoopBroken;
}

function getFrameLoopServerSnapshot() {
  return false;
}

/**
 * The single gate every motion component checks.
 *
 * Animate only when the user has not asked us not to, and when the frame loop
 * is actually delivering frames. When this flips to `false` mid-session the
 * consuming effect re-runs, reverts its GSAP context, and the element returns
 * to its natural, visible layout.
 */
export function useShouldAnimate(): boolean {
  const prefersReduced = usePrefersReducedMotion();
  const loopBroken = useSyncExternalStore(
    subscribeToFrameLoop,
    getFrameLoopSnapshot,
    getFrameLoopServerSnapshot
  );
  return !prefersReduced && !loopBroken;
}
