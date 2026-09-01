'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

type FitTextProps = {
  children: string;
  className?: string;
  /** Fraction of the container width to occupy. 1 = edge to edge. */
  fill?: number;
};

/**
 * Scales a single line of text so it exactly fits its container width.
 *
 * A `vw`-based font size cannot do this: the right size depends on how many
 * characters there are and how wide the chosen face draws them, so any fixed
 * `Nvw` either clips at some viewport or leaves a gap at another. Here the
 * natural width is measured once and the size solved from it, which is exact
 * at every width.
 *
 * Re-measures on resize and after web fonts load — a fallback face has
 * different metrics, so fitting before the real font arrives gives the wrong
 * answer.
 */
export function FitText({ children, className, fill = 1 }: FitTextProps) {
  const holder = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  const fit = useCallback(() => {
    const box = holder.current;
    const text = line.current;
    if (!box || !text) return;

    // Measure at a known size, then scale by the ratio. One reflow, no loop.
    //
    // The probe style is restored immediately, before setState. If the solved
    // size happens to equal the current state React skips the re-render, and
    // an un-restored probe would then be left painted on the element.
    const PROBE = 100;
    const previous = text.style.fontSize;
    text.style.fontSize = `${PROBE}px`;
    const natural = text.scrollWidth;
    text.style.fontSize = previous;
    if (!natural) return;

    setSize((box.clientWidth * fill * PROBE) / natural);
  }, [fill]);

  useEffect(() => {
    fit();

    const observer = new ResizeObserver(fit);
    if (holder.current) observer.observe(holder.current);

    // Fallback metrics differ from the real face; refit once it lands.
    document.fonts?.ready.then(fit).catch(() => {});

    return () => observer.disconnect();
  }, [fit, children]);

  return (
    <div ref={holder} className={cn('w-full overflow-hidden', className)}>
      <span
        ref={line}
        className="block whitespace-nowrap"
        style={{
          fontSize: size ? `${size}px` : undefined,
          // Hide until solved, so the probe size is never painted.
          visibility: size ? undefined : 'hidden',
        }}
      >
        {children}
      </span>
    </div>
  );
}
