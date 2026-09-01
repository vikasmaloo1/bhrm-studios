'use client';

import { Fragment, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { TextReveal } from '@/lib/motion/TextReveal';
import { hero, site } from '@/content/home';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { duration, ease, stagger } from '@/lib/motion/tokens';

/**
 * Hero.
 *
 * Client feedback on the previous pass: it read as a gaming site, not a
 * professional studio — the rotating conic sun, breathing orange disc,
 * levitating card and orbiting badge were the cause. All removed. Motion
 * here now comes only from typography and one component: the headline
 * reveals and settles, the service-stack card wipes open, everything else
 * is still until you scroll — no idle animation loops.
 *
 * Typography: the headline is set in DM Serif Display — the client asked
 * for this specifically, as the first thing a visitor notices. Grotesk caps
 * (.bhmr-display) stay for the eyebrow, labels and meta strip only.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: ease.out } });

      tl.from('[data-hero-eyebrow] > *', {
        opacity: 0,
        y: 10,
        duration: duration.fast,
        stagger: stagger.tight,
      })
        .fromTo(
          '[data-hero-plate]',
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3 },
          0.55
        )
        .from(
          '[data-hero-rise]',
          { opacity: 0, y: 24, duration: duration.base, stagger: stagger.base },
          0.7
        )
        .from(
          '[data-hero-meta] > *',
          { opacity: 0, y: 14, duration: duration.fast, stagger: stagger.tight },
          1.05
        );

      // Scroll exit: the headline and plate separate and drift up while the
      // whole hero recedes (scales back + dims) — so it reads as handing off
      // to the next panel, which rises over it, rather than just scrolling
      // away. Scrubbed to the scrollbar, no idle motion.
      const scene = { trigger: el, start: 'top top', end: 'bottom top', scrub: true } as const;
      gsap.to('[data-hero-headline]', { yPercent: -26, ease: 'none', scrollTrigger: { ...scene } });
      gsap.to('[data-hero-plate]', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { ...scene },
      });
      gsap.to('[data-hero-cue]', {
        opacity: 0,
        y: 20,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: '+=220', scrub: true },
      });
      gsap.to('[data-hero-stage]', {
        scale: 0.93,
        opacity: 0.18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'center top', end: 'bottom top', scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section
      ref={scope}
      id="top"
      className="bhmr-noise relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24"
      data-testid="hero-section"
    >
      <div
        aria-hidden="true"
        className="bhmr-grid-bg pointer-events-none absolute inset-0 opacity-70"
      />

      <div data-hero-stage className="relative origin-top">
        <Container width="wide">
          <div
            data-hero-eyebrow
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-meta tracking-[0.16em] text-muted uppercase"
          >
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              {hero.eyebrow}
            </span>
            <span className="hidden md:inline">{hero.index}</span>
            <span>{site.location} · 2026</span>
          </div>

          {/* ---- headline — DM Serif Display, the first thing a visitor reads ---- */}
          <div data-hero-headline className="relative z-10">
            <TextReveal
              as="h1"
              immediate
              delay={0.15}
              className="bhmr-serif mt-8 text-mega text-ink lg:mt-12"
            >
              {hero.headline.map((segment, index) => (
                <Fragment key={`${segment.text}-${index}`}>
                  {index > 0 && ' '}
                  <span
                    className={
                      segment.accent ? 'text-accent-ink italic' : segment.italic ? 'italic' : ''
                    }
                  >
                    {segment.text}
                  </span>
                </Fragment>
              ))}
            </TextReveal>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <p data-hero-rise className="max-w-[36rem] text-lead text-ink/75">
                {hero.subline}
              </p>

              <div
                data-hero-rise
                className="mt-10 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center"
              >
                {hero.actions.map((action) => (
                  <Button
                    key={action.label}
                    href={action.href}
                    variant={action.variant}
                    size="lg"
                    magnetic
                    className="w-full sm:w-auto"
                    data-testid={`hero-cta-${action.variant}`}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>

              <dl
                data-hero-meta
                className="bhmr-rule mt-14 grid grid-cols-2 gap-x-6 gap-y-6 pt-8 lg:mt-20 lg:grid-cols-4"
              >
                {hero.meta_strip.map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* ---- service-stack card — original typography, not a photo ----
                Draws the sentence the copy is making: brand, product, front
                end and back end as one stack, one team, not four vendors. */}
            <div
              data-hero-plate
              className="relative aspect-[4/5] overflow-hidden rounded-plate border border-ink/10 bg-ink shadow-[0_50px_120px_-60px_rgba(10,10,10,0.55)] lg:-mt-4"
              data-testid="hero-media-plate"
            >
              <div className="flex h-full flex-col justify-between p-8 lg:p-10">
                <p className="font-mono text-meta tracking-[0.16em] text-muted-invert uppercase">
                  One team, whole stack
                </p>

                <ol className="flex flex-col gap-0">
                  {hero.stack.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-t border-paper/12 py-4 first:border-t-0 first:pt-0"
                    >
                      <span className="font-mono text-[0.75rem] tracking-[0.1em] text-muted-invert tabular-nums">
                        0{index + 1}
                      </span>
                      <span
                        className={
                          index === 2
                            ? 'bhmr-display text-[clamp(1.25rem,2.6vw,1.75rem)] text-accent'
                            : 'bhmr-display text-[clamp(1.25rem,2.6vw,1.75rem)] text-paper'
                        }
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-invert uppercase">
                  Not three freelancers who never reply on the same day
                </p>
              </div>
            </div>
          </div>
        </Container>

        <div data-hero-cue aria-hidden="true" className="mt-24 flex justify-center lg:mt-32">
          <span className="flex flex-col items-center gap-2 font-mono text-meta tracking-[0.16em] text-muted uppercase">
            Scroll
            <span className="block h-10 w-px overflow-hidden bg-ink/15">
              <span className="block h-full w-full bg-accent motion-safe:animate-[bhmr-cue_2s_ease-in-out_infinite]" />
            </span>
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-16 lg:mt-24">
        <Marquee text={hero.marquee} />
      </div>
    </section>
  );
}
