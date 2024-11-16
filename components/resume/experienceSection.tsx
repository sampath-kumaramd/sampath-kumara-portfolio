import React from 'react';
import { BorderBeam } from '../ui/border-beam';
import TimeLineExperienceSection from './experience-section';

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
    // <div>
    //   <div className="text-fontGray">
    //     My work experience, spanning over 3 years, has been a journey of growth,
    //     learning, and innovation.
    //   </div>
    //   <div className="grid grid-cols-1 gap-12 pt-12 lg:grid-cols-2">
    //     {Experience.map((item, index) => (
    //       <div
    //         key={index}
    //         className="relative flex flex-col gap-1 rounded-xl border p-5"
    //       >
    //         <div className="mb-1 text-base font-semibold text-Secondary">
    //           {item.duration}
    //         </div>
    //         <div className="text-xl font-semibold">{item.position}</div>
    //         <div className="mb-4 text-sm">
    //           <a href={item.companyLink} target="_blank" rel="noreferrer">
    //             {item.company}
    //           </a>
    //         </div>
    //         <div className="flex w-full gap-2">
    //           {item.skills.map((tech, index) => (
    //             <div key={index} className="text-fontGray">
    //               {tech.name}
    //             </div>
    //           ))}
    //           {index === 0 && (
    //             <BorderBeam
    //               size={150}
    //               duration={12}
    //               delay={9}
    //               borderWidth={2}
    //               colorFrom="#029ca3"
    //               colorTo="#def3f3"
    //               className="rounded-xl"
    //             />
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="md:h-40">
      <TimeLineExperienceSection />
    </div>
  );
}

export default ExperienceSection;
