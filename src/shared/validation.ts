import { z } from 'zod';

// These small shared request/calculator schemas also run under the browser's
// strict CSP. Configure before creating schemas so Zod never probes new Function.
z.config({ jitless: true });
export { z };
