'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import ExperienceSection from '../../components/resume/experienceSection';
import EducationSection from '../../components/resume/educationSection';
import SkillsSection from '../../components/resume/skillsSection';
import VolunteeringSection from '../../components/resume/volunteeringSection';
import AboutMeSection from '@/components/resume/aboutMeSection';
import { MagicCard } from '@/components/ui/magic-card';
import { User, Briefcase, GraduationCap, Code, Heart } from 'lucide-react';

type ResumeSubSection = {
  name: string;
  url: string;
  component: React.ComponentType;
  icon: React.ElementType;
};

const HeroSection: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(
    'About me'
  );

  const ResumeSubSection: ResumeSubSection[] = [
    { name: 'About me', url: '/', component: AboutMeSection, icon: User },
    {
      name: 'Experience',
      url: '/experience',
      component: ExperienceSection,
      icon: Briefcase,
    },
    {
      name: 'Education',
      url: '/education',
      component: EducationSection,
      icon: GraduationCap,
    },
    {
      name: 'Tech Stack',
      url: '/tech-stack',
      component: SkillsSection,
      icon: Code,
    },
    {
      name: 'Volunteering',
      url: '/volunteering',
      component: VolunteeringSection,
      icon: Heart,
    },
  ];

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 gap-8 px-4 pt-4 md:my-16 md:grid-cols-3 md:gap-24 md:px-8 md:pt-8">
      <div className="col-span-1 space-y-8 md:space-y-12">
        <div className="text-4xl font-bold md:text-5xl">Why hire me?</div>
        <div className="text-fontGray">
          Fast learning. <br /> Good communication.
          <br />
          User friendly.
        </div>
        <div className="flex w-full flex-col gap-4 md:gap-8">
          {ResumeSubSection.map((item, index) => (
            <button key={index} onClick={() => setSelectedSection(item.name)}>
              <MagicCard
                className={`cursor-pointer flex-col items-center justify-center whitespace-nowrap px-4 py-2 shadow-md transition-colors md:px-5 md:py-3 ${
                  selectedSection === item.name
                    ? 'bg-[#029ba3d3]'
                    : 'bg-[#029ba313]'
                }`}
                gradientColor={
                  selectedSection === item.name ? '#029ba3' : '#029ba313'
                }
              >
                <div
                  className={`text-lg md:text-xl ${selectedSection === item.name ? 'text-white' : 'text-black'} flex items-center`}
                >
                  {React.createElement(item.icon, {
                    className: 'mr-2',
                    size: 20,
                  })}
                  {item.name}
                </div>
              </MagicCard>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-2">
        {selectedSection !== 'About me' && (
          <h2 className="mb-4 text-xl font-bold md:text-2xl">
            {selectedSection}
          </h2>
        )}
        {React.createElement(
          ResumeSubSection.find((item) => item.name === selectedSection)
            ?.component || ExperienceSection
        )}
      </div>
    </div>
  );
};

export default HeroSection;
