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

  return (
    <Sheet>
      <SheetTrigger>
        <MagicCard
          className="max-w-xs cursor-pointer p-4"
          gradientColor="#def2f3"
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
          <p className="line-clamp-2 text-start text-sm text-gray-600">
            {project.description}
          </p>
          <p className="mt-2 text-start text-sm text-gray-600">
            {project.client}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="rounded-md bg-gray-200 px-2 py-1 text-xs"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </MagicCard>
      </SheetTrigger>

      <SheetContent className="h-[85vh] overflow-y-auto" side="bottom">
        <SheetHeader>
          <SheetTitle>
            <p className="text-xl font-bold">{project.name}</p>
            <p className="text-sm text-gray-600">{project.client}</p>
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
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="text-gray-600">{project.description}</p>
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
                          <AccordionContent className="text-gray-600">
                            {feature.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Client</h4>
                        <p className="text-gray-600">{project.client}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Role</h4>
                        <p className="text-gray-600">{project.role}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Status</h4>
                        <p className="text-gray-600">{project.status}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Timeline</h4>
                        <p className="text-gray-600">
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
                            className="rounded bg-gray-100 px-3 py-1"
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
                                className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
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
                                className="rounded-md bg-fontSecondary px-4 py-2 text-white hover:bg-fontSecondary/80"
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
    <div className="container mx-auto py-16">
      <p className="mb-12 text-4xl font-bold text-fontSecondary">
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
  );
}

export default page;
