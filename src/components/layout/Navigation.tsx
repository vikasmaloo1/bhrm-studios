'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { nav, site } from '@/content/home';
import { cn } from '@/lib/utils/cn';

/**
 * Fixed pill navigation.
 *
 * Desktop keeps the pill treatment already established on the current BHMR
 * site; it condenses once the page scrolls. Mobile opens a compact card
 * anchored under the pill — not a full-screen takeover — matching the
 * current live site's own menu pattern: rounded corners, a normal-weight
 * link list and the CTA inside the card, closed by tapping outside it, the
 * toggle itself, or Escape. Still gets real focus containment and scroll
 * locking while open, because a menu that leaks focus to the page behind it
 * is a keyboard trap in the other direction.
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

  // Move focus into the card when it opens — onto the card itself, not its
  // first link. Focusing the link drew a highly visible focus ring across
  // it on every open (mouse clicks included, since a programmatic .focus()
  // call reads as keyboard-style focus to the browser), which doesn't
  // happen in the reference and isn't something a user chose by tabbing to
  // it. The card is still a real focus target (`tabIndex={-1}`), so screen
  // readers and keyboard users land inside the menu; Tab from there reaches
  // the links normally.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50" data-testid="site-header">
      {/* Four nav stops sit before the content; give keyboard users a way past. */}
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-60 focus-visible:rounded-pill focus-visible:bg-ink focus-visible:px-5 focus-visible:py-3 focus-visible:text-[0.875rem] focus-visible:text-paper"
      >
        Skip to content
      </a>

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
            'flex w-full items-center justify-between gap-6 rounded-pill border py-2 pr-2 pl-3 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-out-expo)]',
            // Always visible — a thin accent border and a light fill on the
            // pill at all times, not transparent-until-scroll. Fixed nav
            // sitting over scrolling content needs its own background from
            // the first frame (confirmed on the live site, text was running
            // behind it with nothing there), and the reference keeps the
            // orange outline on every breakpoint, not just after scrolling.
            scrolled
              ? 'border-accent/60 bg-paper shadow-[0_10px_40px_-24px_rgba(20,18,15,0.5)]'
              : 'border-accent/50 bg-paper/90'
          )}
        >
          <a
            href="#top"
            className="bhmr-display inline-flex min-h-9 shrink-0 items-center rounded-[0.35rem] bg-accent px-3 text-[0.75rem] tracking-[-0.01em] whitespace-nowrap text-paper sm:px-3.5 sm:text-[0.8125rem]"
          >
            {site.name}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.href.replace('#', '')}`}
                className="relative font-sans text-[0.9375rem] whitespace-nowrap text-ink/75 transition-colors duration-200 hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-300 after:ease-[var(--ease-out-expo)] hover:after:w-full"
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
              <Button href={nav.cta.href} magnetic>
                {nav.cta.label}
              </Button>
            </span>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-testid="mobile-menu-toggle"
              className={cn(
                'flex size-11 items-center justify-center border backdrop-blur-xl transition-all duration-300 ease-[var(--ease-out-expo)] lg:hidden',
                open
                  ? 'rounded-xl border-accent bg-paper'
                  : 'rounded-pill border-ink/15 bg-paper/70'
              )}
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

        {/* Tap-outside-to-close catcher — sits behind the card, in front of
          the page. Not `hidden` when closed, just untouchable and invisible,
          so it never blocks a click on the page underneath. */}
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={cn(
            'fixed inset-0 z-30 cursor-default lg:hidden',
            open ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        />

        {/* Mobile menu — a compact card anchored under the pill, not a
          full-screen takeover: it stays a dropdown off the nav itself,
          matching the current live site's pattern rather than the previous
          pass's oversized full-viewport sheet. */}
        <div
          id="mobile-menu"
          ref={panelRef}
          tabIndex={-1}
          inert={!open}
          aria-hidden={!open}
          data-testid="mobile-menu-panel"
          className={cn(
            'absolute top-full left-gutter right-gutter z-40 mt-3 origin-top rounded-[1.75rem] border border-ink/10 bg-paper p-5 shadow-[0_30px_80px_-30px_rgba(20,18,15,0.35)] transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] outline-none lg:hidden',
            open
              ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
          )}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-5">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${link.href.replace('#', '')}`}
                className="text-lead text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button href={nav.cta.href} className="mt-5 w-full" onClick={() => setOpen(false)}>
            {nav.cta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
