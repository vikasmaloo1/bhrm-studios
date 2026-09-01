'use client';

import { useRef } from 'react';
import type { Stage } from '@/content/home';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils/cn';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { STAGE_ICONS } from './stageIcons';

/**
 * The seven stages — white, per the client's explicit direction, built as a
 * connected vertical timeline (the reference model).
 *
 * A single spine runs down the section — centred on desktop with the cards
 * alternating left/right of it, left-aligned on mobile with every card to its
 * right. As you scroll DOWN (never sideways) the spine draws itself in orange,
 * each node dot lights as the fill reaches it, and each card rises into view.
 * The motion communicates progression through the seven stages without
 * pinning or hijacking the scroll.
 *
 * Robustness: with no JS or under reduced motion the effect never runs — the
 * spine shows its light track, the orange fill stays at zero, and all seven
 * cards render in their natural, fully-visible positions.
 */
export function ProcessTimeline({ stages }: { stages: readonly Stage[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    if (!el) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      // Spine draws in as the section passes through the viewport.
      if (fillRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: { trigger: el, start: 'top 62%', end: 'bottom 78%', scrub: 0.6 },
          }
        );
      }

      // Each node lights when the drawn line reaches it.
      gsap.utils.toArray<HTMLElement>('[data-node]', el).forEach((node) => {
        gsap.to(node, {
          scrollTrigger: {
            trigger: node,
            start: 'top 56%',
            onEnter: () => (node.dataset.active = 'true'),
            onLeaveBack: () => (node.dataset.active = 'false'),
          },
        });
      });

      // Cards rise into view, one after another.
      gsap.utils.toArray<HTMLElement>('[data-panel-card]', el).forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 46,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <Container width="wide">
      <div ref={scope} className="relative" data-testid="process-timeline">
        {/* ---- spine: light track + drawn orange fill ---- */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[26px] w-px -translate-x-1/2 bg-ink/12 lg:left-1/2"
        >
          <span ref={fillRef} className="absolute inset-0 block origin-top scale-y-0 bg-accent" />
        </div>

        <ol className="relative flex flex-col gap-14 lg:gap-24">
          {stages.map((stage, index) => {
            const left = index % 2 === 0;
            return (
              <li key={stage.number} data-stage className="relative">
                {/* node dot on the spine, aligned to the card top */}
                <span
                  data-node
                  aria-hidden="true"
                  data-active="false"
                  className="absolute top-9 left-[26px] z-10 size-3.5 -translate-x-1/2 rounded-full bg-paper ring-1 ring-ink/25 transition-all duration-500 ease-[var(--ease-out-expo)] data-[active=true]:scale-110 data-[active=true]:bg-accent data-[active=true]:ring-accent lg:left-1/2"
                />

                <div
                  className={cn(
                    'pl-14 lg:pl-0',
                    'lg:w-[calc(50%-3.25rem)]',
                    left ? 'lg:mr-auto lg:pr-0' : 'lg:ml-auto'
                  )}
                >
                  <article
                    data-panel-card
                    data-stage={index}
                    className="relative overflow-hidden rounded-plate border border-accent/30 bg-paper p-6 shadow-[0_40px_110px_-70px_rgba(10,10,10,0.5)] sm:p-8 lg:p-10"
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span className="bhmr-serif text-[clamp(2rem,7vw,4rem)] leading-none text-accent">
                        {stage.number}
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-ink/12" />
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent-ink [&_svg]:size-5">
                        {STAGE_ICONS[index]}
                      </span>
                    </div>

                    <h3 className="bhmr-display mt-6 text-[clamp(1.375rem,4vw,2.25rem)] leading-[1.05] text-ink sm:mt-7">
                      {stage.title}
                    </h3>

                    <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                      Owned by <span className="text-ink">{stage.owner}</span>
                    </p>

                    <p className="mt-4 max-w-[42rem] text-[0.9375rem] leading-relaxed text-ink/75 sm:mt-5 sm:text-base">
                      {stage.body}
                    </p>

                    {stage.gates.length > 0 && (
                      <ul className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:pt-6">
                        {stage.gates.map((gate) => (
                          <li
                            key={gate.kind}
                            className="rounded-xl border border-ink/10 bg-paper-deep/50 p-4"
                          >
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] uppercase',
                                gate.kind === 'hard' ? 'text-accent-ink' : 'text-muted'
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'size-1.5 rounded-full',
                                  gate.kind === 'hard' ? 'bg-accent' : 'bg-muted'
                                )}
                              />
                              {gate.kind} gate
                            </span>
                            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink/70">
                              {gate.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Container>
  );
}
