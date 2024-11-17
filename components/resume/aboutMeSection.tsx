import Image from 'next/image';
import React from 'react';
import { ContributionGraph } from '../github/contribution-graph';
import { motion } from 'framer-motion';

type Education = {
  duration: string;
  institute: string;
  subject: string;
  result: string;
};

function AboutMeSection() {
  const Education: Education[] = [
    {
      duration: 'Expected in 2025',
      institute: 'University of Moratuwa',
      subject: 'BSc (Hons.) in Information Technology',
      result: 'CGPA - 3.18',
    },
    {
      duration: '2019',
      institute: 'G.C.E. Advance Level',
      subject: 'Physical Science Stream',
      result: "1 A , 2 B's",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4">
          <div className="inset-0 z-10 flex justify-center transition-opacity duration-300">
            <Image
              src="/sampath.png"
              alt="hero"
              className="h-60 w-auto rounded-full"
              width={600}
              height={600}
            />
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-center pt-10 text-4xl md:col-span-8 md:pt-0">
          Hey there! It&apos;s me, Sampath.
        </div>
      </div>
      <div className="mt-10 text-fontGray">
        I am a passionate and dedicated software engineer with a strong
        foundation in computer science and a passion for building innovative
        solutions. I thrive on challenges and constantly seek opportunities to
        expand my knowledge and skills.
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative mt-8 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
      >
        <h3 className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          GitHub Contributions
        </h3>
        <ContributionGraph className="w-full" />
      </motion.div>
    </div>
  );
}

export default AboutMeSection;
