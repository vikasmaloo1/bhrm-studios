'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { nav, site } from '@/content/home';
import { cn } from '@/lib/utils/cn';

/**
 * Fixed pill navigation.
 *
 * Desktop keeps the pill treatment already established on the current BHMR
 * site; it condenses once the page scrolls. Mobile gets a real full-height
 * sheet rather than a shrunken desktop bar — including focus containment and
 * scroll locking, because a menu that leaks focus to the page behind it is a
 * keyboard trap in the other direction.
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes; focus returns to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Move focus into the sheet when it opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector('a')?.focus();
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Must sit above the mobile sheet, otherwise the sheet paints over the
          close button and the only way out is Escape. */}
      <div
        className={cn(
          'relative z-50 mx-auto flex w-full items-center justify-between gap-6 px-gutter transition-all duration-500 ease-[var(--ease-out-expo)]',
          scrolled ? 'max-w-[64rem] pt-3' : 'max-w-[82rem] pt-5 sm:pt-7'
        )}
      >
        <div
          className={cn(
            'flex w-full items-center justify-between gap-6 rounded-pill border transition-all duration-500 ease-[var(--ease-out-expo)]',
            scrolled
              ? 'border-ink/10 bg-paper/85 py-2 pr-2 pl-3 shadow-[0_10px_40px_-24px_rgba(20,18,15,0.5)] backdrop-blur-xl'
              : 'border-transparent bg-transparent py-2 pr-2 pl-0'
          )}
        >
          <a
            href="#top"
            className="shrink-0 rounded-[0.3rem] bg-accent px-2.5 py-1.5 text-[0.75rem] font-semibold tracking-[0.02em] whitespace-nowrap text-ink uppercase sm:px-3 sm:text-[0.8125rem]"
          >
            {site.name}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative whitespace-nowrap text-[0.9375rem] text-ink/75 transition-colors duration-200 hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-300 after:ease-[var(--ease-out-expo)] hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Wrapper controls visibility. Putting `hidden` on the Button
                itself collides with its own `inline-flex`: both are display
                utilities, so stylesheet order decides the winner, not the
                order they appear in the class attribute. */}
            <span className="hidden sm:block">
              <Button href={nav.cta.href}>{nav.cta.label}</Button>
            </span>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-pill border border-ink/15 bg-paper/70 backdrop-blur-xl lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span
                  className={cn(
                    'absolute left-0 block h-px w-full bg-ink transition-all duration-300 ease-[var(--ease-out-expo)]',
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-px w-full bg-ink transition-all duration-300 ease-[var(--ease-out-expo)]',
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-0 z-40 bg-paper px-gutter pt-28 pb-10 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-5 font-display text-[2rem] leading-none text-ink"
            >
              <span className="mr-4 align-middle font-sans text-meta tracking-[0.14em] text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          href={nav.cta.href}
          size="lg"
          className="mt-9 w-full"
          onClick={() => setOpen(false)}
        >
          {nav.cta.label}
        </Button>

        <p className="mt-9 text-meta tracking-[0.14em] text-muted uppercase">{site.location}</p>
      </div>
    </header>
  );
}
