'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/lib/data/skills';
import { skillCategories } from '@/lib/data/skills';
import { SkillCategory } from '@/types/skills';

const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
      <div className="w-full overflow-x-hidden px-4 md:h-[35rem] md:overflow-y-auto">
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
              categorySkills.reduce(
                (acc, skill) => acc + skill.proficiency,
                0
              ) / categorySkills.length;

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
    </div>
  );
};

export default SkillsSection;
