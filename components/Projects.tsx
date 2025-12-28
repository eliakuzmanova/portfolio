'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
  const t = useTranslations('projects');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    'project7', // Multi-Tenant Sanitätshaus Plattform
    'project1', // BASF Virtual Car
    'project2', // BASF Virtual Car - Offline
    'project3', // UP Design Studio
    'project4', // SMINA
    'project5', // Khimi
    'project6', // Dürr
    'project9', // NGINX Gateway
    'project10', // Meyra Power Wheelchairs
    'project11', // MacDermid Alpha - TrueNorth Selector Guide
    'project8', // Weitere Projekte
  ];

  return (
    <section id="projects" className="py-20 lg:py-32 relative">
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
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            {t('subtitle')}
          </p>
          <p className="text-sm text-gray-400 italic max-w-2xl mx-auto">
            {t('note')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((projectKey, index) => {
            const project = t.raw(`items.${projectKey}`);
            return (
              <motion.div
                key={projectKey}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <div className="glass rounded-2xl p-6 h-full flex flex-col hover:glass-strong transition-all duration-300">
                  {/* Project Number */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-forest-500/10 group-hover:text-forest-500/20 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Tech Stack Badge & Private Badge */}
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-3 py-1 bg-forest-800 text-forest-200 rounded-full text-xs font-medium border border-forest-600">
                      {project.tech.split(', ')[0]}
                    </span>
                    {project.private && (
                      <span className="inline-block px-3 py-1 bg-forest-900/50 text-forest-300 rounded-full text-xs font-medium border border-forest-700">
                        {t('private')}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-forest-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(', ').map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-dark-800/50 text-gray-400 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contribution Note */}
                  {project.contribution && (
                    <div className="mb-4 p-3 bg-forest-800 border border-forest-600 rounded-lg">
                      <p className="text-xs text-forest-200 font-semibold mb-1">{t('contribution')}:</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{project.contribution}</p>
                    </div>
                  )}

                  {/* Tenants (for multi-tenant projects) */}
                  {project.tenants && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-2">Tenants:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tenants.map((tenant: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-forest-800 text-forest-200 rounded text-xs border border-forest-600"
                          >
                            {tenant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4">
                    {project.url && !project.private ? (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-forest-500 rounded-lg text-white font-medium hover:bg-forest-400 transition-all"
                      >
                        <ExternalLink size={18} />
                        {t('view')}
                      </motion.a>
                    ) : project.private ? (
                      <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-forest-800/50 rounded-lg text-forest-300 font-medium border border-forest-700">
                        <span className="text-xs">{t('availableOnRequest')}</span>
                      </div>
                    ) : (
                      <div className="flex-1" />
                    )}
                    {project.github ? (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-forest-300 transition-all"
                      >
                        <Github size={18} />
                      </motion.a>
                    ) : null}
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

