import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: 'ka' as const, name: 'ქართული', flag: '🇬🇪' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  
  const currentLanguage = languages.find(lang => i18n.language.startsWith(lang.code));

  const changeLanguage = (langCode: 'ka' | 'en' | 'ru') => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-12 min-w-12 px-2" aria-label={currentLanguage?.name}>
          <Globe className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">{currentLanguage?.name}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer min-h-12 ${i18n.language === lang.code ? 'bg-brand-blue-50 text-brand-blue-600' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
