import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/theme-context';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();
  const { i18n } = useTranslation();
  const copy = i18n.language.startsWith('en') ? ['Theme', 'Light', 'Dark', 'System']
    : i18n.language.startsWith('ru') ? ['Тема', 'Светлая', 'Тёмная', 'Системная'] : ['თემა', 'ღია', 'მუქი', 'სისტემური'];
  const Icon = actualTheme === 'dark' ? MoonIcon : SunIcon;
  return <span className="header-picker theme-picker">
    <Icon aria-hidden="true" className="w-5 h-5" />
    <select aria-label={copy[0]} value={theme} onChange={event => setTheme(event.target.value as 'light' | 'dark' | 'auto')}>
      <option value="light">{copy[1]}</option><option value="dark">{copy[2]}</option><option value="auto">{copy[3]}</option>
    </select>
  </span>;
}
