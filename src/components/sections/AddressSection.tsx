import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FloatingShape } from '@/components/visuals/FloatingShape';
import { MaskReveal, Parallax } from '@/lib/motion/primitives';
import { address } from '@/content/home';

/**
 * The Honest Address — who we are, who we build for.
 *
 * Two-column asymmetry: on the left, the running prose + client pill labels;
 * on the right, a tall image that extends past the section boundary, with a
 * rotating industries strip below it.
 */
export function AddressSection() {
  return (
    <section
      id="address"
      className="bhmr-noise relative py-section"
      data-testid="address-section"
    >
      {/* Floating geometry — continuous motion in the margins */}
      <FloatingShape
        variant="cross"
        tone="accent"
        spin
        className="top-[8rem] right-[4%] hidden size-9 lg:block"
        drift={14}
      />
      <FloatingShape
        variant="dot"
        tone="accent"
        className="top-[55%] left-[1.5%] hidden size-3 lg:block"
        drift={22}
        delay={0.6}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeading
              index={address.index}
              eyebrow={address.eyebrow}
              heading={address.heading}
              as="h2"
              className="[&_h2]:!text-h3"
            />

            <div className="mt-12 flex flex-col gap-6 lg:mt-16">
              {address.paragraphs.map((p, i) => (
                <MaskReveal key={i} from="up" drift={false} delay={i * 0.05}>
                  <p className="max-w-[38rem] text-lead text-ink/75">{p}</p>
                </MaskReveal>
              ))}
            </div>

            {/* Two client types side by side */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20">
              {address.clients.map((client, i) => (
                <MaskReveal
                  key={client.label}
                  from="up"
                  delay={0.08 + i * 0.06}
                  className="group relative overflow-hidden rounded-plate border border-ink/10 bg-paper-deep/50 p-7 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_30px_60px_-40px_rgba(10,10,10,0.35)]"
                >
                  <p className="font-mono text-meta tracking-[0.16em] text-accent-ink uppercase">
                    0{i + 1} / Client
                  </p>
                  <h3 className="bhmr-display mt-4 text-[clamp(1.375rem,2vw,1.75rem)] text-ink">
                    {client.label}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/70">
                    {client.body}
                  </p>
                </MaskReveal>
              ))}
            </div>

            {/* Industries + regions */}
            <MaskReveal from="up" delay={0.2} className="mt-14">
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
              <p className="mt-6 text-[0.9375rem] text-ink/60">
                Working across {address.regions}.
              </p>
            </MaskReveal>
          </div>

          {/* Sticky media column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div data-cursor="view" className="group">
              <MaskReveal
                from="up"
                delay={0.15}
                className="relative aspect-[3/4] overflow-hidden rounded-plate border border-ink/10 shadow-[0_50px_120px_-60px_rgba(10,10,10,0.4)]"
              >
                <Parallax strength={9} scaleOut className="relative h-full w-full">
                  <Image
                    src={address.image.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                  />
                </Parallax>

                {/* Corner tag */}
                <div className="absolute top-4 left-4 rounded-pill bg-paper/95 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-ink uppercase backdrop-blur">
                  / Studio
                </div>
              </MaskReveal>
            </div>

            {/* Numbers strip */}
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
