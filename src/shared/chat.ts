import type { Selection } from './selection';
export type ChatLanguage = 'ka' | 'en' | 'ru';
export type ChatTask = 'monthly' | 'cleanup' | 'payroll';
export type ChatContext = { selection: Selection; industryKnown: boolean; task?: ChatTask; intent?: 'accounting' };
export type ChatReply = { mode: 'simulation'; text: string; context: ChatContext; need?: 'industry' | 'task'; sources: { id: string; title: string; href: string; reviewed: string; owner: string }[] };
export const chatEmail = 'info@assist.ge';
