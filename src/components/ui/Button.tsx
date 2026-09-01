import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'ghost' | 'invert';
type Size = 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className'>;

/**
 * Motion pattern 5 — hover micro-interaction.
 *
 * The arrow travels and the surface lifts. Both are CSS transitions rather
 * than GSAP: it is cheaper, it survives reduced-motion via the media query
 * below, and GSAP earns nothing here.
 */
const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-pill font-medium ' +
  'transition-[transform,background-color,color,border-color] duration-300 ease-[var(--ease-out-expo)] ' +
  'motion-safe:hover:-translate-y-0.5 whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Ink on orange, not paper on orange: the latter is only 2.9:1.
  primary: 'bg-accent text-ink hover:bg-accent-hover',
  ghost: 'border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.04]',
  invert: 'bg-paper text-ink hover:bg-white',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

export function Button({
  children,
  href = '#',
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  return (
    <a href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] motion-safe:group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </a>
  );
}
