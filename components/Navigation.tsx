'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  // { code: 'bg', name: 'Български' }, // Auskommentiert
];

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (langOpen && !target.closest('.language-selector')) {
        setLangOpen(false);
      }
    };
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langOpen]);

  const navItems = [
    { href: '#home', label: t('home') },
    { href: '#projects', label: t('projects') },
    { href: '#skills', label: t('skills') },
    // { href: '#contact', label: t('contact') },
  ];

  const getLocalizedPath = (lang: string) => {
    // Simple path generation - just return the locale path
    return `/${lang}`;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
      style={{ position: 'fixed' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-forest-200"
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-forest-300 transition-colors font-medium"
              >
                {item.label}
              </motion.a>
            ))}
            
            {/* Language Selector */}
            <div className="relative language-selector">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-forest-300 transition-colors"
              >
                <Globe size={20} />
                <span className="uppercase">{locale}</span>
              </motion.button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 glass rounded-lg overflow-hidden min-w-[120px] z-[60]"
                  >
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={getLocalizedPath(lang.code)}
                        className={`block px-4 py-2 hover:bg-white/10 transition-colors ${
                          locale === lang.code ? 'text-forest-300' : 'text-gray-300'
                        }`}
                        onClick={() => setLangOpen(false)}
                      >
                        {lang.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-forest-300 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 10 }}
                  className="block text-gray-300 hover:text-forest-300 transition-colors font-medium"
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={getLocalizedPath(lang.code)}
                      className={`px-3 py-1 rounded glass text-sm ${
                        locale === lang.code
                          ? 'text-forest-300'
                          : 'text-gray-300'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {lang.code.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

