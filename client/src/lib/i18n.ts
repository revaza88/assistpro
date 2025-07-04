import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ka: {
    translation: {
      // Navigation
      nav: {
        about: 'ჩვენ შესახებ',
        services: 'სერვისები',
        team: 'გუნდი',
        career: 'კარიერა',
        contact: 'კონტაქტი',
        logo: 'ASSIST',
      },
      
      // Hero Section (Main Page Content)
      hero: { // Corresponds to "1.1. მთავარი გვერდი - ქართული ვერსია (Hero Section)"
        mainTitle: '"ასისტი": თქვენი ბიზნესის სანდო ფინანსური და იურიდიული მხარდაჭერა საქართველოში',
        subtitle: 'დაზოგეთ დრო და რესურსები, შეამცირეთ რისკები და ფოკუსირდით იმაზე, რაც ნამდვილად მნიშვნელოვანია - თქვენი ბიზნესის განვითარებაზე. "ასისტი" გთავაზობთ პროფესიონალურ საბუღალტრო მომსახურების აუთსორსინგს, საგადასახადო და იურიდიულ კონსულტაციებს.',
        mainCta: 'უფასო კონსულტაცია',
        secondaryCta: 'ჩვენი სერვისები',
      },

      // Why Us Section (Main Page Content)
      whyUs: { // Corresponds to "1.1. ... ("რატომ ჩვენ?" / "რატომ ირჩევენ "ასისტს"?" სექცია)"
        title: 'რატომ ირჩევენ "ასისტს" მცირე და საშუალო ბიზნესები?',
        item1: 'პერსონალური მიდგომა და მზრუნველობა: ჩვენთვის თითოეული კლიენტი უნიკალურია. ვუსმენთ, ვიაზრებთ და ვთავაზობთ ინდივიდუალურ გადაწყვეტილებებს.',
        item2: 'პროფესიონალიზმი და გარანტირებული ხარისხი: ჩვენი გუნდი დაკომპლექტებულია სერტიფიცირებული და გამოცდილი სპეციალისტებით, რომლებიც უზრუნველყოფენ უმაღლესი ხარისხის მომსახურებას.',
        item3: 'თანამედროვე ტექნოლოგიები და ეფექტურობა: ვიყენებთ უახლეს პროგრამულ უზრუნველყოფას თქვენი დროის დაზოგვისა და პროცესების გამარტივებისთვის.',
        item4: 'სრული სერვისი ერთ სივრცეში: ბუღალტერიიდან იურიდიულ მხარდაჭერამდე - ყველაფერი, რაც თქვენს ბიზნესს სჭირდება, ერთ ადგილას.',
        cta: 'გაიგეთ მეტი ჩვენ შესახებ',
      },

      // Services Overview (Main Page Content)
      servicesOverview: { // Corresponds to "1.1. ... (სერვისების მიმოხილვა)"
        title: 'ჩვენი სერვისები: ყველაფერი თქვენი ბიზნესის სტაბილური ზრდისთვის',
        accounting: {
          title: 'ბუღალტრული მომსახურება',
          description: 'პროფესიონალური ბუღალტრული მომსახურება მცირე ბიზნესისთვის და მსხვილი კომპანიებისთვის. ზუსტი აღრიცხვა, დროული დეკლარირება და ფინანსური ანგარიშგება.',
          cta: 'ვრცლად',
        },
        tax: {
          title: 'საგადასახადო კონსულტაცია',
          description: 'კომპეტენტური საგადასახადო კონსულტაცია თბილისში და მთელ საქართველოში. საგადასახადო დაგეგმვა, რისკების მართვა და კანონმდებლობასთან შესაბამისობა.',
          cta: 'ვრცლად',
        },
        legal: {
          title: 'იურიდიული მომსახურება',
          description: 'საიმედო იურიდიული მომსახურება ბიზნესისთვის. კორპორაციული სამართალი, ხელშეკრულებები, წარმომადგენლობა დავებში.',
          cta: 'ვრცლად',
        },
        businessAssist: { // Note: Merging "კომპანიის რეგისტრაცია და ბიზნეს ასისტი" here
          title: 'კომპანიის რეგისტრაცია და ბიზნეს ასისტი',
          description: 'სწრაფი და უპრობლემო კომპანიის რეგისტრაცია საქართველოში. დახმარება სპეციალური სტატუსების მიღებაში (მაგ., მიკრო ბიზნესის სტატუსის მიღება, საერთაშორისო კომპანიის სტატუსი).',
          cta: 'ვრცლად',
        },
        audit: {
          title: 'აუდიტორული მომსახურება',
          description: 'დამოუკიდებელი აუდიტორული კომპანია გთავაზობთ ფინანსურ და საგადასახადო აუდიტს მცირე ბიზნესისთვის და მსხვილი ორგანიზაციებისთვის.',
          cta: 'ვრცლად',
        },
        ctaAll: 'ყველა სერვისის ნახვა',
      },

      // How We Work Section (Main Page Content)
      howWeWork: { // Corresponds to "1.1. ... ("როგორ ვმუშაობთ?" / "თანამშრომლობის მარტივი ეტაპები" სექცია)"
        title: 'დაიწყეთ "ასისტთან" თანამშრომლობა 3 მარტივი ნაბიჯით',
        step1: 'მოგვმართეთ კონსულტაციისთვის: შეავსეთ ფორმა ან დაგვიკავშირდით. ჩვენ გავაანალიზებთ თქვენს საჭიროებებს.',
        step2: 'მიიღეთ ინდივიდუალური შეთავაზება: თქვენი ბიზნესის სპეციფიკის გათვალისწინებით, მოგიმზადებთ საუკეთესო პირობებს.',
        step3: 'დაიწყეთ პარტნიორობა და მიიღეთ უწყვეტი მხარდაჭერა: ჩვენ ვიზრუნებთ თქვენს ფინანსურ და იურიდიულ საკითხებზე, თქვენ კი განავითარეთ ბიზნესი!',
      },

      // Social Proof Section (Main Page Content)
      socialProof: { // Corresponds to "1.1. ... (სოციალური მტკიცებულება)"
        title: 'რას ამბობენ ჩვენი კლიენტები?',
        testimonial1Name: 'კლიენტის სახელი, კომპანია',
        testimonial1Text: '"ასისტის გუნდმა სრულიად შეცვალა ჩვენი დამოკიდებულება ბუღალტერიისადმი. ყველაფერი მოწესრიგებულია და ყოველთვის მზად არიან დახმარებისთვის."',
        testimonial2Name: 'კლიენტის სახელი, სტარტაპი',
        testimonial2Text: '"როგორც დამწყები ბიზნესისთვის, მათი იურიდიული და საგადასახადო რჩევები ფასდაუდებელი აღმოჩნდა. გირჩევთ ყველას!"',
        trustedByTitle: 'გვენდობიან:', // Placeholder for logos
      },

      // Blog Teaser Section (Main Page Content)
      blogTeaser: { // Corresponds to "1.1. ... (ბლოგის/სასარგებლო რესურსების თიზერი)"
        title: 'სასარგებლო რჩევები და სიახლეები ბიზნესისთვის',
        article1Title: '"5 რჩევა მცირე ბიზნესის საგადასახადო ოპტიმიზაციისთვის"',
        article2Title: '"როგორ დავარეგისტრიროთ კომპანია საქართველოში: სრული გზამკვლევი"',
        cta: 'ყველა სტატიის ნახვა',
      },

      // Final CTA Block (Main Page Content)
      finalCta: { // Corresponds to "1.1. ... (საბოლოო CTA ბლოკი)"
        title: 'მზად ხართ, თქვენი ბიზნესი ახალ დონეზე გადაიყვანოთ?',
        text: 'ნუ გადადებთ თქვენი ფინანსური და იურიდიული საკითხების მოწესრიგებას. "ასისტი" აქ არის, რათა გაგიწიოთ პროფესიონალური დახმარება და შეგიქმნათ მყარი საფუძველი წარმატებისთვის.',
        cta1: 'დაგვიკავშირდით ახლავე',
        cta2: 'მოითხოვეთ პერსონალური შეთავაზება',
        phoneLabel: 'ტელეფონი:',
        phoneValue: '[თქვენი ნომერი]', // Placeholder
        emailLabel: 'ელ.ფოსტა:',
        emailValue: '[თქვენი ელ.ფოსტა]', // Placeholder
      },
      
      // About Section (Page: ჩვენ შესახებ)
      about: { // Corresponds to "გვერდი: ჩვენ შესახებ (ქართული ვერსია)"
        h1: 'გაიცანით "ასისტი" - თქვენი სანდო და ინოვაციური პარტნიორი ბიზნესის განვითარებაში',
        welcome: 'მოგესალმებით "ასისტის" სამყაროში! ჩვენ ვართ ახალგაზრდული, დინამიური და ამბიციური აუდიტორული კომპანია და ბიზნეს პროცესების აუთსორსინგის სპეციალისტთა გუნდი, რომელიც 2015 წლიდან წარმატებით ეხმარება მცირე და საშუალო ბიზნესებს, სტარტაპებსა და ინდივიდუალურ მეწარმეებს საქართველოში. ჩვენი მთავარი მიზანია, გაგიმარტივოთ ფინანსური და იურიდიული ლაბირინთები, რათა თქვენ სრულად შეძლოთ თქვენი ბიზნესის ძირითად საქმიანობაზე ფოკუსირება და დასახული მწვერვალების დაპყრობა. "ასისტის" გუნდი აერთიანებს მაღალკვალიფიციურ პროფესიონალებს, რომლებიც მზად არიან, გაგიზიარონ თავიანთი ცოდნა, გამოცდილება და გახდნენ თქვენი გრძელვადიანი, სანდო პარტნიორები.',
        missionTitle: 'ჩვენი მისია: თქვენი ბიზნესის სიმშვიდე და ზრდა',
        missionText: 'ჩვენი მისიაა, ვიყოთ მეტი, ვიდრე უბრალოდ მომსახურების მიმწოდებელი. ჩვენ ვისწრაფვით, დავამყაროთ მჭიდრო პარტნიორული ურთიერთობები მცირე და საშუალო კომპანიებთან, ინდივიდუალურ მეწარმეებთან და სტარტაპ ინიციატივებთან. ჩვენი მიზანია, დავეხმაროთ მათ, თავდაჯერებულად იარონ ბიზნეს სამყაროს კომპლექსურ გარემოში, მიიღონ ინფორმირებული გადაწყვეტილებები და თავიდან აირიდონ შესაძლო რისკები. ჩვენ ვქმნით გარემოს, სადაც რთული ფინანსური და იურიდიული საკითხები მარტივდება, რათა თქვენი ძვირფასი დრო და ენერგია მთლიანად თქვენი ბიზნესის განვითარებას მოხმარდეს. გვჯერა, რომ თქვენი წარმატება ჩვენი წარმატებაა.',
        whyAssistTitle: 'რატომ "ასისტი"? თქვენი უპირატესობები ჩვენთან თანამშრომლობით:',
        advantage1Title: 'ახალგაზრდული ენერგია და ინოვაციური ხედვა:',
        advantage1Text: 'ჩვენ ვართ ახალგაზრდა, ენთუზიაზმით სავსე გუნდი, რომელიც მუდმივად ეძებს თანამედროვე, ეფექტურ და არასტანდარტულ გადაწყვეტილებებს. ჩვენ არ გვაშინებს გამოწვევები და მზად ვართ, შემოგთავაზოთ კრეატიული და თქვენს უნიკალურ საჭიროებებზე სრულად მორგებული საბუღალტრო მომსახურების აუთსორსინგი თუ საგადასახადო კონსულტაცია თბილისში.',
        advantage2Title: 'კლიენტზე მაქსიმალური ორიენტაცია და უშუალო კომუნიკაცია:',
        advantage2Text: 'თქვენი ბიზნესის წარმატება ჩვენი უმთავრესი საზრუნავია. "ასისტში" თქვენ იპოვით გუნდს, რომელიც მზად არის, ყურადღებით მოგისმინოთ, გაიგოს თქვენი სპეციფიკური მოთხოვნები და შემოგთავაზოთ პერსონალური მომსახურება. ჩვენთან ურთიერთობა მარტივი, პირდაპირი და მეგობრულია.',
        advantage3Title: 'მაღალკვალიფიციური და გამოცდილი გუნდი:',
        advantage3Text: 'ჩვენი ახალგაზრდული სულისკვეთების მიღმა დგას სფეროს სიღრმისეული ცოდნა და მრავალწლიანი პრაქტიკული გამოცდილება. "ასისტის" გუნდის თითოეული წევრი სერტიფიცირებული პროფესიონალია, რომელიც მუდმივად ზრუნავს კვალიფიკაციის ამაღლებაზე, რათა შემოგთავაზოთ უმაღლესი ხარისხის იურიდიული მომსახურება ბიზნესისთვის და ფინანსური კონსულტაციები.',
        advantage4Title: 'თანამედროვე ტექნოლოგიები თქვენს სამსახურში:',
        advantage4Text: 'ჩვენ აქტიურად ვიყენებთ უახლეს პროგრამულ უზრუნველყოფას, ღრუბლოვან სერვისებს და ციფრულ ინსტრუმენტებს. ეს საშუალებას გვაძლევს, ჩვენი მომსახურება იყოს მაქსიმალურად სწრაფი, ზუსტი, ეფექტური და თქვენთვის კომფორტული. თქვენ გექნებათ მუდმივი წვდომა თქვენს ფინანსურ მონაცემებთან უსაფრთხო და თანამედროვე პლატფორმების მეშვეობით.',
        advantage5Title: 'სტარტაპების საიმედო მხარდამჭერი:',
        advantage5Text: 'ჩვენ განსაკუთრებით კარგად გვესმის სტარტაპების უნიკალური საჭიროებები და გამოწვევები. მზად ვართ, ვიყოთ თქვენი სანდო პარტნიორი კომპანიის რეგისტრაციის საქართველოში პირველივე ეტაპიდან და დაგეხმაროთ ისეთი მნიშვნელოვანი პროცესების გავლაში, როგორიცაა მიკრო ბიზნესის სტატუსის მიღება ან საერთაშორისო კომპანიის სტატუსის მოპოვება.',
        ourTeamTitle: 'ჩვენი გუნდი: თქვენი წარმატების გარანტი',
        ourTeamText: '"ასისტის" მთავარი სიმდიდრე და მამოძრავებელი ძალა ჩვენი გუნდია. ჩვენ ვამაყობთ ჩვენი პროფესიონალებით, რომლებიც არიან თავიანთი საქმის ნამდვილი ენთუზიასტები და ექსპერტები. მუდმივ განვითარებაზე ორიენტირებული, მოტივირებული და მეგობრული გარემო არის ის, რაც საშუალებას გვაძლევს, შემოგთავაზოთ უმაღლესი სტანდარტის მომსახურება, დავამყაროთ თქვენთან გრძელვადიანი, ნდობაზე დაფუძნებული პარტნიორობა და ერთად ვიზეიმოთ თქვენი ბიზნესის მიღწევები. (აქ კარგი იქნება მოკლე ჩანართი გუნდის ფოტოზე ან რამდენიმე წევრის მოკლე წარდგენაზე, როდესაც ეს ვიზუალი მზად იქნება).',
        valuesTitle: 'ჩვენი ფუნდამენტური ფასეულობები:',
        value1: 'პროფესიონალიზმი და კომპეტენტურობა: ჩვენი ცოდნა და გამოცდილება თქვენი ბიზნესის სამსახურში.',
        value2: 'კლიენტზე ორიენტირებულობა: თქვენი ინტერესები და მიზნები ჩვენი მუშაობის ქვაკუთხედია.',
        value3: 'ინოვაცია და მუდმივი ზრდა: ჩვენ ვსწავლობთ, ვვითარდებით და ვნერგავთ სიახლეებს თქვენი უკეთესი მომსახურებისთვის.',
        value4: 'გამჭვირვალობა და პასუხისმგებლობა: ჩვენ ვმოქმედებთ ღიად და ვიღებთ სრულ პასუხისმგებლობას ჩვენს მიერ გაწეულ მომსახურებაზე.',
        value5: 'გუნდურობა და ურთიერთპატივისცემა: ჩვენ ვართ ერთიანი გუნდი, რომელიც საერთო მიზნისკენ ისწრაფვის.',
        closingCall: '"ასისტი" მზად არის, გახდეს თქვენი სანდო მრჩეველი და დამხმარე ბიზნესის მართვის ყველა ეტაპზე. დაგვიკავშირდით დღესვე და ერთად დავგეგმოთ თქვენი წარმატებისკენ მიმავალი გზა!',
      },
      
      // Services
      services: {
        // Accounting Service Page (2.1. ბუღალტრული მომსახურება - ქართული ვერსია)
        accounting: {
          h1: 'პროფესიონალური ბუღალტრული მომსახურება მცირე და საშუალო ბიზნესისთვის საქართველოში',
          intro: 'თქვენი ბიზნესის ფინანსური ჯანმრთელობა და კანონმდებლობასთან სრული შესაბამისობა ჩვენი მთავარი პრიორიტეტია. "ასისტი" გთავაზობთ კომპლექსურ საბუღალტრო მომსახურების აუთსორსინგს, რომელიც დაგეხმარებათ, თავიდან აირიდოთ ბუღალტრული შეცდომებით გამოწვეული პრობლემები, დაზოგოთ დრო და ფინანსები და მთლიანად ფოკუსირდეთ თქვენი კომპანიის ზრდაზე. ჩვენ კარგად გვესმის, რომ ბუღალტრული მომსახურება მცირე ბიზნესისთვის განსაკუთრებულ მიდგომას საჭიროებს, ამიტომ გთავაზობთ თქვენს საჭიროებებზე სრულად მორგებულ გადაწყვეტილებებს.',
          whyOutsourcingTitle: 'რატომ არის ბუღალტრული აუთსორსინგი საუკეთესო არჩევანი თქვენი ბიზნესისთვის?',
          benefitFinancial: 'ფინანსური დაზოგვა: შეამცირეთ შიდა ბუღალტრის შენახვასთან დაკავშირებული ხარჯები (ხელფასი, გადასახადები, სამუშაო სივრცე, პროგრამული უზრუნველყოფა). "ასისტთან" თანამშრომლობით, თქვენ იხდით მხოლოდ იმ მომსახურებაში, რომელიც რეალურად გჭირდებათ. ხშირად გვეკითხებიან ბუღალტრის მომსახურების ფასის შესახებ – ჩვენთან ის გამჭვირვალე და კონკურენტულია.',
          benefitTime: 'დროის ეკონომია: გაათავისუფლეთ თქვენი და თქვენი თანამშრომლების დრო რუტინული ბუღალტრული ოპერაციებისგან და მიმართეთ ის ბიზნესის სტრატეგიული მიზნების მისაღწევად.',
          benefitRisk: 'რისკების მინიმიზაცია: ჩვენ ვიღებთ სრულ პასუხისმგებლობას თქვენი ბუღალტრული აღრიცხვის სიზუსტესა და კანონმდებლობასთან შესაბამისობაზე. ჩვენი პროფესიონალიზმი და გამოცდილება გიცავთ შესაძლო საგადასახადო ჯარიმებისა და სანქციებისგან.',
          benefitExpertise: 'ექსპერტული ცოდნის ხელმისაწვდომობა: ისარგებლეთ მაღალკვალიფიციური ბუღალტრების გუნდის ცოდნითა და გამოცდილებით, რომლებიც მუდმივად ადევნებენ თვალყურს კანონმდებლობის ცვლილებებს.',
          benefitFocus: 'ფოკუსირება ძირითად საქმიანობაზე: მიანდეთ ფინანსური აღრიცხვა პროფესიონალებს და სრულად კონცენტრირდით იმაზე, რასაც საუკეთესოდ აკეთებთ – თქვენი ბიზნესის განვითარებაზე.',
          servicesIncludeTitle: '"ასისტის" საბუღალტრო მომსახურება მოიცავს:',
          serviceList: [
            'პირველადი დოკუმენტაციის დამუშავება და აღრიცხვა',
            'ყოველთვიური და წლიური საგადასახადო დეკლარაციების მომზადება და წარდგენა',
            'ფინანსური ანგარიშგების მომზადება (SARAS-ში წარდგენის ჩათვლით)',
            'ხელფასების დარიცხვა და აღრიცხვა',
            'ძირითადი საშუალებების აღრიცხვა',
            'სასაქონლო-მატერიალური ფასეულობების აღრიცხვა',
            'კონსულტაციები მიმდინარე საბუღალტრო საკითხებზე',
            'წარმომადგენლობა საგადასახადო ორგანოებთან'
          ],
          packagesTitle: 'ჩვენი საბუღალტრო მომსახურების პაკეტები:',
          package1: 'მთავარი ბუღალტრის აუთსორს მომსახურება',
          package2: 'სრული ბუღალტრული აუთსორს მომსახურება (დისტანციურად)',
          package3: 'სრული ბუღალტრული აუთსორს მომსახურება კომპანიის სამუშაო ადგილზე (სპეციალური მოთხოვნისას)',
          whyUsTitle: 'რატომ უნდა ანდოთ თქვენი ბუღალტერია "ასისტს"?',
          reasonExperience: 'გამოცდილება და პროფესიონალიზმი',
          reasonIndividual: 'ინდივიდუალური მიდგომა',
          reasonTech: 'თანამედროვე ტექნოლოგიები',
          reasonConfidentiality: 'კონფიდენციალურობის გარანტია',
          reasonCommunication: 'მუდმივი კომუნიკაცია და მხარდაჭერა',
          finalCtaTitle: 'მზად ხართ, თქვენი ბიზნესის ბუღალტერია სანდო ხელში გადასცეთ?',
          finalCtaText: 'დაგვიკავშირდით დღესვე, მიიღეთ უფასო კონსულტაცია და გაიგეთ, როგორ შეუძლია "ასისტს" დაგეხმაროთ თქვენი ფინანსური პროცესების ოპტიმიზაციაში, ხარჯების შემცირებასა და ბიზნესის მდგრად განვითარებაში.',
          ctaConsultation: 'უფასო კონსულტაციის მოთხოვნა',
          ctaContact: 'დაგვიკავშირდით',
        },
        // Tax Service Page (3.1. საგადასახადო მომსახურება - ქართული ვერსია)
        tax: {
          h1: 'პროფესიონალური საგადასახადო კონსულტაცია და მომსახურება თბილისში და მთელ საქართველოში',
          intro: 'საქართველოს მუდმივად ცვალებადი საგადასახადო კანონმდებლობა ბიზნესისთვის ერთ-ერთ მთავარ გამოწვევას წარმოადგენს. "ასისტი" გთავაზობთ კომპლექსურ საგადასახადო კონსულტაციას თბილისში და საქართველოს მასშტაბით, რათა თქვენი ბიზნესი იყოს მაქსიმალურად დაცული, საგადასახადო ვალდებულებები ოპტიმიზირებული და შესაბამისობაში მოქმედ კანონმდებლობასთან.',
          whyImportantTitle: 'რატომ არის სასიცოცხლოდ მნიშვნელოვანი პროფესიონალური საგადასახადო მომსახურება?',
          benefitRiskMinimization: 'საგადასახადო რისკების მინიმიზაცია',
          benefitOptimization: 'საგადასახადო ოპტიმიზაცია',
          benefitCompliance: 'კანონმდებლობასთან მუდმივი შესაბამისობა',
          benefitTimeSaving: 'დროისა და რესურსების დაზოგვა',
          benefitPeaceOfMind: 'სიმშვიდე და თავდაჯერებულობა',
          servicesIncludeTitle: '"ასისტის" საგადასახადო მომსახურება მოიცავს:',
          serviceList: [
            'საგადასახადო კონსულტაციები (ყველა ტიპის გადასახადი, დაგეგმვა, შეღავათები, მიკრო ბიზნესის სტატუსის მიღება, საერთაშორისო კომპანიის სტატუსი)',
            'საგადასახადო დეკლარაციების მომზადება და წარდგენა',
            'საგადასახადო აუდიტი (საგადასახადო აუდიტი მცირე ბიზნესისთვის)',
            'წარმომადგენლობა საგადასახადო ორგანოებთან',
            'საგადასახადო დავების წარმოება',
            'საერთაშორისო დაბეგვრის საკითხები'
          ],
          forWhomTitle: 'ვისთვის არის განკუთვნილი ჩვენი საგადასახადო მომსახურება?',
          targetList: [
            'მცირე და საშუალო ბიზნესისთვის',
            'სტარტაპებისთვის',
            'ინდივიდუალური მეწარმეებისთვის',
            'უცხოელი ინვესტორებისთვის და კომპანიებისთვის',
            'ნებისმიერი კომპანიისთვის, ვისაც ესაჭიროება საგადასახადო მხარდაჭერა'
          ],
          whyUsTitle: 'რატომ "ასისტი" თქვენი საგადასახადო პარტნიორი?',
          reasonKnowledge: 'სიღრმისეული ცოდნა და გამოცდილება',
          reasonProactive: 'პროაქტიული მიდგომა',
          reasonResults: 'კონკრეტულ შედეგზე ორიენტაცია',
          reasonTeamwork: 'გუნდური მუშაობა',
          finalCtaTitle: 'მზად ხართ, თქვენი საგადასახადო საკითხები პროფესიონალებს მიანდოთ?',
          finalCtaText: 'დაგვიკავშირდით "ასისტში" უფასო პირველადი კონსულტაციისთვის და მიიღეთ კვალიფიციური რჩევები.',
          ctaRequestConsultation: 'მოითხოვეთ საგადასახადო კონსულტაცია',
          ctaContact: 'დაგვიკავშირდით',
        },
        // Legal Service Page (4.1. იურიდიული მომსახურება - ქართული ვერსია)
        legal: {
          h1: 'კომპლექსური იურიდიული მომსახურება ბიზნესისთვის საქართველოში - თქვენი სამართლებრივი დაცვა და სტაბილურობა',
          intro: 'ნებისმიერი ბიზნეს საქმიანობა მჭიდროდ არის დაკავშირებული სამართლებრივ ასპექტებთან. "ასისტი" გთავაზობთ მაღალკვალიფიციურ იურიდიულ მომსახურებას ბიზნესისთვის, რომელიც მოიცავს კორპორაციულ სამართალს, სახელშეკრულებო სამართალს, შრომის სამართალს და ბიზნესთან დაკავშირებულ სხვა აქტუალურ იურიდიულ საკითხებს.',
          whyImportantTitle: 'რატომ არის აუცილებელი პროფესიონალური იურიდიული მხარდაჭერა თქვენი ბიზნესისთვის?',
          benefitRiskPrevention: 'სამართლებრივი რისკების პრევენცია',
          benefitCompliance: 'კანონმდებლობასთან სრული შესაბამისობა',
          benefitInterestProtection: 'თქვენი ინტერესების დაცვა',
          benefitOptimalSolutions: 'ოპტიმალური გადაწყვეტილებების მიღება',
          benefitResourceEfficiency: 'დროისა და რესურსების ეფექტური გამოყენება',
          servicesIncludeTitle: '"ასისტის" იურიდიული მომსახურება მოიცავს:',
          serviceList: [
            'კორპორაციული სამართალი (კომპანიის რეგისტრაცია საქართველოში, რეორგანიზაცია, სადამფუძნებლო დოკუმენტები)',
            'სახელშეკრულებო სამართალი (ხელშეკრულებების მომზადება, ანალიზი)',
            'შრომის სამართალი (შრომითი ხელშეკრულებები, კონსულტაციები, დავები)',
            'საგადასახადო და ადმინისტრაციული სამართალი',
            'ინტელექტუალური საკუთრების სამართალი (საბაზისო კონსულტაცია)',
            'წარმომადგენლობა სასამართლოში და არბიტრაჟში',
            'იურისტის აუთსორსინგი'
          ],
          forWhomTitle: 'ვისთვის არის განკუთვნილი ჩვენი იურიდიული მომსახურება?',
          targetList: [
            'მცირე და საშუალო ბიზნესისთვის',
            'სტარტაპებისთვის',
            'უცხოური კომპანიებისთვის და ინვესტორებისთვის',
            'ნებისმიერი კომპანიისთვის, ვისაც ესაჭიროება იურიდიული დახმარება'
          ],
          whyUsTitle: 'რატომ "ასისტი" თქვენი იურიდიული მრჩეველი?',
          reasonExperience: 'პრაქტიკული გამოცდილება და შედეგზე ორიენტაცია',
          reasonBusinessOriented: 'ბიზნესზე მორგებული მიდგომა',
          reasonComprehensiveVision: 'კომპლექსური ხედვა',
          reasonProactivity: 'პროაქტიურობა და პრევენცია',
          finalCtaTitle: 'დაიცავით თქვენი ბიზნესი სამართლებრივად "ასისტთან" ერთად!',
          finalCtaText: 'დაგვიკავშირდით "ასისტში" პირველადი იურიდიული კონსულტაციისთვის.',
          ctaRequestConsultation: 'მოითხოვეთ იურიდიული კონსულტაცია',
          ctaContact: 'დაგვიკავშირდით',
        },
        // Audit Service Page (5.1. აუდიტორული მომსახურება - ქართული ვერსია)
        audit: {
          h1: 'დამოუკიდებელი აუდიტორული მომსახურება საქართველოში - თქვენი ფინანსური გამჭვირვალობა და სანდოობა',
          intro: '"ასისტი", როგორც ლიცენზირებული აუდიტორული კომპანია, გთავაზობთ მაღალკვალიფიციურ და დამოუკიდებელ აუდიტორულ მომსახურებას, რომელიც დაგეხმარებათ თქვენი ფინანსური ინფორმაციის სანდოობის დადასტურებაში. ჩვენ ვუზრუნველყოფთ როგორც ფინანსური ანგარიშგების სავალდებულო აუდიტს, ასევე სპეციალური მიზნობრიობით აუდიტს, მათ შორის საგადასახადო აუდიტს მცირე ბიზნესისთვის.',
          whyImportantTitle: 'რატომ არის მნიშვნელოვანი აუდიტორული მომსახურება თქვენი კომპანიისთვის?',
          benefitCredibility: 'ფინანსური ანგარიშგების სანდოობის ზრდა',
          benefitInternalControls: 'შიდა კონტროლის სისტემის შეფასება და გაუმჯობესება',
          benefitRiskManagement: 'რისკების იდენტიფიცირება და მართვა',
          benefitCompliance: 'კანონმდებლობასთან შესაბამისობის უზრუნველყოფა',
          benefitDecisionMaking: 'გადაწყვეტილების მიღების გაუმჯობესება',
          servicesIncludeTitle: '"ასისტის" აუდიტორული მომსახურება მოიცავს:',
          serviceList: [
            'ფინანსური ანგარიშგების აუდიტი (ISA, SARAS)',
            'შეთანხმებული პროცედურების შესრულება',
            'შიდა აუდიტის მომსახურება',
            'საგადასახადო აუდიტი (საგადასახადო აუდიტი მცირე ბიზნესისთვის)',
            'Due Diligence (ფინანსური და საგადასახადო)',
            'კომპილაცია (ფინანსური ანგარიშგების შედგენა)'
          ],
          forWhomTitle: 'ვისთვის არის განკუთვნილი ჩვენი აუდიტორული მომსახურება?',
          targetList: [
            'კომპანიებისთვის, რომელთაც კანონმდებლობით ევალებათ სავალდებულო აუდიტი',
            'მცირე და საშუალო ბიზნესებისთვის',
            'ინვესტორებისთვის და კრედიტორებისთვის',
            'კომპანიის მფლობელებისა და მენეჯმენტისთვის',
            'არასამეწარმეო (არაკომერციული) იურიდიული პირებისთვის'
          ],
          whyUsTitle: 'რატომ "ასისტი" თქვენი აუდიტორული პარტნიორი?',
          reasonIndependence: 'დამოუკიდებლობა და ობიექტურობა',
          reasonQualifiedAuditors: 'კვალიფიციური და სერტიფიცირებული აუდიტორები',
          reasonRiskBased: 'რისკზე დაფუძნებული მიდგომა',
          reasonRecommendations: 'კონსტრუქციული რეკომენდაციები',
          finalCtaTitle: 'უზრუნველყავით თქვენი ბიზნესის ფინანსური გამჭვირვალობა "ასისტთან" ერთად!',
          finalCtaText: 'დაგვიკავშირდით "ასისტში" აუდიტორული მომსახურების შესახებ კონსულტაციისთვის.',
          ctaRequestService: 'მოითხოვეთ აუდიტორული მომსახურება',
          ctaContact: 'დაგვიკავშირდით',
        },
        // Business Assist Service Page (6.1. ბიზნეს ასისტი - ქართული ვერსია) - This replaces existing `services.business`
        business: { // Formerly "Business Consulting", now "Business Assist"
          h1: 'ბიზნესის დაწყება და ოპტიმიზაცია საქართველოში: კომპანიის რეგისტრაცია და საგადასახადო სტატუსები',
          intro: '"ასისტი" გთავაზობთ სრულყოფილ ბიზნეს ასისტენტის მომსახურებას, რომელიც მოიცავს როგორც კომპანიის რეგისტრაციას საქართველოში უმოკლეს ვადებში, ასევე დახმარებას ისეთი ხელსაყრელი საგადასახადო სტატუსების მიღებაში, როგორიცაა მიკრო ბიზნესის სტატუსის მიღება, მცირე ბიზნესის სტატუსი, საერთაშორისო კომპანიის სტატუსი და სხვა.',
          whyUseTitle: 'რატომ ისარგებლოთ "ასისტის" ბიზნეს ასისტენტის მომსახურებით?',
          benefitTimeSaving: 'დროის დაზოგვა',
          benefitCorrectChoice: 'სწორი არჩევანი და შეცდომების თავიდან აცილება',
          benefitSimplification: 'პროცესის გამარტივება',
          benefitComprehensiveSupport: 'კომპლექსური მხარდაჭერა',
          benefitConsultation: 'კონსულტაცია და განმარტება',
          servicesIncludeTitle: 'ჩვენი ბიზნეს ასისტენტის მომსახურება მოიცავს:',
          registrationTitle: 'კომპანიის რეგისტრაცია საქართველოში (იურიდიული ფორმის შერჩევა, სადამფუძნებლო დოკუმენტაცია, რეგისტრაცია რეესტრში, საბანკო ანგარიში)',
          statusAssistanceTitle: 'დახმარება სპეციალური საგადასახადო სტატუსების მიღებაში:',
          statusList: [
            'მიკრო ბიზნესის სტატუსის მიღება',
            'მცირე ბიზნესის სტატუსის მიღება',
            'ფიქსირებული გადასახადის გადამხდელის სტატუსი',
            'საერთაშორისო კომპანიის სტატუსი',
            'ვირტუალური ზონის პირის (VZP) სტატუსი',
            'თავისუფალი ინდუსტრიული ზონის (თიზ) საწარმოს სტატუსი'
          ],
          howToStartTitle: 'როგორ დავიწყოთ? (3 ეტაპი: კონსულტაცია, სტრატეგია, პროცესის წარმართვა)', // Simplified this for now
          finalCtaTitle: 'დაიწყეთ ან გააფართოვეთ თქვენი ბიზნესი საქართველოში მარტივად და ეფექტურად!',
          finalCtaText: 'ისარგებლეთ საქართველოს მიმზიდველი ბიზნეს გარემოთი და საგადასახადო შეღავათებით.',
          ctaRequestConsultation: 'მოითხოვეთ კონსულტაცია ბიზნესის დასაწყებად',
          ctaLearnMoreStatuses: 'გაიგეთ მეტი სტატუსებზე',
        },
        // HR Service Page (Generated Content)
        hr: {
          h1: 'პროფესიონალური HR მომსახურება თქვენი ბიზნესის ზრდისა და თანამშრომელთა კმაყოფილებისთვის',
          intro: '"ასისტში" გვესმის, რომ კომპანიის ყველაზე ღირებული აქტივი მისი თანამშრომლები არიან. ჩვენი HR მომსახურების გუნდი გთავაზობთ კომპლექსურ გადაწყვეტილებებს ადამიანური რესურსების მართვის სფეროში, რაც დაგეხმარებათ ნიჭიერი კადრების მოზიდვაში, შენარჩუნებასა და განვითარებაში, ასევე ეფექტური და მოტივირებული სამუშაო გარემოს შექმნაში.',
          whyImportantTitle: 'რატომ არის მნიშვნელოვანი პროფესიონალური HR მხარდაჭერა?',
          benefitTalent: 'ნიჭის მოზიდვა და შენარჩუნება: კონკურენტულ ბაზარზე საუკეთესო კადრების პოვნა და მათი კომპანიაში შენარჩუნება.',
          benefitCompliance: 'შრომის კანონმდებლობასთან შესაბამისობა: რთული შრომითი ურთიერთობების და კანონმდებლობის ნიუანსების ზუსტი დაცვა.',
          benefitMotivation: 'თანამშრომელთა მოტივაცია და განვითარება: პროდუქტიულობის ზრდა და თანამშრომელთა ლოიალობის ამაღლება.',
          benefitCulture: 'კომპანიის კულტურის გაძლიერება: პოზიტიური და პროდუქტიული სამუშაო ატმოსფეროს ჩამოყალიბება.',
          servicesIncludeTitle: '"ასისტის" HR მომსახურება მოიცავს:',
          serviceList: [
            'კადრების შერჩევა და რეკრუტინგი',
            'შრომითი ხელშეკრულებების მომზადება და ადმინისტრირება',
            'ხელფასებისა და ბენეფიტების სისტემების შემუშავება',
            'თანამშრომელთა შეფასებისა და განვითარების სისტემები',
            'ტრენინგები და კვალიფიკაციის ამაღლება',
            'შრომითი ურთიერთობების მართვა და კონსულტაციები',
            'კორპორატიული კულტურის განვითარება'
          ],
          finalCtaTitle: 'განავითარეთ თქვენი გუნდი "ასისტთან" ერთად!',
          finalCtaText: 'დაგვიკავშირდით, რათა განვიხილოთ თქვენი კომპანიის HR საჭიროებები და შევიმუშაოთ ინდივიდუალური სტრატეგია.',
          ctaRequestConsultation: 'HR კონსულტაციის მოთხოვნა',
          ctaContact: 'დაგვიკავშირდით',
        },
      },
      
      // Team (Generated Content)
      team: {
        h1: 'გაიცანით "ასისტის" პროფესიონალთა გუნდი',
        intro: '"ასისტის" წარმატების მთავარი მამოძრავებელი ძალა ჩვენი გუნდია - გამოცდილი, მოტივირებული და კლიენტზე ორიენტირებული პროფესიონალები, რომლებიც მზად არიან, გაგიწიონ უმაღლესი დონის მომსახურება. ჩვენ ვამაყობთ ჩვენი მრავალფეროვანი გუნდით, სადაც თითოეული წევრი თავისი უნიკალური ცოდნითა და გამოცდილებით ამდიდრებს საერთო საქმეს.',
        valuesTitle: 'ჩვენი ფასეულობები გუნდში:',
        valueUnity: 'ერთიანობა და თანამშრომლობა: ჩვენ გვჯერა, რომ საუკეთესო შედეგები ერთობლივი მუშაობით მიიღწევა.',
        valueGrowth: 'პროფესიული ზრდა: მუდმივად ვეხმარებით ერთმანეთს განვითარებასა და ახალი ცოდნის მიღებაში.',
        valueRespect: 'პატივისცემა და მხარდაჭერა: ვქმნით გარემოს, სადაც ყველა თავს დაფასებულად და მხარდაჭერილად გრძნობს.',
        valueInnovation: 'ინოვაციური აზროვნება: წავახალისებთ ახალ იდეებს და კრეატიულ მიდგომებს.',
        membersSectionTitle: 'გუნდის წევრების წარდგენა', // Placeholder title
        // Placeholder for team members, e.g.:
        // member1Name: 'ნინო შარაშენიძე',
        // member1Position: 'მთავარი ბუღალტერი',
        // member1Bio: '10+ წლიანი გამოცდილება...',
        finalCtaTitle: 'გსურთ გახდეთ ჩვენი გუნდის წევრი?',
        finalCtaText: 'თუ იზიარებთ ჩვენს ფასეულობებს და გსურთ განვითარდეთ პროფესიონალების გარემოცვაში, შეამოწმეთ ჩვენი ვაკანსიები.',
        ctaCareer: 'კარიერა "ასისტში"',
        ctaOpenPositions: 'ღია ვაკანსიები',
      },
      
      // Career (Generated Content)
      career: {
        h1: 'შექმენით თქვენი წარმატებული კარიერა "ასისტთან" ერთად',
        intro: '"ასისტი" არის ადგილი, სადაც ნიჭიერი და ამბიციური ადამიანები იზრდებიან და ვითარდებიან. ჩვენ ვეძებთ პროფესიონალებს, რომლებსაც სურთ, გახდნენ ჩვენი მეგობრული და დინამიური გუნდის წევრები, წვლილი შეიტანონ კომპანიის წარმატებაში და მიაღწიონ საკუთარ კარიერულ მწვერვალებს.',
        whyAssistTitle: 'რატომ "ასისტი"?',
        benefitDevelopment: 'პროფესიული განვითარების შესაძლებლობები: ჩვენ ინვესტიციას ვდებთ ჩვენი თანამშრომლების განვითარებაში, ვთავაზობთ ტრენინგებს, სემინარებს და რთულ, საინტერესო პროექტებზე მუშაობის შანსს.',
        benefitCompensation: 'კონკურენტული ანაზღაურება და ბენეფიტები: ვთავაზობთ ღირსეულ ანაზღაურებას და სოციალურ პაკეტს, რომელიც შეესაბამება თქვენს კვალიფიკაციასა და გამოცდილებას.',
        benefitEnvironment: 'მხარდამჭერი და თანამშრომლობითი გარემო: ჩვენ ვართ გუნდი, სადაც ფასდება ურთიერთპატივისცემა, დახმარება და ცოდნის გაზიარება.',
        benefitContribution: 'მნიშვნელოვანი წვლილი: თქვენი მუშაობა პირდაპირ გავლენას მოახდენს ჩვენი კლიენტების წარმატებაზე და კომპანიის განვითარებაზე.',
        openPositionsTitle: 'ღია ვაკანსიები',
        // Placeholder for vacancies, e.g.:
        // vacancy1Title: 'უმცროსი აუდიტორი',
        // vacancy1Department: 'აუდიტის დეპარტამენტი',
        // vacancy1Location: 'თბილისი',
        // vacancy1Description: 'ვეძებთ მოტივირებულ უმცროს აუდიტორს...',
        // vacancy1cta: 'ვრცლად და განაცხადის გაგზავნა',
        noVacancyNote: 'ამჟამად აქტიური ვაკანსიები არ გვაქვს, თუმცა შეგიძლიათ გამოგვიგზავნოთ თქვენი CV და ჩვენ მას მომავალი შესაძლებლობებისთვის შევინახავთ.',
        ctaSendCv: 'CV-ის გაგზავნა',
        finalCtaTitle: 'მზად ხართ, დაიწყოთ ახალი კარიერული თავგადასავალი?',
        finalCtaText: 'შემოუერთდით "ასისტს" და გახდით წარმატების ნაწილი!',
        ctaViewAllVacancies: 'ყველა ვაკანსიის ნახვა',
        ctaContactHr: 'დაგვიკავშირდით HR დეპარტამენტს',
      },
      
      // Contact Page (7.1. კონტაქტი - ქართული ვერსია)
      contact: {
        h1: 'დაგვიკავშირდით - ჩვენ მზად ვართ, დაგეხმაროთ!',
        intro: 'გაქვთ შეკითხვები ჩვენს სერვისებთან დაკავშირებით? "ასისტის" გუნდი მზად არის, გიპასუხოთ ყველა თქვენს კითხვაზე. დაგვიკავშირდით თქვენთვის მოსახერხებელი ნებისმიერი არხით!',
        infoTitle: 'ჩვენი საკონტაქტო ინფორმაცია:',
        addressLabel: 'მისამართი:',
        addressValue: '[თქვენი სრული მისამართი]', // Placeholder
        phoneLabel: 'ტელეფონი:',
        phoneValue: '[თქვენი საკონტაქტო ნომერი]', // Placeholder
        emailLabel: 'ელექტრონული ფოსტა:',
        emailValue: '[მაგ., info@assist.ge]', // Placeholder
        workingHoursLabel: 'სამუშაო საათები:',
        workingHoursValue: 'ორშაბათი - პარასკევი: [09:00 - 18:00]', // Placeholder
        formTitle: 'გამოგვიგზავნეთ შეტყობინება',
        fieldName: 'სახელი',
        fieldEmail: 'ელ. ფოსტა',
        fieldPhone: 'ტელეფონი',
        fieldCompany: 'კომპანია',
        fieldSubject: 'თემა',
        fieldMessage: 'შეტყობინება',
        ctaSend: 'გაგზავნა',
        socialMediaTitle: 'სოციალური ქსელები:', // Placeholder for social links
        finalMessage: 'მოუთმენლად ველით თქვენთან კომუნიკაციას.',
      },
      
      // Footer - Assuming this structure is mostly fine, may need minor text updates from `Text` if any.
      // For now, keeping existing footer structure from original i18n.ts
      footer: {
        description: 'ASSIST - საქართველოს წამყვანი კომპანია ბიზნეს მომსახურების სფეროში',
        quickLinks: 'სწრაფი ბმულები',
        services: 'სერვისები', // This general key might be used for a "Services" link in footer
        copyright: '© 2025 ASSIST. ყველა უფლება დაცულია.',
        status: 'სტატუსი',
        support: 'მხარდაჭერა',
        privacy: 'კონფიდენციალურობა',
        terms: 'წესები',
        cookiePolicy: 'Cookie პოლიტიკა'
      },
      
      // Common - Keeping existing from original i18n.ts
      common: {
        loading: 'იტვირთება...',
        error: 'შეცდომა',
        success: 'წარმატება',
        cancel: 'გაუქმება',
        save: 'შენახვა',
        edit: 'რედაქტირება',
        delete: 'წაშლა',
        confirm: 'დადასტურება',
        learnMore: 'მეტის ნახვა'
      }
    }
  },
  
  en: {
    translation: {
      // Navigation
      nav: {
        about: 'About Us', // from Text
        services: 'Services',
        team: 'Team',
        career: 'Career',
        contact: 'Contact Us', // from Text
        logo: 'ASSIST',
      },
      
      // Hero Section (Main Page Content)
      hero: { // Corresponds to "1.2. Main Page - English Version (Hero Section)"
        mainTitle: '"Assist": Reliable Financial & Legal Support for Your Business in Georgia',
        subtitle: 'Save time and resources, reduce risks, and focus on what truly matters – growing your business. "Assist" offers professional outsourced accounting services in Georgia, tax, and legal consulting.',
        mainCta: 'Free Consultation',
        secondaryCta: 'Our Services',
      },

      // Why Us Section (Main Page Content)
      whyUs: { // Corresponds to "1.2. ... ("Why Us?" / "Why Choose 'Assist'?" Section)"
        title: 'Why Do Small and Medium Businesses Choose "Assist"?',
        item1: 'Personalized Approach & Care: For us, every client is unique. We listen, understand, and offer individual solutions.',
        item2: 'Professionalism & Guaranteed Quality: Our team consists of certified and experienced specialists who provide the highest quality service.',
        item3: 'Modern Technologies & Efficiency: We use the latest software to save your time and simplify processes for your accounting services in Georgia for small business.',
        item4: 'Full Service in One Place: From accounting to legal support – everything your business needs, all in one place.',
        cta: 'Learn More About Us',
      },

      // Services Overview (Main Page Content)
      servicesOverview: { // Corresponds to "1.2. ... (Services Overview)"
        title: 'Our Services: Everything for Your Business\'s Stable Growth',
        accounting: {
          title: 'Accounting Services',
          description: 'Professional accounting for SMBs and large companies. Accurate bookkeeping, timely declarations, and financial reporting. We are experts in accounting services in Georgia for small business.',
          cta: 'Learn More',
        },
        tax: {
          title: 'Tax Consulting',
          description: 'Competent tax consulting in Georgia. Tax planning, risk management, and compliance with legislation, including VAT filing and refund Georgia.',
          cta: 'Learn More',
        },
        legal: {
          title: 'Legal Services',
          description: 'Reliable legal services for businesses in Georgia. Corporate law, contracts, representation in disputes.',
          cta: 'Learn More',
        },
        businessAssist: {
          title: 'Company Registration & Business Assist',
          description: 'Fast and hassle-free company registration in Georgia. Assistance in obtaining special statuses (e.g., micro business status Georgia, international company status Georgia). We simplify business formation Tbilisi, including Georgia LLC formation.',
          cta: 'Learn More',
        },
        audit: {
          title: 'Audit Services',
          description: 'An independent auditing firm offering financial and tax audits for SMBs and large organizations.',
          cta: 'Learn More',
        },
        ctaAll: 'View All Services',
      },

      // How We Work Section (Main Page Content)
      howWeWork: { // Corresponds to "1.2. ... ("How We Work?" / "Simple Steps to Collaborate" Section)"
        title: 'Start Collaborating with "Assist" in 3 Simple Steps',
        step1: 'Contact Us for a Consultation: Fill out the form or get in touch. We will analyze your needs.',
        step2: 'Receive a Tailored Offer: Considering your business specifics, we will prepare the best terms for you.',
        step3: 'Begin Partnership & Receive Ongoing Support: We take care of your financial and legal matters, while you grow your business!',
      },

      // Social Proof Section (Main Page Content)
      socialProof: { // Corresponds to "1.2. ... (Social Proof)"
        title: 'What Our Clients Say',
        testimonial1Name: 'Client Name, Company',
        testimonial1Text: '"The \'Assist\' team completely changed our attitude towards accounting. Everything is in order, and they are always ready to help."',
        testimonial2Name: 'Client Name, Startup',
        testimonial2Text: '"As a startup, their legal and tax advice proved invaluable. Highly recommend to everyone!"',
        trustedByTitle: 'Trusted By:', // Placeholder for logos
      },

      // Blog Teaser Section (Main Page Content)
      blogTeaser: { // Corresponds to "1.2. ... (Blog/Useful Resources Teaser)"
        title: 'Useful Tips & News for Your Business',
        article1Title: '"5 Tax Optimization Tips for Small Businesses in Georgia"',
        article2Title: '"How to Register a Company in Georgia: A Complete Guide"',
        cta: 'View All Articles',
      },

      // Final CTA Block (Main Page Content)
      finalCta: { // Corresponds to "1.2. ... (Final CTA Block)"
        title: 'Ready to Take Your Business to the Next Level?',
        content: "Don't postpone organizing your financial and legal affairs. \"Assist\" is here to provide professional help and create a solid foundation for your success.",
        cta1: 'Contact Us Now',
        cta2: 'Request a Personalized Offer',
        phoneLabel: 'Phone:',
        phoneValue: '[Your Number]', // Placeholder
        emailLabel: 'Email:',
        emailValue: '[Your Email]', // Placeholder
      },
      
      // About Section (Page: About Us)
      about: { // Corresponds to "Page: About Us (English Version)"
        h1: 'Meet "Assist" - Your Trusted and Innovative Partner for Business Growth',
        welcome: 'Welcome to the world of "Assist"! We are a youthful, dynamic, and ambitious auditing company and a team of business process outsourcing specialists, successfully supporting small to medium-sized businesses (SMBs), startups, and individual entrepreneurs in Georgia since 2015. Our primary goal is to simplify the financial and legal labyrinths for you, enabling you to fully focus on your core business activities and conquer your set goals. The "Assist" team unites highly qualified professionals ready to share their knowledge and experience, stand by your side, and become your long-term, reliable partners.',
        missionTitle: 'Our Mission: Your Business\'s Peace of Mind and Growth',
        missionText: 'Our mission is to be more than just a service provider. We strive to build close partnerships with small and medium-sized companies, individual entrepreneurs, and startup initiatives. Our aim is to help them navigate the complex business world with confidence, make informed decisions, and avoid potential risks. We create an environment where complex financial and legal issues are simplified, allowing your valuable time and energy to be entirely dedicated to your business development. We believe that your success is our success.',
        whyAssistTitle: 'Why "Assist"? Your Advantages of Partnering with Us:',
        advantage1Title: 'Youthful Energy and Innovative Vision:',
        advantage1Text: 'We are a young, enthusiastic team constantly seeking modern, effective, and unconventional solutions. We are not afraid of challenges and are ready to offer creative outsourced accounting services Georgia and tax consulting in Georgia tailored to your unique needs.',
        advantage2Title: 'Maximum Client Focus and Direct Communication:',
        advantage2Text: 'Your business success is our top priority. At "Assist," you will find a team ready to listen attentively, understand your specific requirements, and offer personalized service. Communication with us is simple, direct, and friendly.',
        advantage3Title: 'Highly Qualified and Experienced Team:',
        advantage3Text: 'Behind our youthful spirit lies deep-domain knowledge and years of practical experience. Each member of the "Assist" team is a certified professional who continually enhances their qualifications to offer you top-quality legal services for businesses in Georgia and financial consultations.',
        advantage4Title: 'Active Use of Modern Technologies at Your Service:',
        advantage4Text: 'We actively utilize the latest software, cloud services, and digital tools. This allows our services to be maximally fast, accurate, efficient, and comfortable for you. You will have constant access to your financial data through secure and modern platforms for your accounting services in Georgia for small business.',
        advantage5Title: 'Reliable Support for Startups:',
        advantage5Text: 'We particularly understand the unique needs and challenges of startups. We are ready to be your trusted partner from the very first stage of company registration in Georgia and assist you through crucial processes such as obtaining micro business status Georgia or securing international company status Georgia.',
        ourTeamTitle: 'Our Team: The Guarantee of Your Success',
        ourTeamText: '"Assist\'s" main asset and driving force is our team. We are proud of our professionals, who are true enthusiasts and experts in their field. A development-oriented, motivated, and friendly environment is what allows us to offer you the highest standard of service, establish long-term, trust-based partnerships, and celebrate your business achievements together. (A brief insert about a team photo or short introductions of a few team members would be great here once the visual is ready).',
        valuesTitle: 'Our Fundamental Values:',
        value1: 'Professionalism and Competence: Our knowledge and experience at the service of your business.',
        value2: 'Client-Orientation: Your interests and goals are the cornerstone of our work.',
        value3: 'Innovation and Continuous Growth: We learn, develop, and implement new approaches for your better service.',
        value4: 'Transparency and Accountability: We operate openly and take full responsibility for the services we provide.',
        value5: 'Teamwork and Mutual Respect: We are a unified team striving towards a common goal.',
        closingCall: '"Assist" is ready to become your trusted advisor and supporter at every stage of business management, including VAT filing and refund Georgia and overall business formation Tbilisi, including Georgia LLC formation. Contact us today, and let\'s plan the path to your success together!',
      },
      
      // Services
      services: {
        // Accounting Service Page (2.2. Accounting Services - English Version)
        accounting: {
          h1: 'Professional Accounting Services for Small and Medium Businesses in Georgia',
          intro: 'The financial health of your business and full compliance with legislation are our top priorities. "Assist" offers comprehensive outsourced accounting services Georgia designed to help you avoid problems caused by accounting errors, save time and money, and fully focus on your company\'s growth. We understand that accounting services in Georgia for small business require a special approach, so we offer solutions fully tailored to your needs.',
          whyOutsourcingTitle: 'Why is Accounting Outsourcing the Best Choice for Your Business?',
          benefitFinancial: 'Financial Savings', // Simplified for brevity, full text in component
          benefitTime: 'Time Savings',
          benefitRisk: 'Risk Minimization',
          benefitExpertise: 'Access to Expert Knowledge',
          benefitFocus: 'Focus on Core Activities',
          servicesIncludeTitle: '"Assist\'s" Accounting Services Include:',
          serviceList: [
            'Primary Document Processing and Recording',
            'Preparation and Submission of Monthly and Annual Tax Declarations',
            'Financial Statement Preparation (including SARAS submission)',
            'Payroll Calculation and Accounting',
            'Fixed Asset Accounting',
            'Inventory Accounting',
            'Consultations on Current Accounting Issues',
            'Representation with Tax Authorities'
          ],
          packagesTitle: 'Our Accounting Service Packages:',
          package1: 'Chief Accountant Outsourcing Service',
          package2: 'Full Accounting Outsourcing Service (Remote)',
          package3: 'Full Accounting Outsourcing Service (On-site - upon special request)',
          whyUsTitle: 'Why Entrust Your Accounting to "Assist"?',
          reasonExperience: 'Experience and Professionalism',
          reasonIndividual: 'Individual Approach',
          reasonTech: 'Modern Technologies',
          reasonConfidentiality: 'Confidentiality Guarantee',
          reasonCommunication: 'Constant Communication and Support',
          finalCtaTitle: 'Ready to Entrust Your Business Accounting to Reliable Hands?',
          finalCtaText: 'Contact us today, get a free consultation, and find out how "Assist" can help you optimize your financial processes, reduce costs, and achieve sustainable business development.',
          ctaConsultation: 'Request a Free Consultation',
          ctaContact: 'Contact Us',
        },
        // Tax Service Page (3.2. Tax Services - English Version)
        tax: {
          h1: 'Professional Tax Consulting and Services in Tbilisi and throughout Georgia',
          intro: "Georgia's constantly evolving tax legislation presents a major challenge for businesses. \"Assist\" offers comprehensive tax consulting in Georgia, helping your business stay protected, optimize tax liabilities, and comply with current legislation.",
          whyImportantTitle: 'Why is Professional Tax Service Vitally Important?',
          benefitRiskMinimization: 'Minimization of Tax Risks',
          benefitOptimization: 'Tax Optimization',
          benefitCompliance: 'Constant Compliance with Legislation',
          benefitTimeSaving: 'Time and Resource Savings',
          benefitPeaceOfMind: 'Peace of Mind and Confidence',
          servicesIncludeTitle: '"Assist\'s" Tax Services Include:',
          serviceList: [
            'Tax Consultations (all tax types, planning, benefits, VAT filing and refund Georgia, micro business status Georgia, international company status Georgia)',
            'Preparation and Submission of Tax Declarations',
            'Tax Audit',
            'Representation with Tax Authorities',
            'Tax Dispute Resolution',
            'International Taxation Issues'
          ],
          forWhomTitle: 'Who Are Our Tax Services For?',
          targetList: [
            'For Small and Medium Businesses (SMBs)',
            'For Startups',
            'For Individual Entrepreneurs',
            'For Foreign Investors and Companies',
            'For Any Company needing tax support'
          ],
          whyUsTitle: 'Why "Assist" as Your Tax Partner?',
          reasonKnowledge: 'In-depth Knowledge and Experience',
          reasonProactive: 'Proactive Approach',
          reasonResults: 'Focus on Concrete Results',
          reasonTeamwork: 'Teamwork',
          finalCtaTitle: 'Ready to Entrust Your Tax Matters to Professionals?',
          finalCtaText: 'Contact "Assist" today for a free initial consultation and receive qualified advice.',
          ctaRequestConsultation: 'Request Tax Consultation',
          ctaContact: 'Contact Us',
        },
        // Legal Service Page (4.2. Legal Services - English Version)
        legal: {
          h1: 'Comprehensive Legal Services for Businesses in Georgia - Your Legal Protection and Stability',
          intro: 'All business activities are closely intertwined with legal aspects. "Assist" offers high-quality legal services for businesses in Georgia, covering corporate law, contract law, labor law, and other relevant legal issues related to business.',
          whyImportantTitle: 'Why is Professional Legal Support Essential for Your Business?',
          benefitRiskPrevention: 'Prevention of Legal Risks',
          benefitCompliance: 'Full Compliance with Legislation',
          benefitInterestProtection: 'Protection of Your Interests',
          benefitOptimalSolutions: 'Making Optimal Decisions',
          benefitResourceEfficiency: 'Efficient Use of Time and Resources',
          servicesIncludeTitle: '"Assist\'s" Legal Services Include:',
          serviceList: [
            'Corporate Law (company registration in Georgia, reorganization, founding documents)',
            'Contract Law (contract preparation, analysis)',
            'Labor Law (employment contracts, consultations, disputes)',
            'Tax and Administrative Law',
            'Intellectual Property Law (basic consultation)',
            'Representation in Court and Arbitration',
            'Legal Outsourcing'
          ],
          forWhomTitle: 'Who Are Our Legal Services For?',
          targetList: [
            'For Small and Medium Businesses (SMBs)',
            'For Startups',
            'For Foreign Companies and Investors',
            'For Any Company needing legal assistance'
          ],
          whyUsTitle: 'Why "Assist" as Your Legal Advisor?',
          reasonExperience: 'Practical Experience and Result-Orientation',
          reasonBusinessOriented: 'Business-Oriented Approach',
          reasonComprehensiveVision: 'Comprehensive Vision',
          reasonProactivity: 'Proactivity and Prevention',
          finalCtaTitle: 'Protect Your Business Legally with "Assist"!',
          finalCtaText: 'Contact "Assist" for an initial legal consultation.',
          ctaRequestConsultation: 'Request Legal Consultation',
          ctaContact: 'Contact Us',
        },
        // Audit Service Page (5.2. Audit Services - English Version)
        audit: {
          h1: 'Independent Audit Services in Georgia - Your Financial Transparency and Credibility',
          intro: '"Assist," as a licensed auditing company, offers high-quality and independent audit services that will help you confirm the reliability of your financial information. We provide both statutory audits of financial statements and special purpose audits, including tax audits for small businesses.',
          whyImportantTitle: 'Why are Audit Services Important for Your Company?',
          benefitCredibility: 'Increased Credibility of Financial Statements',
          benefitInternalControls: 'Assessment and Improvement of Internal Control Systems',
          benefitRiskManagement: 'Risk Identification and Management',
          benefitCompliance: 'Ensuring Compliance with Legislation',
          benefitDecisionMaking: 'Improved Decision-Making',
          servicesIncludeTitle: '"Assist\'s" Audit Services Include:',
          serviceList: [
            'Audit of Financial Statements (ISA, SARAS)',
            'Agreed-Upon Procedures Engagements',
            'Internal Audit Services',
            'Tax Audit (tax audits for small businesses)',
            'Due Diligence (Financial and Tax)',
            'Compilation (Preparation of Financial Statements)'
          ],
          forWhomTitle: 'Who Are Our Audit Services For?',
          targetList: [
            'For companies legally required to undergo a statutory audit',
            'For small and medium businesses',
            'For investors and creditors',
            'For company owners and management',
            'For non-profit (non-commercial) legal entities'
          ],
          whyUsTitle: 'Why "Assist" as Your Audit Partner?',
          reasonIndependence: 'Independence and Objectivity',
          reasonQualifiedAuditors: 'Qualified and Certified Auditors',
          reasonRiskBased: 'Risk-Based Approach',
          reasonRecommendations: 'Constructive Recommendations',
          finalCtaTitle: "Ensure Your Business's Financial Transparency with \"Assist\"!",
          finalCtaText: 'Contact "Assist" for a consultation on audit services.',
          ctaRequestService: 'Request Audit Services',
          ctaContact: 'Contact Us',
        },
        // Business Assist Service Page (6.2. Business Assist - English Version)
        business: { // Replaces "Business Consulting"
          h1: 'Starting and Optimizing Your Business in Georgia: Company Registration and Tax Statuses',
          intro: '"Assist" offers comprehensive business assistant services, including swift company registration in Georgia, as well as assistance in obtaining advantageous tax statuses such as micro business status Georgia, small business status, international company status Georgia, and others. We simplify business formation Tbilisi and Georgia LLC formation.',
          whyUseTitle: 'Why Use "Assist\'s" Business Assistant Services?',
          benefitTimeSaving: 'Time Savings',
          benefitCorrectChoice: 'Correct Choices and Error Prevention',
          benefitSimplification: 'Process Simplification',
          benefitComprehensiveSupport: 'Comprehensive Support',
          benefitConsultation: 'Consultation and Clarification',
          servicesIncludeTitle: 'Our Business Assistant Services Include:',
          registrationTitle: 'Company Registration in Georgia (legal form selection, founding documents, registry, bank account)',
          statusAssistanceTitle: 'Assistance in Obtaining Special Tax Statuses:',
          statusList: [
            'Micro Business Status Georgia',
            'Small Business Status',
            'Fixed Tax Payer Status',
            'International Company Status Georgia',
            'Virtual Zone Person (VZP) Status',
            'Free Industrial Zone (FIZ) Enterprise Status'
          ],
          howToStartTitle: 'How to Get Started? (3 steps: Consultation, Strategy, Process Management)',
          finalCtaTitle: 'Start or Expand Your Business in Georgia Easily and Effectively!',
          finalCtaText: "Take advantage of Georgia's attractive business environment and tax benefits.",
          ctaRequestConsultation: 'Request Consultation to Start a Business',
          ctaLearnMoreStatuses: 'Learn More About Statuses',
        },
        // HR Service Page (Generated Content)
        hr: {
          h1: 'Professional HR Services for Your Business Growth and Employee Satisfaction',
          intro: 'At "Assist," we understand that a company\'s most valuable asset is its employees. Our HR Services team offers comprehensive solutions in human resources management to help you attract, retain, and develop talent, as well as create an effective and motivated work environment.',
          whyImportantTitle: 'Why is Professional HR Support Important?',
          benefitTalent: 'Talent Acquisition and Retention: Finding the best candidates in a competitive market and keeping them with your company.',
          benefitCompliance: 'Compliance with Labor Legislation: Accurate adherence to complex labor relations and legal nuances.',
          benefitMotivation: 'Employee Motivation and Development: Increasing productivity and enhancing employee loyalty.',
          benefitCulture: 'Strengthening Company Culture: Fostering a positive and productive work atmosphere.',
          servicesIncludeTitle: '"Assist\'s" HR Services Include:',
          serviceList: [
            'Personnel Selection and Recruitment',
            'Preparation and Administration of Employment Contracts',
            'Development of Salary and Benefit Systems',
            'Employee Appraisal and Development Systems',
            'Training and Qualification Enhancement',
            'Management of Labor Relations and Consultations',
            'Corporate Culture Development'
          ],
          finalCtaTitle: 'Develop Your Team with "Assist"!',
          finalCtaText: 'Contact us to discuss your company\'s HR needs and develop a customized strategy.',
          ctaRequestConsultation: 'Request HR Consultation',
          ctaContact: 'Contact Us',
        },
      },
      
      // Team (Generated Content)
      team: {
        h1: 'Meet the "Assist" Team of Professionals',
        intro: 'The main driving force behind "Assist\'s" success is our team – experienced, motivated, and client-oriented professionals ready to provide you with top-level service. We are proud of our diverse team, where each member enriches our common cause with their unique knowledge and experience.',
        valuesTitle: 'Our Team Values:',
        valueUnity: 'Unity and Collaboration: We believe that the best results are achieved through teamwork.',
        valueGrowth: 'Professional Growth: We constantly help each other develop and acquire new knowledge.',
        valueRespect: 'Respect and Support: We create an environment where everyone feels valued and supported.',
        valueInnovation: 'Innovative Thinking: We encourage new ideas and creative approaches.',
        membersSectionTitle: 'Team Member Introductions', // Placeholder
        // e.g. member1Name: 'Nino Sharashenidze', ...
        finalCtaTitle: 'Want to Become a Part of Our Team?',
        finalCtaText: 'If you share our values and want to grow in an environment of professionals, check out our vacancies.',
        ctaCareer: 'Careers at "Assist"',
        ctaOpenPositions: 'Open Positions',
      },
      
      // Career (Generated Content)
      career: {
        h1: 'Build Your Successful Career with "Assist"',
        intro: '"Assist" is a place where talented and ambitious people grow and develop. We are looking for professionals who want to become part of our friendly and dynamic team, contribute to the company\'s success, and reach their own career peaks.',
        whyAssistTitle: 'Why "Assist"?',
        benefitDevelopment: 'Professional Development Opportunities: We invest in the development of our employees, offering training, seminars, and the chance to work on challenging, interesting projects.',
        benefitCompensation: 'Competitive Salary and Benefits: We offer a decent salary and benefits package that matches your qualifications and experience.',
        benefitEnvironment: 'Supportive and Collaborative Environment: We are a team where mutual respect, help, and knowledge sharing are valued.',
        benefitContribution: 'Meaningful Contribution: Your work will directly impact the success of our clients and the development of the company.',
        openPositionsTitle: 'Open Positions',
        // e.g. vacancy1Title: 'Junior Auditor', ...
        noVacancyNote: 'We currently have no active vacancies, but you can send us your CV, and we will keep it for future opportunities.',
        ctaSendCv: 'Send CV',
        finalCtaTitle: 'Ready to Start a New Career Adventure?',
        finalCtaText: 'Join "Assist" and become a part of success!',
        ctaViewAllVacancies: 'View All Vacancies',
        ctaContactHr: 'Contact HR Department',
      },
      
      // Contact Page (7.2. Contact Us - English Version)
      contact: {
        h1: 'Get in Touch - We\'re Ready to Help!',
        intro: 'Do you have questions about our services? The "Assist" team is ready to answer all your questions. Contact us through any channel convenient for you!',
        infoTitle: 'Our Contact Information:',
        addressLabel: 'Address:',
        addressValue: '[Your Full Address]', // Placeholder
        phoneLabel: 'Phone:',
        phoneValue: '[Your Contact Number]', // Placeholder
        emailLabel: 'Email:',
        emailValue: '[e.g., info@assist.ge]', // Placeholder
        workingHoursLabel: 'Working Hours:',
        workingHoursValue: 'Monday - Friday: [09:00 - 18:00]', // Placeholder
        formTitle: 'Send Us a Message',
        fieldName: 'Name', // Changed from "First Name", "Last Name" for simplicity with one field
        fieldEmail: 'Email',
        fieldPhone: 'Phone',
        fieldCompany: 'Company',
        fieldSubject: 'Subject',
        fieldMessage: 'Message',
        ctaSend: 'Send',
        socialMediaTitle: 'Social Media:', // Placeholder
        finalMessage: 'We look forward to hearing from you.',
      },
      
      // Footer
      footer: {
        description: 'ASSIST - Leading company in business services in Georgia',
        quickLinks: 'Quick Links',
        services: 'Services',
        copyright: '© 2025 ASSIST. All rights reserved.',
        status: 'Status',
        support: 'Support',
        privacy: 'Privacy',
        terms: 'Terms',
        cookiePolicy: 'Cookie Policy'
      },
      
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        confirm: 'Confirm',
        learnMore: 'Learn More'
      }
    }
  },
  
  ru: {
    translation: {
      // Navigation
      nav: {
        about: 'О нас', // from Text
        services: 'Услуги',
        team: 'Команда',
        career: 'Карьера',
        contact: 'Контакты', // from Text
        logo: 'ASSIST',
      },
      
      // Hero Section (Main Page Content)
      hero: { // Corresponds to "1.3. Главная страница - Русская версия (Hero Section)"
        mainTitle: '"Ассист": Надежная финансовая и юридическая поддержка вашего бизнеса в Грузии',
        subtitle: 'Экономьте время и ресурсы, снижайте риски и сосредоточьтесь на том, что действительно важно – развитии вашего бизнеса. "Ассист" предлагает профессиональный аутсорсинг бухгалтерии в Грузии, налоговые и юридические консультации.',
        mainCta: 'Бесплатная консультация',
        secondaryCta: 'Наши услуги',
      },

      // Why Us Section (Main Page Content)
      whyUs: { // Corresponds to "1.3. ... (Секция "Почему мы?" / "Почему выбирают 'Ассист'?")"
        title: 'Почему малый и средний бизнес выбирает "Ассист"?',
        item1: 'Персональный подход и забота: Для нас каждый клиент уникален. Мы слушаем, вникаем и предлагаем индивидуальные решения.',
        item2: 'Профессионализм и гарантированное качество: Наша команда состоит из сертифицированных и опытных специалистов, обеспечивающих высочайшее качество обслуживания.',
        item3: 'Современные технологии и эффективность: Мы используем новейшее программное обеспечение для экономии вашего времени и упрощения процессов для ваших бухгалтерских услуг в Грузии.',
        item4: 'Полный комплекс услуг в одном месте: От бухгалтерии до юридической поддержки – все, что нужно вашему бизнесу, в одном месте.',
        cta: 'Узнать больше о нас',
      },

      // Services Overview (Main Page Content)
      servicesOverview: { // Corresponds to "1.3. ... (Обзор услуг)"
        title: 'Наши услуги: Всё для стабильного роста вашего бизнеса',
        accounting: {
          title: 'Бухгалтерские услуги',
          description: 'Профессиональные бухгалтерские услуги в Грузии для малого, среднего и крупного бизнеса. Точный учет, своевременная отчетность и финансовая документация.',
          cta: 'Подробнее',
        },
        tax: {
          title: 'Налоговое консультирование',
          description: 'Компетентная налоговая консультация в Грузии. Налоговое планирование, управление рисками и соответствие законодательству.',
          cta: 'Подробнее',
        },
        legal: {
          title: 'Юридические услуги',
          description: 'Надежные юридические услуги в Грузии для бизнеса. Корпоративное право, договоры, представительство в спорах.',
          cta: 'Подробнее',
        },
        businessAssist: {
          title: 'Регистрация компании и Бизнес-ассистент',
          description: 'Быстрая и беспроблемная регистрация компании в Грузии. Помощь в получении специальных статусов (напр., статус микробизнеса в Грузии, статус международной компании в Грузии). Мы упрощаем процесс, если вы хотите открыть ИП в Грузии.',
          cta: 'Подробнее',
        },
        audit: {
          title: 'Аудиторские услуги',
          description: 'Независимая аудиторская компания предлагает финансовый аудит в Грузии и налоговый аудит малого бизнеса в Грузии и для крупных организаций.',
          cta: 'Подробнее',
        },
        ctaAll: 'Смотреть все услуги',
      },

      // How We Work Section (Main Page Content)
      howWeWork: { // Corresponds to "1.3. ... (Секция "Как мы работаем?" / "Простые этапы сотрудничества")"
        title: 'Начните сотрудничество с "Ассист" за 3 простых шага',
        step1: 'Обратитесь к нам за консультацией: Заполните форму или свяжитесь с нами. Мы проанализируем ваши потребности.',
        step2: 'Получите индивидуальное предложение: Учитывая специфику вашего бизнеса, мы подготовим для вас лучшие условия.',
        step3: 'Начните партнерство и получайте постоянную поддержку: Мы позаботимся о ваших финансовых и юридических вопросах, а вы – развивайте бизнес!',
      },

      // Social Proof Section (Main Page Content)
      socialProof: { // Corresponds to "1.3. ... (Социальные доказательства)"
        title: 'Что говорят наши клиенты?',
        testimonial1Name: 'Имя клиента, Компания',
        testimonial1Text: '"Команда "Ассист" полностью изменила наше отношение к бухгалтерии. Все в порядке, и они всегда готовы помочь."',
        testimonial2Name: 'Имя клиента, Стартап',
        testimonial2Text: '"Для начинающего бизнеса их юридические и налоговые советы оказались бесценными. Рекомендую всем!"',
        trustedByTitle: 'Нам доверяют:', // Placeholder for logos
      },

      // Blog Teaser Section (Main Page Content)
      blogTeaser: { // Corresponds to "1.3. ... (Тизер блога/полезных ресурсов)"
        title: 'Полезные советы и новости для бизнеса',
        article1Title: '"5 советов по налоговой оптимизации для малого бизнеса в Грузии"',
        article2Title: '"Как зарегистрировать компанию в Грузии: Полное руководство"',
        cta: 'Смотреть все статьи',
      },

      // Final CTA Block (Main Page Content)
      finalCta: { // Corresponds to "1.3. ... (Финальный CTA-блок)"
        title: 'Готовы вывести свой бизнес на новый уровень?',
        content: 'Не откладывайте наведение порядка в ваших финансовых и юридических делах. "Ассист" здесь, чтобы оказать вам профессиональную помощь и создать прочную основу для успеха.',
        cta1: 'Свяжитесь с нами сейчас',
        cta2: 'Запросить персональное предложение',
        phoneLabel: 'Телефон:',
        phoneValue: '[Ваш номер]', // Placeholder
        emailLabel: 'Эл. почта:',
        emailValue: '[Ваша эл. почта]', // Placeholder
      },
      
      // About Section (Page: О нас)
      about: { // Corresponds to "Страница: О нас (Русская версия)"
        h1: 'Знакомьтесь, "Ассист" - Ваш надежный и инновационный партнер для роста бизнеса',
        welcome: 'Добро пожаловать в мир "Ассист"! Мы – молодая, динамичная и амбициозная аудиторская компания и команда специалистов по аутсорсингу бизнес-процессов, которая с 2015 года успешно помогает малому и среднему бизнесу, стартапам и индивидуальным предпринимателям в Грузии. Наша главная цель – упростить для вас финансовые и юридические лабиринты, чтобы вы могли полностью сосредоточиться на основной деятельности вашего бизнеса и покорять поставленные вершины. Команда "Ассист" объединяет высококвалифицированных профессионалов, готовых поделиться своими знаниями и опытом, поддержать вас и стать вашими долгосрочными, надежными партнерами.',
        missionTitle: 'Наша миссия: Спокойствие и рост вашего бизнеса',
        missionText: 'Наша миссия – быть больше, чем просто поставщиком услуг. Мы стремимся строить тесные партнерские отношения с малыми и средними компаниями, индивидуальными предпринимателями и стартап-инициативами. Наша цель – помочь им уверенно ориентироваться в сложной бизнес-среде, принимать обоснованные решения и избегать возможных рисков. Мы создаем среду, в которой сложные финансовые и юридические вопросы упрощаются, чтобы ваше драгоценное время и энергия были полностью посвящены развитию вашего бизнеса. Мы верим, что ваш успех – это наш успех.',
        whyAssistTitle: 'Почему "Ассист"? Ваши преимущества при сотрудничестве с нами:',
        advantage1Title: 'Молодежная энергия и инновационное видение:',
        advantage1Text: 'Мы – молодая, полная энтузиазма команда, которая постоянно ищет современные, эффективные и нестандартные решения. Нас не пугают вызовы, и мы готовы предложить вам креативный аутсорсинг бухгалтерии Грузия и налоговые консультации Грузия, полностью адаптированные к вашим уникальным потребностям.',
        advantage2Title: 'Максимальная ориентация на клиента и прямой контакт:',
        advantage2Text: 'Успех вашего бизнеса – наш главный приоритет. В "Ассист" вы найдете команду, готовую внимательно выслушать вас, понять ваши специфические требования и предложить персонализированное обслуживание. Общение с нами – простое, прямое и дружелюбное.',
        advantage3Title: 'Высококвалифицированная и опытная команда:',
        advantage3Text: 'За нашим молодежным энтузиазмом стоят глубокие знания в сфере и многолетний практический опыт. Каждый член команды "Ассист" – сертифицированный профессионал, постоянно повышающий свою квалификацию, чтобы предлагать вам юридические услуги в Грузии для бизнеса и финансовые консультации высочайшего качества.',
        advantage4Title: 'Активное использование современных технологий к вашим услугам:',
        advantage4Text: 'Мы активно используем новейшее программное обеспечение, облачные сервисы и цифровые инструменты. Это позволяет нам предоставлять наши бухгалтерские услуги в Грузии максимально быстро, точно, эффективно и комфортно для вас. У вас будет постоянный доступ к вашим финансовым данным через безопасные и современные платформы.',
        advantage5Title: 'Надежная поддержка для стартапов:',
        advantage5Text: 'Мы особенно хорошо понимаем уникальные потребности и вызовы стартапов. Мы готовы быть вашим надежным партнером с самого первого этапа регистрации компании в Грузии и помочь вам пройти такие важные процессы, как получение статуса микробизнеса в Грузии или статуса международной компании в Грузии.',
        ourTeamTitle: 'Наша команда: Гарантия вашего успеха',
        ourTeamText: 'Главный капитал и движущая сила "Ассист" – это наша команда. Мы гордимся нашими профессионалами, которые являются настоящими энтузиастами и экспертами своего дела. Ориентированная на постоянное развитие, мотивированная и дружелюбная атмосфера – вот что позволяет нам предлагать вам обслуживание высочайшего стандарта, устанавливать с вами долгосрочные, основанные на доверии партнерские отношения и вместе праздновать достижения вашего бизнеса. (Здесь была бы уместна краткая вставка с фотографией команды или коротким представлением нескольких ее членов, когда визуальные материалы будут готовы).',
        valuesTitle: 'Наши фундаментальные ценности:',
        value1: 'Профессионализм и компетентность: Наши знания и опыт на службе вашего бизнеса.',
        value2: 'Клиентоориентированность: Ваши интересы и цели – краеугольный камень нашей работы.',
        value3: 'Инновации и постоянный рост: Мы учимся, развиваемся и внедряем новшества для вашего лучшего обслуживания.',
        value4: 'Прозрачность и ответственность: Мы действуем открыто и несем полную ответственность за предоставляемые нами услуги.',
        value5: 'Командная работа и взаимоуважение: Мы – единая команда, стремящаяся к общей цели.',
        closingCall: '"Ассист" готова стать вашим надежным советником и помощником на всех этапах управления бизнесом, включая помощь, если вы хотите открыть ИП в Грузии, нуждаетесь в услугах по финансовому аудиту в Грузии или вам предстоит налоговый аудит малого бизнеса в Грузии. Свяжитесь с нами сегодня, и давайте вместе спланируем путь к вашему успеху!',
      },
      
      // Services
      services: {
        // Accounting Service Page (2.3. Бухгалтерские услуги - Русская версия)
        accounting: {
          h1: 'Профессиональные бухгалтерские услуги для малого и среднего бизнеса в Грузии',
          intro: 'Финансовое здоровье вашего бизнеса и полное соответствие законодательству – наш главный приоритет. "Ассист" предлагает комплексный аутсорсинг бухгалтерии в Грузии, который поможет вам избежать проблем, вызванных бухгалтерскими ошибками, сэкономить время и финансы, и полностью сосредоточиться на росте вашей компании. Мы хорошо понимаем, что бухгалтерские услуги в Грузии для малого бизнеса требуют особого подхода, поэтому мы предлагаем решения, полностью адаптированные к вашим потребностям.',
          whyOutsourcingTitle: 'Почему бухгалтерский аутсорсинг – лучший выбор для вашего бизнеса?',
          benefitFinancial: 'Финансовая экономия',
          benefitTime: 'Экономия времени',
          benefitRisk: 'Минимизация рисков',
          benefitExpertise: 'Доступ к экспертным знаниям',
          benefitFocus: 'Фокус на основной деятельности',
          servicesIncludeTitle: 'Бухгалтерские услуги от "Ассист" включают:',
          serviceList: [
            'Обработка и учет первичной документации',
            'Подготовка и сдача ежемесячных и годовых налоговых деклараций',
            'Подготовка финансовой отчетности (включая подачу в SARAS)',
            'Расчет и учет заработной платы',
            'Учет основных средств',
            'Учет товарно-материальных ценностей',
            'Консультации по текущим бухгалтерским вопросам',
            'Представительство в налоговых органах'
          ],
          packagesTitle: 'Наши пакеты бухгалтерских услуг:',
          package1: 'Аутсорсинг услуг главного бухгалтера',
          package2: 'Полный бухгалтерский аутсорсинг (удаленно)',
          package3: 'Полный бухгалтерский аутсорсинг (на рабочем месте в компании - по специальному запросу)',
          whyUsTitle: 'Почему стоит доверить вашу бухгалтерию "Ассист"?',
          reasonExperience: 'Опыт и профессионализм',
          reasonIndividual: 'Индивидуальный подход',
          reasonTech: 'Современные технологии',
          reasonConfidentiality: 'Гарантия конфиденциальности',
          reasonCommunication: 'Постоянная связь и поддержка',
          finalCtaTitle: 'Готовы передать бухгалтерию вашего бизнеса в надежные руки?',
          finalCtaText: 'Свяжитесь с нами сегодня, получите бесплатную консультацию и узнайте, как "Ассист" может помочь вам оптимизировать ваши финансовые процессы, сократить расходы и достичь устойчивого развития бизнеса.',
          ctaConsultation: 'Запросить бесплатную консультацию',
          ctaContact: 'Связаться с нами',
        },
        // Tax Service Page (3.3. Налоговые услуги - Русская версия)
        tax: {
          h1: 'Профессиональные налоговые консультации и обслуживание в Тбилиси и по всей Грузии',
          intro: 'Постоянно меняющееся налоговое законодательство Грузии представляет собой один из главных вызовов для бизнеса. "Ассист" предлагает комплексные налоговые консультации в Грузии, чтобы ваш бизнес был максимально защищен, налоговые обязательства оптимизированы и соответствовали действующему законодательству.',
          whyImportantTitle: 'Почему профессиональное налоговое обслуживание жизненно важно?',
          benefitRiskMinimization: 'Минимизация налоговых рисков',
          benefitOptimization: 'Налоговая оптимизация',
          benefitCompliance: 'Постоянное соответствие законодательству',
          benefitTimeSaving: 'Экономия времени и ресурсов',
          benefitPeaceOfMind: 'Спокойствие и уверенность',
          servicesIncludeTitle: 'Налоговые услуги от "Ассист" включают:',
          serviceList: [
            'Налоговые консультации (все виды налогов, планирование, льготы, статус микробизнеса в Грузии, статус международной компании в Грузии)',
            'Подготовка и подача налоговых деклараций',
            'Налоговый аудит (налоговый аудит малого бизнеса в Грузии)',
            'Представительство в налоговых органах',
            'Ведение налоговых споров',
            'Вопросы международного налогообложения'
          ],
          forWhomTitle: 'Для кого предназначены наши налоговые услуги?',
          targetList: [
            'Для малого и среднего бизнеса',
            'Для стартапов',
            'Для индивидуальных предпринимателей (ИП) (включая помощь, если вы хотите открыть ИП в Грузии)',
            'Для иностранных инвесторов и компаний',
            'Для любой компании, нуждающейся в налоговой поддержке'
          ],
          whyUsTitle: 'Почему "Ассист" – ваш налоговый партнер?',
          reasonKnowledge: 'Глубокие знания и опыт',
          reasonProactive: 'Проактивный подход',
          reasonResults: 'Ориентация на конкретный результат',
          reasonTeamwork: 'Командная работа',
          finalCtaTitle: 'Готовы доверить свои налоговые вопросы профессионалам?',
          finalCtaText: 'Свяжитесь с "Ассист" сегодня для бесплатной первичной консультации и получите квалифицированные советы.',
          ctaRequestConsultation: 'Запросить налоговую консультацию',
          ctaContact: 'Связаться с нами',
        },
        // Legal Service Page (4.3. Юридические услуги - Русская версия)
        legal: {
          h1: 'Комплексные юридические услуги для бизнеса в Грузии - Ваша правовая защита и стабильность',
          intro: 'Любая предпринимательская деятельность тесно связана с правовыми аспектами. "Ассист" предлагает высококвалифицированные юридические услуги в Грузии для бизнеса, охватывающие корпоративное право, договорное право, трудовое право и другие актуальные юридические вопросы, связанные с бизнесом.',
          whyImportantTitle: 'Почему профессиональная юридическая поддержка необходима вашему бизнесу?',
          benefitRiskPrevention: 'Предотвращение правовых рисков',
          benefitCompliance: 'Полное соответствие законодательству',
          benefitInterestProtection: 'Защита ваших интересов',
          benefitOptimalSolutions: 'Принятие оптимальных решений',
          benefitResourceEfficiency: 'Эффективное использование времени и ресурсов',
          servicesIncludeTitle: 'Юридические услуги от "Ассист" включают:',
          serviceList: [
            'Корпоративное право (регистрация компании в Грузии, реорганизация, учредительные документы)',
            'Договорное право (подготовка, анализ договоров)',
            'Трудовое право (трудовые договоры, консультации, споры)',
            'Налоговое и административное право',
            'Право интеллектуальной собственности (базовая консультация)',
            'Представительство в суде и арбитраже',
            'Юридический аутсорсинг'
          ],
          forWhomTitle: 'Для кого предназначены наши юридические услуги?',
          targetList: [
            'Для малого и среднего бизнеса',
            'Для стартапов',
            'Для иностранных компаний и инвесторов',
            'Для любой компании, нуждающейся в юридической помощи'
          ],
          whyUsTitle: 'Почему "Ассист" – ваш юридический советник?',
          reasonExperience: 'Практический опыт и ориентация на результат',
          reasonBusinessOriented: 'Бизнес-ориентированный подход',
          reasonComprehensiveVision: 'Комплексное видение',
          reasonProactivity: 'Проактивность и превенция',
          finalCtaTitle: 'Защитите свой бизнес юридически вместе с "Ассист"!',
          finalCtaText: 'Свяжитесь с "Ассист" для первичной юридической консультации.',
          ctaRequestConsultation: 'Запросить юридическую консультацию',
          ctaContact: 'Связаться с нами',
        },
        // Audit Service Page (5.3. Аудиторские услуги - Русская версия)
        audit: {
          h1: 'Независимые аудиторские услуги в Грузии - Ваша финансовая прозрачность и надежность',
          intro: '"Ассист", как лицензированная аудиторская компания, предлагает высококвалифицированные и независимые аудиторские услуги, которые помогут вам подтвердить достоверность вашей финансовой информации. Мы обеспечиваем как обязательный аудит финансовой отчетности, так и аудит специального назначения, включая налоговый аудит малого бизнеса в Грузии.',
          whyImportantTitle: 'Почему аудиторские услуги важны для вашей компании?',
          benefitCredibility: 'Повышение достоверности финансовой отчетности',
          benefitInternalControls: 'Оценка и улучшение системы внутреннего контроля',
          benefitRiskManagement: 'Выявление и управление рисками',
          benefitCompliance: 'Обеспечение соответствия законодательству',
          benefitDecisionMaking: 'Улучшение процесса принятия решений',
          servicesIncludeTitle: 'Аудиторские услуги от "Ассист" включают:',
          serviceList: [
            'Аудит финансовой отчетности (МСА, SARAS). Мы также проводим финансовый аудит в Грузии.',
            'Выполнение согласованных процедур',
            'Услуги внутреннего аудита',
            'Налоговый аудит (налоговый аудит малого бизнеса в Грузии)',
            'Due Diligence (финансовый и налоговый)',
            'Компиляция (составление финансовой отчетности)'
          ],
          forWhomTitle: 'Для кого предназначены наши аудиторские услуги?',
          targetList: [
            'Для компаний, которым законодательно предписан обязательный аудит',
            'Для малого и среднего бизнеса',
            'Для инвесторов и кредиторов',
            'Для собственников и руководства компаний',
            'Для некоммерческих (непредпринимательских) юридических лиц'
          ],
          whyUsTitle: 'Почему "Ассист" – ваш аудиторский партнер?',
          reasonIndependence: 'Независимость и объективность',
          reasonQualifiedAuditors: 'Квалифицированные и сертифицированные аудиторы',
          reasonRiskBased: 'Риск-ориентированный подход',
          reasonRecommendations: 'Конструктивные рекомендации',
          finalCtaTitle: 'Обеспечьте финансовую прозрачность вашего бизнеса вместе с "Ассист"!',
          finalCtaText: 'Свяжитесь с "Ассист" для консультации по аудиторским услугам.',
          ctaRequestService: 'Запросить аудиторские услуги',
          ctaContact: 'Связаться с нами',
        },
        // Business Assist Service Page (6.3. Бизнес-ассистент - Русская версия)
        business: { // Replaces "Business Consulting"
          h1: 'Открытие и оптимизация вашего бизнеса в Грузии: Регистрация компаний и налоговые статусы',
          intro: '"Ассист" предлагает комплексные услуги бизнес-ассистента, включающие как быструю регистрацию компании в Грузии, так и помощь в получении выгодных налоговых статусов, таких как статус микробизнеса в Грузии, статус малого бизнеса, статус международной компании в Грузии и другие. Мы также поможем открыть ИП в Грузии.',
          whyUseTitle: 'Почему стоит воспользоваться услугами бизнес-ассистента от "Ассист"?',
          benefitTimeSaving: 'Экономия времени',
          benefitCorrectChoice: 'Правильный выбор и предотвращение ошибок',
          benefitSimplification: 'Упрощение процесса',
          benefitComprehensiveSupport: 'Комплексная поддержка',
          benefitConsultation: 'Консультации и разъяснения',
          servicesIncludeTitle: 'Услуги нашего бизнес-ассистента включают:',
          registrationTitle: 'Регистрация компании в Грузии (выбор юр. формы, учредительные документы, реестр, банковский счет)',
          statusAssistanceTitle: 'Помощь в получении специальных налоговых статусов:',
          statusList: [
            'Статус микробизнеса в Грузии',
            'Статус малого бизнеса',
            'Статус плательщика фиксированного налога',
            'Статус международной компании в Грузии',
            'Статус лица виртуальной зоны (VZP)',
            'Статус предприятия Свободной индустриальной зоны (СИЗ)'
          ],
          howToStartTitle: 'Как начать? (3 этапа: Консультация, Стратегия, Управление процессом)',
          finalCtaTitle: 'Начните или расширьте свой бизнес в Грузии легко и эффективно!',
          finalCtaText: 'Воспользуйтесь привлекательной бизнес-средой Грузии и налоговыми льготами.',
          ctaRequestConsultation: 'Запросить консультацию по открытию бизнеса',
          ctaLearnMoreStatuses: 'Узнать больше о статусах',
        },
        // HR Service Page (Generated Content)
        hr: {
          h1: 'Профессиональные HR-услуги для роста вашего бизнеса и удовлетворенности сотрудников',
          intro: 'В "Ассист" мы понимаем, что самый ценный актив компании – это ее сотрудники. Наша команда HR-специалистов предлагает комплексные решения в области управления человеческими ресурсами, которые помогут вам привлекать, удерживать и развивать таланты, а также создавать эффективную и мотивированную рабочую среду.',
          whyImportantTitle: 'Почему важна профессиональная HR-поддержка?',
          benefitTalent: 'Привлечение и удержание талантов: Поиск лучших кандидатов на конкурентном рынке и их удержание в компании.',
          benefitCompliance: 'Соблюдение трудового законодательства: Точное соблюдение сложных трудовых отношений и нюансов законодательства.',
          benefitMotivation: 'Мотивация и развитие сотрудников: Повышение производительности и лояльности сотрудников.',
          benefitCulture: 'Укрепление корпоративной культуры: Формирование позитивной и продуктивной рабочей атмосферы.',
          servicesIncludeTitle: 'HR-услуги от "Ассист" включают:',
          serviceList: [
            'Подбор и рекрутинг персонала',
            'Подготовка и администрирование трудовых договоров',
            'Разработка систем заработной платы и льгот',
            'Системы оценки и развития сотрудников',
            'Тренинги и повышение квалификации',
            'Управление трудовыми отношениями и консультации',
            'Развитие корпоративной культуры'
          ],
          finalCtaTitle: 'Развивайте вашу команду вместе с "Ассист"!',
          finalCtaText: 'Свяжитесь с нами, чтобы обсудить HR-потребности вашей компании и разработать индивидуальную стратегию.',
          ctaRequestConsultation: 'Запросить HR-консультацию',
          ctaContact: 'Связаться с нами',
        },
      },
      
      // Team (Generated Content)
      team: {
        h1: 'Познакомьтесь с командой профессионалов "Ассист"',
        intro: 'Главная движущая сила успеха "Ассист" – это наша команда: опытные, мотивированные и клиентоориентированные профессионалы, готовые предоставить вам услуги высочайшего уровня. Мы гордимся нашей разнообразной командой, где каждый участник обогащает общее дело своими уникальными знаниями и опытом.',
        valuesTitle: 'Наши командные ценности:',
        valueUnity: 'Единство и сотрудничество: Мы верим, что наилучшие результаты достигаются совместной работой.',
        valueGrowth: 'Профессиональный рост: Мы постоянно помогаем друг другу развиваться и приобретать новые знания.',
        valueRespect: 'Уважение и поддержка: Мы создаем среду, в которой каждый чувствует себя ценным и поддержанным.',
        valueInnovation: 'Инновационное мышление: Мы поощряем новые идеи и креативные подходы.',
        membersSectionTitle: 'Представление членов команды', // Placeholder
        // e.g. member1Name: 'Нино Шарашенидзе', ...
        finalCtaTitle: 'Хотите стать частью нашей команды?',
        finalCtaText: 'Если вы разделяете наши ценности и хотите развиваться в окружении профессионалов, ознакомьтесь с нашими вакансиями.',
        ctaCareer: 'Карьера в "Ассист"',
        ctaOpenPositions: 'Открытые вакансии',
      },
      
      // Career (Generated Content)
      career: {
        h1: 'Постройте свою успешную карьеру вместе с "Ассист"',
        intro: '"Ассист" – это место, где талантливые и амбициозные люди растут и развиваются. Мы ищем профессионалов, которые хотят стать частью нашей дружной и динамичной команды, внести свой вклад в успех компании и достичь собственных карьерных вершин.',
        whyAssistTitle: 'Почему "Ассист"?',
        benefitDevelopment: 'Возможности профессионального развития: Мы инвестируем в развитие наших сотрудников, предлагая тренинги, семинары и шанс работать над сложными, интересными проектами.',
        benefitCompensation: 'Конкурентоспособная заработная плата и льготы: Мы предлагаем достойную заработную плату и социальный пакет, соответствующие вашей квалификации и опыту.',
        benefitEnvironment: 'Поддерживающая и сотрудничающая среда: Мы – команда, где ценятся взаимоуважение, помощь и обмен знаниями.',
        benefitContribution: 'Значимый вклад: Ваша работа будет напрямую влиять на успех наших клиентов и развитие компании.',
        openPositionsTitle: 'Открытые вакансии',
        // e.g. vacancy1Title: 'Младший аудитор', ...
        noVacancyNote: 'В настоящее время у нас нет активных вакансий, но вы можете отправить нам свое резюме, и мы сохраним его для будущих возможностей.',
        ctaSendCv: 'Отправить резюме',
        finalCtaTitle: 'Готовы начать новое карьерное приключение?',
        finalCtaText: 'Присоединяйтесь к "Ассист" и станьте частью успеха!',
        ctaViewAllVacancies: 'Посмотреть все вакансии',
        ctaContactHr: 'Связаться с HR-отделом',
      },
      
      // Contact Page (7.3. Контакты - Русская версия)
      contact: {
        h1: 'Свяжитесь с нами - Мы готовы помочь!',
        intro: 'У вас есть вопросы о наших услугах? Команда "Ассист" готова ответить на все ваши вопросы. Свяжитесь с нами по любому удобному для вас каналу!',
        infoTitle: 'Наша контактная информация:',
        addressLabel: 'Адрес:',
        addressValue: '[Ваш полный адрес]', // Placeholder
        phoneLabel: 'Телефон:',
        phoneValue: '[Ваш контактный номер]', // Placeholder
        emailLabel: 'Электронная почта:',
        emailValue: '[напр., info@assist.ge]', // Placeholder
        workingHoursLabel: 'Рабочее время:',
        workingHoursValue: 'Понедельник - Пятница: [09:00 - 18:00]', // Placeholder
        formTitle: 'Отправьте нам сообщение',
        fieldName: 'Имя',
        fieldEmail: 'Эл. почта',
        fieldPhone: 'Телефон',
        fieldCompany: 'Компания',
        fieldSubject: 'Тема',
        fieldMessage: 'Сообщение',
        ctaSend: 'Отправить',
        socialMediaTitle: 'Социальные сети:', // Placeholder
        finalMessage: 'С нетерпением ждем вашего обращения.',
      },
      
      // Footer
      footer: {
        description: 'ASSIST - ведущая компания в сфере бизнес-услуг в Грузии',
        quickLinks: 'Быстрые ссылки',
        services: 'Услуги',
        copyright: '© 2025 ASSIST. Все права защищены.',
        status: 'Статус',
        support: 'Поддержка',
        privacy: 'Конфиденциальность',
        terms: 'Условия',
        cookiePolicy: 'Политика Cookie'
      },
      
      // Common
      common: {
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успех',
        cancel: 'Отмена',
        save: 'Сохранить',
        edit: 'Редактировать',
        delete: 'Удалить',
        confirm: 'Подтвердить',
        learnMore: 'Узнать больше'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ka',
    fallbackLng: 'ka',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;
