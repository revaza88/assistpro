const ka = {
  nav: 'შეაფასე ღირებულება', title: 'მომსახურების დემო შეფასება', intro: 'ბუღალტრული მომსახურების წინასწარი შეფასების მაგალითი — თქვენი ბიზნესის ძირითადი მონაცემებით.',
  notice: 'დემო რეჟიმი — თანხები და კოეფიციენტები საილუსტრაციოა. ეს არ არის მოქმედი ტარიფი ან კომერციული შეთავაზება.',
  business: 'თქვენი ბიზნესის შესახებ', industry: 'საქმიანობის სფერო', documents: 'დოკუმენტები თვეში, დაახლოებით', employees: 'თანამშრომლების რაოდენობა', type: 'მომსახურების ტიპი', vat: 'კომპანია დღგ-ის გადამხდელია',
  industries: ['მომსახურება', 'ვაჭრობა', 'წარმოება', 'სასტუმრო / კვება'], types: ['ყოველთვიური ბუღალტერია', 'აღრიცხვის აღდგენა'],
  help: 'ზუსტი რაოდენობა უცნობია? მიუთითეთ მიახლოებითი მოცულობა.', result: 'დემო შეფასება', perMonth: '₾ / თვე', excluded: 'საილუსტრაციო დიაპაზონი · დღგ-ის გარეშე',
  vatNote: 'დღგ-ის სტატუსი დემო მოდელში სამუშაოს მოცულობაზე მოქმედებს; ნაჩვენები თანხა დღგ-ს არ მოიცავს.',
  individual: 'ინდივიდუალური შეფასება', recovery: 'აღდგენის ღირებულება პერიოდებისა და აღრიცხვის მდგომარეობის შეფასების შემდეგ განისაზღვრება.',
  invalid: 'შეამოწმეთ მონაცემები', numberError: 'გამოიყენეთ არაუარყოფითი მთელი რიცხვი.', documentError: 'მიუთითეთ მთელი რიცხვი 0-დან 1 000 000-მდე.', employeeError: 'მიუთითეთ მთელი რიცხვი 0-დან 10 000-მდე.',
  version: 'დემო წესების ვერსია', discuss: 'განვიხილოთ ეს მონაცემები', edit: 'გამოთვლის შეცვლა', reset: 'საწყისი მონაცემების აღდგენა', invalidLink: 'გამოთვლის ბმული არასრული ან არასწორია. შეავსეთ ველები ან აღადგინეთ საწყისი მონაცემები.',
  scope: 'ეს მოდელი მხოლოდ ბუღალტრული მომსახურების დემო შეფასებაა. სხვა მომსახურებებისა და რეალური პირობების ფასი ცალკე თანხმდება.', yes: 'კი', no: 'არა', context: 'კალკულატორიდან გადმოტანილი მონაცემები',
};
const en: typeof ka = {
  nav: 'Estimate the cost', title: 'Demo service estimate', intro: 'An illustrative accounting-service estimate using basic information about your business.',
  notice: 'Demo mode — amounts and coefficients are illustrative. This is not an active tariff or a commercial offer.', business: 'About your business', industry: 'Industry', documents: 'Approximate documents per month', employees: 'Number of employees', type: 'Service type', vat: 'The company is VAT registered', industries: ['Services', 'Trade', 'Manufacturing', 'Hotels / food'], types: ['Monthly accounting', 'Accounting cleanup'],
  help: 'Not sure of the exact numbers? Use an approximate volume.', result: 'Demo estimate', perMonth: 'GEL / month', excluded: 'Illustrative range · excluding VAT', vatNote: 'VAT registration changes the workload in this demo model; VAT is not included in the displayed amount.',
  individual: 'Individual assessment', recovery: 'Cleanup costs are determined after reviewing the periods and the state of the records.', invalid: 'Check your inputs', numberError: 'Use a non-negative whole number.', documentError: 'Enter a whole number between 0 and 1,000,000.', employeeError: 'Enter a whole number between 0 and 10,000.',
  version: 'Demo rules version', discuss: 'Discuss these inputs', edit: 'Edit calculation', reset: 'Restore default inputs', invalidLink: 'This calculation link is incomplete or invalid. Fill in the fields or restore the defaults.', scope: 'This model is an accounting-service demo only. Other services and actual commercial terms are quoted separately.', yes: 'Yes', no: 'No', context: 'Inputs from the calculator',
};
const ru: typeof ka = {
  nav: 'Оценить стоимость', title: 'Демо-оценка услуг', intro: 'Пример предварительной оценки бухгалтерских услуг по основным данным бизнеса.',
  notice: 'Демо-режим — суммы и коэффициенты приведены для иллюстрации. Это не действующий тариф и не коммерческое предложение.', business: 'О вашем бизнесе', industry: 'Сфера деятельности', documents: 'Документов в месяц, примерно', employees: 'Количество сотрудников', type: 'Тип услуги', vat: 'Компания является плательщиком НДС', industries: ['Услуги', 'Торговля', 'Производство', 'Гостиницы / питание'], types: ['Ежемесячная бухгалтерия', 'Восстановление учёта'],
  help: 'Точные числа неизвестны? Укажите примерный объём.', result: 'Демо-оценка', perMonth: 'GEL / месяц', excluded: 'Иллюстративный диапазон · без НДС', vatNote: 'Статус плательщика НДС влияет на объём работы в демо-модели; сама сумма НДС в оценку не включена.',
  individual: 'Индивидуальная оценка', recovery: 'Стоимость восстановления определяется после оценки периодов и состояния учёта.', invalid: 'Проверьте данные', numberError: 'Укажите неотрицательное целое число.', documentError: 'Введите целое число от 0 до 1 000 000.', employeeError: 'Введите целое число от 0 до 10 000.',
  version: 'Версия демо-правил', discuss: 'Обсудить эти данные', edit: 'Изменить расчёт', reset: 'Восстановить исходные данные', invalidLink: 'Ссылка на расчёт неполная или некорректная. Заполните поля или восстановите исходные значения.', scope: 'Это только демо-оценка бухгалтерских услуг. Другие услуги и реальные условия согласуются отдельно.', yes: 'Да', no: 'Нет', context: 'Данные из калькулятора',
};
export function calculatorCopy(language: string) { return language.startsWith('en') ? en : language.startsWith('ru') ? ru : ka; }
