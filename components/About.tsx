'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code2, Rocket, Zap } from 'lucide-react';
// import Image from 'next/image'; // Uncomment when you add your profile image

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { icon: Code2, value: '5+', label: t('experience') },
    { icon: Rocket, value: '50+', label: t('projects') },
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">{t('title')}</span>
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
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-4 ring-cyan-500/20 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-primary-500/20 to-accent-500/20 z-10 group-hover:opacity-0 transition-opacity" />
                  <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/30 via-primary-500/30 to-accent-500/30 flex items-center justify-center">
                    {/* Placeholder Avatar - Replace with your image */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cyan-400 via-primary-500 to-accent-500 flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
                      {t('name').charAt(0).toUpperCase()}
                    </div>
                    {/* Uncomment below and add your image to /public/profile.jpg */}
                    {/* <Image
                      src="/profile.jpg"
                      alt="Profile"
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-cyan-500 to-accent-500 rounded-full blur-2xl opacity-50" />
              </motion.div>

              {/* Personal Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                  {t('name')}
                </h3>
                <p className="text-xl text-cyan-400 mb-4 font-medium">
                  {t('role')}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('bio')}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {t.raw('tags').map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-accent-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300 font-medium"
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 via-cyan-500 to-accent-500 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <stat.icon size={32} className="text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
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

