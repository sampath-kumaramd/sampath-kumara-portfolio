import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

interface ProjectProps {
  name: string;
  description: string;
  image: string;
  skills: {
    name: string;
  }[];
  github_link?: string;
  hosted_link?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  name,
  description,
  image,
  skills,
  github_link,
  hosted_link,
}) => (
  <div className="grid grid-cols-2 my-16 ">
    <div className="col-span-1 space-y-3">
      <p className="text-3xl font-bold">{name}</p>
      <p className="text-md text-fontGray">{description}</p>
      <div className="flex gap-3 pt-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-fontSecondary text-white p-2 text-xs rounded-full"
          >
            {skill.name}
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-12">
        {github_link && (
          <a
            href={github_link}
            target="_blank"
            className="bg-fontSecondary text-white p-2 rounded-md"
          >
           View code
          </a>
        )}
        {hosted_link && (
          <a
            href={hosted_link}
            target="_blank"
            className="border border-fontSecondary text-white p-2 rounded-md"
          >
            Live demo
          </a>
        )}
      </div>
    </div>
    <div className="col-span-1 ms-12 ">
      <Image
        unoptimized
        src={image || "/icons/facebook.svg"}
        alt={name}
        className="h-72 w-auto rounded-xl "
        width={200}
        height={100}
      />
    </div>
  </div>
);

const projects: ProjectProps[] = [
  {
    name: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/projects/dohm.png",
    skills: [{ name: "React" }, { name: "Next.js" }, { name: "TailwindCSS" }],
    github_link: "https://github.com",
    hosted_link: "https://github.com",
  },
  {
    name: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/projects/dohm.png",
    skills: [{ name: "React" }, { name: "Next.js" }, { name: "TailwindCSS" }],
    github_link: "https://github.com",
    hosted_link: "https://github.com",
  },
  {
    name: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/projects/dohm.png",
    skills: [{ name: "React" }, { name: "Next.js" }, { name: "TailwindCSS" }],
    github_link: "https://github.com",
    hosted_link: "https://github.com",
  },
];

function page() {
  return (
    <div className="container mx-auto py-16">
      <p className="text-4xl font-bold text-fontSecondary mb-12">
        Projects I have done
      </p>
      <div>
        {projects.map((project, index) => (
          <div key={index}>
            <ProjectCard {...project} />
            <Separator className="bg-bgSecondery" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
