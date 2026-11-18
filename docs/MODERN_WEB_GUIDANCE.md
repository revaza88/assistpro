# Modern Web Guidance integration

2026-11-18 follow-up: header language/theme controls now use native selects and
optional translations load on demand. Tailwind excludes unreachable components.
The new mobile performance measurements and current validation are in
[`MOBILE_PERFORMANCE_QA.md`](MOBILE_PERFORMANCE_QA.md); the review below records
the earlier 2026-11-17 implementation and measurements.

Reviewed on 2026-11-17 against
[GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance/tree/64a6d708f5a43f2cd3fde5d4d7db3905ba1bdf65),
commit `64a6d708f5a43f2cd3fde5d4d7db3905ba1bdf65`.
The reference checkout is outside this application, at
`D:\Assist\modern-web-guidance-reference`. No runtime dependency or global plugin
was added. `AGENTS.md` now links this guidance for subsequent UI work.

## Scope and evidence

Reviewed the complete CLI catalog of **209 guide descriptions** for applicability,
then consulted the relevant guides and inspected application source. This is not
a claim that every line of every guide has been applied or every possible browser
behavior has been tested. The reference README's feature count differs from the
CLI's guide count; features and guides are different units.

Ran `legacy-scan client/src --json` with CLI telemetry disabled. Its **38 guides /
52 deterministic rules** cover only a subset of the catalog. The initial three
findings concerned vendor-only scrollbars (two) and unsynchronized color-scheme
metadata (one). Manual inspection also found keyboard, storage, text-scaling and
production CSP issues. Automated success is not full WCAG conformance or a security
certification.

## Applied changes

| Guide | Change and reason |
| --- | --- |
| `dark-mode-toggle`, `dark-mode` | Keep root CSS, classes and color-scheme metadata aligned; validate persisted light/dark values; remove the override for System; handle storage failures, system preference changes and cross-tab storage events. A small same-origin script applies the stored scheme before styles render; it is external and nonce-authorized to avoid introducing an inline-script exception. CSS supplies a system-dark fallback without JavaScript. |
| `customize-scrollbar-color-and-thickness` | Standard scrollbar-color/width, contrasting theme tokens and a WebKit fallback gated by `@supports not`. Reset scrollbar-width in the fallback so partial support does not suppress legacy styling. Forced-colors keeps system colors. |
| `respect-os-text-scale`, `responsive-design` | Opt into text-scale, preserve the browser root font size, convert custom font sizes to rem and fluid clamps to mixed rem/vw, use em breakpoints and expanding/wrapping header rows. The mobile menu uses dvh with a vh fallback. |
| `accessibility` | Desktop service disclosure now has a real keyboard-operable button, expanded/controls state, Escape focus return, and closes when focus leaves. Current-page links have aria-current plus an underline; the mobile trigger is localized. Keep native links, selects, checkboxes and details, with no application-menu roles on site navigation. |
| `forms` | Associate the inquiry message error with its field as well as the persistent caution. Keep server validation, native constraints, focus on the first invalid field, status feedback and the disabled production-intake explanation. |
| `security` | Production scripts use fresh cryptographic per-response nonces and strict-dynamic; remove unsafe-inline/unsafe-eval from production script-src. Vite supplies nonce placeholders and dynamic preload support. Substitute placeholders in the trusted HTML template **before** inserting body content, never authorize arbitrary rendered script tags. Add object/base/frame/form restrictions, deny framing and unused camera/microphone/geolocation. Keep styles' inline allowance for React/Radix inline styles; this is separate from script execution. |

## Other catalog areas and decisions

