import { useTranslation } from 'react-i18next';
import { designCopy } from '@/lib/design-copy';

export default function HowWeWorkSection() {
  const { i18n } = useTranslation();
  const copy = designCopy(i18n.language);
  return <section id="process" className="process-section"><div className="design-wrap">
    <div className="site-eyebrow">{copy.processEyebrow}</div><h2 className="process-heading">{copy.processTitle}</h2>
    <div className="process-steps">{copy.steps.map(([title,text],index) => <article className="process-step" key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
  </div></section>;
}
