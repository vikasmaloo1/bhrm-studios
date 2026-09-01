'use client';

import Image from 'next/image';
import { Fragment, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { RotatingBadge } from '@/components/visuals/RotatingBadge';
import { TextReveal } from '@/lib/motion/TextReveal';
import { hero, site } from '@/content/home';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { duration, ease, stagger } from '@/lib/motion/tokens';

/**
 * Hero — a layered scene, not a heading over whitespace.
 *
 * Layers, back to front: grid, rotating conic sun, solid orange disc (enters
 * from off-canvas, breathes, parallaxes), headline, media plate (masked
 * reveal + scroll-linked scale), floating ribbon card, rotating circular
 * badge with a counter-orbiting dot. Every layer moves at its own rate on
 * scroll, and the whole scene leans gently toward the pointer on desktop.
 */
export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    if (!el) return;
    const gsap = ensureGsap();

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let removePointer: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // ---- entrance choreography ----------------------------------------
      const tl = gsap.timeline({ defaults: { ease: ease.out } });

      tl.from('[data-hero-disc]', { xPercent: -160, opacity: 0, duration: 1.7 }, 0)
        .from(
          '[data-hero-eyebrow] > *',
          { opacity: 0, y: 10, duration: duration.fast, stagger: stagger.tight },
          0.15
        )
        .fromTo(
          '[data-hero-plate]',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 },
          0.5
        )
        .from(
          '[data-hero-rise]',
          { opacity: 0, y: 26, duration: duration.base, stagger: stagger.base },
          0.75
        )
        .from('[data-hero-card]', { y: 80, rotation: 10, opacity: 0, duration: 1.1 }, 1.05)
        .from(
          '[data-hero-badge]',
          { scale: 0, rotation: -140, opacity: 0, duration: 0.9, ease: 'back.out(1.6)' },
          1.2
        )
        .from(
          '[data-hero-meta] > *',
          { opacity: 0, y: 14, duration: duration.fast, stagger: stagger.tight },
          1.15
        )
        .from('[data-hero-tag]', { opacity: 0, scale: 0.9, duration: 0.6 }, 1.3);

      // ---- continuous motion ----------------------------------------------
      gsap.to('[data-hero-sun]', { rotation: 360, duration: 46, ease: 'none', repeat: -1 });
      gsap.to('[data-hero-disc]', {
        scale: 1.06,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });
      gsap.to('[data-hero-card]', {
        y: -12,
        rotation: -2,
        duration: 4.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.4,
      });

      // ---- scroll choreography: layers exit at different rates -------------
      const scene = { trigger: el, start: 'top top', end: 'bottom top', scrub: true } as const;
      gsap.to('[data-hero-headline]', { yPercent: -18, ease: 'none', scrollTrigger: { ...scene } });
      gsap.to('[data-hero-disc]', { yPercent: 46, ease: 'none', scrollTrigger: { ...scene } });
      gsap.to('[data-hero-plate]', { yPercent: -10, ease: 'none', scrollTrigger: { ...scene } });
      gsap.fromTo(
        '[data-hero-plate-img]',
        { scale: 1.18 },
        { scale: 1, ease: 'none', scrollTrigger: { ...scene } }
      );
      gsap.to('[data-hero-card]', { yPercent: -60, ease: 'none', scrollTrigger: { ...scene } });
      gsap.to('[data-hero-badge]', { rotation: 130, ease: 'none', scrollTrigger: { ...scene } });
      gsap.to('[data-hero-cue]', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: '+=240', scrub: true },
      });
      gsap.to('[data-hero-stage]', {
        scale: 0.96,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'center top', end: 'bottom top', scrub: true },
      });

      // ---- pointer parallax — the scene leans toward the mouse -------------
      if (fine) {
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]', el);
        const setters = layers.map((layer) => ({
          depth: Number(layer.dataset.depth ?? 10),
          x: gsap.quickTo(layer, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(layer, 'y', { duration: 0.9, ease: 'power3.out' }),
        }));
        const onMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          for (const s of setters) {
            s.x(nx * s.depth);
            s.y(ny * s.depth);
          }
        };
        el.addEventListener('pointermove', onMove, { passive: true });
        removePointer = () => el.removeEventListener('pointermove', onMove);
      }
    }, el);

    return () => {
      removePointer?.();
      ctx.revert();
    };
  }, [shouldAnimate]);

  return (
    <section
      ref={scope}
      id="top"
      className="bhmr-noise relative overflow-hidden pt-32 sm:pt-36 lg:pt-40"
      data-testid="hero-section"
    >
      {/* Faint background grid, structural not decorative */}
      <div
        aria-hidden="true"
        className="bhmr-grid-bg pointer-events-none absolute inset-0 opacity-70"
      />

      {/* Rotating conic "sun" — top-right corner accent */}
      <div
        data-hero-sun
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full opacity-[0.11] lg:-top-56 lg:-right-56 lg:h-[52rem] lg:w-[52rem]"
        style={{
          background:
            'conic-gradient(from 0deg, #ff5a1f 0%, #ff5a1f 8%, transparent 8% 12%, #ff5a1f 12% 20%, transparent 20% 24%, #ff5a1f 24% 32%, transparent 32% 36%, #ff5a1f 36% 44%, transparent 44%)',
          maskImage: 'radial-gradient(circle, black 40%, transparent 72%)',
        }}
      />

      {/* Solid orange disc — enters from off-canvas left, breathes, parallaxes */}
      <div
        data-hero-disc
        data-depth="20"
        aria-hidden="true"
        className="pointer-events-none absolute top-[24%] -left-24 z-0 size-52 rounded-full bg-accent sm:-left-32 sm:size-72 lg:top-[22%] lg:-left-40 lg:size-[26rem]"
        data-testid="hero-orange-disc"
      />

      <div data-hero-stage className="relative origin-top">
        <Container width="wide">
          {/* ---- top meta row ---- */}
          <div
            data-hero-eyebrow
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-meta tracking-[0.16em] text-muted uppercase"
          >
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-[bhmr-pulse_2s_ease-in-out_infinite] rounded-full bg-accent opacity-80" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {hero.eyebrow}
            </span>
            <span className="hidden md:inline">{hero.index}</span>
            <span>{site.location} · 2026</span>
          </div>

          {/* ---- headline — its own parallax layer ---- */}
          <div data-hero-headline data-depth="-7" className="relative z-10">
            <TextReveal
              as="h1"
              immediate
              delay={0.15}
              className="bhmr-display mt-10 text-mega text-ink lg:mt-14"
            >
              {hero.headline.map((segment, index) => (
                <Fragment key={`${segment.text}-${index}`}>
                  {index > 0 && ' '}
                  <span
                    className={
                      segment.accent
                        ? 'text-accent-ink'
                        : segment.italic
                          ? 'bhmr-serif-italic text-ink'
                          : 'text-ink'
                    }
                  >
                    {segment.text}
                  </span>
                </Fragment>
              ))}
            </TextReveal>
          </div>

          {/* ---- argument + media scene ---- */}
          <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
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

            {/* Media scene — plate + floating card + rotating badge */}
            <div className="relative lg:-mt-28">
              <div
                data-hero-plate
                data-depth="12"
                data-cursor="view"
                className="group/plate relative aspect-[4/5] overflow-hidden rounded-plate border border-ink/10 shadow-[0_50px_120px_-60px_rgba(10,10,10,0.55)]"
                aria-hidden="true"
                data-testid="hero-media-plate"
              >
                <div data-hero-plate-img className="absolute inset-0">
                  <Image
                    src={hero.media.primary.src}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                {/* Accent tag pinned inside the plate */}
                <div
                  data-hero-tag
                  className="absolute right-4 bottom-4 flex items-center gap-2 rounded-pill bg-accent px-4 py-2 font-mono text-[0.6875rem] tracking-[0.16em] text-ink uppercase shadow-lg"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 animate-[bhmr-pulse_1.6s_ease-in-out_infinite] rounded-full bg-ink"
                  />
                  Now booking · Q1 2026
                </div>
              </div>

              {/* Floating ribbon card — foreground layer, continuous levitation */}
              <div
                data-hero-card
                data-cursor="view"
                className="absolute -bottom-12 -left-6 z-10 hidden w-[44%] overflow-hidden rounded-plate border border-ink/10 bg-paper shadow-[0_40px_90px_-40px_rgba(10,10,10,0.5)] sm:block lg:-bottom-16 lg:-left-16"
                aria-hidden="true"
                data-testid="hero-floating-card"
              >
                <div className="relative aspect-square">
                  <Image
                    src={hero.media.card.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 40vw, 18vw"
                    className="object-cover"
                  />
                </div>
                <p className="border-t border-ink/8 px-4 py-3 font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
                  / Motion study — 001
                </p>
              </div>

              {/* Rotating circular badge with orbiting dot */}
              <div
                data-hero-badge
                data-depth="26"
                className="absolute -top-10 -right-4 z-10 size-24 sm:size-28 lg:-top-14 lg:-right-10 lg:size-36"
                data-testid="hero-rotating-badge"
              >
                <RotatingBadge className="h-full w-full" />
              </div>
            </div>
          </div>
        </Container>

        {/* ---- scroll cue ---- */}
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
