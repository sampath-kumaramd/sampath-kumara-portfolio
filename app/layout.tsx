'use client';

import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { CookieConsent } from '@/components/cookie-consent';
import { UserGuide } from '@/components/user-guide';
import { MobileAdvisory } from '@/components/mobile-advisory';
import AnimatedCursor from 'react-animated-cursor';
import { siteConfig } from './metadata.config';
import VSCodeLayout from '@/components/vscode/layout';
import { useEffect, useState } from 'react';

const inter = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--font-jetbrainsMono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-white.png" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
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
          {!isMobile && (
            <AnimatedCursor
              innerSize={15}
              outerSize={15}
              color="80, 186, 191"
              outerAlpha={0.2}
              innerScale={0.7}
              outerScale={5}
              clickables={[
                'a',
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                'label[for]',
                'select',
                'textarea',
                'button',
                '.link',
                {
                  target: '.custom',
                },
              ]}
            />
          )}
          <VSCodeLayout>{children}</VSCodeLayout>
          <Toaster />
          <CookieConsent />
          <UserGuide />
          <MobileAdvisory />
        </ThemeProvider>
      </body>
    </html>
  );
}
