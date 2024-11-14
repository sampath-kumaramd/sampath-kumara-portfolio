import Image from "next/image";
import React from "react";
import NumberTicker from "../ui/number-ticker";
import HyperText from "../ui/hyper-text";
import BoxReveal from "../ui/box-reveal";
import { Button } from "../ui/button";
import { MarqueeIcons } from "./icon-marquee";

type HeroSectionFooter = {
  count: number;
  title: string;
};

type SocialMediaSection = {
  name: string;
  href: string;
  icon: string;
};

const HeroSection = () => {
  const HeroSectionFooter: HeroSectionFooter[] = [
    { count: 3, title: "Years of experience" },
    { count: 21, title: "Projects contributed" },
    { count: 8, title: "Tecknologies mastered" },
    { count: 496, title: "Code commits" },
  ];

  const SocialMediaSection: SocialMediaSection[] = [
    {
        name: "Email",
        href: "https://gmail.com",
        icon: "/icons/mail.svg",
    },
    {
      name: "Github",
      href: "https://github.com",
      icon: "/icons/github.svg",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: "/icons/linkedin.svg",
    },
  ];

  return (
    <div className="container mx-auto grid grid-rows-4 pt-8 gap-20 my-16">
      <div className="grid row-span-3 sm:grid-cols-5 grid-cols-1 gap-0">
        <div className="space-y-10 col-span-3">
           <HyperText
      className="text-4xl font-bold text-black dark:text-white"
            text="Web developer"
            duration={300}
            
    />
          <div className="text-4xl sm:text-7xl space-y-3 font-semibold">
              <div className="text-white text-[5rem]">Hello I&apos;m</div>
      <BoxReveal boxColor={"#029ba3"} duration={0.5}>
              <div className="text-fontSecondary text-[5rem]">Sampath Kumara</div>
            </BoxReveal>
          </div>
          <div className="text-fontGray">
            I&apos;m excel at creating elegant websites. <br /> I am proficient
            in varioud programing languages and <br />
            technologies.
          </div>
          <div className="flex gap-4">
            <button className="py-2 px-6 border-2 text-fontSecondary border-fontSecondary rounded-full">
              Download CV
            </button>
            <div className="flex gap-4 items-center justify-center">
              {SocialMediaSection.map((item, index) => (
                <button
                  key={index}
                  className="flex justify-center items-center border-2 border-fontSecondary rounded-full w-12 h-12"
                >
                  <Image
                    unoptimized
                    src={item.icon || "/icons/facebook.svg"}
                    alt={item.name}
                    className="h-5 w-auto "
                    width={40}
                    height={40}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid items-center col-span-2 justify-end">
            {/* <Image
                unoptimized
                src="/home/hero.svg"
                alt="hero"
                className="h-96 w-auto rounded-full border-2 border-fontSecondary border-dashed"
                width={400}
                height={400}
            /> */}
          <MarqueeIcons/>
        </div>
      </div>
      <div className="grid row-span-1 grid-cols-4 items-end gap-28">
        {HeroSectionFooter.map((items, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="col-span-1 text-6xl font-semibold">
                    <NumberTicker value={items.count} decimalPlaces={0} />
            </div>
            <div className="col-span-2">{items.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
