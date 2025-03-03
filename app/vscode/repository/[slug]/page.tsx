'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  FileCode,
  Github,
  ExternalLink,
  Calendar,
  Star,
  GitFork,
  Eye,
  Code,
  Clock,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  readme?: string;
}

export default function RepositoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true);

        // Fetch actual repository data from GitHub API
        const repoResponse = await fetch(
          `https://api.github.com/repos/sampath-kumaramd/${slug}`
        );

        if (!repoResponse.ok) {
          throw new Error(`Repository not found or API limit reached`);
        }

        const repoData = await repoResponse.json();

        // Fetch README content
        let readmeContent = '';
        try {
          const readmeResponse = await fetch(
            `https://api.github.com/repos/sampath-kumaramd/${slug}/readme`
          );
          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            // GitHub returns README content as base64 encoded
            readmeContent = atob(readmeData.content);
          }
        } catch (readmeErr) {
          console.error('Error fetching README:', readmeErr);
          // Continue even if README fetch fails
        }

        const repository: Repository = {
          name: repoData.name,
          description:
            repoData.description || `Repository for ${repoData.name}`,
          html_url: repoData.html_url,
          homepage: repoData.homepage || '',
          stargazers_count: repoData.stargazers_count,
          forks_count: repoData.forks_count,
          watchers_count: repoData.watchers_count,
          language: repoData.language || 'Not specified',
          created_at: repoData.created_at,
          updated_at: repoData.updated_at,
          topics: repoData.topics || [],
          open_issues_count: repoData.open_issues_count,
          owner: {
            login: repoData.owner.login,
            avatar_url: repoData.owner.avatar_url,
          },
          readme: readmeContent,
        };

        setRepository(repository);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching repository:', err);
        setError(
          'Failed to fetch repository data. The repository may not exist or GitHub API rate limit might be reached.'
        );
        setLoading(false);
      }
    };

    fetchRepository();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <RepositorySkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="mb-4 h-16 w-16 text-red-500" />
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Repository Not Found
        </h2>
        <p className="mb-6 text-[#bbbbbb]">{error}</p>
        <Link
          href="/vscode/readme"
          className="flex items-center rounded bg-[#007acc] px-4 py-2 text-white transition-colors hover:bg-[#0066aa]"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (!repository) {
    return null;
  }

  return (
    <div className="h-full overflow-auto bg-[#1e1e1e] p-6">
      {/* VS Code Tab Bar */}
      <div className="mb-6 flex border-b border-[#252526] bg-[#1e1e1e]">
        <div className="flex items-center bg-[#1e1e1e] px-4 py-1 text-sm text-white">
          <FileCode className="mr-2 h-4 w-4 text-[#007acc]" />
          <span className="mr-2">{repository.name}.md</span>
          <span className="ml-2 cursor-pointer text-gray-400 hover:text-white">
            ×
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Repository Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[#333333] pb-6 md:flex-row md:items-center">
          <div className="flex items-center">
            <div className="mr-4 h-16 w-16 overflow-hidden rounded-full border border-[#333333]">
              <Image
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                width={64}
                height={64}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                {repository.name}
              </h1>
              <p className="text-[#bbbbbb]">
                by{' '}
                <span className="text-[#007acc]">{repository.owner.login}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded bg-[#333333] px-3 py-2 text-sm text-white transition-colors hover:bg-[#444444]"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
            {repository.homepage && (
              <a
                href={repository.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded bg-[#007acc] px-3 py-2 text-sm text-white transition-colors hover:bg-[#0066aa]"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Repository Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded border border-[#333333] bg-[#252526] p-4">
            <div className="mb-2 flex items-center text-[#bbbbbb]">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              Stars
            </div>
            <div className="text-2xl font-bold text-white">
              {repository.stargazers_count}
            </div>
          </div>

          <div className="rounded border border-[#333333] bg-[#252526] p-4">
            <div className="mb-2 flex items-center text-[#bbbbbb]">
              <GitFork className="mr-2 h-4 w-4 text-green-500" />
              Forks
            </div>
            <div className="text-2xl font-bold text-white">
              {repository.forks_count}
            </div>
          </div>

          <div className="rounded border border-[#333333] bg-[#252526] p-4">
            <div className="mb-2 flex items-center text-[#bbbbbb]">
              <Eye className="mr-2 h-4 w-4 text-blue-500" />
              Watchers
            </div>
            <div className="text-2xl font-bold text-white">
              {repository.watchers_count}
            </div>
          </div>

          <div className="rounded border border-[#333333] bg-[#252526] p-4">
            <div className="mb-2 flex items-center text-[#bbbbbb]">
              <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
              Issues
            </div>
            <div className="text-2xl font-bold text-white">
              {repository.open_issues_count}
            </div>
          </div>
        </div>

        {/* Repository Details */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4 border-b border-[#333333] bg-transparent">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#007acc] data-[state=active]:bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="readme"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#007acc] data-[state=active]:bg-transparent"
            >
              README
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="rounded border border-[#333333] bg-[#252526] p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">About</h2>
              <p className="mb-6 text-[#bbbbbb]">{repository.description}</p>

              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium text-white">
                  Primary Language
                </h3>
                <Badge className="bg-[#333333] text-white">
                  <Code className="mr-2 h-4 w-4" />
                  {repository.language}
                </Badge>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-lg font-medium text-white">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {repository.topics.map((topic) => (
                    <Badge key={topic} className="bg-[#333333] text-white">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-white">
                    Created
                  </h3>
                  <div className="flex items-center text-[#bbbbbb]">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(repository.created_at)}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-white">
                    Last Updated
                  </h3>
                  <div className="flex items-center text-[#bbbbbb]">
                    <Clock className="mr-2 h-4 w-4" />
                    {formatDate(repository.updated_at)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded border border-[#333333] bg-[#252526] p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Status</h2>
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-[#bbbbbb]">
                  This repository is actively maintained
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="readme">
            <div className="rounded border border-[#333333] bg-[#252526] p-6">
              <div className="prose prose-invert max-w-none">
                {repository.readme?.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return (
                      <h1
                        key={index}
                        className="mb-4 text-2xl font-bold text-white"
                      >
                        {line.substring(2)}
                      </h1>
                    );
                  } else if (line.startsWith('## ')) {
                    return (
                      <h2
                        key={index}
                        className="mb-3 text-xl font-semibold text-white"
                      >
                        {line.substring(3)}
                      </h2>
                    );
                  } else if (line.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-4 text-[#bbbbbb]">
                        {line.substring(2)}
                      </li>
                    );
                  } else if (line === '') {
                    return <br key={index} />;
                  } else if (line === '```bash') {
                    return (
                      <div
                        key={index}
                        className="font-mono mt-2 rounded bg-[#1e1e1e] p-4 text-sm text-[#bbbbbb]"
                      >
                        Code block:
                      </div>
                    );
                  } else if (line === '```') {
                    return <div key={index}></div>;
                  } else {
                    return (
                      <p key={index} className="mb-2 text-[#bbbbbb]">
                        {line}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function RepositorySkeleton() {
  return (
    <div className="h-full overflow-auto bg-[#1e1e1e] p-6">
      <div className="mb-6 flex border-b border-[#252526] bg-[#1e1e1e]">
        <div className="flex items-center bg-[#1e1e1e] px-4 py-1 text-sm text-white">
          <Skeleton className="mr-2 h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[#333333] pb-6 md:flex-row md:items-center">
        <div className="flex items-center">
          <Skeleton className="mr-4 h-16 w-16 rounded-full" />
          <div>
            <Skeleton className="mb-2 h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded" />
          <Skeleton className="h-10 w-32 rounded" />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded" />
        ))}
      </div>

      <div className="mb-4 flex gap-4 border-b border-[#333333]">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>

      <Skeleton className="mb-6 h-64 rounded" />
    </div>
  );
}
