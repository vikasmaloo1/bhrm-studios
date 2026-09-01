import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessTimeline } from './ProcessTimeline';
import { MaskReveal } from '@/lib/motion/primitives';
import { process } from '@/content/home';

/**
 * The seven stages — inverts to ink, so the scroll gets a middle act.
 */
export function ProcessSection() {
  return (
    <section
      id="process"
      className="bhmr-noise bhmr-noise-invert relative z-10 -mt-8 overflow-hidden rounded-t-[2rem] bg-ink pt-section text-paper lg:-mt-16 lg:rounded-t-[3rem]"
      data-testid="process-section"
    >
      {/* Ambient orange glow, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #ff5a1f 0%, transparent 65%)',
        }}
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-20">
          <SectionHeading
            index={process.index}
            eyebrow={process.eyebrow}
            heading={process.heading}
            intro={process.intro}
            tone="invert"
          />

          <MaskReveal from="up" delay={0.15}>
            <aside className="rounded-2xl border border-paper/15 bg-paper/[0.03] p-6 backdrop-blur">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
                On Gates
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper/70">
                {process.gateNote}
              </p>
            </aside>
          </MaskReveal>
        </div>
      </Container>

      <div className="relative mt-16 pb-section lg:mt-24 lg:pb-0">
        <ProcessTimeline stages={process.stages} />
      </div>
    </section>
  );
}
