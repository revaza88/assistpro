import { useState, useEffect, useRef, ElementType } from "react";
import { requestCopy } from '@/lib/request-copy';
import { designCopy } from '@/lib/design-copy';
import BrandLogo from '@/components/BrandLogo';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon, ChevronDownIcon } from "@heroicons/react/24/outline"; // Using Heroicons
import LanguageSelector from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";

import { useTranslation } from "react-i18next";
import { Link, useLocation, useSearch } from "wouter";
import { calculatorEntryHref, inquiryEntryHref } from '@shared/calculator-context';
import { calculatorCopy } from '@/lib/calculator-copy';
import {
  DocumentChartBarIcon,
  ShieldCheckIcon,
  ScaleIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'; // Icons for dropdown

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const copy = requestCopy(i18n.language);
  const design = designCopy(i18n.language);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location, navigate] = useLocation();
  const search = useSearch();
  const selectionLink = inquiryEntryHref('/industries', search);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) { setIsMobileMenuOpen(false); setIsServicesOpen(false); }
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  const handleMobileNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const handleDesktopNavClick = (path: string) => {
    navigate(path);
  };

  interface ServiceDropdownItem {
    title: string;
    desc: string;
    href: string;
    icon: ElementType;
  }

  const mainServicesForDropdown: ServiceDropdownItem[] = [
    { 
      title: t('servicesOverview.accounting.title'),
      desc: t('servicesOverview.accounting.description').substring(0,70) + "...",
      href: "/services/accounting",
      icon: DocumentChartBarIcon
    },
    { 
      title: t('servicesOverview.tax.title'),
      desc: t('servicesOverview.tax.description').substring(0,70) + "...",
      href: "/services/tax",
      icon: ShieldCheckIcon
    },
    { 
      title: t('servicesOverview.legal.title'),
      desc: t('servicesOverview.legal.description').substring(0,70) + "...",
      href: "/services/legal",
      icon: ScaleIcon
    },
    {
      title: t('servicesOverview.businessAssist.title'),
      desc: t('servicesOverview.businessAssist.description').substring(0,70) + "...",
      href: "/services/business",
      icon: BuildingOffice2Icon
    },
    {
      title: t('servicesOverview.audit.title'),
      desc: t('servicesOverview.audit.description').substring(0,70) + "...",
      href: "/services/audit",
      icon: MagnifyingGlassIcon
    },
    {
      title: t('servicesOverview.hr.title'),
      desc: t('servicesOverview.hr.description').substring(0, 70) + "...",
      href: "/services/hr",
      icon: UsersIcon
    }
  ];

  const navItems = [
    { id: 'industries', label: copy.industries, path: selectionLink },
    { id: 'about', label: t('nav.about'), path: '/about' },
    { id: 'faq', label: copy.faq, path: '/faq' },
  ];

  return (
    <><a href="#main-content" className="skip-link">{design.skip}</a><nav ref={navRef} onKeyDown={event => { if (event.key === 'Escape' && (isMobileMenuOpen || isServicesOpen)) { event.preventDefault(); setIsMobileMenuOpen(false); setIsServicesOpen(false); (isMobileMenuOpen ? menuButtonRef : servicesButtonRef).current?.focus(); } }} className="site-header sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="header-topline flex flex-wrap gap-y-2 justify-between items-center min-h-16 lg:min-h-20">
          {/* Logo */}
          <div
            className="flex items-center"
          >
            <Link to="/" className="site-brand" onClick={() => setIsMobileMenuOpen(false)}>
              <BrandLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="header-desktop-navigation items-center space-x-1">
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsServicesOpen(false); }}
            >
              {/* Main link for services - can navigate to a general services page or first service */}
              <div className="flex items-center">
              <Link to="/services" aria-current={location === '/services' ? 'page' : undefined} className="text-slate-700 hover:text-brand-blue-600 pl-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 flex items-center gap-1 hover:bg-brand-blue-50 rounded-lg">
                {t('nav.services')}
              </Link>
              <button ref={servicesButtonRef} type="button" aria-label={t('nav.services')} aria-expanded={isServicesOpen} aria-controls="desktop-services" onClick={() => setIsServicesOpen(open => !open)} className="inline-flex items-center justify-center min-h-12 min-w-12 rounded-lg hover:bg-brand-blue-50">
                <ChevronDownIcon aria-hidden="true" className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button></div>
              <>
                {isServicesOpen && (
                  <div
                    id="desktop-services"
                    className="absolute left-0 pt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden"
                    style={{zIndex: 100}}
                  >
                    <div className="p-3 grid grid-cols-1 gap-1">
                      {mainServicesForDropdown.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.href}
                            to={service.href}
                            aria-current={location === service.href ? 'page' : undefined}
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 transition-all duration-200"
                            onClick={() => { setIsServicesOpen(false); }}
                          >
                            <Icon className="w-6 h-6 text-brand-blue-500 mt-0.5 flex-shrink-0"/>
                            <div>
                              <p className="font-semibold text-sm text-slate-800 group-hover:text-brand-blue-600">{service.title}</p>
                              <p className="text-xs text-slate-500">{service.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            </div>

            {navItems.map((item) => (
              <Link key={item.id} to={item.path}
                  aria-current={location === item.path.split('?')[0] ? 'page' : undefined}
                  className={`text-slate-700 hover:text-brand-blue-600 px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 hover:bg-brand-blue-50 rounded-lg ${location === item.path ? 'text-brand-blue-600 bg-brand-blue-50' : ''}`}
                  onClick={() => handleDesktopNavClick(item.path)}
                >
                  {item.label}
              </Link>
            ))}
            
            <Link to={selectionLink} className="site-button">{copy.quote}</Link>
            <div className="pl-2">
              <LanguageSelector />
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="header-mobile-controls flex flex-wrap max-w-full items-center">
            <LanguageSelector />
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex min-h-12 min-w-12 items-center justify-center p-2 rounded-md text-slate-600 hover:text-brand-blue-600 hover:bg-brand-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue-500"
              type="button"
              aria-label={i18n.language.startsWith('en') ? 'Menu' : i18n.language.startsWith('ru') ? 'Меню' : 'მენიუ'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <>
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="mobile-site-menu bg-white border-t border-slate-200 shadow-lg overflow-y-auto"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  aria-expanded={isServicesOpen}
                  aria-controls="mobile-services"
                  className="text-slate-700 hover:text-brand-blue-600 hover:bg-brand-blue-50 w-full min-h-12 text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <>
                  {isServicesOpen && (
                    <div
                      id="mobile-services"
                      className="pl-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {mainServicesForDropdown.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          aria-current={location === service.href ? 'page' : undefined}
                          className="flex items-center min-h-12 px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-brand-blue-600 hover:bg-brand-blue-50"
                          onClick={() => handleMobileNavClick(service.href)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              </div>

              <Link to="/services" onClick={() => handleMobileNavClick('/services')} className="flex items-center min-h-12 px-3 text-brand-blue-700">{t('servicesOverview.ctaAll')}</Link>
              <Link to={calculatorEntryHref(search)} onClick={() => handleMobileNavClick(calculatorEntryHref(search))} className="flex items-center min-h-12 px-3 text-brand-blue-700">{calculatorCopy(i18n.language).nav}</Link>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  aria-current={location === item.path.split('?')[0] ? 'page' : undefined}
                  onClick={() => handleMobileNavClick(item.path)}
                  className={`text-slate-700 hover:text-brand-blue-600 hover:bg-brand-blue-50 flex items-center min-h-12 w-full text-left px-3 py-2 rounded-md text-base font-medium ${location === item.path ? 'text-brand-blue-600 bg-brand-blue-50' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to={selectionLink} onClick={() => handleMobileNavClick(selectionLink)} className="site-button w-full">{copy.quote}</Link>
            </div>
          </div>
        )}
      </>
    </nav></>
  );
}
