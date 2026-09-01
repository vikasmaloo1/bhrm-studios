'use client';

import { useRef } from 'react';
import type { Stage } from '@/content/home';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils/cn';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from '@/lib/motion/gsap';
import { STAGE_ICONS } from './stageIcons';

/**
 * The seven stages — a connected vertical timeline (the reference model).
 *
 * A single spine snakes down the section: on desktop it weaves between the
 * cards, which alternate left/right of centre; on mobile it runs down the
 * left with a gentler wave and every card to its right. The spine is a real
 * SVG path built at runtime from the actual node positions, so the curve
 * always threads through the dots at any width. As you scroll DOWN the orange
 * path draws itself in (stroke-dashoffset), each node lights as the draw
 * reaches it, and each card rises into view. No pinning, no sideways scroll.
 *
 * Robustness: with no JS or reduced motion the effect never runs — the cards
 * render fully visible in their natural positions (the decorative spine is
 * simply absent rather than broken).
 */
export function ProcessTimeline({ stages }: { stages: readonly Stage[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = scope.current;
    const svg = svgRef.current;
    const track = trackRef.current;
    const prog = progRef.current;
    if (!el || !svg || !track || !prog) return;
    const gsap = ensureGsap();

    const ctx = gsap.context(() => {
      let length = 0;

      // Rebuild the curve from live node positions (also on every refresh:
      // resize, font swap, orientation change).
      const build = () => {
        const nodes = gsap.utils.toArray<HTMLElement>('[data-node]', el);
        if (nodes.length === 0) return;
        const box = el.getBoundingClientRect();
        const w = el.clientWidth;
        const h = el.clientHeight;
        const pts = nodes.map((n) => {
          const r = n.getBoundingClientRect();
          return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
        });

        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        const amp = desktop ? Math.min(w * 0.16, 110) : 18;

        let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i - 1];
          const c = pts[i];
          const dir = i % 2 === 1 ? 1 : -1; // alternate bow -> snaking S-curve
          const cx = (p.x + amp * dir).toFixed(1);
          d += ` C ${cx} ${p.y.toFixed(1)}, ${cx} ${c.y.toFixed(1)}, ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
        }

        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        track.setAttribute('d', d);
        prog.setAttribute('d', d);
        length = prog.getTotalLength();
        prog.style.strokeDasharray = String(length);
      };

      build();

      // Orange path draws in with scroll.
      gsap.fromTo(
        prog,
        { strokeDashoffset: () => length },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 62%',
            end: 'bottom 80%',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: build,
          },
        }
      );

      // Nodes light as the draw reaches them.
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
        {/* ---- curvy spine: light track + drawn orange path ---- */}
        <svg
          ref={svgRef}
          aria-hidden="true"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
        >
          <path ref={trackRef} fill="none" stroke="rgba(10,10,10,0.12)" strokeWidth="1.5" />
          <path
            ref={progRef}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <ol className="relative z-10 flex flex-col gap-14 lg:gap-24">
          {stages.map((stage, index) => {
            const left = index % 2 === 0;
            return (
              <li key={stage.number} data-stage className="relative">
                <span
                  data-node
                  aria-hidden="true"
                  data-active="false"
                  className="absolute top-9 left-[26px] z-10 size-3.5 -translate-x-1/2 rounded-full bg-paper ring-1 ring-ink/25 transition-all duration-500 ease-[var(--ease-out-expo)] data-[active=true]:scale-110 data-[active=true]:bg-accent data-[active=true]:ring-accent lg:left-1/2"
                />

                <div
                  className={cn(
                    'pl-14 lg:pl-0',
                    'lg:w-[calc(50%-3.75rem)]',
                    left ? 'lg:mr-auto' : 'lg:ml-auto'
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
