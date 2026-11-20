# მიმდინარე განაცხადის ტესტი — 2026-11-20

არსებული საიტის იზოლირებული QA დასრულებულია: შენახვა შემოწმდა; თანამშრომელთან მიღება არ დადასტურდა. [ახალი ანგარიში, გარემო, შესწორებები და5ნაბიჯიანი გამეორება](INTAKE_JOURNEY_QA_2026_11_20.md). შემოწმებული აპლიკაცია `cef77888d26dbd1a1cefb9e1b1a0006164ee8e52`, TypeScript/48ტესტი/build წარმატებულია. ქვემოთ2026-11-16-ის ანგარიში ისტორიულია და ახალ ტესტად არ ჩაითვალოს.

---

# Local user journey verification — 2026-11-16

Scope: existing React/Vite/Express application, local production build on port
5001 and development server on port 5002. No database, live notification or
public deployment was created. Browser viewport tests do not establish physical
Android/iPhone compatibility or production readiness.

## Findings and corrections

- Choosing services and opening the calculator discarded the original industry
  and additional services. Explicit calculator links now carry a validated
  selection alongside the accounting inputs. The calculator, inquiry and
  selection editor show/preserve that selection. Stored inquiries retain the
  complete requested service list; the server still calculates only the demo
  accounting estimate, independently of extra services.
- Selection and calculation editing previously formed separate paths. Both
  can now be edited from the inquiry without losing the other context or the
  in-memory personal draft. The selector has a direct calculator action;
  relevant footer/navigation links preserve context. The mobile menu includes
  the calculator.
- Valid calculator changes now update the nonprivate URL using history replace.
  Refresh and menu/footer navigation retain the latest valid inputs without
  adding a history entry on each keystroke or losing field focus. Invalid counts
  suppress the estimate/continue action. Personal contact fields remain in memory
  only and are intentionally not restored after a full reload.
- Route changes now start at the top and focus the main content. Query-only
  changes, such as checking a service, preserve scroll and control focus.
- Contact consent was enforced only in the browser. The contact API now rejects
  missing/false consent as well. Older local records remain readable.

## Verified scenarios

| Check | Result |
| --- | --- |
| All 15 public routes, 360px and 1280px | Rendered expected headings/main content; no horizontal overflow |
| Home → service catalog → accounting detail → inquiry → edit selection | Service context carried into selection |
| Desktop: education + bookkeeping/HR → monthly calculator with VAT → inquiry → edit selection/payroll → edit employee count → submit | Success; saved full selection and server-derived demo range 590–790 |
| Mobile 360px: menu → retail + cleanup/legal → refresh → calculator → invalid/valid counts → inquiry → edit employee count → phone-only submit | Success; saved full selection and individual-assessment demo, no numeric cleanup price |
| Calculator change to 321 documents → refresh | Value, selection and links retained; input focus retained while editing |
| Empty inquiry submit | Field errors and focus on name; no request saved |
| Malformed combined calculator/selection link | Alert shown; submission disabled |
| Deliberate local file-write failure → retry after removing test blocker | Error preserved form and consent; retry succeeded, exactly one record saved |
| FAQ price question with Enter; mobile menu with Escape | Opened correct demo answer; closed menu |
| English selection → calculator at 390px | Translated selection and demo copy; no overflow |
| Dev and production HTTP/API smoke | All routes/assets 200; valid inquiries 201; invalid counts/consent 400; server ignored forged client amounts |

Validation: `npm run check`, `npm test` (13 tests), `npm run build`.
Existing nonblocking build warnings concern the Browserslist dataset and the
main JS chunk size. No physical-device or full accessibility audit was performed.
