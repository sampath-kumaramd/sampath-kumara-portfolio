import Image from 'next/image';
import React from 'react';

type Education = {
  duration: string;
  institute: string;
  subject: string;
  result: string;
};

function AboutMeSection() {
  const Education: Education[] = [
    {
      duration: 'Expected in 2025',
      institute: 'University of Moratuwa',
      subject: 'BSc (Hons.) in Information Technology',
      result: 'CGPA - 3.18',
    },
    {
      duration: '2019',
      institute: 'G.C.E. Advance Level',
      subject: 'Physical Science Stream',
      result: "1 A , 2 B's",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          <div className="inset-0 z-10 transition-opacity duration-300">
            <Image
              src="/home/hero.svg"
              alt="hero"
              className="h-96 w-auto rounded-full"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-center text-4xl md:col-span-6">
          Hey there! It&apos;s me, Sampath.
        </div>
      </div>
      <div className="mt-10 text-fontGray">
        I am a passionate and dedicated software engineer with a strong
        foundation in computer science and a passion for building innovative
        solutions. I thrive on challenges and constantly seek opportunities to
        expand my knowledge and skills.
      </div>
    </div>
  );
}

export default AboutMeSection;
