import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Adds the accent dot used in the hero and section openers. */
  marker?: boolean;
  tone?: 'ink' | 'invert';
};

/** Small tracked-out label that opens each section. */
export function Eyebrow({ children, className, marker = true, tone = 'ink' }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-meta font-medium tracking-[0.14em] uppercase',
        tone === 'ink' ? 'text-muted' : 'text-muted-invert',
        className
      )}
    >
      {marker && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />}
      {children}
    </p>
  );
}
