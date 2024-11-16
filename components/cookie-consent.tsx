'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '@/lib/store/cookieConsent';
import { Button } from './ui/button';
import { enableAnalytics, event } from '@/lib/analytics';

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
        className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
      >
        <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">
          <div className="text-sm">
            <p>
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
              className="whitespace-nowrap"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="whitespace-nowrap bg-Secondary hover:bg-Secondary/90"
            >
              Accept Cookies
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
