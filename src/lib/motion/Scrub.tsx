'use client';

import { useRef, type ReactNode } from 'react';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from './gsap';

type Vars = {
  x?: number;
  y?: number;
  xPercent?: number;
  yPercent?: number;
  rotate?: number;
  scale?: number;
};

type ScrubProps = {
  children?: ReactNode;
  className?: string;
  from?: Vars;
  to?: Vars;
  start?: string;
  end?: string;
  /** Use the closest <section> as trigger — for absolutely positioned children. */
  triggerParent?: boolean;
};

/**
 * Generic scroll-scrubbed transform. The element tracks the scrollbar exactly
 * between `start` and `end`, interpolating from → to. This is the primitive
 * behind the drifting giant typography, scroll-scaled media and layered
 * section parallax.
 */
export function Scrub({
  children,
  className,
  from = {},
  to = {},
  start = 'top bottom',
  end = 'bottom top',
  triggerParent = false,
}: ScrubProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useShouldAnimate();
  const fromKey = JSON.stringify(from);
  const toKey = JSON.stringify(to);

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const trigger = triggerParent ? (el.closest('section') ?? el) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { ...(JSON.parse(fromKey) as Vars) },
        {
          ...(JSON.parse(toKey) as Vars),
          ease: 'none',
          scrollTrigger: { trigger, start, end, scrub: true, invalidateOnRefresh: true },
        }
      );
    });

    return () => ctx.revert();
  }, [shouldAnimate, fromKey, toKey, start, end, triggerParent]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
