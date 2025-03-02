'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '@/lib/store/cookieConsent';
import { Button } from './ui/button';
import { enableAnalytics, event } from '@/lib/analytics';
import { CookieIcon, Code } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { hasConsented, setHasConsented } = useCookieConsent();

  useEffect(() => {
    // Show after a short delay if consent hasn't been given
    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  const handleAccept = () => {
    setHasConsented(true);
    setIsVisible(false);
    event({
      action: 'cookie_consent',
      category: 'engagement',
      label: 'accepted',
    });
    // Enable analytics tracking here
    enableAnalytics();
  };

  const handleDecline = () => {
    setHasConsented(false);
    setIsVisible(false);
    event({
      action: 'cookie_consent',
      category: 'engagement',
      label: 'declined',
    });
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 z-50 max-w-sm rounded-lg border border-[#333333] bg-[#1e1e1e]/95 p-4 shadow-lg backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-[#007acc]" />
              <div className="text-lg font-semibold text-[#bbbbbb]">
                Cookie Settings
              </div>
            </div>
            <CookieIcon className="h-6 w-6 text-[#858585]" />
          </div>
          <div className="text-sm">
            <p className="text-[#bbbbbb]">
              This website uses cookies to enhance your experience and analyze
              site traffic. By clicking &quot;Accept,&quot; you consent to our
              use of cookies.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="whitespace-nowrap border-[#333333] bg-[#252526] text-[#bbbbbb] hover:bg-[#2a2d2e] hover:text-white"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="whitespace-nowrap bg-[#007acc] text-white hover:bg-[#007acc]/90"
            >
              Accept Cookies
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
