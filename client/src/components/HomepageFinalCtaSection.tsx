import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Using Heroicons

const HomepageFinalCtaSection: React.FC = () => {
  const { t } = useTranslation();

  // Fallback for phone and email if not in i18n to prevent 'tel:undefined'
  const phoneValue = t('finalCta.phoneValue') || '#';
  const emailValue = t('finalCta.emailValue') || '#';

  return (
    <section id="final-cta" className="py-16 lg:py-24 bg-brand-blue-700 text-white"> {/* Dark blue background */}
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" // Slightly larger title
        >
          {t('finalCta.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl mx-auto" // Wider text, lighter color
        >
          {t('finalCta.text')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12" // Increased gap and bottom margin
        >
          <a
            href="/contact"
            className="inline-block bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold py-3 px-10 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" // Gold button
          >
            {t('finalCta.cta1')}
          </a>
           <a
            href="/contact" // Assuming cta2 also leads to contact, or could be a different link e.g. /quote
            className="inline-block border-2 border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-500 hover:text-brand-blue-700 font-semibold py-3 px-10 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" // Gold outline button
          >
            {t('finalCta.cta2')}
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4 text-slate-300" // Lighter text for contact info
        >
          {phoneValue && phoneValue !== '#' && (
            <a href={`tel:${phoneValue}`} className="inline-flex items-center hover:text-brand-gold-400 transition-colors">
              <PhoneIcon className="w-5 h-5 mr-2" /> {t('finalCta.phoneLabel')} {phoneValue}
            </a>
          )}
          {emailValue && emailValue !== '#' && (
            <a href={`mailto:${emailValue}`} className="inline-flex items-center hover:text-brand-gold-400 transition-colors">
              <EnvelopeIcon className="w-5 h-5 mr-2" /> {t('finalCta.emailLabel')} {emailValue}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HomepageFinalCtaSection;
