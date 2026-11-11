import React, { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './pages/Hero';
import Footer from './components/layout/Footer';
import Preloader from './components/ui/Preloader';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence, motion } from 'framer-motion';
import SmoothScroll from './components/layout/SmoothScroll';
import { ErrorBoundary } from './ErrorBoundary';

// Retry dynamic chunk imports once when a new deployment invalidates cached chunk hashes
const lazyWithRetry = (importer) =>
  lazy(() =>
    importer().catch((error) => {
      const hasReloaded = sessionStorage.getItem('chunk_reload_attempted');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk_reload_attempted', 'true');
        window.location.reload();
        return new Promise(() => {});
      }
      sessionStorage.removeItem('chunk_reload_attempted');
      throw error;
    })
  );

// Lazy load heavy components below the fold
const About = lazyWithRetry(() => import('./pages/About'));
const Skills = lazyWithRetry(() => import('./pages/Skills'));
const Projects = lazyWithRetry(() => import('./pages/Projects'));
const Timeline = lazyWithRetry(() => import('./pages/Timeline'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const Certifications = lazyWithRetry(() => import('./pages/Certifications'));


export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    // Give the Hero a brief moment to render before mounting the heavy Suspense components
    const timer = setTimeout(() => setIsHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
      <Helmet>
        <title>Spoorthi | Cybersecurity Engineer & Full-Stack Developer</title>
        <meta name="description" content="Portfolio of Spoorthi, a Computer Science (Cybersecurity) student at NMAMIT specializing in cybersecurity, software testing, and full-stack development." />
        <meta name="keywords" content="Spoorthi, Spoorthi Portfolio, NMAMIT, Cybersecurity Engineer, Full-Stack Developer, Software Testing, CTF Competitor" />
        <meta name="author" content="Spoorthi" />
        <meta property="og:title" content="Spoorthi | Cybersecurity Engineer & Full-Stack Developer" />
        <meta property="og:site_name" content="Spoorthi" />
        <meta property="og:description" content="Portfolio of Spoorthi, specializing in secure software engineering, software testing, and full-stack development." />
        <meta property="og:image" content="https://via.placeholder.com/1200x630/030712/22d3ee?text=Spoorthi+Portfolio" />
        <meta property="og:url" content="https://github.com/spoorthi2615" />
        <link rel="canonical" href="https://github.com/spoorthi2615" />
      </Helmet>
      
      <SmoothScroll>
        <div className="min-h-screen flex flex-col bg-gray-950 transition-colors duration-300 selection:bg-purple-500/30 selection:text-purple-200">
          <AnimatePresence mode="wait">
            {isBooting ? (
              <Preloader key="preloader" onComplete={() => setIsBooting(false)} />
            ) : (
              <motion.div 
                key="main-app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col flex-1"
              >
                <Navbar />
                <Hero />
                
                {isHeroLoaded && (
                  <Suspense fallback={<div className="h-screen w-full bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-t-2 border-purple-500 animate-spin" /></div>}>
                    <main className="flex-1 flex flex-col gap-16 md:gap-20 pt-8 md:pt-16">
                      <About />
                      <Skills />
                      <Certifications />
                      <Projects />
                      <Timeline />
                      <Contact />
                    </main>
                    <Footer />
                  </Suspense>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <Analytics />
          <SpeedInsights />
        </div>
      </SmoothScroll>
    </HelmetProvider>
    </ErrorBoundary>
  );
}