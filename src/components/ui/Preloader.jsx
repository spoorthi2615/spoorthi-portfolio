import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const t = Math.min(currentStep / steps, 1);
      // Custom easing function for a premium, liquid-like speed
      const easeInOutCubic = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      let currentProgress = Math.min(Math.floor(easeInOutCubic * 100), 100);

      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Glass Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh]">
        
        {/* Liquid Fill 'S' Logo */}
        <div className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 mb-8">
          {/* Glassmorphic Backdrop */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_0_50px_rgba(168,85,247,0.15)]"></div>
          
          <div className="relative w-full h-full flex items-center justify-center font-black leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
            {/* Outline / Faded Background Text */}
            <span 
              className="text-transparent absolute flex items-center justify-center w-full h-full text-[120px] md:text-[150px]" 
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
            >
              S
            </span>
            
            {/* The Liquid Fill Mask */}
            <div 
              className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-[30ms] ease-linear flex items-end justify-center"
              style={{ height: `${progress}%` }}
            >
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-t from-purple-600 via-pink-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] text-[120px] md:text-[150px] flex items-end justify-center h-full"
                style={{ lineHeight: 1 }}
              >
                S
              </span>
            </div>
          </div>
        </div>

        {/* Clean Percentage Counter */}
        <div className="flex flex-col items-center">
          <motion.div 
            className="text-3xl font-display font-bold text-white tracking-widest tabular-nums"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {progress}<span className="text-purple-400/80 text-xl">%</span>
          </motion.div>
          
          {/* Minimalist Progress Bar under text */}
          <div className="w-32 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full transition-all duration-[30ms] ease-linear shadow-[0_0_10px_rgba(168,85,247,0.8)]"
               style={{ width: `${progress}%` }}
             ></div>
          </div>
        </div>

      </div>
      
      {/* Brand */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] tracking-[0.4em] uppercase font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Spoorthi Portfolio
      </motion.div>
    </motion.div>
  );
}
