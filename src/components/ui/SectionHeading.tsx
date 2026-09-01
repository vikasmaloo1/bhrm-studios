import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { Eyebrow } from './Eyebrow';
import { Reveal } from '@/lib/motion/Reveal';
import { TextReveal } from '@/lib/motion/TextReveal';

type SectionHeadingProps = {
  eyebrow: string;
  heading: ReactNode;
  intro?: ReactNode;
  tone?: 'ink' | 'invert';
  className?: string;
  /** Heading level. Sections use h2; the hero sets its own h1. */
  as?: 'h2' | 'h3';
};

/**
 * The shared section opener: eyebrow, display heading, optional intro.
 *
 * Every section using this gets the same rhythm and the same reveal, which is
 * most of what makes the page feel like one system rather than four blocks.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  tone = 'ink',
  className,
  as = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-[52rem]', className)}>
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>

      <TextReveal
        as={as}
        className={cn(
          'mt-7 font-display text-h2 text-balance',
          tone === 'ink' ? 'text-ink' : 'text-paper'
        )}
      >
        {heading}
      </TextReveal>

      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'mt-7 max-w-[42rem] text-lead',
              tone === 'ink' ? 'text-muted' : 'text-muted-invert'
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
