import type { Express, Request, Response, NextFunction } from 'express';
import { createHash, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import rateLimit from 'express-rate-limit';
import type { FileStorage } from './file-storage';

// Test recipient only. No production authentication, admin panel or transport.
export function testStaffConfig(env = process.env) {
  if (env.TEST_STAFF_MODE !== 'local') return null;
  const root = path.resolve('.artifacts') + path.sep;
  const file = env.DATA_FILE ? path.resolve(env.DATA_FILE) : '';
  if (env.INTAKE_MODE !== 'local' || !['127.0.0.1','::1'].includes(env.HOST ?? '') || !file.startsWith(root)) throw new Error('Test staff requires loopback, local intake and an isolated .artifacts DATA_FILE');
  const token = env.TEST_STAFF_TOKEN ?? '', other = env.TEST_OTHER_STAFF_TOKEN ?? '';
  if (!/^[a-f0-9]{64}$/.test(token) || !/^[a-f0-9]{64}$/.test(other) || token === other) throw new Error('Distinct random test staff credentials are required');
  return { assignee:'qa-responsible', token, other };
}
export function registerTestStaff(app: Express, storage: FileStorage) {
  const settings = testStaffConfig();
  app.locals.testIntakeEnabled = !!settings;
  if (!settings) return null;
  const digest = (value:string) => createHash('sha256').update(value).digest();
  const authorize = (req:Request,res:Response,next:NextFunction) => {
    res.set({ 'Cache-Control':'no-store', 'X-Robots-Tag':'noindex' });
    if (!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress ?? '')) {res.sendStatus(403);return;}
    const token = req.get('Authorization')?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
    if (!token) {res.status(401).json({code:'TEST_STAFF_UNAUTHORIZED'});return;}
    const bytes = digest(token);
    if (timingSafeEqual(bytes,digest(settings.other))) {res.status(403).json({code:'TEST_STAFF_NOT_ASSIGNED'});return;}
    if (!timingSafeEqual(bytes,digest(settings.token))) {res.status(401).json({code:'TEST_STAFF_UNAUTHORIZED'});return;}
    next();
  };
  app.use('/api/test-staff',rateLimit({windowMs:60_000,max:30,standardHeaders:true,legacyHeaders:false}),authorize);
  const validId = (id:string) => /^[1-9]\d{0,8}$/.test(id) ? Number(id) : null;
  app.get('/api/test-staff/requests/:id',async(req,res) => {
    const id=validId(req.params.id);if(!id){res.sendStatus(400);return;}
    const record=await storage.getTestContact(id,settings.assignee);
    if(!record){res.sendStatus(404);return;}
    const {firstName,lastName,email,phone,message,industry,services,createdAt,testHandoff}=record;
    res.json({testOnly:true,id,firstName,lastName,email,phone,message,industry,services,createdAt,testHandoff});
  });
  app.post('/api/test-staff/requests/:id/notification-attempt',async(req,res) => {
    const id=validId(req.params.id);if(!id){res.sendStatus(400);return;}
    if (!await storage.getTestContact(id,settings.assignee)) {res.sendStatus(404);return;}
    try {
      // Deliberate simulation: this module has no outbound transport.
      const record=await storage.recordTestNotification(id,settings.assignee,process.env.TEST_NOTIFICATION_RESULT === 'success');
      res.status(record.testHandoff?.notification === 'failed'?502:200).json({testOnly:true,id,stored:true,notification:record.testHandoff?.notification,attempts:record.testHandoff?.attempts,actualDelivery:false});
    } catch {res.status(503).json({code:'TEST_NOTIFICATION_STATE_UNAVAILABLE',stored:true,id,actualDelivery:false});}
  });
  return settings;
}
