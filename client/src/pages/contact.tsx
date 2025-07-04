import React from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button'; // Assuming this Button is styled appropriately or will be
import { Input } from '@/components/ui/input';   // Assuming these are styled for the new theme
import { Textarea } from '@/components/ui/textarea';// Assuming these are styled for the new theme
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'; // Using Heroicons

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  const contactDetails = [
    {
      icon: MapPinIcon,
      labelKey: 'contact.addressLabel',
      valueKey: 'contact.addressValue',
    },
    {
      icon: PhoneIcon,
      labelKey: 'contact.phoneLabel',
      valueKey: 'contact.phoneValue',
      hrefBase: 'tel:',
    },
    {
      icon: EnvelopeIcon,
      labelKey: 'contact.emailLabel',
      valueKey: 'contact.emailValue',
      hrefBase: 'mailto:',
    },
    {
      icon: ClockIcon,
      labelKey: 'contact.workingHoursLabel',
      valueKey: 'contact.workingHoursValue',
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement actual form submission logic
    console.log('Form submitted');
    // Example: toast({ title: "Message Sent!", description: "We'll get back to you soon." });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col"> {/* Changed page background */}
      <Navigation />
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
         {/* Page Header Section */}
         <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12 lg:mb-16 py-8 bg-brand-blue-50 rounded-xl container mx-auto max-w-5xl px-4"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue-700 mb-3">
              {t('contact.h1')}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {t('contact.intro')}
            </p>
          </motion.header>

        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto p-4 sm:p-6" // Removed bg-white and shadow from here
          >
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Contact Info Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 bg-slate-50 rounded-lg shadow-md" // Added bg and shadow to info block
              >
                <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6">
                  {t('contact.infoTitle')}
                </h2>
                <div className="space-y-5">
                  {contactDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    const value = t(detail.valueKey);
                    return (
                      <div key={index} className="flex items-start">
                        <Icon className="w-6 h-6 text-brand-gold-500 mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-slate-800">{t(detail.labelKey)}</h3>
                          {detail.hrefBase ? (
                            <a
                              href={`${detail.hrefBase}${value}`}
                              className="text-slate-600 hover:text-brand-gold-600 transition-colors whitespace-pre-line"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-slate-600 whitespace-pre-line">{value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Social Media Links Placeholder */}
                 <div className="mt-8">
                    <h3 className="font-semibold text-slate-800 mb-3">{t('contact.socialMediaTitle')}</h3>
                    <div className="flex space-x-4">
                        {/* Example: <a href="#" className="text-slate-500 hover:text-brand-gold-500"><BrandFacebookIcon /></a> */}
                        <p className="text-sm text-slate-500">(Social media icons to be added)</p>
                    </div>
                 </div>
              </motion.div>

              {/* Contact Form Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 bg-slate-50 rounded-lg shadow-md" // Added bg and shadow to form block
              >
                <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600 mb-6">
                  {t('contact.formTitle')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="font-medium text-slate-700">{t('contact.fieldName')}</Label>
                    <Input type="text" name="name" id="name" required className="mt-1.5 focus:ring-brand-blue-500 border-slate-300" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-medium text-slate-700">{t('contact.fieldEmail')}</Label>
                    <Input type="email" name="email" id="email" required className="mt-1.5 focus:ring-brand-blue-500 border-slate-300" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="font-medium text-slate-700">{t('contact.fieldPhone')}</Label>
                    <Input type="tel" name="phone" id="phone" className="mt-1.5 focus:ring-brand-blue-500 border-slate-300" />
                  </div>
                  <div>
                    <Label htmlFor="company" className="font-medium text-slate-700">{t('contact.fieldCompany')}</Label>
                    <Input type="text" name="company" id="company" className="mt-1.5 focus:ring-brand-blue-500 border-slate-300" />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="font-medium text-slate-700">{t('contact.fieldSubject')}</Label>
                    <Input type="text" name="subject" id="subject" required className="mt-1.5 focus:ring-brand-blue-500 border-slate-300" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="font-medium text-slate-700">{t('contact.fieldMessage')}</Label>
                    <Textarea name="message" id="message" rows={5} required className="mt-1.5 focus:ring-brand-blue-500 border-slate-300" />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold text-lg"
                    >
                      {t('contact.ctaSend')} <PaperAirplaneIcon className="w-5 h-5 ml-2 transform rotate-45" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-12 text-center text-slate-600 whitespace-pre-line"
            >
              {t('contact.finalMessage')}
            </motion.p>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
