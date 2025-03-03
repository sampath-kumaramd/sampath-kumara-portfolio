'use client';

import React, { useState } from 'react';
import { ExternalLink, Search, Star, Download, Check, X } from 'lucide-react';
import { skills } from '@/lib/data/skills';
import { technologies } from '@/lib/data/technologies';
import Image from 'next/image';

interface ExtensionProps {
  name: string;
  description: string;
  publisher: string;
  icon: React.ReactNode;
  downloads: string;
  rating: number;
  installed?: boolean;
  link?: string;
}

export default function Extensions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('recommended');
  const [installedExtensions, setInstalledExtensions] = useState<string[]>([]);

  // Convert skills to extensions format
  const skillExtensions: ExtensionProps[] = skills.map((skill) => ({
    name: skill.name,
    description: `${skill.name} - ${skill.category.join(', ')}`,
    publisher: 'Tech Stack',
    icon: <skill.Icon className="h-8 w-8 text-[#007acc]" />,
    downloads: `${Math.floor(Math.random() * 1000) + 100}K`,
    rating: skill.proficiency / 20,
    installed: skill.proficiency > 70,
    link: skill.link,
  }));

  // Convert technologies to extensions format
  const techExtensions: ExtensionProps[] = technologies.map((tech) => ({
    name: tech.name,
    description: `${tech.name} technology`,
    publisher: 'Technologies',
    icon: (
      <div className="h-8 w-8 overflow-hidden rounded">
        <Image src={tech.img} alt={tech.name} width={32} height={32} />
      </div>
    ),
    downloads: `${Math.floor(Math.random() * 1000) + 100}K`,
    rating: Math.random() * 2 + 3, // Random rating between 3 and 5
    installed: Math.random() > 0.5,
  }));

  // Combine all extensions
  const allExtensions = [...skillExtensions, ...techExtensions];

  // Filter extensions based on search query
  const filteredExtensions = allExtensions.filter(
    (ext) =>
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter extensions based on active category
  const displayedExtensions = filteredExtensions.filter((ext) => {
    if (activeCategory === 'recommended') return true;
    if (activeCategory === 'installed')
      return installedExtensions.includes(ext.name) || ext.installed;
    return false;
  });

  const toggleInstall = (extensionName: string) => {
    setInstalledExtensions((prev) =>
      prev.includes(extensionName)
        ? prev.filter((name) => name !== extensionName)
        : [...prev, extensionName]
    );
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                  ? 'fill-yellow-400 text-yellow-400 opacity-50'
                  : 'text-[#858585]'
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col bg-[#252526]">
      <div className="p-4">
        <h2 className="mb-4 text-xs font-medium uppercase text-[#bbbbbb]">
          Extensions
        </h2>

        <div className="relative mb-4">
          <div className="flex items-center rounded border border-[#3c3c3c] bg-[#3c3c3c] px-3 py-2">
            <Search size={16} className="mr-2 text-[#858585]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search extensions..."
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

        <div className="mb-4 flex border-b border-[#333333]">
          <button
            className={`px-4 py-2 text-xs font-medium ${
              activeCategory === 'recommended'
                ? 'border-b-2 border-[#007acc] text-white'
                : 'text-[#bbbbbb] hover:text-white'
            }`}
            onClick={() => setActiveCategory('recommended')}
          >
            Recommended
          </button>
          <button
            className={`px-4 py-2 text-xs font-medium ${
              activeCategory === 'installed'
                ? 'border-b-2 border-[#007acc] text-white'
                : 'text-[#bbbbbb] hover:text-white'
            }`}
            onClick={() => setActiveCategory('installed')}
          >
            Installed
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {displayedExtensions.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#bbbbbb]">
            {searchQuery
              ? `No extensions found for "${searchQuery}"`
              : 'No extensions available'}
          </div>
        ) : (
          <div className="space-y-4">
            {displayedExtensions.map((extension, index) => (
              <div
                key={`${extension.name}-${index}`}
                className="flex rounded border border-[#333333] bg-[#1e1e1e] p-3 hover:bg-[#2a2d2e]"
              >
                <div className="mr-3">{extension.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{extension.name}</h3>
                    {extension.link ? (
                      <a
                        href={extension.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-[#007acc] hover:underline"
                      >
                        Learn More <ExternalLink size={12} className="ml-1" />
                      </a>
                    ) : (
                      <button
                        className={`flex items-center rounded px-2 py-1 text-xs ${
                          installedExtensions.includes(extension.name) ||
                          extension.installed
                            ? 'bg-[#333333] text-[#bbbbbb]'
                            : 'bg-[#007acc] text-white hover:bg-[#007acc]/90'
                        }`}
                        onClick={() => toggleInstall(extension.name)}
                      >
                        {installedExtensions.includes(extension.name) ||
                        extension.installed ? (
                          <>
                            <Check size={12} className="mr-1" /> Installed
                          </>
                        ) : (
                          <>
                            <Download size={12} className="mr-1" /> Install
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-[#bbbbbb]">
                    {extension.description}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#858585]">
                    <div>{extension.publisher}</div>
                    <div className="flex items-center">
                      {renderStars(extension.rating)}
                      <span className="ml-2">{extension.downloads}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#333333] bg-[#252526] p-2 text-xs text-[#858585]">
        <div className="flex items-center justify-between">
          <span>
            {displayedExtensions.length} extension
            {displayedExtensions.length !== 1 ? 's' : ''}
          </span>
          <span>
            {installedExtensions.length +
              displayedExtensions.filter((ext) => ext.installed).length}{' '}
            installed
          </span>
        </div>
      </div>
    </div>
  );
}
