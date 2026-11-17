import { useTranslation } from "react-i18next";
import { Link } from 'wouter';
import { calculatorCopy } from '@/lib/calculator-copy';
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HomepageServicesOverview from "@/components/HomepageServicesOverview";

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-12">
        <h1 className="text-3xl font-bold text-brand-blue-700 text-center px-4 pt-8">{t('nav.services')}</h1>
        <HomepageServicesOverview showAllLink={false} />
        <div className="design-wrap pb-12"><Link href="/calculator" className="site-button site-button-outline">{calculatorCopy(i18n.language).nav}</Link></div>
      </main>
      <Footer />
    </div>
  );
}
