'use client';

import { useRef, useState } from 'react';
import type { Stage } from '@/content/home';
import { cn } from '@/lib/utils/cn';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { duration, ease } from '@/lib/motion/tokens';

/**
 * Motion pattern 6 — scroll-linked progress.
 *
 * A rail fills as the reader moves through the seven stages, and each stage
 * lights as it becomes current. This is the one place scrubbed (rather than
 * triggered) motion earns its place: the copy is explicitly about knowing
 * where you are in a process, so tying progress to scroll position says the
 * same thing the words do.
 *
 * No scroll hijacking, no pinning — the page scrolls at its natural rate.
 */
export function ProcessTimeline({ stages }: { stages: readonly Stage[] }) {
  const scope = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    if (!el) return;

    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      // Fill the rail across the length of the list.
      gsap.fromTo(
        '[data-rail-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        }
      );

      // Reveal each row, and track which one is current.
      gsap.utils.toArray<HTMLElement>('[data-stage]').forEach((row, index) => {
        gsap.from(row, {
          opacity: 0,
          y: 22,
          duration: duration.base,
          ease: ease.out,
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });

        const markActive = () => setActive(index);
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: markActive,
            onEnterBack: markActive,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <ol ref={scope} className="relative mt-16 lg:mt-20">
      {/* Rail — hidden on small screens where there is no room for it. */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-0 hidden w-px bg-paper/12 lg:block"
      >
        <div data-rail-fill className="h-full w-full origin-top bg-accent" />
      </div>

      {stages.map((stage, index) => (
        <li
          key={stage.number}
          data-stage
          className="group relative border-t border-paper/10 py-10 first:border-t-0 first:pt-0 lg:pl-20"
        >
          {/* Node on the rail */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute -left-[3.5px] hidden size-2 rounded-full transition-colors duration-500 lg:block',
              index === 0 ? 'top-1.5' : 'top-11',
              index <= active ? 'bg-accent' : 'bg-paper/25'
            )}
          />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
            <div>
              <div className="flex items-baseline gap-4">
                <span
                  className={cn(
                    'font-sans text-meta tracking-[0.14em] tabular-nums transition-colors duration-500',
                    index <= active ? 'text-accent' : 'text-muted-invert'
                  )}
                >
                  Stage {stage.number}
                </span>
              </div>
              <h3 className="mt-3 font-display text-h3 text-paper">{stage.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] text-muted-invert">Owned by {stage.owner}</p>
            </div>

            <div>
              <p className="max-w-[38rem] text-lead text-paper/80">{stage.body}</p>

              {stage.gates.length > 0 && (
                <ul className="mt-6 flex flex-col gap-3">
                  {stage.gates.map((gate) => (
                    <li
                      key={gate.kind}
                      className="flex flex-col gap-2 rounded-xl border border-paper/10 bg-paper/[0.03] p-4 sm:flex-row sm:gap-4 sm:p-5"
                    >
                      <span
                        className={cn(
                          'inline-flex h-6 shrink-0 items-center gap-1.5 self-start rounded-pill px-2.5 text-[0.6875rem] font-medium tracking-[0.1em] uppercase',
                          gate.kind === 'hard'
                            ? 'bg-accent/15 text-accent'
                            : 'bg-paper/10 text-muted-invert'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'size-1.5 rounded-full',
                            gate.kind === 'hard' ? 'bg-accent' : 'bg-muted-invert'
                          )}
                        />
                        {gate.kind} gate
                      </span>
                      <p className="text-[0.9375rem] leading-relaxed text-paper/70">{gate.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
