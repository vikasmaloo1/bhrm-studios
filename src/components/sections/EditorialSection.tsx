import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MaskReveal, Parallax } from '@/lib/motion/primitives';
import { editorial } from '@/content/home';

/**
 * The honest address — "What we believe".
 *
 * Asymmetric on purpose: a sticky media column holds the left edge while the
 * beliefs scroll past it on the right, so the section has a fixed anchor and
 * a moving foreground rather than two columns that scroll together.
 *
 * The beliefs are set near display size. They are the best writing on the
 * page; typesetting them as body copy would waste them.
 */
export function EditorialSection() {
  return (
    <section id="beliefs" className="bhmr-grain relative py-section">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-24">
          {/* ---- sticky anchor column ---- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="01"
              eyebrow={editorial.eyebrow}
              heading={editorial.heading}
              intro={editorial.intro}
            />

            <MaskReveal
              from="up"
              delay={0.15}
              className="relative mt-12 hidden aspect-[4/5] overflow-hidden rounded-plate lg:block"
            >
              <Parallax strength={7} scaleOut className="h-full w-full">
                <Image
                  src="/media/plate-editorial.webp"
                  alt=""
                  fill
                  sizes="24rem"
                  className="object-cover"
                />
              </Parallax>
            </MaskReveal>
          </div>

          {/* ---- beliefs ---- */}
          <ol className="flex flex-col">
            {editorial.beliefs.map((belief, index) => (
              <li
                key={belief.index}
                className="group bhmr-rule py-10 first:border-t-0 first:pt-0 sm:py-14"
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

                  <MaskReveal from="up" delay={index * 0.05}>
                    <p className="text-h3 text-balance text-ink">{belief.text}</p>
                  </MaskReveal>
                </div>
              </li>
            ))}

            {/* Media on small screens, where the sticky column is hidden. */}
            <MaskReveal
              from="up"
              className="relative mt-4 aspect-[16/11] overflow-hidden rounded-plate lg:hidden"
            >
              <Image
                src="/media/plate-editorial.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </MaskReveal>
          </ol>
        </div>
      </Container>
    </section>
  );
}
