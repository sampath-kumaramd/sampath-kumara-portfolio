'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ContributionGraph } from '@/components/github/contribution-graph';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

type Education = {
  duration: string;
  institute: string;
  subject: string;
  result: string;
};

type WorkExperience = {
  position: string;
  company: string;
  duration: string;
  description: string[];
};

type Project = {
  name: string;
  description: string;
  contribution: string;
  client?: string;
  duration?: string;
  technologies: string[];
  demo?: string;
};

const AboutMe: React.FC = () => {
  const searchParams = useSearchParams();
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'summary' | 'experience' | 'education' | 'projects'
  >('summary');

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (
      tab &&
      (tab === 'summary' ||
        tab === 'experience' ||
        tab === 'education' ||
        tab === 'projects')
    ) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  const education: Education[] = [
    {
      duration: 'Expected in 2025',
      institute: 'University of Moratuwa',
      subject: 'B.Sc.(Hons.) in Information Technology',
      result: 'CGPA : 3.1',
    },
  ];

  const workExperience: WorkExperience[] = [
    {
      position: 'Software Engineer Intern',
      company: 'Aizenit',
      duration: 'January 2024 - July 2024',
      description: [
        "Engineered feature enhancements for Geniaez's product using Angular, improving overall user experience and reducing client-reported bugs.",
        'Implemented new functionalities such as payment integrations, chatbot features, and mobile application development with Angular Capacitor.',
        'Contributed to content creation, user support, and codebase optimization, including work on Smart Table and Smart Tagger libraries with Angular.',
      ],
    },
    {
      position: 'Freelance Software Engineer - Level Two Seller',
      company: 'Fiverr',
      duration: 'October 2023 - Present',
      description: [
        'Delivered 45+ web development projects for international clients with a 99% satisfaction rate while maintaining a 5/5 seller rating.',
        'Spearheaded development of responsive web applications using Next.js, React, and Tailwind CSS, reducing average project delivery time by 20% through efficient component architecture.',
        'Established systematic project management workflow that ensured 98% on-time delivery rate while handling multiple concurrent projects.',
      ],
    },
    {
      position: 'Software Engineer Intern (Part-time)',
      company: 'AsyncDot',
      duration: 'July 2023 - March 2024',
      description: [
        'Built and maintained projects including a customizable POS system using Next.js, Node.js and React Native.',
        'Implemented efficient backend solutions using MedusaJS while integrating and consuming REST APIs.',
        'Collaborated on frontend development using React.js, T4 app, Next.js and Tailwind CSS ensuring responsive and user-friendly interfaces across web and mobile platforms.',
      ],
    },
  ];

  return (
    <>
      <div className="grid min-h-[90vh] grid-cols-12 gap-4">
        {/* Right section - Output (takes full width when code is hidden) */}
        <div
          className={`col-span-12 bg-[#1e1e1e] p-4 ${showCode ? 'md:col-span-6' : ''}`}
        >
          {/* Navigation Tabs */}
          <div className="border-b border-[#333333] bg-[#252526]">
            <nav className="-mb-px flex space-x-0">
              {['summary', 'experience', 'education'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`${
                    activeTab === tab
                      ? 'border-t-2 border-t-[#007acc] bg-[#1e1e1e] text-white'
                      : 'border-transparent bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2a2a] hover:text-white'
                  } border-r border-[#333333] px-4 py-2 text-xs font-medium capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'summary' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-[#bbbbbb]"
              >
                <div className="mt-8 grid grid-cols-12">
                  <div className="col-span-12 md:col-span-4">
                    <div className="inset-0 z-10 flex justify-center transition-opacity duration-300">
                      <Image
                        src="/sampath.png"
                        alt="hero"
                        className="h-60 w-60 rounded-full border-2 border-[#333333] object-cover"
                        width={240}
                        height={240}
                        priority
                      />
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                      <h1 className="text-2xl font-bold text-white">
                        Sampath Kumara
                      </h1>
                      <p className="text-[#858585]">Software Engineer</p>
                      <div className="mt-2 flex space-x-3">
                        <a
                          href="mailto:mdskumara.info@gmail.com"
                          className="text-[#007acc] hover:text-[#007acc]/80"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </a>
                        <a
                          href="https://github.com/sampath-kumaramd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-800 hover:text-black dark:text-gray-400 dark:hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/sampath-kumaramd/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                        </a>
                        <a
                          href="http://www.sampathkumara.me"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                        </a>
                      </div>
                      <p className="mt-2 text-sm text-[#858585]">
                        +94 76 093 7443
                      </p>
                    </div>
                  </div>
                  <div className="col-span-12 pt-10 md:col-span-8 md:pt-0">
                    <p className="mb-4 text-4xl text-white">
                      Hey there! It&apos;s me, Sampath.
                    </p>
                    <p className="mb-4 text-[#bbbbbb]">
                      I am a highly motivated individual who thrives on taking
                      on challenges and staying productive. Always eager to
                      learn and expand my skills, I excel both in collaborative
                      team environments and when working independently. With
                      enthusiasm and dedication, I always give my best to ensure
                      success in every endeavor I undertake.
                    </p>

                    {/* Add key skills section */}
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-medium text-white">
                        Key Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Next.js',
                          'React',
                          'Angular',
                          'TypeScript',
                          'TailwindCSS',
                          'Shadcn UI',
                          'Node.js',
                          'React Query',
                          'Framer Motion',
                          'React Hook Form',
                          'GraphQL',
                          'Spring Boot',
                          'Tailwind CSS',
                          'MongoDB',
                          'MySQL',
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-[#333333] px-3 py-1 text-sm text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Add professional highlights */}
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-medium text-white">
                        Professional Highlights
                      </h3>
                      <ul className="list-inside list-disc space-y-2">
                        <li>
                          Full-stack developer with expertise in modern
                          JavaScript frameworks
                        </li>
                        <li>
                          Delivered 45+ web development projects with 99% client
                          satisfaction
                        </li>
                        <li>
                          Experience in both freelance and team-based
                          development environments
                        </li>
                        <li>
                          Passionate about creating responsive, user-friendly
                          interfaces
                        </li>
                        <li>
                          Actively contributing to open-source projects on
                          GitHub
                        </li>
                      </ul>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative mt-8 border border-[#333333] bg-[#252526] p-4"
                    >
                      <h3 className="mb-4 text-sm font-medium text-[#858585]">
                        GitHub Contributions
                      </h3>
                      <ContributionGraph className="w-full" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 mt-4 text-xl font-bold text-white">
                  Work Experience
                </h2>
                <div className="space-y-8">
                  {workExperience.map((exp, index) => (
                    <div
                      key={index}
                      className="border border-[#333333] bg-[#252526] p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {exp.position}
                          </h3>
                          <p className="text-[#007acc]">{exp.company}</p>
                        </div>
                        <p className="text-sm text-[#858585]">{exp.duration}</p>
                      </div>
                      <ul className="mt-3 list-inside list-disc space-y-2 text-[#bbbbbb]">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="mb-6 mt-4 text-xl font-bold text-white">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="border border-[#333333] bg-[#252526] p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {edu.subject}
                          </h3>
                          <p className="text-[#007acc]">{edu.institute}</p>
                        </div>
                        <p className="text-sm text-[#858585]">{edu.duration}</p>
                      </div>
                      <p className="mt-2 text-[#bbbbbb]">{edu.result}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-medium text-white">
                    Research and Academic Projects
                  </h3>
                  <div className="border border-[#333333] bg-[#252526] p-4">
                    <h4 className="text-md font-medium text-white">
                      AI-Enhanced Mathematics Learning Framework (Ongoing)
                    </h4>
                    <p className="mt-2 text-[#bbbbbb]">
                      Developing a personalized learning module for visually
                      impaired 9th-grade students in Sri Lanka, utilizing
                      AI-driven content generation, multi-modal delivery
                      methods, and Natural Language Processing. This project
                      aims to tailor educational materials based on visual
                      impairment state and academic performance, potentially
                      revolutionizing access to mathematical content for
                      visually impaired learners.
                    </p>
                  </div>

                  <div className="mt-4 border border-[#333333] bg-[#252526] p-4">
                    <h4 className="text-md font-medium text-white">
                      Supermarket System - Code Base
                    </h4>
                    <p className="mt-2 text-[#bbbbbb]">
                      Architected Scalable online supermarket platform built
                      with modular Spring Boot microservices handling user
                      registration, product management, and order fulfillment.
                      Features real-time inventory synchronization ensuring
                      accurate product availability across multiple store
                      locations.
                    </p>
                    <p className="mt-2 text-sm text-[#858585]">
                      <span className="font-medium text-[#bbbbbb]">
                        Contribution:
                      </span>{' '}
                      Back End Developer |
                      <span className="font-medium text-[#bbbbbb]">
                        {' '}
                        Technologies:
                      </span>{' '}
                      Spring Boot, MySQL
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
