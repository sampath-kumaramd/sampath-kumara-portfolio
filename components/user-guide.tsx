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
  BookOpen,
  ExternalLink,
  Code,
  Layers,
  Search,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';
import { useCookieConsent } from '@/lib/store/cookieConsent';
import { event } from '@/lib/analytics';
import Link from 'next/link';

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

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      event({
        action: 'user_guide_step',
        category: 'engagement',
        label: `back_to_step_${currentStep}`,
      });
    }
  };

  const handleReadmeClick = () => {
    event({
      action: 'user_guide',
      category: 'engagement',
      label: 'view_readme',
    });
    setHasSeenGuide(true);
    setIsVisible(false);
  };

  const steps = [
    {
      title: 'Welcome to my VS Code-themed Portfolio!',
      description:
        'This site is designed to look and function like Visual Studio Code, providing an interactive developer experience. Navigate through my portfolio as if you were browsing a code project!',
      icon: <MousePointer className="h-5 w-5 text-[#007acc]" />,
    },
    {
      title: 'Sidebar Navigation',
      description:
        'The left sidebar contains icons similar to VS Code. Click on Explorer to browse files, Search to find content, and Source Control to see my GitHub projects. Each icon opens a different panel with unique content.',
      icon: <Sidebar className="h-5 w-5 text-[#007acc]" />,
      additionalIcons: [
        <Files key="files" className="h-4 w-4 text-[#858585]" />,
        <Search key="search" className="h-4 w-4 text-[#858585]" />,
        <Code key="code" className="h-4 w-4 text-[#858585]" />,
      ],
    },
    {
      title: 'File Explorer',
      description:
        "In the Explorer view, you'll find folders organized like a project structure. Click on folders to expand them and files to open content. My portfolio sections are organized as directories and files.",
      icon: <Files className="h-5 w-5 text-[#007acc]" />,
      additionalInfo:
        'Try clicking on folders like "About Me", "Projects", or "Resume" to see their contents.',
    },
    {
      title: 'Tabs & Editor',
      description:
        'As you navigate through the site, files will open as tabs in the editor area. You can have multiple tabs open simultaneously and switch between them, just like in VS Code.',
      icon: <Layers className="h-5 w-5 text-[#007acc]" />,
      additionalInfo:
        'Click on the "×" icon on a tab to close it, or click on different tabs to switch between open files.',
    },
    {
      title: 'Mobile Navigation',
      description:
        'On mobile devices, the interface adapts to smaller screens. Use the menu icon in the top right to access navigation options and the sidebar content.',
      icon: <Menu className="h-5 w-5 text-[#007acc]" />,
      additionalInfo:
        'The mobile experience preserves the VS Code aesthetic while making navigation touch-friendly.',
    },
    // {
    //   title: 'Settings & Theme',
    //   description:
    //     'You can customize your experience using the settings menu. Change between light and dark themes or adjust other preferences just like in VS Code.',
    //   icon: <Settings className="h-5 w-5 text-[#007acc]" />,
    //   additionalInfo:
    //     'Look for theme options in the View menu or use keyboard shortcuts for a personalized experience.',
    // },
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
            {steps[currentStep].additionalInfo && (
              <p className="mt-2 text-[#858585]">
                {steps[currentStep].additionalInfo}
              </p>
            )}
            {steps[currentStep].additionalIcons && (
              <div className="mt-2 flex items-center gap-3">
                {steps[currentStep].additionalIcons.map((icon, i) => (
                  <div
                    key={i}
                    className="flex h-6 w-6 items-center justify-center rounded bg-[#252526]"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            )}
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
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  size="sm"
                  onClick={handleBack}
                  variant="outline"
                  className="whitespace-nowrap border-[#333333] bg-[#252526] text-[#bbbbbb] hover:bg-[#2a2d2e] hover:text-white"
                >
                  <span className="flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-180" /> Back
                  </span>
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Link href="/vscode/readme" onClick={handleReadmeClick}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="whitespace-nowrap border-[#333333] bg-[#252526] text-[#bbbbbb] hover:bg-[#2a2d2e] hover:text-white"
                  >
                    <span className="flex items-center">
                      <BookOpen className="mr-1 h-3 w-3" /> View Full Guide
                    </span>
                  </Button>
                </Link>
              )}
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
