'use client';

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, ArrowDown, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { projects } from '@/lib/data/projects';
import { skills } from '@/lib/data/skills';

// Define the structure for search results
interface SearchResult {
  title: string;
  description: string;
  path: string;
  type: 'page' | 'project' | 'skill' | 'experience';
  icon: React.ReactNode;
  subsection?: string;
}

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const router = useRouter();

  // Generate search data from portfolio content
  const generateSearchData = (): SearchResult[] => {
    const searchData: SearchResult[] = [
      // Pages
      {
        title: 'About Me',
        description:
          'Information about Sampath Kumara, background, education, and professional journey',
        path: '/about-me',
        type: 'page',
        icon: <span className="text-blue-500">📄</span>,
      },
      {
        title: 'Tech Stack',
        description:
          'Skills, technologies, programming languages, and development tools',
        path: '/tech-stack',
        type: 'page',
        icon: <span className="text-green-500">💻</span>,
      },
      {
        title: 'Projects',
        description:
          'Portfolio of work, case studies, and development projects',
        path: '/projects',
        type: 'page',
        icon: <span className="text-purple-500">🚀</span>,
      },
      {
        title: 'Resume',
        description:
          'Professional resume, CV, work history, and qualifications',
        path: '/about-me',
        type: 'page',
        icon: <span className="text-orange-500">📝</span>,
      },
      {
        title: 'Contact',
        description:
          'Contact information, email, social media profiles, and communication channels',
        path: '/about-me',
        type: 'page',
        icon: <span className="text-blue-400">📧</span>,
      },

      {
        title: 'Work Experience',
        description: 'Professional work history and job experiences',
        path: '/about-me',
        subsection: 'experience',
        type: 'experience',
        icon: <span className="text-gray-500">💼</span>,
      },
      {
        title: 'Education Background',
        description: 'Academic qualifications and educational history',
        path: '/about-me',
        subsection: 'education',
        type: 'experience',
        icon: <span className="text-indigo-500">🎓</span>,
      },
      {
        title: 'Professional Summary',
        description: 'Overview of skills, experience, and professional profile',
        path: '/about-me',
        subsection: 'summary',
        type: 'experience',
        icon: <span className="text-blue-500">📋</span>,
      },

      // Career Keywords
      {
        title: 'Software Engineer',
        description:
          'Professional experience and skills as a Software Engineer',
        path: '/about-me',
        type: 'experience',
        icon: <span className="text-gray-500">💼</span>,
      },
      {
        title: 'Full Stack Developer',
        description: 'Experience with both frontend and backend development',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-red-500">⚛️</span>,
      },
      {
        title: 'Frontend Developer',
        description:
          'Specialization in frontend technologies and UI/UX implementation',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-red-500">⚛️</span>,
      },
      {
        title: 'Backend Developer',
        description:
          'Expertise in server-side programming and database management',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-red-500">⚛️</span>,
      },

      // Education and Certifications
      {
        title: 'Education',
        description:
          'Academic background, university degrees, and educational qualifications',
        path: '/about-me',
        type: 'experience',
        icon: <span className="text-indigo-500">🎓</span>,
      },
      {
        title: 'Certifications',
        description: 'Professional certifications and technical qualifications',
        path: '/about-me',
        type: 'experience',
        icon: <span className="text-yellow-600">🏆</span>,
      },

      // Projects from projects data
      ...projects.map((project) => ({
        title: project.name,
        description:
          project.description.substring(0, 100) +
          (project.description.length > 100 ? '...' : ''),
        path: '/projects',
        type: 'project' as const,
        icon: <span className="text-yellow-500">📁</span>,
      })),

      // Skills from skills data
      ...skills.map((skill) => ({
        title: skill.name,
        description: `${skill.category.join(', ')} - ${skill.proficiency}% proficiency`,
        path: '/tech-stack',
        type: 'skill' as const,
        icon: <span className="text-red-500">⚛️</span>,
      })),

      // Common tech keywords (in addition to skills data)
      {
        title: 'JavaScript',
        description:
          'Experience with JavaScript programming language and ecosystem',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-yellow-400">⚛️</span>,
      },
      {
        title: 'React',
        description:
          'Experience with React.js library and component-based architecture',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-blue-400">⚛️</span>,
      },
      {
        title: 'Node.js',
        description: 'Server-side JavaScript runtime environment experience',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-green-500">⚛️</span>,
      },
      {
        title: 'TypeScript',
        description: 'Experience with typed JavaScript development',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-blue-600">⚛️</span>,
      },
      {
        title: 'Cloud Computing',
        description: 'Experience with cloud platforms and services',
        path: '/tech-stack',
        type: 'skill',
        icon: <span className="text-blue-300">⚛️</span>,
      },

      // Experiences
      {
        title: 'Software Engineer Intern',
        description: 'Aizenit - January 2024 - July 2024',
        path: '/about-me',
        type: 'experience',
        icon: <span className="text-gray-500">💼</span>,
      },
      {
        title: 'Freelance Software Developer',
        description: 'Fiverr - October 2023 - Present',
        path: '/about-me',
        type: 'experience',
        icon: <span className="text-gray-500">💼</span>,
      },
      {
        title: 'Software Engineer Intern',
        description: 'AsyncDot - July 2023 - March 2024',
        path: '/about-me',
        type: 'experience',
        icon: <span className="text-gray-500">💼</span>,
      },

      // Soft skills and qualities
      {
        title: 'Team Collaboration',
        description: 'Experience working in collaborative team environments',
        path: '/about-me',
        type: 'skill',
        icon: <span className="text-blue-500">👥</span>,
      },
      {
        title: 'Problem Solving',
        description: 'Strong analytical and problem-solving abilities',
        path: '/about-me',
        type: 'skill',
        icon: <span className="text-purple-500">🧩</span>,
      },
      {
        title: 'Agile Methodology',
        description:
          'Experience with Agile development practices and workflows',
        path: '/about-me',
        type: 'skill',
        icon: <span className="text-green-500">🔄</span>,
      },

      // Portfolio-specific terms
      {
        title: 'Code Samples',
        description: 'Examples of coding work and programming projects',
        path: '/projects',
        type: 'project',
        icon: <span className="text-yellow-500">📁</span>,
      },
      {
        title: 'GitHub',
        description:
          'Links to GitHub repositories and open-source contributions',
        path: '/projects',
        type: 'project',
        icon: <span className="text-gray-500">📁</span>,
      },

      // About Me subsections
    ];

    return searchData;
  };

  const searchData = generateSearchData();

  // Filter search results based on query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call with setTimeout
    const timeoutId = setTimeout(() => {
      const filteredResults = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResultIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
      e.preventDefault();
      router.push(searchResults[selectedResultIndex].path);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#252526]">
      <div className="p-4">
        <h2 className="mb-4 text-xs font-medium uppercase text-[#bbbbbb]">
          Search
        </h2>

        <div className="relative">
          <div className="flex items-center rounded border border-[#3c3c3c] bg-[#3c3c3c] px-3 py-2">
            <SearchIcon size={16} className="mr-2 text-[#858585]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search across portfolio..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#858585]"
            />
            {searchQuery && (
              <X
                size={16}
                className="ml-2 cursor-pointer text-[#858585] hover:text-white"
                onClick={() => setSearchQuery('')}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isSearching ? (
          <div className="flex items-center justify-center py-8 text-[#bbbbbb]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="mr-2"
            >
              <SearchIcon size={16} />
            </motion.div>
            <span>Searching...</span>
          </div>
        ) : searchQuery && searchResults.length === 0 ? (
          <div className="py-4 text-center text-sm text-[#bbbbbb]">
            No results found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="space-y-1">
            {searchResults.map((result, index) => (
              <Link
                href={
                  result.subsection
                    ? `${result.path}?tab=${result.subsection}`
                    : result.path
                }
                key={`${result.title}-${index}`}
              >
                <div
                  className={`flex cursor-pointer items-start rounded px-3 py-2 text-sm ${
                    selectedResultIndex === index
                      ? 'bg-[#37373d] text-white'
                      : 'text-[#bbbbbb] hover:bg-[#2a2d2e]'
                  }`}
                  onClick={() => setSelectedResultIndex(index)}
                >
                  <div className="mr-2 mt-0.5">{result.icon}</div>
                  <div>
                    <div className="font-medium">{result.title}</div>
                    <div className="text-xs text-[#858585]">
                      {result.description}
                    </div>
                    <div className="mt-1 text-xs text-[#007acc]">
                      {result.type === 'page' && 'Page'}
                      {result.type === 'project' && 'Project'}
                      {result.type === 'skill' && 'Skill'}
                      {result.type === 'experience' && 'Experience'}
                      {result.subsection && ` • ${result.subsection} tab`}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="border-t border-[#333333] bg-[#252526] p-2 text-xs text-[#858585]">
          <div className="flex items-center justify-between">
            <div>
              {searchResults.length} result
              {searchResults.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center">
              <span className="mr-2">Navigate:</span>
              <div className="flex items-center">
                <ArrowUp size={14} className="mr-1" />
                <ArrowDown size={14} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
