const ka = {
  journey: 'მომსახურების არჩევის გზა', steps: ['არჩევანი', 'დემო შეფასება', 'მოთხოვნა'],
  next: 'შემდეგი ნაბიჯი', choose: 'აირჩიეთ საჭირო მომსახურებები და მოგვიყევით თქვენი ბიზნესის შესახებ.',
  details: 'გაეცანით მომსახურებას', email: 'მოგვწერეთ ელფოსტაზე', contact: 'საკონტაქტო ინფორმაცია',
  form: 'მოთხოვნის ფორმა', contactLead: 'განვიხილოთ თქვენი საჭიროებები და შერჩეული მომსახურებები.',
  teamTitle: 'გუნდი და თანამშრომლობა', teamIntro: 'ერთიანობა, განვითარება, პატივისცემა და ინოვაცია — ჩვენი თანამშრომლობის პრინციპები.',
  careerTitle: 'კარიერა ასისტში', careerIntro: 'გაეცანით თანამშრომლობის პრინციპებსა და ვაკანსიების შესახებ ინფორმაციას.',
  missingTitle: 'გვერდი ვერ მოიძებნა', missingText: 'მოწოდებული მისამართი არ არსებობს ან შეიცვალა. საჭირო ინფორმაციის მოძებნა მთავარი გვერდიდან შეგიძლიათ.', home: 'მთავარ გვერდზე დაბრუნება',
};
const en: typeof ka = {
  journey: 'Service selection steps', steps: ['Your selection', 'Demo estimate', 'Inquiry'],
  next: 'The next step', choose: 'Choose the services you need and tell us about your business.',
  details: 'Explore this service', email: 'Email us', contact: 'Contact details',
  form: 'Inquiry form', contactLead: 'Let’s discuss your needs and selected services.',
  teamTitle: 'Team and collaboration', teamIntro: 'Unity, development, respect and innovation — the principles behind our collaboration.',
  careerTitle: 'Careers at ASSIST', careerIntro: 'Explore our approach to working together and information about vacancies.',
  missingTitle: 'Page not found', missingText: 'This address does not exist or has changed. You can find the information you need from the home page.', home: 'Return to home page',
};
const ru: typeof ka = {
  journey: 'Этапы выбора услуг', steps: ['Выбор услуг', 'Демо-оценка', 'Запрос'],
  next: 'Следующий шаг', choose: 'Выберите нужные услуги и расскажите о вашем бизнесе.',
  details: 'Подробнее об услуге', email: 'Напишите нам', contact: 'Контактная информация',
  form: 'Форма запроса', contactLead: 'Обсудим ваши задачи и выбранные услуги.',
  teamTitle: 'Команда и сотрудничество', teamIntro: 'Единство, развитие, уважение и инновации — принципы нашего сотрудничества.',
  careerTitle: 'Карьера в АССИСТ', careerIntro: 'Узнайте о принципах сотрудничества и информации о вакансиях.',
  missingTitle: 'Страница не найдена', missingText: 'Этого адреса нет или он изменился. Нужную информацию можно найти на главной странице.', home: 'Вернуться на главную',
};
export function interfaceCopy(language: string) { return language.startsWith('en') ? en : language.startsWith('ru') ? ru : ka; }
