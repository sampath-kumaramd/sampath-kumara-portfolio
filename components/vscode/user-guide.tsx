'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuideStep {
  title: string;
  description: string;
  target?: string; // CSS selector for highlighting
}

export default function VSCodeGuide({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: GuideStep[] = [
    {
      title: 'Welcome to my VS Code Portfolio',
      description:
        'This portfolio is designed to mimic VS Code. Let me show you around!',
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
  ];

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

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
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

        <h3 className="mb-2 text-xl font-semibold text-[#007acc]">
          {steps[currentStep].title}
        </h3>

        <p className="mb-6 text-[#bbbbbb]">{steps[currentStep].description}</p>

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
