import { useState, ElementType } from "react";
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon, ChevronDownIcon } from "@heroicons/react/24/outline"; // Using Heroicons
import LanguageSelector from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import {
  DocumentChartBarIcon,
  ShieldCheckIcon,
  ScaleIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'; // Icons for dropdown

export default function Navigation() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location, navigate] = useLocation();

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
    { id: 'about', label: t('nav.about'), path: '/about' },
    { id: 'team', label: t('nav.team'), path: '/team' },
    { id: 'career', label: t('nav.career'), path: '/career' },
    { id: 'contact', label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-200 sticky top-0 z-50"> {/* Light theme navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20"> {/* Adjusted height for better spacing */}
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg lg:text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-brand-blue-700">
                    {t('nav.logo')}
                  </h1>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              {/* Main link for services - can navigate to a general services page or first service */}
              <Link to="/services/accounting" className="text-slate-700 hover:text-brand-blue-600 px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 flex items-center gap-1 hover:bg-brand-blue-50 rounded-lg">
                {t('nav.services')}
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden"
                    style={{zIndex: 100}}
                  >
                    <div className="p-3 grid grid-cols-1 gap-1">
                      {mainServicesForDropdown.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.href}
                            to={service.href}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link key={item.id} to={item.path}>
                <button
                  className={`text-slate-700 hover:text-brand-blue-600 px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 hover:bg-brand-blue-50 rounded-lg ${location === item.path ? 'text-brand-blue-600 bg-brand-blue-50' : ''}`}
                  onClick={() => handleDesktopNavClick(item.path)}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            
            <div className="pl-2">
              <LanguageSelector />
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-brand-blue-600 hover:bg-brand-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue-500"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-slate-700 hover:text-brand-blue-600 hover:bg-brand-blue-50 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {mainServicesForDropdown.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-brand-blue-600 hover:bg-brand-blue-50"
                          onClick={() => handleMobileNavClick(service.href)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => handleMobileNavClick(item.path)}
                  className={`text-slate-700 hover:text-brand-blue-600 hover:bg-brand-blue-50 block w-full text-left px-3 py-2 rounded-md text-base font-medium ${location === item.path ? 'text-brand-blue-600 bg-brand-blue-50' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
