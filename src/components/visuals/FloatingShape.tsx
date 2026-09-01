'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';

type FloatingShapeProps = {
  variant?: 'ring' | 'square' | 'cross' | 'dot';
  tone?: 'accent' | 'ink' | 'paper';
  className?: string;
  /** Vertical float amplitude in px. */
  drift?: number;
  /** Continuous slow rotation. */
  spin?: boolean;
  delay?: number;
};

const borders = {
  accent: 'border-accent',
  ink: 'border-ink/25',
  paper: 'border-paper/30',
} as const;

const fills = {
  accent: 'bg-accent',
  ink: 'bg-ink/25',
  paper: 'bg-paper/30',
} as const;

/**
 * Small geometric element in continuous motion — slow vertical float, plus an
 * optional slow spin. Placed absolutely; sized by the caller. These are the
 * "objects moving independently from content" layer of the motion system.
 */
export function FloatingShape({
  variant = 'ring',
  tone = 'accent',
  className,
  drift = 14,
  spin = false,
  delay = 0,
}: FloatingShapeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -drift,
        duration: 4.2 + delay * 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay,
      });
      if (spin && el.firstElementChild) {
        gsap.to(el.firstElementChild, { rotation: 360, duration: 28, ease: 'none', repeat: -1 });
      }
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate, drift, spin, delay]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute select-none', className)}
    >
      {variant === 'ring' && (
        <div className={cn('size-full rounded-full border-2', borders[tone])} />
      )}
      {variant === 'dot' && <div className={cn('size-full rounded-full', fills[tone])} />}
      {variant === 'square' && (
        <div className={cn('size-full border-2', borders[tone])} style={{ borderRadius: '20%' }} />
      )}
      {variant === 'cross' && (
        <div className="relative size-full">
          <span
            className={cn('absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2', fills[tone])}
          />
          <span
            className={cn('absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2', fills[tone])}
          />
        </div>
      )}
    </div>
  );
}
