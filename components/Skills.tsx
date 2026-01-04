'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Settings,
  Palette,
  Wrench,
  BarChart3,
  FileText,
  TestTube,
  Cloud
} from 'lucide-react';
import { 
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiVuedotjs,
  SiAngular,
  SiAntdesign,
  SiTypescript,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGraphql,
  SiDirectus,
  SiContentful,
  SiStrapi,
  SiDocker,
  SiNginx,
  SiYaml,
  SiRailway,
  SiJest,
  SiMocha,
  SiAmazon
} from 'react-icons/si';
import { 
  DiJava
} from 'react-icons/di';

export default function Skills() {
  const t = useTranslations('skills');

  const skillCategories = [
    {
      title: t('languages'),
      icon: Code,
      skills: [
        { name: 'JavaScript', Icon: SiJavascript, level: 95 },
        { name: 'TypeScript', Icon: SiTypescript, level: 75 },
        { name: 'Java', Icon: DiJava, level: 12 },
      ],
    },
    {
      title: t('frameworks'),
      icon: Settings,
      skills: [
        { name: 'React', Icon: SiReact, level: 95 },
        { name: 'Next.js', Icon: SiNextdotjs, level: 95 },
        { name: 'Vue.js', Icon: SiVuedotjs, level: 75 },
        { name: 'Angular', Icon: SiAngular, level: 35 },
      ],
    },
    {
      title: t('styling'),
      icon: Palette,
      skills: [
        { name: 'HTML & CSS', Icon: SiHtml5, level: 95 },
        { name: 'Tailwind', Icon: SiTailwindcss, level: 95 },
        { name: 'Bootstrap', Icon: SiBootstrap, level: 75 },
        { name: 'Ant Design', Icon: SiAntdesign, level: 75 },
      ],
    },
    {
      title: t('backend'),
      icon: Database,
      skills: [
        { name: 'Node.js', Icon: SiNodedotjs, level: 90 },
        { name: 'Express', Icon: SiExpress, level: 90 },
        { name: 'MongoDB', Icon: SiMongodb, level: 75 },
        { name: 'Mongoose', Icon: SiMongodb, level: 75 },
        { name: 'GraphQL', Icon: SiGraphql, level: 72 },
      ],
    },
    {
      title: t('cms'),
      icon: Settings,
      skills: [
        { name: 'Directus', Icon: SiDirectus, level: 95 },
        { name: 'Contentful', Icon: SiContentful, level: 75 },
        { name: 'Strapi', Icon: SiStrapi, level: 72 },
      ],
    },
    {
      title: t('tools'),
      icon: Wrench,
      skills: [
        { name: 'Matomo', Icon: BarChart3, level: 70 },
        { name: 'NGINX', Icon: SiNginx, level: 55 },
        { name: 'Filestash', Icon: FileText, level: 55 },
        { name: 'Docker', Icon: SiDocker, level: 30 },
        { name: 'YAML', Icon: SiYaml, level: 30 },
      ],
    },
    {
      title: t('testing'),
      icon: TestTube,
      skills: [
        { name: 'BrowserStack', level: 70 },
        { name: 'Jest', Icon: SiJest, level: 10 },
        { name: 'Mocha', Icon: SiMocha, level: 10 },
      ],
    },
    {
      title: t('cloud'),
      icon: Cloud,
      skills: [
        { name: 'Railway', Icon: SiRailway, level: 70 },
        { name: 'AWS', Icon: SiAmazon, level: 10 },
        { name: 'Azure', level: 10 },
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-forest-200">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="w-12 h-12 bg-forest-500 rounded-lg flex items-center justify-center">
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
                      {skill.Icon && (
                        <skill.Icon className="text-2xl text-gray-300 flex-shrink-0" />
                      )}
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                    </div>
                    {/* 4-Step Progress Indicator */}
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((step) => {
                        // Map levels to steps: <50% = 1 step, 50-65% = 2 steps, 65-80% = 3 steps, 80%+ = 4 steps
                        const steps = skill.level >= 80 ? 4 : skill.level >= 65 ? 3 : skill.level >= 50 ? 2 : 1;
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
                                ? 'bg-forest-500'
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

