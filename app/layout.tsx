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
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
          <LayoutWrapper>{children}</LayoutWrapper>
          <LayoutSwitcher />
          <Toaster />
          <CookieConsent />
          <UserGuide />
          <MobileAdvisory />
        </ThemeProvider>
      </body>
    </html>
  );
}
