import { Container } from '@/components/layout/Container';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { MaskReveal } from '@/lib/motion/primitives';
import { mediaBand } from '@/content/home';

/**
 * Triptych band between the hero and the positioning section.
 *
 * Three frames at different heights, offset vertically and travelling at
 * different parallax rates, so the relationship between them changes as you
 * scroll rather than the row moving as one block. This is the moment the page
 * stops being a column of text and starts behaving like a composition.
 *
 * The captions carry the argument — structure, craft, process — so the images
 * are doing work rather than decorating.
 */
export function MediaBand() {
  return (
    <section className="bhmr-grain relative py-section">
      <Container width="wide">
        <MaskReveal from="up" drift={false}>
          <p className="flex items-center gap-4 font-mono text-meta tracking-[0.16em] text-muted uppercase">
            <span className="text-accent-ink">—</span>
            {mediaBand.label}
          </p>
        </MaskReveal>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {mediaBand.items.map((item, index) => (
            <MediaFrame
              key={item.src}
              src={item.src}
              alt={item.alt}
              aspect={item.aspect}
              index={item.index}
              caption={item.caption}
              delay={index * 0.08}
              parallax={item.parallax}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 30vw"
              className={
                // Staggered vertical offsets: a flat row of three reads as a
                // grid, an offset row reads as a composition.
                index === 1
                  ? 'lg:mt-24'
                  : index === 2
                    ? 'col-span-2 lg:col-span-1 lg:mt-10'
                    : undefined
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
