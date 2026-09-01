import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessTimeline } from './ProcessTimeline';
import { SectionWipe } from '@/lib/motion/SectionWipe';
import { MaskReveal } from '@/lib/motion/primitives';
import { process } from '@/content/home';

/**
 * The seven stages — white, per the client's explicit direction.
 *
 * The major motion section: a pinned VERTICAL progression where the stages
 * ink through one at a time as you scroll down (see ProcessTimeline). White
 * throughout — clear black typography, restrained orange accents.
 */
export function ProcessSection() {
  return (
    <section
      id="process"
      className="bhmr-noise bhmr-panel relative z-10 bg-[#fbf0e8] py-section text-ink"
      data-testid="process-section"
    >
      <Container className="relative">
        <SectionWipe className="mb-12 lg:mb-16" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-20">
          <SectionHeading
            index={process.index}
            eyebrow={process.eyebrow}
            heading={process.heading}
            intro={process.intro}
          />

          <MaskReveal from="up" delay={0.15}>
            <aside className="rounded-2xl border border-ink/12 bg-paper p-6">
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

      <div className="relative mt-14 lg:mt-20">
        <ProcessTimeline stages={process.stages} />
      </div>
    </section>
  );
}
