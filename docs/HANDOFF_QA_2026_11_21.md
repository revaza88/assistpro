# გადამოწმებული მოთხოვნიდან სატესტო თანამშრომლამდე — 2026-11-21

**იზოლირებული სატესტო გზა დადასტურდა.** ნამდვილი თანამშრომლის სამუშაო რიგი/შეტყობინების მიწოდება და production საცავი ამ ტესტით არ დასტურდება.

## საწყისი და შემოწმებული წყარო

- საწყისი commit: `2f8fb2905bf52e8f9582065919469d7eda8aa3c4`; branch `codex/assist-ai-chat-pilot`; დაუკომიტებელი სამუშაო არ იყო.
- დაწყებამდე ხელახლა გაიარა არსებული ქართული ჩატი → შესაბამისი წყარო → რედაქტირებადი მონახაზი და წინა browser QA-ის დანარჩენი შემთხვევები. [საწყისი მტკიცებულება](qa/2026-11-21-handoff/baseline-chat.json), იმავე runtime-ის წყარო `732a08f`. პირველი გზის ბლოკერი არ დარჩენილა; მიღებაზე მხოლოდ ამის შემდეგ გადავედით.
- ახალი შემოწმებული აპლიკაცია: **`440a5ae939392e146ab28425340dccc6ee537dfc`**, tree `d283137235d5ff4d7a86917f08d258ba32ac22ea`; clean build, Node 26.13.1, Windows. ანგარიშის შემდგომი docs commit ამ build-ის ახალ ვერსიად არ ჩათვალოთ.
- მხოლოდ `127.0.0.1`-ზე გაშვებული production build, Chrome 157.0.8103.79 headless, 390×844 CSS px, `CHAT_MODE=simulation`, `INTAKE_MODE=local`, `INDEXING_ENABLED=false`; ცალკე `.artifacts/handoff-runs/run-Kyb8vK/submissions.json`. ყველა QA პროცესი დასრულებისას შეჩერდა.
- AI **იმიტირებულია**. არც მოდელის API, არც რეალური კლიენტი, არც რეალური მიმღები და არც გარე შეტყობინების ტრანსპორტი არ გამოყენებულა.

## სამი დამოუკიდებელი შედეგი

| შედეგი | რა დადასტურდა | რა არ დადასტურდა |
|---|---|---|
| შენახვა | განაცხადი **#1**, ერთი ჩანაწერი; ფაქტობრივი მიღების დრო `2026-11-21T04:28:08.527Z`, retail / bookkeeping; შემოწმებული მოკლე აღწერა და ფორმის სინთეზური კონტაქტი | production მუდმივი საცავი/backup/retention/მრავალპროცესიანი გამძლეობა |
| თანამშრომლის მიერ ნახვა | დანიშნულმა სინთეზურმა `qa-responsible` როლმა Bearer-ით დაცულ loopback API-სა და CLI-ში ნომრით იპოვა იგივე #1/დრო/სერვისი/აღწერა. მის გარეშე/არასწორი credential-ით 401; სხვა ვალიდური სატესტო როლით 403 | კომპანიის ნამდვილი თანამშრომლის მონაწილეობა, რეალური SSO/RBAC/სამუშაო რიგი |
| შეტყობინება | განზრახ სიმულირებული ჩავარდნა: HTTP502, `failed`, attempts=1; აღდგენისას `simulated`, attempts=2, ისევ #1 და count=1. განმეორებითი წარმატებული სიმულაცია attempts-ს აღარ ზრდის | ნამდვილი წერილის/შეტყობინების მიწოდება: `actualDelivery=false`; გარე გაგზავნა 0 |

ავტორიზებული HTTP როლის პროგრამული ტესტი ადამიანის მიერ მიღების მტკიცებულებად არ ითვლება. CLI არის სატესტო ჩანაწერის წაკითხვის ინსტრუმენტი; საჯარო admin panel ან CRM არ შექმნილა.

## ერთი პრაქტიკულად გავლილი გზა

1. ქართული კითხვა „მცირე ბიზნესი მაქვს და ბუღალტერიაში დახმარება მჭირდება“ → ვაჭრობა/მაღაზია → მიმდინარე აღრიცხვა → accounting-ის რეალურ ბმულზე გადასვლა.
2. ჩატის კვლავ გახსნა → მონახაზის ნახვა და შესწორება → მხოლოდ შემოწმებული აღწერისა და შერჩეული მომსახურების გადატანა **არსებულ** საკონტაქტო ფორმაში. `mailto:info@assist.ge` მონახაზი სარეზერვოდ დარჩა. ჩატის ტექსტური ისტორია ფორმაში არ გადატანილა.
3. სახელი `სატესტო ვიზიტორი` და `handoff-fixture@example.invalid` დაემატა ცალკე ფორმაში. ამის შემდეგ დამატებითი ჩატის კითხვაც შესრულდა და მისი request body-ში ეს კონტაქტები არ აღმოჩნდა. თანხმობის გარეშე POST=0.
4. პირველი POST ნამდვილად ინახება, მაგრამ HTTP201 პასუხი განზრახ იკარგება. UI აჩვენებს მიღების დადასტურების შეცდომას, ინარჩუნებს ველებს და ნომერს არ აჩვენებს. retry/ორმაგი დაჭერა აბრუნებს #1-ს; count=1.
5. უფლებამოსილი სატესტო როლი კითხულობს #1-ს. შეტყობინების ჩავარდნის მიუხედავად ჩანაწერი ხელმისაწვდომია. რეალური process stop/start-ის შემდეგ იგივე idempotency key/იგივე შინაარსი აბრუნებს #1-სა და თავდაპირველ დროს. შეცვლილი შინაარსი იგივე გასაღებით იღებს 409-ს და ძველს არ გადაწერს.

