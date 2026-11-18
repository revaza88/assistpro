# Mobile performance optimization — 2026-11-18

Compared the release at `dbd433eab05191bdd3871331ffc5ed6a2a5d1ccb` with this
optimization. The previous single-run mobile result was 94. Fresh measurements
below use three valid runs for each build, on the same local machine with
Lighthouse 13.6.0's default mobile simulated throttling and a fresh headless Chrome
profile per run. Baseline was served from a preserved dist copy on loopback 5009;
the new build used 5010. Both kept production CSP, noindex and disabled intake.

## Results

| Metric | Before (median) | After (median) | Change |
| --- | ---: | ---: | ---: |
| Performance | 99 | **100** | All three new runs scored 100 |
| JS transferred during initial load | 157,545 B | **105,509 B** | −33.0% |
| CSS transferred during initial load | 17,318 B | **10,816 B** | −37.5% |
| Reported unused JS opportunity | 37,989 B | **22,449 B** | −40.9% |
| Reported unused CSS opportunity | 13,123 B | **0 B flagged** | Below Lighthouse's reporting threshold |
| Total Blocking Time | 102 ms | **28.5 ms** | −72.1% |
| Main-thread work | 1,409.9 ms | **916.3 ms** | −35.0% |
| Largest Contentful Paint | 974 ms | **969 ms** | Essentially unchanged |
| Cumulative Layout Shift | 0.000078 | **0.000078** | Essentially unchanged |

All runs retained Accessibility **100**, Best Practices **100**, and SEO **63**.
SEO reflects the deliberately disabled indexing. A zero unused-CSS opportunity
does **not** mean every CSS rule executes on the home page: the stylesheet fell
below the audit's reporting threshold. Shared utilities for other routes still exist.
Unused JS inside shared framework code also remains; no claim of zero unused code.

Individual mobile runs:

| Build | Performance | TBT | Main-thread work |
| --- | --- | --- | --- |
| Before | 100 / 99 / 85 | 62 / 102 / 591 ms | 1,111 / 1,410 / 2,888 ms |
| After | 100 / 100 / 100 | 51.5 / 28.5 / 9.5 ms | 1,208 / 916 / 834 ms |

All six runs were valid; none were discarded. The baseline's timing spread shows
why a single local score is not a stable causal benchmark. Byte reductions are
deterministic; CPU timings depend on host load. These lab runs do not measure field
INP, deployed TLS/CDN behavior or real-device performance.

## Changes

- Split the original translation dictionaries into `locales/ka.ts`, `en.ts` and
  `ru.ts`. Georgian remains eager for SSR/hydration. English and Russian load only
  when selected, before the UI's language changes. A saved optional language loads
  before client rendering; failed loading preserves the usable Georgian page.
- Preserve every translation value: tests compare SHA-256 checksums of all three
  complete dictionaries against their pre-split versions, including merged site copy.
- Use native selects for the header's language/theme choices. Their visible icons
  and labels retain the design while browser-native keyboard, selection and popup
  behavior replace the Radix dropdown/button utilities on the initial path. Native
  selects have accessible labels and visible wrapper focus outlines. Storage errors
  do not prevent changing the language in the current tab.
- Tailwind now follows the complete client import graph, including lazy routes and
  shared controls. Unreachable old prototype sections and UI widgets no longer
  generate CSS. This is not a home-only purge: all public routes retain their styles.
  Tests guard lazy route inclusion and exclusion of unused prototypes.
- Extend `scripts/audit-web.ts` to count every HTML-declared initial script,
  modulepreload and stylesheet. Enforce 400 kB raw / 120 kB gzip total initial JS
  and 12 kB gzip CSS budgets. An individual entry filename/size is not the page total.

Vite CSS output decreased from about **85.9 kB raw / 16.0 kB gzip** to
**41.1 kB raw / 9.3 kB gzip**. The new entry is larger individually because shared
code moved into it; the old footer/shared preload is gone. The full new declared
script set is **338,806 B raw / 99,831 B gzip-or-identity**, including the prepaint
theme helper and JSX runtime. Styles total **9,243 B gzip** in the HTTP budget check.
Lighthouse transfer sizes above include network overhead and differ from body-only
HTTP byte counts. The browser check confirmed that optional locale, animation and
UI-button chunks are absent on the default Georgian home load.

## Validation

- TypeScript check, **25/25 tests**, production build and all 15 route prerenders
  plus 404 passed. No package upgrades or new runtime dependencies were needed.
- Production smoke and 15-page HTML/metadata/status/cache/gzip/budget audit passed.
  Runtime dependency audit remains **0 vulnerabilities**. The separate unpatched
  build-only picomatch advisory is unchanged.
- Isolated headless browser checks passed on all 15 pages at 390px: one H1 per
  route, no horizontal overflow or captured console/page errors. Tested language
  changes KA → EN → RU → KA, saved-English reload, on-demand locale network requests,
  dark/system themes, keyboard menu open/Escape, and calculator inputs/estimate
  carried to contact with production submission still disabled.
- Visually inspected the mobile home and desktop accounting-page screenshots.
  Source styles, green/paper/lime design, CSP nonces and noindex behavior remain.

Local raw artifacts are ignored by Git: `.artifacts/mobile-before-{1,2,3}.json`,
`mobile-after-{1,2,3}.json`, both summary files, `mobile-comparison.json`,
`mobile-http-audit.json`, `mobile-after-390.png`, and `accounting-after-desktop.png`.
No database, public intake, tracking, hosting deployment or indexing was enabled.

Guidance applied: Google's Modern Web Guidance `performance` guide (dynamic imports,
remove unreachable CSS/JS, preserve critical resource priority) and `forms` native
control/accessibility guidance. No delayed hydration, user-agent-specific behavior
or Lighthouse-specific rendering was introduced.
