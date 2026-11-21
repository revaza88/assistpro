import express, { type Express } from 'express';
import rateLimit from 'express-rate-limit';
import { answerChat, chatRequest, type ChatProvider } from './service';
import { knowledgeVersion } from './knowledge';

export function registerChat(app: Express, options: { mode?: string; provider?: ChatProvider; maxCalls?: number; rateMax?: number; timeout?: number } = {}) {
 const mode = options.mode ?? process.env.CHAT_MODE ?? 'disabled';
 const enabled = mode === 'simulation';
 let calls = 0;
 const cap = options.maxCalls ?? 100;
 app.get('/api/chat/config', (_req,res) => res.set('Cache-Control','no-store').json({ enabled, mode: enabled ? 'simulation' : 'disabled', knowledgeVersion, testIntakeEnabled:app.locals.testIntakeEnabled === true }));
 const limiter = rateLimit({ windowMs:60_000, max:options.rateMax ?? 12, standardHeaders:true, legacyHeaders:false, message:{ code:'CHAT_RATE_LIMIT', email:'info@assist.ge' } });
 app.post('/api/chat', limiter, express.json({ limit:'4kb' }), async (req,res) => {
  res.set('Cache-Control','no-store');
  if (!enabled || (process.env.CHAT_MODE === 'disabled' && options.mode === undefined)) { res.status(503).json({ code:'CHAT_DISABLED',email:'info@assist.ge' });return; }
  const input = chatRequest.safeParse(req.body);
  if (!input.success) {res.status(400).json({code:'CHAT_INVALID_INPUT'});return;}
  if (calls >= cap) {res.status(503).json({code:'CHAT_BUDGET_LIMIT',email:'info@assist.ge'});return;}
  calls++;
  try {res.json(await answerChat(input.data,options.provider,options.timeout));}
  catch(error) { const code = error instanceof Error && ['SENSITIVE_DATA','CHAT_TIMEOUT'].includes(error.message) ? error.message : 'CHAT_UNAVAILABLE';res.status(code === 'SENSITIVE_DATA' ? 400 : 503).json({code,email:'info@assist.ge'}); }
 });
}
