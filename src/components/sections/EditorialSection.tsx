import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FloatingShape } from '@/components/visuals/FloatingShape';
import { MaskReveal, Parallax } from '@/lib/motion/primitives';
import { Scrub } from '@/lib/motion/Scrub';
import { editorial } from '@/content/home';

/**
 * What We Believe — beliefs as an editorial list, with giant outline
 * typography drifting behind on scroll and floating geometry in the margins.
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

      {/* Floating geometry — continuous, independent of scroll */}
      <FloatingShape
        variant="ring"
        className="top-[16rem] right-[6%] hidden size-16 lg:block"
        drift={18}
      />
      <FloatingShape
        variant="square"
        tone="ink"
        spin
        className="bottom-[10rem] left-[3%] hidden size-10 lg:block"
        drift={12}
        delay={0.8}
      />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          {/* Sticky anchor */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              index={editorial.index}
              eyebrow={editorial.eyebrow}
              heading={editorial.heading}
              intro={editorial.intro}
              className="[&_h2]:!text-h3"
            />

            <div data-cursor="view" className="group hidden lg:block">
              <MaskReveal
                from="up"
                delay={0.15}
                className="relative mt-12 aspect-[4/5] overflow-hidden rounded-plate"
              >
                <Parallax strength={7} scaleOut className="relative h-full w-full">
                  <Image
                    src={editorial.image.src}
                    alt=""
                    fill
                    sizes="22rem"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                  />
                </Parallax>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 max-w-[80%] font-mono text-[0.6875rem] tracking-[0.16em] text-paper uppercase">
                  / A studio is a set of positions before it is a portfolio.
                </p>
              </MaskReveal>
            </div>
          </div>

          {/* Beliefs list */}
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

                  <MaskReveal from="up" delay={index * 0.05}>
                    <p className="text-h3 text-balance text-ink transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:text-accent-ink">
                      {belief.text}
                    </p>
                  </MaskReveal>
                </div>
              </li>
            ))}

            <MaskReveal
              from="up"
              className="relative mt-4 aspect-[16/11] overflow-hidden rounded-plate lg:hidden"
            >
              <Image src={editorial.image.src} alt="" fill sizes="100vw" className="object-cover" />
            </MaskReveal>
          </ol>
        </div>
      </Container>
    </section>
  );
}
