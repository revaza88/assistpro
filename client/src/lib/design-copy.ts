const ka = {
  brand: 'ასისტი',
  title: 'თქვენ ქმნით ბიზნესს. ჩვენ ვზრუნავთ ფინანსურ წესრიგზე.',
  summary: 'ბუღალტერია, გადასახადები და ანგარიშგება — გასაგები პროცესითა და თქვენს საჭიროებაზე მორგებული მომსახურებით.',
  note: 'დავიწყოთ თქვენი ბიზნესის საჭიროებების გაცნობით.',
  servicesEyebrow: '01 / საიდან დავიწყოთ', servicesTitle: 'რა სჭირდება თქვენს ბიზნესს?', servicesSummary: 'აირჩიეთ მიმართულება. ერთად განვსაზღვროთ სამუშაოს მოცულობა და შემდეგი ნაბიჯი.',
  processEyebrow: '02 / თანამშრომლობა', processTitle: 'გასაგები პროცესი. პირველივე დღიდან.',
  steps: [
    ['ვიცნობთ თქვენს ბიზნესს', 'განვიხილავთ საქმიანობას, არსებულ მდგომარეობას და მოსაგვარებელ საკითხებს.'],
    ['ვთანხმდებით პირობებზე', 'ვაზუსტებთ მოცულობას, ფასს, პასუხისმგებლობებსა და კომუნიკაციის წესს.'],
    ['ვიწყებთ თანამშრომლობას', 'ვგეგმავთ გადმობარებას, საჭირო ინფორმაციასა და სამუშაო კალენდარს.'],
  ],
  report: 'ბიზნესი ნათელ სურათში', overview: 'ასისტი / მიმოხილვა', chart: 'შემოსავლების დინამიკა', january: 'იანვარი', june: 'ივნისი', illustration: 'საილუსტრაციო მონაცემები', stamp: 'ყველაფერი თავის ადგილზე', stampNote: 'აღრიცხვა · კონტროლი · სიცხადე',
  strip: ['ბუღალტრული მომსახურება', 'საგადასახადო მხარდაჭერა', 'აუდიტი და ანგარიშგება'],
  finalEyebrow: 'შემდეგი ნაბიჯი', finalTitle: 'მოდით, თქვენს ბიზნესზე ვისაუბროთ.', finalSummary: 'მოგვიყევით, რაში გჭირდებათ მხარდაჭერა.', skip: 'მთავარ შინაარსზე გადასვლა',
};
const en: typeof ka = {
  brand: 'ASSIST', title: 'You build your business. We keep your finances in order.', summary: 'Accounting, tax and reporting — with a clear process and services shaped around your needs.', note: 'Let’s start by understanding your business.',
  servicesEyebrow: '01 / Where to start', servicesTitle: 'What does your business need?', servicesSummary: 'Choose a direction. Together we will define the scope and the next step.', processEyebrow: '02 / Working together', processTitle: 'A clear process. From day one.', steps: [['We understand your business', 'We discuss your activity, current situation and the issues to resolve.'], ['We agree the terms', 'We clarify scope, price, responsibilities and communication.'], ['We begin working together', 'We plan the handover, information needs and work calendar.']],
  report: 'A clearer view of business', overview: 'Assist / Overview', chart: 'Revenue trend', january: 'January', june: 'June', illustration: 'Illustrative data', stamp: 'Everything in its place', stampNote: 'Accounting · Control · Clarity', strip: ['Accounting services', 'Tax support', 'Audit and reporting'], finalEyebrow: 'The next step', finalTitle: 'Let’s talk about your business.', finalSummary: 'Tell us where you need support.', skip: 'Skip to main content',
};
const ru: typeof ka = {
  brand: 'АССИСТ', title: 'Вы развиваете бизнес. Мы заботимся о порядке в финансах.', summary: 'Бухгалтерия, налоги и отчётность — с понятным процессом и услугами под ваши задачи.', note: 'Начнём со знакомства с потребностями вашего бизнеса.',
  servicesEyebrow: '01 / С чего начать', servicesTitle: 'Что нужно вашему бизнесу?', servicesSummary: 'Выберите направление. Вместе определим объём работы и следующий шаг.', processEyebrow: '02 / Сотрудничество', processTitle: 'Понятный процесс. С первого дня.', steps: [['Знакомимся с вашим бизнесом', 'Обсуждаем деятельность, текущую ситуацию и задачи.'], ['Согласуем условия', 'Уточняем объём, цену, ответственность и правила общения.'], ['Начинаем сотрудничество', 'Планируем передачу дел, нужную информацию и календарь работы.']],
  report: 'Бизнес в ясной картине', overview: 'Ассист / Обзор', chart: 'Динамика доходов', january: 'Январь', june: 'Июнь', illustration: 'Иллюстративные данные', stamp: 'Всё на своих местах', stampNote: 'Учёт · Контроль · Ясность', strip: ['Бухгалтерские услуги', 'Налоговая поддержка', 'Аудит и отчётность'], finalEyebrow: 'Следующий шаг', finalTitle: 'Давайте обсудим ваш бизнес.', finalSummary: 'Расскажите, где нужна поддержка.', skip: 'Перейти к основному содержимому',
};
export function designCopy(language: string) { return language.startsWith('en') ? en : language.startsWith('ru') ? ru : ka; }
