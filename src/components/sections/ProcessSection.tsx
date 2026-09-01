import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessTimeline } from './ProcessTimeline';
import { MaskReveal } from '@/lib/motion/primitives';
import { process } from '@/content/home';

/**
 * The seven stages — white, per the client's explicit direction.
 *
 * This is the major visual/motion section of the page: a pinned horizontal
 * run where the seven stages travel sideways as you scroll vertically (see
 * ProcessTimeline). The client asked specifically for this section to stay
 * white — clear black typography, restrained orange accents — rather than
 * inverting to a dark scene, which is what the previous pass did.
 */
export function ProcessSection() {
  return (
    <section
      id="process"
      className="bhmr-noise relative z-10 py-section text-ink"
      data-testid="process-section"
    >
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-20">
          <SectionHeading
            index={process.index}
            eyebrow={process.eyebrow}
            heading={process.heading}
            intro={process.intro}
          />

          <MaskReveal from="up" delay={0.15}>
            <aside className="rounded-2xl border border-ink/12 bg-paper-deep/60 p-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent-ink uppercase">
                On Gates
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/70">
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
