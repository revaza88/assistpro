import { Check } from 'lucide-react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { requestCopy } from '@/lib/request-copy';
import { designCopy } from '@/lib/design-copy';
import { calculatorCopy } from '@/lib/calculator-copy';
import { brandSlogan } from '@/lib/company';

export default function HeroSection() {
  const { i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  return <>
    <section id="hero" className="site-hero"><div className="design-wrap hero-grid">
      <div className="hero-copy"><div className="site-eyebrow" lang="ka">{brandSlogan}</div><h1 className="hero-heading"><span>{copy.titleLead}</span>{' '}<span className="hero-heading-support">{copy.titleSupport}</span></h1><p className="hero-summary">{copy.summary}</p>
        <div className="hero-actions"><Link href="/industries" className="site-button">{requestCopy(i18n.language).quote}</Link><Link href="/calculator" className="site-button site-button-outline">{calculatorCopy(i18n.language).nav}</Link></div>
        <p className="hero-note">{copy.note}</p>
      </div>
      <div className="report-scene" role="img" aria-label={copy.illustration + ' — ' + copy.report}>
        <div className="report-paper" aria-hidden="true"><div className="report-meta"><span>{copy.overview}</span><span className="report-index">01 — 06</span></div><div className="report-title">{copy.report}</div><p className="report-caption">{copy.chart}</p><strong className="report-amount">₾ 48,250</strong>
          <svg className="report-chart" viewBox="0 0 360 148" fill="none" aria-hidden="true" focusable="false">
            <defs><pattern id="report-active-hatch" patternUnits="userSpaceOnUse" width="8" height="8"><rect width="8" height="8" className="report-chart-active-fill" /><path d="M-2 2L2-2M0 8L8 0M6 10L10 6" className="report-chart-hatch" /></pattern></defs>
            {[36,76,116].map(y => <path key={y} d={`M0 ${y}H360`} className="report-chart-rule" />)}
            {[42,60,52,88,114,102].map((height,index) => <rect key={index} x={index*61+6} y={136-height} width="40" height={height} rx="5" className={index === 4 ? 'report-chart-bar report-chart-bar-active' : 'report-chart-bar'} />)}
            <path d="M26 91L87 73L148 81L209 45L270 19L331 31" className="report-chart-trend" />
            <circle cx="270" cy="19" r="5" className="report-chart-point" />
          </svg><div className="report-axis"><span>{copy.january}</span><span>{copy.june}</span></div>
        </div>
        <div className="report-stamp" aria-hidden="true"><Check size={22} strokeWidth={1.75} /><div>{copy.stamp}<small>{copy.stampNote}</small></div></div><span className="report-disclaimer">{copy.illustration}</span>
      </div>
    </div></section>
    <div className="design-wrap"><div className="service-strip">{copy.strip.map(text => <span key={text}>{text}</span>)}</div></div>
  </>;
}
