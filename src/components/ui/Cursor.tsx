'use client';

import { useRef } from 'react';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';

/**
 * Custom cursor — orange dot tracking the pointer exactly, with a ring
 * trailing behind it. The ring grows over interactive elements and becomes a
 * filled "View" badge over media marked `data-cursor="view"`.
 *
 * Fine pointers only; never on touch, never under reduced motion. The dot
 * follows at near-zero latency so precision is not compromised.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const gsap = ensureGsap();
    document.documentElement.classList.add('bhmr-cursor-on');
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'none' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'none' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    let shown = false;
    const onMove = (event: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: event.clientX, y: event.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const interactive = target?.closest?.('a, button, [data-cursor]') ?? null;
      const view = target?.closest?.('[data-cursor="view"]') ?? null;

      gsap.to(ring, {
        scale: view ? 2.4 : interactive ? 1.7 : 1,
        backgroundColor: view ? 'rgba(255, 90, 31, 0.95)' : 'rgba(255, 90, 31, 0)',
        borderColor: view ? 'rgba(255, 90, 31, 0)' : 'rgba(255, 90, 31, 1)',
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: interactive ? 0 : 1, duration: 0.25, ease: 'power3.out' });
      gsap.to(label, { opacity: view ? 1 : 0, duration: 0.2 });
    };

    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      shown = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, true);
    document.documentElement.addEventListener('pointerleave', onLeaveWindow);

    return () => {
      document.documentElement.classList.remove('bhmr-cursor-on');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver, true);
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
    };
  }, [shouldAnimate]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[95] flex size-10 items-center justify-center rounded-full border border-accent opacity-0"
        data-testid="custom-cursor-ring"
      >
        <span
          ref={labelRef}
          className="font-mono text-[0.5rem] font-medium tracking-[0.14em] text-ink uppercase opacity-0"
        >
          View
        </span>
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[96] size-2 rounded-full bg-accent opacity-0"
        data-testid="custom-cursor-dot"
      />
    </>
  );
}
