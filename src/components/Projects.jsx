import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projectsData';

const getProjectTheme = (id) => {
  switch (id) {
    case 1: // Parivartan (Civic Tech)
      return {
        badgeBg: 'bg-[#a7f3d0]',
        badgeText: 'text-[#064e3b]'
      };
    case 2: // DhanSathi (Fintech)
      return {
        badgeBg: 'bg-[#93c5fd]',
        badgeText: 'text-[#1a365d]'
      };
    case 3: // Glyvora (Health Tech)
      return {
        badgeBg: 'bg-[#fbcfe8]',
        badgeText: 'text-[#701a75]'
      };
    case 4: // ChemStock (Lab Tech / Inventory)
      return {
        badgeBg: 'bg-[#8cd19d]',
        badgeText: 'text-[#1f5c35]'
      };
    default:
      return {
        badgeBg: 'bg-zinc-800',
        badgeText: 'text-zinc-200'
      };
  }
};

function ProjectCard({ project }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const domainPills = project.domain ? project.domain.split(' · ').map(d => d.toUpperCase()) : [];
  const tagPills = project.tags ? project.tags.map(t => t.toUpperCase()) : [];
  const pills = [...domainPills, ...tagPills];

  return (
    <Link 
      to={`/project/${project.id}`} 
      className="flex flex-col w-full group no-underline"
    >
      {/* Image Panel */}
      <div className="w-full relative z-20">
        <div
          className="relative w-full rounded-[2.5rem] md:rounded-[3rem] cursor-pointer overflow-hidden bg-zinc-950 border border-zinc-800/40 shadow-2xl"
          data-cursor="hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Invisible static image to reserve space based on natural aspect ratio */}
          <img
            src={project.image}
            alt=""
            className="w-full h-auto opacity-0 pointer-events-none"
            draggable={false}
          />

          {/* The actual image element that matches container dimensions */}
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] md:rounded-[3rem] pointer-events-none z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            draggable={false}
          />

          {/* Floating 'VIEW' follow-badge */}
          {isHovered && (
            <motion.div
              style={{ left: mousePos.x, top: mousePos.y }}
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-white text-black px-6 py-2.5 rounded-full text-xs font-mono font-black tracking-wider uppercase shadow-2xl z-40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              VIEW
            </motion.div>
          )}

        </div>
      </div>

      {/* Text Info Below Image */}
      <div className="flex flex-col text-left mt-5 font-sans">
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#3ba2f6] transition-colors duration-300 mb-3.5">
          {project.title}
        </h3>
        
        {/* Rounded Badges with Project Theme Colors */}
        <div className="flex flex-wrap gap-2.5 items-center">
          {/* Subtle Project Number Badge */}
          <span className="text-xs font-mono text-zinc-500 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {project.num}
          </span>
          {pills.map((pill, idx) => {
            const theme = getProjectTheme(project.id);
            return (
              <span 
                key={idx} 
                className={`text-[10px] md:text-xs ${theme.badgeBg} ${theme.badgeText} px-3.5 py-1.5 rounded-lg font-bold tracking-wider uppercase transition-transform duration-300 hover:scale-[1.03] cursor-default`}
              >
                {pill}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full bg-black text-white py-24 relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem]"
    >


      <div className="w-full px-6 md:px-12 lg:px-16">

        {/* Section Heading */}
        <div className="w-full mb-16 text-left flex flex-col gap-4 border-b border-zinc-800 pb-6">
          <h2 
            className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-sans font-black tracking-tighter uppercase text-white select-none leading-none"
            style={{ letterSpacing: "-0.04em" }}
          >
            SELECTED WORKS
          </h2>
        </div>

        {/* Responsive Masonry Grid of Projects */}
        {/* On mobile: single column keeping standard 1-2-3-4 sequential order */}
        <div className="md:hidden flex flex-col gap-y-20">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* On desktop: two independent columns to prevent height alignment gaps */}
        <div className="hidden md:flex md:flex-row gap-x-12">
          {/* Left Column */}
          <div className="flex flex-col gap-y-20 w-1/2">
            {PROJECTS_DATA.filter((_, idx) => idx % 2 === 0).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-y-20 w-1/2">
            {PROJECTS_DATA.filter((_, idx) => idx % 2 === 1).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
