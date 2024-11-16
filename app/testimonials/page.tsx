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
  <div className="h-full">
    <Card className="relative h-full transform rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-bgPrimary hover:shadow-lg">
      <QuoteIcon className="absolute left-4 top-4 h-8 w-8 rotate-180 text-bgPrimary opacity-10" />
      <CardContent className="flex h-full flex-col justify-between gap-6 p-8">
        <p className="relative z-10 text-lg leading-relaxed text-gray-700">
          {content}
        </p>
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center gap-4">
            <Image
              src={avatar}
              alt={author}
              width={56}
              height={56}
              className="rounded-full border-2 border-gray-50 shadow-sm"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{author}</h3>
              <p className="text-sm text-gray-600">{role}</p>
              <p className="mt-1 text-xs text-gray-400">{date}</p>
            </div>
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
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center">
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            What Our Clients Say
          </span>
          <span className="mt-6 block text-lg font-normal text-gray-500">
            Discover why people love working with us
          </span>
        </h2>
        <Carousel
          setApi={setApi}
          className="mx-auto w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-12 flex items-center justify-center gap-2">
          {[...Array(count)].map((_, i) => (
            <button
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'h-2.5 w-8 bg-fontSecondary'
                  : 'h-2.5 w-2.5 bg-gray-200 hover:bg-gray-300'
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
