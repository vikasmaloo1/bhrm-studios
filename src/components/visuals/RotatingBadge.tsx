import { cn } from '@/lib/utils/cn';

type RotatingBadgeProps = {
  className?: string;
};

/**
 * Continuously rotating circular wordmark with a counter-orbiting accent dot.
 * Pure CSS animation — a linear infinite rotate belongs off the JS thread —
 * and `motion-safe` stops both under reduced motion.
 */
export function RotatingBadge({ className }: RotatingBadgeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative grid place-items-center rounded-full border border-ink/10 bg-paper/90 shadow-[0_20px_50px_-24px_rgba(10,10,10,0.4)] backdrop-blur-md',
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full motion-safe:animate-[bhmr-spin_16s_linear_infinite]"
      >
        <defs>
          <path
            id="bhmr-badge-circle"
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="none"
          />
        </defs>
        <text
          className="fill-ink uppercase"
          style={{ fontSize: '7px', letterSpacing: '1.1px', fontFamily: 'var(--font-mono)' }}
        >
          <textPath href="#bhmr-badge-circle">Brand · Product · Front end · Back end ·</textPath>
        </text>
      </svg>

      {/* Counter-orbiting dot riding the badge rim. */}
      <span className="absolute inset-1.5 motion-safe:animate-[bhmr-spin-reverse_9s_linear_infinite]">
        <span className="absolute top-0 left-1/2 -ml-[3px] size-1.5 rounded-full bg-accent" />
      </span>

      <svg
        viewBox="0 0 16 16"
        className="relative size-[22%] text-accent-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12 12 4M5.5 4H12v6.5" />
      </svg>
    </div>
  );
}
