'use client';
import React, { useEffect, useState } from 'react';

import { QuoteIcon, Code2, GitBranch, Globe, Terminal } from 'lucide-react';
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
  rating: number;
  platform: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  projectType: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  content,
  author,
  role,
  avatar,
  date,
  rating,
  platform,
  verificationStatus,
  projectType,
}) => (
  <div className="perspective-1000 h-full">
    <Card className="relative h-full transform overflow-hidden rounded-xl border border-gray-100/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(125,125,125,0.1)] dark:border-gray-50/[.05] dark:from-gray-900/50 dark:to-gray-900/30">
      <div className="absolute -right-12 -top-12 h-32 w-32 rotate-45 bg-gradient-to-br from-bgPrimary/20 to-transparent blur-2xl" />
      <div className="absolute -bottom-12 -left-12 h-32 w-32 rotate-45 bg-gradient-to-tr from-Secondary/20 to-transparent blur-2xl" />

      <CardContent className="relative flex h-full flex-col justify-between gap-6 p-8">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-4 top-4">
            <Code2 className="h-4 w-4" />
          </div>
          <div className="absolute right-4 top-4">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="absolute bottom-4 left-4">
            <GitBranch className="h-4 w-4" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Globe className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-full bg-gray-100/50 px-4 py-1.5 dark:bg-gray-800/50">
              <span
                className={`relative flex h-2.5 w-2.5 ${
                  verificationStatus === 'verified'
                    ? 'after:absolute after:inline-flex after:h-full after:w-full after:animate-ping after:rounded-full after:bg-green-400 after:opacity-75'
                    : ''
                }`}
              >
                <span
                  className={`inline-flex h-2.5 w-2.5 rounded-full ${
                    verificationStatus === 'verified'
                      ? 'bg-green-400'
                      : verificationStatus === 'pending'
                        ? 'bg-yellow-400'
                        : 'bg-gray-400'
                  }`}
                />
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {verificationStatus.charAt(0).toUpperCase() +
                  verificationStatus.slice(1)}
              </span>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'text-Secondary' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {platform}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {projectType}
            </span>
          </div>

          <p className="relative z-10 text-lg leading-relaxed text-gray-700 dark:text-gray-200">
            {content}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <Image
              src={avatar}
              alt={author}
              width={56}
              height={56}
              className="rounded-full border-2 border-gray-50 shadow-sm"
            />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                {author}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
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
        'Implemented a complex authentication system with remarkable efficiency. The attention to security details and clean code implementation exceeded our expectations.',
      author: 'Jane Doe',
      role: 'Technical Lead',
      avatar: '/avatars/1.png',
      date: '2024-03-15',
      rating: 5,
      platform: 'Enterprise',
      verificationStatus: 'verified',
      projectType: 'Authentication System',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus. Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'John Smith',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
      rating: 4,
      platform: 'Enterprise',
      verificationStatus: 'pending',
      projectType: 'Authentication System',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'Emily Johnson',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
      rating: 3,
      platform: 'Enterprise',
      verificationStatus: 'unverified',
      projectType: 'Authentication System',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'Jane Doe',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
      rating: 5,
      platform: 'Enterprise',
      verificationStatus: 'verified',
      projectType: 'Authentication System',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'John Smith',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
      rating: 4,
      platform: 'Enterprise',
      verificationStatus: 'pending',
      projectType: 'Authentication System',
    },
    {
      content:
        'Lorem ipsum dolor sit amet consectetur. Orci egestas enim nisi molestie cursus sagittis. enim nisi molestie cursus.',
      author: 'Emily Johnson',
      role: 'fievrr client',
      avatar: '/avatars/1.png',
      date: '2021-08-20',
      rating: 3,
      platform: 'Enterprise',
      verificationStatus: 'unverified',
      projectType: 'Authentication System',
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
    <section className="relative flex min-h-screen flex-col justify-center dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center">
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:text-gray-200 sm:text-5xl">
            What Our Clients Say
          </span>
          <span className="mt-6 block text-lg font-normal text-gray-500 dark:text-gray-200">
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
                <TestimonialCard
                  content={testimonial.content}
                  author={testimonial.author}
                  role={testimonial.role}
                  avatar={testimonial.avatar}
                  date={testimonial.date}
                  rating={testimonial.rating}
                  platform={testimonial.platform}
                  verificationStatus={
                    testimonial.verificationStatus as
                      | 'verified'
                      | 'pending'
                      | 'unverified'
                  }
                  projectType={testimonial.projectType}
                />
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
                  ? 'h-2.5 w-8 bg-Secondary'
                  : 'h-2.5 w-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-500/50 dark:hover:bg-gray-500/70'
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
