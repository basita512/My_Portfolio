"use client";

import { motion } from "motion/react";
import { useState, useEffect } from 'react';
import Button from './ui/Button';

const RESUME_LINK = process.env.NEXT_PUBLIC_RESUME_LINK;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass border-b border-white/10' : 'py-6'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 flex items-center">
        <div className="flex-1 flex justify-start">
          <a href="#" className="text-lg font-semibold tracking-tight whitespace-nowrap">
            Basita Tashfeen
          </a>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1 gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <Button
            href={RESUME_LINK}
            target="_blank"
            variant="outline"
            className="px-4 py-2 text-xs md:text-sm bg-white/5 md:bg-transparent"
          >
            Resume
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
