'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Smartphone, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useCookieConsent } from '@/lib/store/cookieConsent';
import { event } from '@/lib/analytics';

export function MobileAdvisory() {
  const [isVisible, setIsVisible] = useState(false);
  const { hasSeenMobileAdvisory, setHasSeenMobileAdvisory } =
    useCookieConsent();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Show after a short delay if advisory hasn't been seen and is on mobile
    if (!hasSeenMobileAdvisory) {
      const timer = setTimeout(() => {
        if (window.innerWidth < 768) {
          setIsVisible(true);
          event({
            action: 'mobile_advisory_shown',
            category: 'user_experience',
            label: 'mobile_view',
          });
        }
      }, 1500);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [hasSeenMobileAdvisory]);

  const handleClose = () => {
    setHasSeenMobileAdvisory(true);
    setIsVisible(false);
    event({
      action: 'mobile_advisory',
      category: 'user_experience',
      label: 'closed',
    });
  };

  const handleContinue = () => {
    setHasSeenMobileAdvisory(true);
    setIsVisible(false);
    event({
      action: 'mobile_advisory',
      category: 'user_experience',
      label: 'continue_on_mobile',
    });
  };

  if (!isVisible || !isMobile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed inset-x-4 bottom-4 z-50 rounded-lg border border-[#333333] bg-[#1e1e1e]/95 p-4 shadow-lg backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-[#007acc]" />
              <div className="text-lg font-semibold text-[#bbbbbb]">
                Desktop Experience
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
            <p className="text-[#bbbbbb]">
              This VS Code-themed portfolio is designed for optimal viewing on
              desktop. For the best experience, consider visiting on a larger
              screen.
            </p>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handleContinue}
              className="whitespace-nowrap border-[#333333] bg-[#252526] text-[#bbbbbb] hover:bg-[#2a2d2e] hover:text-white"
            >
              <span className="flex items-center">
                Continue on Mobile <Smartphone className="ml-2 h-3 w-3" />
              </span>
            </Button>
            <Button
              size="sm"
              onClick={handleClose}
              className="whitespace-nowrap bg-[#007acc] text-white hover:bg-[#007acc]/90"
            >
              <span className="flex items-center">
                Got it <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
