'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code,
  FileCode,
  Github,
  Mail,
  ExternalLink,
  BookOpen,
  Star,
} from 'lucide-react';
import JsonLd from '@/components/json-ld';
import TypingAnimation from '@/components/ui/typing-animation';
import HeroSection from '@/components/homepage/hero-section';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sampath Kumara',
    jobTitle: 'Full Stack Developer',
    url: 'https://sampathkumara.me',
    sameAs: [
      'https://github.com/sampath-kumaramd',
      'https://linkedin.com/in/sampathkumaramd',
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection />
    </>
  );
}
