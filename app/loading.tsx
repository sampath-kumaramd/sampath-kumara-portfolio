'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <motion.div
        className="flex items-center text-4xl font-bold tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span
          className="text-5xl text-fontPrimary dark:text-gray-200"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          S
        </motion.span>
        <motion.span
          className="text-5xl text-Secondary"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        >
          K
        </motion.span>
      </motion.div>
    </div>
  );
}
