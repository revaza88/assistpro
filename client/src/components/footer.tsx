import { scrollToSection } from "@/lib/utils"; // Ensure this utility is adapted for wouter if needed
import { Linkedin, Twitter, Facebook } from "lucide-react"; // Social icons can remain lucide or be replaced
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline"; // Contact Icons
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter"; // For internal navigation

export default function Footer() {
  const { t } = useTranslation();

  // Example: Fetching more service titles for the footer, adjust as needed
  const servicesLinks = [
    { name: t('servicesOverview.accounting.title'), href: '/services/accounting' },
    { name: t('servicesOverview.tax.title'), href: '/services/tax' },
    { name: t('servicesOverview.legal.title'), href: '/services/legal' },
    { name: t('servicesOverview.businessAssist.title'), href: '/services/business' },
    { name: t('servicesOverview.audit.title'), href: '/services/audit' },
    { name: t('servicesOverview.hr.title'), href: '/services/hr' },
  ];

  const quickLinks = [
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.services'), href: "/services/accounting" }, // Or a general /services page
    { name: t('nav.team'), href: "/team" },
    { name: t('nav.career'), href: "/career" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-blue-700 text-slate-300 overflow-hidden"> {/* Main footer background */}
      {/* Optional decorative elements, can be adjusted or removed
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue-600/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold-500/10 rounded-full blur-2xl opacity-50"></div>
      */}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <Link to="/" className="inline-block mb-5">
                <h3 className="text-3xl font-bold text-white"> {/* Simple white logo text */}
                  {t('nav.logo')}
                </h3>
              </Link>
              <p className="text-slate-300 mb-6 text-base leading-relaxed"> {/* Adjusted text color and size */}
                {t('footer.description')}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 hover:text-brand-gold-400 transition-colors">
                  <MapPinIcon className="w-5 h-5 text-brand-gold-500 flex-shrink-0" />
                  <span>{t('contact.addressValue')}</span>
                </div>
                <a href={`tel:${t('contact.phoneValue') || ''}`} className="flex items-center gap-3 hover:text-brand-gold-400 transition-colors">
                  <PhoneIcon className="w-5 h-5 text-brand-gold-500 flex-shrink-0" />
                  <span>{t('contact.phoneValue')}</span>
                </a>
                <a href={`mailto:${t('contact.emailValue') || ''}`} className="flex items-center gap-3 hover:text-brand-gold-400 transition-colors">
                  <EnvelopeIcon className="w-5 h-5 text-brand-gold-500 flex-shrink-0" />
                  <span>{t('contact.emailValue')}</span>
                </a>
              </div>
              
              <div className="flex gap-4 mt-8">
                {/* Replace # with actual social media links */}
                <a href="#" aria-label="Facebook" className="w-10 h-10 bg-brand-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:bg-brand-gold-500 hover:text-brand-blue-700 transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 bg-brand-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:bg-brand-gold-500 hover:text-brand-blue-700 transition-all duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-brand-blue-600 rounded-lg flex items-center justify-center text-slate-300 hover:bg-brand-gold-500 hover:text-brand-blue-700 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-300 hover:text-brand-gold-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-5">{t('footer.services')}</h4>
            <ul className="space-y-2.5">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                   <Link
                    to={service.href}
                    className="text-slate-300 hover:text-brand-gold-400 transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 lg:mt-16 pt-8 border-t border-brand-blue-600 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-400 text-sm text-center md:text-left">
            {t('footer.copyright').replace('2025', currentYear.toString())}
          </p>
          
          <div className="flex gap-x-6 gap-y-2 text-sm flex-wrap justify-center">
            {/* Replace # with actual links */}
            <Link to="/privacy-policy" className="text-slate-400 hover:text-brand-gold-400 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms-of-service" className="text-slate-400 hover:text-brand-gold-400 transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/cookie-policy" className="text-slate-400 hover:text-brand-gold-400 transition-colors">
              {t('footer.cookiePolicy')}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
