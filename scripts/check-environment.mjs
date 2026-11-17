const fail = message => { console.error(message); process.exit(1); };
if (process.env.NODE_ENV !== 'production') fail('NODE_ENV must be production');
let origin;
try { origin = new URL(process.env.SITE_URL); } catch { fail('Set SITE_URL to the confirmed HTTPS origin'); }
if (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) fail('SITE_URL must be a clean HTTPS origin');
if (origin.hostname.endsWith('.example') || origin.hostname === 'localhost' || /^127\./.test(origin.hostname)) fail('Replace the example/local domain with the confirmed public domain');
if (process.env.CORS_ORIGIN !== origin.origin) fail('CORS_ORIGIN must equal the SITE_URL origin');
if (!['true', 'false'].includes(process.env.INDEXING_ENABLED)) fail('Set INDEXING_ENABLED explicitly to true or false');
if (process.env.INTAKE_MODE !== 'disabled') fail('This release must keep INTAKE_MODE=disabled; live intake is not provisioned');
if (!['loopback', '1'].includes(process.env.TRUST_PROXY)) fail('Configure the single controlled reverse proxy: loopback or 1');
console.log(`Release configuration valid for ${origin.origin}; indexing=${process.env.INDEXING_ENABLED}; online intake disabled.`);
