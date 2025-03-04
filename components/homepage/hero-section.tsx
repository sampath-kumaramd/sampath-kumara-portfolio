'use client';
import React, { useEffect, useState } from 'react';
import NumberTicker from '../ui/number-ticker';
import BoxReveal from '../ui/box-reveal';
import TypingAnimation from '../ui/typing-animation';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
} from 'react-icons/vsc';

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
      className="mb-2 mt-20 flex flex-col items-start justify-start px-0 py-0 dark:bg-[#1e1e1e] md:mt-0 md:min-h-[89.5vh]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mt-8 w-full px-4">
        {/* VS Code Tab Bar */}

        {/* Main Content */}
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
                  'UI/UX Enthusiast',
                  'Problem Solver',
                  'Tech Innovator',
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
                Full Stack Developer specializing in building exceptional
                digital experiences
                <br className="hidden sm:block" /> with expertise in React,
                Next.js, Angular, and Node.js.
                <br className="hidden sm:block" /> I transform complex problems
                into elegant, efficient solutions
                <br className="hidden sm:block" /> with a focus on performance,
                scalability, and user experience.
              </div>
            </div>

            <div className="col-span-1 space-y-4 md:col-span-1 lg:col-span-2">
              <motion.div
                className="overflow-x-auto rounded-lg border border-gray-200 bg-white/5 p-4 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/30 sm:p-6"
                variants={itemVariants}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 sm:h-3 sm:w-3"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500 sm:h-3 sm:w-3"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3"></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    developer.tsx
                  </div>
                </div>

                <div className="font-mono text-xs sm:text-sm">
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">1</span>
                    <span className="text-blue-500">&nbsp;const&nbsp;</span>
                    <span className="text-white">
                      {' '}
                      Developer: React.FC = () &nbsp;
                    </span>
                    <span className="text-blue-500">
                      {`=>`} {`{`}
                    </span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">2</span>
                    <span className="ml-2 text-blue-500 sm:ml-4">
                      const&nbsp;
                    </span>
                    <span className="text-white"> skills = [</span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">3</span>
                    <span className="ml-4 text-yellow-300 sm:ml-8">
                      &apos;React&apos;, &apos;Next.js&apos;,
                      &apos;TypeScript&apos;,
                    </span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">4</span>
                    <span className="ml-4 text-yellow-300 sm:ml-8">
                      &apos;Node.js&apos;, &apos;Angular&apos;,
                      &apos;TailwindCSS&apos;,
                    </span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">5</span>
                    <span className="ml-2 text-white sm:ml-4">];</span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">6</span>
                    <span className="text-white"></span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">7</span>
                    <span className="ml-2 text-blue-500 sm:ml-4">
                      return &nbsp;
                    </span>
                    <span className="text-white"> ( </span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">8</span>
                    <span className="ml-4 text-green-500 sm:ml-8">
                      {`<Developer>`}
                    </span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">9</span>
                    <span className="ml-6 text-green-500 sm:ml-12">
                      {`<expertise>`}
                    </span>
                    <span className="text-white"> Full Stack Development </span>
                    <span className="text-green-500">{`</expertise>`}</span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">10</span>
                    <span className="ml-6 text-green-500 sm:ml-12">
                      {`<focus>`}
                    </span>
                    <span className="text-white"> Scalable Solutions </span>
                    <span className="text-green-500">{`</focus>`}</span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">11</span>
                    <span className="ml-4 text-green-500 sm:ml-8">
                      {`</Developer>`}
                    </span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">12</span>
                    <span className="text-blue-500"> {`};`}</span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">13</span>
                    <span className="text-white"></span>
                  </div>
                  <div className="flex whitespace-nowrap">
                    <span className="mr-2 text-gray-500 sm:mr-4">14</span>
                    <span className="text-blue-500">export default</span>
                    <span className="text-white"> Developer;</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="overflow-x-auto rounded-lg border border-gray-200 bg-black/90 p-3 shadow-lg backdrop-blur-sm dark:border-gray-800 sm:p-4"
                variants={itemVariants}
              >
                <div className="mb-2 flex items-center space-x-2">
                  <div className="text-xs text-gray-400">TERMINAL</div>
                </div>
                <div className="font-mono text-xs text-green-400 sm:text-sm">
                  <div className="whitespace-nowrap">$ npm run dev</div>
                  <div className="mt-1 whitespace-nowrap">
                    Starting development server...
                  </div>
                  <div className="mt-1 whitespace-nowrap">✓ Ready in 1.2s</div>
                  <div className="mt-1 whitespace-nowrap">
                    ✓ Compiled client and server successfully
                  </div>
                  <div className="mt-1 whitespace-nowrap">
                    ○ Waiting for file changes
                  </div>
                  <div className="mt-1 flex items-center whitespace-nowrap">
                    <span className="mr-1">$</span>
                    <span className="h-3 w-1.5 animate-pulse bg-green-400 sm:h-4 sm:w-2"></span>
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
            <div className="mt-4 flex justify-center">
              <p className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <VscSourceControl className="mr-1" /> Data sourced from GitHub
                stats
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
