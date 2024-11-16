import { useEffect } from 'react';
import { event } from '@/lib/analytics';

export function useScrollTracking() {
  useEffect(() => {
    let scrollDepths = new Set();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      const depths = [25, 50, 75, 100];
      depths.forEach((depth) => {
        if (scrollPercent >= depth && !scrollDepths.has(depth)) {
          scrollDepths.add(depth);
          event({
            action: 'scroll_depth',
            category: 'engagement',
            label: `Scrolled_${depth}%`,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
