import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaMapMarkerAlt, FaShieldAlt, FaServer, FaLock, FaDownload } from 'react-icons/fa';

export default function About() {
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Track the scroll progress of this specific 300vh tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update active slide for the Header/Navigation dots
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let nextSlide = 0;
    if (latest > 0.25 && latest <= 0.75) nextSlide = 1;
    if (latest > 0.75) nextSlide = 2;

    if (nextSlide !== activeSlide) {
      setActiveSlide(nextSlide);
    }
  });

  // OPTION 1: The Giant Canvas (Camera Pan)
  // We map the scroll progress to X and Y coordinates to move the "camera" around a massive map.
  // Pause slightly at the middle slide (0.45 to 0.55) so the user can read it.
  const cameraX = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["0vw", "-100vw", "-100vw", "0vw"]);
  const cameraY = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], ["0vh", "-100vh", "-100vh", "-200vh"]);

  // ── Slide 0: Overview ──────────────────────────────
  const OverviewSlide = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-full pb-8">
      <div className="md:col-span-1 md:row-span-2 rounded-[2rem] overflow-hidden border border-white/10 relative group bg-white/[0.02] shadow-xl">
        <img 
          src="/spoorthi.jpg" 
          alt="Spoorthi" 
          className="w-full h-full min-h-[420px] md:min-h-[500px] object-cover object-top filter contrast-110 saturate-100 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-[#060608]/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-8 pointer-events-none">
          <h3 className="text-3xl font-black text-white mb-1">Spoorthi</h3>
          <p className="text-purple-400 font-medium">Cybersecurity Engineer</p>
        </div>
      </div>
      <div className="md:col-span-2 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col justify-center">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
        <p className="text-2xl md:text-3xl text-white font-light leading-snug mb-6 relative z-10 pointer-events-none">
          Applying a <strong className="text-purple-400 font-bold">builder's mindset</strong> to real-world security engineering and applied ML research.
        </p>
        <p className="text-gray-400 leading-relaxed font-medium relative z-10 text-base md:text-lg pointer-events-none mb-4">
          I am a Cybersecurity and Software Engineering student at NMAMIT with hands-on experience in penetration testing (VAPT) and secure application development. My track record includes building end-to-end security tools ranging from multi-agent vulnerability scanners to cryptographic file containers.
        </p>
        <p className="text-gray-400 leading-relaxed font-medium relative z-10 text-base md:text-lg pointer-events-none mb-8">
          Proficient in Python, React, TypeScript, and MongoDB, I am currently authoring research on GNN-based cascade failure detection and explainable phishing intelligence.
        </p>
        
        <a 
          href="/Spoorthi_Resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative z-20 flex items-center justify-center gap-2 px-8 py-3 w-fit rounded-full font-bold text-white text-sm bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
        >
          <FaDownload /> Download Resume
        </a>
      </div>
    </div>
  );

  // ── Slide 1: Skills & Details ──────────────────────
  const DetailsSlide = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full pb-8 pointer-events-none">
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-xl">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
          <FaMapMarkerAlt className="text-purple-400 text-2xl" />
        </div>
        <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">Location</p>
        <p className="text-xl font-bold text-white">Karnataka, India</p>
      </div>
      <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col justify-center">
         <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px]" />
         <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Languages</h3>
         <div className="flex flex-wrap gap-4 relative z-10">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
               <h4 className="text-white font-bold text-xl mb-1">English</h4>
               <p className="text-purple-400 text-sm font-medium">Fluent</p>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
               <h4 className="text-white font-bold text-xl mb-1">Kannada</h4>
               <p className="text-fuchsia-400 text-sm font-medium">Native</p>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
               <h4 className="text-white font-bold text-xl mb-1">Hindi</h4>
               <p className="text-violet-400 text-sm font-medium">Proficient</p>
            </div>
         </div>
      </div>
      <div className="md:col-span-2 lg:col-span-3 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl flex flex-col justify-center">
        <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Core Focus Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="flex flex-col gap-4">
             <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
               <FaShieldAlt className="text-fuchsia-400 text-xl" />
             </div>
             <h4 className="text-white font-bold">Vulnerability Assessment</h4>
             <p className="text-gray-400 text-sm leading-relaxed">Identifying and patching security loopholes before they can be exploited.</p>
           </div>
           <div className="flex flex-col gap-4">
             <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
               <FaLock className="text-purple-400 text-xl" />
             </div>
             <h4 className="text-white font-bold">Cryptography</h4>
             <p className="text-gray-400 text-sm leading-relaxed">Implementing robust encryption standards to ensure data integrity.</p>
           </div>
           <div className="flex flex-col gap-4">
             <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
               <FaServer className="text-violet-400 text-xl" />
             </div>
             <h4 className="text-white font-bold">Secure Networks</h4>
             <p className="text-gray-400 text-sm leading-relaxed">Architecting and auditing infrastructure for maximum resilience.</p>
           </div>
        </div>
      </div>
    </div>
  );

  // ── Slide 2: Education ─────────────────────────────
  const EducationSlide = () => (
    <div className="flex flex-col gap-5 w-full h-full pb-8 pointer-events-none">
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <FaShieldAlt className="text-purple-400 text-3xl" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">B.Tech in CS (Cybersecurity)</h4>
              <p className="text-purple-300/80 font-medium">NMAMIT, Nitte</p>
            </div>
         </div>
         <div className="flex flex-wrap gap-4 w-full md:w-auto">
           <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-medium text-gray-300">2022 – Present</div>
           <div className="px-6 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 font-black text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">7.02 CGPA</div>
         </div>
      </div>
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-3xl">
              🏫
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Pre-University (PCMB)</h4>
              <p className="text-fuchsia-300/80 font-medium">Excellent PU College</p>
            </div>
         </div>
         <div className="flex flex-wrap gap-4 w-full md:w-auto">
           <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-medium text-gray-300">2020 – 2022</div>
           <div className="px-6 py-3 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/30 font-black text-fuchsia-400">83.3%</div>
         </div>
      </div>
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-3xl">
              🎒
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Secondary School (CBSE)</h4>
              <p className="text-violet-300/80 font-medium">Little Rock Indian School</p>
            </div>
         </div>
         <div className="flex flex-wrap gap-4 w-full md:w-auto">
           <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-medium text-gray-300">2008 – 2020</div>
           <div className="px-6 py-3 rounded-xl bg-violet-500/5 border border-violet-500/30 font-black text-violet-400">73.3%</div>
         </div>
      </div>
    </div>
  );

  const sectionTitles = ["Overview", "Stats & Focus", "Education"];

  return (
    // The container is 400vh tall to give plenty of scrolling time for the camera pan
    <section ref={containerRef} id="about" className="relative z-10 bg-[#060608] h-[400vh]">
      
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Ambient glows that stay fixed */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Fixed Header */}
        <div className="absolute top-0 left-0 w-full z-50 p-6 md:p-12 pt-24 pointer-events-none">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Story</span>
              </h2>
              <div className="hidden md:block w-[1px] h-12 bg-white/10" />
              <h3 className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide hidden md:block">
                <AnimatePresence mode="wait">
                   <motion.span 
                     key={activeSlide}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="inline-block"
                   >
                     {sectionTitles[activeSlide]}
                   </motion.span>
                </AnimatePresence>
              </h3>
            </div>
            
            {/* Progress Dots */}
            <div className="flex gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all duration-500 ${activeSlide === i ? 'w-6 bg-purple-500' : 'w-2 bg-gray-600'}`}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* THE GIANT CANVAS (Camera Pan Layer) */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full will-change-transform"
          style={{ x: cameraX, y: cameraY }}
        >
          
          {/* Page 0: At (0, 0) */}
          <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center p-6 pt-32">
             <div className="max-w-6xl w-full h-[600px]">
               <OverviewSlide />
             </div>
          </div>

          {/* Page 1: Down and Right (100vw, 100vh) */}
          <div className="absolute top-[100vh] left-[100vw] w-screen h-screen flex items-center justify-center p-6 pt-32">
             <div className="max-w-6xl w-full h-[600px]">
               <DetailsSlide />
             </div>
          </div>

          {/* Page 2: Down and Left (0vw, 200vh) */}
          <div className="absolute top-[200vh] left-[0vw] w-screen h-screen flex items-center justify-center p-6 pt-32">
             <div className="max-w-6xl w-full h-[600px]">
               <EducationSlide />
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
