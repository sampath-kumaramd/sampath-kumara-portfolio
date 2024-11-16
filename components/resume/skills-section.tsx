'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGit,
  FaJava,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaJs,
  FaReact,
  FaBootstrap,
  FaAngular,
} from 'react-icons/fa';
import {
  SiBitbucket,
  SiDocker,
  SiMedusa,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { GrMysql } from 'react-icons/gr';
import { BiLogoSpringBoot } from 'react-icons/bi';
// ... (keep your existing imports)

const skillCategories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
] as const;

type SkillCategory = (typeof skillCategories)[number];

interface TechInfo {
  Icon: React.ElementType;
  name: string;
  link: string;
}

interface Skill extends TechInfo {
  category: SkillCategory[];
  proficiency: number; // 1-100
}

const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const skills: Skill[] = [
    {
      Icon: FaJs,
      name: 'JavaScript',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      category: ['Frontend', 'Backend'],
      proficiency: 90,
    },
    {
      Icon: SiTypescript,
      name: 'TypeScript',
      link: 'https://www.typescriptlang.org/',
      category: ['Frontend', 'Backend'],
      proficiency: 85,
    },
    {
      Icon: FaReact,
      name: 'React',
      link: 'https://react.dev/',
      category: ['Frontend'],
      proficiency: 85,
    },
    {
      Icon: SiNextdotjs,
      name: 'Next.js',
      link: 'https://nextjs.org/',
      category: ['Frontend'],
      proficiency: 80,
    },
    {
      Icon: FaAngular,
      name: 'Angular',
      link: 'https://angular.io/',
      category: ['Frontend'],
      proficiency: 75,
    },
    {
      Icon: SiMedusa,
      name: 'MedusaJS',
      link: 'https://medusajs.com/',
      category: ['Backend'],
      proficiency: 70,
    },
    {
      Icon: FaBootstrap,
      name: 'Bootstrap',
      link: 'https://getbootstrap.com/',
      category: ['Frontend'],
      proficiency: 85,
    },
    {
      Icon: SiTailwindcss,
      name: 'Tailwind',
      link: 'https://tailwindcss.com/',
      category: ['Frontend'],
      proficiency: 90,
    },
    {
      Icon: FaNodeJs,
      name: 'Node.js',
      link: 'https://nodejs.org/en',
      category: ['Backend'],
      proficiency: 85,
    },
    {
      Icon: SiNestjs,
      name: 'NestJS',
      link: 'https://nestjs.com/',
      category: ['Backend'],
      proficiency: 80,
    },
    {
      Icon: SiPython,
      name: 'Python',
      link: 'https://www.python.org/',
      category: ['Backend'],
      proficiency: 75,
    },
    {
      Icon: SiRedux,
      name: 'Redux',
      link: 'https://redux.js.org/',
      category: ['Frontend'],
      proficiency: 80,
    },
    {
      Icon: SiSass,
      name: 'Sass',
      link: 'https://sass-lang.com/',
      category: ['Frontend'],
      proficiency: 85,
    },
    {
      Icon: FaJava,
      name: 'Java',
      link: 'https://www.java.com/en/',
      category: ['Backend'],
      proficiency: 75,
    },
    {
      Icon: BiLogoSpringBoot,
      name: 'Spring Boot',
      link: 'https://spring.io/projects/spring-boot',
      category: ['Backend'],
      proficiency: 70,
    },
    {
      Icon: SiMongodb,
      name: 'MongoDB',
      link: 'https://www.mongodb.com/',
      category: ['Database'],
      proficiency: 80,
    },
    {
      Icon: GrMysql,
      name: 'MySQL',
      link: 'https://www.mysql.com/',
      category: ['Database'],
      proficiency: 85,
    },
    {
      Icon: SiPostgresql,
      name: 'PostgreSQL',
      link: 'https://www.postgresql.org/',
      category: ['Database'],
      proficiency: 80,
    },
    {
      Icon: SiDocker,
      name: 'Docker',
      link: 'https://www.docker.com/',
      category: ['DevOps'],
      proficiency: 75,
    },
    {
      Icon: FaGit,
      name: 'Git',
      link: 'https://git-scm.com/',
      category: ['Tools'],
      proficiency: 90,
    },
    {
      Icon: FaGithub,
      name: 'GitHub',
      link: 'https://github.com/',
      category: ['Tools'],
      proficiency: 90,
    },
    {
      Icon: SiBitbucket,
      name: 'Bitbucket',
      link: 'https://bitbucket.org/',
      category: ['Tools'],
      proficiency: 85,
    },
  ];

  const filteredSkills = skills.filter((skill) =>
    selectedCategory === 'All'
      ? true
      : skill.category.includes(selectedCategory)
  );

  return (
    <div className="space-y-8">
      {/* Category filters */}
      <div className="flex flex-wrap gap-4">
        {skillCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 transition-all ${
              selectedCategory === category
                ? 'bg-Secondary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="relative"
            >
              <a
                href={skill.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-white p-4 shadow-lg transition-all dark:bg-gray-900"
              >
                <div className="flex flex-col items-center">
                  <skill.Icon className="h-12 w-12 text-Secondary" />
                  <span className="mt-2 text-sm">{skill.name}</span>
                </div>

                {/* Proficiency bar */}
                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-lg bg-gray-200"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-Secondary"
                    />
                  </motion.div>
                )}
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Skill statistics */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {skillCategories.slice(1).map((category) => {
          const categorySkills = skills.filter((skill) =>
            skill.category.includes(category)
          );
          const avgProficiency =
            categorySkills.reduce((acc, skill) => acc + skill.proficiency, 0) /
            categorySkills.length;

          return (
            <div
              key={category}
              className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900"
            >
              <h3 className="text-lg font-semibold">{category}</h3>
              <div className="mt-2 h-2 rounded-full bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${avgProficiency}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-Secondary"
                />
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {Math.round(avgProficiency)}% proficiency
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
