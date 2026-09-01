import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { MaskReveal, Parallax } from '@/lib/motion/primitives';
import { cta } from '@/content/home';

/**
 * Closing CTA — full-bleed generated plate, oversized caps, one magnetic
 * button. The brightest, largest moment on the page lands exactly where the
 * ask is.
 *
 * No form is built: forms are outside the POC boundary. The button is an
 * anchor to the section itself.
 */
export function CTASection() {
  return (
    <section id="start" className="bhmr-grain bhmr-grain-invert relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Parallax strength={9} className="h-full w-full">
          <Image
            src="/media/plate-cta.webp"
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/35 to-ink/80" />
      </div>

      <Container className="relative py-section">
        <div className="max-w-[60rem]">
          <MaskReveal from="up" drift={false}>
            <p className="flex items-center gap-4 font-mono text-meta tracking-[0.16em] text-muted-invert uppercase">
              <span className="text-accent">03</span>
              <span aria-hidden="true" className="h-px w-10 bg-paper/25" />
              {cta.eyebrow}
            </p>
          </MaskReveal>

          <MaskReveal
            as="h2"
            from="up"
            delay={0.06}
            className="bhmr-display mt-8 text-display text-paper"
          >
            {cta.heading}
          </MaskReveal>

          <MaskReveal from="up" delay={0.12} drift={false}>
            <p className="mt-8 max-w-[38rem] text-lead text-paper/70">{cta.body}</p>
          </MaskReveal>

          <MaskReveal from="up" delay={0.18} drift={false} className="mt-12">
            <Button href={cta.action.href} size="lg" magnetic>
              {cta.action.label}
            </Button>
          </MaskReveal>
        </div>
      </Container>
    </section>
  );
}
