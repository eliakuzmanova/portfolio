'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-2">
            © {new Date().getFullYear()} Portfolio. {t('rights')}
          </p>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            {t('built')}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-500" />
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

