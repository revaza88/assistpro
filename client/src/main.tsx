import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./fonts.css";
import "./index.css";
import "./lib/i18n";

const root = document.getElementById('root')!;
let savedLanguage: string | null = null;
try { savedLanguage = localStorage.getItem('language'); } catch { /* Optional preference. */ }
if (root.childElementCount && (!savedLanguage || savedLanguage === 'ka')) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
