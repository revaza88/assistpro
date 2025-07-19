import { ArrowRight, Calendar } from "lucide-react"; // Removed Phone
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// Assuming Button component might be used from ui, or use standard buttons
// import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    // In a real app, this might use react-router-dom Link or navigate
    // For now, assuming a contact page exists at /contact
    window.location.href = '/contact';
  };

  const scrollToServices = () => {
    // This could scroll to a services overview section on the homepage if one is added,
    // or navigate to a dedicated services page.
    // For now, let's assume it scrolls to a section with id "services-overview"
    // For a smoother experience, this should ideally navigate to the services page if not on home.
    const servicesElement = document.getElementById("services-overview");
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: "smooth" });
    } else {
       window.location.href = '/services'; // Fallback to services page
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-t from-brand-blue-700 via-brand-blue-600 to-brand-blue-500 flex items-center pt-20 lg:pt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" // Changed text color
            >
              {t('hero.mainTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl text-slate-200 mb-8 max-w-3xl mx-auto" // Changed text color
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-gold-500 text-brand-blue-700 rounded-lg text-base font-semibold hover:bg-brand-gold-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" /> {/* Consider if Calendar icon is still the best fit */}
                {t('hero.mainCta')}
              </button>

              <button
                onClick={scrollToServices}
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg text-base font-semibold hover:bg-white hover:text-brand-blue-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {t('hero.secondaryCta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
