'use client';

import { useRef } from 'react';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { duration, ease } from '@/lib/motion/tokens';

/**
 * Abstract hero visual — an isometric stack of planes.
 *
 * Original artwork built from CSS transforms: no stock photography, no asset
 * borrowed from either reference site, nothing to license, nothing to
 * download. It is also the argument the copy makes, drawn — "brand, product,
 * front end, back end" as separate layers that line up into one object,
 * instead of three freelancers who never talk.
 *
 * Motion pattern 4 — media reveal plus scroll parallax.
 */

const layers = [
  { label: 'Brand', depth: 0, accent: false },
  { label: 'Product', depth: 1, accent: false },
  { label: 'Front end', depth: 2, accent: true },
  { label: 'Back end', depth: 3, accent: false },
];

export function LayerStack() {
  const scope = useRef<HTMLDivElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    if (!el) return;

    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      const planes = gsap.utils.toArray<HTMLElement>('[data-plane]');

      // Entrance: planes settle into the stack from below, bottom-most first.
      gsap.from(planes, {
        opacity: 0,
        yPercent: 26,
        duration: duration.slow,
        ease: ease.out,
        stagger: 0.09,
        delay: 0.45,
      });

      // Continuous drift — very slow, so it reads as depth rather than motion.
      planes.forEach((plane, index) => {
        gsap.to(plane, {
          y: index % 2 === 0 ? -9 : 9,
          duration: 5 + index * 0.7,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // Parallax: the stack drifts slower than the page.
      gsap.to(el, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none relative h-full w-full select-none"
      style={{ perspective: '1400px' }}
    >
      {/* Warm bloom behind the stack, so it sits in light rather than on top of flat paper. */}
      <div
        className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(255,74,28,0.16) 0%, rgba(255,74,28,0.05) 42%, transparent 70%)',
        }}
      />

      {/* The tilt lives on the shared parent so each plane only needs a Z
          offset — otherwise translateZ runs along each plane's own rotated
          axis and they collapse into one another. */}
      {/* Plane size and stack spacing scale together, so the composition keeps
          its proportions instead of overflowing its box on a phone. */}
      <div
        className="absolute top-1/2 left-1/2 [--plane-gap:26px] [--plane-size:9rem] sm:[--plane-gap:36px] sm:[--plane-size:12rem] lg:[--plane-gap:46px] lg:[--plane-size:16rem]"
        style={{
          transform: 'rotateX(58deg) rotateZ(-42deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {layers.map((layer) => (
          <div
            key={layer.label}
            data-plane
            className="absolute"
            style={{
              transform: `translate(-50%, -50%) translateZ(calc(var(--plane-gap) * ${
                layers.length - 1 - layer.depth
              }))`,
            }}
          >
            <div
              className="size-[var(--plane-size)] rounded-[1.5rem] border"
              style={
                layer.accent
                  ? {
                      borderColor: 'rgba(255,74,28,0.7)',
                      background:
                        'linear-gradient(135deg, rgba(255,74,28,0.30), rgba(255,74,28,0.10))',
                      boxShadow: '0 30px 70px -30px rgba(255,74,28,0.7)',
                    }
                  : {
                      borderColor: 'rgba(20,18,15,0.28)',
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(233,228,217,0.45))',
                      boxShadow: '0 30px 70px -34px rgba(20,18,15,0.55)',
                    }
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
