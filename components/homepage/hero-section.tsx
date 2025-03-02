'use client';
import React, { useEffect, useState } from 'react';
import NumberTicker from '../ui/number-ticker';
import BoxReveal from '../ui/box-reveal';
import TypingAnimation from '../ui/typing-animation';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

type Contributions = {
  count: number;
  title: string;
};

const HeroSection = () => {
  const [commitCount, setCommitCount] = useState(0);
  const [techCount, setTechCount] = useState(0);
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/github-stats');
        const data = await response.json();
        const commits = data.totalContributions;
        const technologies = data.technologies?.length || 0;
        const years = data.yearsOfExperience || 0;
        const projects = data.totalProjects || 0;
        setCommitCount(commits);
        setTechCount(technologies);
        setYearsOfExperience(years);
        setProjectCount(projects);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  const contributions: Contributions[] = [
    { count: yearsOfExperience, title: 'Years of experience' },
    { count: projectCount, title: 'Projects contributed' },
    { count: techCount, title: 'Programming Languages' },
    { count: commitCount, title: 'Total Contributions' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="mb-2 mt-20 flex items-center justify-center px-4 py-8 dark:bg-background md:mt-0 md:min-h-[89.5vh] md:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full">
        <motion.div
          className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-5"
          variants={itemVariants}
        >
          <div className="col-span-1 space-y-4 md:col-span-1 lg:col-span-3">
            <TypingAnimation
              className="text-start text-xl font-medium text-Secondary dark:text-Secondary sm:text-2xl"
              texts={[
                'Full Stack Developer',
                'Software Engineer',
                'Problem Solver',
                'Leader',
                'Team Player',
                'Volunteer',
                'Open Source Contributor',
              ]}
            />
            <div className="space-y-3">
              <div className="text-3xl font-semibold text-black dark:text-white sm:text-4xl md:text-5xl lg:text-[5rem]">
                Hello I&apos;m
              </div>
              <BoxReveal boxColor={'#029ba3'} duration={0.5}>
                <div className="text-3xl font-semibold uppercase text-Secondary sm:text-4xl md:text-5xl lg:text-[5rem]">
                  Sampath Kumara
                </div>
              </BoxReveal>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              Dedicated to creating impactful digital experiences{' '}
              <br className="hidden sm:block" /> through clean code and
              thoughtful design.
              <br className="hidden sm:block" /> Every project is an opportunity
              to innovate and excel.
            </div>
          </div>

          <div className="col-span-1 space-y-4 md:col-span-1 lg:col-span-2">
            <motion.div
              className="rounded-lg border border-gray-200 bg-white/5 p-6 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/30"
              variants={itemVariants}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  developer.tsx
                </div>
              </div>

              <div className="font-mono text-sm">
                <div className="flex">
                  <span className="mr-4 text-gray-500">1</span>
                  <span className="text-blue-500">const</span>
                  <span className="text-white"> Developer = () </span>
                  <span className="text-blue-500">{'=> {'}</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">2</span>
                  <span className="ml-4 text-blue-500">return</span>
                  <span className="text-white"> (</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">3</span>
                  <span className="ml-8 text-green-500">{'<Profile>'}</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">4</span>
                  <span className="ml-12 text-green-500">{'<name>'}</span>
                  <span className="text-yellow-300">Sampath Kumara</span>
                  <span className="text-green-500">{'</name>'}</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">5</span>
                  <span className="ml-12 text-green-500">{'<skills>'}</span>
                  <span className="text-white">Full Stack, React, Node.js</span>
                  <span className="text-green-500">{'</skills>'}</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">6</span>
                  <span className="ml-12 text-green-500">{'<passion>'}</span>
                  <span className="text-white">
                    Building amazing experiences
                  </span>
                  <span className="text-green-500">{'</passion>'}</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">7</span>
                  <span className="ml-8 text-green-500">{'</Profile>'}</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">8</span>
                  <span className="text-white">);</span>
                </div>
                <div className="flex">
                  <span className="mr-4 text-gray-500">9</span>
                  <span className="text-blue-500">{'}'}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-lg border border-gray-200 bg-black/90 p-4 shadow-lg backdrop-blur-sm dark:border-gray-800"
              variants={itemVariants}
            >
              <div className="mb-2 flex items-center space-x-2">
                <div className="text-xs text-gray-400">TERMINAL</div>
              </div>
              <div className="font-mono text-sm text-green-400">
                <div>$ npm run build</div>
                <div className="mt-1">
                  Creating optimized production build...
                </div>
                <div className="mt-1">✓ Compiled successfully</div>
                <div className="mt-1 flex items-center">
                  <span className="mr-1">$</span>
                  <span className="h-4 w-2 animate-pulse bg-green-400"></span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 w-full rounded-xl bg-white/5 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-900/30 dark:text-white sm:mt-12 md:pt-6"
          variants={itemVariants}
        >
          <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
            {contributions.map((items, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center gap-2 text-center sm:gap-3"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl font-semibold text-Secondary dark:text-Secondary sm:text-4xl md:text-5xl lg:text-6xl">
                  {isLoading ? (
                    <FaSpinner className="h-10 w-10 animate-spin" />
                  ) : (
                    <NumberTicker value={items.count} decimalPlaces={0} />
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:text-base">
                  {items.title}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
