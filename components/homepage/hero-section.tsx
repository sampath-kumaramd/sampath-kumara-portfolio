'use client';
import React, { useEffect, useState } from 'react';
import NumberTicker from '../ui/number-ticker';
import BoxReveal from '../ui/box-reveal';
import { MarqueeIcons } from './icon-marquee';
import { IconDock } from './icon-dock';
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
    { count: techCount, title: 'Technologies used' },
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
      className="container mx-auto mb-10 mt-96 flex items-center justify-center px-4 py-8 dark:bg-background md:mt-0 md:min-h-[89.5vh] md:px-6 lg:px-8"
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
              className="text-start text-xl text-black dark:text-white sm:text-2xl"
              texts={[
                'Full Stack Developer',
                'Software Engineer',
                'Problem Solver',
                'Leader',
                'Team Player',
                'Volounteer',
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
            <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              Dedicated to creating impactful digital experiences{' '}
              <br className="hidden sm:block" /> through clean code and
              thoughtful design.
              <br className="hidden sm:block" /> Every project is an opportunity
              to innovate and excel.
            </div>

            <div className="flex gap-4">
              <IconDock />
            </div>
          </div>
          <div className="col-span-1 mt-8 md:col-span-1 md:mt-0 lg:col-span-2">
            <MarqueeIcons />
          </div>
        </motion.div>

        <motion.div
          className="mt-10 w-full pt-4 dark:bg-background dark:text-white sm:mt-0 md:pt-10"
          variants={itemVariants}
        >
          <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
            {contributions.map((items, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 sm:gap-3"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl font-semibold text-black dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {isLoading ? (
                    <FaSpinner className="h-10 w-10 animate-spin" />
                  ) : (
                    <NumberTicker value={items.count} decimalPlaces={0} />
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
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
