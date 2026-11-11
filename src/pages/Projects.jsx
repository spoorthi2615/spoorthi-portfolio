import React, { useState, useEffect } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaTimes,
  FaCheckCircle,
  FaLaptopCode,
  FaRocket,
  FaPython,
  FaDocker,
  FaLock,
  FaBrain,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiRender,
  SiVite,
  SiPostgresql,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, X, ExternalLink, Code2, Database, LayoutTemplate, Layers } from "lucide-react";
import { createPortal } from "react-dom";

// ==========================================
// DATA
// ==========================================
const projects = [
  {
    id: "cascade-shield",
    title: "CascadeShield",
    shortDescription: "Cyber-Physical Cascade Failure Prediction | Python, GNN, PyTorch.",
    fullDescription: "An infrastructure cascade failure prediction system modeling how catastrophic failures propagate across highly interconnected, multi-subsystem city grids.",
    architecture: "Built a hybrid graph neural network + epidemiological (SEIR) model to predict cascading attacks across interdependent smart-city infrastructure networks.",
    security: "Trained on synthetic multi-infrastructure dependency graphs to identify highly central nodes and simulate adversarial physical-cyber contagion spread vectors.",
    challenge: "Modeling complex interdependencies between heterogeneous systems. Solved by standardizing node interfaces and deploying scalable graph-based analytical engines.",
    deliverables: [
      "Hybrid GNN + SEIR epidemiological model",
      "Synthetic multi-infrastructure dependency graphs",
      "Achieved ROC-AUC of 0.7063 & Precision@K of 0.4242"
    ],
    image: "/projects/cascade_shield.jpg",
    tech: [
      { icon: <FaPython />, name: "Python", color: "text-purple-400" },
      { icon: <FaBrain />, name: "GNNs", color: "text-fuchsia-400" },
      { icon: <FaDatabase />, name: "Data Modeling", color: "text-violet-400" }
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/Cascade-Shield",
    year: "2024",
    role: "Lead Developer",
    status: "Completed"
  },
  {
    id: "cyber-dna",
    title: "Cyber DNA",
    shortDescription: "Continuous Behavioral Authentication for Insider-Threat Detection.",
    fullDescription: "A production-ready behavioral authentication framework generating per-user 'digital DNA' profiles from login and activity patterns.",
    architecture: "Quantum-inspired analytics engine designed to build and authenticate digital behavioral signatures continuously, detecting minute anomalies in user patterns.",
    security: "Employs continuous monitoring and behavioral drift analysis to isolate and flag compromised accounts before damage occurs.",
    challenge: "Handling large streams of event telemetry without high false-positive rates. Resolved by fine-tuning anomaly thresholds using real-world baseline data.",
    deliverables: [
      "Continuous behavioral authentication framework",
      "Generated per-user 'digital DNA' profiles",
      "Evaluated on CMU CERT insider-threat dataset"
    ],
    image: "/projects/cyber_dna.jpg",
    tech: [
      { icon: <FaNodeJs />, name: "JavaScript", color: "text-purple-400" },
      { icon: <FaCode />, name: "Analytics", color: "text-violet-400" },
      { icon: <FaLock />, name: "Authentication", color: "text-fuchsia-400" }
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/Cyber-DNA--MIT",
    year: "2024",
    role: "Security Engineer",
    status: "Completed"
  },
  {
    id: "qr-intel",
    title: "QRIntel",
    shortDescription: "Explainable Threat Intelligence Platform for Malicious QR Infrastructure.",
    fullDescription: "A proactive, explainable cybersecurity intelligence platform dedicated to detecting malicious QR-based infrastructure (Quishing) before compromise.",
    architecture: "Built a two-stage heuristic detection engine combining lexical, DNS, redirect, and SSL/visual analysis with Optuna-based optimization.",
    security: "Safely analyzes QR structures and URL redirection chains without exposing the host environment to zero-day browser exploits.",
    challenge: "Deobfuscating nested QR redirects in real-time. Addressed by building a robust URL unrolling and reputation-checking pipeline.",
    deliverables: [
      "Two-stage heuristic detection engine (lexical, DNS, SSL)",
      "Optuna-based optimization to catch quishing attacks",
      "Deterministic, interpretable JSON audit logs for SOC analysts",
      "Published paper on IEEE Xplore"
    ],
    image: "/projects/qr_intel.jpg",
    tech: [
      { icon: <FaPython />, name: "Python", color: "text-purple-400" },
      { icon: <FaCode />, name: "Analysis Engine", color: "text-fuchsia-400" },
      { icon: <FaDatabase />, name: "Threat Intel", color: "text-violet-400" }
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/QR-Intel-2.0",
    paperUrl: "https://ieeexplore.ieee.org/document/11746844",
    year: "2024",
    role: "Threat Intel Dev",
    status: "Completed"
  },
  {
    id: "agilegraph",
    title: "AgileGraph",
    shortDescription: "Graph-Learned Crypto-Agility Risk Scoring for Post-Quantum Migration.",
    fullDescription: "An automated cryptographic discovery, typed property-graph modeling, and crypto-agility risk scoring platform engineered for post-quantum cryptographic (PQC) migration across multi-language codebases.",
    architecture: "Inventories cryptographic primitives across Python, Java, Go, and package manifests to construct 6-node property graphs, compute 7-factor heuristic risk scores with Mosca's theorem triage, and run a Heterogeneous GATv2 model backed by FastAPI and React + TypeScript.",
    security: "Enforces defensive bcrypt + PyJWT authentication with server-side token revocation, strict multi-user project data isolation, and audit-ready export tools.",
    challenge: "Evaluating graph-based structural risk propagation under cross-repository domain shift without synthetic expert labels. Addressed using deterministic heuristic risk scoring as ground truth and 8-fold LOPO cross-validation on pinned benchmark repositories.",
    deliverables: [
      "Multi-language scanners (Python, Java, Go, manifests) & 6-node property graphs",
      "7-factor crypto-agility risk scoring & Mosca's theorem PQC urgency triage",
      "Heterogeneous GATv2 model + React/TypeScript/FastAPI platform (439 pytest & 40 Vitest passing)"
    ],
    tech: [
      { icon: <FaPython />, name: "Python / FastAPI", color: "text-purple-400" },
      { icon: <FaReact />, name: "React / TypeScript", color: "text-fuchsia-400" },
      { icon: <FaBrain />, name: "GATv2 GNN", color: "text-violet-400" },
      { icon: <FaLock />, name: "PQC Agility", color: "text-purple-300" }
    ],
    demo: "#",
    github: "https://github.com/spoorthi2615/agilegraph--major-project",
    year: "2026",
    role: "Major Project Team",
    status: "Ongoing"
  }
];

const AgileGraphArtwork = () => (
  <div className="w-full h-full bg-[#090910] relative flex items-center justify-center overflow-hidden p-8">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(217,70,239,0.14),transparent_55%)]" />
    <svg viewBox="0 0 420 320" className="w-full max-w-[380px] h-auto relative z-10">
      <defs>
        <linearGradient id="agEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <g stroke="url(#agEdge)" strokeOpacity="0.45" strokeWidth="2">
        <line x1="90" y1="85" x2="210" y2="60" />
        <line x1="90" y1="85" x2="160" y2="175" />
        <line x1="210" y1="60" x2="325" y2="115" />
        <line x1="210" y1="60" x2="160" y2="175" />
        <line x1="160" y1="175" x2="275" y2="215" />
        <line x1="325" y1="115" x2="275" y2="215" />
        <line x1="90" y1="245" x2="160" y2="175" />
        <line x1="90" y1="245" x2="275" y2="215" />
      </g>
      {[
        { cx: 90, cy: 85, label: "AST" },
        { cx: 210, cy: 60, label: "RSA/ECC" },
        { cx: 325, cy: 115, label: "GATv2" },
        { cx: 160, cy: 175, label: "6-Node Graph" },
        { cx: 275, cy: 215, label: "Mosca PQC" },
        { cx: 90, cy: 245, label: "Risk Score" },
      ].map((n, idx) => (
        <g key={idx}>
          <circle cx={n.cx} cy={n.cy} r="22" fill="#0f0f1a" stroke="#a855f7" strokeWidth="2" />
          <circle cx={n.cx} cy={n.cy} r="5" fill="#e879f9" />
          <text x={n.cx} y={n.cy + 36} fill="#cbd5e1" fontSize="10" fontWeight="600" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

// ==========================================
// PROJECT DETAIL PAGE OVERLAY (Unchanged)
// ==========================================
const ProjectDetailOverlay = ({ project, onClose, nextProject, prevProject }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-gray-950 overflow-y-auto custom-scrollbar"
      data-lenis-prevent="true"
    >
      <div className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white font-bold tracking-widest uppercase text-sm pointer-events-auto mix-blend-difference"
        >
          {project.title}
        </motion.div>
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors pointer-events-auto shadow-2xl border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden group">
        <motion.div layoutId={`project-image-${project.id}`} className="absolute inset-0 w-full h-full">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110" />
          ) : (
            <AgileGraphArtwork />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter mb-6">{project.title}</h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed">{project.shortDescription}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[100rem] mx-auto px-6 md:px-16 lg:px-24 py-24 flex flex-col lg:flex-row gap-20">
        <div className="w-full lg:w-2/3 flex flex-col gap-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-6">The Story</h3>
            <p className="text-2xl md:text-3xl text-gray-200 font-light leading-relaxed mb-10">{project.fullDescription}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-6">System Architecture & Core Stack</h3>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">{project.architecture}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-6">Secure Engineering & Audits</h3>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">{project.security}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-6">The Challenge</h3>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed border border-white/5 bg-white/5 p-8 md:p-12 rounded-3xl mb-10">{project.challenge}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-12">Key Deliverables & Outcomes</h3>
            <div className="space-y-8 border-l border-white/10 pl-8 md:pl-12">
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-1 text-3xl font-black text-gray-800 group-hover:text-purple-500 transition-colors duration-500">0{idx + 1}</div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{deliv}</h4>
                  <div className="h-px w-full max-w-sm bg-white/5 mt-4 group-hover:bg-gradient-to-r from-purple-500 to-transparent transition-colors duration-500" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="sticky top-32 space-y-16">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest border-b border-white/10 pb-4">Details</h3>
              <div className="grid grid-cols-2 gap-y-6">
                <div><div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Year</div><div className="text-white font-medium">{project.year}</div></div>
                <div><div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Role</div><div className="text-white font-medium">{project.role}</div></div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</div>
                  <div className="text-purple-400 font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />{project.status}</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest border-b border-white/10 pb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <div key={idx} className="relative px-4 py-2 text-gray-300 font-medium text-sm rounded-full border border-white/10 overflow-hidden group cursor-default">
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">{t.icon} {t.name}</span>
                    <div className="absolute inset-0 bg-purple-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest border-b border-white/10 pb-4">Repository</h3>
              {project.github !== "#" ? (
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"><FaGithub className="w-5 h-5" /></div>
                  <div><div className="font-medium">View Source</div><div className="text-xs">Available on GitHub</div></div>
                </a>
              ) : (
                <div className="flex items-center gap-4 text-gray-500">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center"><Code2 className="w-5 h-5 opacity-50" /></div>
                  <div><div className="font-medium">Private Repository</div><div className="text-xs">Developed under NDA</div></div>
                </div>
              )}
            </div>
            {project.paperUrl && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest border-b border-white/10 pb-4">Publication</h3>
                <a href={project.paperUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors"><ExternalLink className="w-5 h-5 text-purple-400" /></div>
                  <div><div className="font-medium">Published Paper</div><div className="text-xs text-purple-300/80">Read on IEEE Xplore</div></div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex">
        <button onClick={() => prevProject()} className="w-1/2 p-12 md:p-24 bg-gray-900 hover:bg-gray-800 transition-colors flex flex-col items-start gap-4">
          <span className="text-purple-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2"><ArrowLeft className="w-4 h-4"/> Previous Project</span>
        </button>
        <button onClick={() => nextProject()} className="w-1/2 p-12 md:p-24 bg-gray-900 hover:bg-gray-800 transition-colors border-l border-white/5 flex flex-col items-end text-right gap-4">
           <span className="text-purple-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">Next Project <ArrowRight className="w-4 h-4"/></span>
        </button>
      </div>
    </motion.div>,
    document.body
  );
};

// ==========================================
// MAIN COMPONENT (Option 1: Stacking Cards)
// ==========================================
export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const navigateProject = (direction) => {
    const currentIndex = projects.findIndex(p => p.id === activeProject.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = projects.length - 1;
    if (nextIndex >= projects.length) nextIndex = 0;
    setActiveProject(projects[nextIndex]);
  };

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-12 relative bg-[#060608]">
      
      {/* Title */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-5xl md:text-7xl font-display font-black mb-4 text-white tracking-tighter">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
            Projects
          </span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A curated selection of my latest work. Scroll down to explore the stack.
        </p>
      </div>

      {/* The Stack */}
      <div className="max-w-6xl mx-auto px-6 relative pb-32 flex flex-col gap-8 md:gap-16">
        
        {projects.map((project, index) => {
          // Dynamic sticky top offset to create the visual stack
          const topOffset = 100 + (index * 30);

          return (
            <div 
              key={project.id}
              className="sticky w-full h-[70vh] min-h-[500px] rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0f] shadow-2xl flex flex-col md:flex-row group"
              style={{ top: `${topOffset}px` }}
            >
               {/* Left: Image */}
               <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                 {project.image ? (
                   <motion.img 
                     layoutId={`project-image-${project.id}`}
                     src={project.image} 
                     alt={project.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                     onClick={() => setActiveProject(project)}
                   />
                 ) : (
                   <motion.div
                     layoutId={`project-image-${project.id}`}
                     className="w-full h-full cursor-pointer"
                     onClick={() => setActiveProject(project)}
                   >
                     <AgileGraphArtwork />
                   </motion.div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent opacity-80 pointer-events-none" />
               </div>

               {/* Right: Content */}
               <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/[0.02] backdrop-blur-xl relative">
                  
                  {/* Subtle glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

                  <div className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-4">0{index + 1}</div>
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">{project.title}</h3>
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                        {t.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => setActiveProject(project)}
                      className="w-fit flex items-center gap-4 px-8 py-4 rounded-full bg-white text-gray-950 font-bold hover:bg-purple-400 hover:text-white transition-colors"
                    >
                      Explore Project <ArrowRight className="w-5 h-5" />
                    </button>
                    {project.paperUrl && (
                      <a
                        href={project.paperUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-fit flex items-center gap-2.5 px-6 py-4 rounded-full border border-purple-400/40 bg-purple-500/10 text-purple-200 font-bold hover:bg-purple-500/25 hover:text-white transition-colors"
                      >
                        IEEE Paper <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
               </div>
            </div>
          )
        })}

      </div>

      {/* FULLSCREEN PROJECT DETAIL OVERLAY */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailOverlay 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
            nextProject={() => navigateProject(1)}
            prevProject={() => navigateProject(-1)}
          />
        )}
      </AnimatePresence>

    </section>
  );
}
