import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftEllipsisIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  SquaresPlusIcon
} from '@heroicons/react/24/outline';

const WhyUsSection: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { text: t('whyUs.item1'), icon: ChatBubbleLeftEllipsisIcon },
    { text: t('whyUs.item2'), icon: ShieldCheckIcon },
    { text: t('whyUs.item3'), icon: ComputerDesktopIcon },
    { text: t('whyUs.item4'), icon: SquaresPlusIcon },
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white"> {/* Changed background to white for contrast with previous/next sections */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-blue-700 mb-4"> {/* Consistent title styling */}
            {t('whyUs.title')}
          </h2>
           {/* Optional: Add a brief subtitle here if desired */}
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 lg:p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start space-x-4" // Added flex for icon and text alignment
              >
                <div className="flex-shrink-0">
                  <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-brand-gold-500" /> {/* Icon color changed to gold */}
                </div>
                <div>
                  <p className="text-slate-700 text-base lg:text-lg">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }} // Adjusted delay
          className="text-center mt-12 lg:mt-16"
        >
          <a
            href="/about"
            className="inline-block bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold py-3 px-10 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" // Consistent button style
          >
            {t('whyUs.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
