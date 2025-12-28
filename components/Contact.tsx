'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZäöüÄÖÜß\s-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const t = useTranslations('contact');
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // Fetch CSRF token on mount
  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((err) => console.error('Failed to fetch CSRF token:', err));
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!csrfToken) {
      setErrorMessage('CSRF token missing. Please refresh the page.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          csrfToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset();

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: t('email'),
      value: 'eliakuzmanova@gmail.com',
      href: 'mailto:eliakuzmanova@gmail.com',
    },
    {
      icon: Linkedin,
      label: t('linkedin'),
      value: 'linkedin.com/in/elia-kuzmanova-4b4730203',
      href: 'https://linkedin.com/in/elia-kuzmanova-4b4730203',
    },
    {
      icon: Github,
      label: t('github'),
      value: 'github.com/EliaKuzmanova7',
      href: 'https://github.com/EliaKuzmanova7',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
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
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center group hover:glass-strong transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <method.icon size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{method.label}</h3>
                <p className="text-gray-400 text-sm">{method.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`w-full px-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-white/10 focus:border-forest-500'
                    }`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-white/10 focus:border-forest-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  {...register('subject')}
                  className={`w-full px-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                    errors.subject
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/10 focus:border-forest-500'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={6}
                  {...register('message')}
                  className={`w-full px-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/10 focus:border-forest-500'
                  }`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus === 'error' && errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                >
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
                >
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`w-full md:w-auto px-8 py-4 bg-forest-500 rounded-full font-semibold text-white hover:bg-forest-400 transition-all flex items-center gap-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t('getInTouch')}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

