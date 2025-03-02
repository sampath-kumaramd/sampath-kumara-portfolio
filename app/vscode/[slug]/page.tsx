'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { FileCode, FileJson, FileText } from 'lucide-react';

export default function VSCodeSlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Function to determine what content to show based on the slug
  const renderContent = () => {
    switch (slug) {
      case 'package-json':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileJson size={20} className="text-[#CBCB41]" />
              <h2 className="text-lg font-semibold">package.json</h2>
            </div>
            <pre className="overflow-auto rounded bg-[#1e1e1e] p-4 text-sm">
              {`{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.292.0",
    "next": "14.0.3",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.3",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}`}
            </pre>
          </div>
        );

      case 'next-config':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileText size={20} className="text-[#519ABA]" />
              <h2 className="text-lg font-semibold">next.config.js</h2>
            </div>
            <pre className="overflow-auto rounded bg-[#1e1e1e] p-4 text-sm">
              {`/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig`}
            </pre>
          </div>
        );

      case 'tailwind-config':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileText size={20} className="text-[#519ABA]" />
              <h2 className="text-lg font-semibold">tailwind.config.js</h2>
            </div>
            <pre className="overflow-auto rounded bg-[#1e1e1e] p-4 text-sm">
              {`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
            </pre>
          </div>
        );

      case 'tsconfig-json':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileJson size={20} className="text-[#CBCB41]" />
              <h2 className="text-lg font-semibold">tsconfig.json</h2>
            </div>
            <pre className="overflow-auto rounded bg-[#1e1e1e] p-4 text-sm">
              {`{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`}
            </pre>
          </div>
        );

      case 'components':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileCode size={20} className="text-[#4EC9B0]" />
              <h2 className="text-lg font-semibold">Components Directory</h2>
            </div>
            <p className="mb-4 text-[#bbbbbb]">
              This directory contains all the reusable components used
              throughout the application.
            </p>
            <ul className="list-disc pl-6 text-[#bbbbbb]">
              <li>UI components</li>
              <li>Layout components</li>
              <li>Feature components</li>
            </ul>
          </div>
        );

      case 'lib':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileCode size={20} className="text-[#4EC9B0]" />
              <h2 className="text-lg font-semibold">Lib Directory</h2>
            </div>
            <p className="mb-4 text-[#bbbbbb]">
              This directory contains utility functions and shared code.
            </p>
            <ul className="list-disc pl-6 text-[#bbbbbb]">
              <li>utils.ts - Utility functions</li>
              <li>data.ts - Static data and constants</li>
            </ul>
          </div>
        );

      case 'layout':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileCode size={20} className="text-[#4EC9B0]" />
              <h2 className="text-lg font-semibold">app/layout.tsx</h2>
            </div>
            <pre className="overflow-auto rounded bg-[#1e1e1e] p-4 text-sm">
              {`import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'A showcase of my work and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}`}
            </pre>
          </div>
        );

      case 'global-css':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileText size={20} className="text-[#CE9178]" />
              <h2 className="text-lg font-semibold">app/globals.css</h2>
            </div>
            <pre className="overflow-auto rounded bg-[#1e1e1e] p-4 text-sm">
              {`@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  min-height: 100vh;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
`}
            </pre>
          </div>
        );

      case 'public':
        return (
          <div className="p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileCode size={20} className="text-[#4EC9B0]" />
              <h2 className="text-lg font-semibold">Public Directory</h2>
            </div>
            <p className="mb-4 text-[#bbbbbb]">
              This directory contains static assets that are served directly.
            </p>
            <ul className="list-disc pl-6 text-[#bbbbbb]">
              <li>images/ - Image assets</li>
              <li>favicon.ico - Site favicon</li>
            </ul>
          </div>
        );

      default:
        return (
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">
              File not found: {slug}
            </h2>
            <p className="text-[#bbbbbb]">
              The file or directory you&apos;re looking for doesn&apos;t exist
              or hasn&apos;t been implemented yet.
            </p>
          </div>
        );
    }
  };

  return <div className="h-full overflow-auto">{renderContent()}</div>;
}
