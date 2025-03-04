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
import { GithubIcon, LinkIcon, ArrowRight, FileCode } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { projects } from '@/lib/data/projects';
import ProjectDetail from '@/components/project-detail';

const ProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { theme } = useTheme();

  // Determine VS Code theme colors based on system/user preference
  const isDark = theme === 'dark' || theme === 'system';
  const vsCodeColors = {
    background: isDark ? '#1e1e1e' : '#ffffff',
    foreground: isDark ? '#d4d4d4' : '#333333',
    accent: isDark ? '#007acc' : '#0078d7',
    border: isDark ? '#252526' : '#e0e0e0',
    cardBg: isDark ? '#252526' : '#f3f3f3',
    secondaryText: isDark ? '#bbbbbb' : '#6e6e6e',
    tabBar: isDark ? '#252526' : '#f3f3f3',
    tabActive: isDark ? '#1e1e1e' : '#ffffff',
    tabInactive: isDark ? '#2d2d2d' : '#ececec',
  };

  return (
    <>
      <div
        className="min-h-screen p-4"
        style={{
          backgroundColor: vsCodeColors.background,
          color: vsCodeColors.foreground,
        }}
      >
        {/* VS Code Tab Bar */}
        <div
          className="flex border-b"
          style={{
            borderColor: vsCodeColors.border,
            backgroundColor: vsCodeColors.tabBar,
          }}
        >
          <div
            className="flex items-center py-1 text-sm"
            style={{
              backgroundColor: vsCodeColors.tabActive,
              color: vsCodeColors.foreground,
            }}
          >
            <FileCode className="mr-2 h-4 w-4" />
            <span className="mr-2">projects.tsx</span>
            <span className="ml-2 cursor-pointer opacity-60 hover:opacity-100">
              ×
            </span>
          </div>
        </div>

        <div className="pt-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
            style={{ color: vsCodeColors.accent }}
          >
            Selected Works
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-xl"
            style={{ color: vsCodeColors.secondaryText }}
          >
            These are some of my projects. You can find more on my
            <a
              href="https://github.com/sampath-kumaramd"
              target="_blank"
              className="text-blue-400"
            >
              {' '}
              GitHub
            </a>
            .
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
                    <div
                      className="relative aspect-[16/9] overflow-hidden rounded-md border"
                      style={{ borderColor: vsCodeColors.border }}
                    >
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
                    <div
                      className="space-y-4 rounded-md border p-6"
                      style={{
                        borderColor: vsCodeColors.border,
                        backgroundColor: vsCodeColors.cardBg,
                      }}
                    >
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
                        <h3
                          className="text-xl font-semibold"
                          style={{ color: vsCodeColors.foreground }}
                        >
                          {project.name}
                        </h3>
                      </div>

                      <p style={{ color: vsCodeColors.secondaryText }}>
                        {project.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="rounded-sm px-3 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: isDark ? '#2a2d2e' : '#e6e6e6',
                              color: vsCodeColors.secondaryText,
                            }}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 rounded-sm px-4 py-2 text-white transition-colors hover:opacity-90"
                          style={{ backgroundColor: vsCodeColors.accent }}
                        >
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>

                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-white transition-transform hover:scale-110 hover:opacity-90"
                            style={{
                              backgroundColor: isDark ? '#333333' : '#e0e0e0',
                              color: vsCodeColors.foreground,
                            }}
                          >
                            <GithubIcon className="h-5 w-5" />
                          </a>
                        )}

                        {project.hosted_link && (
                          <a
                            href={project.hosted_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-white transition-transform hover:scale-110 hover:opacity-90"
                            style={{ backgroundColor: vsCodeColors.accent }}
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
                  <div className="absolute left-1/2 mt-16 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-[#007acc] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sheet for Project Details */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          vsCodeColors={vsCodeColors}
        />
      )}
    </>
  );
};

export default ProjectShowcase;
