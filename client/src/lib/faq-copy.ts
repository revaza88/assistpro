const ka = [
  ['multiple', 'შეიძლება რამდენიმე მომსახურება ერთად ავირჩიო?', 'კი. შეგიძლიათ მონიშნოთ ნებისმიერი კომბინაცია. საქმიანობის სფერო არჩევანს არ ზღუდავს და სავალდებულო პაკეტები არ არსებობს.'],
  ['unsure', 'თუ ჯერ არ ვიცი, რა მომსახურება მჭირდება?', 'აირჩიეთ „ჯერ არ ვიცი“ ან პირდაპირ გადადით მოთხოვნის ფორმაზე. მოკლედ აღწერეთ საკითხი, რომ საჭირო სამუშაოს მოცულობა განვიხილოთ.'],
  ['price', 'კალკულატორი საბოლოო ფასს აჩვენებს?', 'არა. კალკულატორის თანხები და კოეფიციენტები დემოა — ეს არ არის მოქმედი ტარიფი ან კომერციული შეთავაზება. რეალური ფასი საქმიანობის, მოცულობის, პერიოდებისა და საჭირო სამუშაოს მიხედვით ცალკე თანხმდება.'],
  ['scope', 'რა შედის მომსახურებაში?', 'დაწყებამდე თანხმდება სამუშაოს მოცულობა, შედეგის ფორმა, პერიოდულობა და პასუხისმგებლობები. აღრიცხვის აღდგენა ან სხვა სპეციალური პროექტი ცალკე განიხილება.'],
  ['prepare', 'რა ინფორმაცია მოვამზადო პირველი მიმართვისთვის?', 'საკმარისია სახელი და ერთი საკონტაქტო არხი. სურვილისამებრ აღწერეთ საქმიანობა და მოსაგვარებელი საკითხი. სრული დოკუმენტაცია პირველი მიმართვისას საჭირო არ არის.'],
  ['handover', 'როგორ ხდება არსებული ბუღალტრისგან გადმობარება?', 'წინასწარ განისაზღვრება გადასაბარებელი პერიოდი, მონაცემების ფორმატი, მიმდინარე საკითხები და პასუხისმგებლობის გადაცემის თარიღი.'],
  ['software', 'შემიძლია არსებულ პროგრამასთან მუშაობის გაგრძელება?', 'მოთხოვნაში მიუთითეთ პროგრამა და მონაცემების გაცვლის საჭიროება. თავსებადობა და შესაძლო დამატებითი სამუშაო ცალკე შეფასდება; ყველა პროგრამასთან მზა კავშირი დაპირებული არ არის.'],
  ['timing', 'როგორ განისაზღვრება ვადები და კომუნიკაცია?', 'თანამშრომლობის დაწყებამდე თანხმდება პასუხისმგებელი, საკომუნიკაციო არხი, ინფორმაციის გაცვლის პერიოდულობა და სამუშაო ვადები.'],
  ['sending', 'ამ ვერსიაში მოთხოვნა სად ინახება?', 'საჯარო ვერსიაში ონლაინ მიღება გამორთულია — მოგვწერეთ info@assist.ge-ზე. ცალკე ჩართულ ლოკალურ საცდელ რეჟიმში მოთხოვნა ამ კომპიუტერის ფაილში ინახება. ბაზა და ავტომატური ელფოსტა ჩართული არ არის.'],
  ['documents', 'შემიძლია დოკუმენტების ატვირთვა?', 'ამ ფორმას დოკუმენტების ატვირთვა არ აქვს. საკმარისია საკითხის მოკლე აღწერა. არ მიუთითოთ ბანკის ან RS.GE-ის პაროლები; დოკუმენტების გაცვლა ცალკე შეთანხმებული არხით უნდა მოხდეს.'],
] as const;
const en = [
  ['multiple', 'Can I choose several services together?', 'Yes. Choose any combination. Your industry does not restrict services, and no fixed package is required.'],
  ['unsure', 'What if I do not know which services I need?', 'Choose “Not sure yet” or go directly to the inquiry form. Briefly describe the issue so we can discuss the scope.'],
  ['price', 'Does the calculator show a final price?', 'No. The amounts and coefficients are a demo, not an active tariff or commercial offer. Actual pricing is agreed separately based on your activity, volume, periods and required work.'],
  ['scope', 'What is included in the service?', 'Scope, deliverables, frequency and responsibilities are agreed before work begins. Historical cleanup and special projects are discussed separately.'],
  ['prepare', 'What should I prepare for a first inquiry?', 'Your name and one contact method are enough. Optionally describe your business and issue. Full documentation is not needed for the first inquiry.'],
  ['handover', 'How does handover from an existing accountant work?', 'The period, data format, outstanding issues and date of responsibility transfer are agreed in advance.'],
  ['software', 'Can I continue using my current software?', 'Mention the software and data exchange you need. Compatibility and additional work are assessed separately; a ready-made connection to every system is not promised.'],
  ['timing', 'How are deadlines and communication agreed?', 'Before work begins, we agree a contact person, channel, exchange frequency and delivery deadlines.'],
  ['sending', 'Where are inquiries stored in this version?', 'Public online intake is disabled; email info@assist.ge. In the separately enabled local test mode, inquiries are saved in a file on this computer. No database or automatic email delivery is enabled.'],
  ['documents', 'Can I upload documents?', 'This form has no upload function. A short description is enough. Do not include banking or RS.GE passwords. Document exchange must use a separately agreed channel.'],
] as const;
const ru = [
  ['multiple', 'Можно выбрать несколько услуг?', 'Да. Выберите любое сочетание. Отрасль не ограничивает услуги; обязательных пакетов нет.'],
  ['unsure', 'Что делать, если я не знаю, какие услуги нужны?', 'Выберите «Пока не знаю» или перейдите прямо к запросу. Кратко опишите задачу, чтобы обсудить объём работ.'],
  ['price', 'Калькулятор показывает окончательную цену?', 'Нет. Суммы и коэффициенты демонстрационные; это не действующий тариф и не коммерческое предложение. Реальная цена согласуется отдельно с учётом деятельности, объёма, периодов и задач.'],
  ['scope', 'Что входит в услугу?', 'До начала работ согласуются объём, результат, периодичность и ответственность. Восстановление учёта и специальные проекты обсуждаются отдельно.'],
  ['prepare', 'Что подготовить для первого обращения?', 'Достаточно имени и одного способа связи. При желании опишите деятельность и задачу. Полный комплект документов сразу не нужен.'],
  ['handover', 'Как передать дела от действующего бухгалтера?', 'Заранее согласуются период, формат данных, текущие вопросы и дата передачи ответственности.'],
  ['software', 'Можно продолжить работу в текущей программе?', 'Укажите программу и нужный обмен данными. Совместимость и дополнительные работы оцениваются отдельно; готовая интеграция со всеми системами не обещается.'],
  ['timing', 'Как согласуются сроки и общение?', 'До начала работы определяются ответственное лицо, канал связи, периодичность обмена информацией и сроки.'],
  ['sending', 'Где сохраняются запросы в этой версии?', 'Публичный онлайн-приём отключён; пишите на info@assist.ge. В отдельно включённом локальном тестовом режиме запросы сохраняются в файл на этом компьютере. База и автоматическая отправка почты не включены.'],
  ['documents', 'Можно загрузить документы?', 'Загрузка файлов в этой форме отсутствует. Достаточно краткого описания. Не указывайте пароли банка или RS.GE; обмен документами согласуется отдельно.'],
] as const;
export function faqItems(language: string) { return language.startsWith('en') ? en : language.startsWith('ru') ? ru : ka; }
