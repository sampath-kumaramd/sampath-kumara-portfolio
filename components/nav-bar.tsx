'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ShimmerButton from './ui/shimmer-button';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyButton from './ui/shiny-button';
import { ThemeToggle } from './theme-toggle';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/resume', name: 'Resume' },
  { href: '/projects', name: 'Projects' },
  { href: '/testimonials', name: 'Testimonials' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const pathname = usePathname();

  const theme = useTheme();

  useEffect(() => {
    const currentSection =
      navLinks.find((link) => link.href === pathname)?.name || 'Home';
    setActiveSection(currentSection);
  }, [pathname]);

  const getLinkClassName = (linkName: string) => `
    rounded-xl py-3 px-5 w-full text-center cursor-pointer transition-colors
    ${
      activeSection === linkName
        ? 'text-Secondary underline underline-offset-8'
        : 'bg-bgSecondary hover:text-Secondary hover:underline hover:underline-offset-8'
    }
  `;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 dark:bg-background">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transition-opacity duration-300"
          >
            <Image
              src={theme.theme === 'dark' ? '/logo-white.png' : '/logo.png'}
              alt="hero"
              className="h-12 w-auto md:h-16"
              width={100}
              height={100}
            />
          </motion.div>
        </Link>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={link.href} className={getLinkClassName(link.name)}>
                <h6 className="dark:text-white">{link.name}</h6>
              </Link>
            </motion.div>
          ))}
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact-us">
              <ShinyButton>Contact me</ShinyButton>
            </Link>
          </motion.div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-white dark:bg-background md:hidden"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-6 top-4"
            >
              <X size={24} />
            </button>
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={getLinkClassName(link.name)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <h6 className="dark:text-white">{link.name}</h6>
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
                <ShinyButton>Contact me</ShinyButton>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
