import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap, Award, Terminal } from 'lucide-react';

// ------------------------------------------------------------------------
// DATASET
// ------------------------------------------------------------------------
const timeline = [
  {
    id: 0,
    category: 'education',
    title: 'Secondary School Education (CBSE)',
    org: 'Little Rock Indian School',
    location: 'Karnataka',
    date: '2008 - 2021',
    shortDesc: 'Foundational secondary school education. Scored 73.3%.',
    learned: ['Sciences', 'Mathematics', 'Communication'],
    Icon: GraduationCap,
    color: "from-purple-400 to-purple-600",
    glow: "rgba(168, 85, 247, 0.4)",
    borderColor: "border-purple-500/50"
  },
  {
    id: 1,
    category: 'education',
    title: 'Pre-University Education (PCMB)',
    org: 'Excellent PU College',
    location: 'Karnataka',
    date: '2021 - 2023',
    shortDesc: 'Established solid mathematical and analytical foundations. Scored 83.3%.',
    learned: ['Physics', 'Advanced Math', 'Biology'],
    Icon: GraduationCap,
    color: "from-fuchsia-400 to-fuchsia-600",
    glow: "rgba(217, 70, 239, 0.4)",
    borderColor: "border-fuchsia-500/50"
  },
  {
    id: 5,
    category: 'education',
    title: 'B.Tech in CS (Cybersecurity)',
    org: 'NMAM Institute of Technology',
    location: 'Karnataka',
    date: '2023 - Present',
    shortDesc: 'Currently pursuing Bachelor of Technology focusing on secure system engineering. CGPA: 7.02',
    learned: ['Cryptography', 'Network Engineering', 'Software Auditing'],
    Icon: Terminal,
    color: "from-violet-400 to-violet-600",
    glow: "rgba(139, 92, 246, 0.4)",
    borderColor: "border-violet-500/50"
  },
  {
    id: 2,
    category: 'experience',
    title: 'Cybersecurity Intern',
    org: 'Thaniya Technologies',
    location: 'Karnataka',
    date: '8-Week Intern',
    shortDesc: 'OSINT footprinting, OWASP top 10 web app tests, and AD audits.',
    learned: ['Maltego, Burp Suite', 'AD Security', 'Threat Drills'],
    Icon: Briefcase,
    color: "from-fuchsia-400 to-fuchsia-600",
    glow: "rgba(217, 70, 239, 0.4)",
    borderColor: "border-fuchsia-500/50"
  },
  {
    id: 3,
    category: 'achievements',
    title: 'Cybersiege 2026 CTF',
    org: 'Alvas Institute',
    location: 'Karnataka',
    date: '2026',
    shortDesc: 'Competed and secured 3rd Place overall in jeopardy-style security challenges.',
    learned: ['Cryptography', 'Web Security', 'Reverse Engineering'],
    Icon: Award,
    color: "from-purple-400 to-purple-600",
    glow: "rgba(168, 85, 247, 0.4)",
    borderColor: "border-purple-500/50"
  },
  {
    id: 4,
    category: 'achievements',
    title: 'Hackfest \'26 Participant',
    org: 'NMAMIT',
    location: 'Karnataka',
    date: '2026',
    shortDesc: 'Participated in the cybersecurity capture-the-flag (CTF) challenges.',
    learned: ['Security Exploiting', 'Vulnerability Auditing'],
    Icon: Award,
    color: "from-violet-400 to-violet-600",
    glow: "rgba(139, 92, 246, 0.4)",
    borderColor: "border-violet-500/50"
  }
];

const categories = [
  { id: 'all', label: 'All Milestones' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'achievements', label: 'Awards & CTFs' }
];

