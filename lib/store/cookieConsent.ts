import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieConsentState {
  hasConsented: boolean;
  hasSeenGuide: boolean;
  setHasConsented: (consent: boolean) => void;
  setHasSeenGuide: (seen: boolean) => void;
}

export const useCookieConsent = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasConsented: false,
      hasSeenGuide: false,
      setHasConsented: (consent) => set({ hasConsented: consent }),
      setHasSeenGuide: (seen) => set({ hasSeenGuide: seen }),
    }),
    {
      name: 'cookie-consent',
    }
  )
);
