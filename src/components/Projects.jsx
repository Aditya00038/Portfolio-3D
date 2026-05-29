import React from 'react';
import FlowArt, { FlowSection } from './ui/story-scroll';

// Sample high-fidelity Projects Data
const PROJECTS_DATA = [
  {
    id: 1,
    num: "01",
    category: "CIVIC TECH · PLATFORM",
    title: "Parivartan",
    subtitle: "Smart Civic Platform",
    description: "Parivartan is a smart civic engagement and workforce management platform designed to improve communication, transparency, and coordination between citizens, municipal authorities, and field workers through a centralized digital ecosystem.",
    github: "https://github.com",
    bgColor: "#18181b", // Dark Gray
    textColor: "#fff",
    bgImage: "/project_thumbnails/parivartan.jpeg"
  },
  {
    id: 2,
    num: "02",
    category: "FINTECH · AI",
    title: "DhanSathi",
    subtitle: "Smart Savings Platform",
    description: "DhanSathi is an AI-powered personal finance and savings discipline platform designed to help users build healthier financial habits through intelligent guidance, goal-based saving systems, and smart expense tracking.",
    github: "https://github.com",
    bgColor: "#18181b", // Dark Gray
    textColor: "#fff",
    bgImage: "/project_thumbnails/dhansathi.jpeg"
  },
  {
    id: 3,
    num: "03",
    category: "HEALTH TECH · AI",
    title: "Glyvora",
    subtitle: "AI Wellness Platform",
    description: "GLYVORA is an intelligent diabetes and wellness management platform designed to help individuals monitor, understand, and improve their daily health through AI-powered insights, real-time health tracking, and personalized wellness support.",
    github: "https://github.com",
    bgColor: "#18181b", // Dark Gray
    textColor: "#fff",
    bgImage: "/project_thumbnails/glyvora.jpeg"
  },
  {
    id: 4,
    num: "04",
    category: "EDTECH · LAB",
    title: "ChemStock",
    subtitle: "Lab Inventory Management",
    description: "ChemStock is a modern laboratory inventory and resource management platform designed to simplify the tracking, monitoring, and administration of chemicals, laboratory equipment, and research assets through a centralized digital system.",
    github: "https://github.com",
    bgColor: "#18181b", // Dark Gray
    textColor: "#fff",
    bgImage: "/project_thumbnails/chemstock.jpeg"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-black text-white">
      <FlowArt aria-label="Projects Flow Showcase">

        {/* Intro Section */}
        <FlowSection aria-label="Projects Intro" style={{ backgroundColor: '#000', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">00 — Selected Work</p>
          <hr className="my-[2vw] border-none border-t border-white/60" />
          <div>
            <h1 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
              PROJ
              <br />
              ECTS
            </h1>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/60" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-zinc-400">
            Scroll down to explore a curated selection of my latest work, featuring systems design, rendering engines, and high-impact features.
          </p>
        </FlowSection>

        {PROJECTS_DATA.map((project, idx) => (
          <FlowSection
            key={project.id}
            aria-label={project.title}
            style={{ 
              backgroundColor: project.bgColor, 
              color: project.textColor,
            }}
          >
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">{project.num} — {project.category}</p>
              <hr className="my-[2vw] border-none border-t border-white/60" />
            </div>

            <div className="relative z-10 flex flex-col h-full gap-12 lg:gap-24 flex-1 mt-4">
              {/* Left Side: Content */}
              <div className="flex-1 flex flex-col justify-between lg:w-[45%]">
                <div>
                  <h2 className="text-[clamp(2.5rem,5vw,6rem)] font-bold leading-[0.85] uppercase tracking-tight break-words">
                    {project.title}
                  </h2>
                  <h3 className="text-[clamp(1.2rem,2vw,2.5rem)] font-bold leading-none uppercase tracking-tight opacity-75 mt-4">
                    {project.subtitle}
                  </h3>
                </div>

                <div className="mt-12 lg:mt-auto">
                  <p className="max-w-[45ch] text-[clamp(1rem,1.5vw,1.25rem)] font-normal leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.link || project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-4 items-center gap-2 text-sm font-bold uppercase transition-all duration-300 active:scale-95 whitespace-nowrap w-fit"
                    >
                      View More <span className="text-lg leading-none">↗</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex bg-black/20 hover:bg-black/40 border border-white/20 backdrop-blur-md rounded-full px-8 py-4 items-center gap-3 text-sm font-bold uppercase transition-all duration-300 active:scale-95 text-white whitespace-nowrap w-fit"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Image (Absolute on Desktop, In-flow on Mobile) */}
              <div className="lg:absolute lg:top-0 lg:right-0 lg:w-[55%] lg:h-full w-full h-[60vh] min-h-[400px] rounded-3xl lg:rounded-none overflow-hidden relative group">
                {project.bgImage ? (
                  <>
                    <img 
                      src={project.bgImage} 
                      alt={project.title} 
                      className="w-full h-full object-contain object-center transform group-hover:scale-105 group-hover:blur-sm transition-all duration-700 ease-out" 
                    />
                    <a 
                      href={project.link || project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20"
                    >
                      <div className="bg-[#111] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl border border-white/10 hover:bg-[#222]">
                        View Project <span className="text-xl leading-none">↗</span>
                      </div>
                    </a>
                  </>
                ) : (
                  <div className="w-full h-full bg-black/20 flex flex-col items-center justify-center border-2 border-dashed border-white/20 lg:border-none">
                    <span className="opacity-50 text-sm font-bold uppercase tracking-widest">Visual Asset</span>
                    <span className="opacity-30 text-xs mt-2">Coming Soon</span>
                  </div>
                )}
              </div>
            </div>
          </FlowSection>
        ))}

      </FlowArt>
    </section>
  );
}
