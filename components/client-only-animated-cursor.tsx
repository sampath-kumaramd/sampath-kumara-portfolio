'use client';

import { useEffect, useState } from 'react';
import AnimatedCursor from 'react-animated-cursor';

export function ClientOnlyAnimatedCursor() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const isMobile =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth <= 768;
    setShouldRender(!isMobile);

    // Optional: Add resize listener to handle orientation changes
    const handleResize = () => {
      setShouldRender(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatedCursor
      innerSize={15}
      outerSize={15}
      color="80, 186, 191"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link',
        {
          target: '.custom',
        },
      ]}
    />
  );
}
