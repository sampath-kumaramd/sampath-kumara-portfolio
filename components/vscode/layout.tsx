'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Files,
  Search,
  GitBranch,
  Play,
  Bug,
  ExternalLink,
  Settings,
  User,
  Home,
  Code,
  FileCode,
  Mail,
  Star,
  ChevronDown,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  Square,
} from 'lucide-react';

interface VSCodeLayoutProps {
  children: React.ReactNode;
}

export default function VSCodeLayout({ children }: VSCodeLayoutProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isExplorerOpen, setExplorerOpen] = useState(true);
  const [isExplorerFolderOpen, setExplorerFolderOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarIcons = [
    { icon: Files, href: '/explorer', tooltip: 'Explorer' },
    { icon: Search, href: '/search', tooltip: 'Search' },
    { icon: GitBranch, href: '/git', tooltip: 'Source Control' },
    { icon: Play, href: '/run', tooltip: 'Run and Debug' },
    { icon: ExternalLink, href: '/extensions', tooltip: 'Extensions' },
  ];

  const bottomIcons = [
    { icon: User, href: '/about-me', tooltip: 'About Me' },
    { icon: Settings, href: '/settings', tooltip: 'Settings' },
  ];

  const explorerItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Code, label: 'Projects', href: '/projects' },
    { icon: FileCode, label: 'Resume', href: '/resume' },
    { icon: Star, label: 'Testimonials', href: '/testimonials' },
    { icon: Mail, label: 'Contact', href: '/contact-us' },
  ];

  const menuItems = [
    { label: 'File', href: '#' },
    { label: 'Edit', href: '#' },
    { label: 'Selection', href: '#' },
    { label: 'View', href: '#' },
    { label: 'Go', href: '#' },
    { label: 'Run', href: '#' },
    { label: 'Terminal', href: '#' },
    { label: 'Help', href: '#' },
  ];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1e1e1e] text-white">
      {/* Top Menu Bar */}
      <div className="flex h-8 items-center justify-between border-b border-[#333333] bg-[#252526] px-2 text-xs">
        <div className="flex items-center">
          <div className="mr-2 flex h-full items-center">
            <div className="h-4 w-4 bg-[#007acc]"></div>
          </div>
          <div className="hidden gap-4 md:flex">
            {menuItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <span className="cursor-pointer px-1 hover:bg-[#2a2d2e]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          <button
            className="flex items-center md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="cursor-pointer px-1 hover:bg-[#2a2d2e]">Menu</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden h-7 w-64 items-center rounded bg-[#3c3c3c] px-2 sm:flex">
            <Search size={14} className="mr-2 text-[#858585]" />
            <span className="text-[#858585]">New folder</span>
          </div>
          <div className="flex gap-4">
            <Minimize2
              size={16}
              className="cursor-pointer text-[#858585] hover:text-white"
            />
            <Square
              size={16}
              className="cursor-pointer text-[#858585] hover:text-white"
            />
            <X
              size={16}
              className="cursor-pointer text-[#858585] hover:text-white"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-8 z-50 border-b border-[#333333] bg-[#252526] py-2 md:hidden">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className="px-4 py-2 hover:bg-[#2a2d2e]">{item.label}</div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (left sidebar with icons) */}
        <div className="flex w-12 flex-shrink-0 flex-col items-center justify-between border-r border-[#333333] bg-[#252526] py-2">
          <div className="flex flex-col items-center gap-4">
            {sidebarIcons.map((item, index) => (
              <Link href={item.href} key={index}>
                <div className="group relative">
                  <div
                    className={cn(
                      'flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-[#2a2d2e]',
                      pathname === item.href &&
                        'border-l-2 border-[#007acc] bg-[#37373d]'
                    )}
                    onClick={(e) => {
                      if (item.href === '/explorer') {
                        e.preventDefault();
                        setExplorerOpen(!isExplorerOpen);
                      }
                    }}
                  >
                    <item.icon
                      size={24}
                      className="text-[#858585] group-hover:text-white"
                    />
                  </div>
                  <div className="absolute left-12 top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded bg-[#252526] px-2 py-1 text-xs group-hover:block">
                    {item.tooltip}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            {bottomIcons.map((item, index) => (
              <Link href={item.href} key={index}>
                <div className="group relative">
                  <div
                    className={cn(
                      'flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-[#2a2d2e]',
                      pathname === item.href &&
                        'border-l-2 border-[#007acc] bg-[#37373d]'
                    )}
                  >
                    <item.icon
                      size={24}
                      className="text-[#858585] group-hover:text-white"
                    />
                  </div>
                  <div className="absolute left-12 top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded bg-[#252526] px-2 py-1 text-xs group-hover:block">
                    {item.tooltip}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Explorer Sidebar */}
        {isExplorerOpen && (
          <div className="hidden w-60 flex-shrink-0 overflow-y-auto border-r border-[#333333] bg-[#252526] sm:block">
            <div className="p-2 text-xs font-medium uppercase text-[#bbbbbb]">
              EXPLORER
            </div>

            <div className="mt-2">
              <div
                className="flex cursor-pointer items-center px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]"
                onClick={() => setExplorerFolderOpen(!isExplorerFolderOpen)}
              >
                {isExplorerFolderOpen ? (
                  <ChevronDown size={16} className="mr-1" />
                ) : (
                  <ChevronRight size={16} className="mr-1" />
                )}
                <span>NEW FOLDER</span>
              </div>

              {isExplorerFolderOpen && (
                <div className="ml-4 mt-1">
                  {explorerItems.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <div
                        className={cn(
                          'flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]',
                          pathname === item.href
                            ? 'bg-[#37373d] text-white'
                            : 'text-[#bbbbbb]'
                        )}
                      >
                        <item.icon size={14} />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="cursor-pointer px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]">
                <span>OUTLINE</span>
              </div>
              <div className="cursor-pointer px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]">
                <span>TIMELINE</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Explorer Drawer */}
        {isExplorerOpen && (
          <div className="absolute bottom-6 left-12 top-8 z-40 w-64 overflow-y-auto border-r border-[#333333] bg-[#252526] sm:hidden">
            <div className="flex items-center justify-between p-2 text-xs font-medium uppercase text-[#bbbbbb]">
              <span>EXPLORER</span>
              <X
                size={16}
                className="cursor-pointer text-[#858585] hover:text-white"
                onClick={() => setExplorerOpen(false)}
              />
            </div>

            <div className="mt-2">
              <div
                className="flex cursor-pointer items-center px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]"
                onClick={() => setExplorerFolderOpen(!isExplorerFolderOpen)}
              >
                {isExplorerFolderOpen ? (
                  <ChevronDown size={16} className="mr-1" />
                ) : (
                  <ChevronRight size={16} className="mr-1" />
                )}
                <span>NEW FOLDER</span>
              </div>

              {isExplorerFolderOpen && (
                <div className="ml-4 mt-1">
                  {explorerItems.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      onClick={() => setExplorerOpen(false)}
                    >
                      <div
                        className={cn(
                          'flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]',
                          pathname === item.href
                            ? 'bg-[#37373d] text-white'
                            : 'text-[#bbbbbb]'
                        )}
                      >
                        <item.icon size={14} />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#1e1e1e]">
          {/* Tab Bar */}
          <div className="flex h-9 items-center overflow-x-auto border-b border-[#333333] bg-[#252526]">
            <div className="flex h-full items-center">
              <div
                className={cn(
                  'flex h-full items-center gap-2 border-t-2 border-transparent bg-[#1e1e1e] px-3 text-xs',
                  pathname === '/' ? 'border-t-[#007acc]' : ''
                )}
              >
                <Home size={14} />
                <span>welcome.tsx</span>
                <X
                  size={14}
                  className="ml-2 cursor-pointer text-[#858585] hover:text-white"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">{children}</div>

          {/* Status Bar */}
          <div className="flex h-6 items-center justify-between border-t border-[#333333] bg-[#007acc] px-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="xs:inline hidden">Launched</span>
              <div className="flex items-center gap-1">
                <span className="rounded bg-[#1e1e1e] px-1">0 ⚠️</span>
                <span className="rounded bg-[#1e1e1e] px-1">0 ❌</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span>Go Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
