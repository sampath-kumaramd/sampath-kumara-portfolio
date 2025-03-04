import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CookieConsent } from '@/components/cookie-consent';
import { UserGuide } from '@/components/user-guide';
import { MobileAdvisory } from '@/components/mobile-advisory';
import AnimatedCursor from 'react-animated-cursor';
import Script from 'next/script';
import LayoutWrapper from '@/components/layout-wrapper';
import { LayoutSwitcher } from '@/components/layout-switcher';
import { ClientOnlyAnimatedCursor } from '@/components/client-only-animated-cursor';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sampath Kumara - Portfolio',
  description: 'Personal portfolio website of Sampath Kumara',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="check-mobile">
          {`
            function isMobileDevice() {
              return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
            }
            window.isMobile = isMobileDevice();
          `}
        </Script>
        <link rel="icon" href="/logo-white.png" />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Default to denied until consent is given
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientOnlyAnimatedCursor />
          <LayoutWrapper>{children}</LayoutWrapper>
          <LayoutSwitcher />
          <Toaster />
          <CookieConsent />
          <UserGuide />
          <MobileAdvisory />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