იმავე კონტაქტითა და შინაარსით **ახალი განზრახ განაცხადი**, ახალი გასაღებით, გახდა **#2**: საბოლოო count=2. ეს მეორე განაცხადი ცალკე გამოცდაა და #1-ის დუბლიკატი არ არის. შემდეგ მიღება გამოირთო: POST503, საცავის ბაიტები უცვლელია, staff route404, ფორმა disabled და ელფოსტა ხელმისაწვდომი.

## განხორციელების ფაილები

- `client/src/components/AssistChat.tsx`: მხოლოდ იზოლირებულ რეჟიმში არსებული ფორმისკენ გადატანა; მონახაზის ცალკე in-memory context; თანხმობა ხელახლა მოსანიშნია. ფორმის კონტაქტები AI request-ის შემადგენლობა არ არის.
- `client/src/lib/request-copy.ts`: KA/EN/RU შეცდომა ახლა ამბობს, რომ მიღების დადასტურება ვერ მივიღეთ — დაკარგული პასუხისას არ აცხადებს, რომ შენახვა არ მომხდარა.
- `server/chat/routes.ts`: უსაფრთხო boolean `testIntakeEnabled`; credentials კლიენტში არ მიდის.
- `server/routes.ts`, `server/file-storage.ts`, `src/shared/types.ts`: იგივე POST `/api/contacts`, იგივე ნომერი/იდემპოტენტური შენახვა; durable test-assignee და ცალკე notification simulation state.
- `server/test-staff.ts`: ნაგულისხმევად არარეგისტრირებული API; explicit test flag + local intake + loopback HOST + `.artifacts` საცავი + ორი განსხვავებული 256-bit სინთეზური credential. მხოლოდ დანიშნული როლი კითხულობს კონკრეტულ ნომერს. idempotency/fingerprint ველები lookup პასუხში გამოტოვებულია.
- requestLogger/requestTracing staff პასუხებს/საკონტაქტო მონაცემებს არ იწერს. QA-ში სრული აღწერა, სატესტო email და credential-ები stdout/stderr-ში არ მოხვდა.
- `server/test-staff.test.ts`, `scripts/handoff-qa.mjs`, `scripts/test-staff-lookup.mjs`, package test command: რეგრესიები და გამეორებადი QA.

დაცვის საზღვარი არის loopback HTTP/API. იგივე OS ანგარიშზე ფაილზე პირდაპირი წვდომა production ავტორიზაციას არ წარმოადგენს; Windows-ის რეალური ACL/ოპერატორთა წვდომა ცალკე გასამართია. `.artifacts` სატესტო პროცესი ინტერნეტში/proxy-ით არ გამოიტანოთ. პირადი თანამშრომლის credential/პაროლი არ გამოყენებულა; random token-ები QA პროცესის მეხსიერებაში იყო და ანგარიშში არ ინახება.

## ახალი შემოწმებები

| შემოწმება | შედეგი |
|---|---|
| `npm run check` | წარმატებული |
| `npm test` | **85/85**, 82 არსებული + 3 ახალი; 0 გამოტოვებული |
| `npm run build` | წარმატებული, clean source |
| მიზნობრივი staff/API ტესტები | 3/3; fail-closed კონფიგურაცია, ორი concurrent/reopen/replay/conflict/new-intent, როლები, durable notification failure/retry |
| production browser/API QA | `scripts/handoff-qa.mjs`: passed=true; 390×844, რეალური source navigation, review/form/privacy/lost201/retry/receipt/staff/restart/conflict/notification/disabled გზა |
| strict release audit | loopback-ზე ზემოთ მითითებული სრული commit/tree და 8 asset; წესები უცვლელია |
| ბრენდი | Master PNG SHA256 `449ff8c94c993a29bc58f9e0e43bb04d594088e367eeb015fd094fbd73191a5e`; token/font/navigation ცვლილება 0 |
| გარე მოქმედებები | browser externalRequests=0; mailActions=0; რეალური შეტყობინება 0; main merge/push/deploy/hosting ცვლილება 0 |

მტკიცებულება: [result.json](qa/2026-11-21-handoff/result.json), [ტესტები](qa/2026-11-21-handoff/tests.txt), [build](qa/2026-11-21-handoff/build.txt), [მობილური receipt](qa/2026-11-21-handoff/mobile-receipt.png), [disabled/email](qa/2026-11-21-handoff/disabled-contact.png).

