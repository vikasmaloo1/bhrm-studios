import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { EditorialSection } from '@/components/sections/EditorialSection';
import { StatementSection } from '@/components/sections/StatementSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * BHMR Studios — proof of concept.
 *
 * Scope is deliberately bounded to navigation, hero, one editorial section,
 * one process section, a CTA and a footer. The remaining eight pages, the
 * multi-step enquiry form and all integrations are out of scope — see
 * docs/poc/POC_REVIEW.md.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero />
        <EditorialSection />
        <StatementSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
