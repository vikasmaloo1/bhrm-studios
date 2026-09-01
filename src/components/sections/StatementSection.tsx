'use client';

import Image from 'next/image';
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
        { color: 'rgba(244,241,234,0.22)' },
        { color: 'rgba(244,241,234,1)', stagger: 0.4, ease: 'none' }
      )
        .to('[data-statement-rule]', { scaleX: 1, ease: 'none' }, 0)
        // The bed creeps closer through the hold, so a pinned panel is never
        // completely static while the reader is sitting on it.
        .to('[data-statement-media]', { scale: 1.12, ease: 'none' }, 0);
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
      className="bhmr-grain bhmr-grain-invert relative flex min-h-[80vh] items-center overflow-hidden bg-ink py-section md:min-h-screen md:py-0"
    >
      {/* Full-bleed bed. Type sits on the photograph rather than beside it —
          the one place on the page where image and headline share the frame. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          data-statement-media
          src="/media/art-statement.webp"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className="scale-105 object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/85" />
      </div>

      <Container width="wide" className="relative z-10">
        <p className="flex items-center gap-4 font-mono text-meta tracking-[0.16em] text-muted-invert uppercase">
          <span className="text-accent">02</span>
          <span aria-hidden="true" className="h-px w-10 bg-paper/25" />
          {statement.label}
        </p>

        <p className="bhmr-display mt-8 max-w-[20ch] text-display text-paper">
          {statement.words.map((word, index) => (
            <span key={`${word}-${index}`} data-word>
              {word}{' '}
            </span>
          ))}
        </p>

        <div
          aria-hidden="true"
          data-statement-rule
          className="mt-12 h-px w-full origin-left scale-x-100 bg-accent md:scale-x-0"
        />

        <p className="mt-8 max-w-[38rem] text-lead text-paper/70">{statement.support}</p>
      </Container>
    </section>
  );
}
