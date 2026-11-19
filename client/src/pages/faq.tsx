import PageHeader from '@/components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import FaqSection from '@/components/FaqSection';
import { requestCopy } from '@/lib/request-copy';

export default function FaqPage() {
  const { i18n } = useTranslation();
  const copy = requestCopy(i18n.language);
  return <div className="faq-page min-h-screen"><Navigation /><main id="main-content" tabIndex={-1}>
    <div className="design-wrap"><PageHeader title={copy.faq} description={copy.faqIntro} /></div>
    <FaqSection />
    <div className="design-wrap pb-12"><Link href="/industries" className="site-button">{copy.quote}</Link></div>
  </main><Footer /></div>;
}
