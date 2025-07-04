import { useTranslation } from "react-i18next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  CheckCircleIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon, // Replaced FileText with a more relevant icon
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  CheckBadgeIcon, // Replaced Award, updated from BadgeCheckIcon
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Helper to add icons to section titles
const SectionTitle: React.FC<{ title: string; icon?: React.ElementType }> = ({ title, icon: IconComponent }) => (
  <div className="flex items-center mb-6 lg:mb-8">
    {IconComponent && <IconComponent className="w-7 h-7 lg:w-8 lg:h-8 text-brand-gold-500 mr-3 flex-shrink-0" />}
    <h2 className="text-2xl sm:text-3xl font-semibold text-brand-blue-600">{title}</h2>
  </div>
);

export default function BusinessAssistServicePage() {
  const { t } = useTranslation();

  const benefits = [
    t('services.business.benefitTimeSaving'),
    t('services.business.benefitCorrectChoice'),
    t('services.business.benefitSimplification'),
    t('services.business.benefitComprehensiveSupport'),
    t('services.business.benefitConsultation'),
  ].filter(Boolean);

  const statusList = (t('services.business.statusList', { returnObjects: true }) as string[] || []).filter(Boolean);

  return (
    <div className="min-h-screen bg-white flex flex-col"> {/* Page background to white */}
      <Navigation />

      <main className="flex-grow">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 lg:py-24 bg-brand-blue-600 text-white" // Consistent hero background
        >
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center text-slate-200 hover:text-white transition-colors text-sm">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                {t('nav.logo', {defaultValue: 'Home'})}
              </Link>
            </div>
            <BuildingOffice2Icon className="w-16 h-16 sm:w-20 sm:h-20 text-brand-gold-400 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t('services.business.h1')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {t('services.business.intro')}
            </p>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto p-4 sm:p-6"
          >
            {benefits.length > 0 && (
              <section className="mb-10 sm:mb-12 lg:mb-16">
                <SectionTitle title={t('services.business.whyUseTitle')} icon={ArrowTrendingUpIcon} />
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-brand-blue-50 rounded-md shadow-sm"
                    >
                      <CheckCircleIcon className="w-6 h-6 text-brand-gold-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-700 whitespace-pre-line">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mb-10 sm:mb-12 lg:mb-16">
              <SectionTitle title={t('services.business.servicesIncludeTitle')} icon={BriefcaseIcon} />
              <motion.div
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="p-4 lg:p-6 bg-brand-blue-50 rounded-lg mb-6 shadow-sm"
              >
                <h3 className="font-semibold text-lg lg:text-xl text-brand-blue-700 flex items-center">
                    <BriefcaseIcon className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-brand-blue-600"/>
                    {t('services.business.registrationTitle')}
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay:0.1 }}
              >
                <h3 className="text-xl lg:text-2xl font-semibold text-brand-blue-700 my-4 lg:my-6 flex items-center">
                  <CheckBadgeIcon className="w-6 h-6 lg:w-7 lg:h-7 mr-2 text-brand-gold-500"/>
                  {t('services.business.statusAssistanceTitle')}
                </h3>
                {statusList.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {statusList.map((item, index) => (
                       <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="flex items-center text-slate-700 py-1.5"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-brand-blue-500 mr-2.5 flex-shrink-0" />
                        <span className="whitespace-pre-line">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </section>

            <section className="mb-10 sm:mb-12 lg:mb-16">
                 <SectionTitle title={t('services.business.howToStartTitle')} icon={DocumentTextIcon}/> {/* Replaced FileText with DocumentTextIcon */}
                <div className="space-y-3">
                    <p className="text-slate-600 pl-10 relative before:content-['✓'] before:absolute before:left-3 before:text-brand-blue-500 before:font-bold whitespace-pre-line">
                        {t('howWeWork.step1')}
                    </p>
                    <p className="text-slate-600 pl-10 mt-2 relative before:content-['✓'] before:absolute before:left-3 before:text-brand-blue-500 before:font-bold whitespace-pre-line">
                        {t('howWeWork.step2')}
                    </p>
                    <p className="text-slate-600 pl-10 mt-2 relative before:content-['✓'] before:absolute before:left-3 before:text-brand-blue-500 before:font-bold whitespace-pre-line">
                        {t('howWeWork.step3')}
                    </p>
                </div>
            </section>

            <motion.section
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y:0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mt-12 py-10 px-6 bg-brand-blue-600 text-white rounded-xl shadow-xl"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {t('services.business.finalCtaTitle')}
              </h2>
              <p className="text-slate-200 mb-8 whitespace-pre-line max-w-xl mx-auto text-lg">
                {t('services.business.finalCtaText')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold shadow hover:shadow-lg text-base">
                  <Link href="/contact">
                    {t('services.business.ctaRequestConsultation')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-500 hover:text-brand-blue-700 font-semibold shadow hover:shadow-lg text-base">
                   <Link href="#statuses-info-section">
                    {t('services.business.ctaLearnMoreStatuses')}
                  </Link>
                </Button>
              </div>
            </motion.section>
            <div id="statuses-info-section" className="mt-10"></div> {/* This id is for the "Learn More" button scroll target */}
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
