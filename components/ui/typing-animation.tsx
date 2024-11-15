'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  texts: string[];
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  texts,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    const typingEffect = setInterval(() => {
      if (i < currentText.length) {
        setDisplayedText(currentText.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
        setTimeout(() => {
          setI(0);
          setDisplayedText('');
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, currentTextIndex, texts]);

  return (
    <h1
      className={cn(
        'font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm',
        className
      )}
    >
      {displayedText ? displayedText : texts[currentTextIndex]}
    </h1>
  );
}
