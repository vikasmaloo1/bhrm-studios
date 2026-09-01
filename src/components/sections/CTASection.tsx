import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { MaskReveal } from '@/lib/motion/primitives';
import { Scrub } from '@/lib/motion/Scrub';
import { cta } from '@/content/home';

/**
 * Closing CTA — the one deliberately dark section on the page besides the
 * footer, closing the white/black/orange system on a bookend rather than a
 * mid-page inversion.
 *
 * Background is flowing orange light on near-black — the owner specifically
 * asked to keep this look after seeing it live. It is regenerated as an
 * original asset (scripts/generate-media.py, `cta_flow`) rather than the
 * third-party-hosted version it replaces: same visual family, self-hosted,
 * no external domain dependency.
 */
export function CTASection() {
  return (
    <section
      id="start"
      className="bhmr-noise bhmr-noise-invert bhmr-panel relative overflow-hidden bg-ink"
      data-testid="cta-section"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80">
        <Scrub
          from={{ scale: 1.15 }}
          to={{ scale: 1 }}
          triggerParent
          className="relative h-full w-full"
        >
          <Image src="/media/cta-flow.webp" alt="" fill sizes="100vw" className="object-cover" />
        </Scrub>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />
      </div>

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
