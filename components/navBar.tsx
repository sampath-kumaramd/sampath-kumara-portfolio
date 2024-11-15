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
    const currentSection = navLinks.find(link => link.href === pathname)?.name || 'Home';
    setActiveSection(currentSection);
  }, [pathname]);

  const getLinkClassName = (linkName: string) => `
    rounded-xl py-3 px-5 w-full text-center cursor-pointer transition-colors
    ${activeSection === linkName 
      ? 'text-fontSecondary underline underline-offset-8' 
      : 'bg-bgSecondary hover:text-fontSecondary hover:underline hover:underline-offset-8'}
  `;

  return (
    <div className=''>
      <nav className="flex justify-between items-center py-5 container mx-auto ">
        <Link href="/">
            <div className=" inset-0 z-10 transition-opacity duration-300">
        <Image
          unoptimized
          src="/home/hero.svg"
          alt="hero"
          className="h-12 w-auto rounded-full "
          width={40}
          height={40}
        />
      </div>
        </Link>
        <div className="hidden md:flex space-x-16 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={getLinkClassName(link.name)}>
              <h6>{link.name}</h6>
            </Link>
          ))}
          <Link href="/contact-us">
            {/* <button className='bg-fontSecondary text-white py-2 px-4 rounded-full hover:bg-fontSecondary/80 min-w-32' >Hire me</button> */}
             <ShimmerButton className="shadow-2xl w-32 bg-fontSecondary">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg ">
          Hire me
        </span>
      </ShimmerButton>
          </Link>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Image src="/icons/menu.svg" alt="menu" width={40} height={40} />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-cream-dark z-50 flex flex-col items-center justify-center space-y-4">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-6">
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
            <button className='bg-fontSecondary text-white py-2 px-4 rounded-full hover:bg-fontSecondary/80 w-96'>Hire me</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;