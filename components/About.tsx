'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code2, Rocket, Zap } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { icon: Code2, value: '4', label: t('experience') },
    { icon: Rocket, value: '15+', label: t('projects') },
    { icon: Zap, value: '30+', label: t('technologies') },
  ];

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-forest-200">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative flex-shrink-0"
              >
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-4 ring-forest-500/20 group">
                  <Image
                    src="/updesignstudio-team-eku.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Personal Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-forest-200 mb-4">
                  {t('name')}
                </h3>
                <p className="text-xl text-forest-300 mb-4 font-medium">
                  {t('role')}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('bio')}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {t.raw('tags').map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-forest-800 border border-forest-600 rounded-full text-sm text-forest-200 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass rounded-2xl p-8 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <stat.icon size={32} className="text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-forest-200 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

