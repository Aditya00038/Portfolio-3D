import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiMongodb, SiFastapi, SiPython, SiFirebase, SiPostgresql, SiRedux } from "react-icons/si";

// Samples matching the user's detailed layout request
const PROJECTS_DATA = [
  {
    id: 1,
    num: "01",
    category: "CIVIC TECH · PLATFORM",
    title: "Parivartan — Transforming Civic Issues into Action",
    description: "Designed and built a smart civic engagement and workforce management platform that connects citizens directly with municipal field staff to resolve local infrastructure issues.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/in_hand_parivartan_pic.jpeg",
    domain: "Civic Tech · Platform",
    tech: [
      { name: "React", icon: <FaReact className="w-4 h-4" color="#61DAFB" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4" color="#38BDF8" /> },
      { name: "Node.js", icon: <FaNodeJs className="w-4 h-4" color="#339933" /> },
      { name: "MongoDB", icon: <SiMongodb className="w-4 h-4" color="#47A248" /> }
    ]
  },
  {
    id: 2,
    num: "02",
    category: "FINTECH · AI",
    title: "DhanSathi — Smart Savings Platform",
    description: "An AI-powered personal financial tracker that helps users build healthy savings habits through goal-oriented saving structures and predictive expense analytics.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/dhansathi.jpeg",
    domain: "Fintech · AI Platform",
    tech: [
      { name: "React", icon: <FaReact className="w-4 h-4" color="#61DAFB" /> },
      { name: "Redux", icon: <SiRedux className="w-4 h-4" color="#764ABC" /> },
      { name: "FastAPI", icon: <SiFastapi className="w-4 h-4" color="#009688" /> },
      { name: "Python", icon: <SiPython className="w-4 h-4" color="#3776AB" /> }
    ]
  },
  {
    id: 3,
    num: "03",
    category: "HEALTH TECH · AI",
    title: "Glyvora — AI Wellness Platform",
    description: "An intelligent diabetes and metabolic health tracker that processes user dietary intake and blood sugar logs to deliver actionable AI-driven dietary recommendations.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/glyvora.jpeg",
    domain: "Health Tech · AI",
    tech: [
      { name: "React Native", icon: <FaReact className="w-4 h-4" color="#61DAFB" /> },
      { name: "Python", icon: <SiPython className="w-4 h-4" color="#3776AB" /> },
      { name: "Firebase", icon: <SiFirebase className="w-4 h-4" color="#FFCA28" /> }
    ]
  },
  {
    id: 4,
    num: "04",
    category: "EDTECH · LAB",
    title: "ChemStock — Lab Inventory Management",
    description: "A comprehensive digital stockroom and inventory management application designed to track chemicals, equipment, safety levels, and usage logs in laboratory environments.",
    github: "https://github.com/Aditya00038/Portfolio-3D",
    image: "/project_thumbnails/chemstock.jpeg",
    domain: "EdTech · Lab Platform",
    tech: [
      { name: "React", icon: <FaReact className="w-4 h-4" color="#61DAFB" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4" color="#4169E1" /> },
      { name: "JavaScript", icon: <SiJavascript className="w-4 h-4" color="#F7DF1E" /> }
    ]
  }
];

function ProjectCard({ project }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Tracks the coordinates relative to the outer container bounding box
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center py-16 w-full ${project.id % 2 === 0 ? 'md:flex-row-reverse' : ''
        }`}
    >
      {/* Left/Right Text Panel */}
      <div className="flex-1 flex flex-col items-start text-left z-10 font-sans">
        <span className="text-xs md:text-sm font-mono font-bold text-[#818cf8] tracking-widest uppercase mb-3 select-none">
          {project.num} — {project.category}
        </span>
        <h3 className="text-3xl md:text-[2.3rem] lg:text-[2.5rem] font-bold text-white tracking-tight leading-[1.2] mb-5">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6 max-w-[480px]">
          {project.description}
        </p>

        {/* Tech Stack Icons Row */}
        <div className="flex items-center gap-2.5 mb-8">
          {project.tech.map((t, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-2.5 bg-zinc-900 border border-zinc-800/80 rounded-xl hover:border-zinc-700 transition-colors shadow-sm"
              title={t.name}
            >
              {t.icon}
            </div>
          ))}
        </div>

        {/* View project button (Replaced Unicode arrow with clean vector SVG) */}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
        >
          <span>View project</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7,7 17,7 17,17" />
          </svg>
        </a>
      </div>

      {/* Right/Left Image Panel with CSS 3D Tilt Trackers & Cursor Follower */}
      <div className="flex-1 w-full relative z-20">
        <div
          className="project-card-container relative w-full aspect-[1.3] rounded-[2rem] cursor-pointer overflow-visible"
          data-cursor="hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* 5x5 CSS 3D Tracker Overlay & Card Inner sibling group */}
          <div className="absolute inset-0 z-30 grid grid-cols-5 grid-rows-5 pointer-events-auto">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`project-card-tracker tr-${i + 1} z-20`}
              />
            ))}

            {/* The actual image element that gets rotated directly by the general sibling hover selector */}
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="project-card-inner absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-[0_15px_45px_rgba(0,0,0,0.6)] border border-zinc-800/60 pointer-events-none z-10"
              draggable={false}
            />
          </div>

          {/* Floating 'View Project' follow-badge (Replaced Unicode arrow with custom vector SVG) */}
          {isHovered && (
            <motion.div
              style={{ left: mousePos.x, top: mousePos.y }}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-white text-black px-5 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-2xl z-40 flex items-center gap-1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <span>View project</span>
              <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7,7 17,7 17,17" />
              </svg>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full bg-black text-white py-24 relative overflow-hidden"
    >
      {/* Local CSS injection for 3D card tilt grid hover selectors */}
      <style>{`
        .project-card-container {
          perspective: 1200px;
        }
        
        .project-card-inner {
          /* Smooth, elastic rotation transitions between trackers */
          transition: transform 600ms cubic-bezier(0.1, 0.8, 0.3, 1);
          transform-style: preserve-3d;
        }
        
        .project-card-tracker {
          width: 100%;
          height: 100%;
        }
        
        .project-card-tracker:hover ~ .project-card-inner {
          /* Snippy but smooth tracking transition */
          transition: transform 300ms cubic-bezier(0.1, 0.8, 0.3, 1);
        }
        
        /* 5x5 Tilt Rotations */
        .tr-1:hover ~ .project-card-inner { transform: rotateX(12deg) rotateY(-8deg); }
        .tr-2:hover ~ .project-card-inner { transform: rotateX(12deg) rotateY(-4deg); }
        .tr-3:hover ~ .project-card-inner { transform: rotateX(12deg) rotateY(0deg); }
        .tr-4:hover ~ .project-card-inner { transform: rotateX(12deg) rotateY(4deg); }
        .tr-5:hover ~ .project-card-inner { transform: rotateX(12deg) rotateY(8deg); }
        
        .tr-6:hover ~ .project-card-inner { transform: rotateX(6deg) rotateY(-8deg); }
        .tr-7:hover ~ .project-card-inner { transform: rotateX(6deg) rotateY(-4deg); }
        .tr-8:hover ~ .project-card-inner { transform: rotateX(6deg) rotateY(0deg); }
        .tr-9:hover ~ .project-card-inner { transform: rotateX(6deg) rotateY(4deg); }
        .tr-10:hover ~ .project-card-inner { transform: rotateX(6deg) rotateY(8deg); }
        
        .tr-11:hover ~ .project-card-inner { transform: rotateX(0deg) rotateY(-8deg); }
        .tr-12:hover ~ .project-card-inner { transform: rotateX(0deg) rotateY(-4deg); }
        .tr-13:hover ~ .project-card-inner { transform: rotateX(0deg) rotateY(0deg); }
        .tr-14:hover ~ .project-card-inner { transform: rotateX(0deg) rotateY(4deg); }
        .tr-15:hover ~ .project-card-inner { transform: rotateX(0deg) rotateY(8deg); }
        
        .tr-16:hover ~ .project-card-inner { transform: rotateX(-6deg) rotateY(-8deg); }
        .tr-17:hover ~ .project-card-inner { transform: rotateX(-6deg) rotateY(-4deg); }
        .tr-18:hover ~ .project-card-inner { transform: rotateX(-6deg) rotateY(0deg); }
        .tr-19:hover ~ .project-card-inner { transform: rotateX(-6deg) rotateY(4deg); }
        .tr-20:hover ~ .project-card-inner { transform: rotateX(-6deg) rotateY(8deg); }
        
        .tr-21:hover ~ .project-card-inner { transform: rotateX(-12deg) rotateY(-8deg); }
        .tr-22:hover ~ .project-card-inner { transform: rotateX(-12deg) rotateY(-4deg); }
        .tr-23:hover ~ .project-card-inner { transform: rotateX(-12deg) rotateY(0deg); }
        .tr-24:hover ~ .project-card-inner { transform: rotateX(-12deg) rotateY(4deg); }
        .tr-25:hover ~ .project-card-inner { transform: rotateX(-12deg) rotateY(8deg); }
      `}</style>

      <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24">

        {/* Section Heading */}
        <div className="w-full mb-12 text-left">
          <h2
            className="text-5xl md:text-[5.5rem] font-sans font-black tracking-tighter uppercase text-white select-none drop-shadow-[0_2px_8px_rgba(255,255,255,0.02)]"
          >
            MY WORK
          </h2>
        </div>

        {/* Vertical list of staggered, alternating project rows */}
        <div className="flex flex-col gap-10">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
