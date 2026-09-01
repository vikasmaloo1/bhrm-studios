'use client';

import { useRef, type ElementType } from 'react';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from './gsap';

type WordFillRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-scrubbed word fill — the BHMR "honest address" text interaction.
 *
 * The whole paragraph is present but dim; as you scroll, each word inks in
 * left-to-right. Two things keep it smooth rather than chunky:
 *
 *   1. Overlap — each word's fade lasts longer than the gap to the next, so
 *      two or three words are always mid-transition. The result reads as a
 *      moving gradient, not a row of on/off switches.
 *   2. Fixed scroll budget — the fill is mapped to a constant number of
 *      pixels per word (not the element's height), so a short and a long
 *      paragraph both resolve at the same comfortable reading pace, and the
 *      viewport never lands stranded in the middle of a half-lit line.
 *
 * `scrub: 1` adds a one-second catch-up so the motion glides instead of
 * snapping to the scrollbar. Words are real server-rendered nodes, so the
 * copy is fully legible with no JS and under reduced motion.
 */
export function WordFillReveal({ text, as: Tag = 'p', className }: WordFillRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-wf-word]', el);
      if (words.length === 0) return;

      // Constant reading pace with a ceiling so a long paragraph never turns
      // into an endless scroll: ~22px/word on larger screens, ~18px on small,
      // capped so the fill always completes within roughly 1.5 screens.
      const perWord = window.matchMedia('(min-width: 768px)').matches ? 22 : 18;
      const budget = Math.min(1500, Math.round(words.length * perWord));

      gsap.fromTo(
        words,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: 'none',
          duration: 1,
          // each < duration => neighbouring words overlap => smooth wipe.
          stagger: { each: 0.42 },
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            end: () => `+=${budget}`,
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} data-wf-word className="inline-block">
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
