import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { MaskReveal, Parallax } from '@/lib/motion/primitives';

type MediaFrameProps = {
  src: string;
  /** Decorative by default; pass alt only when the image carries meaning. */
  alt?: string;
  className?: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  /** Direction the clip mask opens from. */
  from?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  /** Parallax travel. 0 disables it. */
  parallax?: number;
  /** Mono caption rendered beneath the frame. */
  caption?: string;
  /** Index label shown top-left inside the frame. */
  index?: string;
  /** Square corners for full-bleed bands. */
  square?: boolean;
  objectPosition?: string;
};

/**
 * The single way an image enters the page.
 *
 * Mask reveal, parallax, caption and index all live here, so every photograph
 * arrives the same way and the media reads as one art-directed set rather
 * than a handful of separately-styled pictures.
 *
 * The image is always slightly overscaled inside its frame: parallax moves it
 * within the clip, and without the overscan the crop would show an edge.
 */
export function MediaFrame({
  src,
  alt = '',
  className,
  aspect = 'aspect-[4/5]',
  sizes,
  priority = false,
  from = 'up',
  delay = 0,
  parallax = 8,
  caption,
  index,
  square = false,
  objectPosition,
}: MediaFrameProps) {
  const frame = (
    <div
      className={cn(
        'relative overflow-hidden bg-paper-deep',
        square ? 'rounded-none' : 'rounded-plate',
        aspect
      )}
    >
      {parallax > 0 ? (
        <Parallax strength={parallax} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="scale-[1.14] object-cover"
            style={objectPosition ? { objectPosition } : undefined}
          />
        </Parallax>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}

      {index && (
        <span className="absolute top-4 left-4 z-10 rounded-pill bg-ink/70 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.16em] text-paper uppercase backdrop-blur-sm">
          {index}
        </span>
      )}
    </div>
  );

  return (
    <figure className={className}>
      <MaskReveal from={from} delay={delay} drift={false}>
        {frame}
      </MaskReveal>
      {caption && (
        <figcaption className="mt-3 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
