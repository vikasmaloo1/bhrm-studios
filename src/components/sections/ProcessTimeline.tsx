'use client';

import { useRef, useState } from 'react';
import type { Stage } from '@/content/home';
import { cn } from '@/lib/utils/cn';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { duration, ease } from '@/lib/motion/tokens';

/**
 * The seven stages, as a pinned horizontal scroll.
 *
 * This is the showpiece. The section pins and the track travels sideways as
 * you scroll down, so the seven stages read as one continuous run rather than
 * seven stacked cards — which is the point the copy makes about a single
 * process with named owners and explicit gates.
 *
 * Robustness matters more here than the effect:
 *   - The default markup is a plain vertical list. Horizontal layout is only
 *     switched on by `data-horizontal`, which JS sets after GSAP has actually
 *     taken over. No JS, reduced motion, or a dead frame loop each leave a
 *     readable vertical list rather than a broken row.
 *   - `gsap.matchMedia` scopes the pin to >=1024px and reverts cleanly when
 *     the viewport crosses that boundary.
 */
export function ProcessTimeline({ stages }: { stages: readonly Stage[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const gsap = ensureGsap();

    const mm = gsap.matchMedia();

    // ---- desktop: pinned horizontal run ---------------------------------
    mm.add('(min-width: 1024px)', () => {
      el.dataset.horizontal = 'true';

      const distance = () => Math.max(0, track.scrollWidth - el.clientWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          // Scroll length maps 1:1 to horizontal travel, so sideways motion
          // tracks the wheel exactly instead of racing ahead of it.
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.round(self.progress * (stages.length - 1))),
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        delete el.dataset.horizontal;
        gsap.set(track, { x: 0 });
      };
    });

    // ---- below lg: vertical reveals -------------------------------------
    mm.add('(max-width: 1023.98px)', () => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-stage]', track);
      rows.forEach((row, index) => {
        gsap.from(row, {
          opacity: 0,
          y: 26,
          duration: duration.base,
          ease: ease.out,
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 60%',
            end: 'bottom 60%',
            onEnter: () => setActive(index),
            onEnterBack: () => setActive(index),
          },
        });
      });
    });

    return () => mm.revert();
  }, [shouldAnimate, stages.length]);

  const progress = stages.length > 1 ? active / (stages.length - 1) : 0;

  return (
    <div ref={scope} className="group/track relative lg:overflow-hidden">
      {/* ---- progress rail, only meaningful in horizontal mode ---- */}
      <div
        aria-hidden="true"
        className="absolute inset-x-gutter bottom-12 z-20 hidden items-center gap-5 group-data-[horizontal]/track:flex"
      >
        <span
          className="font-mono text-meta tracking-[0.16em] text-accent tabular-nums"
          data-testid="process-progress-counter"
        >
          {String(active + 1).padStart(2, '0')}
        </span>
        <span className="relative h-px flex-1 bg-paper/15">
          <span
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-[var(--ease-out-expo)]"
            style={{ width: `${progress * 100}%` }}
          />
        </span>
        <span className="font-mono text-meta tracking-[0.16em] text-muted-invert tabular-nums">
          {String(stages.length).padStart(2, '0')}
        </span>
      </div>

      <ol
        ref={trackRef}
        className={cn(
          'flex flex-col',
          'group-data-[horizontal]/track:h-screen group-data-[horizontal]/track:flex-row',
          'group-data-[horizontal]/track:items-start group-data-[horizontal]/track:pt-[15vh]',
          'group-data-[horizontal]/track:pr-[38vw] group-data-[horizontal]/track:pl-gutter'
        )}
      >
        {stages.map((stage, index) => (
          <li
            key={stage.number}
            data-stage
            className={cn(
              'bhmr-rule-invert relative py-10 first:border-t-0 first:pt-0',
              'group-data-[horizontal]/track:w-[min(30rem,34vw)] group-data-[horizontal]/track:shrink-0',
              'group-data-[horizontal]/track:border-t-0 group-data-[horizontal]/track:border-l',
              'group-data-[horizontal]/track:border-l-paper/12',
              'group-data-[horizontal]/track:py-0 group-data-[horizontal]/track:pr-12',
              'group-data-[horizontal]/track:pl-10'
            )}
          >
            <div
              className={cn(
                'grid gap-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12',
                'group-data-[horizontal]/track:!block'
              )}
            >
              <div>
                <span
                  className={cn(
                    'font-mono text-meta tracking-[0.16em] tabular-nums transition-colors duration-500',
                    index <= active ? 'text-accent' : 'text-muted-invert'
                  )}
                >
                  Stage {stage.number}
                </span>

                <h3 className="bhmr-display mt-4 text-h3 text-paper">{stage.title}</h3>
                <p className="mt-3 font-mono text-[0.75rem] tracking-[0.06em] text-muted-invert">
                  Owned by {stage.owner}
                </p>
              </div>

              <div className="group-data-[horizontal]/track:mt-7">
                <p className="max-w-[38rem] leading-relaxed text-paper/80">{stage.body}</p>

                {stage.gates.length > 0 && (
                  <ul className="mt-6 flex flex-col gap-3">
                    {stage.gates.map((gate) => (
                      <li
                        key={gate.kind}
                        className="rounded-xl border border-paper/12 bg-paper/[0.035] p-4"
                      >
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] uppercase',
                            gate.kind === 'hard' ? 'text-accent' : 'text-muted-invert'
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
                        <p className="mt-2 text-[0.875rem] leading-relaxed text-paper/65">
                          {gate.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
