'use client';

import { useRef } from 'react';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { cn } from '@/lib/utils/cn';

/**
 * A hairline that wipes across the top of a section as it enters, tied to
 * scroll — the quiet hand-off that makes consecutive sections read as one
 * continuous scene rather than separate blocks. Orange, thin, scrubbed;
 * exactly the "subtle accent / progress" role the brief reserves for the
 * colour. Renders invisibly (scaleX 0) with no JS or under reduced motion,
 * so it never adds a stray line to a static page.
 */
export function SectionWipe({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
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
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger, start: 'top 92%', end: 'top 45%', scrub: 0.6 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <span
      aria-hidden="true"
      ref={ref}
      className={cn(
        'block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent/0',
        className
      )}
    />
  );
}
