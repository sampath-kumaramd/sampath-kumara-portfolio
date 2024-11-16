'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface TrailDot extends Position {
  id: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Update trail
      setTrail((prevTrail) => {
        const newDot = { x: e.clientX, y: e.clientY, id: Date.now() };
        const updatedTrail = [...prevTrail, newDot].slice(-15); // Keep last 15 positions
        return updatedTrail;
      });

      // Check if cursor is over clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Main cursor */}
      <motion.div
        className={`absolute left-0 top-0 h-4 w-4 rounded-full bg-Secondary opacity-50 mix-blend-difference ${
          isPointer ? 'scale-150' : ''
        }`}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          transition: {
            type: 'spring',
            damping: 30,
            mass: 0.8,
            stiffness: 400,
          },
        }}
      />

      {/* Trail dots */}
      <AnimatePresence mode="popLayout">
        {trail.map((dot, index) => (
          <motion.div
            key={dot.id}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 0.5, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: dot.x - 4,
              top: dot.y - 4,
              width: '8px',
              height: '8px',
            }}
            className="rounded-full bg-Secondary mix-blend-difference"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
