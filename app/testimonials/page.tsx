'use client';
import React, { useEffect, useState, useRef } from 'react';

import { Code2, GitBranch, Globe, Terminal } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Testimonial } from '@/types/testimonial';
import { testimonials } from '@/lib/data/testimonial';

const TestimonialCard: React.FC<Testimonial> = ({
  content,
  link,
  author,
  role,
  avatar,
  date,
  rating,
  platform,
  verificationStatus,
  projectType,
  country,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setHasOverflow(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [content]);

  return (
    <div className="perspective-1000 h-full">
      <Card className="relative h-full transform overflow-hidden rounded-xl border border-gray-100/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(125,125,125,0.1)] dark:border-gray-50/[.05] dark:from-gray-900/90 dark:to-gray-800/80">
        <div className="flex h-8 items-center justify-between bg-gray-800 px-3 dark:bg-gray-900">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-medium text-gray-400">
            {platform} - {projectType}
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${
                  i < rating ? 'text-Secondary' : 'text-gray-500'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <CardContent className="relative flex h-full flex-col justify-between gap-4 p-6">
          <div className="absolute left-0 top-8 flex h-[calc(100%-2rem)] flex-col items-end border-r border-gray-700/50 bg-gray-800/30 px-2 py-4 text-xs text-gray-500 dark:border-gray-700/50 dark:bg-gray-800/30">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="mb-1.5">
                {i + 1}
              </div>
            ))}
          </div>

          <div className="space-y-4 pl-8">
            <div className="flex items-center gap-2">
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
              <span className="text-xs font-medium text-gray-400">
                {verificationStatus.charAt(0).toUpperCase() +
                  verificationStatus.slice(1)}
              </span>
            </div>

            <div className="relative">
              <p
                ref={contentRef}
                className={`font-mono relative z-10 max-h-[17rem] text-base leading-relaxed text-gray-300 transition-all duration-300 dark:text-gray-300 ${
                  isExpanded ? 'overflow-y-auto' : 'overflow-hidden'
                }`}
              >
                {content.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line.split(' ').map((word, j) => {
                      let className = '';
                      // Highlight positive feedback and skills
                      if (
                        word.match(
                          /\b(excellent|outstanding|amazing|great|good|impressive|skilled|dedicated|professional|quick|responsive|reliable|thorough|committed|organized|collaborative|leadership|efficient|innovative|proficiency|expertise|talented|valuable|recommended|quality|exceeded|expectations|impressive|smart|fascinatingly|enjoyable|enlightening|successful|happy|kindness|friendly|patient|high-quality|couldn't be happier|highly recommend|top-quality|easy to work with|glad|lovely|dream|truth|bonus|heart)\b/i
                        )
                      ) {
                        className = 'text-Secondary font-semibold';
                      }
                      // Technical skills and frameworks - keep these highlighted
                      else if (
                        word.match(
                          /\b(React|Next\.js|Angular|MERN|Node|JavaScript|TypeScript|UI|UX|MongoDB|Express|API|frontend|backend|full-stack|responsive|CSS|HTML|Figma)\b/i
                        )
                      ) {
                        className = 'text-blue-400';
                      }
                      return (
                        <span key={j} className={className}>
                          {word}{' '}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </p>
              {hasOverflow && (
                <button
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    if (isExpanded && contentRef.current) {
                      contentRef.current.scrollTop = 0;
                    }
                  }}
                  className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  {isExpanded ? '// Collapse' : '// Expand'}
                </button>
              )}
            </div>
          </div>

          <div className="mt-auto border-t border-gray-700 pb-4 ps-4 pt-4">
            <div className="flex items-center gap-4">
              {avatar && (
                <Image
                  src={avatar}
                  alt={author}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-gray-700 shadow-sm"
                />
              )}
              {!avatar && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-xl font-semibold text-gray-300">
                  {author.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-mono font-semibold text-gray-200">
                  {author} {country ? `(${country})` : ''}
                </h3>
                <p className="text-sm text-gray-400">{role}</p>
                <p className="mt-1 text-xs text-gray-500">
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
};

const ClientTestimonialsCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    <section className="relative flex min-h-[90vh] flex-col justify-center md:pt-0">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center">
          <span className="text-4xl font-bold text-blue-400 sm:text-5xl">
            {`// What people say about me`}
          </span>
          <span className="font-mono mt-6 block text-lg font-normal text-gray-400">
            {`// Discover why people love working with me`}
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
                  country={testimonial.country}
                  link={testimonial.link}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
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
