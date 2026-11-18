import { useTranslation } from 'react-i18next';
import { company } from '@/lib/company';

export default function CompanyDetails() {
  const { i18n } = useTranslation();
  const copy = i18n.language.startsWith('en')
    ? ['Company details', 'Legal name', 'Identification code', 'Registered address', 'Bank', 'Bank details']
    : i18n.language.startsWith('ru')
      ? ['Реквизиты компании', 'Юридическое название', 'Идентификационный код', 'Юридический адрес', 'Банк', 'Банковские реквизиты']
      : ['კომპანიის რეკვიზიტები', 'იურიდიული სახელწოდება', 'საიდენტიფიკაციო კოდი', 'იურიდიული მისამართი', 'ბანკი', 'საბანკო რეკვიზიტები'];
  return <section className="company-details" aria-labelledby="company-details-title">
    <h2 id="company-details-title">{copy[0]}</h2>
    <dl>
      <div><dt>{copy[1]}</dt><dd lang="ka">{company.legalName}</dd></div>
      <div><dt>{copy[2]}</dt><dd><bdi>{company.identificationCode}</bdi></dd></div>
      <div><dt>{copy[3]}</dt><dd lang="ka">{company.registeredAddress}</dd></div>
    </dl>
    <details><summary>{copy[5]}</summary><dl>
      <div><dt>{copy[4]}</dt><dd lang="ka">{company.bank}</dd></div>
      <div><dt>IBAN</dt><dd><bdi>{company.iban}</bdi></dd></div>
      <div><dt>SWIFT / BIC</dt><dd><bdi>{company.bic}</bdi></dd></div>
    </dl></details>
  </section>;
}
