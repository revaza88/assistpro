import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('auto');
  const [loaded, setLoaded] = useState(false);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const readTheme = () => {
      try {
        const saved = localStorage.getItem('theme');
        return saved === 'light' || saved === 'dark' ? saved : 'auto';
      } catch { return 'auto'; }
    };
    setTheme(readTheme());
    setLoaded(true);
    const sync = (event: StorageEvent) => {
      if (event.key === 'theme' || event.key === null) setTheme(readTheme());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = theme === 'auto' ? (mediaQuery.matches ? 'dark' : 'light') : theme;
      setActualTheme(resolved);
      const root = document.documentElement;
      root.classList.toggle('dark', resolved === 'dark');
      root.classList.toggle('light', resolved === 'light');
      const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
      if (meta) meta.content = theme === 'auto' ? 'light dark' : theme;
    };
    apply();
    mediaQuery.addEventListener('change', apply);
    return () => mediaQuery.removeEventListener('change', apply);
  }, [theme, loaded]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    try {
      if (newTheme === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', newTheme);
    } catch { /* The current tab's setting still works when storage is blocked. */ }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
