'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Settings
} from 'lucide-react';
import { 
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiVuedotjs,
  SiTypescript,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGraphql,
  SiDirectus,
  SiContentful,
  SiStrapi,
  SiDocker
} from 'react-icons/si';
import { 
  DiJava
} from 'react-icons/di';

export default function Skills() {
  const t = useTranslations('skills');

  const skillCategories = [
    {
      title: t('frontend'),
      icon: Code,
      skills: [
        { name: 'JavaScript', Icon: SiJavascript, level: 90 },
        { name: 'React', Icon: SiReact, level: 90 },
        { name: 'Next.js', Icon: SiNextdotjs, level: 90 },
        { name: 'HTML', Icon: SiHtml5, level: 90 },
        { name: 'CSS', Icon: SiCss3, level: 90 },
        { name: 'Tailwind CSS', Icon: SiTailwindcss, level: 90 },
        { name: 'Vue.js', Icon: SiVuedotjs, level: 70 },
        { name: 'TypeScript', Icon: SiTypescript, level: 70 },
        { name: 'Bootstrap', Icon: SiBootstrap, level: 50 },
      ],
    },
    {
      title: t('backend'),
      icon: Database,
      skills: [
        { name: 'Node.js', Icon: SiNodedotjs, level: 90 },
        { name: 'Express', Icon: SiExpress, level: 90 },
        { name: 'TypeScript', Icon: SiTypescript, level: 70 },
        { name: 'MongoDB', Icon: SiMongodb, level: 50 },
        { name: 'Mongoose', Icon: SiMongodb, level: 50 },
        { name: 'GraphQL', Icon: SiGraphql, level: 50 },
        { name: 'Java', Icon: DiJava, level: 50 },
      ],
    },
    {
      title: t('cms'),
      icon: Settings,
      skills: [
        { name: 'Directus', Icon: SiDirectus, level: 90 },
        { name: 'Contentful', Icon: SiContentful, level: 90 },
        { name: 'Strapi', Icon: SiStrapi, level: 70 },
        { name: 'Docker', Icon: SiDocker, level: 50 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 lg:py-32 relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-cyan-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {skill.Icon ? (
                        <skill.Icon className="text-2xl text-gray-300 flex-shrink-0" />
                      ) : (
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500/20 to-accent-500/20 border border-cyan-500/30 flex-shrink-0" />
                      )}
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                    </div>
                    {/* 3-Step Progress Indicator */}
                    <div className="flex gap-2">
                      {[1, 2, 3].map((step) => {
                        // Map levels to steps: 50% = 1 step, 70% = 2 steps, 90% = 3 steps
                        const steps = skill.level >= 90 ? 3 : skill.level >= 70 ? 2 : 1;
                        const isActive = step <= steps;
                        return (
                          <motion.div
                            key={step}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.3, 
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + (step - 1) * 0.1 
                            }}
                            className={`flex-1 h-2 rounded-full transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-cyan-500 via-primary-500 to-accent-500'
                                : 'bg-dark-800'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

