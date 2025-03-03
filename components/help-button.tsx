'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { UserGuide } from './user-guide';
import { useCookieConsent } from '@/lib/store/cookieConsent';

export function HelpButton() {
  const [showGuide, setShowGuide] = useState(false);
  const { setHasSeenGuide } = useCookieConsent();

  const handleClick = () => {
    setHasSeenGuide(false);
    setShowGuide(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-[#007acc] p-2 text-white shadow-lg hover:bg-[#007acc]/90"
        aria-label="Help"
      >
        <HelpCircle className="h-5 w-5" />
      </button>
      {showGuide && <UserGuide />}
    </>
  );
}
