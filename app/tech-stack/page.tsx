'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/lib/data/skills';
import { skillCategories } from '@/lib/data/skills';
import { SkillCategory } from '@/types/skills';
import { useSearchParams } from 'next/navigation';

const SkillsSection: React.FC = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skills.filter((skill) =>
    selectedCategory === 'All'
      ? true
      : skill.category.includes(selectedCategory)
  );

  useEffect(() => {
    const category = searchParams?.get('category');
    if (
      category &&
      (category === 'All' ||
        category === 'Frontend' ||
        category === 'Backend' ||
        category === 'Database' ||
        category === 'DevOps' ||
        category === 'Tools')
    ) {
      setSelectedCategory(category as any);
    }
  }, [searchParams]);

  return (
    <div className="space-y-8 bg-[#1e1e1e] p-4">
      {/* Category filters */}
      <div className="border-b border-[#333333] bg-[#252526]">
        <nav className="-mb-px flex flex-wrap">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? 'border-t-2 border-t-[#007acc] bg-[#1e1e1e] text-white'
                  : 'border-transparent bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2a2a] hover:text-white'
              } border-r border-[#333333] px-4 py-2 text-xs font-medium capitalize`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
      <div className="w-full overflow-x-hidden px-4 md:overflow-y-auto">
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
                  // href={skill.link}
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-gray-700 bg-gray-800 p-4 shadow-md transition-all dark:bg-gray-800"
                >
                  <div className="flex flex-col items-center">
                    <skill.Icon className="h-12 w-12 text-blue-500" />
                    <span className="mt-2 text-sm text-gray-200">
                      {skill.name}
                    </span>
                  </div>

                  {/* Proficiency bar */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-md bg-gray-700"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-blue-500"
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
                className="rounded-md border border-gray-700 bg-gray-800 p-4 shadow-md dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-200">
                  {category}
                </h3>
                <div className="mt-2 h-2 rounded-full bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${avgProficiency}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-blue-500"
                  />
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  {Math.round(avgProficiency)}% proficiency <br /> In above{' '}
                  {category} Technologies
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
