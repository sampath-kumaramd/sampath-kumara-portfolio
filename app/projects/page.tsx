'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MagicCard } from '@/components/ui/magic-card';
import Image from 'next/image';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Safari from '@/components/ui/safari';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GithubIcon, LinkIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { event } from '@/lib/analytics';
import { useCallback, useState } from 'react';
import Tilt from 'react-parallax-tilt';
interface ProjectProps {
  name: string;
  description: string;
  client: string;
  role: string;
  status: string;
  startDate: string;
  endDate: string;
  heroImage: string;
  images: string[];
  skills: {
    name: string;
  }[];
  features: {
    title: string;
    description: string;
  }[];
  github_link?: string;
  hosted_link?: string;
}

const ProjectCard: React.FC<ProjectProps> = (project) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleProjectClick = (projectName: string) => {
    event({
      action: 'view_project',
      category: 'engagement',
      label: projectName,
    });
  };

  const handleProjectLinkClick = (
    projectName: string,
    linkType: 'github' | 'live'
  ) => {
    event({
      action: 'project_link_click',
      category: 'engagement',
      label: `${projectName}_${linkType}`,
    });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Tilt
            className="h-full"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.05}
          >
            <MagicCard
              className="max-w-xs cursor-pointer p-4 transition-all duration-300 hover:shadow-xl dark:border-gray-50/[.10] dark:bg-background"
              gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
              onClick={() => handleProjectClick(project.name)}
            >
              <div className="mb-4 text-start text-xl font-semibold">
                {project.name} a
              </div>
              <Image
                src={project.heroImage}
                alt={project.name}
                width={300}
                height={200}
                className="mb-3 rounded-xl border-2"
                objectFit="cover"
              />
              <p className="line-clamp-2 text-start text-sm text-gray-600 dark:text-gray-200">
                {project.description}
              </p>
              <p className="mt-2 text-start text-sm text-gray-600 dark:text-gray-200">
                {project.client}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-500/50 dark:text-gray-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </MagicCard>
          </Tilt>
        </SheetTrigger>

        <SheetContent
          className="h-[85vh] overflow-y-auto data-[theme=dark]:bg-background"
          side="bottom"
        >
          <SheetHeader>
            <SheetTitle>
              <p className="text-xl font-bold">{project.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                {project.client}
              </p>
            </SheetTitle>
            <SheetDescription>
              <div className="container mx-auto py-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <Dialog>
                      <DialogTrigger onClick={() => setCurrentImageIndex(0)}>
                        <Image
                          src={project.images[0]}
                          alt={`${project.name}`}
                          width={500}
                          height={400}
                          className="cursor-pointer rounded-lg transition-opacity hover:opacity-80"
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <div className="relative w-full">
                          <Safari
                            url={project.hosted_link || ''}
                            className="w-full"
                            src={project.images[currentImageIndex]}
                          />
                          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                            <button
                              onClick={() =>
                                setCurrentImageIndex((prev) =>
                                  prev === 0
                                    ? project.images.length - 1
                                    : prev - 1
                                )
                              }
                              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                            >
                              ←
                            </button>
                            <button
                              onClick={() =>
                                setCurrentImageIndex((prev) =>
                                  prev === project.images.length - 1
                                    ? 0
                                    : prev + 1
                                )
                              }
                              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div>
                      <h3 className="text-lg font-semibold dark:text-gray-200">
                        Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-200">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        {project.features.map((feature, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-medium">
                              {feature.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-200">
                              {feature.description}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Client</h4>
                          <p className="text-gray-600 dark:text-gray-200">
                            {project.client}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Role</h4>
                          <p className="text-gray-600 dark:text-gray-200">
                            {project.role}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Status</h4>
                          <p className="text-gray-600 dark:text-gray-200">
                            {project.status}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Timeline</h4>
                          <p className="text-gray-600 dark:text-gray-200">
                            {project.startDate} - {project.endDate}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 font-medium">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="rounded bg-gray-100 px-3 py-1 dark:bg-gray-500/50 dark:text-gray-200"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        {project.github_link && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={project.github_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 dark:bg-gray-500/50 dark:text-gray-200"
                                  onClick={() =>
                                    handleProjectLinkClick(
                                      project.name,
                                      'github'
                                    )
                                  }
                                >
                                  <GithubIcon className="h-4 w-4" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Source Code</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {project.hosted_link && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={project.hosted_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-md bg-Secondary px-4 py-2 text-white hover:bg-Secondary/80"
                                  onClick={() =>
                                    handleProjectLinkClick(project.name, 'live')
                                  }
                                >
                                  <LinkIcon className="h-4 w-4" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Live Site</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {isHovered && (
        <div
          className="pointer-events-none fixed z-50 hidden transform-gpu md:block"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%) scale(1.5)',
          }}
        >
          <div className="w-72 rounded-lg bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
            <h3 className="mb-2 text-lg font-bold">{project.name}</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Quick Info:
              </span>
              <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Role:</span> {project.role}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {project.status}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="rounded-md bg-gray-200/80 px-2 py-1 text-xs dark:bg-gray-700/80"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Click to view full details
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const projects: ProjectProps[] = [
  {
    name: 'Project 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ',
    heroImage: '/projects/dohm.png',
    images: [
      '/projects/AI Product selector.png',
      '/projects/AI Product selector.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
    ],
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'TailwindCSS' }],
    github_link: 'https://github.com',
    hosted_link: 'https://github.com',
    client: 'Client 1',
    role: 'Role 1',
    status: 'Status 1',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
    features: [
      { title: 'Feature 1', description: 'Description 1' },
      { title: 'Feature 2', description: 'Description 2' },
    ],
  },
  {
    name: 'Project 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ',
    heroImage: '/projects/dohm.png',
    images: [
      '/projects/dohm.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
    ],
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'TailwindCSS' }],
    github_link: 'https://github.com',
    hosted_link: 'https://github.com',
    client: 'Client 2',
    role: 'Role 2',
    status: 'Status 2',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
    features: [
      { title: 'Feature 1', description: 'Description 1' },
      { title: 'Feature 2', description: 'Description 2' },
    ],
  },
  {
    name: 'Project 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ',
    heroImage: '/projects/dohm.png',
    images: [
      '/projects/dohm.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
      '/projects/dohm.png',
    ],
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'TailwindCSS' }],
    github_link: 'https://github.com',
    hosted_link: 'https://github.com',
    client: 'Client 3',
    role: 'Role 3',
    status: 'Status 3',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
    features: [
      { title: 'Feature 1', description: 'Description 1' },
      { title: 'Feature 2', description: 'Description 2' },
    ],
  },
];

function page() {
  return (
    <div className="flex min-h-screen flex-col justify-center dark:bg-background dark:text-white">
      <div className="container mx-auto py-16">
        <p className="mb-12 text-4xl font-bold text-Secondary">
          Projects I have done
        </p>
        <div className="flex flex-wrap gap-4">
          {projects.map((project, index) => (
            <div key={index} className="max-w-xs">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
