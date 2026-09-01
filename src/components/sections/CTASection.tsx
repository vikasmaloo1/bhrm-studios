import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/lib/motion/Reveal';
import { TextReveal } from '@/lib/motion/TextReveal';
import { cta } from '@/content/home';

/**
 * Closing CTA.
 *
 * Returns to paper after the dark process section so the page ends where it
 * started — and so the single accent button is the brightest thing on screen
 * at the moment of asking.
 *
 * No form is built here: forms are explicitly outside the POC boundary. The
 * button is a placeholder anchor.
 */
export function CTASection() {
  return (
    <section id="start" className="bhmr-grain relative overflow-hidden py-section">
      {/* Warm bloom anchoring the CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-80 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(255,74,28,0.13) 0%, rgba(255,74,28,0.04) 45%, transparent 70%)',
        }}
      />

      <Container width="text" className="relative z-10 text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>{cta.eyebrow}</Eyebrow>
        </Reveal>

        <TextReveal as="h2" className="mt-8 font-display text-h2 text-balance text-ink">
          {cta.heading}
        </TextReveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[36rem] text-lead text-muted">{cta.body}</p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex justify-center">
          <Button href={cta.action.href} size="lg">
            {cta.action.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
