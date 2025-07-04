import { CheckCircle, Target, Users, Trophy, TrendingUp, LucideProps, Award, Eye, Heart, Shield, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type IconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export default function AboutSection() {
  const { t } = useTranslation();

  const icons: { [key: string]: IconComponent } = {
    Trophy,
    Users,
    TrendingUp,
    Target,
    CheckCircle,
    Award,
    Eye,
    Heart,
    Shield,
    Star,
    Zap
  };

  const iconKeys = Object.keys(icons);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                {t('about.title')}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t('about.fullTitle').split(" ").slice(0, -1).join(" ")}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('about.fullTitle').split(" ").slice(-1)}</span>
              </h2>
            </div>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about.description1') }} />
            
            <p className="text-lg text-gray-600 mb-6">
              {t('about.description2')}
            </p>

            <p className="text-lg text-gray-600 mb-8">
              {t('about.description3')}
            </p>

            <div className="space-y-4">
              {(t('about.servicesList', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right Image/Graphic */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-3xl p-8 lg:p-12 shadow-lg">
              {/* Custom Illustration with Icons */}
              <div className="relative h-80 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
                  {/* Top Row */}
                  <motion.div 
                    className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Users className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <TrendingUp className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Middle Row - Center Logo */}
                  <div className="col-start-2 flex justify-center">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      <span className="text-white font-bold text-lg">A</span>
                    </motion.div>
                  </div>
                  
                  {/* Bottom Row */}
                  <motion.div 
                    className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Trophy className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                
                {/* Decorative Elements */}
                <motion.div 
                  className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-70"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-6 left-6 w-6 h-6 bg-pink-400 rounded-full opacity-60"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div 
                  className="absolute top-1/2 left-2 w-4 h-4 bg-green-400 rounded-full opacity-50"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {(t('about.stats', { returnObjects: true }) as { number: string; label: string }[]).map((stat: { number: string; label: string }, index: number) => {
            const Icon = icons[iconKeys[index % iconKeys.length]]; // Cycle through icons
            return (
              <motion.div 
                key={index} 
                className="bg-slate-50/70 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{t('about.valuesTitle')}</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ღირებულებები, რომლებიც ამოძრავებს ჩვენს ყოველდღიურ მუშაობას
            </p>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {(t('about.values', { returnObjects: true }) as { title: string; description: string }[]).map((value: { title: string; description: string }, index: number) => {
              const Icon = icons[iconKeys[index % iconKeys.length]];
              return (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('about.mission')}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('about.missionText')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-3xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('about.vision')}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {t('about.visionText')}
            </p>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 p-12 rounded-3xl mb-20"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('about.achievements')}</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('about.achievementsList', { returnObjects: true }) as string[]).map((achievement: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="w-3 h-3 text-white" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
