import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { AddressSection } from '@/components/sections/AddressSection';
import { ClientTypesSection } from '@/components/sections/ClientTypesSection';
import { EditorialSection } from '@/components/sections/EditorialSection';
import { StatementSection } from '@/components/sections/StatementSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * BHMR Studios — homepage POC.
 *
 * Sections: Nav · Hero · The Honest Address · Who We Work With ·
 * What We Believe · Statement (hinge) · How We Work · CTA · Footer.
 *
 * No custom cursor — the previous pass had an orange dot-and-ring following
 * the pointer everywhere, which was part of what read as "gaming" rather
 * than a professional studio site. Removed along with the other continuous
 * decorative motion (rotating sun, floating disc, orbiting badge).
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero />
        <AddressSection />
        <ClientTypesSection />
        <EditorialSection />
        <StatementSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
