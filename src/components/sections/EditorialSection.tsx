import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DriftText } from '@/lib/motion/DriftText';
import { MaskReveal } from '@/lib/motion/primitives';
import { Scrub } from '@/lib/motion/Scrub';
import { editorial } from '@/content/home';

/**
 * What We Believe — section 02.
 *
 * Same differential scroll-text treatment as the Address section: heading,
 * intro and belief list each drift at their own speed rather than fading in
 * as one flat unit. The giant outline "Beliefs" wordmark drifting sideways
 * behind is text, not decoration, and stays — it is exactly the kind of
 * typography-driven motion the brief asks for.
 *
 * The previous pass had a sticky photo here plus two floating geometric
 * shapes drifting independently of the content; both removed. The section
 * is pure typography now, and reads stronger for it — this is the best
 * writing in the copy, and it does not need a picture standing next to it.
 */
export function EditorialSection() {
  return (
    <section
      id="beliefs"
      className="bhmr-noise relative overflow-hidden bg-paper-deep/40 py-section"
      data-testid="beliefs-section"
    >
      {/* Giant outline word drifting horizontally with scroll — desktop only,
          it collides with the eyebrow at small widths */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 right-0 left-0 hidden overflow-hidden select-none md:block"
      >
        <Scrub from={{ xPercent: 12 }} to={{ xPercent: -12 }} triggerParent>
          <p className="bhmr-display bhmr-outline text-right text-[clamp(6rem,18vw,17rem)] leading-none whitespace-nowrap">
            Beliefs
          </p>
        </Scrub>
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <DriftText speed={0.25}>
              <SectionHeading
                index={editorial.index}
                eyebrow={editorial.eyebrow}
                heading={editorial.heading}
                intro={editorial.intro}
                className="[&_h2]:!text-h3"
              />
            </DriftText>
          </div>

          <ol className="flex flex-col">
            {editorial.beliefs.map((belief, index) => (
              <li
                key={belief.index}
                className="bhmr-rule group relative py-10 first:border-t-0 first:pt-0 sm:py-14"
              >
                <div className="flex gap-6 sm:gap-12">
                  <MaskReveal from="up" drift={false} className="shrink-0">
                    <span
                      aria-hidden="true"
                      className="font-mono text-meta tracking-[0.16em] text-accent-ink tabular-nums"
                    >
                      {belief.index}
                    </span>
                  </MaskReveal>

                  <DriftText speed={0.3 + (index % 3) * 0.15} distance={50}>
                    <p className="text-h3 text-balance text-ink transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-accent-ink">
                      {belief.text}
                    </p>
                  </DriftText>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
