import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessTimeline } from './ProcessTimeline';
import { Reveal } from '@/lib/motion/Reveal';
import { process } from '@/content/home';

/**
 * Process section — the seven stages.
 *
 * Inverts to ink. The tonal shift is the page's structural device: it marks
 * the move from "what we believe" to "how it actually runs", and gives the
 * layout depth that a single continuous background cannot.
 */
export function ProcessSection() {
  return (
    <section
      id="process"
      className="bhmr-grain bhmr-grain-invert relative bg-ink py-section text-paper"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow={process.eyebrow}
            heading={process.heading}
            intro={process.intro}
            tone="invert"
          />

          <Reveal delay={0.15}>
            <aside className="rounded-2xl border border-paper/12 bg-paper/[0.03] p-6">
              <p className="text-[0.9375rem] leading-relaxed text-paper/70">{process.gateNote}</p>
            </aside>
          </Reveal>
        </div>

        <ProcessTimeline stages={process.stages} />
      </Container>
    </section>
  );
}
