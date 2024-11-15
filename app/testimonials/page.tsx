'use client';
import React, { useEffect, useState } from 'react';

import { QuoteIcon } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
  date: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  content,
  author,
  role,
  avatar,
  date,
}) => (
  <div>
    <Card className="min-h-96 rounded-lg hover:border-bgPrimary hover:bg-fontGray hover:text-bgPrimary">
      <QuoteIcon className="absolute left-16 top-0 h-12 w-12 rotate-180 font-bold text-fontSecondary" />
      <div className="absolute left-16 top-0 h-12 w-12 rotate-180 font-bold text-fontSecondary"></div>
      <CardContent className="grid h-96 grid-rows-3 gap-8 py-12">
        <p className="row-span-2 text-center text-fontGray hover:text-bgPrimary">
          {content}
        </p>
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
                <p className="text-sm text-gray-400">{role}</p>
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
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'Jane Doe',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus. Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'John Smith',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'Emily Johnson',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'Jane Doe',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'John Smith',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'Emily Johnson',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
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
    <section className="sm:0 mt-8 bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-3xl font-bold text-fontSecondary sm:text-5xl">
          What clients say ...
        </h2>
        <Carousel
          setApi={setApi}
          className="mx-auto w-full px-4 sm:px-0"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="p-8 md:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex items-center justify-center">
          {[...Array(count)].map((_, i) => (
            <button
              key={i}
              className={`mx-1 rounded-full ${
                i === current
                  ? 'h-4 w-4 bg-fontSecondary'
                  : 'h-3 w-3 bg-gradient-to-br from-[#f7e5cf] to-[#fcf1dc]'
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
