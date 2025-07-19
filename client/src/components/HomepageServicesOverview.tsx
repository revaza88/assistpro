import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  DocumentChartBarIcon,
  ShieldCheckIcon,
  ScaleIcon,
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  UsersIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const HomepageServicesOverview: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      key: 'accounting',
      title: t('servicesOverview.accounting.title'),
      description: t('servicesOverview.accounting.description'),
      cta: t('servicesOverview.accounting.cta'),
      link: '/services/accounting',
      icon: DocumentChartBarIcon,
    },
    {
      key: 'tax',
      title: t('servicesOverview.tax.title'),
      description: t('servicesOverview.tax.description'),
      cta: t('servicesOverview.tax.cta'),
      link: '/services/tax',
      icon: ShieldCheckIcon, // Using ShieldCheckIcon as a placeholder for "percent with shield"
    },
    {
      key: 'legal',
      title: t('servicesOverview.legal.title'),
      description: t('servicesOverview.legal.description'),
      cta: t('servicesOverview.legal.cta'),
      link: '/services/legal',
      icon: ScaleIcon,
    },
    {
      key: 'businessAssist',
      title: t('servicesOverview.businessAssist.title'),
      description: t('servicesOverview.businessAssist.description'),
      cta: t('servicesOverview.businessAssist.cta'),
      link: '/services/business',
      icon: BuildingOffice2Icon,
    },
    {
      key: 'audit',
      title: t('servicesOverview.audit.title'),
      description: t('servicesOverview.audit.description'),
      cta: t('servicesOverview.audit.cta'),
      link: '/services/audit',
      icon: MagnifyingGlassIcon,
    },
    {
      key: 'hr',
      title: t('servicesOverview.hr.title'),
      description: t('servicesOverview.hr.description'), // Ensure this key exists in i18n
      cta: t('servicesOverview.hr.cta'), // Ensure this key exists in i18n
      link: '/services/hr',
      icon: UsersIcon,
    },
  ];

  return (
    <section id="services-overview" className="py-16 lg:py-24 bg-brand-blue-50"> {/* Changed background */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-blue-700 mb-4"> {/* Changed text color */}
            {t('servicesOverview.title')}
          </h2>
          {/* Optional: Add a subtitle here if desired */}
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 lg:p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl flex flex-col transition-shadow duration-300" // Enhanced card style
              >
                <div className="mb-5">
                  <Icon className="w-12 h-12 text-brand-blue-600" /> {/* Updated icon color and size */}
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-3">{service.title}</h3> {/* Updated text color */}
                <p className="text-slate-600 mb-6 flex-grow text-sm lg:text-base">{service.description}</p> {/* Updated text color */}
                <a
                  href={service.link}
                  className="inline-flex items-center text-brand-gold-500 font-semibold hover:text-brand-gold-600 transition-colors group"
                >
                  {service.cta} <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" /> {/* Updated icon and added hover effect */}
                </a>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }} // Adjusted delay based on number of cards
          className="text-center mt-12 lg:mt-16"
        >
           <a
            href="/services"
            className="inline-block bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold py-3 px-10 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
           >
            {t('servicesOverview.ctaAll')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageServicesOverview;
