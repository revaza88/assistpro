import React from "react";
import { Briefcase, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function CareerSection() {
  const { t } = useTranslation();

  const benefits = t('career.benefits', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const benefitIcons = [TrendingUp, Users, Briefcase];

  const positions = t('career.positions', { returnObjects: true }) as Array<{
    title: string;
    department: string;
    type: string;
    location: string;
  }>;

  return (
    <section id="career" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('career.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('career.subtitle')}
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(benefitIcons[index], { className: "w-8 h-8 text-white" })}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('career.activeVacancies')}
          </h3>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {position.title}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>📍 {position.location}</span>
                    <span>🏢 {position.department}</span>
                    <span>⏰ {position.type}</span>
                  </div>
                </div>
                
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  {t('career.apply')}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/career"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {t('team.viewPositions')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
