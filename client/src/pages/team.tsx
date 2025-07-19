import React from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  HeartIcon, // For Unity
  UserCircleIcon // Placeholder for member photo
} from '@heroicons/react/24/outline';

const TeamPage: React.FC = () => {
  const { t } = useTranslation();

  const teamValues = [
    { textKey: 'team.valueUnity', icon: HeartIcon },
    { textKey: 'team.valueGrowth', icon: ArrowTrendingUpIcon },
    { textKey: 'team.valueRespect', icon: ShieldCheckIcon }, // Respect/Support could also use HandThumbUpIcon or similar
    { textKey: 'team.valueInnovation', icon: LightBulbIcon },
  ];

  // Placeholder for actual team members.
  const teamMembersPlaceholder = [
    { nameKey: 'team.member1Name', positionKey: 'team.member1Position', bioKey: 'team.member1Bio', imageUrl: '' }, // Add actual image URLs if available
    { nameKey: 'team.member2Name', positionKey: 'team.member2Position', bioKey: 'team.member2Bio', imageUrl: '' },
    { nameKey: 'team.member3Name', positionKey: 'team.member3Position', bioKey: 'team.member3Bio', imageUrl: '' },
  ];


  return (
    <div className="min-h-screen bg-white flex flex-col"> {/* Page background to white */}
      <Navigation />
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        {/* Page Header Section */}
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12 lg:mb-16 py-8 bg-brand-blue-50 rounded-xl container mx-auto max-w-5xl px-4"
          >
            <UserGroupIcon className="w-16 h-16 text-brand-gold-500 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue-700 mb-3">
              {t('team.h1')}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {t('team.intro')}
            </p>
          </motion.header>

        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto p-4 sm:p-6"
          >
            <section className="mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6 sm:mb-8 text-center">
                {t('team.valuesTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {teamValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center p-4 lg:p-6 bg-brand-blue-50 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-brand-gold-500 mr-4 flex-shrink-0" />
                      <p className="text-slate-700 text-base lg:text-lg whitespace-pre-line">{t(value.textKey)}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6 sm:mb-8 text-center">
                {t('team.membersSectionTitle', { defaultValue: "Our Professionals"})}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembersPlaceholder.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white border border-slate-200 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                  >
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={t(member.nameKey)} className="w-32 h-32 rounded-full mx-auto mb-5 object-cover shadow-md"/>
                    ) : (
                      <UserCircleIcon className="w-32 h-32 text-slate-300 mx-auto mb-5" />
                    )}
                    <h3 className="text-xl font-semibold text-slate-800">
                      {t(member.nameKey, {defaultValue: `Team Member ${index + 1}`})}
                    </h3>
                    <p className="text-brand-gold-600 font-medium mb-2 text-sm">
                      {t(member.positionKey, {defaultValue: 'Position'})}
                    </p>
                    <p className="text-sm text-slate-600 whitespace-pre-line flex-grow">
                      {t(member.bioKey, {defaultValue: 'A short bio highlighting expertise and experience.'})}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 text-center p-8 bg-brand-blue-600 text-white rounded-lg shadow-xl"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('team.finalCtaTitle')}</h2>
              <p className="mb-8 text-slate-100 whitespace-pre-line text-lg">{t('team.finalCtaText')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/career">
                  <Button size="lg" className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold w-full sm:w-auto text-base">
                    {t('team.ctaCareer')}
                  </Button>
                </Link>
                <Link to="/career">
                  <Button size="lg" variant="outline" className="border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-500 hover:text-brand-blue-700 font-semibold w-full sm:w-auto text-base">
                    {t('team.ctaOpenPositions')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
