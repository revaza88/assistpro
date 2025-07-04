import { useState } from 'react';
import { Menu, Home, Briefcase, Users, Phone, Settings, Info, UserCheck, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'; // Added relevant icons
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'; // Added SheetClose
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter'; // Using wouter Link
import { motion, AnimatePresence } from 'framer-motion';


export function MobileNav() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location, navigate] = useLocation();


  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close the main sheet
    setIsServicesOpen(false); // Ensure services dropdown is also closed
  };

  const mainNavItems = [
    { href: '/', labelKey: 'nav.logo', icon: Home, exact: true }, // Assuming nav.logo is 'Home' or similar
    { href: '/about', labelKey: 'nav.about', icon: Info },
    { href: '/team', labelKey: 'nav.team', icon: UserCheck },
    { href: '/career', labelKey: 'nav.career', icon: BookOpen },
    { href: '/contact', labelKey: 'nav.contact', icon: Phone },
    // Admin link can be conditional if needed
    // { href: '/admin', labelKey: 'Admin', icon: Settings },
  ];

  const serviceNavItems = [
    { href: "/services/accounting", labelKey: "servicesOverview.accounting.title" },
    { href: "/services/tax", labelKey: "servicesOverview.tax.title" },
    { href: "/services/legal", labelKey: "servicesOverview.legal.title" },
    { href: "/services/business", labelKey: "servicesOverview.businessAssist.title" },
    { href: "/services/audit", labelKey: "servicesOverview.audit.title" },
    { href: "/services/hr", labelKey: "services.hr.h1" }, // Using h1 for HR title
  ];


  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {/* This button is likely part of the main Navigation component's mobile view, not standalone */}
        {/* So, this MobileNav component might be intended to be used *within* the main Navigation's mobile part */}
        {/* For now, assuming it can be triggered; the main `navigation.tsx` already has a mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{t('მენიუ', {defaultValue: 'Menu'})}</SheetTitle>
        </SheetHeader>
        <nav className="flex-grow overflow-y-auto p-6 space-y-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? location === item.href : location.startsWith(item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 text-md font-medium hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent ${isActive ? 'bg-accent text-primary' : 'text-muted-foreground'}`}
                  onClick={() => handleLinkClick(item.href)}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                  {t(item.labelKey)}
                </Link>
              </SheetClose>
            );
          })}

          {/* Services Accordion/Dropdown */}
          <div>
            <button
              className="flex items-center justify-between w-full gap-3 text-md font-medium hover:text-primary transition-colors p-3 rounded-lg hover:bg-accent text-muted-foreground"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5" />
                {t('nav.services')}
              </div>
              {isServicesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-6 mt-1 space-y-1 overflow-hidden"
                >
                  {serviceNavItems.map((serviceItem) => (
                     <SheetClose asChild key={serviceItem.href}>
                        <Link
                          href={serviceItem.href}
                          className={`flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent ${location === serviceItem.href ? 'bg-accent text-primary' : 'text-muted-foreground'}`}
                          onClick={() => handleLinkClick(serviceItem.href)}
                        >
                          {t(serviceItem.labelKey)}
                        </Link>
                      </SheetClose>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
        
        <div className="mt-auto p-6 border-t">
          <div className="text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Assist</p>
            <p>{t('footer.copyright', { defaultValue: 'All rights reserved.'})}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