| Area | Application-specific decision |
| --- | --- |
| Performance, fonts, LCP, INP, script priority | Retain real prerendered content, route splitting, local WOFF2 with font-display and one critical preload, immutable hashed assets and no-cache HTML. The tiny theme bootstrap is intentionally blocking for prepaint theme selection; application modules remain deferred. No blanket content-visibility, worker, scheduler or speculation-rule addition without measured benefit on this small site. |
| Layout, typography, color, visual effects | Preserve the green/paper/lime design and Grid/Flex layouts; improve relative sizing and dark errors. New layout APIs remain progressive enhancements. Do not introduce a dependency or replace working layout just to demonstrate a catalog feature. |
| Navigation, dialogs, popovers, tooltips, toasts | Retain working Radix components and the existing responsive disclosure layout with its manual keyboard fallback. Native popover/anchor positioning and a single measured navigation tree are possible future refactors, not requirements for this fix. Avoid breaking older browsers or adding a polyfill only to remove a tested library. |
| Motion, transitions, scrolling | Retain reduced-motion CSS and MotionConfig user preference support. No added parallax, scroll effects or View Transition animation. |
| Forms, autofill, validation, payment/address/OTP | The short contact form and calculator are applicable; payment, address collection, OTP and sign-in are absent. Do not add collection fields. Calculator amounts are explicitly illustrative. |
| HTML, semantics, media, Web Components, tables | Check existing landmarks, titles/language, native FAQ details and controls. No active video/audio, custom elements, data table or image-heavy hero needs a media loader, shadow DOM or table rewrite. Legacy unmounted placeholder components are not production-page evidence. |
| Privacy, permissions, analytics | Keep personal drafts in memory only; no analytics, tracking or third-party reporting service added. No production intake, notifications or database creation. |
| Security, authentication, passkeys, cryptography | No auth/payment/session surface is provisioned. Retain server schemas and restricted runtime dependencies. Trusted Types enforcement needs a separate dependency/sink audit; no permissive pass-through policy was introduced. CSP reporting collection and HTTPS/HSTS rollout require a confirmed hosting environment and privacy/retention decision. |
| PWA, offline, built-in AI, WebMCP, canvas/3D, WASM | No product need for these capabilities. Do not add service workers, offline submission queues, on-device models, agent tools or graphics infrastructure incidentally. |

## Verification and remaining limits

- TypeScript check, all **23 tests** and production build passed. Five new tests
  cover nonce uniqueness/template isolation and saved/invalid/blocked-storage themes.
  All 15 public routes plus 404 prerender successfully.
- Final legacy scan: **0 findings** within the same 38-guide/52-rule subset.
- Production HTTP smoke and 15-page metadata/cache/gzip audit passed. The entry
  chunk is about 200.5 kB raw / 52.1 kB gzip; shared and route chunks are additional
  transfers. This entry-only budget is not the full page weight.
- Browser: desktop services open with Enter and close with Escape, restoring
  trigger focus. Dark mode updates native UI and metadata and survives reload;
  switching to System restores `light dark`. No captured console errors during
  those interactions or the mobile calculator check, including CSP enforcement.
- At 320 CSS pixels, the normal home page reflows without horizontal overflow.
  A QA-only proxy with a 200% root font exposed header overflow; wrapping the
  controls fixed it. The enlarged 320px calculator has a 305px content width, a
  working estimate update and a scrollable header constrained to the viewport.
  The normal 390px calculator retains the existing visual composition. The
  temporary proxy's font override is not part of the shipped application.

Lighthouse 13.6.0, local production home page (one final valid run per device):

| Profile | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 94 | 100 | 100 | 63 | 1.10 s | 285.5 ms | 0 |
| Desktop | 100 | 100 | 100 | 63 | 0.36 s | 50.5 ms | 0.00004 |

SEO is limited by intentional noindex. An earlier valid mobile run scored 97;
these are individual lab runs, not medians or field INP results. Mobile main-thread
work and unused shared JS/CSS remain profiling opportunities; this review does not
claim a perfect performance score. A desktop trace failed with NO_NAVSTART and was
discarded; the table uses the successful retry. Local raw reports are in ignored
`.artifacts/modern-web-lighthouse-mobile-final.json` and
`.artifacts/modern-web-lighthouse-desktop-retry.json`.

The release remains noindex with online intake disabled. DNS/TLS, deployed CDN/proxy
headers, real-device Safari/Firefox behavior, assistive-technology testing and field
Core Web Vitals require separate validation. Text-scale metadata is progressive
enhancement; browsers without it retain ordinary zoom. A local root-font simulation
does not establish actual iOS/Android OS text-scale behavior.

The outstanding picomatch build-only advisory is unchanged by UI guidance and has
no published patch; see `BUILD_TOOLCHAIN_QA.md`. No forced dependency overrides or
suppression were introduced.

For future work, search a focused topic and retrieve matching guidance before
editing. Use `DISABLE_TELEMETRY=1` for CLI calls. For broad modernization, verify
each legacy-scan result against its keep/drop rubric and then run relevant type,
application, build and browser checks; do not chase a zero count by deleting safe
fallbacks. Revisit upstream versions and compatibility data when changing APIs.
