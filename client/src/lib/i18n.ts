import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ka from './locales/ka';

export type SiteLanguage = 'ka' | 'en' | 'ru';
const translations = {
  en: () => import('./locales/en'),
  ru: () => import('./locales/ru'),
};

void i18n.use(initReactI18next).init({
  resources: { ka: { translation: ka } },
  lng: 'ka',
  fallbackLng: 'ka',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

// Load other languages before changing the UI and its document language.
export async function changeSiteLanguage(language: SiteLanguage) {
  if (language !== 'ka' && !i18n.hasResourceBundle(language, 'translation')) {
    const { default: translation } = await translations[language]();
    i18n.addResourceBundle(language, 'translation', translation);
  }
  await i18n.changeLanguage(language);
}

export default i18n;
