import React, { useEffect, useRef, useState } from "react";
import { 
  SiPython, SiCplusplus, SiC, SiJavascript, SiTypescript, 
  SiReact, SiTailwindcss, SiHtml5, SiCss3, SiFramer,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiFirebase,
  SiGit, SiDocker, SiLinux, SiPostman, SiWireshark, SiKalilinux
} from "react-icons/si";
import { FaJava, FaShieldAlt } from "react-icons/fa";

// ==========================================
// SKILLS DATA
// ==========================================
const skillsData = [
  { id: 'python', name: 'Python', icon: SiPython, category: 'Languages', color: 'text-yellow-400' },
  { id: 'cpp', name: 'C++', icon: SiCplusplus, category: 'Languages', color: 'text-blue-500' },
  { id: 'java', name: 'Java', icon: FaJava, category: 'Languages', color: 'text-orange-500' },
  { id: 'js', name: 'JavaScript', icon: SiJavascript, category: 'Languages', color: 'text-yellow-300' },
  { id: 'ts', name: 'TypeScript', icon: SiTypescript, category: 'Languages', color: 'text-blue-500' },
  { id: 'c', name: 'C', icon: SiC, category: 'Languages', color: 'text-blue-400' },
  
  { id: 'react', name: 'React', icon: SiReact, category: 'Frontend', color: 'text-cyan-400' },
  { id: 'tailwind', name: 'Tailwind', icon: SiTailwindcss, category: 'Frontend', color: 'text-teal-400' },
  { id: 'html', name: 'HTML5', icon: SiHtml5, category: 'Frontend', color: 'text-orange-500' },
  { id: 'css', name: 'CSS3', icon: SiCss3, category: 'Frontend', color: 'text-blue-500' },
  { id: 'framer', name: 'Framer', icon: SiFramer, category: 'Frontend', color: 'text-pink-500' },
  
  { id: 'node', name: 'Node.js', icon: SiNodedotjs, category: 'Backend', color: 'text-green-500' },
  { id: 'express', name: 'Express', icon: SiExpress, category: 'Backend', color: 'text-gray-300' },
  { id: 'mongo', name: 'MongoDB', icon: SiMongodb, category: 'Backend', color: 'text-green-400' },
  { id: 'sql', name: 'SQL', icon: SiPostgresql, category: 'Backend', color: 'text-blue-400' },
  { id: 'firebase', name: 'Firebase', icon: SiFirebase, category: 'Backend', color: 'text-amber-500' },
  
  { id: 'git', name: 'Git', icon: SiGit, category: 'Tools', color: 'text-red-500' },
  { id: 'docker', name: 'Docker', icon: SiDocker, category: 'Tools', color: 'text-blue-500' },
  { id: 'linux', name: 'Linux', icon: SiLinux, category: 'Tools', color: 'text-yellow-200' },
  { id: 'postman', name: 'Postman', icon: SiPostman, category: 'Tools', color: 'text-orange-500' },
  
  { id: 'wireshark', name: 'Wireshark', icon: SiWireshark, category: 'Security', color: 'text-indigo-400' },
  { id: 'kali', name: 'Kali Linux', icon: SiKalilinux, category: 'Security', color: 'text-blue-300' },
  { id: 'security', name: 'Burp Suite', icon: FaShieldAlt, category: 'Security', color: 'text-rose-500' }
];

// ==========================================
// 3D SPHERE COMPONENT
// ==========================================
export default function Skills() {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  
  // Interaction State
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 }); // Current rotation
  const velocity = useRef({ x: 0.003, y: 0.003 }); // Auto-rotation speed

  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Generate 3D Sphere Points using Fibonacci Sphere algorithm
  const generatePoints = () => {
    const N = skillsData.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const points = [];
    const radius = 250; // Sphere radius in pixels

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        skill: skillsData[i],
        index: i
      });
    }
    return points;
  };

  useEffect(() => {
    const points = generatePoints();
    let animationFrame;

    const updateSphere = () => {
      // 1. Apply Friction to velocity to slow down manual spins
      if (!isDragging.current) {
        // Naturally decay to a steady auto-rotation speed
        velocity.current.x = velocity.current.x * 0.95 + 0.002 * 0.05;
        velocity.current.y = velocity.current.y * 0.95 + 0.002 * 0.05;
      }

      // 2. Add velocity to current rotation
      rotation.current.x += velocity.current.x;
      rotation.current.y += velocity.current.y;

      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);

      // 3. Project 3D points to 2D screen
      points.forEach((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective Projection
        const fov = 800; // Field of view (distance to camera)
        const scale = fov / (fov + z2);
        const screenX = x1 * scale;
        const screenY = y2 * scale;

        // Update DOM element
        const el = elementsRef.current[p.index];
        if (el) {
          // Adjust zIndex and opacity based on Z depth
          const zIndex = Math.round(scale * 100);
          const opacity = Math.max(0.2, Math.min(1, scale));
          const blur = z2 > 50 ? `${(z2 - 50) / 30}px` : '0px';

          // Apply transform to center the element
          el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale})`;
          el.style.zIndex = zIndex;
          el.style.opacity = opacity;
          el.style.filter = `blur(${blur})`;
        }
      });

      animationFrame = requestAnimationFrame(updateSphere);
    };

    updateSphere();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Mouse / Touch Event Handlers for Dragging
  const handlePointerDown = (e) => {
    isDragging.current = true;
    previousMouse.current = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY };
    containerRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const deltaX = clientX - previousMouse.current.x;
    const deltaY = clientY - previousMouse.current.y;
    
    // Convert drag pixels to rotation velocity (inverted for natural feel)
    velocity.current.y = deltaX * -0.005;
    velocity.current.x = deltaY * 0.005;

    previousMouse.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    containerRef.current.style.cursor = 'grab';
  };

  return (
    <section id="skills" className="py-24 relative bg-[#060608] overflow-hidden border-t border-gray-900">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[800px] h-[800px] rounded-full bg-fuchsia-900/10 blur-[150px]" />
      </div>

      <div className="max-w-[75rem] mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-white tracking-tighter">
            Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
              Stack
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto font-medium h-6 transition-all">
            {hoveredSkill 
              ? <span className="text-fuchsia-400 font-bold">{hoveredSkill.name} <span className="text-gray-500 font-normal">({hoveredSkill.category})</span></span> 
              : "Drag to rotate the sphere in 3D space."}
          </p>
        </div>

        {/* 3D SPHERE CONTAINER */}
        <div 
          ref={containerRef}
          className="relative w-[100%] max-w-[800px] h-[600px] md:h-[700px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          
          {/* Center Anchor Point for Absolute Positioning */}
          <div className="absolute left-1/2 top-1/2 w-0 h-0">
            {skillsData.map((skill, i) => (
              <div
                key={skill.id}
                ref={el => elementsRef.current[i] = el}
                className="absolute flex items-center justify-center -ml-[40px] -mt-[40px] w-[80px] h-[80px] rounded-full bg-gray-900/60 backdrop-blur-md border border-gray-700/50 hover:bg-gray-800 transition-colors shadow-2xl"
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <skill.icon className={`text-4xl ${skill.color} drop-shadow-[0_0_15px_currentColor]`} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
