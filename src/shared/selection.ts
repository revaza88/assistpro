export const industryIds = ['service', 'education', 'medical', 'logistics', 'retail', 'wholesale', 'distribution', 'manufacturing', 'hotels', 'startups', 'other'] as const;
export const serviceGroups = [
  { id: 'accounting', services: ['bookkeeping', 'payroll', 'cleanup'] },
  { id: 'tax', services: ['filings', 'tax-advice', 'tax-review', 'disputes'] },
  { id: 'audit', services: ['financial-reporting', 'management-reporting', 'financial-audit'] },
  { id: 'business', services: ['legal', 'business', 'hr'] },
] as const;
export const serviceIds = ['bookkeeping', 'payroll', 'cleanup', 'filings', 'tax-advice', 'tax-review', 'disputes', 'financial-reporting', 'management-reporting', 'financial-audit', 'legal', 'business', 'hr'] as const;
export type IndustryId = typeof industryIds[number];
export type ServiceId = typeof serviceIds[number];
export type Selection = { industry: IndustryId; services: ServiceId[] };
export const emptySelection: Selection = { industry: 'other', services: [] };
const legacyServices: Record<string, ServiceId> = { accounting: 'bookkeeping', bookkeeping: 'bookkeeping', tax: 'tax-advice', audit: 'financial-audit', legal: 'legal', business: 'business', hr: 'hr' };

export function parseSelection(search: string): Selection | null {
  const params = new URLSearchParams(search);
  if (['sector', 'services', 'service'].some(key => params.getAll(key).length > 1)) return null;
  const industry = params.get('sector') ?? 'other';
  if (!industryIds.includes(industry as IndustryId)) return null;
  if (params.has('services') && params.has('service')) return null;
  const legacy = params.get('service');
  if (params.has('service') && (!legacy || !Object.hasOwn(legacyServices, legacy))) return null;
  const selected = legacy ? [legacyServices[legacy]] : params.get('services') ? params.get('services')!.split(',') : [];
  if (selected.length > serviceIds.length || new Set(selected).size !== selected.length || selected.some(id => !serviceIds.includes(id as ServiceId))) return null;
  return { industry: industry as IndustryId, services: serviceIds.filter(id => selected.includes(id)) };
}

export function selectionHref(path: '/industries' | '/contact', selection: Selection): string {
  const params = new URLSearchParams({ sector: selection.industry, services: selection.services.join(',') });
  const valid = parseSelection(params.toString());
  if (!valid) throw new Error('Invalid selection');
  params.set('services', valid.services.join(','));
  return `${path}?${params}`;
}

export function validPhone(value: string): boolean {
  return /^\+?[\d ()-]+$/.test(value) && value.replace(/\D/g, '').length >= 7 && value.replace(/\D/g, '').length <= 15;
}
