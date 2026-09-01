import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/ui/Cursor';
import { Hero } from '@/components/sections/Hero';
import { AddressSection } from '@/components/sections/AddressSection';
import { EditorialSection } from '@/components/sections/EditorialSection';
import { StatementSection } from '@/components/sections/StatementSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';

/**
 * BHMR Studios — homepage POC.
 *
 * Sections: Nav · Hero · The Honest Address · What We Believe ·
 * Statement (hinge) · How We Work · CTA · Footer.
 */
export default function Home() {
  return (
    <>
      <Cursor />
      <Navigation />
      <main id="main" tabIndex={-1} className="flex-1">
        <Hero />
        <AddressSection />
        <EditorialSection />
        <StatementSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
