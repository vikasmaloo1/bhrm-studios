'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from './gsap';

type DriftTextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /**
   * Relative speed through the section, roughly -1..1. Different speeds on
   * sibling blocks is the whole effect: a heading at 0.2 and a paragraph at
   * 0.6 drift apart as you scroll, rather than moving as one flat unit.
   */
  speed?: number;
  /** Vertical travel in px at speed = 1. */
  distance?: number;
};

/**
 * Scroll-scrubbed differential drift.
 *
 * This is the primitive behind the client-requested "section 1 / section 2"
 * treatment: text tied to scroll position with real translate + opacity,
 * not a one-shot fade. Each block travels at its own `speed`, so content
 * inside one section visibly separates and reconverges as the page scrolls
 * through it, rather than the whole block moving together.
 *
 * Scoped to the nearest `<section>` so multiple blocks inside one section
 * share the same scroll range and their speeds read as relative to each
 * other, not to their own individual heights.
 */
export function DriftText({
  children,
  as: Tag = 'div',
  className,
  speed = 0.4,
  distance = 90,
}: DriftTextProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const trigger = el.closest('section') ?? el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: distance * speed, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 0.6,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate, speed, distance]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
