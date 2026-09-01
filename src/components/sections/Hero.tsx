'use client';

import Image from 'next/image';
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
 * The headline runs full width as flowing text with individual phrases picked
 * out in accent — the treatment on the client's own marketing site, where the
 * emphasis lands inside the sentence rather than on a trailing clause. It is
 * set in heavy caps and allowed to wrap naturally, then split into real
 * visual lines and masked line by line.
 *
 * Composition: meta strip, headline across the full measure, then a two-part
 * row where the argument sits left and the media plate sits right. The plate
 * hangs below the row's baseline so it breaks into the marquee band — the
 * overlap that stops the page reading as stacked rectangles.
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
        // The headline itself is animated by TextReveal; this timeline picks
        // up everything around it.
        .from(
          '[data-hero-rise]',
          { opacity: 0, y: 24, duration: duration.base, stagger: stagger.base },
          0.75
        )
        .fromTo(
          '[data-hero-plate]',
          { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.12 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.35 },
          0.6
        )
        .from(
          '[data-hero-meta] > *',
          { opacity: 0, y: 14, duration: duration.fast, stagger: stagger.tight },
          1.0
        );

      // Plate drifts against the scroll.
      gsap.to('[data-hero-plate-inner]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });

      // The hero recedes as the next section climbs over it.
      gsap.to('[data-hero-stage]', {
        scale: 0.965,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'center top', end: 'bottom top', scrub: true },
      });

      gsap.to('[data-hero-cue]', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: '+=200', scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section ref={scope} id="top" className="bhmr-grain relative">
      <div data-hero-stage className="relative origin-top pt-28 sm:pt-32 lg:pt-36">
        <Container width="wide">
          {/* ---- mono meta row ---- */}
          <div
            data-hero-eyebrow
            className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-meta tracking-[0.16em] text-muted uppercase"
          >
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-ink/20" />
            <span>{site.location}</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-ink/20 sm:block" />
            <span className="hidden sm:inline">Est. 2026</span>
          </div>

          {/* ---- headline, full measure ---- */}
          <TextReveal
            as="h1"
            immediate
            delay={0.15}
            className="bhmr-display relative z-10 mt-7 text-mega lg:mt-9"
          >
            {hero.headline.map((segment, index) => (
              <Fragment key={segment.text}>
                {index > 0 && ' '}
                <span className={segment.accent ? 'text-accent-ink' : 'text-ink'}>
                  {segment.text}
                </span>
              </Fragment>
            ))}
          </TextReveal>

          {/* ---- argument left, media right ---- */}
          <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:gap-16">
            <div>
              <p data-hero-rise className="max-w-[34rem] text-lead text-muted">
                {hero.subline}
              </p>

              <div
                data-hero-rise
                className="mt-9 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center"
              >
                {hero.actions.map((action) => (
                  <Button
                    key={action.label}
                    href={action.href}
                    variant={action.variant}
                    size="lg"
                    magnetic
                    className="w-full sm:w-auto"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>

              {/* mono spec strip */}
              <dl
                data-hero-meta
                className="bhmr-rule mt-12 grid grid-cols-2 gap-x-6 gap-y-6 pt-6 lg:mt-16"
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

            {/* Plate hangs lower than the column beside it, so it crosses into
                the marquee band instead of sitting inside a tidy row. */}
            <div
              data-hero-plate
              className="relative aspect-[4/5] overflow-hidden rounded-plate border border-ink/10 shadow-[0_40px_90px_-50px_rgba(20,18,15,0.55)] lg:mb-[-7rem] lg:aspect-[3/3.6]"
              aria-hidden="true"
            >
              {/* Parallax runs on the image itself. An extra wrapper here only
                  adds a compositing layer for no benefit. The crop is biased
                  toward the disc: the plate's top-left is pale paper and would
                  otherwise vanish into the page background. */}
              <Image
                data-hero-plate-inner
                src="/media/plate-hero.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="scale-110 object-cover object-[58%_55%]"
              />
            </div>
          </div>
        </Container>

        {/* ---- scroll cue ---- */}
        <div data-hero-cue aria-hidden="true" className="mt-14 flex justify-center lg:mt-8">
          <span className="flex flex-col items-center gap-2 font-mono text-meta tracking-[0.16em] text-muted uppercase">
            Scroll
            <span className="block h-8 w-px overflow-hidden bg-ink/15">
              <span className="block h-full w-full bg-accent motion-safe:animate-[bhmr-cue_2s_ease-in-out_infinite]" />
            </span>
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-12">
        <Marquee text={hero.marquee} />
      </div>
    </section>
  );
}
