import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { Magnetic } from '@/lib/motion/primitives';

type Variant = 'primary' | 'ghost' | 'invert' | 'invertGhost';
type Size = 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Lean toward the pointer on hover. Fine pointers only. */
  magnetic?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className'>;

/**
 * The label sits in its own clip, and a duplicate rides underneath: on hover
 * the pair slides up together, so the text swaps rather than just changing
 * colour. Paired with a fill that wipes up from the bottom edge.
 *
 * Both are CSS transitions — cheap, and they disappear correctly under
 * `motion-reduce` without any JS involvement.
 */
const base = [
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-pill',
  // Was font-mono + uppercase + 0.1em tracking: fine for short labels, but
  // "Start a Conversation" at that letter-spacing doesn't fit the button on
  // mobile and gets clipped by the button's own overflow-hidden (confirmed
  // on the live site, both here and on the hero CTAs). Plain sentence case
  // in the site's regular sans is both narrower and matches the reference.
  'font-sans text-[0.9375rem] font-semibold whitespace-nowrap',
  'transition-[color,border-color] duration-300 ease-[var(--ease-out-expo)]',
].join(' ');

const variants: Record<Variant, { shell: string; fill: string }> = {
  // White on orange per the client's explicit direction, at this size (bold,
  // ~15px) still short of WCAG AA's 4.5:1 for normal text — it measures
  // ~3.1:1. Noted, not blocking: it's the client's own brand call.
  primary: { shell: 'bg-accent text-paper', fill: 'bg-accent-hover' },
  ghost: { shell: 'border border-ink/25 text-ink hover:border-ink/50', fill: 'bg-ink/[0.06]' },
  invert: { shell: 'bg-paper text-ink', fill: 'bg-white' },
  invertGhost: {
    shell: 'border border-paper/30 text-paper hover:border-paper/60',
    fill: 'bg-paper/[0.08]',
  },
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6',
  lg: 'h-14 px-8 text-[0.875rem]',
};

export function Button({
  children,
  href = '#',
  variant = 'primary',
  size = 'md',
  className,
  magnetic = false,
  ...rest
}: ButtonProps) {
  const v = variants[variant];

  const button = (
    <a href={href} className={cn(base, v.shell, sizes[size], className)} {...rest}>
      {/* Fill wipes up from the bottom edge on hover. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-400 ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-y-100',
          v.fill
        )}
      />

      {/* Label swap. The visible copy slides out as its twin slides in. */}
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-400 ease-[var(--ease-out-expo)] motion-safe:group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-400 ease-[var(--ease-out-expo)] motion-safe:group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="relative h-3.5 w-3.5 shrink-0 transition-transform duration-400 ease-[var(--ease-out-expo)] motion-safe:group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </a>
  );

  if (!magnetic) return button;
  // The wrapper has to mirror the button's own responsive width, otherwise a
  // `w-full sm:w-auto` button stays full-width forever inside a w-full shell.
  return (
    <Magnetic className={cn('inline-flex', className?.includes('w-full') && 'w-full sm:w-auto')}>
      {button}
    </Magnetic>
  );
}
