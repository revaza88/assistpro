import '../page-system.css';
import { Link, useSearch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Calculator, Landmark, Scale, Building2, SearchCheck, UsersRound } from 'lucide-react';
import { inquiryEntryHref } from '@shared/calculator-context';
import { parseSelection, selectionHref } from '@shared/selection';
import { requestCopy } from '@/lib/request-copy';
import { interfaceCopy } from '@/lib/interface-copy';

const serviceKeys = { accounting: 'accounting', tax: 'tax', legal: 'legal', business: 'businessAssist', audit: 'audit', hr: 'hr' } as const;
const icons = { accounting: Calculator, tax: Landmark, legal: Scale, business: Building2, audit: SearchCheck, hr: UsersRound };
export default function ServiceIntro({ service }: { service: keyof typeof serviceKeys }) {
  const { t, i18n } = useTranslation(), search = useSearch();
  const copy = interfaceCopy(i18n.language), Icon = icons[service];
  const hasContext = /(?:^|[?&])(?:sector|services|service|source)=/.test(search);
  const href = hasContext ? inquiryEntryHref('/industries', search) : selectionHref('/industries', parseSelection('service=' + service)!);
  return <section className="service-intro"><div className="design-wrap">
    <Link href="/services" className="service-breadcrumb">{t('nav.services')}</Link>
    <div className="service-hero-grid"><div className="service-hero-heading">
      <Icon className="service-heading-icon" size={32} strokeWidth={1.5} aria-hidden="true" />
      <h1>{t('servicesOverview.' + serviceKeys[service] + '.title')}</h1>
    </div>
    <p className="page-lead service-description">{t('servicesOverview.' + serviceKeys[service] + '.description')}</p>
    <div className="service-next">
      <h2>{copy.next}</h2><p>{copy.choose}</p>
      <Link href={href} className="site-button">{requestCopy(i18n.language).quote}</Link>
      <a href="#service-details" className="service-detail-link">{copy.details}</a>
    </div></div>
  </div></section>;
}
