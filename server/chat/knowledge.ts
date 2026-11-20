import type { ChatLanguage } from '../../src/shared/chat';
// Verified against public HTML and existing FAQ on 2026-11-20. This is a
// narrow factual registry, not blanket approval of the source page's claims.
// The ASSIST role is a required publication approver, not an invented person.
export const knowledgeVersion = 'public-facts-2026-11-20.1';
const records = [
 ['accounting', '/services/accounting', ['ბუღალტრული მომსახურება. სამუშაოს მოცულობა და პასუხისმგებლობები დაწყებამდე თანხმდება.', 'Accounting services. Scope and responsibilities are agreed before work begins.', 'Бухгалтерское обслуживание. Объём и ответственность согласуются до начала работ.']],
 ['tax', '/services/tax', ['საგადასახადო კონსულტაცია. კონკრეტულ საგადასახადო დასკვნას სპეციალისტი საკითხისა და დოკუმენტების განხილვის შემდეგ გასცემს.', 'Tax consulting. A specialist must review your situation and documents before giving a specific conclusion.', 'Налоговая консультация. Конкретное заключение требует рассмотрения ситуации и документов специалистом.']],
 ['audit', '/services/audit', ['აუდიტის მომსახურება. მიზანი, პერიოდი და სამუშაოს მოცულობა ცალკე თანხმდება.', 'Audit services. Purpose, period and scope are agreed separately.', 'Аудиторские услуги. Цель, период и объём согласуются отдельно.']],
 ['legal', '/services/legal', ['იურიდიული მომსახურება. ინდივიდუალური სამართლებრივი დასკვნისთვის მიმართეთ სპეციალისტს.', 'Legal services. Contact a specialist for individual legal advice.', 'Юридические услуги. За индивидуальным правовым заключением обратитесь к специалисту.']],
 ['business', '/services/business', ['ბიზნეს კონსულტაცია. საჭირო სამუშაოს მოცულობა გუნდთან განიხილება.', 'Business consulting. Discuss the required scope with the team.', 'Бизнес-консалтинг. Необходимый объём обсуждается с командой.']],
 ['hr', '/services/hr', ['HR მომსახურება. კონკრეტული საჭიროება და მოცულობა გუნდთან განიხილება.', 'HR services. Discuss your specific needs and scope with the team.', 'HR-услуги. Конкретные задачи и объём обсуждаются с командой.']],
 ['process', '/faq', ['დაწყებამდე თანხმდება სამუშაოს მოცულობა, შედეგის ფორმა, პერიოდულობა და პასუხისმგებლობები. ვადები და ფასი ცალკე თანხმდება.', 'Scope, deliverables, frequency and responsibilities are agreed before work begins. Timing and price are agreed separately.', 'До начала работ согласуются объём, результат, периодичность и ответственность. Сроки и цена согласуются отдельно.']],
 ['pricing', '/faq', ['კალკულატორის თანხები და კოეფიციენტები დემოა — ეს არ არის მოქმედი ტარიფი ან კომერციული შეთავაზება.', 'Calculator amounts and coefficients are a demo, not an active tariff or commercial offer.', 'Суммы и коэффициенты калькулятора демонстрационные: это не тариф и не коммерческое предложение.']],
 ['contact', '/contact', ['ონლაინ მიღება გამორთულია. მოგვწერეთ info@assist.ge-ზე. წერილს თავად აგზავნით თქვენი საფოსტო პროგრამიდან; საიტი მას არ აგზავნის.', 'Online intake is disabled. Email info@assist.ge. You send the email from your own email app; this site does not send it.', 'Онлайн-приём отключён. Пишите на info@assist.ge. Вы отправляете письмо из своей почтовой программы; сайт его не отправляет.']],
] as const;
export const knowledge = records.flatMap(([id, href, texts]) => (['ka','en','ru'] as const).map((language, i) => ({ id, language, href, text: texts[i], reviewed: '2026-11-20', owner: 'ASSIST — public content owner (assignment required before launch)', status: 'verified-public-fact' as const })));
export type KnowledgeId = typeof records[number][0];
export const allowedChatPaths = new Set<string>(records.map(r => r[1]));
export function source(id: KnowledgeId, language: ChatLanguage) { const item = knowledge.find(r => r.id === id && r.language === language); if (!item || !allowedChatPaths.has(item.href)) throw new Error('Unapproved source'); return item; }
