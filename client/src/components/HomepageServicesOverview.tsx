import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { designCopy } from '@/lib/design-copy';

const services = [['accounting','accounting'],['tax','tax'],['legal','legal'],['businessAssist','business'],['audit','audit'],['hr','hr']] as const;
export default function HomepageServicesOverview({ showAllLink = true }: { showAllLink?: boolean }) {
  const { t, i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  return <section id="services-overview" className="design-section"><div className="design-wrap">
    <header className="design-section-header"><div><div className="site-eyebrow">{copy.servicesEyebrow}</div><h2>{copy.servicesTitle}</h2></div><p>{copy.servicesSummary}</p></header>
    <div className="service-cards">{services.map(([key,slug],index) => <article className="service-card" key={key}><span className="service-card-number">0{index+1}</span><h3>{t('servicesOverview.'+key+'.title')}</h3><p>{t('servicesOverview.'+key+'.description')}</p><Link href={'/services/'+slug}>{t('common.learnMore')}<ArrowUpRight size={17} aria-hidden="true" /></Link></article>)}</div>
    {showAllLink && <div className="service-all"><Link href="/services" className="site-button site-button-outline">{t('servicesOverview.ctaAll')}</Link></div>}
  </div></section>;
}
