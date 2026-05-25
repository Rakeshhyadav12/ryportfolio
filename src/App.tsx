import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Layout and Global controls
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { AIWidget } from './components/AIWidget';

// Fullpage sections
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll globally
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // RAF loop for scroll calculations
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Sync Lenis with standard scroll events for active section tracking
    const handleScroll = () => {
      // Custom triggers can reside here if needed
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <>
      {/* 1. Page Bootup Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Main layout container (Active once loading is complete) */}
      {!isLoading && (
        <div className="relative min-h-screen bg-[#030014] text-white selection:bg-neonCyan/30 selection:text-white antialiased transition-colors duration-500">
          {/* Custom magnetic spring cursor */}
          <CustomCursor />

          {/* Floating dynamic Navbar (Desktop and touch controls) */}
          <Navbar />

          {/* Scrolling Fullpage Content Panels */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Testimonials />
            <Contact />
          </main>

          {/* Footnotes brand logo and reset scroller */}
          <Footer />

          {/* Floating Autonomous Chat Widget Mockup */}
          <AIWidget />
        </div>
      )}
    </>
  );
};

export default App;
