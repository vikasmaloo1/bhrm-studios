import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessTimeline } from './ProcessTimeline';
import { MaskReveal } from '@/lib/motion/primitives';
import { process } from '@/content/home';

/**
 * The seven stages. Inverts to ink.
 *
 * The tonal flip is the page's structural device: it marks the move from
 * "what we believe" to "how it actually runs", and gives the scroll a middle
 * act instead of one continuous surface. A generated plate sits behind it at
 * low opacity so the dark is textured rather than flat.
 *
 * The negative top margin and rounded top edge let this section climb over
 * the one above it as you scroll, which is the overlap the earlier flat-band
 * version had none of.
 */
export function ProcessSection() {
  return (
    <section
      id="process"
      className="bhmr-grain bhmr-grain-invert relative z-10 -mt-8 overflow-hidden rounded-t-[2rem] bg-ink pt-section text-paper lg:-mt-16 lg:rounded-t-[3rem]"
    >
      {/* Generated plate, held well back so type stays the subject. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-45">
        <Image src="/media/plate-process.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-20">
          <SectionHeading
            index="02"
            eyebrow={process.eyebrow}
            heading={process.heading}
            intro={process.intro}
            tone="invert"
          />

          <MaskReveal from="up" delay={0.15}>
            <aside className="rounded-2xl border border-paper/12 bg-paper/[0.035] p-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase">
                On gates
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
