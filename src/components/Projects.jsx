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
    bgColor: "#000000", // Pure Black
    textColor: "#fff",
    images: ["/project_thumbnails/parivartan.jpeg", "/project_thumbnails/parivartan.jpeg"]
  },
  {
    id: 2,
    num: "02",
    category: "FINTECH · AI",
    title: "DhanSathi",
    subtitle: "Smart Savings Platform",
    description: "DhanSathi is an AI-powered personal finance and savings discipline platform designed to help users build healthier financial habits through intelligent guidance, goal-based saving systems, and smart expense tracking.",
    github: "https://github.com",
    bgColor: "#000000", // Pure Black
    textColor: "#fff",
    images: ["/project_thumbnails/dhansathi.jpeg", "/project_thumbnails/dhansathi.jpeg"]
  },
  {
    id: 3,
    num: "03",
    category: "HEALTH TECH · AI",
    title: "Glyvora",
    subtitle: "AI Wellness Platform",
    description: "GLYVORA is an intelligent diabetes and wellness management platform designed to help individuals monitor, understand, and improve their daily health through AI-powered insights, real-time health tracking, and personalized wellness support.",
    github: "https://github.com",
    bgColor: "#000000", // Pure Black
    textColor: "#fff",
    images: ["/project_thumbnails/glyvora.jpeg", "/project_thumbnails/glyvora.jpeg"]
  },
  {
    id: 4,
    num: "04",
    category: "EDTECH · LAB",
    title: "ChemStock",
    subtitle: "Lab Inventory Management",
    description: "ChemStock is a modern laboratory inventory and resource management platform designed to simplify the tracking, monitoring, and administration of chemicals, laboratory equipment, and research assets through a centralized digital system.",
    github: "https://github.com",
    bgColor: "#000000", // Pure Black
    textColor: "#fff",
    images: ["/project_thumbnails/chemstock.jpeg", "/project_thumbnails/chemstock.jpeg"]
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
              backgroundColor: '#151515', 
              color: '#fff',
            }}
          >
            {/* Main Project Card Container */}
            <div className="w-full h-full lg:max-h-[85vh] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-8 lg:gap-12 relative overflow-hidden my-auto mx-auto max-w-7xl">
              
              {/* Left Column (Content) */}
              <div className="flex-1 flex flex-col justify-between z-10 lg:w-1/2">
                <div className="flex flex-col gap-6">
                  {/* Abstract Icon Placeholder */}
                  <div className="w-14 h-14 bg-white rounded-2xl flex p-2.5 items-center justify-center overflow-hidden shadow-lg">
                    <div className="w-full h-full grid grid-cols-3 gap-1">
                       <div className="rounded-full bg-red-500"></div>
                       <div className="rounded-full bg-yellow-500"></div>
                       <div className="rounded-full bg-green-500"></div>
                       <div className="rounded-full bg-blue-500"></div>
                       <div className="rounded-full bg-indigo-500"></div>
                       <div className="rounded-full bg-purple-500"></div>
                       <div className="rounded-full bg-pink-500"></div>
                       <div className="rounded-full bg-orange-500"></div>
                       <div className="rounded-full bg-teal-500"></div>
                    </div>
                  </div>
                  
                  {/* Category / Subtitle */}
                  <h3 className="text-zinc-400 font-semibold text-lg md:text-xl tracking-wide mt-2">
                    {project.subtitle}
                  </h3>

                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] text-zinc-100 max-w-xl">
                    {project.title}: {project.description.split(' ').slice(0, 8).join(' ')}...
                  </h2>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 flex flex-wrap gap-4 items-center">
                  <a href={project.github} target="_blank" rel="noreferrer" className="bg-black hover:bg-[#0a0a0a] border border-zinc-800 text-white font-bold text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-xl transition-all shadow-lg active:scale-95">
                    Read Case Study
                  </a>
                  <a href={project.link || project.github} target="_blank" rel="noreferrer" className="border border-zinc-700 hover:border-zinc-500 bg-transparent text-white font-bold text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center gap-2">
                    Live Site <span className="text-lg leading-none">↗</span>
                  </a>
                </div>
              </div>

              {/* Right Column (Image Gallery) */}
              <div className="lg:w-1/2 w-full h-[300px] lg:h-full mt-8 lg:mt-0 flex items-center justify-end relative">
                {/* Scrollable container for the images */}
                <div className="w-full lg:w-[120%] h-full lg:h-[95%] rounded-[2rem] overflow-y-auto overflow-x-hidden snap-y snap-mandatory flex flex-col bg-[#222] border border-zinc-800 shadow-2xl relative lg:absolute lg:right-[-5%] lg:top-[2.5%] pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                   {project.images && project.images.length > 0 ? (
                     project.images.map((img, i) => (
                       <img 
                         key={i} 
                         src={img} 
                         alt={`${project.title} screenshot ${i+1}`} 
                         className="w-full h-full flex-shrink-0 object-cover object-left-top snap-center" 
                       />
                     ))
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm">Visual Asset Coming Soon</div>
                   )}
                </div>
              </div>

            </div>
          </FlowSection>
        ))}

      </FlowArt>
    </section>
  );
}
