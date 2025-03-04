'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {
  FileCode,
  FileJson,
  FileText,
  ExternalLink,
  Github,
  Mail,
  Code,
} from 'lucide-react';
import Link from 'next/link';

export default function VSCodeSlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Function to determine what content to show based on the slug
  const renderContent = () => {
    switch (slug) {
      case 'readme':
        return (
          <div className="mx-auto max-w-4xl p-4">
            <h2 className="mb-4 text-2xl font-semibold text-[#007acc]">
              Welcome to My VS Code-Themed Portfolio
            </h2>

            <p className="mb-6 text-[#bbbbbb]">
              This website is designed to mimic the VS Code interface, providing
              a unique and interactive way to explore my work and skills as a
              developer.
            </p>

            <h3 className="mb-3 mt-8 text-xl font-semibold text-white">
              Navigation Guide
            </h3>

            <div className="space-y-6 text-[#bbbbbb]">
              <div className="rounded border border-[#333333] bg-[#252526] p-4">
                <h4 className="mb-2 flex items-center text-lg font-medium text-white">
                  <Code className="mr-2 h-5 w-5 text-[#007acc]" />
                  Sidebar Navigation
                </h4>
                <p className="mb-2">
                  Use the sidebar icons on the left to navigate between
                  different sections:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Explorer</strong> - Browse through the main sections
                    of my portfolio
                  </li>
                  <li>
                    <strong>Search</strong> - Find specific content across the
                    site
                  </li>
                  <li>
                    <strong>Source Control</strong> - View my GitHub
                    repositories
                  </li>
                  <li>
                    <strong>Extensions</strong> - Explore my tech stack and
                    skills
                  </li>
                </ul>
              </div>

              <div className="rounded border border-[#333333] bg-[#252526] p-4">
                <h4 className="mb-2 flex items-center text-lg font-medium text-white">
                  <FileText className="mr-2 h-5 w-5 text-[#007acc]" />
                  File Explorer
                </h4>
                <p className="mb-2">
                  In the Explorer view, you&apos;ll find folders organized like
                  a project structure:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>About Me</strong> - Learn about my background and
                    experience
                  </li>
                  <li>
                    <strong>Projects</strong> - Browse through my portfolio of
                    work
                  </li>
                  <li>
                    <strong>Resume</strong> - View my professional experience
                    and skills
                  </li>
                  <li>
                    <strong>Contact</strong> - Get in touch with me
                  </li>
                </ul>
                <p className="mt-2">
                  Click on any file to open it in the editor area.
                </p>
              </div>

              <div className="rounded border border-[#333333] bg-[#252526] p-4">
                <h4 className="mb-2 flex items-center text-lg font-medium text-white">
                  <FileCode className="mr-2 h-5 w-5 text-[#007acc]" />
                  Editor Tabs
                </h4>
                <p>
                  As you navigate through the site, files will open as tabs in
                  the editor area. You can switch between open tabs by clicking
                  on them, or close tabs using the × icon.
                </p>
              </div>

              <div className="rounded border border-[#333333] bg-[#252526] p-4">
                <h4 className="mb-2 flex items-center text-lg font-medium text-white">
                  <FileJson className="mr-2 h-5 w-5 text-[#007acc]" />
                  Mobile Navigation
                </h4>
                <p>
                  On mobile devices, use the menu icon in the top right to
                  access navigation options. The interface adapts to smaller
                  screens while maintaining the VS Code aesthetic.
                </p>
              </div>
            </div>

            <h3 className="mb-3 mt-8 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Link
                href="/about-me"
                className="flex items-center rounded border border-[#333333] bg-[#252526] p-3 transition-colors hover:bg-[#2a2d2e]"
              >
                <div className="mr-3 rounded-full bg-[#007acc]/20 p-2">
                  <FileText className="h-5 w-5 text-[#007acc]" />
                </div>
                <span className="text-[#bbbbbb]">About Me</span>
              </Link>

              <Link
                href="/projects"
                className="flex items-center rounded border border-[#333333] bg-[#252526] p-3 transition-colors hover:bg-[#2a2d2e]"
              >
                <div className="mr-3 rounded-full bg-[#007acc]/20 p-2">
                  <Code className="h-5 w-5 text-[#007acc]" />
                </div>
                <span className="text-[#bbbbbb]">Projects</span>
              </Link>

              <Link
                href="/testimonials"
                className="flex items-center rounded border border-[#333333] bg-[#252526] p-3 transition-colors hover:bg-[#2a2d2e]"
              >
                <div className="mr-3 rounded-full bg-[#007acc]/20 p-2">
                  <FileCode className="h-5 w-5 text-[#007acc]" />
                </div>
                <span className="text-[#bbbbbb]">Testimonials</span>
              </Link>

              <Link
                href="/contact-me"
                className="flex items-center rounded border border-[#333333] bg-[#252526] p-3 transition-colors hover:bg-[#2a2d2e]"
              >
                <div className="mr-3 rounded-full bg-[#007acc]/20 p-2">
                  <Mail className="h-5 w-5 text-[#007acc]" />
                </div>
                <span className="text-[#bbbbbb]">Contact Me</span>
              </Link>
            </div>

            {/* <div className="mt-8 rounded border border-[#333333] bg-[#252526] p-4">
              <h4 className="mb-2 text-lg font-medium text-white">
                Need Help?
              </h4>
              <p className="text-[#bbbbbb]">
                Look for the help button in the bottom right corner of the
                screen for a guided tour of the interface.
              </p>
            </div> */}

            <div className="mt-8 flex items-center justify-between">
              <div className="text-[#bbbbbb]">
                <p>Thanks for visiting my portfolio!</p>
                <p className="mt-1 text-sm text-[#858585]">
                  © {new Date().getFullYear()} Sampath Kumara
                </p>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/sampath-kumaramd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bbbbbb] hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:mdskumara.info@gmail.com"
                  className="text-[#bbbbbb] hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                </a>
                {/* <a
                  href="http://www.sampathkumara.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bbbbbb] hover:text-white"
                >
                  <ExternalLink className="h-5 w-5" />
                </a> */}
              </div>
            </div>
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
