'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ShimmerButton from './ui/shimmer-button';

const navLinks = [
  { href: '/', name: 'Home' },
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
      <nav className="container mx-auto flex items-center justify-between py-5">
        <Link href="/">
          <div className="inset-0 z-10 transition-opacity duration-300">
            <Image
              unoptimized
              src="/home/hero.svg"
              alt="hero"
              className="h-12 w-auto rounded-full"
              width={40}
              height={40}
            />
          </div>
        </Link>
        <div className="hidden items-center space-x-16 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClassName(link.name)}
            >
              <h6>{link.name}</h6>
            </Link>
          ))}
          <Link href="/contact-us">
            {/* <button className='bg-fontSecondary text-white py-2 px-4 rounded-full hover:bg-fontSecondary/80 min-w-32' >Hire me</button> */}
            <ShimmerButton className="w-32 bg-fontSecondary shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Hire me
              </span>
            </ShimmerButton>
          </Link>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Image src="/icons/menu.svg" alt="menu" width={40} height={40} />
          )}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="bg-cream-dark fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute right-6 top-4"
          >
            <Image src="/icons/close.svg" alt="close" width={40} height={40} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClassName(link.name)}
              onClick={() => setIsMenuOpen(false)}
            >
              <h6>{link.name}</h6>
            </Link>
          ))}
          <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
            <button className="w-96 rounded-full bg-fontSecondary px-4 py-2 text-white hover:bg-fontSecondary/80">
              Hire me
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
