/**
 * Motion tokens — the whole POC animates from this file.
 *
 * Keeping durations and eases here (rather than inline per component) is what
 * makes several separate animations read as one motion language.
 */

export const duration = {
  micro: 0.25,
  fast: 0.5,
  base: 0.8,
  slow: 1.1,
  reveal: 1.25,
} as const;

export const ease = {
  /** Primary. Fast start, long settle — feels expensive rather than bouncy. */
  out: 'expo.out',
  /** For elements entering under their own weight. */
  soft: 'power3.out',
  /** Symmetrical, for state toggles like the mobile menu. */
  inOut: 'power2.inOut',
} as const;

export const stagger = {
  tight: 0.045,
  base: 0.08,
  loose: 0.13,
} as const;

/** Distance (px) elements travel on entrance. Small — restraint reads premium. */
export const shift = {
  sm: 14,
  base: 24,
} as const;

/** Common ScrollTrigger start position for section reveals. */
export const REVEAL_START = 'top 82%';
