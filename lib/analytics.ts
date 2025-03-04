import { useCookieConsent } from './store/cookieConsent';

declare global {
  interface Window {
    gtag: (
      type: string,
      eventName: string,
      options?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize analytics based on consent
export const enableAnalytics = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Enable analytics tracking
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }
};

// Disable analytics
export const disableAnalytics = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }
};

// Update pageview to check consent
export const pageview = (url: string) => {
  const { hasConsented } = useCookieConsent.getState();

  if (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    hasConsented
  ) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Update event tracking to check consent
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  const { hasConsented } = useCookieConsent.getState();

  if (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    hasConsented
  ) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export {};
