'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useTheme } from 'next-themes';
import { GithubIcon, LinkIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { projects } from '@/lib/data/projects';
import ProjectDetail from '@/components/project-detail';
import { Footer } from '@/components/footer';

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { theme } = useTheme();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 pt-0 dark:from-background dark:to-background/90 md:pt-10">
        <div className="mx-auto max-w-7xl py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-Secondary"
          >
            Some of my work
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-xl text-muted-foreground"
          >
            These are some of the projects I&apos;ve worked on.
          </motion.div>
          <div className="space-y-32">
            {projects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <div
                  className={`flex flex-col gap-12 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Project Image */}
                  <div className="relative w-full lg:w-7/12">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                      <Image
                        src={project.heroImage}
                        alt={project.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="w-full lg:w-5/12">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        {project.client_logo && (
                          <Image
                            src={project.client_logo}
                            alt={project.client}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )}
                        <h3 className="text-xl font-semibold dark:text-white">
                          {project.name}
                        </h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300">
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="rounded-full bg-white px-4 py-1 text-sm font-medium shadow-lg dark:bg-gray-800 dark:text-white"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Sheet>
                          <motion.button
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 rounded-lg bg-Secondary px-6 py-2 text-white transition-colors hover:bg-Secondary/90"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </motion.button>
                        </Sheet>

                        {selectedProject && (
                          <ProjectDetail
                            project={selectedProject}
                            isOpen={!!selectedProject}
                            onClose={() => setSelectedProject(null)}
                          />
                        )}

                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-black p-2 text-white transition-transform hover:scale-110 dark:bg-white dark:text-black"
                          >
                            <GithubIcon className="h-5 w-5" />
                          </a>
                        )}

                        {project.hosted_link && (
                          <a
                            href={project.hosted_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-Secondary p-2 text-white transition-transform hover:scale-110"
                          >
                            <LinkIcon className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Indicator */}
                {idx !== projects.length - 1 && (
                  <div className="absolute left-1/2 mt-16 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-Secondary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectShowcase;
