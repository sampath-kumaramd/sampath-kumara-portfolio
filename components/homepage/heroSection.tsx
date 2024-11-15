'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NumberTicker from '../ui/number-ticker';
import HyperText from '../ui/hyper-text';
import BoxReveal from '../ui/box-reveal';
import { Button } from '../ui/button';
import { MarqueeIcons } from './icon-marquee';
import { IconDock } from './icon-dock';
import TypingWithCursor from './typing-with-cursor';
import TypingAnimation from '../ui/typing-animation';

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
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
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

  return (
    <div className="container mx-auto flex h-[90vh] items-center justify-center">
      <div className="w-full">
        <div className="row-span-3 grid grid-cols-1 gap-0 sm:grid-cols-5">
          <div className="col-span-3 space-y-4">
            <TypingAnimation
              className="text-start text-2xl text-black dark:text-white"
              texts={[
                'Web Developer',
                'Innovator',
                'Software Engineer',
                'Leader',
              ]}
            />
            <div className="space-y-3 text-4xl font-semibold sm:text-7xl">
              <div className="text-[5rem] text-black">Hello I&apos;m</div>
              <BoxReveal boxColor={'#029ba3'} duration={0.5}>
                <div className="text-[5rem] text-fontSecondary">
                  Sampath Kumara
                </div>
              </BoxReveal>
            </div>
            <div className="text-fontGray">
              I&apos;m excel at creating elegant websites. <br /> I am
              proficient in varioud programing languages and <br />
              technologies.
            </div>

            <div className="flex gap-4">
              <IconDock />
            </div>
          </div>
          <div className="col-span-2 grid items-center justify-end">
            <MarqueeIcons />
          </div>
        </div>
        <div className="row-span-1 mt-10 grid grid-cols-4 items-center gap-28">
          {HeroSectionFooter.map((items, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="col-span-1 text-6xl font-semibold">
                <NumberTicker value={items.count} decimalPlaces={0} />
              </div>
              <div className="col-span-2">{items.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

{
  /* <div className=" inset-0 z-10 transition-opacity duration-300">
        <Image
          src="/home/hero.svg"
          alt="hero"
          className="h-40 w-auto rounded-full border-2 border-fontSecondary border-dashed"
          width={200}
          height={200}
        />
      </div> */
}
