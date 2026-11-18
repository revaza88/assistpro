# Assistpro project context

Read `docs/SITES_ALIGNMENT.md` before planning product or architecture changes. It reconciles this repository with the user's related Sites project, records evidence limits, and distinguishes implemented features from proposals and demos.

- Preserve existing local work. This checkout uses React/Vite and Express; the reference Site uses Next.js. Do not silently replace the framework or merge independent project identities.
- The accessible Sites conversation explicitly deferred database selection/creation. Consider the roadmap without provisioning a database, activating production intake, or enabling outbound notifications as an incidental step. `MSA` is not a confirmed organization selection, and the unrelated `banki` project is out of scope.
- The current file store is a single-process local development facility, not the planned production PostgreSQL/API/authorization/outbox system.
- Confirmed public details live in `client/src/lib/company.ts`: info@assist.ge and ბიზნეს ცენტრი კრწანისი მოდერნი, გორგასლის №61. Unknown phone/team details must not be invented.
- Preserve the source roadmap's flexible industry and multi-service selection preference; fixed pricing packages, real tariffs, credentials and corporate claims require their own supporting information.
- Keep public site, staff CMS, company portal and native apps distinct. A demo UI, successful build, or mocked integration does not establish production readiness.
- The user requested alignment with the Sites visual design. Preserve the warm paper/dark green/lime palette and responsive compositions in `client/src/index.css`. Legacy `brand-blue`/`brand-gold` Tailwind names now map to these colors for compatibility; their names do not mean the previous blue/orange design should be restored.
- For application changes run appropriate checks: `npm run check`, `npm test`, `npm run build`, plus browser/API checks for affected flows. Documentation-only reconciliation does not require repeating unchanged application checks.
- For web UI changes consult Google's Modern Web Guidance before implementation: https://github.com/GoogleChrome/modern-web-guidance. Read `docs/MODERN_WEB_GUIDANCE.md` for the reviewed reference, applicability decisions and verification limits. Search/retrieve the guide for the specific task; a clean legacy scan is not a complete audit. Prefer Baseline Widely Available features, and use feature detection/progressive enhancement with usable fallbacks for newer APIs. Preserve the existing framework, accessibility, strict production CSP, and the user's deferred database/intake scope.
- Keep English/Russian translations on demand via `changeSiteLanguage`; preserve eager Georgian prerendering. Tailwind scans the client import graph, including literal dynamic imports, via `scripts/tailwind-content.ts`; register additional independent entry points there if introduced. Initial-load budgets include shared modulepreloads, not only the entry chunk. See `docs/MOBILE_PERFORMANCE_QA.md`.

<!-- ASSIST_BRAND_RULES_START -->
## ASSIST brand rules

Before changing the website's branding, copy, layout, logo use, or typography, read `docs/brand/BRAND_FOR_WEB.md`, `docs/brand/asset-manifest.json`, and the relevant parts of `docs/brand/ACCEPTANCE.md`.

- The approved visual baseline is the original Master V1.2. Preserve the glossy purple ribbon A, custom purple I, navy wordmark, Georgian `ასისტი`, original gradients, proportions, background, and layout.
- Do not redraw, regenerate, vector-trace, retype, crop, recolor, invert, or split the logo, and do not substitute the CR-42 vector candidate. A new logo variant requires a specific user request.
- The exact approved Georgian slogan is `თქვენი ბიზნესის მხარდამჭერი`. The lower service descriptor is omitted for now, per the user's latest decision on 2026-11-18. This does not remove services from ordinary website content.
- Preserve the distinction between approved decisions, documented reference values, proposed web implementation, and unresolved questions. The latest explicit user decision supersedes older brand examples only within its stated scope.
- The reference PNG is an existing documented digital export. Read its manifest status; its file identity is resolved, but its final linkage to the user-approved original Master is still pending. Do not silently label this linkage verified or invent a replacement if the production asset is missing. Check any existing approved asset already in the site first.
- `brand-tokens.css` records documented palette values and font names. Map them into the existing styling system within the authorized site task. It does not approve a new layout, theme, component state, or font delivery configuration.
- Check full-logo readability on the actual mobile and desktop pages. No separate favicon, monogram, transparent logo, or dark-mode logo is approved by this package.
- The PDF contains historical specimen text and old web/card examples. Do not copy their old descriptor into the current logo/slogan presentation. Do not publish reference documents or company details merely because they occur in a sample.
- Preserve the site's current architecture, working features, and unrelated edits. Follow the existing task and repository workflow; this handoff adds brand context and does not authorize a rebuild or deployment.
- When reporting brand work, name the changed files, relevant visual checks, remaining gaps, and the decision source. Keep the handoff version separate from logo Master V1.2 and from source document versions.
<!-- ASSIST_BRAND_RULES_END -->
