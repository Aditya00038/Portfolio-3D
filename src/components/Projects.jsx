import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projectsData';

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

  return (
    <Link 
      to={`/project/${project.id}`} 
      className="flex flex-col w-full group no-underline"
    >
      {/* 3D Tilt Image Panel */}
      <div className="w-full relative z-20">
        <div
          className="project-card-container relative w-full rounded-[2.5rem] md:rounded-[3rem] cursor-pointer overflow-hidden bg-zinc-950 border border-zinc-800/40 shadow-2xl"
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

          {/* 5x5 CSS 3D Tracker Overlay */}
          <div className="absolute inset-0 z-30 grid grid-cols-5 grid-rows-5 pointer-events-auto">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`project-card-tracker tr-${i + 1} z-20`}
              />
            ))}

            {/* The actual image element that tilts and matches container dimensions */}
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="project-card-inner absolute inset-0 w-full h-full object-cover rounded-[2.5rem] md:rounded-[3rem] pointer-events-none z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              draggable={false}
            />
          </div>

          {/* Project Tags (Bottom Left of Image Card) */}
          <div className="absolute bottom-6 left-6 z-40 flex flex-wrap gap-2 pointer-events-none">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-black/85 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-lg border border-white/10 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

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
      <div className="flex flex-col text-left mt-6 font-sans">
        <div className="flex justify-between items-center text-zinc-500 text-xs font-mono uppercase tracking-wider mb-2">
          <span>{project.num} — {project.category}</span>
          <span>{project.domain}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#3ba2f6] transition-colors duration-300">
          {project.title}
        </h3>
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

        {/* 2-Column Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
