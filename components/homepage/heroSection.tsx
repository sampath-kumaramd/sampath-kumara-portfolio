'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NumberTicker from '../ui/number-ticker';
import BoxReveal from '../ui/box-reveal';
import { MarqueeIcons } from './icon-marquee';
import { IconDock } from './icon-dock';
import TypingAnimation from '../ui/typing-animation';
import { motion } from 'framer-motion';
import { ContributionGraph } from '@/components/github/contribution-graph';

type HeroSectionFooter = {
  count: number;
  title: string;
};

type SocialMediaSection = {
  name: string;
  href: string;
  icon: string;
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
        console.error('Failed to fetch GitHub stats:', error);
        setIsLoading(false);
      }
    };

    fetchGithubStats();
  }, []);

  const HeroSectionFooter: HeroSectionFooter[] = [
    { count: yearsOfExperience, title: 'Years of experience' },
    { count: projectCount, title: 'Projects contributed' },
    { count: techCount, title: 'Technologies used' },
    { count: commitCount, title: 'Total Contributions' },
  ];

  const SocialMediaSection: SocialMediaSection[] = [
    {
      name: 'Email',
      href: 'https://gmail.com',
      icon: '/icons/mail.svg',
    },
    {
      name: 'Github',
      href: 'https://github.com',
      icon: '/icons/github.svg',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: '/icons/linkedin.svg',
    },
  ];

  // Animation variants
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
      className="container mx-auto mt-96 flex items-center justify-center px-4 py-8 dark:bg-background md:mt-0 md:min-h-[89.5vh] md:px-6 lg:px-8"
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
                'Web Developer',
                'Innovator',
                'Software Engineer',
                'Problem Solver',
                'Team Player',
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
            <div className="text-sm text-fontGray dark:text-gray-400 sm:text-base">
              I&apos;m excel at creating elegant websites.{' '}
              <br className="hidden sm:block" />I am proficient in varioud
              programing languages and <br className="hidden sm:block" />
              technologies.
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
          className="mt-10 grid grid-cols-2 gap-6 pt-4 dark:bg-background dark:text-white sm:mt-0 sm:grid-cols-2 md:grid-cols-4 md:pt-10 lg:gap-28"
          variants={itemVariants}
        >
          {HeroSectionFooter.map((items, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 sm:gap-3"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl font-semibold text-black dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
                <NumberTicker value={items.count} decimalPlaces={0} />
              </div>
              <div className="text-sm text-fontGray dark:text-gray-400 sm:text-base">
                {items.title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
