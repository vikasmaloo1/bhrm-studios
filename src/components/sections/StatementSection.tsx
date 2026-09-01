'use client';

import { useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { statement } from '@/content/home';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';

/**
 * Pinned statement — the hinge of the page.
 *
 * Desktop: the section pins, words fill with ink as you scrub, giant outline
 * "BHMR®" typography drifts sideways behind. Stays white throughout — the
 * process section right after this is white too now (client direction), so
 * there is no dark hand-off to build toward, and flipping to black here
 * would just be a flash with nothing on either side of it.
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
        { color: 'rgba(10,10,10,0.14)' },
        { color: 'rgba(10,10,10,1)', stagger: 0.4, ease: 'none' }
      )
        .to('[data-statement-rule]', { scaleX: 1, ease: 'none' }, 0)
        .fromTo('[data-statement-giant]', { xPercent: 4 }, { xPercent: -10, ease: 'none' }, 0);
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
      className="bhmr-panel relative flex min-h-[70vh] items-center overflow-hidden bg-paper py-section md:min-h-screen md:py-0"
      data-testid="statement-section"
    >
      {/* Giant outline wordmark drifting behind the statement — desktop/
          tablet only. At mobile widths the same clamp() that scales it down
          still leaves stroke-only "BHMR®" glyphs sitting directly behind the
          real headline at nearly the same visual weight, reading as clutter
          layered on top of the words rather than a backdrop behind them
          (confirmed on the live site). The Beliefs section hides its own
          giant wordmark below `md` for the same reason — same fix here. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden items-center overflow-hidden select-none md:flex"
      >
        <p
          data-statement-giant
          className="bhmr-display bhmr-outline relative pl-[2vw] text-[clamp(4.5rem,27vw,26rem)] leading-none whitespace-nowrap"
        >
          BHMR®
        </p>
      </div>

      <Container width="wide" className="relative">
        <p className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
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

        <p className="mt-10 max-w-[42rem] text-lead text-ink/70">{statement.support}</p>
      </Container>
    </section>
  );
}
