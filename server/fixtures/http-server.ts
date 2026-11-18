import { startServer } from '../app';

void startServer(app => {
  // Test-only route: production must hide the error detail and submitted content.
  app.post('/qa/error', (_req, _res, next) => next(new Error('QA_PRIVATE_INTERNAL_DETAIL')));
  app.use((_req, res) => { res.status(404).json({ error: 'Not found' }); });
});
