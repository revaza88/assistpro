import { Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TeamSection() {
  const { t } = useTranslation();

  const teamMembers = t('team.members', { returnObjects: true }) as Array<{
    name: string;
    position: string;
    experience: string;
  }>;

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('team.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              
              <p className="text-blue-600 font-semibold mb-2">
                {member.position}
              </p>
              
              <p className="text-gray-600">
                {member.experience}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/career"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {t('team.joinTeam')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
