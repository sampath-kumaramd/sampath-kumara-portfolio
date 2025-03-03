'use client';

import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  GitCommit,
  Star,
  GitFork,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Code,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Repository {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updated_at: string;
}

export default function SourceControl() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRepo, setExpandedRepo] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRepositories = async () => {
      setIsLoading(true);
      try {
        // Fetch real data from GitHub API
        const response = await fetch(
          'https://api.github.com/users/sampath-kumaramd/repos?sort=updated&per_page=1000'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();

        // Transform GitHub API data to match our Repository interface
        const repos: Repository[] = data.map((repo: any) => ({
          name: repo.name,
          description: repo.description || 'No description provided',
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || 'Not specified',
          updated_at: repo.updated_at,
        }));

        setRepositories(repos);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        // Fallback to mock data if API fails
        // ... existing mock data code ...
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Java: '#b07219',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
    };

    return colors[language] || '#858585';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const toggleRepo = (repoName: string) => {
    setExpandedRepo(expandedRepo === repoName ? null : repoName);
  };

  const viewRepoCode = (repoUrl: string, repoName: string) => {
    setSelectedRepo(repoName);
    // Navigate to a route that will display the repository code
    router.push(`/vscode/repository/${repoName}`);
  };

  return (
    <div className="flex h-full flex-col bg-[#252526]">
      <div className="p-4">
        <h2 className="mb-4 text-xs font-medium uppercase text-[#bbbbbb]">
          Source Control
        </h2>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-[#bbbbbb]">
            <GitBranch size={16} className="mr-2" />
            <span>GitHub Repositories</span>
          </div>
          <a
            href="https://github.com/sampath-kumaramd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-[#007acc] hover:underline"
          >
            View Profile <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-[#bbbbbb]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="mr-2"
            >
              <GitBranch size={16} />
            </motion.div>
            <span>Loading repositories...</span>
          </div>
        ) : (
          <div className="space-y-1 px-4">
            {repositories.map((repo) => (
              <div
                key={repo.name}
                className="rounded border border-[#333333] bg-[#1e1e1e] text-sm"
              >
                <div
                  className="flex cursor-pointer items-center justify-between p-3 hover:bg-[#2a2d2e]"
                  onClick={() => toggleRepo(repo.name)}
                >
                  <div className="flex items-center">
                    {expandedRepo === repo.name ? (
                      <ChevronDown size={16} className="mr-2 text-[#858585]" />
                    ) : (
                      <ChevronRight size={16} className="mr-2 text-[#858585]" />
                    )}
                    <span className="font-medium text-white">{repo.name}</span>
                  </div>
                  <div className="flex items-center text-xs text-[#858585]">
                    <div className="mr-3 flex items-center">
                      <Star size={14} className="mr-1" />
                      {repo.stars}
                    </div>
                    <div className="flex items-center">
                      <GitFork size={14} className="mr-1" />
                      {repo.forks}
                    </div>
                  </div>
                </div>

                {expandedRepo === repo.name && (
                  <div className="border-t border-[#333333] p-3">
                    <p className="mb-3 text-[#bbbbbb]">{repo.description}</p>
                    <div className="mb-3 flex items-center text-xs">
                      <div
                        className="mr-2 h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: getLanguageColor(repo.language),
                        }}
                      ></div>
                      <span className="mr-4 text-[#bbbbbb]">
                        {repo.language}
                      </span>
                      <span className="text-[#858585]">
                        Updated on {formatDate(repo.updated_at)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center text-xs text-[#858585]">
                        <GitCommit size={14} className="mr-1" />
                        <span>main</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewRepoCode(repo.url, repo.name)}
                          className="flex items-center text-xs text-[#007acc] hover:underline"
                        >
                          View Code <Code size={12} className="ml-1" />
                        </button>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-[#007acc] hover:underline"
                        >
                          View Repository{' '}
                          <ExternalLink size={12} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#333333] bg-[#252526] p-2 text-xs text-[#858585]">
        <div className="flex items-center">
          <GitBranch size={14} className="mr-2" />
          <span>main</span>
        </div>
      </div>
    </div>
  );
}
