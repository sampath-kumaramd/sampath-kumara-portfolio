import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieConsentState {
  hasConsented: boolean;
  hasSeenGuide: boolean;
  hasSeenMobileAdvisory: boolean;
  setHasConsented: (consent: boolean) => void;
  setHasSeenGuide: (seen: boolean) => void;
  setHasSeenMobileAdvisory: (seen: boolean) => void;
}

export const useCookieConsent = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasConsented: false,
      hasSeenGuide: false,
      hasSeenMobileAdvisory: false,
      setHasConsented: (consent) => set({ hasConsented: consent }),
      setHasSeenGuide: (seen) => set({ hasSeenGuide: seen }),
      setHasSeenMobileAdvisory: (seen) => set({ hasSeenMobileAdvisory: seen }),
    }),
    {
      name: 'cookie-consent',
    }
  )
);
