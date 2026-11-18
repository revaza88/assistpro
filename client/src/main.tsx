import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./fonts.css";
import "./index.css";
import { changeSiteLanguage } from './lib/i18n';

const root = document.getElementById('root')!;
let savedLanguage: string | null = null;
try { savedLanguage = localStorage.getItem('language'); } catch { /* Optional preference. */ }
async function mount() {
  let translated = false;
  if (savedLanguage === 'en' || savedLanguage === 'ru') {
    try { await changeSiteLanguage(savedLanguage); translated = true; }
    catch { /* Keep the prerendered Georgian page usable if loading fails. */ }
  }
  if (root.childElementCount && !translated) hydrateRoot(root, <App />);
  else createRoot(root).render(<App />);
}
void mount();
