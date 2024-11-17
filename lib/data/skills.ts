import { Skill } from '@/types/skills';
import { BiLogoSpringBoot } from 'react-icons/bi';
import {
  FaGit,
  FaJava,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaJs,
  FaReact,
  FaBootstrap,
  FaAngular,
} from 'react-icons/fa';
import { GrMysql } from 'react-icons/gr';
import {
  SiBitbucket,
  SiDocker,
  SiMedusa,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
export const skills: Skill[] = [
  {
    Icon: FaJs,
    name: 'JavaScript',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    category: ['Frontend', 'Backend'],
    proficiency: 90,
  },
  {
    Icon: SiTypescript,
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
    category: ['Frontend', 'Backend'],
    proficiency: 85,
  },
  {
    Icon: FaReact,
    name: 'React',
    link: 'https://react.dev/',
    category: ['Frontend'],
    proficiency: 85,
  },
  {
    Icon: SiNextdotjs,
    name: 'Next.js',
    link: 'https://nextjs.org/',
    category: ['Frontend'],
    proficiency: 80,
  },
  {
    Icon: FaAngular,
    name: 'Angular',
    link: 'https://angular.io/',
    category: ['Frontend'],
    proficiency: 75,
  },
  {
    Icon: SiMedusa,
    name: 'MedusaJS',
    link: 'https://medusajs.com/',
    category: ['Backend'],
    proficiency: 70,
  },
  {
    Icon: FaBootstrap,
    name: 'Bootstrap',
    link: 'https://getbootstrap.com/',
    category: ['Frontend'],
    proficiency: 85,
  },
  {
    Icon: SiTailwindcss,
    name: 'Tailwind',
    link: 'https://tailwindcss.com/',
    category: ['Frontend'],
    proficiency: 90,
  },
  {
    Icon: FaNodeJs,
    name: 'Node.js',
    link: 'https://nodejs.org/en',
    category: ['Backend'],
    proficiency: 85,
  },
  {
    Icon: SiNestjs,
    name: 'NestJS',
    link: 'https://nestjs.com/',
    category: ['Backend'],
    proficiency: 80,
  },
  {
    Icon: SiPython,
    name: 'Python',
    link: 'https://www.python.org/',
    category: ['Backend'],
    proficiency: 75,
  },
  {
    Icon: SiRedux,
    name: 'Redux',
    link: 'https://redux.js.org/',
    category: ['Frontend'],
    proficiency: 80,
  },
  {
    Icon: SiSass,
    name: 'Sass',
    link: 'https://sass-lang.com/',
    category: ['Frontend'],
    proficiency: 85,
  },
  {
    Icon: FaJava,
    name: 'Java',
    link: 'https://www.java.com/en/',
    category: ['Backend'],
    proficiency: 75,
  },
  {
    Icon: BiLogoSpringBoot,
    name: 'Spring Boot',
    link: 'https://spring.io/projects/spring-boot',
    category: ['Backend'],
    proficiency: 70,
  },
  {
    Icon: SiMongodb,
    name: 'MongoDB',
    link: 'https://www.mongodb.com/',
    category: ['Database'],
    proficiency: 80,
  },
  {
    Icon: GrMysql,
    name: 'MySQL',
    link: 'https://www.mysql.com/',
    category: ['Database'],
    proficiency: 85,
  },
  {
    Icon: SiPostgresql,
    name: 'PostgreSQL',
    link: 'https://www.postgresql.org/',
    category: ['Database'],
    proficiency: 80,
  },
  {
    Icon: SiDocker,
    name: 'Docker',
    link: 'https://www.docker.com/',
    category: ['DevOps'],
    proficiency: 75,
  },
  {
    Icon: FaGit,
    name: 'Git',
    link: 'https://git-scm.com/',
    category: ['Tools'],
    proficiency: 90,
  },
  {
    Icon: FaGithub,
    name: 'GitHub',
    link: 'https://github.com/',
    category: ['Tools'],
    proficiency: 90,
  },
  {
    Icon: SiBitbucket,
    name: 'Bitbucket',
    link: 'https://bitbucket.org/',
    category: ['Tools'],
    proficiency: 85,
  },
];

export const skillCategories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
] as const;
