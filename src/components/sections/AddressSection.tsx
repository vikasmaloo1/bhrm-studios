import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WordFillReveal, WordFillRevealSequence } from '@/lib/motion/WordFillReveal';
import { SectionWipe } from '@/lib/motion/SectionWipe';
import { MaskReveal } from '@/lib/motion/primitives';
import { address } from '@/content/home';

/**
 * The Honest Address — section 01.
 *
 * Client direction: the workspace photo is gone with no replacement. The
 * section now carries itself on typography alone — the heading holds the
 * left rail while the two paragraphs ink in word by word as you scroll
 * (WordFillReveal), which is the reference site's core "reading responds to
 * scroll" interaction. Whitespace is deliberate, not empty.
 */
export function AddressSection() {
  return (
    <section
      id="address"
      className="bhmr-panel relative bg-paper py-section"
      data-testid="address-section"
    >
      <Container>
        <SectionWipe className="mb-12 lg:mb-16" />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          {/* Heading holds the left rail as the paragraphs scroll past. */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              index={address.index}
              eyebrow={address.eyebrow}
              heading={address.heading}
              as="h2"
              className="[&_h2]:!text-h3"
            />
          </div>

          <div className="flex flex-col gap-10 lg:gap-14">
            <WordFillRevealSequence className="flex flex-col gap-10 lg:gap-14">
              {address.paragraphs.map((p, i) => (
                <WordFillReveal
                  key={i}
                  text={p}
                  className="max-w-[44rem] text-[clamp(1.375rem,2.6vw,2.125rem)] leading-[1.42] font-medium tracking-[-0.012em] text-ink"
                />
              ))}
            </WordFillRevealSequence>

            <MaskReveal from="up" drift={false} className="mt-2">
              <p className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
                Industries we know
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {address.industries.map((ind) => (
                  <li
                    key={ind}
                    className="rounded-pill border border-ink/15 px-4 py-2 font-mono text-[0.75rem] tracking-[0.08em] text-ink/80 uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
                  >
                    {ind}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.9375rem] text-ink/55">Working across {address.regions}.</p>
            </MaskReveal>

            <MaskReveal from="up" delay={0.06} drift={false}>
              <dl className="bhmr-rule mt-2 grid grid-cols-3 gap-4 pt-8">
                <div>
                  <dt className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
                    Founded
                  </dt>
                  <dd className="bhmr-display mt-2 text-[clamp(1.5rem,2.4vw,2.25rem)] text-ink">
                    2026
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
                    Timezones
                  </dt>
                  <dd className="bhmr-display mt-2 text-[clamp(1.5rem,2.4vw,2.25rem)] text-ink">
                    08
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
                    Support
                  </dt>
                  <dd className="bhmr-display mt-2 text-[clamp(1.5rem,2.4vw,2.25rem)] text-accent-ink">
                    30d
                  </dd>
                </div>
              </dl>
            </MaskReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
