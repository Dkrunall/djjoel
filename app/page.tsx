'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import Hero from '@/components/Hero';
import ScrollExplore from '@/components/ScrollExplore';
import ScrollSection from '@/components/ScrollSection';
import AwardsSection from '@/components/AwardsSection';
import RecordsSection from '@/components/RecordsSection';
import Lenis from 'lenis';
import { useLoader } from '@/context/LoaderContext';

export default function Home() {
  const { isLoading, setIsLoading } = useLoader();

  // Initialize Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy();
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Hero />
          <ScrollSection />
          <AwardsSection />
          <RecordsSection />
        </>
      )}
    </main>
  );
}