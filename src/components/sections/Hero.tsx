import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { LayerStack } from '@/components/visuals/LayerStack';
import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/lib/motion/Reveal';
import { TextReveal } from '@/lib/motion/TextReveal';
import { hero, site } from '@/content/home';

/**
 * Hero.
 *
 * The headline is the whole argument, so it gets the whole stage: the visual
 * sits behind and below it rather than competing for the same space, which is
 * the main thing the current site gets wrong (a thumbnail video punched into
 * the middle of a sentence).
 *
 * The closing clause runs in serif italic and accent — it is the punchline of
 * the sentence, and the current site drops it entirely.
 */
export function Hero() {
  return (
    <section id="top" className="bhmr-grain relative overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      {/* Visual sits behind the type on large screens, below it on small. */}
      <div
        className="pointer-events-none absolute top-[2%] right-[-5%] hidden h-[80%] w-[44%] lg:block"
        aria-hidden="true"
      >
        <LayerStack />
      </div>

      <Container width="wide" className="relative z-10">
        <Reveal immediate>
          <div className="flex items-center gap-3 text-meta font-medium tracking-[0.14em] text-muted uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            <span>{hero.eyebrow}</span>
            <span aria-hidden="true" className="h-3 w-px bg-ink/20" />
            <span>{site.location}</span>
          </div>
        </Reveal>

        <h1 className="mt-7 max-w-[20ch] font-display text-display lg:max-w-[23ch]">
          <TextReveal as="span" className="block text-ink" immediate delay={0.12}>
            {hero.headline.lead}{' '}
            <span className="text-accent-ink italic">{hero.headline.emphasis}</span>
          </TextReveal>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end lg:gap-16">
          <Reveal immediate delay={0.5}>
            <p className="text-lead text-muted">{hero.subline}</p>
          </Reveal>

          {/* Stacked full-width on phones — two pills wrapping onto separate
              lines at unequal widths looks accidental rather than designed. */}
          <Reveal
            immediate
            delay={0.62}
            stagger="base"
            className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center"
          >
            {hero.actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant}
                size="lg"
                className="w-full sm:w-auto"
              >
                {action.label}
              </Button>
            ))}
          </Reveal>
        </div>

        {/* Visual moves inline below the copy on small screens. */}
        <div className="relative mt-4 h-[19rem] sm:h-[23rem] lg:hidden" aria-hidden="true">
          <LayerStack />
        </div>
      </Container>

      <div className="relative z-10 mt-16 lg:mt-20">
        <Marquee text={hero.marquee} />
      </div>
    </section>
  );
}
