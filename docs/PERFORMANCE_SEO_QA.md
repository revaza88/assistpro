# Performance and SEO — 2026-11-17

Scope: local production React/Vite/Express build and a mobile browser viewport.
No database, outbound notification, public deployment, Search Console submission
or ranking change is included.

## Changes

- `npm run build` now prerenders the actual React content of all 15 public pages
  and the 404 page into `dist/prerender`. Initial headings, service descriptions,
  links and FAQ answers no longer require JavaScript. Georgian is the initial
  HTML language. React hydrates the Georgian markup; existing English/Russian
  preferences use the client render and update the HTML language and metadata.
- Each route has a unique title/description, Open Graph tags and a favicon.
  Client navigation/language changes update the same metadata. Unknown routes
  and missing assets/API endpoints return real 404 responses. `/index.html` and
  trailing slashes on known pages redirect to the clean route.
- Canonical/OG URLs and the sitemap use only a configured origin, never the
  request Host header. Query selections are omitted from canonical URLs and are
  noindex. Local inquiry, unconfirmed team and career pages are excluded from the
  sitemap. Language preferences do not create separate locale URLs, so hreflang
  alternates are intentionally not invented.
- Removed unused query/toast/tooltip providers from the startup path. Detail-page
  animation code loads separately; navigation uses ordinary markup. Content no
  longer starts hidden behind entrance animations, including without JavaScript.
  Motion pages retain reduced-motion support.
- Removed the font CSS `@import` chain. A later real Lighthouse run found that
  the attempted deferred external stylesheet was blocked by CSP. Fonts are now
  self-hosted WOFF2 with bundled CSS and `font-display: optional`; see
  `LIGHTHOUSE_QA.md` for the correction and actual reports. Mobile zoom is enabled.
  Hashed assets use a one-year immutable
  cache; HTML revalidates with `no-cache`.
- Prerendered contact controls remain disabled until the client is ready. Native
  form fallback uses POST, preventing contact fields from leaking into a GET URL.

## Measurements and verification

The initial entry's gzip size first fell from **216.44 kB to 164.94 kB**, about **24%**.
The later Lighthouse-driven change reduced it further to **150,161 bytes**, with
**504,578 raw UTF-8 bytes**. Before that change Vite's displayed size was about
492.20 kB because it counts string characters; do not report that as raw UTF-8
network bytes. The separate animation chunk is not required by the home page.
Existing outdated Browserslist-data advice remains; the large-entry warning is
gone.

`scripts/audit-web.ts` verifies all 15 actual HTTP pages, initial HTML H1/content,
metadata, gzip, cache headers, favicon, 404/redirects and query noindex. It enforces
entry budgets of 600 kB raw / 180 kB gzip. A separate loopback-only test with the
reserved example origin `https://assist.example` verified canonical, robots and
sitemap configuration. That temporary server was stopped. Reports are written
to `dist/seo-performance-local.json` and `dist/seo-performance-configured.json`.

Seven local unthrottled samples produced roughly 4 ms median HTML TTFB. This is
only a localhost server measurement, not a mobile network, Lighthouse score,
LCP/INP/CLS measurement, or field Core Web Vitals result. External font/CDN/network
conditions and production hosting still require measurement after deployment.

Browser checks: all 15 pages at 360px/1280px with one H1 and no horizontal overflow;
mobile selection → calculator → successful local inquiry; KA/EN/RU language and
metadata after reload; no hydration/console errors in those flows. Physical
devices and a full accessibility audit were not tested.

Initial validation: TypeScript, 17 automated tests, production build, HTTP audit
and browser checks. The Lighthouse follow-up has 18 passing tests and actual
mobile/desktop lab reports; see `LIGHTHOUSE_QA.md`.

## Publishing configuration

Until the public domain is confirmed, default to `INDEXING_ENABLED=false` and
leave `SITE_URL` unset. Pages emit noindex and no invented canonical domain;
`/sitemap.xml` returns 503 with a configuration message. After the public origin
and live content are approved, configure the server process:

```text
SITE_URL=https://your-confirmed-domain.example
INDEXING_ENABLED=true
```

`SITE_URL` must be an HTTP(S) origin without credentials, path, query or fragment.
`robots.txt` then advertises the sitemap. Configuring these does not activate
production intake or outbound email. Deployment must include `dist/prerender`
alongside `dist/public` and `dist/index.js`; restart after a new build because
production HTML is cached in server memory.

The implementation follows [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
on initial content/metadata and [Vite's build guidance](https://vite.dev/guide/build.html)
on HTML revalidation. Neither establishes search indexing or ranking guarantees.
