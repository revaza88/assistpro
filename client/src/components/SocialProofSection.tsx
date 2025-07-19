import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react'; // Star icon for ratings

const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t('socialProof.testimonial1Name'),
      text: t('socialProof.testimonial1Text'),
      // Optional: rating: 5 (or some other data point)
    },
    {
      name: t('socialProof.testimonial2Name'),
      text: t('socialProof.testimonial2Text'),
      // Optional: rating: 5
    },
  ];

  return (
    <section id="social-proof" className="py-16 lg:py-24 bg-brand-blue-50"> {/* Section background */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-blue-700 mb-4"> {/* Consistent title styling */}
            {t('socialProof.title')}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // Applying glassmorphism style. Ensure 'glass-card' or similar is defined in your CSS (e.g., index.css)
              // Or define Tailwind equivalent: bg-white/30 backdrop-blur-md border border-white/20
              className="p-6 lg:p-8 rounded-xl shadow-xl bg-white/50 backdrop-blur-lg border border-white/30"
            >
              <div className="flex mb-4"> {/* Increased spacing for stars */}
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 lg:w-6 lg:h-6 text-brand-gold-500 fill-brand-gold-500" /> // Gold stars
                ))}
              </div>
              <p className="text-slate-700 italic mb-5 text-base lg:text-lg leading-relaxed">"{testimonial.text}"</p> {/* Consistent text styling */}
              <p className="text-brand-blue-600 font-semibold text-right text-sm lg:text-base">- {testimonial.name}</p> {/* Name styling */}
            </motion.div>
          ))}
        </div>

        {/* "Trusted By" Logos section is commented out as no actual logos are available yet.
            It can be re-enabled and styled when logos are provided.
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }} // Adjusted delay
          className="mt-16 lg:mt-20 text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-semibold text-brand-blue-600 mb-8">
            {t('socialProof.trustedByTitle')}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 lg:gap-x-16">
            {/* Example of how logos could be displayed:
            <img src="/path/to/client-logo1.svg" alt="Client Logo 1" className="h-10 lg:h-12 opacity-75 hover:opacity-100 transition-opacity"/>
            <img src="/path/to/client-logo2.svg" alt="Client Logo 2" className="h-10 lg:h-12 opacity-75 hover:opacity-100 transition-opacity"/>
            <img src="/path/to/client-logo3.svg" alt="Client Logo 3" className="h-10 lg:h-12 opacity-75 hover:opacity-100 transition-opacity"/>
            <img src="/path/to/client-logo4.svg" alt="Client Logo 4" className="h-10 lg:h-12 opacity-75 hover:opacity-100 transition-opacity"/>
            * /}
            <span className="text-4xl font-light text-slate-500">ClientLogo1</span>
            <span className="text-4xl font-light text-slate-500">ClientLogo2</span>
            <span className="text-4xl font-light text-slate-500">ClientLogo3</span>
            <span className="text-4xl font-light text-slate-500">ClientLogo4</span>
          </div>
        </motion.div>
        */}
      </div>
    </section>
  );
};

export default SocialProofSection;
