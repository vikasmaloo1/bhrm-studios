import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { FloatingShape } from '@/components/visuals/FloatingShape';
import { MaskReveal } from '@/lib/motion/primitives';
import { Scrub } from '@/lib/motion/Scrub';
import { cta } from '@/content/home';

/**
 * Closing CTA — dark scene over flowing orange light, the background scaling
 * down under your scroll, floating geometry drifting in the margins.
 */
export function CTASection() {
  return (
    <section
      id="start"
      className="bhmr-noise bhmr-noise-invert relative overflow-hidden bg-ink"
      data-testid="cta-section"
    >
      {/* Background — scroll-linked scale, so the light field settles as you arrive */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <Scrub
          from={{ scale: 1.25 }}
          to={{ scale: 1 }}
          triggerParent
          className="relative h-full w-full"
        >
          <Image src={cta.image.src} alt="" fill sizes="100vw" className="object-cover" />
        </Scrub>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink" />
      </div>

      {/* Floating geometry */}
      <FloatingShape
        variant="ring"
        tone="paper"
        className="top-[18%] right-[8%] hidden size-20 lg:block"
        drift={20}
      />
      <FloatingShape
        variant="cross"
        tone="accent"
        spin
        className="bottom-[22%] right-[16%] hidden size-8 lg:block"
        drift={12}
        delay={1}
      />

      {/* Big orange rule near top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent"
      />

      <Container className="relative py-section">
        <div className="max-w-[62rem]">
          <MaskReveal from="up" drift={false}>
            <p className="flex items-center gap-4 font-mono text-meta tracking-[0.16em] text-muted-invert uppercase">
              <span className="text-accent">{cta.index}</span>
              <span aria-hidden="true" className="h-px w-10 bg-paper/25" />
              {cta.eyebrow}
            </p>
          </MaskReveal>

          <MaskReveal
            as="h2"
            from="up"
            delay={0.06}
            className="bhmr-display mt-10 text-display text-paper"
          >
            {cta.heading}
          </MaskReveal>

          <MaskReveal from="up" delay={0.12} drift={false}>
            <p className="mt-10 max-w-[42rem] text-lead text-paper/70">{cta.body}</p>
          </MaskReveal>

          <MaskReveal from="up" delay={0.18} drift={false} className="mt-14">
            <Button href={cta.action.href} size="lg" magnetic data-testid="cta-button">
              {cta.action.label}
            </Button>
          </MaskReveal>

          {/* Meta strip */}
          <MaskReveal from="up" delay={0.24} drift={false}>
            <dl className="bhmr-rule-invert mt-20 grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-3 lg:mt-28">
              {cta.meta.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-meta tracking-[0.16em] text-muted-invert uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] text-paper">{item.value}</dd>
                </div>
              ))}
            </dl>
          </MaskReveal>
        </div>
      </Container>
    </section>
  );
}
