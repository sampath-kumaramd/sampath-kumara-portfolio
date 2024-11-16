import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieConsentState {
  hasConsented: boolean;
  setHasConsented: (consent: boolean) => void;
}

export const useCookieConsent = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasConsented: false,
      setHasConsented: (consent) => set({ hasConsented: consent }),
    }),
    {
      name: 'cookie-consent',
    }
  )
);
