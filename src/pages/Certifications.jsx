import React, { useState, useEffect } from "react";
import { FaBuilding, FaFlag, FaUniversity } from "react-icons/fa";
import { SiMicrosoft, SiMicrosoftazure, SiHedera } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// CERTIFICATIONS DATA
// ==========================================
const certifications = [
  {
    id: "hedera",
    title: "Hashgraph Developer Course",
    issuer: "The Hashgraph Association",
    date: "5 Oct 2025",
    Icon: SiHedera,
    link: "/certificates/hashgraph.pdf",
    level: "Completed",
    category: "Blockchain",
    featured: true,
    color: "from-purple-400 to-purple-600",
    iconColor: "text-purple-400",
    bento: "md:col-span-2 md:row-span-2", // 2x2
  },
  {
    id: "azure-challenge",
    title: "Microsoft Azure Challenge",
    issuer: "Microsoft Learn",
    date: "22 Sept 2025",
    Icon: SiMicrosoftazure,
    link: "/certificates/azure.pdf",
    level: "Completed",
    category: "Cloud",
    featured: true,
    color: "from-fuchsia-400 to-fuchsia-600",
    iconColor: "text-fuchsia-400",
    bento: "md:col-span-1 md:row-span-1", // 1x1
  },
  {
    id: "thaniya",
    title: "Cyber Security Internship",
    issuer: "Thaniya Technologies",
    date: "Jun-Jul 2025",
    Icon: FaBuilding,
    link: "/certificates/thaniya.pdf",
    level: "Completed",
    category: "Internship",
    featured: true,
    color: "from-violet-400 to-violet-600",
    iconColor: "text-violet-400",
    bento: "md:col-span-1 md:row-span-1", // 1x1
  },
  {
    id: "applied-ai",
    title: "Applied AI Challenge",
    issuer: "Microsoft",
    date: "22 Sept 2025",
    Icon: SiMicrosoft,
    link: "/certificates/applied-ai.pdf",
    level: "Completed",
    category: "AI",
    featured: false,
    color: "from-purple-500 to-fuchsia-500",
    iconColor: "text-purple-500",
    bento: "md:col-span-1 md:row-span-1", // 1x1
  },
  {
    id: "ai-challenge",
    title: "Microsoft AI Challenge",
    issuer: "Microsoft",
    date: "22 Sept 2025",
    Icon: SiMicrosoft,
    link: "/certificates/ai-challenge.pdf",
    level: "Completed",
    category: "AI",
    featured: false,
    color: "from-fuchsia-500 to-violet-500",
    iconColor: "text-fuchsia-500",
    bento: "md:col-span-1 md:row-span-1", // 1x1
  },
  {
    id: "iccs",
    title: "Internet Crimes & Cyber Security",
    issuer: "NPTEL",
    date: "Feb-Apr 2026",
    Icon: FaUniversity,
    link: "/certificates/iccs.pdf",
    level: "Elite (79%)",
    category: "Security",
    featured: true,
    color: "from-violet-500 to-purple-500",
    iconColor: "text-violet-500",
    bento: "md:col-span-2 md:row-span-1", // 2x1
  },
  {
    id: "susec",
    title: "Systems and Usable Security",
    issuer: "NPTEL",
    date: "Jan-Feb 2025",
    Icon: FaUniversity,
    link: "/certificates/susec.png",
    level: "Completed (53%)",
    category: "Security",
    featured: false,
    color: "from-purple-300 to-purple-500",
    iconColor: "text-purple-300",
    bento: "md:col-span-2 md:row-span-1", // 2x1
  }
];

// ==========================================
// COMPETITIONS DATA
// ==========================================
const competitions = [
  {
    id: "cybersiege",
    title: "Cybersiege 2026: 24-Hour CTF",
    issuer: "Alva's Institute of Tech",
    date: "30-31 Mar 2026",
    Icon: FaFlag,
    link: "/certificates/cybersiege.jpg",
    level: "3rd Place Winner",
    category: "Competition",
    featured: true,
    color: "from-purple-400 to-fuchsia-600",
    iconColor: "text-purple-400",
    bento: "md:col-span-2 md:row-span-1", // 2x1
  },
  {
    id: "hackfest",
    title: "Hackfest 26' CTF",
    issuer: "NITTE & Finite Loop",
    date: "18-19 Apr 2026",
    Icon: FaFlag,
    link: "/certificates/hackfest.jpg",
    level: "Participant",
    category: "Competition",
    featured: false,
    color: "from-violet-400 to-purple-600",
    iconColor: "text-violet-400",
    bento: "md:col-span-2 md:row-span-1", // 2x1
  }
];

