import { Link, useSearch } from 'wouter';
import { useTranslation } from 'react-i18next';
import Navigation from './navigation';
import Footer from './footer';
import ServiceIntro, { serviceSelectionHref } from './ServiceIntro';
import { pageSeo } from '@shared/seo';
import { requestCopy } from '@/lib/request-copy';
import type copyType from '@/lib/service-search/ka';

type Service = 'accounting' | 'tax' | 'audit';
export default function ServiceLanding({ service }: { service: Service }) {
  const { t, i18n } = useTranslation(), search = useSearch();
  const copy = t('serviceSearch', {returnObjects:true}) as typeof copyType;
  const data = copy[service], labels = copy.labels, meta = pageSeo('/services/'+service,i18n.language);
  return <div className="service-page min-h-screen flex flex-col"><Navigation />
    <main id="main-content" tabIndex={-1} className="flex-grow">
      <ServiceIntro service={service} title={meta.label} description={meta.description} />
      <div id="service-details" className="service-content design-wrap"><article>
        <section aria-labelledby="service-audience"><h2 id="service-audience">{labels.audience}</h2><p>{data.audience}</p></section>
        <section aria-labelledby="service-includes"><h2 id="service-includes">{labels.includes}</h2><ul className="service-answer-list">{data.includes.map(item=><li key={item}>{item}</li>)}</ul></section>
        <section aria-labelledby="service-excludes"><h2 id="service-excludes">{labels.excludes}</h2><p>{data.excludes}</p></section>
        <section aria-labelledby="service-start"><h2 id="service-start">{labels.start}</h2><ol className="service-answer-list service-answer-steps">{data.start.map(item=><li key={item}>{item}</li>)}</ol></section>
        <section aria-labelledby="service-price"><h2 id="service-price">{labels.price}</h2><p>{data.price}</p><Link href="/calculator" className="service-detail-link">{t('nav.calculator', {defaultValue:i18n.language.startsWith('en')?'Demo calculator':i18n.language.startsWith('ru')?'Демо-калькулятор':'დემო კალკულატორი'})}</Link></section>
        <section aria-labelledby="service-questions"><h2 id="service-questions">{labels.faq}</h2>{data.faq.map(item=><div className="service-answer" key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}</section>
        <section aria-labelledby="service-sources"><h2 id="service-sources">{labels.sources}</h2><p>{labels.sourceNote}</p><ul className="service-answer-list">
          {service !== 'audit' && <li><a href="https://matsne.gov.ge/ka/document/view/1043717" lang="ka">საქართველოს საგადასახადო კოდექსი — Matsne</a></li>}
          {service !== 'tax' && <li><a href="https://www.saras.gov.ge/ka/Faq">SARAS — {i18n.language.startsWith('en')?'reporting and audit requirements':i18n.language.startsWith('ru')?'отчётность и аудит':'ანგარიშგება და აუდიტი'}</a></li>}
          {service === 'audit' && <li><a href="https://www.saras.gov.ge/ka/Home/Supervision">SARAS — {i18n.language.startsWith('en')?'audit register and supervision':i18n.language.startsWith('ru')?'реестр и надзор':'რეესტრი და ზედამხედველობა'}</a></li>}
        </ul><p className="calculator-help"><time dateTime="2026-11-20">{labels.checked}</time></p></section>
        <section className="service-cta bg-brand-blue-600 rounded-xl"><h2>{labels.next}</h2><p>{labels.nextText}</p><Link href={serviceSelectionHref(service,search)} className="site-button">{requestCopy(i18n.language).quote}</Link></section>
      </article></div>
    </main><Footer />
  </div>;
}
