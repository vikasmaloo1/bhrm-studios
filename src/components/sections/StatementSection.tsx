'use client';

import { useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { statement } from '@/content/home';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';

/**
 * Pinned statement — the hinge between "what we believe" and "how we work".
 *
 * The panel pins and the sentence resolves word by word as you scroll: each
 * word lifts from muted to full ink on its own slice of the scrub. It gives
 * the page a beat of stillness between two dense sections, and it is the
 * moment the tone turns from argument to process.
 *
 * Fallback: without GSAP the section is a normal-height block with the
 * sentence already fully legible in ink. Nothing is hidden behind the scrub.
 */
export function StatementSection() {
  const scope = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    if (!el) return;
    const gsap = ensureGsap();

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const words = gsap.utils.toArray<HTMLElement>('[data-word]', el);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        words,
        { color: 'var(--color-paper-edge)' },
        { color: 'var(--color-ink)', stagger: 0.4, ease: 'none' }
      ).to('[data-statement-rule]', { scaleX: 1, ease: 'none' }, 0);
    });

    // Below md: a plain scroll-triggered reveal, no pin. Pinning a full-height
    // panel on a phone eats the whole screen for one sentence.
    mm.add('(max-width: 767.98px)', () => {
      gsap.from('[data-word]', {
        opacity: 0,
        y: 18,
        stagger: 0.05,
        ease: 'power3.out',
        duration: 0.7,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });
    });

    return () => mm.revert();
  }, [shouldAnimate]);

  return (
    <section
      ref={scope}
      className="bhmr-grain relative flex min-h-[70vh] items-center overflow-hidden py-section md:min-h-screen md:py-0"
    >
      <Container width="wide">
        <p className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
          {statement.label}
        </p>

        <p className="bhmr-display mt-8 max-w-[22ch] text-display">
          {statement.words.map((word, index) => (
            <span key={`${word}-${index}`} data-word className="text-ink">
              {word}{' '}
            </span>
          ))}
        </p>

        <div
          aria-hidden="true"
          data-statement-rule
          className="mt-12 h-px w-full origin-left scale-x-100 bg-accent md:scale-x-0"
        />

        <p className="mt-8 max-w-[38rem] text-lead text-muted">{statement.support}</p>
      </Container>
    </section>
  );
}
