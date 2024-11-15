'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ShimmerButton from './ui/shimmer-button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/resume', name: 'Resume' },
  { href: '/projects', name: 'Projects' },
  { href: '/testimonials', name: 'Testimonials' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const pathname = usePathname();

  useEffect(() => {
    const currentSection =
      navLinks.find((link) => link.href === pathname)?.name || 'Home';
    setActiveSection(currentSection);
  }, [pathname]);

  const getLinkClassName = (linkName: string) => `
    rounded-xl py-3 px-5 w-full text-center cursor-pointer transition-colors
    ${
      activeSection === linkName
        ? 'text-fontSecondary underline underline-offset-8'
        : 'bg-bgSecondary hover:text-fontSecondary hover:underline hover:underline-offset-8'
    }
  `;

  return (
    <div className="">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transition-opacity duration-300"
          >
            <Image
              src="/logo.png"
              alt="hero"
              className="h-16 w-auto"
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
                <h6>{link.name}</h6>
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/contact-us">
              <ShimmerButton className="w-32 bg-fontSecondary shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Hire me
                </span>
              </ShimmerButton>
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 bg-white md:hidden"
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
                  <h6>{link.name}</h6>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
                <button className="w-96 rounded-full bg-fontSecondary px-4 py-2 text-white hover:bg-fontSecondary/80">
                  Hire me
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
