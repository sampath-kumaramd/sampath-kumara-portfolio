import React from 'react';
import { BorderBeam } from '../ui/border-beam';
import TimeLineExperienceSection from './time-line-experience-section';

type Experience = {
  duration: string;
  position: string;
  company: string;
  companyLink?: string;
  skills: {
    name: string;
  }[];
};

function ExperienceSection() {
  const Experience: Experience[] = [
    {
      duration: 'Oct 2023 - Present',
      position: 'Freelance Software Developer',
      company: 'Fiverr · Freelance',
      companyLink: 'https://www.fiverr.com/users/mdskumara',
      skills: [{ name: 'NextJs' }, { name: 'Angular' }, { name: 'TypeScript' }],
    },
    {
      duration: 'Sep 2024 - Oct 2024',
      position: 'Frontend developer',
      company: 'SoraSoft · Part-time',
      companyLink: 'https://softsora.com/',
      skills: [{ name: 'NextJs' }, { name: 'Tailwind CSS' }],
    },
    {
      duration: 'Jan 2024 - Jun 2024',
      position: 'Software Engineer Intern',
      company: 'Aizenit · Full-time',
      companyLink: 'https://www.aizenit.com/',
      skills: [{ name: 'Angular' }, { name: 'Bootstrap' }, { name: 'Strapi' }],
    },
    {
      duration: 'July 2023 - March 2024',
      position: 'Software Engineer Internship',
      company: 'AsyncDot · Part-time',
      companyLink: 'https://asyncdot.com/',
      skills: [{ name: 'MedusaJS' }, { name: 'NextJs' }, { name: 'T4 App' }],
    },
  ];

  return (
    <div className="md:h-40">
      <TimeLineExperienceSection />
    </div>
  );
}

export default ExperienceSection;
