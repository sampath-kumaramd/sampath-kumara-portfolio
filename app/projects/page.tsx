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
import Safari from '@/components/ui/safari';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GithubIcon, LinkIcon, ExpandIcon } from 'lucide-react';
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
import { Project } from '@/types/project';
import { projects } from '@/lib/data/projects';
import Iphone15Pro from '@/components/ui/iphone-15-pro';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const ProjectCard: React.FC<Project> = (project) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === project.images.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, project.images.length]);

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
                {project.name}
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
                    <div className="relative flex w-full justify-center">
                      {currentImageIndex < 3 ? (
                        <div className="relative">
                          <Image
                            src={project.images[currentImageIndex]}
                            alt="project image"
                            className="h-96 w-full rounded-lg shadow-xl"
                            objectFit="cover"
                            width={1200}
                            height={700}
                          />
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="absolute right-4 top-4 z-40 hidden rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:block">
                                <ExpandIcon className="h-4 w-4" />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[95vh] w-auto max-w-[95vw] overflow-auto rounded-3xl p-2 pt-10">
                              <Safari
                                src={project.images[currentImageIndex]}
                                width={1200}
                                height={700}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      ) : (
                        <div className="relative">
                          <Image
                            src={project.images[currentImageIndex]}
                            alt="project image"
                            className="rounded-lg"
                            width={206}
                            height={458}
                          />
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="absolute right-4 top-4 z-40 hidden rounded-full bg-black/50 p-2 text-white hover:bg-black/70 md:block">
                                <ExpandIcon className="h-4 w-4" />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[95vh] w-auto max-w-[95vw] overflow-auto rounded-3xl p-2">
                              <Iphone15Pro
                                src={project.images[currentImageIndex]}
                                width={430}
                                height={880}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                        <button
                          onClick={() => {
                            setIsPlaying(false);
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? project.images.length - 1 : prev - 1
                            );
                          }}
                          className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => {
                            setIsPlaying(false);
                            setCurrentImageIndex((prev) =>
                              prev === project.images.length - 1 ? 0 : prev + 1
                            );
                          }}
                          className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                        >
                          →
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-lg bg-gray-500/50 p-2">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setIsPlaying(false);
                              setCurrentImageIndex(index);
                            }}
                            className={`h-2 w-2 rounded-full transition-all ${
                              currentImageIndex === index
                                ? 'w-4 bg-white'
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute bottom-4 right-8 h-10 w-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                      >
                        {isPlaying ? '⏸' : '▶️'}
                      </button>
                    </div>

                    <div className="pt-10">
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
                          <div className="flex items-center gap-2">
                            {project.client_logo && project.client_link && (
                              <a
                                href={project.client_link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={project.client_logo}
                                  alt={project.client}
                                  width={20}
                                  height={20}
                                />
                              </a>
                            )}
                            <p className="text-gray-600 dark:text-gray-200">
                              {project.client}
                            </p>
                          </div>
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

function page() {
  return (
    <div className="flex min-h-screen flex-col justify-center dark:bg-background dark:text-white">
      <div className="container mx-auto pb-16">
        <p className="mb-12 pt-24 text-4xl font-bold text-Secondary lg:pt-0">
          Projects I have done
        </p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-4 lg:justify-start">
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
