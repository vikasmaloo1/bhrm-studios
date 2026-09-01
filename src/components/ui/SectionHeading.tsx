import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { MaskReveal } from '@/lib/motion/primitives';

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  heading: ReactNode;
  intro?: ReactNode;
  tone?: 'ink' | 'invert';
  className?: string;
  as?: 'h2' | 'h3';
};

/**
 * The shared section opener: mono index + label, heavy display heading,
 * optional intro. Every section uses it, which is most of what makes the page
 * read as one system rather than a stack of separate ideas.
 */
export function SectionHeading({
  index,
  eyebrow,
  heading,
  intro,
  tone = 'ink',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const invert = tone === 'invert';

  return (
    <div className={cn('max-w-[54rem]', className)}>
      <MaskReveal from="up" drift={false}>
        <p
          className={cn(
            'flex items-center gap-4 font-mono text-meta tracking-[0.16em] uppercase',
            invert ? 'text-muted-invert' : 'text-muted'
          )}
        >
          <span className={invert ? 'text-accent' : 'text-accent-ink'}>{index}</span>
          <span
            aria-hidden="true"
            className={cn('h-px w-10', invert ? 'bg-paper/25' : 'bg-ink/25')}
          />
          {eyebrow}
        </p>
      </MaskReveal>

      <MaskReveal
        as={Tag}
        from="up"
        delay={0.06}
        className={cn('bhmr-display mt-6 text-h2', invert ? 'text-paper' : 'text-ink')}
      >
        {heading}
      </MaskReveal>

      {intro && (
        <MaskReveal from="up" delay={0.12} drift={false}>
          <p
            className={cn(
              'mt-7 max-w-[42rem] text-lead',
              invert ? 'text-muted-invert' : 'text-muted'
            )}
          >
            {intro}
          </p>
        </MaskReveal>
      )}
    </div>
  );
}
