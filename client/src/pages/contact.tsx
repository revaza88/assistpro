import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearch } from 'wouter';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import SelectionSummary from '@/components/SelectionSummary';
import CalculatorSummary from '@/components/CalculatorSummary';
import { calculatorForSelection, calculatorHref, calculatorJourneySelection, isCalculatorQuery, parseCalculatorQuery } from '@shared/pricing';
import { calculatorCopy } from '@/lib/calculator-copy';
import { useInquiryDraft } from '@/contexts/inquiry-draft';
import { company } from '@/lib/company';
import { requestCopy } from '@/lib/request-copy';
import { insertContactSchema } from '@shared/schemas';
import { emptySelection, parseSelection, selectionHref } from '@shared/selection';

type Field = 'name' | 'contact' | 'message' | 'privacy';
type ErrorKey = 'nameError' | 'contactError' | 'messageError' | 'consentError';
export default function ContactPage() {
  const { i18n } = useTranslation();
  const copy = requestCopy(i18n.language);
  const search = useSearch();
  const fromCalculator = isCalculatorQuery(search);
  const calculator = fromCalculator ? parseCalculatorQuery(search) : null;
  const selection = fromCalculator ? calculatorJourneySelection(search) : parseSelection(search);
  const { draft, update, clear } = useInquiryDraft();
  const [errors, setErrors] = useState<Partial<Record<Field, ErrorKey>>>({});
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const [localIntake, setLocalIntake] = useState(false);
  useEffect(() => { setLocalIntake(document.querySelector('meta[name="intake-mode"]')?.getAttribute('content') === 'local'); setReady(true); }, []);
  const busy = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => { setErrors({}); setStatus(null); }, [search]);
  const change = (field: Field, value: string | boolean) => {
    update({ [field]: value });
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setStatus(null);
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy.current || !selection || !localIntake) return;
    const contact = draft.contact.trim();
    const payload = {
      firstName: draft.name, email: contact.includes('@') ? contact : '', phone: contact.includes('@') ? '' : contact,
      message: draft.message, privacy: draft.privacy, industry: selection.industry, services: selection.services,
      calculator: calculator ?? undefined,
    };
    const parsed = insertContactSchema.safeParse(payload);
    const nextErrors: Partial<Record<Field, ErrorKey>> = {};
    if (!parsed.success) for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === 'firstName') nextErrors.name = 'nameError';
      else if (key === 'email' || key === 'phone') nextErrors.contact = 'contactError';
      else if (key === 'message') nextErrors.message = 'messageError';
    }
    if (!draft.privacy) nextErrors.privacy = 'consentError';
    setErrors(nextErrors);
    setStatus(null);
    const first = (['name', 'contact', 'message', 'privacy'] as Field[]).find(field => nextErrors[field]);
    if (first) { form.current?.querySelector<HTMLElement>('#' + first)?.focus(); return; }
    if (!parsed.success) return;
    busy.current = true;
    setSubmitting(true);
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data), signal: AbortSignal.timeout(15000),
      });
      const body = await response.json();
      if (!response.ok || body.success !== true || !Number.isInteger(body.id)) throw new Error('Submission failed');
      clear();
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      busy.current = false;
      setSubmitting(false);
    }
  };
  const fieldClass = 'w-full min-h-12 border border-slate-300 rounded-lg px-3 py-3 mt-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-500';
  const error = (field: Field) => {
    const key = errors[field];
    return key && <p id={field + '-error'} className="text-red-700 text-sm mt-2">{copy[key]}</p>;
  };

  return <div className="inquiry-page min-h-screen"><Navigation /><main id="main-content" tabIndex={-1} className="max-w-5xl mx-auto px-5 py-12 text-slate-700">
    <h1 className="text-3xl sm:text-4xl font-bold text-brand-blue-700 mb-4">{copy.contactTitle}</h1>
    <p className="text-lg mb-6 leading-relaxed">{localIntake ? copy.contactIntro : copy.unavailable}</p>
    {localIntake && <p className="border-l-4 border-amber-400 bg-amber-50 p-4 mb-8 text-sm leading-relaxed">{copy.local}</p>}
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        {selection ? <>
          <SelectionSummary selection={selection} editable editHref={calculator ? calculatorHref('/industries', calculator, selection) : undefined} />
          {calculator ? <CalculatorSummary input={calculator} selection={selection} /> : <Link href={calculatorHref('/calculator', calculatorForSelection(selection), selection)} className="site-button site-button-outline">{calculatorCopy(i18n.language).nav}</Link>}
        </> : <div role="alert" className="rounded-xl bg-amber-50 p-5"><p>{fromCalculator ? calculatorCopy(i18n.language).invalidLink : copy.invalid}</p><Link href={fromCalculator ? '/calculator' : selectionHref('/industries', emptySelection)} className="underline inline-flex items-center min-h-12">{copy.edit}</Link></div>}
        <div className="rounded-xl bg-slate-50 p-5 space-y-3"><p>{company.address}</p><a href={'mailto:' + company.email} className="underline inline-flex min-h-12 items-center text-brand-blue-700">{company.email}</a></div>
        <Link href="/faq" className="inline-flex min-h-12 items-center underline text-brand-blue-700">{copy.faq}</Link>
      </div>
      <form ref={form} onSubmit={handleSubmit} method="post" action="/api/contacts" noValidate aria-busy={submitting} className="rounded-xl border border-slate-200 p-5 sm:p-6 space-y-5">
        <fieldset disabled={!ready || !localIntake || submitting || !selection} className="space-y-5 disabled:opacity-70">
          <legend className="sr-only">{copy.contactTitle}</legend>
          <div><label htmlFor="name" className="font-semibold">{copy.name}</label><input id="name" name="name" autoComplete="name" required maxLength={80} value={draft.name} onChange={event => change('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={fieldClass} />{error('name')}</div>
          <div><label htmlFor="contact" className="font-semibold">{copy.channel}</label><input id="contact" name="contact" type="text" autoComplete="off" autoCapitalize="none" spellCheck={false} required maxLength={254} value={draft.contact} onChange={event => change('contact', event.target.value)} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'contact-error' : undefined} className={fieldClass} />{error('contact')}</div>
          <div><label htmlFor="message" className="font-semibold">{copy.message}</label><textarea id="message" name="message" rows={4} maxLength={5000} value={draft.message} onChange={event => change('message', event.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-hint message-error' : 'message-hint'} className={fieldClass} /><p id="message-hint" className="text-sm mt-2 leading-relaxed">{copy.caution}</p>{error('message')}</div>
          <label className="flex items-start gap-3 min-h-12 py-2"><input id="privacy" type="checkbox" name="privacy" checked={draft.privacy} onChange={event => change('privacy', event.target.checked)} required aria-invalid={!!errors.privacy} aria-describedby={errors.privacy ? 'privacy-error' : undefined} className="w-5 h-5 mt-1 shrink-0 accent-blue-600" /><span className="text-sm leading-relaxed">{copy.consent}</span></label>{error('privacy')}
          <button type="submit" className="site-button w-full">{submitting ? copy.sending : copy.send}</button>
        </fieldset>
        {status && <p role={status === 'success' ? 'status' : 'alert'} className={status === 'success' ? 'text-green-800' : 'text-red-700'}>{status === 'success' ? copy.sent : copy.failed}</p>}
      </form>
    </div>
  </main><Footer /></div>;
}
