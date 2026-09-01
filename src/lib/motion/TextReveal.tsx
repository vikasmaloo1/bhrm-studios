'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { REVEAL_START, duration, ease, stagger } from './tokens';
import { ensureGsap, useIsomorphicLayoutEffect, useShouldAnimate } from './gsap';

/**
 * Splits an element's text into visual lines and wraps each in a clipping mask.
 *
 * GSAP's own SplitText is a paid plugin, so lines are derived by measuring
 * where each word lands: words sharing an `offsetTop` are on the same line.
 * That keeps the effect correct at any width, which a hard-coded line split
 * would not be.
 *
 * Returns the elements to animate, or `null` if the structure was unexpected —
 * callers then fall back to animating the element as a single unit.
 */
function splitIntoLineMasks(el: HTMLElement): HTMLElement[] | null {
  const segments: { text: string; className: string }[] = [];

  // Accept plain text plus one level of inline spans (used for the accent
  // clause in the hero headline). Anything deeper is not worth guessing at.
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      segments.push({ text: node.textContent ?? '', className: '' });
    } else if (node instanceof HTMLElement && node.children.length === 0) {
      segments.push({ text: node.textContent ?? '', className: node.className });
    } else {
      return null;
    }
  }

  const words: HTMLElement[] = [];
  const fragment = document.createDocumentFragment();

  for (const segment of segments) {
    const parts = segment.text.split(/(\s+)/);
    for (const part of parts) {
      if (part === '') continue;
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(' '));
        continue;
      }
      const word = document.createElement('span');
      word.textContent = part;
      word.style.display = 'inline-block';
      if (segment.className) word.className = segment.className;
      words.push(word);
      fragment.appendChild(word);
    }
  }

  if (words.length === 0) return null;

  el.replaceChildren(fragment);

  // Group words by vertical position.
  const lines: HTMLElement[][] = [];
  let currentTop: number | null = null;
  for (const word of words) {
    const top = word.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 2) {
      lines.push([word]);
      currentTop = top;
    } else {
      lines[lines.length - 1].push(word);
    }
  }

  // Rebuild as mask > mover > words.
  const movers: HTMLElement[] = [];
  const rebuilt = document.createDocumentFragment();
  for (const line of lines) {
    const mask = document.createElement('span');
    mask.className = 'bhmr-line-mask';

    const mover = document.createElement('span');
    mover.style.display = 'block';

    line.forEach((word, index) => {
      if (index > 0) mover.appendChild(document.createTextNode(' '));
      word.style.display = 'inline';
      mover.appendChild(word);
    });

    mask.appendChild(mover);
    rebuilt.appendChild(mask);
    movers.push(mover);
  }

  el.replaceChildren(rebuilt);
  return movers;
}

type TextRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Play immediately (hero) rather than waiting for scroll. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Motion patterns 1 and 2 — hero entrance and scroll text reveal.
 *
 * Lines rise out of their own clipping mask. Used for the hero headline and
 * every section heading, which is what ties the page together typographically.
 */
export function TextReveal({
  children,
  as: Tag = 'div',
  className,
  immediate = false,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldAnimate = useShouldAnimate();

  useIsomorphicLayoutEffect(() => {
    if (!shouldAnimate) return;
    const el = ref.current;
    if (!el) return;

    const gsap = ensureGsap();
    const original = el.cloneNode(true);
    let ctx: gsap.Context | undefined;

    // Fonts change line breaks. Splitting before they load produces masks in
    // the wrong places, so wait for them where the browser supports it.
    let cancelled = false;
    const run = () => {
      if (cancelled || !ref.current) return;
      const movers = splitIntoLineMasks(el);

      ctx = gsap.context(() => {
        gsap.from(movers ?? el, {
          yPercent: movers ? 108 : 0,
          opacity: movers ? 1 : 0,
          duration: duration.reveal,
          ease: ease.out,
          delay,
          stagger: stagger.base,
          scrollTrigger: immediate ? undefined : { trigger: el, start: REVEAL_START, once: true },
        });
      }, el);
    };

    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(run, run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
      // Restore the un-split markup so React's view of the DOM stays valid.
      if (ref.current) ref.current.replaceChildren(...Array.from(original.childNodes));
    };
  }, [shouldAnimate, immediate, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
