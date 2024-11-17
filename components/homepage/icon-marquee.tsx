'use client';

import { cn } from '@/lib/utils';
import Marquee from '../ui/marquee';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Separator } from '../ui/separator';
import { useState, useEffect } from 'react';

const technologies = [
  {
    name: 'Angular',
    img: '/icons/angular.png',
  },
  {
    name: 'Blender',
    img: '/icons/blender.png',
  },
  {
    name: 'CSS',
    img: '/icons/css.png',
  },
  {
    name: 'DigitalOcean',
    img: '/icons/digital-ocean.png',
  },
  {
    name: 'Docker',
    img: '/icons/docker.png',
  },
  {
    name: 'Figma',
    img: '/icons/figma.png',
  },
  {
    name: 'GitHub',
    img: '/icons/github.png',
  },
  {
    name: 'HTML',
    img: '/icons/html.png',
  },
  {
    name: 'Java',
    img: '/icons/java.png',
  },
  {
    name: 'JavaScript',
    img: '/icons/javascript.png',
  },
  {
    name: 'MongoDB',
    img: '/icons/mongo-db.png',
  },
  {
    name: 'MySQL',
    img: '/icons/mysql.png',
  },
  {
    name: 'Next.js',
    img: '/icons/nextjs.png',
  },
  {
    name: 'Nest.js',
    img: '/icons/nestjs.png',
  },
  {
    name: 'Node.js',
    img: '/icons/nodejs.png',
  },
  {
    name: 'Python',
    img: '/icons/python.png',
  },
  {
    name: 'PostgreSQL',
    img: '/icons/postgresql.png',
  },
  {
    name: 'React',
    img: '/icons/react.png',
  },
  {
    name: 'Redis',
    img: '/icons/redis.png',
  },
  {
    name: 'Redux',
    img: '/icons/redux.png',
  },
  {
    name: 'Sass',
    img: '/icons/sass.png',
  },
  {
    name: 'Spring Boot',
    img: '/icons/springboot.png',
  },
  {
    name: 'TypeScript',
    img: '/icons/typescript.png',
  },
  {
    name: 'Tailwind',
    img: '/icons/tailwind.png',
  },
];

const firstRow = technologies.slice(0, technologies.length / 3);
const secondRow = technologies.slice(
  technologies.length / 3,
  (technologies.length / 3) * 2
);
const thirdRow = technologies.slice((technologies.length / 3) * 2);

const mobileFirstRow = technologies.slice(0, technologies.length / 2);
const mobileSecondRow = technologies.slice(technologies.length / 2);

const TechnologyCard = ({ img, name }: { img: string; name: string }) => {
  return (
    <motion.figure
      className={cn(
        'relative w-fit cursor-pointer overflow-hidden rounded-xl border p-2',
        'border-bgSecondery/10 bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
      whileHover={{
        rotateY: 180,
        transition: { duration: 0.6 },
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="flex flex-row items-center gap-2"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <Image
          className="rounded-full"
          width="80"
          height="40"
          sizes="(max-width: 768px) 40px, 80px"
          alt=""
          src={img}
        />
      </motion.div>
    </motion.figure>
  );
};

export function MarqueeIcons() {
  const [showBanner, setShowBanner] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show banner every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBanner(true);
      // Hide banner after 5 seconds
      setTimeout(() => setShowBanner(false), 100);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="relative hidden h-[500px] w-full flex-row items-center justify-center gap-2 overflow-hidden rounded-lg bg-background md:flex">
        <Marquee reverse vertical className="[--duration:19s]">
          {firstRow.map((technology) => (
            <TechnologyCard key={technology.name} {...technology} />
          ))}
        </Marquee>
        <Marquee reverse vertical className="[--duration:21s]">
          {secondRow.map((technology) => (
            <TechnologyCard key={technology.name} {...technology} />
          ))}
        </Marquee>
        <Marquee reverse vertical className="[--duration:20s]">
          {thirdRow.map((technology) => (
            <TechnologyCard key={technology.name} {...technology} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
      </div>
      <div className="flex md:hidden">
        <MarqueeIconsMobile />
      </div>
      <div className="mx-2 hidden text-center text-sm text-muted-foreground md:mx-4 md:block xl:mx-8">
        <Separator className="rounded-md border border-r-2 border-bgSecondery/10 bg-white py-1 dark:border-gray-50/[.10] dark:bg-background" />
        <div className="relative flex w-full items-center justify-center">
          <Image
            alt=""
            src="/box-grid.png"
            width={0}
            height={0}
            sizes="100vw "
            className="absolute left-0 top-0 h-28 w-full"
          />
          <Marquee
            className="absolute left-4 top-0 h-28 text-sm [--duration:2s]"
            vertical
            reverse
          >
            <p className="relative h-4 w-4 rounded-full border border-red-500 bg-red-500 shadow-md">
              &nbsp;
            </p>
            <p className="relative bg-transparent">&nbsp;</p>
            <p className="relative bg-transparent">&nbsp;</p>
          </Marquee>

          <Marquee
            className="absolute left-1/2 top-0 h-28 text-sm [--duration:1s]"
            vertical
            reverse
          >
            <p className="relative bg-transparent">&nbsp;</p>
            <p className="relative h-4 w-4 rounded-full border border-blue-500 bg-blue-500 shadow-md">
              &nbsp;
            </p>
            <p className="relative bg-transparent">&nbsp;</p>
          </Marquee>

          <Marquee
            className="absolute right-4 top-0 h-28 text-sm [--duration:1s]"
            vertical
            reverse
          >
            <p className="relative bg-transparent">&nbsp;</p>
            <p className="relative bg-transparent">&nbsp;</p>
            <p className="relative h-4 w-4 rounded-full border border-green-500 bg-green-500 shadow-md">
              &nbsp;
            </p>
          </Marquee>
        </div>
        <Separator className="mt-28 rounded-md border border-r-2 border-bgSecondery/10 bg-white py-1 dark:border-gray-50/[.10] dark:bg-background" />
      </div>
    </div>
  );
}

function MarqueeIconsMobile() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {mobileFirstRow.map((technology) => (
          <TechnologyCard key={technology.name} {...technology} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {mobileSecondRow.map((technology) => (
          <TechnologyCard key={technology.name} {...technology} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
