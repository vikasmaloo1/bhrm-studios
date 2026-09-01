'use client';

import { useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { statement } from '@/content/home';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';

const PAPER = '#f6f5f2';

/**
 * Pinned statement — the hinge of the page.
 *
 * Desktop: the section pins, words fill with ink as you scrub, giant outline
 * "BHMR®" typography drifts sideways behind — and then the whole scene flips
 * to black, handing off seamlessly into the dark process section. The page
 * literally changes state under your scroll.
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
      const fillBeats = words.length * 0.4;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=190%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        words,
        { color: 'rgba(10,10,10,0.14)' },
        { color: 'rgba(10,10,10,1)', stagger: 0.4, ease: 'none' }
      )
        .to('[data-statement-rule]', { scaleX: 1, ease: 'none', duration: fillBeats }, 0)
        .fromTo(
          '[data-statement-giant]',
          { xPercent: 4 },
          { xPercent: -10, ease: 'none', duration: fillBeats + 2 },
          0
        )
        // ---- the flip: the page goes dark under your scroll ----
        .to(el, { backgroundColor: '#0a0a0a', duration: 1.5, ease: 'power1.inOut' }, '>-0.2')
        .to(words, { color: PAPER, duration: 1.5, ease: 'power1.inOut' }, '<')
        .to('[data-statement-support]', { color: 'rgba(246,245,242,0.72)', duration: 1.5 }, '<')
        .to('[data-statement-label]', { color: 'rgba(163,161,156,1)', duration: 1.5 }, '<')
        .to('[data-giant-ink]', { opacity: 0, duration: 1.5 }, '<')
        .to('[data-giant-paper]', { opacity: 1, duration: 1.5 }, '<')
        .to({}, { duration: 0.6 });
    });

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
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-paper py-section md:min-h-screen md:py-0"
      data-testid="statement-section"
    >
      {/* Orange gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, #ff5a1f 0%, transparent 55%), radial-gradient(circle at 80% 70%, #ff5a1f 0%, transparent 55%)',
        }}
      />

      {/* Giant outline wordmark drifting behind the statement — md+ only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden items-center overflow-hidden select-none md:flex"
      >
        <div data-statement-giant className="relative pl-[2vw] whitespace-nowrap">
          <p
            data-giant-ink
            className="bhmr-display bhmr-outline text-[clamp(9rem,28vw,26rem)] leading-none"
          >
            BHMR®
          </p>
          <p
            data-giant-paper
            className="bhmr-display bhmr-outline-paper absolute inset-0 text-[clamp(9rem,28vw,26rem)] leading-none opacity-0"
          >
            BHMR®
          </p>
        </div>
      </div>

      <Container width="wide" className="relative">
        <p
          data-statement-label
          className="font-mono text-meta tracking-[0.16em] text-muted uppercase"
        >
          — {statement.label}
        </p>

        <p className="bhmr-display mt-8 max-w-[24ch] text-display">
          {statement.words.map((word, index) => (
            <span key={`${word}-${index}`} data-word className="text-ink">
              {word}{' '}
            </span>
          ))}
        </p>

        <div
          aria-hidden="true"
          data-statement-rule
          className="mt-14 h-[2px] w-full origin-left scale-x-100 bg-accent md:scale-x-0"
        />

        <p data-statement-support className="mt-10 max-w-[42rem] text-lead text-ink/70">
          {statement.support}
        </p>
      </Container>
    </section>
  );
}
