import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { industryIds, serviceIds, selectionHref, type Selection } from '@shared/selection';
import { requestCopy } from '@/lib/request-copy';

export default function SelectionSummary({ selection, editable = false, editHref }: { selection: Selection; editable?: boolean; editHref?: string }) {
  const { i18n } = useTranslation();
  const copy = requestCopy(i18n.language);
  return <section aria-label={copy.summary} className="rounded-xl border border-blue-100 bg-brand-blue-50 p-5 space-y-3">
    <h2 className="font-semibold text-lg text-brand-blue-700">{copy.summary}</h2>
    <p>{copy.industry}: <strong>{copy.industryLabels[industryIds.indexOf(selection.industry)]}</strong></p>
    {selection.services.length ? <ul className="list-disc pl-5 space-y-1">{selection.services.map(id => <li key={id}>{copy.serviceLabels[serviceIds.indexOf(id)]}</li>)}</ul> : <p>{copy.noServices}</p>}
    {editable && <Link href={editHref ?? selectionHref('/industries', selection)} className="inline-flex min-h-12 items-center underline font-medium text-brand-blue-700">{copy.edit}</Link>}
  </section>;
}
