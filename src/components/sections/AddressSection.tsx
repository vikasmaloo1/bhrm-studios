import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DriftText } from '@/lib/motion/DriftText';
import { MaskReveal, Parallax } from '@/lib/motion/primitives';
import { address } from '@/content/home';

/**
 * The Honest Address — section 01.
 *
 * The client asked specifically for this section's text to move the way
 * their reference example did: controlled, scroll-linked, lines separating
 * at different speeds rather than a simple fade. `DriftText` gives the
 * heading and each paragraph its own speed, so they visibly drift apart and
 * settle back together as you scroll through — not four elements moving as
 * one block.
 *
 * No floating decoration here anymore — the previous pass had geometric
 * shapes drifting in the margins independent of the content, which read as
 * decorative filler rather than motion with a purpose.
 */
export function AddressSection() {
  return (
    <section id="address" className="bhmr-noise relative py-section" data-testid="address-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <DriftText speed={0.25}>
              <SectionHeading
                index={address.index}
                eyebrow={address.eyebrow}
                heading={address.heading}
                as="h2"
                className="[&_h2]:!text-h3"
              />
            </DriftText>

            <div className="mt-12 flex flex-col gap-6 lg:mt-16">
              {address.paragraphs.map((p, i) => (
                <DriftText key={i} speed={0.45 + i * 0.25} distance={70}>
                  <p className="max-w-[38rem] text-lead text-ink/75">{p}</p>
                </DriftText>
              ))}
            </div>

            <DriftText speed={0.7} distance={60} className="mt-16 lg:mt-20">
              <p className="font-mono text-meta tracking-[0.16em] text-muted uppercase">
                Industries we know
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-3">
                {address.industries.map((ind) => (
                  <li
                    key={ind}
                    className="rounded-pill border border-ink/15 px-4 py-2 font-mono text-[0.75rem] tracking-[0.08em] text-ink/80 uppercase transition-colors duration-300 hover:border-accent hover:text-accent-ink"
                  >
                    {ind}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.9375rem] text-ink/60">Working across {address.regions}.</p>
            </DriftText>
          </div>

          {/* Sticky media column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="group">
              <MaskReveal
                from="up"
                delay={0.15}
                className="relative aspect-[3/4] overflow-hidden rounded-plate border border-ink/10 shadow-[0_50px_120px_-60px_rgba(10,10,10,0.4)]"
              >
                <Parallax strength={9} scaleOut className="relative h-full w-full">
                  <Image
                    src={address.image.src}
                    alt={address.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                </Parallax>

                <div className="absolute top-4 left-4 rounded-pill bg-paper/95 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-ink uppercase backdrop-blur">
                  / Studio
                </div>
              </MaskReveal>
            </div>

            <MaskReveal from="up" delay={0.2}>
              <dl className="bhmr-rule mt-8 grid grid-cols-3 gap-4 pt-6">
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
