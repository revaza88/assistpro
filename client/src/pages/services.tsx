import PageHeader from '@/components/PageHeader';
import { designCopy } from '@/lib/design-copy';
import { useTranslation } from "react-i18next";
import { Link } from 'wouter';
import { calculatorCopy } from '@/lib/calculator-copy';
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HomepageServicesOverview from "@/components/HomepageServicesOverview";

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  return (
    <div className="services-page min-h-screen">
      <Navigation />
      <main id="main-content" tabIndex={-1} className="catalog-main">
        <div className="design-wrap"><PageHeader eyebrow={t('nav.services')} title={designCopy(i18n.language).servicesTitle} description={designCopy(i18n.language).servicesSummary} /></div>
        <HomepageServicesOverview showAllLink={false} showHeader={false} />
        <div className="design-wrap pb-12"><Link href="/calculator" className="site-button site-button-outline">{calculatorCopy(i18n.language).nav}</Link></div>
      </main>
      <Footer />
    </div>
  );
}
