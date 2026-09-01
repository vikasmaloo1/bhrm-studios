import { Container } from '@/components/layout/Container';
import { footer, nav, site } from '@/content/home';

/**
 * Minimal footer.
 *
 * Carries the real registered-entity details from the supplied copy — CIN,
 * GSTIN and D-U-N-S. For a studio arguing it is a real company rather than
 * three freelancers, that block is doing actual persuasive work, so it is set
 * to be read rather than buried at 10px.
 */
export function Footer() {
  return (
    <footer className="bhmr-grain bhmr-grain-invert relative bg-ink text-paper">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
          <div>
            <p className="max-w-[34rem] font-display text-h3 text-balance text-paper">
              {footer.recap}
            </p>

            <a
              href={`mailto:${footer.email}`}
              className="mt-8 inline-block border-b border-accent/40 pb-1 text-lead text-accent transition-colors duration-200 hover:border-accent"
            >
              {footer.email}
            </a>
          </div>

          <div className="flex flex-col gap-8">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {nav.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.9375rem] text-paper/70 transition-colors duration-200 hover:text-paper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="text-[0.9375rem] leading-relaxed text-muted-invert not-italic">
              {footer.address}
            </address>

            <dl className="flex flex-col gap-1.5">
              {footer.registration.map((item) => (
                <div key={item.label} className="flex gap-3 text-[0.8125rem]">
                  <dt className="w-16 shrink-0 tracking-[0.1em] text-muted-invert uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-paper/70 tabular-nums">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-muted-invert">{footer.copyright}</p>
          <p className="text-meta tracking-[0.14em] text-muted-invert uppercase">{site.location}</p>
        </div>
      </Container>
    </footer>
  );
}
