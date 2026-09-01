import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MaskReveal, Parallax } from '@/lib/motion/primitives';
import { clientTypes } from '@/content/home';

/**
 * Who We Work With — the three BHMR client categories.
 *
 * Explicitly required content: pre-launch founders, growing SMBs, funded
 * startups — the client's own categories, not invented ones. The previous
 * pass buried two of these as a small two-card block inside the Address
 * section and dropped the third entirely. This is its own major section now,
 * with all three present.
 *
 * Motion is the card stagger and the hover lift — component-driven, not
 * decorative objects.
 */
export function ClientTypesSection() {
  return (
    <section
      id="clients"
      className="bhmr-noise relative py-section"
      data-testid="client-types-section"
    >
      <Container>
        <SectionHeading
          index={clientTypes.index}
          eyebrow={clientTypes.eyebrow}
          heading={clientTypes.heading}
          intro={clientTypes.intro}
          className="max-w-[42rem]"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {clientTypes.items.map((client, index) => (
            <Parallax key={client.label} strength={[10, 4, 8][index] ?? 6} className="h-full">
              <MaskReveal
                from="up"
                delay={index * 0.08}
                className="group relative flex h-full flex-col overflow-hidden rounded-plate border border-ink/10 bg-paper-deep/40 p-8 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_30px_60px_-40px_rgba(10,10,10,0.35)]"
                data-testid={`client-type-${index}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 -right-6 bhmr-serif text-[7rem] leading-none text-ink/[0.04] transition-colors duration-500 group-hover:text-accent/15"
                >
                  0{index + 1}
                </span>

                <p className="relative font-mono text-meta tracking-[0.16em] text-accent-ink uppercase">
                  0{index + 1} / Client
                </p>
                <h3 className="bhmr-display relative mt-5 text-[clamp(1.375rem,2.2vw,1.875rem)] text-ink">
                  {client.label}
                </h3>
                <p className="relative mt-4 text-[0.9375rem] leading-relaxed text-ink/70">
                  {client.body}
                </p>

                <span
                  aria-hidden="true"
                  className="relative mt-6 h-px w-8 bg-ink/15 transition-[width,background-color] duration-500 ease-[var(--ease-out-expo)] group-hover:w-14 group-hover:bg-accent"
                />
              </MaskReveal>
            </Parallax>
          ))}
        </div>
      </Container>
    </section>
  );
}
