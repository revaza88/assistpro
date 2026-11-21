import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from 'wouter';
import { splitLocalePath } from '@shared/localization';
import App from "./App";
import "./fonts.css";
import "./index.css";
import { changeSiteLanguage } from './lib/i18n';

const root = document.getElementById('root')!;
async function mount() {
  const { language, prefix } = splitLocalePath(window.location.pathname);
  try { await changeSiteLanguage(language); }
  catch {
    // Keep the already translated initial HTML readable if an optional chunk fails.
    const status = document.createElement('p'); status.setAttribute('role','alert');
    status.textContent = language === 'ru' ? 'Не удалось загрузить интерактивные элементы. Обновите страницу.' : 'Interactive controls could not load. Reload the page.';
    root.prepend(status); return;
  }
  const application = <Router base={prefix}><App /></Router>;
  if (root.childElementCount) hydrateRoot(root, application);
  else createRoot(root).render(application);
}
void mount();
