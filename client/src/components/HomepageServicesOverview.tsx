import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Calculator, Landmark, Scale, Building2, SearchCheck, UsersRound } from 'lucide-react';
import { designCopy } from '@/lib/design-copy';

const services = [['accounting','accounting'],['tax','tax'],['legal','legal'],['businessAssist','business'],['audit','audit'],['hr','hr']] as const;
const serviceIcons = [Calculator, Landmark, Scale, Building2, SearchCheck, UsersRound];
export default function HomepageServicesOverview({ showAllLink = true }: { showAllLink?: boolean }) {
  const { t, i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  return <section id="services-overview" className="design-section"><div className="design-wrap">
    <header className="design-section-header"><div><div className="site-eyebrow">{copy.servicesEyebrow}</div><h2>{copy.servicesTitle}</h2></div><p>{copy.servicesSummary}</p></header>
    <div className="service-cards">{services.map(([key,slug],index) => { const Icon = serviceIcons[index]; const title = t('servicesOverview.'+key+'.title'); return <article className="service-card" key={key}><div className="service-card-heading"><Icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><h3>{title}</h3><p>{t('servicesOverview.'+key+'.description')}</p><Link href={'/services/'+slug} aria-label={t('common.learnMore') + ': ' + title}>{t('common.learnMore')}</Link></article>; })}</div>
    {showAllLink && <div className="service-all"><Link href="/services" className="site-button site-button-outline">{t('servicesOverview.ctaAll')}</Link></div>}
  </div></section>;
}
