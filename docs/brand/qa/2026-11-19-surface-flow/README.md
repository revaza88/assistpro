> გამოქვეყნებულია: PR #4 / merge a4328ce. Public15routes/9asset hashes/4fonts და Chrome157 top/footer1440/390 წარმატებით შემოწმდა. [HTTP ანგარიში](public-publication.json).

# ფერების ბუნებრივი უწყვეტობა

საწყისი main a1e67ef; სამუშაო codex/assist-unified-surfaces. თეთრი header/footer და თითქმის შავი კონტენტი ერთ გვერდზე მკვეთრ გადასვლას ქმნიდა. OS dark mode / ძველი saved dark არჩევანი ამ მდგომარეობას ავტომატურად აბრუნებდა. ინჟინერული გადაწყვეტილებაა ერთიანი ღია საჯარო თემა; ძველი theme picker და ThemeProvider საჯარო აპლიკაციიდან მოხსნილია, prepaint script და CSS/HTML light-ს ინარჩუნებს. ძველი preference არ იშლება და პირადი მონაცემები არ იცვლება. კითხვაზე დამატებითი preference პასუხი არ მიღებულა; განხორციელებულია წინასწარ ახსნილი რეკომენდებული ღია მიმართულება.

დიდი მუქი CTA-ები და calculator result ახლა ნეიტრალურ #F0EDE8 ზედაპირზეა; canvas #FAF8F5,logo bands #FDFDFD,primary #6F2ED6/white. გრაფიკის მცირე stamp-იც ღიაა. იგივე grid/ზომები/შინაარსი/ლოგიკა შენარჩუნებულია; header-იდან მხოლოდ თემის კონტროლი მოიხსნა.

რეალურ accounting CTA-ზე დამატებით აღმოჩნდა navy ტექსტი იისფერ ფონზე: legacy .bg-brand-gold-500 წესი override-ს აკეთებდა. ეს წესი ახლა UI button-ს გამორიცხავს; actual computed foreground white დაbackground rgb(111,46,214),კონტრასტი6.91:1. ფოკუსი/hover/disabled სემანტიკური სტილები შენარჩუნებულია. ნეიტრალურ პანელზე navy ტექსტი14.07:1,დამხმარე ტექსტი6.06:1. კონტრასტი WCAG sRGB ფორმულით; ეს სრული WCAG სერტიფიცირება არ არის.

ახალი შემოწმებები: npm run check; npm test39/39; npm run build15+404; smoke-release; audit-web15 routes. Chrome157.0.8103.79,Windows native UI,production http://127.0.0.1:5016; home1440×900/390×844, დამატებით320×844; home-footer,calculator,accounting CTA. Keyboard breadcrumb focus რეალურად ხილულია; primary CTA-ს კლავიატურის სრული ნაკადი ამ მცირე შესწორებაში ცალკე არ გამეორებულა. old saved dark/dark OS/blocked storage-ის prepaint ქცევა ავტომატურ რეგრესიაში მოწმდება. ფიზიკური მოწყობილობა/AT არ გამოყენებულა. სრული ენების/ორიენტაციების მატრიცა არ გამეორებულა.

[რეალური მანამდე/შემდეგ](surface-comparison.png) · [მობილური footer](after-mobile.png) · [browser timestamps/URLs](browser-captures.json) · [actual button computed](service-button-computed.txt). შედარების მარცხენა კადრი https://assist.ge-ის საწყისი dark არჩევანია; მარჯვენა ახალი https://assist.ge public production. კადრები native browser screenshot-ის crop-ებია, არა მაკეტები. ლურჯი pointer halo automation-ის მაჩვენებელია.

Master PNG SHA-256 უცვლელია449ff8c94c993a29bc58f9e0e43bb04d594088e367eeb015fd094fbd73191a5e. API/CSP/მონაცემთა გადატანა/ბაზა/მიღება უცვლელია. INTAKE_MODE=disabled; INDEXING_ENABLED=false. საჯარო ასახვის შემოწმება ცალკე ჩაიწერება.
