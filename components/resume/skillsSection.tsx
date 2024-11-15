import React from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAngular,
  FaBootstrap,
  FaGit,
  FaGithub,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiTypescript,
  SiMedusa,
  SiDocker,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiRedux,
  SiSass,
  SiNestjs,
  SiBitbucket,
} from 'react-icons/si';
import { BiLogoSpringBoot } from 'react-icons/bi';
import { GrMysql } from 'react-icons/gr';
import { FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface TechIconProps {
  Icon: IconType;
  name: string;
  link: string;
}

const TechIcon: React.FC<TechIconProps> = ({ Icon, name, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-lg bg-bgSecondery transition-colors hover:bg-fontSecondary">
      <Icon className="h-12 w-12 text-white" />
      <span className="mt-2 text-xs text-gray-300">{name}</span>
    </div>
  </a>
);

interface TechInfo {
  Icon: IconType;
  name: string;
  link: string;
}

const SkillsSection: React.FC = () => {
  const icons: TechInfo[] = [
    {
      Icon: FaHtml5,
      name: 'HTML5',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      Icon: FaCss3Alt,
      name: 'CSS3',
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      Icon: FaJs,
      name: 'JavaScript',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      Icon: SiTypescript,
      name: 'TypeScript',
      link: 'https://www.typescriptlang.org/',
    },
    { Icon: FaReact, name: 'React', link: 'https://react.dev/' },
    { Icon: SiNextdotjs, name: 'Next.js', link: 'https://nextjs.org/' },
    { Icon: FaAngular, name: 'Angular', link: 'https://angular.io/' },
    { Icon: SiMedusa, name: 'MedusaJS', link: 'https://medusajs.com/' },
    { Icon: FaBootstrap, name: 'Bootstrap', link: 'https://getbootstrap.com/' },
    { Icon: SiTailwindcss, name: 'Tailwind', link: 'https://tailwindcss.com/' },
    { Icon: FaNodeJs, name: 'Node.js', link: 'https://nodejs.org/en' },
    { Icon: SiNestjs, name: 'NestJS', link: 'https://nestjs.com/' },
    { Icon: SiPython, name: 'Python', link: 'https://www.python.org/' },
    { Icon: SiRedux, name: 'Redux', link: 'https://redux.js.org/' },
    { Icon: SiSass, name: 'Sass', link: 'https://sass-lang.com/' },
    { Icon: FaJava, name: 'Java', link: 'https://www.java.com/en/' },
    {
      Icon: BiLogoSpringBoot,
      name: 'Spring Boot',
      link: 'https://spring.io/projects/spring-boot',
    },
    { Icon: SiMongodb, name: 'MongoDB', link: 'https://www.mongodb.com/' },
    { Icon: GrMysql, name: 'MySQL', link: 'https://www.mysql.com/' },
    {
      Icon: SiPostgresql,
      name: 'PostgreSQL',
      link: 'https://www.postgresql.org/',
    },
    { Icon: SiDocker, name: 'Docker', link: 'https://www.docker.com/' },
    { Icon: FaGit, name: 'Git', link: 'https://git-scm.com/' },
    { Icon: FaGithub, name: 'GitHub', link: 'https://github.com/' },
    { Icon: SiBitbucket, name: 'Bitbucket', link: 'https://bitbucket.org/' },
  ];

  return (
    <div>
      <div className="text-fontGray">
        My skills, spanning over 4 years, Learn and implement new technologies
        to improve my skills.
      </div>
      <div className="grid grid-cols-2 gap-10 rounded-xl py-12 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8">
        {icons.map((icon, index) => (
          <TechIcon
            key={index}
            Icon={icon.Icon}
            name={icon.name}
            link={icon.link}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
