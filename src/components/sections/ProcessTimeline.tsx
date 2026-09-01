'use client';

import { useRef } from 'react';
import type { Stage } from '@/content/home';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils/cn';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';

/**
 * The seven stages — white, per the client's explicit direction, and the
 * page's major motion moment.
 *
 * One design idea on every breakpoint: the section pins and, as you scroll
 * DOWN (never sideways), the stages ink through one at a time — the current
 * card lifts away as the next rises and clip-reveals in. Desktop gets a
 * vertical rail whose dot travels down; mobile gets a slim bottom progress
 * bar and a shorter pinned scene. The implementation differs, the interaction
 * does not.
 *
 * Robustness: the default markup is a plain stacked list that reads with no
 * JS and under reduced motion (the pinned/absolute mode is only switched on
 * by `data-mode` once GSAP has taken over). Content is never hidden behind
 * the fixed nav — the card is vertically centred inside a full-height scene.
 */
export function ProcessTimeline({ stages }: { stages: readonly Stage[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    const pin = pinRef.current;
    if (!el || !pin) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    const build = (endScale: number, scrub: number) => {
      el.dataset.mode = 'pinned';
      const cards = gsap.utils.toArray<HTMLElement>('[data-panel-card]', el);

      gsap.set(cards, { autoAlpha: 0, yPercent: 10, clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.set(cards[0], { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)' });

      const drive = (p: number) => {
        const c = Math.max(0, Math.min(1, p));
        if (fillRef.current) fillRef.current.style.height = `${c * 100}%`;
        if (dotRef.current) dotRef.current.style.top = `${c * 100}%`;
        if (barRef.current) barRef.current.style.width = `${c * 100}%`;
        const idx = Math.min(stages.length - 1, Math.floor(c * stages.length + 0.0001));
        const label = String(idx + 1).padStart(2, '0');
        el.querySelectorAll('[data-active-counter]').forEach((n) => {
          n.textContent = label;
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => '+=' + window.innerHeight * (stages.length - 1) * endScale,
          pin,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => drive(self.progress),
        },
      });

      for (let i = 1; i < cards.length; i++) {
        tl.to(cards[i - 1], {
          autoAlpha: 0,
          yPercent: -9,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.45,
        })
          .fromTo(
            cards[i],
            { autoAlpha: 0, yPercent: 11, clipPath: 'inset(0% 0% 100% 0%)' },
            { autoAlpha: 1, yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55 },
            '<0.08'
          )
          .to({}, { duration: 0.6 });
      }

      return () => {
        delete el.dataset.mode;
        gsap.set(cards, { clearProps: 'all' });
      };
    };

    // Same idea, tuned per device: desktop gets a longer scene, mobile a
    // shorter one with a touch more scrub smoothing.
    mm.add('(min-width: 768px)', () => build(1.15, 0.7));
    mm.add('(max-width: 767.98px)', () => build(0.85, 1));

    return () => mm.revert();
  }, [shouldAnimate, stages.length]);

  return (
    <div ref={scope} className="group/proc relative" data-testid="process-timeline">
      <div
        ref={pinRef}
        className="relative flex flex-col justify-center group-data-[mode=pinned]/proc:min-h-screen"
      >
        <Container width="wide">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14 lg:gap-20">
            {/* ---- stage cards ---- */}
            <div className="relative group-data-[mode=pinned]/proc:h-[60vh] sm:group-data-[mode=pinned]/proc:h-[58vh] md:group-data-[mode=pinned]/proc:h-[56vh]">
              {stages.map((stage, index) => (
                <div
                  key={stage.number}
                  data-panel
                  className={cn(
                    'not-first:mt-6',
                    'group-data-[mode=pinned]/proc:absolute group-data-[mode=pinned]/proc:inset-0',
                    'group-data-[mode=pinned]/proc:mt-0 group-data-[mode=pinned]/proc:flex group-data-[mode=pinned]/proc:items-center'
                  )}
                >
                  <article
                    data-panel-card
                    data-stage={index}
                    className="relative w-full overflow-hidden rounded-plate border border-accent/35 bg-paper p-6 shadow-[0_50px_130px_-70px_rgba(10,10,10,0.5)] sm:p-9 lg:p-12"
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span className="bhmr-serif text-[clamp(2.25rem,9vw,4.75rem)] leading-none text-accent">
                        {stage.number}
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-ink/12" />
                      <span className="font-mono text-meta tracking-[0.16em] text-muted tabular-nums">
                        {stage.number} / {String(stages.length).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="bhmr-display mt-6 text-[clamp(1.375rem,5vw,2.5rem)] leading-[1.05] text-ink sm:mt-7">
                      {stage.title}
                    </h3>

                    <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                      Owned by <span className="text-ink">{stage.owner}</span>
                    </p>

                    <p className="mt-4 max-w-[42rem] text-[0.9375rem] leading-relaxed text-ink/75 sm:mt-5 sm:text-base">
                      {stage.body}
                    </p>

                    {stage.gates.length > 0 && (
                      <ul className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:flex-wrap sm:pt-6">
                        {stage.gates.map((gate) => (
                          <li
                            key={gate.kind}
                            className="flex-1 rounded-xl border border-ink/10 bg-paper-deep/50 p-4"
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

                  {/* ---- mobile progress bar (pinned mode, below md) ---- */}
                  {index === 0 && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-2 hidden items-center gap-3 group-data-[mode=pinned]/proc:flex md:group-data-[mode=pinned]/proc:hidden"
                    >
                      <span className="bhmr-serif text-lg text-accent tabular-nums">
                        <span data-active-counter data-testid="process-progress-counter-mobile">
                          01
                        </span>
                      </span>
                      <span className="relative h-px flex-1 bg-ink/12">
                        <span
                          ref={barRef}
                          className="absolute inset-y-0 left-0 bg-accent"
                          style={{ width: '0%' }}
                        />
                      </span>
                      <span className="font-mono text-meta tracking-[0.16em] text-muted tabular-nums">
                        {String(stages.length).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ---- desktop vertical rail (pinned mode, md+) ---- */}
            <div
              aria-hidden="true"
              className="hidden flex-col items-center gap-5 md:group-data-[mode=pinned]/proc:flex"
            >
              <span
                data-active-counter
                data-testid="process-progress-counter"
                className="bhmr-serif text-2xl text-accent tabular-nums"
              >
                01
              </span>
              <span className="relative w-px flex-none bg-ink/12" style={{ height: '58vh' }}>
                <span
                  ref={fillRef}
                  className="absolute top-0 left-0 w-full origin-top bg-accent"
                  style={{ height: '0%' }}
                />
                <span
                  ref={dotRef}
                  className="absolute left-1/2 z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-4 ring-paper"
                  style={{ top: '0%' }}
                />
              </span>
              <span className="font-mono text-meta tracking-[0.16em] text-muted tabular-nums">
                {String(stages.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
