'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MousePointer,
  ArrowRight,
  Sidebar,
  Files,
  Menu,
} from 'lucide-react';
import { Button } from './ui/button';
import { useCookieConsent } from '@/lib/store/cookieConsent';
import { event } from '@/lib/analytics';

export function UserGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { hasSeenGuide, setHasSeenGuide } = useCookieConsent();

  useEffect(() => {
    // Show after a short delay if guide hasn't been seen
    if (!hasSeenGuide) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenGuide]);

  const handleClose = () => {
    setHasSeenGuide(true);
    setIsVisible(false);
    event({
      action: 'user_guide',
      category: 'engagement',
      label: 'closed',
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
    event({
      action: 'user_guide_step',
      category: 'engagement',
      label: `step_${currentStep + 1}`,
    });
  };

  const steps = [
    {
      title: 'Welcome to my VS Code-themed Portfolio!',
      description:
        'This site is designed to look like VS Code. Let me show you how to navigate.',
      icon: <MousePointer className="h-5 w-5 text-[#007acc]" />,
    },
    {
      title: 'Sidebar Navigation',
      description:
        'Use the sidebar icons on the left to navigate between different sections like Explorer, Search, and more.',
      icon: <Sidebar className="h-5 w-5 text-[#007acc]" />,
    },
    {
      title: 'File Explorer',
      description:
        'Click on the Files icon to see all sections of my portfolio organized like a project structure.',
      icon: <Files className="h-5 w-5 text-[#007acc]" />,
    },
    {
      title: 'Mobile Navigation',
      description:
        'On mobile, use the menu icon in the top right to access navigation options.',
      icon: <Menu className="h-5 w-5 text-[#007acc]" />,
    },
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 right-4 z-50 max-w-sm rounded-lg border border-[#333333] bg-[#1e1e1e]/95 p-4 shadow-lg backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {steps[currentStep].icon}
              <div className="text-lg font-semibold text-[#bbbbbb]">
                {steps[currentStep].title}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-[#858585] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="text-sm">
            <p className="text-[#bbbbbb]">{steps[currentStep].description}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-5 rounded-full ${currentStep === index ? 'bg-[#007acc]' : 'bg-[#333333]'}`}
                />
              ))}
            </div>
            <Button
              size="sm"
              onClick={handleNext}
              className="whitespace-nowrap bg-[#007acc] text-white hover:bg-[#007acc]/90"
            >
              {currentStep < steps.length - 1 ? (
                <span className="flex items-center">
                  Next <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              ) : (
                'Got it!'
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
