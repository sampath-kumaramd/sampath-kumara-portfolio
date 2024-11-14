"use client";

import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";
import Image from "next/image";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";

const technologies = [
  {
    name: "Angular",
    img: "/icons/angular.png",
  },
  {
    name: "Blender",
    img: "/icons/blender.png",
  },
  {
    name: "CSS",
    img: "/icons/css.png",
  },
  {
    name: "DigitalOcean",
    img: "/icons/digital-ocean.png",
  },
  {
    name: "Docker",
    img: "/icons/docker.png",
  },
  {
    name: "Figma",
    img: "/icons/figma.png",
  },
  {
    name: "GitHub",
    img: "/icons/github.png",
  },
  {
    name: "HTML",
    img: "/icons/html.png",
  },
  {
    name: "Java",
    img: "/icons/java.png",
  },
  {
    name: "JavaScript",
    img: "/icons/javascript.png",
  },
  {
    name: "MongoDB",
    img: "/icons/mongo-db.png",
  },
  {
    name: "MySQL",
    img: "/icons/mysql.png",
  },
  {
    name: "Next.js",
    img: "/icons/nextjs.png",
  },
  {
    name:"Nest.js",
    img: "/icons/nestjs.png",
  },
  {
    name: "Node.js",
    img: "/icons/nodejs.png",
  },
  {
    name: "Python",
    img: "/icons/python.png",
  },
  {
    name: "PostgreSQL",
    img: "/icons/postgresql.png",
  },
  {
    name: "React",
    img: "/icons/react.png",
  },
  {
    name: "Redis",
    img: "/icons/redis.png",
  },
  {
    name: "Redux",
    img: "/icons/redux.png",
  },
  {
    name: "Sass",
    img: "/icons/sass.png",
  },
  {
    name: "Spring Boot",
    img: "/icons/springboot.png",
  },
  {
    name: "TypeScript",
    img: "/icons/typescript.png",
  },
  {
    name: "Tailwind",
    img: "/icons/tailwind.png",
  },
];

const firstRow = technologies.slice(0, technologies.length / 3);
const secondRow = technologies.slice(technologies.length / 3, technologies.length / 3 * 2);
const thirdRow = technologies.slice(technologies.length / 3 * 2);

const TechnologyCard = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <motion.figure
      className={cn(
        "relative w-fit cursor-pointer overflow-hidden rounded-xl border p-2",
        " border-bgSecondery/10 bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
      whileHover={{ 
        rotateY: 180,
        transition: { duration: 0.6 }
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div 
        className="flex flex-row items-center gap-2"
        style={{ backfaceVisibility: "hidden" }}
      >
        <Image className="rounded-full" width="80" height="40" alt="" src={img} />
      </motion.div>
    </motion.figure>
  );
};

export function MarqueeIcons() {
  const [showBanner, setShowBanner] = useState(false);

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
    <div>
     

      <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-lg bg-background gap-2 ">
        <Marquee reverse vertical className="[--duration:20s]">
          {firstRow.map((technology) => (
            <TechnologyCard key={technology.name} {...technology} />
          ))}
        </Marquee>
        <Marquee reverse vertical className="[--duration:20s]">
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
      <div className="text-center text-sm text-muted-foreground ">
        <Separator className="py-1 bg-white dark:bg-background border border-bgSecondery/10 border-r-2 rounded-md" />
        <div className="flex items-center justify-center w-full relative ">
          <Image 
            alt="" 
            src="/box-grid.png"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto absolute top-0 left-0"
          />
          <Marquee className="text-sm absolute top-0 left-4 [--duration:2s] h-28 " vertical reverse >
              <p  className="relative  bg-transparent">
                &nbsp;
            </p>
            <p className="relative bg-red-500 w-4 h-4 rounded-full border border-red-500 shadow-md">
              &nbsp;
            </p>
            <p className="relative bg-transparent">
              &nbsp;
            </p>
          </Marquee>

           <Marquee className="text-sm absolute top-0 left-1/2 [--duration:2s] h-28 " vertical reverse >
              <p  className="relative  bg-transparent">
                &nbsp;
            </p>
            <p className="relative bg-blue-500 w-4 h-4 rounded-full border border-blue-500 shadow-md">
              &nbsp;
            </p>
            <p className="relative bg-transparent">
              &nbsp;
            </p>
          </Marquee>

           <Marquee className="text-sm absolute top-0 right-4 [--duration:2s] h-28 " vertical reverse >
              <p  className="relative  bg-transparent">
                &nbsp;
            </p>
            <p className="relative bg-green-500 w-4 h-4 rounded-full border border-green-500 shadow-md">
              &nbsp;
            </p>
            <p className="relative bg-transparent">
              &nbsp;
            </p>
          </Marquee>

        </div>
        <Separator className="mt-28 py-1 bg-white dark:bg-background border border-bgSecondery/10 border-r-2 rounded-md" />
      </div>


      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showBanner ? 0 : -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 text-center shadow-lg"
      >
        <p className="font-medium">🎉 Welcome to my portfolio! Check out my latest projects!</p>
      </motion.div>
    </div>
  );
}
