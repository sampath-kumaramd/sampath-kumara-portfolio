import { useEffect } from 'react';

export function useCursorVisibility() {
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Show default cursor when leaving window
    const handleMouseLeave = () => {
      document.body.style.cursor = 'auto';
    };

    // Hide default cursor when entering window
    const handleMouseEnter = () => {
      document.body.style.cursor = 'none';
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
}
