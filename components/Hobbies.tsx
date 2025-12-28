'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Music, 
  Camera, 
  Gamepad2, 
  Dumbbell, 
  BookOpen, 
  Coffee,
  Plane,
  Palette,
  Code
} from 'lucide-react';

export default function Hobbies() {
  const t = useTranslations('hobbies');

  const hobbies = t.raw('items') as Array<{
    icon: string;
    name: string;
    description: string;
  }>;

  const iconMap: Record<string, any> = {
    Music,
    Camera,
    Gamepad2,
    Dumbbell,
    BookOpen,
    Coffee,
    Plane,
    Palette,
    Code,
  };

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
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => {
            const IconComponent = iconMap[hobby.icon] || Code;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 via-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-cyan-500/30">
                      <IconComponent size={28} className="text-cyan-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {hobby.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {hobby.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="h-1 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="h-full bg-gradient-to-r from-cyan-500 via-primary-500 to-accent-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

