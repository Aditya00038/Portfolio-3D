import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

// Sample high-fidelity Projects Data
const PROJECTS_DATA = [
  {
    id: 1,
    num: "01",
    category: "CIVIC TECH · PLATFORM",
    title: "Parivartan: Transforming Civic Issues into Action",
    subtitle: "Smart Civic Platform",
    description: "Parivartan is a smart civic engagement and workforce management platform designed to improve communication, transparency, and coordination between citizens, municipal authorities, and field workers through a centralized digital ecosystem.",
    github: "https://github.com",
    bgColor: "#f97316", // Orange-500
    textColor: "#fff",
    images: ["/project_thumbnails/in_hand_parivartan_pic.jpeg"],
    tags: ["Full Stack", "Civic Tech", "Workforce"]
  },
  {
    id: 2,
    num: "02",
    category: "FINTECH · AI",
    title: "DhanSathi: Smart Savings Platform",
    subtitle: "AI Savings discipline tracker",
    description: "DhanSathi is an AI-powered personal finance and savings discipline platform designed to help users build healthier financial habits through intelligent guidance, goal-based saving systems, and smart expense tracking.",
    github: "https://github.com",
    bgColor: "#10b981", // Emerald-500
    textColor: "#fff",
    images: ["/project_thumbnails/dhansathi.jpeg", "/project_thumbnails/dhansathi.jpeg"],
    tags: ["AI / ML", "Fintech", "Savings"]
  },
  {
    id: 3,
    num: "03",
    category: "HEALTH TECH · AI",
    title: "Glyvora: AI Wellness Platform",
    subtitle: "AI Diabetes management tracker",
    description: "GLYVORA is an intelligent diabetes and wellness management platform designed to help individuals monitor, understand, and improve their daily health through AI-powered insights, real-time health tracking, and personalized wellness support.",
    github: "https://github.com",
    bgColor: "#8b5cf6", // Violet-500
    textColor: "#fff",
    images: ["/project_thumbnails/glyvora.jpeg", "/project_thumbnails/glyvora.jpeg"],
    tags: ["AI / ML", "Health Tech", "Wellness"]
  },
  {
    id: 4,
    num: "04",
    category: "EDTECH · LAB",
    title: "ChemStock: Lab Inventory Management",
    subtitle: "Inventory and Chem tracking tool",
    description: "ChemStock is a modern laboratory inventory and resource management platform designed to simplify the tracking, monitoring, and administration of chemicals, laboratory equipment, and research assets through a centralized digital system.",
    github: "https://github.com",
    bgColor: "#0ea5e9", // Sky-500
    textColor: "#fff",
    images: ["/project_thumbnails/chemstock.jpeg", "/project_thumbnails/chemstock.jpeg"],
    tags: ["Full Stack", "EdTech", "Inventory"]
  }
];

export default function Projects() {
  const containerRef = useRef(null);

  // Track scroll position of the entire projects section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use smooth spring for soft organic bubble expansion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // Background floating gooey bubbles (semi-transparent white on black)
  const bubbleY1 = useTransform(smoothProgress, [0, 1], [600, -100]);
  const bubbleR1 = useTransform(smoothProgress, [0, 1], [80, 160]);

  const bubbleY2 = useTransform(smoothProgress, [0, 1], [700, -80]);
  const bubbleR2 = useTransform(smoothProgress, [0, 1], [100, 220]);

  const bubbleY3 = useTransform(smoothProgress, [0, 1], [550, -150]);
  const bubbleR3 = useTransform(smoothProgress, [0, 1], [70, 140]);

  const bubbleY4 = useTransform(smoothProgress, [0, 1], [800, -50]);
  const bubbleR4 = useTransform(smoothProgress, [0, 1], [120, 240]);

  const bubbleY5 = useTransform(smoothProgress, [0, 1], [650, -120]);
  const bubbleR5 = useTransform(smoothProgress, [0, 1], [90, 180]);

  const bubbleY6 = useTransform(smoothProgress, [0, 1], [750, -60]);
  const bubbleR6 = useTransform(smoothProgress, [0, 1], [110, 200]);

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="w-full flex flex-col relative overflow-hidden bg-black text-white px-6 md:px-12 pt-32 pb-48"
    >
      {/* SVG Filters for premium gooey bubble merging effect */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="gooey-transition" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Floating Gooey Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
          <g filter="url(#gooey-transition)">
            <motion.circle cx="150" cy={bubbleY1} r={bubbleR1} fill="rgba(255, 255, 255, 0.05)" />
            <motion.circle cx="350" cy={bubbleY2} r={bubbleR2} fill="rgba(255, 255, 255, 0.04)" />
            <motion.circle cx="500" cy={bubbleY3} r={bubbleR3} fill="rgba(255, 255, 255, 0.06)" />
            <motion.circle cx="650" cy={bubbleY4} r={bubbleR4} fill="rgba(255, 255, 255, 0.03)" />
            <motion.circle cx="800" cy={bubbleY5} r={bubbleR5} fill="rgba(255, 255, 255, 0.05)" />
            <motion.circle cx="950" cy={bubbleY6} r={bubbleR6} fill="rgba(255, 255, 255, 0.04)" />
          </g>
        </svg>
      </div>

      {/* Selected Work Title & Grid */}
      <div className="w-full max-w-[90rem] mx-auto relative z-10">
        <h2 
          className="text-5xl md:text-7xl font-serif tracking-tight text-white mb-20" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Selected work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS_DATA.map((project) => (
            <a 
              key={project.id} 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="relative w-full h-[500px] md:h-[650px] group block rounded-[3rem] overflow-hidden border border-zinc-800/80 hover:border-zinc-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out"
            >
              {/* Full Background Image */}
              {project.images && project.images.length > 0 ? (
                <img 
                  src={project.images[0]} 
                  alt={`${project.title} screenshot`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 font-mono text-sm z-0">
                  Visual Asset Coming Soon
                </div>
              )}

              {/* Gradient Overlay for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-10 opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Top-Right Tags/Pills (e.g. Full Stack, AI / ML) */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex flex-wrap gap-2 justify-end">
                {project.tags?.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx} 
                    className="text-[10px] md:text-xs font-mono font-medium text-white px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 uppercase tracking-wider select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Overlaid Card Footer Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-20 flex justify-between items-end">
                <div className="flex flex-col gap-1 transition-all duration-300">
                  
                  {/* Sliding Title Wrapper */}
                  <div className="relative overflow-hidden h-9 w-[280px]">
                    <h3 className="text-2xl font-bold text-white transition-all duration-500 transform group-hover:-translate-y-full">
                      {project.title.split(":")[0]}
                    </h3>
                    <h3 className="absolute inset-0 text-2xl font-bold text-white transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
                      Visit Website
                    </h3>
                  </div>

                  {/* Subtext */}
                  <span className="text-xs md:text-sm font-mono text-zinc-400 group-hover:text-white transition-colors">
                    {project.category}
                  </span>
                </div>

                {/* White circular hover button */}
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-[0_4px_12px_rgba(255,255,255,0.25)] flex-shrink-0">
                  <span className="text-black font-semibold text-2xl leading-none -mt-0.5">+</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
