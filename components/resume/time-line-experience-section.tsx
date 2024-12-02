import { InteractiveTimeline } from './interactive-timeline';

function TimeLineExperienceSection() {
  interface TimelineProps {
    experiences: {
      duration: string;
      position: string;
      company: string;
      companyLink?: string;
      skills: { name: string }[];
    }[];
  }
  interface Experience {
    duration: string;
    position: string;
    company: string;
    companyLink?: string;
    skills: { name: string }[];
  }

  const Experience: Experience[] = [
    {
      company: 'Fiverr',
      position: 'Freelance Software Developer',
      duration: 'Oct 2023 - Present',
      skills: [{ name: 'NextJs' }, { name: 'Angular' }, { name: 'TypeScript' }],
    },
    {
      company: 'SoraSoft',
      position: 'Frontend Developer',
      duration: 'Sep 2024 - Oct 2024',
      skills: [{ name: 'NextJs' }, { name: 'Tailwind CSS' }],
    },
    {
      company: 'AizenIT',
      position: 'Software Engineer Intern',
      duration: 'Jan 2024 - Jun 2024',
      skills: [{ name: 'Angular' }, { name: 'Bootstrap' }, { name: 'Strapi' }],
    },
    {
      company: 'AsyncDot',
      position: 'Software Engineer Internship',
      duration: 'July 2023 - March 2024',
      skills: [{ name: 'MedusaJS' }, { name: 'NextJs' }, { name: 'T4 App' }],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-fontGray">
        My work experience, spanning over 3 years, has been a journey of growth,
        learning, and innovation.
      </div>

      <div className="w-full overflow-x-hidden px-4 pb-20 md:h-[30rem] md:overflow-y-auto md:pb-0">
        <InteractiveTimeline experiences={Experience} />
      </div>
    </div>
  );
}

export default TimeLineExperienceSection;
