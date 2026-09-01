import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/lib/motion/Reveal';
import { editorial } from '@/content/home';

/**
 * Editorial section — "What we believe".
 *
 * Chosen over the capabilities grid because it carries the studio's voice.
 * The beliefs are set at near-display size: they are the argument, not body
 * copy, and typesetting them as body copy would waste the best writing on the
 * page.
 */
export function EditorialSection() {
  return (
    <section id="beliefs" className="bhmr-grain relative py-section">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow={editorial.eyebrow}
              heading={editorial.heading}
              intro={editorial.intro}
            />
          </div>

          <ol className="flex flex-col">
            {editorial.beliefs.map((belief, index) => (
              <Reveal
                as="li"
                key={belief.index}
                delay={index * 0.06}
                className="group border-t border-ink/12 py-9 first:border-t-0 first:pt-0 sm:py-11"
              >
                <div className="flex gap-6 sm:gap-10">
                  <span
                    aria-hidden="true"
                    className="mt-2 shrink-0 font-sans text-meta tracking-[0.14em] text-accent-ink tabular-nums"
                  >
                    {belief.index}
                  </span>
                  <p className="font-display text-h3 text-balance text-ink">{belief.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