ეს არის ტელეფონის ზომის **ბრაუზერული** ტესტი; ფიზიკური ტელეფონი ან screen reader არ გამოყენებულა. EN/RU ახალი მიღების გზის სრული UI სცენარი ამ ეტაპზე არ ჩატარებულა; წინა ჩატის EN/RU baseline ცალკე მტკიცებულებაა.

## გამეორება 4 ნაბიჯში

1. PowerShell-ში: `cd D:/Assist/assist-ai-chat`. დარწმუნდით, რომ checkout სუფთაა. დამოკიდებულებების დამოუკიდებელი ინსტალაციისთვის `npm ci` (ამ worktree-ში უკვე არსებული node_modules junction გამოიყენება).
2. გაუშვით `npm run check`, `npm test`, `npm run build`. ახალი checkout-ის commit არ უნდა განსხვავდებოდეს მის მიერ ახლად შექმნილი release manifest-ისგან.
3. ქვემოთ მითითებული test-only Playwright გარემოთი გაუშვით `node scripts/handoff-qa.mjs`. სკრიპტი თვითონ ქმნის ახალ იზოლირებულ საცავს/credential-ებს/loopback პროცესებს, გადის ქართულ UI-ს, staff CLI-სა და restart-ს, და ბოლოს აჩერებს პროცესებს.
4. stdout-ში მითითებულ `.artifacts/handoff-runs/run-*/result.json`-ში ნახეთ requestId, countAfterLostReplyAndRetry=1, countAfterRestartAndNotificationRetry=1, authorizedRead და notification-ის ცალკე შედეგები. გვერდით არის ახალი რეალური mobile screenshot-ები და მხოლოდ სინთეზური submissions.json. intentional newIntent-ის შემდეგ finalCount=2 უნდა იყოს.

ამ კომპიუტერის test runtime:

```powershell
$env:NODE_PATH='C:/Users/akvli/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
$env:BROWSER_EXECUTABLE='C:/Program Files/Google/Chrome/Application/chrome.exe'
node scripts/handoff-qa.mjs
```

Playwright მხოლოდ QA ინსტრუმენტია; აპლიკაციას ახალი dependency/ფასიანი სერვისი არ დამატებია. სხვა კომპიუტერზე მიუთითეთ საკუთარი სატესტო Playwright და Chrome. ახალი script git-ის მონაცემებს უშუალოდ იღებს და strict audit-ისთვის ფიქსირებულ SHA-ს არ იყენებს.

ხელით დათვალიერებისთვის ცალკე PowerShell session-ში გამოიყენეთ production build loopback HOST/PORT-ით, `INTAKE_MODE=local`, `TEST_STAFF_MODE=local`, `.artifacts`-ში ცალკე აბსოლუტური DATA_FILE, `CHAT_MODE=simulation`, `INDEXING_ENABLED=false`, `LOG_TO_FILE=false`. `TEST_STAFF_TOKEN` და `TEST_OTHER_STAFF_TOKEN` დამოუკიდებლად გენერირდება `node -p "require('node:crypto').randomBytes(32).toString('hex')"`-ით. `TEST_NOTIFICATION_RESULT=fail` განზრახ ჩავარდნას ტოვებს. იმავე გარემოდან `TEST_STAFF_ORIGIN=http://127.0.0.1:<PORT>` და `node scripts/test-staff-lookup.mjs <ნომერი>` კითხულობს ჩანაწერს; სხვა token-ით იღებს 403-ს. ეს პარამეტრები ჰოსტინგზე არ გადაიტანოთ. გამორთვისას პროცესი შეჩერდეს და თავიდან გაეშვას `TEST_STAFF_MODE=disabled`, `INTAKE_MODE=disabled`, `CHAT_MODE=disabled`-ით; მხოლოდ flag-ის runtime გარე შეცვლა გაშვებულ Node პროცესს არ ცვლის.

## წარმოებისთვის დარჩენილი გადაწყვეტილებები

დასამტკიცებელია: ნამდვილი პასუხისმგებელი თანამშრომელი და მისი ავტორიზაცია; მუდმივი production საცავი/backup/retention/მრავალპროცესიანი იდემპოტენტურობა; რეალური სატესტო რიგი და უსაფრთხო შეტყობინების არხი/outbox/retry; მონიტორინგი და მიღების გამორთვაზე პასუხისმგებელი. შემდეგ ნამდვილი უფლებამოსილი თანამშრომელი უნდა შევიდეს შეთანხმებულ სატესტო სისტემაში და იგივე ნომერი თავად ნახოს. ზემოთ მოცემული პროგრამული `qa-responsible` ამ ბიზნესმიღებას ვერ ანაცვლებს.

საჯარო main კვლავ `67f665f`-ია. ჰოსტინგის `release.json` ფიქსი ცალკეა და ამ სამუშაოში არ შეცვლილა/მოგვარებულად არ გამოცხადებულა. საჯარო ონლაინ მიღება, ინდექსაცია, მოდელი ან შეტყობინებები არ ჩართულა. არქიტექტურა, Master V1.2, დამტკიცებული ღია თემა და მობილური მენიუ შენარჩუნებულია.
