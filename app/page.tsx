"use client";

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen"
      >
        <div className="atmosphere" />
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <footer className="py-8 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Basita Tashfeen. All rights reserved.</p>
        </footer>
      </motion.div>
    </>
  );
}
