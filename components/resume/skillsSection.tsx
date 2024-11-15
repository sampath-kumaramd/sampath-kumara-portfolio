import React from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAngular,
  FaBootstrap,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiTypescript,
} from 'react-icons/si';
import { BiLogoSpringBoot } from 'react-icons/bi';
import { GrMysql } from 'react-icons/gr';
import { FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface TechIconProps {
  Icon: IconType;
  name: string;
}

const TechIcon: React.FC<TechIconProps> = ({ Icon, name }) => (
  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-lg bg-bgSecondery transition-colors hover:bg-fontSecondary">
    <Icon className="h-12 w-12 text-white" />
    <span className="mt-2 text-xs text-gray-300">{name}</span>
  </div>
);

interface TechInfo {
  Icon: IconType;
  name: string;
}

const SkillsSection: React.FC = () => {
  const icons: TechInfo[] = [
    { Icon: FaHtml5, name: 'HTML5' },
    { Icon: FaJs, name: 'JavaScript' },
    { Icon: FaReact, name: 'React' },
    { Icon: SiNextdotjs, name: 'Next.js' },
    { Icon: SiTypescript, name: 'TypeScript' },
    { Icon: FaAngular, name: 'Angular' },
    { Icon: FaCss3Alt, name: 'CSS3' },
    { Icon: FaBootstrap, name: 'Bootstrap' },
    { Icon: SiTailwindcss, name: 'Tailwind' },
    { Icon: FaJava, name: 'Java' },
    { Icon: FaNodeJs, name: 'Node.js' },
    { Icon: BiLogoSpringBoot, name: 'Spring Boot' },
    { Icon: SiMongodb, name: 'MongoDB' },
    { Icon: GrMysql, name: 'MySQL' },
  ];

  return (
    <div>
      <div className="text-fontGray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div className="grid grid-cols-2 gap-10 rounded-xl py-12 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {icons.map((icon, index) => (
          <TechIcon key={index} Icon={icon.Icon} name={icon.name} />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
