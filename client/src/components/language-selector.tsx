import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { changeSiteLanguage, type SiteLanguage } from '@/lib/i18n';

const languages = [
  { code: 'ka', name: 'ქართული', flag: '🇬🇪' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
] as const;

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const current = languages.find(lang => i18n.language.startsWith(lang.code)) ?? languages[0];
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const label = current.code === 'en' ? 'Language' : current.code === 'ru' ? 'Язык' : 'ენა';
  const change = async (language: SiteLanguage) => {
    setLoading(true); setFailed(false);
    try {
      await changeSiteLanguage(language);
      try { localStorage.setItem('language', language); } catch { /* The current tab still works. */ }
    } catch { setFailed(true); }
    finally { setLoading(false); }
  };
  return <>
    <span className="header-picker language-picker" aria-busy={loading}>
      <GlobeAltIcon aria-hidden="true" className="language-globe w-4 h-4" />
      <span aria-hidden="true" className="language-name">{current.name}</span>
      <span aria-hidden="true" className="language-code">{current.code.toUpperCase()}</span>
      <select name="language" aria-label={label} value={current.code} disabled={loading} onChange={event => void change(event.target.value as SiteLanguage)}>
        {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
      </select>
    </span>
    {failed && <span role="alert" className="sr-only">{current.code === 'en' ? 'Language could not be changed. Try again.' : current.code === 'ru' ? 'Не удалось изменить язык. Повторите попытку.' : 'ენა ვერ შეიცვალა. სცადეთ ხელახლა.'}</span>}
  </>;
}
