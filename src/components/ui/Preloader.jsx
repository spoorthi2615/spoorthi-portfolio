import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootMessages = [
  "Establishing secure connection...",
  "Initializing neural pathways...",
  "Loading 3D environments...",
  "Compiling shaders...",
  "Bypassing security protocols...",
  "System Ready."
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [chatMessage, setChatMessage] = useState("Hi! I'm Spoorthi's assistant.");
  const splineRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => setIsSplineLoaded(true);
    const viewer = splineRef.current;
    if (viewer) {
      viewer.addEventListener('load', handleLoad);
      // Fallback in case the event name is different or it fails
      viewer.addEventListener('load-complete', handleLoad);
    }
    
    // Failsafe: Force load after 3 seconds max so user isn't stuck forever
    const failsafe = setTimeout(() => setIsSplineLoaded(true), 3000);

    return () => {
      clearTimeout(failsafe);
      if (viewer) {
        viewer.removeEventListener('load', handleLoad);
        viewer.removeEventListener('load-complete', handleLoad);
      }
    };
  }, []);

  useEffect(() => {
    // Increase duration slightly so the user can enjoy the robot
    const duration = 3500;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const t = Math.min(currentStep / steps, 1);
      const easeOutQuart = 1 - Math.pow(1 - t, 4);
      let currentProgress = Math.min(Math.floor(easeOutQuart * 100), 100);

      // We no longer block at 99%. The failsafe ensures it loads, 
      // and we just let the preloader finish smoothly.

      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete, isSplineLoaded]);

  useEffect(() => {
    // Change tech jargon messages periodically based on progress
    if (progress < 20) setMessageIndex(0);
    else if (progress < 40) setMessageIndex(1);
    else if (progress < 60) setMessageIndex(2);
    else if (progress < 80) setMessageIndex(3);
    else if (progress < 99) setMessageIndex(4);
    else setMessageIndex(5);

    // Change robot chat messages based on progress
    if (progress < 30) setChatMessage("Hi! I'm Spoorthi's assistant.");
    else if (progress < 60) setChatMessage("Just getting the systems ready...");
    else if (progress < 90) setChatMessage("Almost done! Hang tight.");
    else setChatMessage("Ready when you are!");
  }, [progress]);

  return (
    <motion.div 
      className="fixed inset-0 z-[99999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 px-6 min-h-[50vh]">
        
        {/* LEFT: Spline Robot */}
        <div className="relative w-[250px] md:w-[400px] aspect-square flex items-center justify-center">
           
           {/* Robot Chat Bubble */}
           <AnimatePresence>
             {isSplineLoaded && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.8, y: 10 }}
                 key={chatMessage}
                 className="absolute -top-16 md:-top-4 left-1/2 md:-right-8 md:left-auto -translate-x-1/2 md:translate-x-0 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl rounded-bl-none shadow-[0_0_30px_rgba(168,85,247,0.3)]"
               >
                 <p className="text-white font-semibold text-sm whitespace-nowrap">{chatMessage}</p>
                 {/* Chat bubble pointer */}
                 <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white/10 border-b border-l border-white/20 transform -rotate-45 backdrop-blur-md"></div>
               </motion.div>
             )}
           </AnimatePresence>

           <div className={`w-full h-full transition-opacity duration-1000 ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <spline-viewer 
                ref={splineRef}
                url="https://prod.spline.design/EacTm1R0dYAFGfov/scene.splinecode" 
              ></spline-viewer>
           </div>

           {/* Fallback Robot Spinner if Spline is slow */}
           {!isSplineLoaded && (
             <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
               <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
               <span className="text-purple-400 text-xs uppercase tracking-widest font-mono animate-pulse">Waking up Assistant...</span>
             </div>
           )}
        </div>

        {/* RIGHT: Existing Loading Ring */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-8">
            <motion.svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" stroke="#1f2937" strokeWidth="2" 
              />
              <motion.circle 
                cx="50" cy="50" r="45" 
                fill="none" stroke="#a855f7" strokeWidth="2" 
                strokeDasharray={283}
                strokeDashoffset={283 - (283 * progress) / 100}
                strokeLinecap="round"
              />
            </motion.svg>
            
            <div className="flex flex-col items-center drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <span className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tabular-nums tracking-tighter">
                {progress}<span className="text-2xl md:text-3xl">%</span>
              </span>
            </div>
          </div>

          {/* Tech Jargon / Message */}
          <div className="h-6 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-purple-400/80 font-mono text-xs md:text-sm tracking-widest uppercase drop-shadow-[0_0_5px_rgba(168,85,247,0.8)] text-center"
              >
                {bootMessages[messageIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

      </div>
      
      {/* Brand */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 text-xs tracking-[0.3em] uppercase font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Spoorthi OS v2.0
      </motion.div>
    </motion.div>
  );
}
