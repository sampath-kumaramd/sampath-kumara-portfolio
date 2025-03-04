'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Github,
  Link as LinkIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

const ProjectDetail = ({
  project,
  isOpen,
  onClose,
  vsCodeColors,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  vsCodeColors: any;
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const navigateImage = (newDirection: number) => {
    setDirection(newDirection);
    setActiveImageIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return project.images.length - 1;
      if (nextIndex >= project.images.length) return 0;
      return nextIndex;
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent
        side="bottom"
        className="h-[90vh] overflow-hidden rounded-t-xl border-t p-0"
        style={{
          backgroundColor: vsCodeColors.background,
          borderColor: vsCodeColors.border,
          color: vsCodeColors.foreground,
        }}
      >
        <div className="flex h-full flex-col">
          {/* Handle bar for bottom sheet */}
          <div className="flex w-full justify-center py-2">
            <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>

          <div className="flex h-full flex-col overflow-hidden lg:flex-row">
            {/* Left: Image Showcase */}
            <div className="relative h-[40vh] w-full lg:h-full lg:w-2/3">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.images[activeImageIndex]}
                    alt={`${project.name} showcase ${activeImageIndex + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg p-4"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={() => navigateImage(-1)}
                className="absolute left-4 top-1/2 z-40 -translate-y-1/2 rounded-full p-2 transition-colors"
                style={{
                  backgroundColor: `${vsCodeColors.cardBg}80`,
                  color: vsCodeColors.foreground,
                }}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigateImage(1)}
                className="absolute right-4 top-1/2 z-40 -translate-y-1/2 rounded-full p-2 transition-colors"
                style={{
                  backgroundColor: `${vsCodeColors.cardBg}80`,
                  color: vsCodeColors.foreground,
                }}
              >
                <ArrowRight className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div
                className="absolute bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full px-3 py-1 text-sm"
                style={{
                  backgroundColor: `${vsCodeColors.cardBg}80`,
                  color: vsCodeColors.secondaryText,
                }}
              >
                {activeImageIndex + 1} / {project.images.length}
              </div>
            </div>

            {/* Right: Project Details */}
            <div
              className="w-full overflow-y-auto p-6 lg:w-1/3"
              style={{ backgroundColor: vsCodeColors.background }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {project.client_logo && (
                    <Image
                      src={project.client_logo}
                      alt={project.client}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: vsCodeColors.foreground }}
                    >
                      {project.name}
                    </h2>
                    <p style={{ color: vsCodeColors.secondaryText }}>
                      {project.client}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Status and Timeline */}
                <div className="flex items-center gap-4">
                  <span
                    className="rounded-sm px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: vsCodeColors.tabInactive,
                      color: vsCodeColors.secondaryText,
                    }}
                  >
                    {project.status}
                  </span>
                  <span
                    style={{ color: vsCodeColors.secondaryText }}
                    className="text-sm"
                  >
                    {new Date(project.startDate).toLocaleDateString()} -
                    {project.endDate
                      ? new Date(project.endDate).toLocaleDateString()
                      : 'Present'}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-base leading-relaxed"
                  style={{ color: vsCodeColors.foreground }}
                >
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div>
                  <h3
                    className="mb-2 text-lg font-semibold"
                    style={{ color: vsCodeColors.accent }}
                  >
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-sm px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: vsCodeColors.tabInactive,
                          color: vsCodeColors.secondaryText,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3
                    className="mb-2 text-lg font-semibold"
                    style={{ color: vsCodeColors.accent }}
                  >
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature.title} className="space-y-1">
                        <h4
                          className="font-medium"
                          style={{ color: vsCodeColors.foreground }}
                        >
                          {feature.title}
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: vsCodeColors.secondaryText }}
                        >
                          {feature.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-sm px-4 py-2 transition-colors hover:opacity-90"
                      style={{
                        backgroundColor: vsCodeColors.tabInactive,
                        color: vsCodeColors.foreground,
                      }}
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  )}
                  {project.hosted_link && (
                    <a
                      href={project.hosted_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-sm px-4 py-2 text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: vsCodeColors.accent }}
                    >
                      <LinkIcon className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectDetail;
