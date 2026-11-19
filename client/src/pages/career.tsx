import PageHeader from '@/components/PageHeader';
import { interfaceCopy } from '@/lib/interface-copy';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { company } from '@/lib/company';
import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

const CareerPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const ui = interfaceCopy(i18n.language);

  const benefitsRaw = [
    { text: t('career.benefitDevelopment'), icon: AcademicCapIcon },
    { text: t('career.benefitCompensation'), icon: CurrencyDollarIcon },
    { text: t('career.benefitEnvironment'), icon: UserGroupIcon },
    { text: t('career.benefitContribution'), icon: PuzzlePieceIcon },
  ];

  const benefits = benefitsRaw.map(benefitItem => {
    const parts = benefitItem.text.split(':');
    return {
      title: parts[0],
      description: parts.slice(1).join(':').trim(),
      icon: benefitItem.icon
    };
  }).filter(b => b.title && b.description);

  const placeholderVacancies = [
    {
      title: t('career.vacancy1Title', { defaultValue: 'Senior Accountant' }),
      department: t('career.vacancy1Department', { defaultValue: 'Finance' }),
      location: t('career.vacancy1Location', { defaultValue: 'Tbilisi, Georgia' }),
      description: t('career.vacancy1Description', { defaultValue: 'We are looking for an experienced Senior Accountant...' }),
      ctaText: t('career.vacancy1cta', { defaultValue: 'Learn More & Apply' }),
      link: '#',
    },
  ];
  const hasVacancies = false; // Toggle this to show/hide vacancy list

  return (
    <div className="editorial-page career-page min-h-screen flex flex-col"> {/* Page background to white */}
      <Navigation />
      <main id="main-content" tabIndex={-1} className="editorial-main flex-grow">
        {/* Page Header Section */}
        <PageHeader eyebrow="ASSIST" title={ui.careerTitle} description={ui.careerIntro} />

        <div className="container mx-auto px-4">
          <motion.article
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="editorial-content"
          >
            <section className="mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6 sm:mb-8 text-center">
                {t('career.whyAssistTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6 bg-brand-blue-50 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-brand-gold-500 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-semibold text-brand-blue-700 mb-1">{benefit.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mb-10 sm:mb-12 lg:mb-16">
              <h2 id="open-positions" tabIndex={-1} className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6 sm:mb-8 text-center">
                {t('career.openPositionsTitle')}
              </h2>
              {hasVacancies ? (
                <div className="space-y-8">
                  {placeholderVacancies.map((vacancy, index) => (
                    <motion.div
                      key={index}
                      initial={false}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white border border-slate-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-1">{vacancy.title}</h3>
                      <p className="text-sm text-slate-500 mb-3">
                        {vacancy.department} - {vacancy.location}
                      </p>
                      <p className="text-slate-600 mb-4 whitespace-pre-line">{vacancy.description}</p>
                      <Button asChild className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold">
                        <Link href={vacancy.link}>{vacancy.ctaText}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={false}
                  whileInView={{ opacity: 1, y:0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5}}
                  className="text-center p-8 bg-brand-blue-50 rounded-lg shadow"
                >
                  <p className="text-slate-700 text-lg mb-4 whitespace-pre-line">
                    {t('career.noVacancyNote')}
                  </p>
                  <Button variant="link" asChild className="text-brand-gold-500 hover:text-brand-gold-600 text-lg p-0 h-auto font-semibold">
                    <a href={'mailto:' + company.email}>
                      {t('career.ctaSendCv')} <PlusCircleIcon className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </section>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 text-center p-8 bg-brand-blue-600 text-white rounded-lg shadow-xl"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('career.finalCtaTitle')}</h2>
              <p className="mb-8 text-slate-100 whitespace-pre-line text-lg">{t('career.finalCtaText')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold w-full sm:w-auto text-base">
                  <a href="#open-positions">{t('career.openPositionsTitle')}</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-500 hover:text-brand-blue-700 font-semibold w-full sm:w-auto text-base">
                  <a href={'mailto:' + company.email}>{t('nav.contact')}</a>
                </Button>
              </div>
            </motion.div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerPage;
