'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { REVEAL_START, duration, ease, shift, stagger } from './tokens';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from './gsap';

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  /** Animate direct children in sequence instead of the container as one unit. */
  stagger?: keyof typeof stagger | false;
  /** Seconds to wait after the trigger fires. */
  delay?: number;
  /** Travel distance preset. */
  distance?: keyof typeof shift;
  /**
   * Play on load instead of on scroll. Used for hero content, which is above
   * the fold — a scroll trigger there would either fire instantly anyway or,
   * worse, mis-measure during font load and strand the element hidden.
   */
  immediate?: boolean;
};

/**
 * Motion pattern 3 — scroll-triggered section reveal.
 *
 * The one reveal used across every section, so the page has a single entrance
 * behaviour rather than a different idea per block.
 *
 * Under `prefers-reduced-motion` nothing is ever hidden: the "from" state is
 * only applied inside the effect, which does not run in that case.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  stagger: staggerKey = false,
  delay = 0,
  distance = 'base',
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;

    const gsap = ensureGsap();
    const targets = staggerKey ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: shift[distance],
        duration: duration.base,
        ease: ease.out,
        delay,
        stagger: staggerKey ? stagger[staggerKey] : 0,
        scrollTrigger: immediate ? undefined : { trigger: el, start: REVEAL_START, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate, staggerKey, delay, distance, immediate]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
