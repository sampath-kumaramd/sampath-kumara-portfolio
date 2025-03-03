'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Heart,
  FolderOpen,
  Folder,
  FileJson,
  FileText,
  Image,
  File,
  Coffee,
  Cpu,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Users,
  BookOpen,
} from 'lucide-react';
import SearchComponent from './search';
import SourceControl from './source-control';
import Extensions from './extensions';
import RunDebug from './run-debug';
import VSCodeGuide from './user-guide';
import { projects } from '@/lib/data/projects';
import { skillCategories } from '@/lib/data/skills';
import { useTheme } from 'next-themes';

interface VSCodeLayoutProps {
  children: React.ReactNode;
}

interface ExplorerItem {
  icon?: any;
  label: string;
  href: string;
  isFolder?: boolean;
  isSingleFile?: boolean;
  isWorkspace?: boolean;
  folderState?: boolean;
  setFolderState?: (state: boolean) => void;
  subItems?: ExplorerItem[];
}

export default function VSCodeLayout({ children }: VSCodeLayoutProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [folderStates, setFolderStates] = useState({
    sidebar: false,
    explorer: true,
    explorerFolder: true,
    app: false,
    resume: false,
    contactUs: false,
    projects: false,
    testimonials: false,
    aboutMe: false,
    vscode: false,
    hero: false,
    projectCard: false,
    contactForm: false,
    experience: false,
    education: false,
    techStack: false,
    volunteering: false,
    readme: false,
  });

  const [activeSidebar, setActiveSidebar] = useState('explorer');
  const [openTabs, setOpenTabs] = useState<{ path: string; label: string }[]>([
    { path: '/', label: 'welcome.tsx' },
  ]);
  const [activeTab, setActiveTab] = useState('/');
  const router = useRouter();
  const [showGuide, setShowGuide] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [showRepoIframe, setShowRepoIframe] = useState(false);

  const toggleFolder = (folderName: keyof typeof folderStates) => {
    setFolderStates((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const handleSidebarClick = (id: string) => {
    setActiveSidebar(id);
    // If explorer is clicked, ensure explorer is open
    if (id === 'explorer' && !folderStates.explorer) {
      toggleFolder('explorer');
    }
  };

  const sidebarIcons = [
    { icon: Files, id: 'explorer', tooltip: 'Explorer' },
    { icon: Search, id: 'search', tooltip: 'Search' },
    { icon: GitBranch, id: 'git', tooltip: 'Public Repositories' },
    { icon: Play, id: 'run', tooltip: 'Run and Debug' },
    { icon: ExternalLink, id: 'extensions', tooltip: 'Tools' },
  ];

  const bottomIcons = [
    { icon: User, id: 'about', tooltip: 'About Me' },
    { icon: Settings, id: 'settings', tooltip: 'Settings' },
  ];

  const explorerItems: ExplorerItem[] = [
    {
      icon: Files,
      label: 'about-me',
      href: '/about-me',
      isFolder: true,
      folderState: folderStates.aboutMe,
      setFolderState: () => toggleFolder('aboutMe'),
      subItems: [
        {
          icon: FileCode,
          label: 'page.tsx',
          href: '/about-me',
          isSingleFile: true,
        },
      ],
    },

    {
      icon: Files,
      label: 'tech-stack',
      href: '/tech-stack',
      isFolder: true,
      folderState: folderStates.techStack,
      setFolderState: () => toggleFolder('techStack'),
      subItems: [
        {
          icon: FileCode,
          label: 'page.tsx',
          href: '/tech-stack',
          isSingleFile: true,
        },
      ],
    },
    {
      icon: Files,
      label: 'projects',
      href: '/projects',
      isFolder: true,
      folderState: folderStates.projects,
      setFolderState: () => toggleFolder('projects'),
      subItems: [
        {
          icon: FileCode,
          label: 'page.tsx',
          href: '/projects',
          isSingleFile: true,
        },
      ],
    },
    {
      icon: Files,
      label: 'testimonials',
      href: '/testimonials',
      isFolder: true,
      folderState: folderStates.testimonials,
      setFolderState: () => toggleFolder('testimonials'),
      subItems: [
        {
          icon: FileCode,
          label: 'page.tsx',
          href: '/testimonials',
          isSingleFile: true,
        },
      ],
    },
    {
      icon: Files,
      label: 'contact-me',
      href: '/contact-me',
      isFolder: true,
      folderState: folderStates.contactUs,
      setFolderState: () => toggleFolder('contactUs'),
      subItems: [
        {
          icon: FileCode,
          label: 'page.tsx',
          href: '/contact-me',
          isSingleFile: true,
        },
      ],
    },
    {
      label: 'readme',
      href: '/vscode/readme',
      isSingleFile: true,
    },
  ];

  const menuItems = [
    {
      label: 'Portfolio',
      href: '#',
      subItems: [
        { label: 'Home', href: '/' },
        { label: 'About Me', href: '/about-me' },
        { label: 'Tech Stack', href: '/tech-stack' },
        { label: 'Projects', href: '/projects' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Contact', href: '/contact-me' },
      ],
    },
    {
      label: 'Projects',
      href: '#',
      subItems: projects.slice(0, 5).map((project) => ({
        label: project.name,
        href: `/projects#${project.name.toLowerCase().replace(/\s+/g, '-')}`,
      })),
    },
    {
      label: 'Skills',
      href: '#',
      subItems: skillCategories.slice(0, 6).map((category) => ({
        label: category,
        href: `/tech-stack?category=${category}`,
      })),
    },
    {
      label: 'Contact',
      href: '#',
      subItems: [
        {
          label: 'Email',
          href: 'mailto:mdskumara.info@gmail.com',
          action: 'newTab',
        },
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/sampathkumaramd',
          action: 'newTab',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/sampath-kumaramd',
          action: 'newTab',
        },
      ],
    },
    {
      label: 'View',
      href: '#',
      subItems: [
        // { label: 'VS Code Theme', href: '/vscode' },
        // { label: 'Standard Theme', href: '/' },
        // { label: 'Divider', href: '#', isDivider: true },
        { label: 'Light Theme', href: '#', action: 'setLightTheme' },
        { label: 'Dark Theme', href: '#', action: 'setDarkTheme' },
        { label: 'System Theme', href: '#', action: 'setSystemTheme' },
      ],
    },
    {
      label: 'Help',
      href: '#',
      subItems: [
        { label: 'About This Site', href: '/vscode/readme' },
        { label: 'Navigation Guide', href: '#', action: 'showGuide' },
        {
          label: 'Source Code',
          href: 'https://github.com/sampath-kumaramd/portfolio',
        },
      ],
    },
  ];

  const renderExplorerItem = (
    item: ExplorerItem,
    index: string | number,
    depth = 0
  ) => {
    const isActive = pathname === item.href;
    const Icon = item.isFolder
      ? item.folderState
        ? FolderOpen
        : Folder
      : getFileIcon(item.label);

    return (
      <div key={index}>
        <div
          className={cn(
            'flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-[#2a2d2e]',
            isActive ? 'bg-[#37373d] text-white' : 'text-[#bbbbbb]'
          )}
          onClick={() => {
            if (item.isFolder && item.setFolderState) {
              item.setFolderState(!item.folderState);
              router.push(item.href);
            }
            if (item.isSingleFile) {
              router.push(item.href);
            }
          }}
          style={{ paddingLeft: `${depth * 8 + 8}px` }}
        >
          {item.isFolder &&
            (item.folderState ? (
              <ChevronDown size={14} className="min-w-[14px]" />
            ) : (
              <ChevronRight size={14} className="min-w-[14px]" />
            ))}
          <Icon
            size={14}
            className={cn(
              'min-w-[14px]',
              item.isFolder && item.folderState
                ? 'text-[#dcb862]'
                : item.isFolder
                  ? 'text-[#b4b4b4]'
                  : getFileIconColor(item.label)
            )}
          />
          <span>{item.label}</span>
        </div>

        {item.isFolder && item.folderState && item.subItems && (
          <div>
            {item.subItems.map((subItem, subIndex) =>
              renderExplorerItem(subItem, `${index}-${subIndex}`, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const getFileIcon = (filename: string) => {
    if (filename.endsWith('.tsx') || filename.endsWith('.jsx')) return FileCode;
    if (filename.endsWith('.ts') || filename.endsWith('.js')) return FileText;
    if (filename.endsWith('.json')) return FileJson;
    if (filename.endsWith('.css')) return FileText;
    if (
      filename.endsWith('.ico') ||
      filename.endsWith('.png') ||
      filename.endsWith('.jpg')
    )
      return Image;
    if (filename === 'projects') return Briefcase;
    if (filename === 'testimonials') return MessageSquare;
    if (filename === 'contact-us') return Mail;
    if (filename === 'about-me') return User;
    if (filename === 'experience') return Briefcase;
    if (filename === 'education') return GraduationCap;
    if (filename === 'tech-stack') return Cpu;
    if (filename === 'volunteering') return Users;
    if (filename === 'images') return Image;
    if (filename === 'readme') return BookOpen;
    return File;
  };

  const getFileIconColor = (filename: string) => {
    if (filename.endsWith('.tsx') || filename.endsWith('.jsx'))
      return 'text-[#4EC9B0]';
    if (filename.endsWith('.ts') || filename.endsWith('.js'))
      return 'text-[#519ABA]';
    if (filename.endsWith('.json')) return 'text-[#CBCB41]';
    if (filename.endsWith('.css')) return 'text-[#519ABA]';
    if (filename === 'page.tsx') return 'text-[#4EC9B0]';
    if (filename === 'layout.tsx') return 'text-[#4EC9B0]';
    if (filename === 'readme') return 'text-[#4EC9B0]';
    return 'text-[#bbbbbb]';
  };

  // Function to get file name from path
  const getFileNameFromPath = (path: string) => {
    if (path === '/') return 'welcome.tsx';
    if (path.endsWith('/')) path = path.slice(0, -1);

    const segments = path.split('/');
    const lastSegment = segments[segments.length - 1];

    // Convert route to filename
    if (lastSegment === 'about-me') return 'about-me';
    if (lastSegment === 'projects') return 'projects';
    if (lastSegment === 'testimonials') return 'testimonials';
    if (lastSegment === 'contact-us') return 'contact-us';
    if (lastSegment === 'vscode') {
      if (segments.includes('layout')) return 'layout.tsx';
      if (segments.includes('global-css')) return 'globals.css';
      if (segments.includes('components')) return 'components';
      if (segments.includes('lib')) return 'lib';
      if (segments.includes('public')) return 'public';
      if (segments.includes('package-json')) return 'package.json';
      if (segments.includes('next-config')) return 'next.config.js';
      if (segments.includes('tailwind-config')) return 'tailwind.config.js';
      if (segments.includes('tsconfig-json')) return 'tsconfig.json';
    }

    return `${lastSegment}.tsx`;
  };

  // Function to get icon for tab
  const getTabIcon = (path: string) => {
    if (path === '/') return Home;
    if (path.includes('about-me')) return User;
    if (path.includes('projects')) return Briefcase;
    if (path.includes('testimonials')) return MessageSquare;
    if (path.includes('contact-us')) return Mail;

    const fileName = getFileNameFromPath(path);
    return getFileIcon(fileName);
  };

  // Function to open a new tab
  const openTab = (path: string) => {
    // Check if tab is already open
    if (!openTabs.some((tab) => tab.path === path)) {
      setOpenTabs([
        ...openTabs,
        {
          path,
          label: getFileNameFromPath(path),
        },
      ]);
    }
    setActiveTab(path);
    router.push(path);
  };

  // Function to close a tab
  const closeTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Don't close if it's the last tab
    if (openTabs.length === 1) return;

    const newTabs = openTabs.filter((tab) => tab.path !== path);
    setOpenTabs(newTabs);

    // If we closed the active tab, activate another one
    if (path === activeTab) {
      const newActiveTab = newTabs[newTabs.length - 1].path;
      setActiveTab(newActiveTab);
      router.push(newActiveTab);
    }
  };

  // Update active tab when pathname changes
  React.useEffect(() => {
    // If navigating to a new route, open it as a tab
    if (!openTabs.some((tab) => tab.path === pathname)) {
      openTab(pathname);
    } else {
      setActiveTab(pathname);
    }
  }, [pathname]);

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  // Listen for repository selection from the SourceControl component
  useEffect(() => {
    // Check pathname changes directly instead of using router events
    if (pathname.includes('/vscode/repository/')) {
      const repoName = pathname.split('/').pop() || null;
      setSelectedRepo(repoName);
      setShowRepoIframe(true);
    } else {
      setShowRepoIframe(false);
    }
  }, [pathname]); // Watch pathname changes instead of using router events

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1e1e1e] text-white">
      {/* Top Menu Bar */}
      <div className="flex h-8 items-center justify-between border-b border-[#333333] bg-[#252526] px-2 text-xs">
        <div className="flex items-center">
          <div className="mr-2 flex h-full items-center">
            <div className="h-4 w-4 text-[#007acc]"> SK </div>
          </div>
          <div className="flex gap-4">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-dropdown relative">
                <div
                  className="cursor-pointer px-1 hover:bg-[#2a2d2e]"
                  onClick={(e) => toggleDropdown(item.label, e)}
                >
                  <span>{item.label}</span>
                </div>

                {openDropdown === item.label && item.subItems && (
                  <div className="absolute left-0 top-full z-50 min-w-[180px] rounded border border-[#333333] bg-[#252526] py-1 shadow-lg">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        href={subItem.href}
                        key={subIndex}
                        target={
                          subItem.action === 'newTab' ? '_blank' : undefined
                        }
                        onClick={(e) => {
                          if (subItem.action === 'showGuide') {
                            e.preventDefault();
                            setShowGuide(true);
                          } else if (subItem.action === 'setLightTheme') {
                            e.preventDefault();
                            setTheme('light');
                          } else if (subItem.action === 'setDarkTheme') {
                            e.preventDefault();
                            setTheme('dark');
                          } else if (subItem.action === 'setSystemTheme') {
                            e.preventDefault();
                            setTheme('system');
                          }
                          // Don't close dropdown immediately to prevent event conflicts
                          setTimeout(() => setOpenDropdown(null), 100);
                        }}
                      >
                        <div
                          className={cn(
                            'cursor-pointer px-4 py-1 text-xs text-[#bbbbbb] hover:bg-[#2a2d2e] hover:text-white',
                            // subItem.isDivider ? "border-b border-[#333333] pb-1 mb-1" : "",
                            theme === 'light' &&
                              subItem.action === 'setLightTheme'
                              ? 'text-[#007acc]'
                              : '',
                            theme === 'dark' &&
                              subItem.action === 'setDarkTheme'
                              ? 'text-[#007acc]'
                              : '',
                            theme === 'system' &&
                              subItem.action === 'setSystemTheme'
                              ? 'text-[#007acc]'
                              : ''
                          )}
                        >
                          {/* {subItem.isDivider ? "" : subItem.label} */}
                          {subItem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex h-7 w-64 items-center rounded bg-[#3c3c3c] px-2">
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

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (left sidebar with icons) */}
        <div className="flex w-12 flex-col items-center justify-between border-r border-[#333333] bg-[#252526] py-2">
          <div className="flex flex-col items-center gap-4">
            {sidebarIcons.map((item, index) => (
              <div key={index} className="group relative">
                <div
                  className={cn(
                    'flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-[#2a2d2e]',
                    activeSidebar === item.id &&
                      'border-l-2 border-[#007acc] bg-[#37373d]'
                  )}
                  onClick={() => handleSidebarClick(item.id)}
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
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            {bottomIcons.map((item, index) => (
              <div key={index} className="group relative">
                <div
                  className={cn(
                    'flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-[#2a2d2e]',
                    activeSidebar === item.id &&
                      'border-l-2 border-[#007acc] bg-[#37373d]'
                  )}
                  onClick={() => handleSidebarClick(item.id)}
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
            ))}
          </div>
        </div>

        {/* Explorer Sidebar */}
        {activeSidebar === 'explorer' && folderStates.explorer && (
          <div className="w-60 overflow-y-auto border-r border-[#333333] bg-[#252526]">
            <div className="p-2 text-xs font-medium uppercase text-[#bbbbbb]">
              EXPLORER
            </div>

            <div className="mt-2">
              <div
                className="flex cursor-pointer items-center px-2 py-1 text-xs font-medium text-[#bbbbbb] hover:bg-[#2a2d2e]"
                onClick={() => toggleFolder('explorerFolder')}
              >
                {folderStates.explorerFolder ? (
                  <ChevronDown size={16} className="mr-1" />
                ) : (
                  <ChevronRight size={16} className="mr-1" />
                )}
                <span>PORTFOLIO-WORKSPACE</span>
              </div>

              {folderStates.explorerFolder && (
                <div className="ml-4 mt-1">
                  {explorerItems.map((item, index) =>
                    renderExplorerItem(item, index)
                  )}
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="px-2 py-1 text-xs font-medium text-[#bbbbbb]">
                <span>OUTLINE</span>
              </div>
              <div className="mt-2 px-4 text-xs text-[#bbbbbb]">
                <span>No symbols found</span>
              </div>
            </div>
          </div>
        )}
        {activeSidebar === 'search' && (
          <div className="w-60 overflow-y-auto border-r border-[#333333]">
            <SearchComponent />
          </div>
        )}

        {activeSidebar === 'git' && (
          <div className="w-60 overflow-y-auto border-r border-[#333333]">
            <SourceControl />
          </div>
        )}

        {activeSidebar === 'extensions' && (
          <div className="w-72 overflow-y-auto border-r border-[#333333]">
            <Extensions />
          </div>
        )}

        {activeSidebar === 'run' && (
          <div className="w-60 overflow-y-auto border-r border-[#333333]">
            <RunDebug />
          </div>
        )}

        {/* Main Content Area */}
        {(activeSidebar === 'explorer' ||
          activeSidebar === 'search' ||
          activeSidebar === 'git') && (
          <div className="flex flex-1 flex-col overflow-hidden bg-[#1e1e1e]">
            <div className="flex h-9 items-center overflow-x-auto border-b border-[#333333] bg-[#252526]">
              <div className="flex h-full items-center">
                {openTabs.map((tab) => {
                  const TabIcon = getTabIcon(tab.path);
                  return (
                    <div
                      key={tab.path}
                      className={cn(
                        'flex h-full cursor-pointer items-center gap-2 border-t-2 border-transparent px-3 text-xs',
                        tab.path === activeTab
                          ? 'border-t-[#007acc] bg-[#1e1e1e]'
                          : 'bg-[#2d2d2d] hover:bg-[#2a2a2a]'
                      )}
                      onClick={() => {
                        setActiveTab(tab.path);
                        router.push(tab.path);
                      }}
                    >
                      <TabIcon
                        size={14}
                        className={getFileIconColor(tab.label)}
                      />
                      <span>{tab.label}</span>
                      <X
                        size={14}
                        className="ml-2 cursor-pointer text-[#858585] hover:text-white"
                        onClick={(e) => closeTab(tab.path, e)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-auto">{children}</div>

            <div className="flex h-6 items-center justify-between border-t border-[#333333] bg-[#007acc] px-2 text-xs">
              <div className="flex items-center gap-2">
                <span>Launched</span>
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
        )}
      </div>

      {showGuide && (
        <VSCodeGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
      )}
    </div>
  );
}
