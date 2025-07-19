import { CheckCircle, Calculator, Shield, FileCheck, ArrowRight, Users, Search, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ServicesSection() {
  const { t } = useTranslation();
  
  const services = [
    {
      title: t('services.accounting.title'),
      description: t('services.accounting.description'),
      icon: Calculator,
      color: "blue",
      link: "/services/accounting",
      features: t('services.accounting.features', { returnObjects: true }) as string[]
    },
    {
      title: t('services.tax.title'),
      description: t('services.tax.description'),
      icon: Shield,
      color: "green",
      link: "/services/tax",
      features: t('services.tax.features', { returnObjects: true }) as string[]
    },
    {
      title: t('services.legal.title'),
      description: t('services.legal.description'),
      icon: FileCheck,
      color: "purple",
      link: "/services/legal",
      features: t('services.legal.features', { returnObjects: true }) as string[]
    },
    {
      title: t('services.business.title'),
      description: t('services.business.description'),
      icon: TrendingUp,
      color: "orange",
      link: "/services/business",
      features: t('services.business.features', { returnObjects: true }) as string[]
    },
    {
      title: t('services.audit.title'),
      description: t('services.audit.description'),
      icon: Search,
      color: "red",
      link: "/services/audit",
      features: t('services.audit.features', { returnObjects: true }) as string[]
    },
    {
      title: t('services.hr.title'),
      description: t('services.hr.description'),
      icon: Users,
      color: "indigo",
      link: "/services/hr",
      features: t('services.hr.features', { returnObjects: true }) as string[]
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={service.link}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  {t('common.learnMore') || 'Learn More'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
