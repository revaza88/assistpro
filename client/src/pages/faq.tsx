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
    <header className="max-w-4xl mx-auto px-5 pt-12"><h1 className="text-3xl sm:text-4xl font-bold text-brand-blue-700 mb-4">{copy.faq}</h1><p className="text-lg text-slate-600 leading-relaxed">{copy.faqIntro}</p></header>
    <FaqSection />
    <div className="text-center px-5 pb-12"><Link href="/industries" className="site-button">{copy.quote}</Link></div>
  </main><Footer /></div>;
}
