import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline'; // Using Heroicon

const BlogTeaserSection: React.FC = () => {
  const { t } = useTranslation();

  const articles = [
    {
      title: t('blogTeaser.article1Title'),
      link: '/blog/article1', // Placeholder link
      // Optional: Add excerpt or image placeholder
      // excerpt: "A brief summary of the article...",
      // imageUrl: "/placeholder-image1.jpg",
    },
    {
      title: t('blogTeaser.article2Title'),
      link: '/blog/article2', // Placeholder link
      // excerpt: "Another brief summary...",
      // imageUrl: "/placeholder-image2.jpg",
    },
  ];

  return (
    <section id="blog-teaser" className="py-16 lg:py-24 bg-white"> {/* Changed background for contrast */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-blue-700 mb-4"> {/* Consistent title styling */}
            {t('blogTeaser.title')}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="block p-6 lg:p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1" // Added subtle lift on hover
            >
              {/* Optional: Image placeholder
              {article.imageUrl && (
                <div className="mb-4 h-40 rounded-lg overflow-hidden">
                  <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover"/>
                </div>
              )}
              */}
              <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-3 group-hover:text-brand-blue-600 transition-colors duration-300">
                {article.title}
              </h3>
              {/* Optional: Excerpt
              {article.excerpt && <p className="text-slate-600 mb-4 text-sm lg:text-base">{article.excerpt}</p>}
              */}
              <span className="inline-flex items-center text-brand-gold-500 font-semibold group-hover:text-brand-gold-600 transition-colors duration-300">
                {t('common.learnMore') || 'Read More'} <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </motion.a>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 lg:mt-16"
        >
          <a
            href="/blog"
            className="inline-block bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold py-3 px-10 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105" // Consistent button style
          >
            {t('blogTeaser.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogTeaserSection;
