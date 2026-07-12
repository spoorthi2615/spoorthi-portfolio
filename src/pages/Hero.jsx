import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaFilePdf, FaEnvelope, FaCode } from 'react-icons/fa';
import { useLenis } from '@studio-freight/react-lenis';

export default function Hero() {
  const lenis = useLenis();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(id, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const section = document.querySelector(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mouse position state for smooth framer-motion springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Set initial mouse position to center of screen
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const name = "SPOORTHI".split('');

  return (
    <section className="relative w-full h-screen bg-[#060608] overflow-hidden flex flex-col items-center justify-center cursor-none">
      
      {/* Dynamic Drifting Aurora Background (Constant Life) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] md:blur-[140px]"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-fuchsia-600/15 rounded-full blur-[100px] md:blur-[140px]"
          animate={{
            x: [0, -120, 120, 0],
            y: [0, 120, -120, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-violet-600/15 rounded-full blur-[100px] md:blur-[140px]"
          animate={{
            x: [-50, 150, -150, -50],
            y: [-50, -150, 150, -50],
            scale: [0.8, 1.1, 1, 0.8]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Custom cursor ring */}
      <motion.div 
        className="fixed top-0 left-0 w-9 h-9 border-[1.5px] border-purple-500/80 rounded-full pointer-events-none z-[100] hidden md:block"
        style={{
          x: useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 }),
          y: useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-[100] shadow-[0_0_15px_rgba(168,85,247,1)] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Massive Centered Text Layer with Interactive Hover */}
      <div className="relative z-20 flex flex-col items-center w-full mt-8 md:mt-0">
        <div className="flex justify-center items-center">
          {name.map((letter, i) => (
            <motion.span
              key={i}
              className="text-[15vw] font-black text-white leading-[0.8] tracking-tighter select-none inline-block relative"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.08, 
                type: "spring", 
                damping: 12, 
                stiffness: 100 
              }}
              whileHover={{ 
                scale: 1.15, 
                color: '#e879f9', // fuchsia-400
                textShadow: '0px 0px 40px rgba(232, 121, 249, 0.8)',
                y: -15,
                rotate: Math.random() * 10 - 5, // slight random rotation
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        
        <motion.p 
          className="text-xs md:text-2xl font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase text-gray-300 mt-8 text-center px-4"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Cybersecurity Engineer
        </motion.p>
      </div>

      {/* CTA Buttons */}
      <motion.div 
        className="absolute bottom-12 flex flex-wrap justify-center gap-4 z-30 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <a
          href="/spoorthi-resume.pdf" target="_blank"
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-none"
        >
          <FaFilePdf /> Resume
        </a>
        <a 
          href="#projects" 
          onClick={(e) => handleScrollTo(e, '#projects')}
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all cursor-none"
        >
          <FaCode /> Projects
        </a>
        <a 
          href="#contact" 
          onClick={(e) => handleScrollTo(e, '#contact')}
          className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all cursor-none"
        >
          <FaEnvelope /> Contact
        </a>
      </motion.div>

    </section>
  );
}
