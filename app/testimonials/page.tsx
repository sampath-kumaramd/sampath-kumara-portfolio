"use client";
import React, { useEffect, useState } from "react";

import { QuoteIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
  date:string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  content,
  author,
  role,
  avatar,
  date
}) => (
  <div>
    <Card className="min-h-96 hover:bg-fontGray hover:text-bgPrimary hover:border-bgPrimary rounded-lg">
      <QuoteIcon className="text-fontSecondary font-bold absolute top-0 left-16 w-12 h-12 rotate-180" />
      <div className="text-fontSecondary font-bold absolute top-0 left-16 w-12 h-12 rotate-180"></div>
      <CardContent className="grid grid-rows-3 h-96 py-12 gap-8">
      <p className=" row-span-2 text-fontGray text-center hover:text-bgPrimary">{content}</p>
       <div className="row-span-1 mt-6">
       <div className="gap-3">
          <div className="flex gap-3">
            <div>
              <Image
                src={avatar}
                alt={author}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-md font-semibold">{author}</h3>
              <p className="text-gray-400 text-sm">{role}</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-fontSecondary">{date}</div>
        </div>
       </div>
      </CardContent>
    </Card>
  </div>
);

const ClientTestimonialsCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const testimonials = [
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.",
      author: "Jane Doe",
      role: "fievrr client",
      avatar: "/avatars/1.png",
      date:"2021-08-20"
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus. Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.",
      author: "John Smith",
      role: "fievrr client",
      avatar: "/avatars/1.png",
      date:"2021-08-20"
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.",
      author: "Emily Johnson",
      role: "fievrr client",
      avatar: "/avatars/1.png",
      date:"2021-08-20"
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.",
      author: "Jane Doe",
      role: "fievrr client",
      avatar: "/avatars/1.png",
      date:"2021-08-20"
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.",
      author: "John Smith",
      role: "fievrr client",
      avatar: "/avatars/1.png",
      date:"2021-08-20"
    },
    {
      content:
        "Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.",
      author: "Emily Johnson",
      role: "fievrr client",
      avatar: "/avatars/1.png",
      date:"2021-08-20"
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      api?.scrollNext();
    }, 8000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="sm:py-16 py-12 mt-8 sm:0 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="sm:text-5xl text-3xl font-bold text-fontSecondary mb-16">
          What clients say ...
        </h2>
        <Carousel
          setApi={setApi}
          className="w-full px-4 sm:px-0 mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 p-8"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center mt-8 items-center">
          {[...Array(count)].map((_, i) => (
            <button
              key={i}
              className={` rounded-full mx-1 ${
                i === current
                  ? "bg-fontSecondary w-4 h-4 "
                  : "w-3 h-3 bg-gradient-to-br from-[#f7e5cf] to-[#fcf1dc]"
              }`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonialsCarousel;
