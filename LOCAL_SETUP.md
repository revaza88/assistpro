# AssistPro Local Development Setup

## Prerequisites
Ensure Node.js 18+ is installed:
```bash
node --version
npm --version
```

## Quick Start
1. Install dependencies:
```bash
npm ci
```

2. Start development server:
```bash
npm run dev
```

3. Open browser at: http://localhost:5000

## Production Test
To test production build locally:
```bash
npm run build
npm start
```
Then open: http://localhost:5000 (the default port in both modes).

## Configuration and submissions

Set backend options in the process environment. For example, in PowerShell:

```powershell
$env:HOST = '127.0.0.1'
$env:PORT = '5001'
$env:CORS_ORIGIN = 'http://localhost:5001'
npm start
```

The backend does not automatically load `.env`; export variables or configure them in PM2.

Contact form submissions and job applications are saved to `data/submissions.json`.
The contact form reports success only after the server has saved the submission.
It does not send email notifications. Contact the team at `info@assist.ge` as an alternative.

For deployment, set `DATA_FILE` to a file on a persistent, private volume and back it up.
Run one server process per file (PM2 `instances: 1`); use a shared database before scaling
to multiple workers. Use separate `DATA_FILE` paths when running development and
production at the same time. The `data/` directory is ignored by Git and is not served
by Express. Invalid saved data causes startup to fail rather than erasing submissions.

Confirmed public company details are in `client/src/lib/company.ts`. The phone and
team profiles remain hidden until confirmed data is added. Unpublished blog,
testimonial and policy links are not shown.

## Industry selection and short inquiries

`/industries` offers 11 industry choices (including Other) and 13 independently
selectable service categories. Changing industry never clears the services.
Only category IDs are placed in the URL; refresh and the Edit selection link
preserve them. Invalid or ambiguous selection links cannot be submitted.

`/contact` requires a name, either an email address or phone number, and agreement
to use the details to respond. The description is optional. A form draft survives
in-app navigation to edit the selection; it is held in memory and clears on full
refresh or successful submission. Personal form fields are never added to the URL.
The server validates and saves `industry` and `services` in the existing local file.
Legacy `/contact?service=accounting` (and the other existing service slugs) remains
supported. Older stored submissions still load with empty/default selection fields.

`/faq` contains 10 questions with Georgian, English and Russian copy. The home page
uses three questions from the same content source. Answers describe the current
local test functionality; update them when live intake is activated.

No database, outbound notification provider or hosted intake service is created
by these features. Use synthetic data during local testing.

## Sites-aligned visual design

The public UI uses the reference Site's paper, forest-green and lime palette,
serif headings, a two-column financial illustration hero, lighter service cards,
three collaboration steps and a simpler footer. The report illustration is
explicitly labeled as illustrative data. Hero, process and footer copy supports
KA/EN/RU. Existing service pages use shorter titles, light introduction sections,
and wrapping action labels on narrow screens; their detailed text is retained.

Design tokens and responsive rules live in `client/src/index.css`; legacy
`brand-blue` and `brand-gold` Tailwind aliases map to the new palette. The full
desktop navigation starts at 1280px; smaller views use the disclosure menu.
Important mobile controls are at least 48px. Light/dark modes and the skip link
remain available. Motion follows the user's reduced-motion setting.

Browser verification covered the core pages at 360/390/430/768/1280px, all 14
public routes at 360/1280px, and tablet navigation at 1024px. The business-service
page's long action label now wraps. A synthetic inquiry was submitted at 360px.
This is browser viewport testing, not a physical Android/iPhone test.

```bash
npm run check
npm test
npm run build
```

## Demo cost calculator

`/calculator` follows the reference Site's form and demo model: four business
categories, employee/document counts, VAT status, and monthly accounting or
accounting cleanup. It supports KA/EN/RU and shows an explicit demo disclaimer.
These coefficients are illustrative, not approved tariffs or a commercial offer.
Monthly amounts exclude VAT; cleanup requires an individual assessment.

The shared model in `src/shared/pricing.ts` uses version `demo-1`:
`(200 + documents * 1.2 + employees * 12 + (vat ? 120 : 0)) * industryFactor`,
then a 0.9–1.2 range rounded to the nearest GEL 10. Industry factors are
1 / 1.2 / 1.4 / 1.3 for services / trade / manufacturing / hotels-food.
Default inputs produce GEL 340–460 per month, as a demo only.

The contact link carries validated calculator inputs, with no personal data.
Editing the calculation preserves the in-memory contact draft. Invalid or
incomplete calculator links block submission until corrected. The server
recalculates the estimate and saves both inputs and demo metadata in the existing
local JSON store; client-supplied amounts are ignored. No database is created.

Verification: TypeScript, all 12 automated tests and production build pass.
Browser checks covered 360/390/430/768/1280px without horizontal overflow, all
three languages, invalid inputs, VAT, cleanup, contact transfer/editing and a
synthetic mobile submission. Both local dev and production APIs returned 201
for valid inputs and 400 for negative counts, and persisted server-derived
demo amounts despite forged client amounts. These are browser viewport checks,
not physical-device tests.

## Performance and SEO

Release preparation and remaining domain/hosting/indexing steps are documented in
`docs/RELEASE.md`. Production now defaults to `INTAKE_MODE=disabled`; use
`INTAKE_MODE=local` only when explicitly testing the existing single-process file
store. The development entry is `server/dev.ts`; production no longer imports Vite.

Actual Lighthouse mobile/desktop results and reproduction commands are in
`docs/LIGHTHOUSE_QA.md`. Fonts are now self-hosted; there is no inline font loader
or Google Fonts runtime dependency. Local SEO remains intentionally noindex.

See `docs/PERFORMANCE_SEO_QA.md` for measurements, limits and publishing settings.
`npm run build` now includes React prerendering; deploy the entire `dist` output
and restart the process after rebuilding. Default local pages are noindex.
Configure a confirmed `SITE_URL` plus `INDEXING_ENABLED=true` before enabling
public canonical URLs and the sitemap. No domain is inferred from the email.

With the production server running, execute the HTTP audit from the repo root:

```powershell
node --import tsx scripts/audit-web.ts http://127.0.0.1:5001
```

## Common Issues

The later full-journey review is recorded in `docs/USER_JOURNEY_QA.md`. Calculator
links now preserve the complete industry/service selection; calculation and
selection editing preserve each other. Valid calculator edits survive refresh
through nonprivate URL parameters. The contact API requires explicit consent.
- If port 5000 is occupied, set `PORT` in the process environment before starting.
- If build fails: Check Node.js version (needs 18+)
- If modules missing: Delete node_modules and run `npm install` again

## Project Structure
- Frontend: React + TypeScript + Vite
- Backend: Express.js
- UI: Tailwind CSS + Radix UI components
- Forms: React Hook Form + Zod validation
