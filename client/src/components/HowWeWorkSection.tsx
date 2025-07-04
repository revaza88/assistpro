import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
// Lucide CheckCircle is not used, can be removed if no other icons from lucide are planned here.
// Consider using Heroicons if consistency is desired, e.g., ArrowDownCircleIcon for steps, or just numbers.

const HowWeWorkSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      id: 1,
      text: t('howWeWork.step1'),
      // Optional: Add specific icons for each step if desired
      // icon: SomeIconForStep1
    },
    {
      id: 2,
      text: t('howWeWork.step2'),
      // icon: SomeIconForStep2
    },
    {
      id: 3,
      text: t('howWeWork.step3'),
      // icon: SomeIconForStep3
    },
  ];

  return (
    <section id="how-we-work" className="py-16 lg:py-24 bg-brand-blue-50"> {/* Consistent section background */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-blue-700 mb-4"> {/* Consistent title styling */}
            {t('howWeWork.title')}
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-8 lg:space-y-10"> {/* Increased max-width and spacing */}
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }} // Slightly more initial offset
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }} // Adjusted delay
              className="flex items-start p-6 lg:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" // Enhanced card style
            >
              <div className="flex-shrink-0 mr-5 lg:mr-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-gold-500 text-brand-blue-700 rounded-full flex items-center justify-center text-xl lg:text-2xl font-bold"> {/* Styled step number */}
                  {step.id}
                </div>
              </div>
              <div>
                <p className="text-slate-700 text-base lg:text-lg leading-relaxed">{step.text}</p> {/* Consistent text styling */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
