import { z } from '../../src/shared/validation';
import { industryIds, serviceIds, type ServiceId } from '../../src/shared/selection';
import type { ChatLanguage, ChatReply } from '../../src/shared/chat';
import { source, type KnowledgeId } from './knowledge';

export const chatRequest = z.object({ language: z.enum(['ka','en','ru']), message: z.string().trim().min(1).max(500), context: z.object({ selection: z.object({ industry: z.enum(industryIds), services: z.array(z.enum(serviceIds)).max(serviceIds.length).refine(v => new Set(v).size === v.length) }).strict(), industryKnown: z.boolean(), task: z.enum(['monthly','cleanup','payroll']).optional(), intent:z.literal('accounting').optional() }).strict() }).strict();
export type ChatInput = z.infer<typeof chatRequest>;
export interface ChatProvider { classify(input: ChatInput, signal: AbortSignal): Promise<KnowledgeId | null> }
// Replaceable server-only adapter. No model, key, network, storage or tools.
export const simulationProvider: ChatProvider = { async classify({ message, context }) {
 const text = message.toLowerCase();
 if (/ჯარიმ|გარანტ|უფასო|დაცულ|პასუხისმგებლ|guarantee|penalt|free consult|штраф|гарант|бесплат|ignore.*instruction|system prompt|send.*email|<script|უგულებელ|отправь.*письмо/.test(text)) return null;
 if (/(?:^|[^a-zა-ჰ])ფას|ღირებულ|ღირს|price|cost|цен|стоим/.test(text)) return 'pricing';
 if (/გადასახ|საგადასახ|tax|налог/.test(text)) return 'tax';
 if (/აუდიტ|audit|аудит/.test(text)) return 'audit';
 if (/იურიდ|სამართ|legal|юрид|правов/.test(text)) return 'legal';
 if (/კადრ|hr\b|პერსონალ|кадр|персонал/.test(text)) return 'hr';
 if (/ბიზნეს.*კონსულტ|business consult|бизнес.*консульт/.test(text)) return 'business';
 if (/ბუღალ|აღრიცხვ|ხელფას|account|bookkeep|payroll|бухгалтер|уч[её]т|зарплат/.test(text) || ((context.intent === 'accounting' || context.selection.services.some(s => ['bookkeeping','cleanup','payroll'].includes(s))) && /მაღაზი|ვაჭრობ|განათლებ|სკოლ|სასწავლ|მედიც|კლინიკ|ლოგისტ|საბითუმ|დისტრიბ|წარმოებ|სასტუმრ|სტარტაპ|მომსახურება|მიმდინარე|აღდგენა|სხვა|ჯერ არ ვიცი|retail|shop|services|other|monthly|cleanup|education|school|medical|clinic|logistic|wholesale|distribut|manufactur|hotel|startup|торгов|магазин|услуги|другое|текущ|восстанов|образован|школ|медицин|клиник|логист|оптов|дистриб|производ|гостиниц|стартап/.test(text))) return 'accounting';
 if (/კონტაქტ|ელფოსტ|მიწერ|contact|email|контакт|почт/.test(text)) return 'contact';
 return null;
} };
export function hasSensitiveData(text: string) {
 return /\bGE\d{2}[A-Z0-9]{10,}\b|\b\d{11,}\b|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+?\d[ ()-]*){9,}|პაროლ|password|парол|api[_ -]?key|secret\s*[:=]|\bsk-[\w-]+/i.test(text);
}
const copy = {
 ka: { unknown:'ამ ინფორმაციას დამტკიცებული წყაროებით ვერ ვადასტურებ. საკითხი ASSIST-ის გუნდთან განიხილეთ: info@assist.ge. ონლაინ მიღება გამორთულია.', industry:'რომელ სფეროში საქმიანობთ?', task:'რა ტიპის სამუშაო გჭირდებათ: მიმდინარე აღრიცხვა, აღრიცხვის აღდგენა თუ ხელფასები?' },
 en: { unknown:'I cannot confirm this from verified sources. Discuss it with the ASSIST team: info@assist.ge. Online intake is disabled.', industry:'What industry do you work in?', task:'Do you need ongoing bookkeeping, historical cleanup or payroll?' },
 ru: { unknown:'Не могу подтвердить это проверенными источниками. Обсудите вопрос с ASSIST: info@assist.ge. Онлайн-приём отключён.', industry:'В какой отрасли вы работаете?', task:'Нужен текущий учёт, восстановление учёта или расчёт зарплаты?' },
};
export async function answerChat(input: ChatInput, provider: ChatProvider = simulationProvider, timeout = 1500): Promise<ChatReply> {
 if (hasSensitiveData(input.message)) throw new Error('SENSITIVE_DATA');
 const context = structuredClone(input.context), language: ChatLanguage = input.language;
 const controller = new AbortController(); let timer: ReturnType<typeof setTimeout> | undefined;
 let id: KnowledgeId | null;
 try { id = await Promise.race([provider.classify(input, controller.signal), new Promise<never>((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error('CHAT_TIMEOUT')); }, timeout); })]); }
 finally { clearTimeout(timer); }
 let need: ChatReply['need'];
 const text = input.message.toLowerCase();
 // Client supplies the prior structured context, never a transcript or a session ID.
 if (id === 'accounting') {
 if (!context.industryKnown) {
 if (/მაღაზი|ვაჭრობ|retail|shop|торгов|магазин/.test(text)) { context.selection.industry = 'retail'; context.industryKnown = true; }
 const industries: [typeof industryIds[number],RegExp][] = [['education',/განათლებ|სკოლ|სასწავლ|education|school|образован|школ/],['medical',/მედიც|კლინიკ|medical|clinic|медицин|клиник/],['logistics',/ლოგისტ|logistic|логист/],['wholesale',/საბითუმ|wholesale|оптов/],['distribution',/დისტრიბ|distribution|дистриб/],['manufacturing',/წარმოებ|manufactur|производ/],['hotels',/სასტუმრ|hotel|гостиниц/],['startups',/სტარტაპ|startup|стартап/],['service',/^მომსახურება$|^services$|^услуги$|მომსახურების სფერო/],['other',/^(?:ჯერ არ ვიცი|სხვა|not sure|other|другое|пока не знаю)$/]];
 for(const [industry,pattern] of industries)if(pattern.test(text)){context.selection.industry=industry;context.industryKnown=true;break;}
 }
 if (/აღდგენა|cleanup|восстанов/.test(text)) context.task = 'cleanup';
 if (/ხელფას|payroll|зарплат/.test(text)) context.task = 'payroll';
 if (/მიმდინარე|ყოველთვ|monthly|ongoing|текущ|ежемесяч/.test(text)) context.task = 'monthly';
 if (!context.task) {
  const selectedTasks = context.selection.services.filter(s => ['bookkeeping','cleanup','payroll'].includes(s));
  if (selectedTasks.length === 1) context.task = selectedTasks[0] === 'bookkeeping' ? 'monthly' : selectedTasks[0] as 'cleanup' | 'payroll';
 }
 }
 // These topic-specific questions are the only two clarification fields.
 if (id === 'accounting') {
  context.intent = 'accounting';
  if (!context.industryKnown) need = 'industry';
  else if (!context.task) need = 'task';
  const service = context.task === 'cleanup' ? 'cleanup' : context.task === 'payroll' ? 'payroll' : 'bookkeeping';
  if (!need) context.selection.services = serviceIds.filter(s => context.selection.services.includes(s) || s === service);
 } else {
  const services: Partial<Record<KnowledgeId, ServiceId>> = { tax:'tax-advice', audit:'financial-audit', legal:'legal', business:'business', hr:'hr' };
  const service = id && Object.hasOwn(services,id) ? services[id] : undefined;
  if (service) context.selection.services = serviceIds.filter(s => context.selection.services.includes(s) || s === service);
 }
 const item = source(need ? 'process' : id ?? 'contact', language);
 const result: ChatReply = { mode:'simulation', text: need ? copy[language][need] : id ? item.text : copy[language].unknown, context, ...(need ? { need } : {}), sources:[{ id:item.id,title:item.text,href:item.href,reviewed:item.reviewed,owner:item.owner }] };
 // Provider output never becomes a link, HTML or unreviewed answer.
 return result;
}
