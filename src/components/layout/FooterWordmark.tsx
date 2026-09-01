'use client';

import { useRef } from 'react';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';

const WORD = 'BHMR STUDIOS';

/**
 * Closing wordmark — letters spread edge-to-edge and rise out of a mask,
 * scrubbed to the scrollbar, so the name literally opens up as you reach the
 * end of the page. Fits every viewport because the letters are distributed,
 * not sized to overflow.
 */
export function FooterWordmark() {
  const scope = useRef<HTMLDivElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-wordmark-letter]',
        { yPercent: 108 },
        {
          yPercent: 0,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        '[data-wordmark-dot]',
        { scale: 0 },
        {
          scale: 1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: el,
            start: 'center bottom',
            end: 'bottom bottom',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <div
      ref={scope}
      aria-hidden="true"
      data-testid="footer-wordmark"
      className="relative mt-12 flex w-full items-end justify-between px-gutter pb-6 select-none lg:mt-16 lg:pb-10"
    >
      {WORD.split('').map((char, index) =>
        char === ' ' ? (
          <span key={index} className="w-[1.5vw]" />
        ) : (
          <span key={index} className="block overflow-hidden pb-[0.05em]">
            <span
              data-wordmark-letter
              className="bhmr-display block text-[clamp(2.2rem,9.6vw,10.5rem)] leading-[0.85] text-paper/[0.14]"
            >
              {char}
            </span>
          </span>
        )
      )}
      <span
        data-wordmark-dot
        className="mb-[0.6vw] block size-[clamp(0.5rem,1.1vw,1.15rem)] shrink-0 rounded-full bg-accent"
      />
    </div>
  );
}
