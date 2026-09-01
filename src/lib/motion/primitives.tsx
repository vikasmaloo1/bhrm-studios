'use client';

import { useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import { REVEAL_START, duration, ease, shift } from './tokens';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from './gsap';

/* ==========================================================================
   Shared motion primitives.

   Every animated element on the page goes through one of these, so the whole
   site shares one set of durations, eases and trigger points. Adding a new
   effect means adding it here, not scattering another gsap.from() into a
   component.

   All of them share the same contract: if `useShouldAnimate()` is false —
   the user prefers reduced motion, or the frame loop is not running — the
   effect never runs, no "from" state is ever applied, and the element
   renders in its natural, fully visible layout.
   ========================================================================== */

/** Clip-path insets used by the mask reveals. */
const MASK = {
  up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
  left: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
} as const;

type MaskRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Direction the mask opens from. */
  from?: keyof typeof MASK;
  delay?: number;
  /** Play on load rather than on scroll. */
  immediate?: boolean;
  /** Drift the content slightly as the mask opens — adds weight. */
  drift?: boolean;
} & ComponentPropsWithoutRef<'div'>;

/**
 * Clip-path mask reveal.
 *
 * The primary reveal verb across the page. Every premium reference in the
 * audit leans on masked reveals rather than opacity fades — Iventions runs
 * 292 clip-path elements, Uplink 63 — because a mask reveals *form*, where a
 * fade only reveals presence.
 */
export function MaskReveal({
  children,
  as: Tag = 'div',
  className,
  from = 'up',
  delay = 0,
  immediate = false,
  drift = true,
  ...rest
}: MaskRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          clipPath: MASK[from].from,
          y: drift ? shift.base : 0,
        },
        {
          clipPath: MASK[from].to,
          y: 0,
          duration: duration.reveal,
          ease: ease.out,
          delay,
          scrollTrigger: immediate ? undefined : { trigger: el, start: REVEAL_START, once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate, from, delay, immediate, drift]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Positive drifts slower than scroll (recedes); negative leads it. */
  strength?: number;
  /** Also scale down slightly as it leaves — reads as depth. */
  scaleOut?: boolean;
};

/**
 * Scroll-linked parallax. Scrubbed, so it tracks the scrollbar exactly rather
 * than easing on its own — this is what stops parallax feeling like lag.
 */
export function Parallax({ children, className, strength = 12, scaleOut = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: strength, scale: scaleOut ? 1.06 : 1 },
        {
          yPercent: -strength,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate, strength, scaleOut]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the pointer, in px. */
  radius?: number;
};

/**
 * Magnetic hover — the element leans toward the pointer.
 *
 * Bound to `pointerfine` only, so it never runs on touch, where there is no
 * hover state to respond to and the transform would only fight the tap.
 */
export function Magnetic({ children, className, radius = 9 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const gsap = ensureGsap();
    const move = gsap.quickTo(el, 'x', { duration: 0.4, ease: ease.soft });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.4, ease: ease.soft });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      move(gsap.utils.clamp(-radius, radius, dx * 0.35));
      moveY(gsap.utils.clamp(-radius, radius, dy * 0.45));
    };
    const onLeave = () => {
      move(0);
      moveY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [shouldAnimate, radius]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type CounterProps = {
  value: number;
  className?: string;
  /** Zero-pad to this width. */
  pad?: number;
};

/** Number that counts up when it scrolls into view. Used for section indices. */
export function Counter({ value, className, pad = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useShouldAnimate();
  const formatted = String(value).padStart(pad, '0');

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: duration.slow,
        ease: ease.out,
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = String(Math.round(state.n)).padStart(pad, '0');
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate, value, pad]);

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
}
