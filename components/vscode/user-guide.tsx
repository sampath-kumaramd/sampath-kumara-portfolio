'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, MousePointer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuideStep {
  title: string;
  description: string;
  target?: string; // CSS selector for highlighting
  icon?: React.ReactNode;
}

export default function VSCodeGuide({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<DOMRect | null>(null);

  const steps: GuideStep[] = [
    {
      title: 'Welcome to my VS Code Portfolio',
      description:
        'This portfolio is designed to mimic VS Code. Let me show you around!',
      icon: <MousePointer className="h-5 w-5 text-[#007acc]" />,
    },
    {
      title: 'Navigation',
      description:
        'Use the sidebar icons to navigate between different sections like Explorer, Search, and more.',
      target: '.sidebar-icons',
    },
    {
      title: 'Explorer',
      description:
        'Click on folders and files in the explorer to navigate to different sections of my portfolio.',
      target: '.explorer-section',
    },
    {
      title: 'Menu Bar',
      description:
        'The top menu bar provides quick access to different sections of my portfolio.',
      target: '.menu-bar',
    },
    {
      title: 'Tabs',
      description:
        'Just like in VS Code, you can have multiple tabs open at once.',
      target: '.tabs-section',
    },
    {
      title: 'Projects',
      description:
        "Check out my projects section to see what I've been working on, including web applications, landing pages, and more.",
      target: '.projects-section',
    },
    {
      title: 'Contact',
      description:
        'Feel free to reach out to me through the contact section if you have any questions or opportunities.',
      target: '.contact-section',
    },
  ];

  // Find and highlight target element
  useEffect(() => {
    const currentTarget = steps[currentStep].target;
    if (currentTarget) {
      const element = document.querySelector(currentTarget);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetElement(rect);

        // Scroll element into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setTargetElement(null);
      }
    } else {
      setTargetElement(null);
    }
  }, [currentStep, steps, isOpen]);

  // Save guide state to localStorage
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem('hasSeenGuide', 'true');
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentStep]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      {/* Target highlight */}
      <AnimatePresence>
        {targetElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute border-2 border-[#007acc] bg-[#007acc]/10"
            style={{
              left: targetElement.left,
              top: targetElement.top,
              width: targetElement.width,
              height: targetElement.height,
              zIndex: 101,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-md rounded-md border border-[#333333] bg-[#252526] p-6 shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#bbbbbb] hover:text-white"
        >
          <X size={18} />
        </button>

        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-xs text-[#bbbbbb] hover:text-white"
        >
          Skip tutorial
        </button>

        <div className="mb-4 mt-6 flex items-center">
          {steps[currentStep].icon || (
            <MousePointer size={20} className="mr-2 text-[#007acc]" />
          )}
          <h3 className="ml-2 text-xl font-semibold text-[#007acc]">
            {steps[currentStep].title}
          </h3>
        </div>

        <p className="mb-6 text-[#bbbbbb]">{steps[currentStep].description}</p>

        {/* Progress bar */}
        <div className="mb-4 flex w-full gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index <= currentStep ? 'bg-[#007acc]' : 'bg-[#3a3d3e]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 rounded px-3 py-1 text-sm ${
              currentStep === 0
                ? 'cursor-not-allowed text-[#555555]'
                : 'bg-[#2a2d2e] text-[#bbbbbb] hover:bg-[#3a3d3e]'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="text-sm text-[#bbbbbb]">
            {currentStep + 1} / {steps.length}
          </div>

          <button
            onClick={nextStep}
            className="flex items-center gap-1 rounded bg-[#007acc] px-3 py-1 text-sm text-white hover:bg-[#0069ac]"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
