# Build toolchain verification — 2026-11-17

The original four development package findings (Vite, its old esbuild dependency,
typography and its selector-parser dependency) have been addressed:

- Vite 5.4.19 → 8.3.8; React plugin 4.3.2 → 6.3.0.
- Direct esbuild 0.25.0 → 0.28.2; Node types now track the supported Node 24 runtime.
- Removed unused `@tailwindcss/typography` and its Tailwind plugin registration.
  There are no typography `prose` classes in the client. Tailwind 3 and the design remain.
  The remaining selector-parser is 6.1.6, outside the original vulnerable range.
- Removed unrestricted `allowedHosts: true` from the Express/Vite middleware and
  retained Vite's filesystem restrictions. Localhost/IP access works; an untrusted
  Host header receives 403 from Vite.

## Current audit limitation

`npm audit --omit=dev`: **0 vulnerabilities**.

The fresh full audit is **not zero**: 12 high package findings all trace to the
single [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)
picomatch ReDoS advisory, reviewed/updated on November 17. The advisory covers
all published picomatch versions through 4.0.7 and lists **no patched version**.
Both the latest Vite and Tailwind 3 dependency trees include it. These are build/dev
dependencies, absent from the production-only dependency installation.

Do not downgrade to npm audit's suggested old Vite version (6.2.7), which would
reintroduce other Vite vulnerabilities. No audit findings were suppressed, packages
were not relabeled, and no forced overrides or unreviewed dependency patches were
introduced. Keep development on loopback, use trusted source/configured glob patterns,
and update/re-audit when upstream releases a fix. A successful build does not resolve
this outstanding upstream advisory.

## Verification

- TypeScript check and all 18 application tests passed.
- A clean Linux Docker installation on Node 24 also passed check, all 18 tests and
  build. The read-only, non-root, production-only container passed release smoke
  and its production audit returned zero vulnerabilities.
- Production build passed, including 15 real React prerenders plus the 404 page.
- Production smoke passed: rendered pages, health, noindex, 404 and disabled intake.
- HTTP audit passed for all 15 public pages, metadata, redirects, gzip/cache headers,
  sitemap/robots behavior and asset budgets. Entry JS: 200,471 bytes raw / 52,131 gzip.
  These are local HTTP measurements, not new Lighthouse or field performance scores.
- Development HTML, TSX, CSS and HMR client requests passed; untrusted Host rejected.
- Browser: production calculator reacts to employee changes (5 → 20), updates the
  demo estimate (340–460 → 500–670 GEL), and carries inputs into contact. At 390 × 844,
  the contact page has no horizontal overflow and explains disabled online intake.
  Production and dev calculator pages showed no captured console errors.

Database creation, public hosting, indexing and production intake remain deferred.
