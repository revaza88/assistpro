import { useTranslation } from "react-i18next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  CheckCircleIcon,
  ArrowLeftIcon,
  BriefcaseIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CurrencyDollarIcon, // Example for benefits
  ClockIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CheckBadgeIcon,
  UserCircleIcon,
  ComputerDesktopIcon,
  LockClosedIcon,
  ChatBubbleLeftEllipsisIcon
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

export default function AccountingServicePage() {
  const { t } = useTranslation();

  // Define local icon aliases to avoid conflicts
  const LocalClockIcon = ClockIcon;
  const LocalAcademicCapIcon = AcademicCapIcon;
  const LocalLightBulbIcon = LightBulbIcon;
  const LocalUserCircleIcon = UserCircleIcon;
  const LocalComputerDesktopIcon = ComputerDesktopIcon;
  const LocalLockClosedIcon = LockClosedIcon;
  const LocalChatBubbleLeftEllipsisIcon = ChatBubbleLeftEllipsisIcon;

  const benefits = [
    { text: t('services.accounting.benefitFinancial'), icon: CurrencyDollarIcon },
    { text: t('services.accounting.benefitTime'), icon: LocalClockIcon }, // Using local reference
    { text: t('services.accounting.benefitRisk'), icon: ShieldCheckIcon },
    { text: t('services.accounting.benefitExpertise'), icon: LocalAcademicCapIcon }, // Using local reference
    { text: t('services.accounting.benefitFocus'), icon: LocalLightBulbIcon }, // Using local reference
  ].filter(item => item.text);


  const serviceList = (t('services.accounting.serviceList', { returnObjects: true }) as string[] || []).filter(Boolean);
  const packages = [
    t('services.accounting.package1'),
    t('services.accounting.package2'),
    t('services.accounting.package3'),
  ].filter(Boolean);

  // Define icons for whyUsReasons or use a generic one
  const whyUsReasons = [
    { text: t('services.accounting.reasonExperience'), icon: CheckBadgeIcon }, // Updated from BadgeCheckIcon
    { text: t('services.accounting.reasonIndividual'), icon: LocalUserCircleIcon }, // Using local reference
    { text: t('services.accounting.reasonTech'), icon: LocalComputerDesktopIcon }, // Using local reference
    { text: t('services.accounting.reasonConfidentiality'), icon: LocalLockClosedIcon }, // Using local reference
    { text: t('services.accounting.reasonCommunication'), icon: LocalChatBubbleLeftEllipsisIcon }, // Using local reference
  ].filter(item => item.text);


  return (
    <div className="min-h-screen bg-white flex flex-col"> {/* Page background to white */}
      <Navigation />
      
      <main className="flex-grow">
        {/* Service Page Hero */}
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
            <BriefcaseIcon className="w-16 h-16 sm:w-20 sm:h-20 text-brand-gold-400 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t('services.accounting.h1')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {t('services.accounting.intro')}
            </p>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} // Slight delay for content after hero
            className="max-w-4xl mx-auto p-4 sm:p-6" // Removed bg and shadow from article for cleaner look on white page
          >
            {benefits.length > 0 && (
              <section className="mb-10 sm:mb-12 lg:mb-16">
                <SectionTitle title={t('services.accounting.whyOutsourcingTitle')} icon={ArrowTrendingUpIcon} />
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const BenefitIcon = benefit.icon;
                    return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-brand-blue-50 rounded-md shadow-sm"
                    >
                      <BenefitIcon className="w-6 h-6 text-brand-gold-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-700 whitespace-pre-line">{benefit.text}</span>
                    </motion.li>
                  );
                })}
                </ul>
              </section>
            )}

            {serviceList.length > 0 && (
              <section className="mb-10 sm:mb-12 lg:mb-16">
                <SectionTitle title={t('services.accounting.servicesIncludeTitle')} icon={DocumentTextIcon} />
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {serviceList.map((item, index) => (
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
              </section>
            )}

            {packages.length > 0 && (
              <section className="mb-10 sm:mb-12 lg:mb-16">
                <SectionTitle title={t('services.accounting.packagesTitle')} icon={BriefcaseIcon} />
                <div className="space-y-4">
                  {packages.map((pkg, index) => (
                     <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="p-4 bg-brand-blue-50 border-l-4 border-brand-blue-500 rounded-r-md shadow-sm"
                    >
                      <p className="text-slate-700 font-medium whitespace-pre-line">{pkg}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {whyUsReasons.length > 0 && (
              <section className="mb-10 sm:mb-12 lg:mb-16">
                <SectionTitle title={t('services.accounting.whyUsTitle')} icon={ShieldCheckIcon} />
                <ul className="space-y-3">
                  {whyUsReasons.map((reason, index) => {
                    const ReasonIcon = reason.icon;
                    return (
                     <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <ReasonIcon className="w-6 h-6 text-brand-gold-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-700 whitespace-pre-line">{reason.text}</span>
                    </motion.li>
                  );
                  })}
                </ul>
              </section>
            )}

            <motion.section
              initial={{ opacity: 0, y:20 }}
              whileInView={{ opacity: 1, y:0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mt-12 py-10 px-6 bg-brand-blue-600 text-white rounded-xl shadow-xl" // Consistent CTA block
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {t('services.accounting.finalCtaTitle')}
              </h2>
              <p className="text-slate-200 mb-8 whitespace-pre-line max-w-xl mx-auto text-lg">
                {t('services.accounting.finalCtaText')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-blue-700 font-semibold shadow hover:shadow-lg text-base">
                  <Link href="/contact">
                    {t('services.accounting.ctaConsultation')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-500 hover:text-brand-blue-700 font-semibold shadow hover:shadow-lg text-base">
                   <Link href="/contact">
                    {t('services.accounting.ctaContact')}
                  </Link>
                </Button>
              </div>
            </motion.section>
          </motion.article>
        </div>
      </main>

      <Footer /> 
    </div>
  );
}