// ==========================================
// BACKGROUND ANIMATIONS
// ==========================================
const CyberBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sweeping Scanline */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-transparent via-purple-500/10 to-transparent blur-[2px]"
        animate={{ y: ['-10vh', '110vh'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 rounded-full"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// DIAGONAL NODE COMPONENT
// ==========================================
const DiagonalNode = ({ item, index, total, scrollYProgress }) => {
  // nodePosition is exactly index / (total - 1) which perfectly matches the 0 to 1 scroll
  const nodePosition = index / (total > 1 ? total - 1 : 1);
  
  const opacity = useTransform(
    scrollYProgress, 
    [nodePosition - 0.15, nodePosition, nodePosition + 0.15], 
    [0.4, 1, 0.4]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [nodePosition - 0.15, nodePosition, nodePosition + 0.15], 
    [0.9, 1.05, 0.9]
  );

  const glowOpacity = useTransform(
    scrollYProgress, 
    [nodePosition - 0.1, nodePosition, nodePosition + 0.1], 
    [0, 1, 0]
  );

  // Dynamic coordinates based on filter index
  const cx = 50 + index * 80;
  const cy = 50 + index * 80;

  return (
    <div 
      className="absolute flex items-center gap-8 z-30"
      style={{
        left: `${cx}vw`,
        top: `${cy}vh`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Center Node / Dot */}
      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
        <div className="w-5 h-5 rounded-full bg-gray-950 border-2 border-white relative z-10" />
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${item.glow}, transparent 80%)`,
            opacity: glowOpacity 
          }}
        />
        <motion.div 
          className="absolute inset-0 w-full h-full rounded-full border-4 border-transparent z-20"
          style={{ opacity: glowOpacity, borderColor: item.glow.replace('0.4', '1') }}
        />
      </div>

      {/* The Content Card */}
      <motion.div 
        style={{ opacity, scale }}
        className="w-[450px] md:w-[550px]"
      >
        <div 
          className={`relative p-10 md:p-14 rounded-[2.5rem] bg-gray-950/90 backdrop-blur-2xl border border-white/10 transition-all duration-500 hover:${item.borderColor} hover:-translate-y-2 hover:shadow-2xl overflow-hidden group flex flex-col gap-8`}
          style={{
            boxShadow: `inset 0 0 100px -30px ${item.glow}`
          }}
        >
          
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-center shadow-inner shrink-0">
                <item.Icon className={`w-6 h-6 text-transparent bg-clip-text bg-gradient-to-br ${item.color} text-white drop-shadow-md`} /> 
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 rounded-2xl`} />
              </div>
              <div className="flex flex-col">
                 <span className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-bold uppercase tracking-widest text-[10px] mb-1`}>{item.category}</span>
                 <span className="text-gray-400 font-medium text-xs flex items-center gap-1">
                   <Calendar className="w-3 h-3" /> {item.date}
                 </span>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {item.org}
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
                {item.shortDesc}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
                {item.learned.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-950 border border-gray-800 rounded-full text-xs text-gray-400">
                        {tag}
                    </span>
                ))}
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};


// ==========================================
// SCROLLING CANVAS COMPONENT
// ==========================================
const TimelineCanvas = ({ items, activeCategory, setActiveCategory }) => {
  const containerRef = useRef(null);
  const N = items.length;
  
  // Track scroll progress of the main window over this tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const travelVW = N > 1 ? (N - 1) * 80 : 0;
  const containerHeightVH = N > 1 ? N * 100 : 100;

  // Translate the canvas diagonally backwards as we scroll down
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0vw", `-${travelVW}vw`]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0vh", `-${travelVW}vh`]);

  // Parallax for the grid background (moves slower than the main canvas)
  const gridX = useTransform(scrollYProgress, [0, 1], ["0vw", `-${travelVW * 0.3}vw`]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0vh", `-${travelVW * 0.3}vh`]);

  // Generate path points dynamically based on item coordinates
  const pathData = N > 0 
    ? `M 50vw 50vh ` + items.slice(1).map((_, i) => `L ${50 + (i + 1) * 80}vw ${50 + (i + 1) * 80}vh`).join(' ')
    : '';

  return (
    <div ref={containerRef} style={{ height: `${containerHeightVH}vh` }} className="relative w-full">
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* HUD / UI Overlay (Inside the sticky container so it NEVER scrolls away!) */}
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-50 pointer-events-none flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter mb-2">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Journey</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-sm">
              Scroll down to traverse my timeline diagonally through cyberspace.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 pointer-events-auto bg-gray-950/80 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs transition-all relative outline-none ${
                    isActive ? "text-gray-950 font-bold" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeFilterBg2"
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-xl z-0"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Animated Particles & Scanline */}
        <CyberBackground />

        {/* Parallax Cyber Grid */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{ 
            x: gridX, 
            y: gridY, 
            width: `${100 + (N > 1 ? (N - 1) * 80 : 0)}vw`, 
            height: `${100 + (N > 1 ? (N - 1) * 80 : 0)}vh`,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }}
        />

        {/* Background Ambient Layers */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[150px]" />
        </div>

        {/* MASSIVE DIAGONAL CANVAS */}
        <motion.div 
          className="absolute top-0 left-0"
          style={{ 
            width: `${100 + (N > 1 ? (N - 1) * 80 : 0)}vw`, 
            height: `${100 + (N > 1 ? (N - 1) * 80 : 0)}vh`,
            x: xTranslate, 
            y: yTranslate 
          }}
        >
          {/* THE SVG WIRE & LASER */}
          <svg className="absolute inset-0 pointer-events-none z-10" style={{ width: `${100 + (N > 1 ? (N - 1) * 80 : 0)}vw`, height: `${100 + (N > 1 ? (N - 1) * 80 : 0)}vh` }}>
            <defs>
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" /> {/* purple-400 */}
                <stop offset="50%" stopColor="#d946ef" /> {/* fuchsia-500 */}
                <stop offset="100%" stopColor="#a78bfa" /> {/* violet-400 */}
              </linearGradient>
            </defs>
            
            {/* Background faint wire */}
            {N > 1 && (
              <path 
                d={pathData}
                stroke="rgba(255, 255, 255, 0.08)" 
                strokeWidth="6" 
                fill="none" 
                strokeDasharray="15 15"
              />
            )}
            
            {/* Animated Laser Beam */}
            {N > 1 && (
              <motion.path 
                d={pathData}
                stroke="url(#laserGrad)" 
                strokeWidth="10" 
                fill="none" 
                style={{ pathLength: scrollYProgress }}
                className="drop-shadow-[0_0_30px_rgba(217,70,239,0.8)]"
              />
            )}
          </svg>

          {/* THE NODES */}
          {items.map((item, index) => (
            <DiagonalNode 
              key={item.id}
              item={item}
              index={index}
              total={N}
              scrollYProgress={scrollYProgress}
            />
          ))}

        </motion.div>
      </div>
    </div>
  );
};


// ==========================================
// MAIN COMPONENT (Timeline Section)
// ==========================================
export default function Timeline() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTimeline = useMemo(() => {
    if (activeCategory === 'all') return timeline;
    return timeline.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="timeline" className="relative bg-[#060608]">
      <TimelineCanvas items={filteredTimeline} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
    </section>
  );
}
