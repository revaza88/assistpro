# Draft PR #7 — review/CI, 2026-11-21

[ახალი review და შემოწმებები](PR7_REVIEW_2026_11_21.md): ჩატის მდგომარეობისა და staff isolation-ის რეგრესიები გასწორდა, check/87tests/build და ადგილობრივი browser/handoff/release audit წარმატებულია. დაემატა მხოლოდ read-only CI (Node24 check/test/build/clean identity), deploy/production secrets-ის გარეშე. პირველი remote runs ორივე success; საბოლოო head-ის CI ცალკე PR Checks-ში მოწმდება. **main merge, საჯარო მიღება/ინდექსაცია/შეტყობინებები და hosting ცვლილება კვლავ აკრძალულია ამ ამოცანის ფარგლებში.** საჯარო release.json-ის ბლოკერი არ მოგვარებულა.

---

# იზოლირებული მიღების ახალი მტკიცებულება — 2026-11-21

`codex/assist-ai-chat-pilot`, შემოწმებული აპლიკაცია `440a5ae939392e146ab28425340dccc6ee537dfc`: [ჩატი → review → არსებული ფორმა → #1 → ავტორიზებული სინთეზური test-staff lookup](HANDOFF_QA_2026_11_21.md). 85 ტესტი/check/build/local strict release და ქართული mobile browser passed. შეტყობინება მხოლოდ ცალკე სიმულაციაა; production საცავი/რეალური თანამშრომელი/არხი კვლავ ღიაა. `TEST_STAFF_MODE` ნაგულისხმევად გამორთულია და loopback/local/.artifacts/სინთეზურ credentials-ს მოითხოვს. **ეს flag-ები ჰოსტინგზე არ გადაიტანოთ; main merge/push/deploy/ონლაინ მიღება/ინდექსაცია/შეტყობინებების ჩართვა ამ დავალებაში არ შესრულდეს.** საჯარო release.json წარმომავლობის საკითხი უცვლელად ცალკეა.

---

# AI ჩატის დახურული ვერსია — 2026-11-20

`codex/assist-ai-chat-pilot`: [წყაროებით შეზღუდული სიმულაცია, ახალი QA და სამეტაპიანი მიღების ზღვრები](AI_CHAT_PILOT.md). შემოწმებული აპლიკაცია `732a08f214e5092175134b4092cb00e9090286f8`: check, 82 ტესტი, production build, local strict release audit და headless Chrome KA/EN/RU გზა წარმატებულია. ეს არ არის რეალური მოდელის ან თანამშრომლის მიღების დადასტურება.

`CHAT_MODE` ნაგულისხმევად disabled-ია; მხოლოდ loopback preview-ში simulation. **main merge/push/deploy, hosting ცვლილება, საჯარო ჩატი, intake, ინდექსაცია და შეტყობინებები ამ ამოცანაში არ შესრულდეს.** არსებული release metadata-ს საჯარო ბლოკერი ღიაა. წყაროების კონკრეტული მფლობელი, მონაცემთა პირობები, მიმღები/საცავი/არხი/გამორთვა და მოდელის ხარჯის ზღვარი ცალკე მისაღებია. ქვემოთ ძველი გაშვების ჩანაწერები ახალი ნებართვა არ არის.

---

# შიდა პილოტის გამოშვების გადაწყვეტილება — 2026-11-20

**შიდა პილოტი დაბლოკილია:** თანამშრომლის მიღება/პასუხისმგებელი/სამუშაო რიგი არ დადასტურდა. შენახვისა და HTTPretry-ის QA49ტესტით/production build-ით გაიარა;ეს გაშვების ნებართვა არ არის. [შედეგი და აქტივაციის ოთხი გადაწყვეტილება](INTAKE_PILOT_QA_2026_11_20.md). main merge/push/deploy არ შესრულებულა;ახალი CRM/ბაზა/ინტეგრაცია/გარე შეტყობინებები/ინდექსაცია არ შექმნილა ან ჩართულა. მხოლოდ იზოლირებული loopback პროცესები გაეშვა და დასრულებისას შეჩერდა. წინა საჯარო commit/tree შეზღუდვა ამ სესიაში არ შეცვლილა/შემოწმებულა. main update კვლავ ავტომატურად აქვეყნებს;ცალკე თანხმობის გარეშე არ გააერთიანოთ.

---

# მიმდინარე სამუშაოს გამოქვეყნების ზღვარი — 2026-11-20

აპლიკაციის `cef77888d26dbd1a1cefb9e1b1a0006164ee8e52` იზოლირებული intake QA წარმატებით შემოწმდა; რეალური თანამშრომლის მიღება **არ დადასტურებულა**. [ანგარიში და აქტივაციის გადაწყვეტილებები](INTAKE_JOURNEY_QA_2026_11_20.md). მხოლოდ loopback-ზე იყო INTAKE_MODE=local; წარმოებაში intake/indexing კვლავ გამორთულია. **main-ში არ გააერთიანოთ და არ გამოაქვეყნოთ ამ დავალების საფუძველზე** — main update ავტომატურად აქვეყნებს. ბაზა/შეტყობინებები/ინდექსაცია ცალკე თანხმობას მოითხოვს. საჯარო release.json-ის commit/tree=null შეზღუდვა კვლავ არსებობს და strict audit ვერ გადის; წესი არ შესუსტებულა. ქვემოთ ისტორიული გამოქვეყნების ჩანაწერები მიმდინარე ნებართვა არ არის.

---

# assist.ge — მოქმედი გამოქვეყნების გზა

19 ნოემბერი 2026: მომხმარებლის თანხმობით PR #1 გაერთიანდა main-ში (fbb86db1b3fccc25c32c449766a3075c72929cd2). **main-ის განახლებას მოჰყვა არსებული ავტომატური გამოქვეყნება https://assist.ge-ზე**. 17–18 ნოემბრის ისტორიული პროცესი სწორედ GitHub main-ის update იყო; ცალკე დადასტურებული SSH deployment ჩანაწერი არ მოიძებნა. ამ გზისთვის ახალი ჰოსტინგი, DNS ან Sites project არ შექმნათ. შემდეგი სამუშაოსას ჯერ შეამოწმეთ განშტოება, მომხმარებლის merge/deployment scope და მიმდინარე remote HEAD; მარტო feature branch-ის push live საიტს არ განაახლებს.

საჯარო შემოწმება: [15 გვერდი, actual JS/CSS hashes, ლოგო, ფონტები და browser კადრები](brand/qa/2026-11-19-refinement/public-release.json). INTAKE_MODE=disabled / INDEXING_ENABLED=false შენარჩუნებულია, write მოთხოვნა არ გაგზავნილა. აპლიკაციის check/33 tests/build შედეგები მანამდე შესრულებული იგივე კოდის შემოწმებაა.

ღია ტექნიკური საკითხი: hosting build-ის release.json commit/tree/dirty არის null; strict audit-release **არ გადის**. საწყისი asset-ების ზომა/hash დამოუკიდებლად ზუსტად დაემთხვა ცნობილ შემოწმებულ build-ს, ამიტომ ვიზუალური განახლება დადასტურებულია, მაგრამ სრული Git provenance არა. existing hosting pipeline-ში გადასაცემია RELEASE_COMMIT, RELEASE_TREE, RELEASE_DIRTY=false მხოლოდ clean source-ისთვის. ნუ ჩაწერთ გამოგონილ SHA-ს და ნუ შეასუსტებთ strict audit-ს. Docker deploy.sh საჭირო არგუმენტებს უკვე გადასცემს, არსებული ავტომატური ჰოსტინგის build კი ჯერ არა.

ქვემოთ ძველი „ჰოსტინგის კავშირი არ მოიძებნა“ აღწერს მხოლოდ პირდაპირი SSH/panel წვდომის მდგომარეობას; main-ის ავტომატური გზა უკვე დადასტურებულია. პანელი ჯერ საჭიროა მხოლოდ build metadata-ს კონფიგურაციისა და სხვა hosting ოპერაციებისთვის.

---

# მიმდინარე რელიზი — assist.ge, 19 ნოემბერი 2026

დომენი მომხმარებელმა დაადასტურა: **https://assist.ge**. ქვემოთ არსებული ადრინდელი „დომენი უცნობია“ ჩანაწერები ისტორიულია. ახალი შემოწმებული runtime არის **4272cc5584e2237455ed12cc58fdb3262dd7f802**, tree **ac79d6b1294b122ff26d33d29b09303c9ab7a120**. კოდი feature branch-შია; Draft PR #1 merge არ შესრულებულა. GitHub push სერვერის restart/deploy-ს არ ნიშნავს. ახალი root HTML ძველ JS/CSS fingerprints-ს იყენებს; ახალი release.json 404-ია. ჰოსტინგის ავტორიზებული კავშირი ამ გარემოში ვერ მოიძებნა.

## გასაშვები გეგმა არსებული ჰოსტინგის კავშირის მიღების შემდეგ

1. დადგინდეს რეალური ჰოსტი, SSH account ან პანელი, nginx upstream, არსებული process manager (Docker/PM2/სხვა) და release directory. მაგალითის CloudPanel მისამართი ნამდვილ სამიზნედ არ ჩაითვალოს. შეინახოს მიმდინარე მუშა image/release ID და არსებული env; საიდუმლოებები არ გადავიდეს GitHub-ში.
2. არსებული დირექტორიის ცვლილებების შენარჩუნებით შეიქმნას ცალკე clean release checkout, pinned source SHA-ით. ამ ეტაპზე source runtime: 4272cc5584e2237455ed12cc58fdb3262dd7f802; დოკუმენტაციის ახალი commit ცალკე შეიძლება მოჰყვეს. არ გამოიყენოთ hard reset ან force-push.
3. Node24-ში npm ci → npm run check → npm test → npm run build. Docker-ის შემთხვევაში deploy.sh clean source SHA/tree-ს build ARG-ებით გადასცემს; შეინარჩუნეთ source metadata. Compose build args-ის კონტრაქტი: https://docs.docker.com/reference/compose-file/build/#args . არსებული env არ გადაიწეროს ბრმად example ფაილით.
4. SITE_URL/CORS_ORIGIN და proxy დარჩეს დადასტურებულ HTTPS origin-ზე. INTAKE_MODE=disabled და INDEXING_ENABLED=false შენარჩუნდეს; ბაზა/მიგრაციები/გარე შეტყობინებები არ ჩაირთოს. გაეშვას მხოლოდ არსებული process manager-ის შესაბამისი რელიზი; არ შეიქმნას პარალელური კონკურენტი production პროცესი.
5. სერვერის loopback origin-ზე შესრულდეს smoke/audit-web და audit-release expected SHA-ით. საჯარო origin-ზე მხოლოდ read-only შემოწმება: node scripts/audit-release.mjs https://assist.ge 4272cc5584e2237455ed12cc58fdb3262dd7f802. HTML, release.json და ოთხი საწყისი ფაილის bytes/hash უნდა ემთხვეოდეს; proxy არ უნდა აბრუნებდეს ძველ HTML-ს ან nonce/CSP-ის აცდენილ წყვილს. საჯარო ფორმაზე ავტომატური POST არ გაგზავნოთ.
6. რეალურ assist.ge-ზე ნახეთ desktop/mobile, მენიუ და არჩევანი → კალკულატორი → გამორთული მიღების გვერდი. ჩავარდნისას არსებული process manager-ით დაბრუნდით წინასწარ ჩაწერილ წინა image/release-ზე და ხელახლა გადაამოწმეთ მისი health/ვერსია. ძველი მუშა გამოშვება შემოწმებამდე არ წაშალოთ.

ლოკალური release candidate **assistpro:brand-4272cc5584e2** შემოწმებულია Linux Node24.22.3-ში; non-root/read-only container, 33 ტესტი, TypeScript/build და loopback HTTP/version audit წარმატებულია. ეს საჯარო deployment არ არის. ახალი დიზაინის მტკიცებულებები: [ანგარიში](brand/qa/2026-11-19-refinement/current-run.json), [დაფა](brand/qa/2026-11-19-refinement/visual-board.png).

---

# გამოქვეყნებისთვის მომზადება

2026-11-18: მობილურის ოპტიმიზაციის შემდეგ 25 ტესტი, TypeScript და ბილდი
წარმატებულია. საწყისი JS/CSS-ისა და Lighthouse-ის განმეორებითი გაზომვები:
[მობილურის Performance ანგარიში](MOBILE_PERFORMANCE_QA.md).

ეს არის არსებული React/Vite/Express რეპოზიტორია. დომენი და ჰოსტინგი ჯერ
დადასტურებული არ არის. ბაზა, რეალური განაცხადების მიღება და გარე შეტყობინებები
არ შექმნილა. პირველი საჯარო ვერსია შეიძლება იყოს საინფორმაციო საიტი, სერვისების
არჩევით, დემო კალკულატორითა და `info@assist.ge`-ზე ელფოსტით დაკავშირების გზით.

2026-11-17 შემოწმება: TypeScript, 18 ტესტი და production build წარმატებულია.
Docker runtime მხოლოდ production დამოკიდებულებებით გაეშვა; Vite runtime-ში არ
არის. შესრულდა health/HTML/404/noindex/გამორთული მიღების smoke ტესტი და Compose
კონფიგურაციის შემოწმება. DNS/TLS და საჯარო ჰოსტინგი ჯერ არ შემოწმებულა.

Modern Web Guidance-ის შემდგომ ცვლილებებზე TypeScript, 23 ტესტი და ბილდი
გაიარა. production სკრიპტები იყენებს თითო პასუხისთვის ახალ CSP nonce-ს.
Proxy/CDN-მ HTML და მისი CSP სათაური ერთად უნდა გაატაროს; HTML-ის ცალკე
ქეშირება ან CSP-ის სხვა წესით გადაწერა nonce-ს დაარღვევს. შემოწმებები და
გამოყენებული რეკომენდაციები: [Modern Web Guidance](MODERN_WEB_GUIDANCE.md).

Runtime audit განახლების შემდეგ 0 advisory-ს აჩვენებს. თავდაპირველი 4
build/development advisory გამოსწორებულია Vite 8.3.8 / React plugin 6.3.0 /
esbuild 0.28.2 განახლებითა და გამოუყენებელი typography plugin-ის ამოღებით.
2026-11-17-ის ახალ სრულ აუდიტში რჩება სხვა, ჯერ შეუსწორებელი `picomatch`
advisory და მისი დამოკიდებული ჯაჭვები (12 high package findings; ერთი ძირეული
advisory). დეტალები და შემოწმებები: [toolchain ანგარიში](BUILD_TOOLCHAIN_QA.md).
Dev server საჯაროდ არ გახსნათ; ავტომატური `npm audit fix --force` არ გამოყენებულა.

## რა მომზადდა

- Node 24-ის მრავალეტაპიანი Dockerfile: სრული დამოკიდებულებები ბილდის/ტესტების
  ეტაპზე და მხოლოდ runtime დამოკიდებულებები გაშვების ეტაპზე. production სერვერი
  აღარ მოითხოვს Vite-სა და build plugin-ებს. სრული `dist/prerender` მოყვება ბილდს.
- Compose: ერთი არაპრივილეგირებული პროცესი, მხოლოდ localhost-ზე გამოჩენილი პორტი,
  healthcheck, გადატვირთვა, stdout ლოგები და შეზღუდული writable მოცულობა. მოცულობა
  არ არის production ბაზა; საჯარო მონაცემების მიღება გამორთულია.
- `.env.production.example`, ერთპროცესიანი PM2 ალტერნატივა, Nginx-ის შაბლონი და
  შემოწმებადი deploy სკრიპტი. ის არ აკეთებს ავტომატურ git pull-ს ან მიგრაციებს.
- `INTAKE_MODE=disabled` production-ის ნაგულისხმევია: API აბრუნებს 503-ს,
  ფორმა გამორთულია და მომხმარებელს ელფოსტით მიმართვას სთავაზობს. `local` მხოლოდ
  ცალკე შეთანხმებული ლოკალური ტესტისთვისაა; მას რეალური მიღების პროცესად ნუ ჩათვლით.
- ინდექსაცია staging-ზე გამორთულია. ჩართვისთვის საჭიროა დადასტურებული HTTPS origin.

## დომენი — დარჩენილი ნაბიჯები

1. დადასტურდეს საბოლოო დომენი და ძირითადი მისამართი: root თუ `www`.
   ელფოსტის `assist.ge` დომენი ავტომატურად საიტის დომენად არ მიგვიჩნევია.
2. რეგისტრატორში წვდომა, მოქმედი DNS ჩანაწერების შემოწმება და ჰოსტინგის ზუსტი
   სამიზნის მიხედვით A/AAAA ან CNAME-ის დამატება. AAAA მხოლოდ მოქმედი IPv6-ისას.
   IP-ს ან DNS სამიზნეს წინასწარ არ ვიგონებთ.
3. არსებული ელფოსტის MX/TXT/SPF/DKIM/DMARC ჩანაწერები შენარჩუნდეს. საიტის გადატანა
   არ ნიშნავს ფოსტის გადატანას.
4. ძირითადი და ალტერნატიული ჰოსტი TLS სერტიფიკატში მოხვდეს; ალტერნატიული ჰოსტი
   და HTTP ერთიანი canonical HTTPS მისამართისკენ გადამისამართდეს.

## ჰოსტინგი — დარჩენილი ნაბიჯები

საჭიროა Node.js პროცესის ან Docker კონტეინერის მხარდაჭერა. მხოლოდ სტატიკური
ჰოსტინგი ამ Express build-ს, HTTP სტატუსებსა და runtime SEO კონფიგურაციას სრულად
ვერ ჩაანაცვლებს. პროვაიდერი, ბიუჯეტი, რეგიონი და მართვაზე პასუხისმგებელი ასარჩევია.

### Docker / VPS გზა

```sh
cp .env.production.example .env.production
# ჩაწერეთ რეალური SITE_URL/CORS_ORIGIN; INDEXING_ENABLED=false დარჩეს.
chmod 600 .env.production
node --env-file=.env.production scripts/check-environment.mjs
./deploy.sh production
```

`deploy.sh` მოითხოვს Node 24-ს კონფიგურაციის შემოწმებისთვის, Docker Compose-ს,
Git-სა და curl-ს. ახალი იმიჯი ბილდდება და ტესტდება, შემდეგ იცვლება კონტეინერი.
გაშვება შეამოწმეთ `docker compose ps` და `docker compose logs --tail=100 web`-ით.
პორტი 3000 საჯაროდ არ გაიხსნას; გარე ტრაფიკი 80/443-ზე Nginx-მა მიიღოს.
`deploy/nginx.conf.example` შეიცავს ჩასანაცვლებელ დომენსა და სერტიფიკატის გზებს.
TLS-ის გაცემა/განახლება და DNS პროვაიდერზე უნდა შესრულდეს. `nginx -t` წარმატებული
უნდა იყოს გადატვირთვამდე.

ერთი კონტროლირებადი reverse proxy გამოიყენეთ. Nginx შაბლონი კლიენტის forwarded
სათაურებს გადაწერს. Compose-ში `TRUST_PROXY=1` მხოლოდ localhost პორტით ამ სქემისთვისაა.
Cloudflare/load balancer-ის დამატებისას proxy/IP ჯაჭვი ხელახლა გადასამოწმებელია.

მონიშნეთ წინა მუშა იმიჯის tag გაშვებამდე. rollback-ისას გამოიყენეთ წინა tag და
შეცვლამდე შენახული კონფიგურაცია, მაგალითად:

```sh
ASSISTPRO_IMAGE=assistpro:PREVIOUS_COMMIT docker compose up -d --no-build --force-recreate
```

### PM2 / CloudPanel ალტერნატივა

შეარჩიეთ Node 24 runtime, სამუშაო დირექტორია და Node app-ის პორტი 3000. მოამზადეთ
`.env.production`. build-ისთვის devDependencies საჭიროა:

```sh
npm ci --include=dev
npm run check
npm test
npm run build
npm prune --omit=dev
pm2 startOrRestart ecosystem.config.cjs --update-env
```

ბილდი შექმენით ახალ release დირექტორიაში, არსებული გაშვებული `dist`-ის ზემოდან
წაშლის გარეშე. PM2 კონფიგურაცია კითხულობს იმავე დირექტორიის `.env.production`-ს.
ერთი პროცესი/რეპლიკა შეინარჩუნეთ. CloudPanel-ის მიერ პროცესი უკვე თუ იმართება,
მეორე პროცეს-მენეჯერი არ ჩართოთ. healthcheck, restart, ლოგების როტაცია და
მონიტორინგი ჰოსტინგზე დასაკონფიგურირებელია. deploy-ს უნდა მოჰყვეს restart,
რადგან საწყისი HTML სერვერის მეხსიერებაში ინახება.

## ინდექსაცია — დარჩენილი ნაბიჯები

1. staging დარჩეს `INDEXING_ENABLED=false`; საჯარო დომენზე TLS/redirect-ები და
   შინაარსი შემოწმდეს. დადასტურდეს რეალური საჯარო ტექსტები, საკონტაქტო მისამართი,
   დემო ფასების აღნიშვნა და გამორთული მიღების განმარტება.
2. იმავე canonical origin-ზე ჩაიწეროს `SITE_URL` და `CORS_ORIGIN`. დარწმუნდით,
   რომ proxy/CDN ზედმეტ `noindex` სათაურს ან ძველ HTML ქეშს არ ამატებს.
3. მხოლოდ საჯარო გაშვებისას გახდეს `INDEXING_ENABLED=true`, პროცესი გადაიტვირთოს.
   `/robots.txt`, `/sitemap.xml`, canonical/OG URL და 404 პასუხები შემოწმდეს გარე HTTPS-ით.
   კონტაქტი, დაუდასტურებელი გუნდი/კარიერა და შერჩევის query-ბმულები noindex რჩება.
4. Google Search Console-ში დომენის მფლობელობა TXT ჩანაწერით დადასტურდეს,
   გაიგზავნოს sitemap და URL Inspection-ით შემოწმდეს ძირითადი გვერდები.
   ცალკე შეიძლება Bing Webmaster Tools. შედეგი ინდექსაციის/რანკინგის გარანტია არაა.
5. რეალურ ჰოსტინგზე განმეორდეს Lighthouse და შემდეგ შემოწმდეს Search Console-ის
   რეალური Core Web Vitals. ლოკალური ქულები ვერ ზომავს პროვაიდერის/CDN-ის სიჩქარეს.

## საჯარო მიღება და ბაზა

ბაზის შექმნა კვლავ გამოტოვებულია. რეალური ფორმის ჩართვამდე ცალკე გადასაწყვეტია:
მონაცემების მიმღები, დაცული მუდმივი საცავი, შენახვა/წაშლის წესი, მომხმარებლისთვის
ზუსტი განმარტება, შეტყობინებების არხი და შეცდომების აღდგენა. მანამდე საიტზე
პერსონალური მონაცემების შეგროვება გამორთულია. Docker მოცულობაში, Git-ში ან
გამოქვეყნების არქივში ლოკალური საცდელი ჩანაწერები არ უნდა გადავიდეს.

## მიღების შემოწმება

`node scripts/smoke-release.mjs http://127.0.0.1:5004` ამოწმებს noindex release-ის
HTML-ს, health-ს, 404-სა და გამორთულ API-ს. საჯარო დომენზე ცალკე უნდა შემოწმდეს
DNS/TLS, redirect, canonical/sitemap, ტელეფონის ბრაუზერი, მენიუ, სერვისები,
კალკულატორი და ელფოსტის ბმული. არსებული ტესტების გაშვება და GitHub-ზე push არ
ნიშნავს რეალურ ჰოსტინგზე განთავსებას.

მითითებები: [Docker-ის მრავალეტაპიანი build](https://docs.docker.com/guides/nodejs/),
[Express reverse proxy](https://expressjs.com/en/guide/behind-proxies/),
[Google Search Console დაწყება](https://developers.google.com/search/docs/monitor-debug/search-console-start).


## შემდგომი ბრენდული მითითება — 2026-11-18

მომხმარებელმა ავტორიზაცია მისცა მოწოდებული ბრენდის პაკეტის სრულ გადატანას,
ლოგოსა და კომპანიის ინფორმაციის ჩათვლით. ადრეული ჩანაწერები დაუდასტურებელი
ბრენდისა და იურიდიული სახელის შესახებ ამ ნაწილში ჩანაცვლებულია. მიმდინარე
ინტეგრაცია და გაშვება: `docs/brand/COMPLETE_INTEGRATION.md` (რეპოზიტორიის ძირიდან).
ბაზის, intake-ისა და დომენის საკითხები ამით არ გააქტიურებულა.
