import React from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  SparklesIcon,
  ChatBubbleLeftEllipsisIcon,
  AcademicCapIcon,
  ComputerDesktopIcon,
  RocketLaunchIcon,
  CheckCircleIcon // For values list
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const advantages = [
    { titleKey: 'about.advantage1Title', textKey: 'about.advantage1Text', icon: SparklesIcon }, // Youthful energy and innovative vision
    { titleKey: 'about.advantage2Title', textKey: 'about.advantage2Text', icon: ChatBubbleLeftEllipsisIcon }, // Client orientation
    { titleKey: 'about.advantage3Title', textKey: 'about.advantage3Text', icon: AcademicCapIcon }, // Qualified team
    { titleKey: 'about.advantage4Title', textKey: 'about.advantage4Text', icon: ComputerDesktopIcon }, // Modern tech
    { titleKey: 'about.advantage5Title', textKey: 'about.advantage5Text', icon: RocketLaunchIcon }, // Startup support
  ];

  const values = [
    t('about.value1'),
    t('about.value2'),
    t('about.value3'),
    t('about.value4'),
    t('about.value5'),
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col"> {/* Changed page background to white */}
      <Navigation />
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header Section */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12 lg:mb-16 py-8 bg-brand-blue-50 rounded-xl" // Light blue background for header
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue-700">
              {t('about.h1')}
            </h1>
          </motion.header>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay:0.2 }}
            // Removed background from article as page bg is white, added shadow for depth on content blocks if needed
            className="max-w-4xl mx-auto p-4 sm:p-6"
          >
            <p className="text-lg text-slate-700 mb-8 sm:mb-10 leading-relaxed whitespace-pre-line">
              {t('about.welcome')}
            </p>

            <section className="mb-10 sm:mb-12 lg:mb-16 p-6 bg-slate-50 rounded-lg shadow-md">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-4 sm:mb-6 flex items-center">
                <LightBulbIcon className="w-7 h-7 lg:w-8 lg:h-8 mr-3 text-brand-gold-500" />
                {t('about.missionTitle')}
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {t('about.missionText')}
              </p>
            </section>

            <section className="mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6 sm:mb-8 text-center lg:text-left">
                {t('about.whyAssistTitle')}
              </h2>
              <div className="space-y-8">
                {advantages.map((adv, index) => {
                  const Icon = adv.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 sm:p-6 bg-brand-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start">
                        <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-brand-gold-500 mr-4 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-brand-blue-700 mb-1">{t(adv.titleKey)}</h3>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-line">{t(adv.textKey)}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mb-10 sm:mb-12 lg:mb-16 p-6 bg-slate-50 rounded-lg shadow-md">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-4 sm:mb-6 flex items-center">
                 <UserGroupIcon className="w-7 h-7 lg:w-8 lg:h-8 mr-3 text-brand-gold-500" />
                {t('about.ourTeamTitle')}
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {t('about.ourTeamText')}
              </p>
              {/* Placeholder for team image if available */}
              {/* <div className="mt-6 text-center"> <img src="/path-to-team-image.jpg" alt={t('about.ourTeamTitle')} className="rounded-lg shadow-md inline-block"/> </div> */}
            </section>

            <section className="mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6 sm:mb-8 text-center lg:text-left">
                {t('about.valuesTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6"> {/* Increased gap */}
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }} // Slightly faster delay for list items
                    className="flex items-start p-4 bg-slate-50 rounded-lg shadow-sm" // Lighter shadow for list items
                  >
                    <CheckCircleIcon className="w-6 h-6 text-brand-gold-500 mr-3 mt-0.5 flex-shrink-0" /> {/* Updated icon and color */}
                    <p className="text-slate-700 whitespace-pre-line">{value}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <motion.div // Changed from p to div for block styling
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y:0 }} // Animate while in view
              viewport={{ once: true }}
              transition={{ duration: 0.5}}
              className="mt-10 sm:mt-12 text-center text-xl font-semibold text-brand-blue-700 p-6 lg:p-8 bg-brand-blue-50 rounded-lg shadow-lg" // Enhanced closing call style
            >
              {t('about.closingCall')}
            </motion.div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