// ==========================================
// BENTO CARD COMPONENT
// ==========================================
const BentoCard = ({ item, index, onOpen }) => {
  const isLarge = item.bento === "md:col-span-2 md:row-span-2";
  const isWide = item.bento === "md:col-span-2 md:row-span-1";
  const isTall = item.bento === "md:col-span-1 md:row-span-2";
  const isSmall = item.bento === "md:col-span-1 md:row-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
      className={`col-span-1 ${item.bento} relative group w-full h-full bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden flex transition-all duration-500 hover:border-gray-600 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] hover:-translate-y-1`}
    >
       {/* Background ambient glow on hover */}
       <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br ${item.color} rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none z-0`} />

       {/* Link Arrow Indicator (Top Right) */}
       <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 z-30 shadow-xl">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
       </div>

       {/* LARGE CARD (2x2) */}
       {isLarge && (
         <div className="p-8 md:p-10 flex flex-col h-full w-full relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-center mb-auto shadow-inner">
             <item.Icon className={`text-3xl ${item.iconColor}`} />
           </div>
           
           <div className="mt-6">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center justify-between">
               <span>{item.category}</span>
               {item.featured && <span className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-black`}>★ FEATURED</span>}
             </div>
             <h3 className="text-3xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
             <p className="text-gray-400 text-sm mb-6">{item.issuer}</p>
             
             <div className="flex justify-between items-center border-t border-gray-800/80 pt-5">
                <span className="text-gray-600 font-mono text-[10px] uppercase tracking-wider">{item.level}</span>
                <span className="text-gray-500 font-medium text-xs">{item.date}</span>
             </div>
           </div>
         </div>
       )}

       {/* WIDE CARD (2x1) */}
       {isWide && (
         <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center h-full w-full relative z-10 gap-5">
           <div className="w-14 h-14 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-center shrink-0 shadow-inner">
             <item.Icon className={`text-2xl ${item.iconColor}`} />
           </div>
           
           <div className="flex-1 w-full flex flex-col h-full justify-center">
             <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center justify-between">
               <span>{item.category}</span>
               {item.featured && <span className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-black`}>★ FEATURED</span>}
             </div>
             <h3 className="text-lg font-bold text-white mb-1 leading-tight">{item.title}</h3>
             <p className="text-gray-400 text-xs mb-3">{item.issuer}</p>
             
             <div className="flex justify-between items-center w-full mt-auto pt-2">
                <span className="text-gray-600 font-mono text-[9px] uppercase tracking-wider">{item.level}</span>
                <span className="text-gray-500 font-medium text-[10px]">{item.date}</span>
             </div>
           </div>
         </div>
       )}

       {/* SMALL CARD (1x1) */}
       {isSmall && (
         <div className="p-6 flex flex-col justify-center items-center h-full w-full relative z-10 text-center">
           <div className="w-12 h-12 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center mb-4 shadow-inner">
             <item.Icon className={`text-xl ${item.iconColor}`} />
           </div>
           
           <h3 className="text-sm font-bold text-white mb-1 line-clamp-2 leading-tight">{item.title}</h3>
           <p className="text-gray-400 text-[10px] mb-3">{item.issuer}</p>
           <div className="text-gray-500 font-medium text-[9px] mt-auto uppercase">{item.level}</div>
         </div>
       )}

       {/* View Certificate Button Overlay */}
       <button 
         className="absolute inset-0 z-40 w-full h-full cursor-pointer focus:outline-none" 
         aria-label={`View Certificate: ${item.title}`} 
         onClick={() => { 
           if (item.link && item.link !== "#") onOpen(item); 
         }}
       />
    </motion.div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="certifications" className="min-h-screen flex flex-col justify-center py-12 relative bg-[#060608] overflow-hidden">
      
      <div className="max-w-[75rem] mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-white tracking-tighter">
            Achievements &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
              Certifications
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto font-medium">
            Professional certifications, academic milestones, and competitive achievements. Click any card to view the official credential.
          </p>
        </div>

        {/* SECTION 1: CERTIFICATIONS */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[2px] bg-gradient-to-r from-purple-500 to-transparent" />
            <h3 className="text-xl font-bold text-white tracking-wide uppercase">Certifications & Internships</h3>
            <div className="flex-1 h-[1px] bg-gray-800/60 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] gap-5">
            {certifications.map((cert, index) => (
               <BentoCard key={cert.id} item={cert} index={index} onOpen={setSelectedCert} />
            ))}
          </div>
        </div>

        {/* SECTION 2: COMPETITIONS */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[2px] bg-gradient-to-r from-fuchsia-500 to-transparent" />
            <h3 className="text-xl font-bold text-white tracking-wide uppercase">Achievements</h3>
            <div className="flex-1 h-[1px] bg-gray-800/60 ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-5">
            {competitions.map((comp, index) => (
               <BentoCard key={comp.id} item={comp} index={index} onOpen={setSelectedCert} />
            ))}
          </div>
        </div>

        {/* MODAL OVERLAY */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-[85vh] bg-gray-900 border border-gray-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950/50">
                  <div>
                    <h3 className="text-white font-bold text-lg">{selectedCert.title}</h3>
                    <p className="text-gray-400 text-xs">{selectedCert.issuer}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a 
                      href={selectedCert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-500/60 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Open Link
                    </a>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 w-full bg-[#030712] relative flex items-center justify-center">
                  {selectedCert.link.endsWith('.pdf') ? (
                    <object 
                      data={`${selectedCert.link}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
                      type="application/pdf" 
                      className="w-full h-full"
                    >
                      <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <p className="text-gray-400 mb-4">Your browser does not support inline PDFs.</p>
                        <a 
                          href={selectedCert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-colors"
                        >
                          Download / View PDF
                        </a>
                      </div>
                    </object>
                  ) : (
                    <img 
                      src={selectedCert.link} 
                      alt={selectedCert.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
