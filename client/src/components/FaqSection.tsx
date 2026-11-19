import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { requestCopy } from '@/lib/request-copy';
import { faqItems } from '@/lib/faq-copy';
import { Plus } from 'lucide-react';

export default function FaqSection({ compact = false }: { compact?: boolean }) {
  const { i18n } = useTranslation();
  const copy = requestCopy(i18n.language);
  const items = faqItems(i18n.language);
  return <section className="site-faq max-w-4xl mx-auto px-5 py-12 text-slate-700" aria-label={copy.faq}>
    {compact && <h2 className="text-3xl font-bold text-brand-blue-700 mb-6">{copy.faq}</h2>}
    <div className="space-y-3">{(compact ? items.filter(([id]) => ['multiple', 'price', 'scope'].includes(id)) : items).map(([id, question, answer]) => <details id={id} key={id} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <summary className="font-semibold min-h-12 cursor-pointer leading-relaxed focus-visible:outline-brand-blue-600"><span>{question}</span><Plus className="faq-indicator" size={20} aria-hidden="true" /></summary>
      <p className="pt-3 leading-relaxed">{answer}</p>
    </details>)}</div>
    {compact && <Link href="/faq" className="inline-flex min-h-12 items-center underline font-semibold text-brand-blue-700 mt-5">{copy.allFaq}</Link>}
  </section>;
}
