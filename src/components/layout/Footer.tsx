import { Container } from '@/components/layout/Container';
import { FooterWordmark } from '@/components/layout/FooterWordmark';
import { MaskReveal } from '@/lib/motion/primitives';
import { footer, nav, site } from '@/content/home';

/**
 * Footer.
 *
 * Closes on an oversized wordmark that bleeds past both edges — the device
 * that lets a page end on a statement instead of trailing off into small
 * print. The registered-entity block is set to be read rather than buried at
 * 10px: for a studio arguing it is a real company rather than three
 * freelancers, CIN and GSTIN are doing persuasive work.
 */
export function Footer() {
  return (
    <footer className="bhmr-noise bhmr-noise-invert relative overflow-hidden bg-ink text-paper">
      <Container className="relative pt-20 pb-10 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <MaskReveal from="up" drift={false}>
              <p className="max-w-[34rem] text-h3 text-balance text-paper">{footer.recap}</p>
            </MaskReveal>

            <MaskReveal from="up" delay={0.08} drift={false}>
              <a
                href={`mailto:${footer.email}`}
                className="group mt-10 inline-flex min-h-11 items-center gap-3 text-lead text-accent"
              >
                <span className="relative">
                  {footer.email}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] motion-safe:group-hover:origin-left motion-safe:group-hover:scale-x-0"
                  />
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform duration-400 ease-[var(--ease-out-expo)] motion-safe:group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </a>
            </MaskReveal>
          </div>

          <div className="flex flex-col gap-9">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {nav.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative inline-flex min-h-11 items-center font-mono text-[0.75rem] tracking-[0.12em] text-paper/70 uppercase transition-colors duration-200 hover:text-paper"
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-400 ease-[var(--ease-out-expo)] group-hover:w-full"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="text-[0.9375rem] leading-relaxed text-muted-invert not-italic">
              {footer.address}
            </address>

            <dl className="flex flex-col gap-2">
              {footer.registration.map((item) => (
                <div key={item.label} className="flex gap-4 font-mono text-[0.75rem]">
                  <dt className="w-16 shrink-0 tracking-[0.14em] text-muted-invert uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-paper/70 tabular-nums">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="bhmr-rule-invert mt-16 flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.75rem] text-muted-invert">{footer.copyright}</p>
          <p className="font-mono text-meta tracking-[0.16em] text-muted-invert uppercase">
            {site.location}
          </p>
        </div>
      </Container>

      {/* Oversized wordmark — letters rise as the page bottoms out. */}
      <FooterWordmark />
    </footer>
  );
}
