import { cn } from '@/lib/utils/cn';

type MarqueeProps = {
  text: string;
  tone?: 'ink' | 'invert';
  className?: string;
};

/**
 * Continuous scrolling band closing the hero.
 *
 * CSS animation rather than GSAP — a linear infinite translate is exactly what
 * CSS is for, and it keeps a permanently-running animation off the JS thread.
 * `motion-reduce` stops it outright.
 */
export function Marquee({ text, tone = 'ink', className }: MarqueeProps) {
  const items = Array.from({ length: 4 });

  return (
    <div
      className={cn(
        'relative flex overflow-hidden border-y py-5',
        tone === 'ink' ? 'border-ink/12' : 'border-paper/15',
        className
      )}
    >
      {/* Two identical tracks; the second covers the seam as the first exits. */}
      {[0, 1].map((track) => (
        <div
          key={track}
          aria-hidden={track === 1 ? 'true' : undefined}
          className="flex shrink-0 items-center motion-safe:animate-[bhmr-marquee_38s_linear_infinite]"
        >
          {items.map((_, index) => (
            <span key={index} className="flex shrink-0 items-center">
              <span
                className={cn(
                  'px-8 font-display text-[clamp(1.5rem,3vw,2.5rem)] whitespace-nowrap',
                  tone === 'ink' ? 'text-ink/85' : 'text-paper/85'
                )}
              >
                {text}
              </span>
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rotate-45 bg-accent"
                style={{ borderRadius: '1px' }}
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
