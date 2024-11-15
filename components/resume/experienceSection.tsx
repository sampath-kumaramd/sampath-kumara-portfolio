import React from 'react';

type Experience = {
  duration: string;
  position: string;
  company: string;
  skills: {
    name: string;
  }[];
};

function ExperienceSection() {
  const Experience: Experience[] = [
    {
      duration: '2023 - Present',
      position: 'Freelance Software Developer',
      company: 'Fiverr · Freelance',
      skills: [{ name: 'NextJs' }, { name: 'Angular' }, { name: 'TypeScript' }],
    },
    {
      duration: 'Sep 2024 - Present',
      position: 'Frontend developer',
      company: 'SoraSoft · Part-time',
      skills: [{ name: 'NextJs' }, { name: 'Tailwind CSS' }],
    },
    {
      duration: 'Jan 2024 - Jun 2024',
      position: 'Software Engineer Intern',
      company: 'Aizenit · Full-time',
      skills: [{ name: 'Node.js' }, { name: 'Express' }, { name: 'MongoDB' }],
    },
    {
      duration: '2018 - 2020',
      position: 'Software Engineer Internship',
      company: 'AsyncDot · Part-time',
      skills: [{ name: 'Node.js' }, { name: 'Express' }, { name: 'MongoDB' }],
    },
  ];

  return (
    <div>
      <div className="text-fontGray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-12 pt-12">
        {Experience.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 rounded-xl border border-fontSecondary p-5"
          >
            <div className="mb-1 text-base font-semibold text-fontSecondary">
              {item.duration}
            </div>
            <div className="text-xl font-semibold">{item.position}</div>
            <div className="mb-4 text-sm">{item.company}</div>
            <div className="flex w-full gap-2">
              {item.skills.map((tech, index) => (
                <div key={index} className="text-fontGray">
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceSection;
