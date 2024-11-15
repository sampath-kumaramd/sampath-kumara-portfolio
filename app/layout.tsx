import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navBar';

const inter = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
  variable: '--font-jetbrainsMono',
});

export const metadata: Metadata = {
  title: 'Sampath Kumara | Portfolio',
  description: 'Created by Sampath Kumara',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
