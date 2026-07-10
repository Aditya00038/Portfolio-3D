import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

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
    images: ["/project_thumbnails/in_hand_parivartan_pic.jpeg"]
  },
  {
    id: 2,
    num: "02",
    category: "FINTECH · AI",
    title: "DhanSathi",
    subtitle: "Smart Savings Platform",
    description: "DhanSathi is an AI-powered personal finance and savings discipline platform designed to help users build healthier financial habits through intelligent guidance, goal-based saving systems, and smart expense tracking.",
    github: "https://github.com",
    bgColor: "#10b981", // Emerald-500
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
    bgColor: "#8b5cf6", // Violet-500
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
    bgColor: "#0ea5e9", // Sky-500
    textColor: "#fff",
    images: ["/project_thumbnails/chemstock.jpeg", "/project_thumbnails/chemstock.jpeg"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-white text-black flex flex-col">

        {/* Selected Work Title & Grid */}
        <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 pt-24 pb-32">
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-zinc-900 mb-20" style={{ fontFamily: "'Playfair Display', serif" }}>Selected work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-24 md:gap-y-32">
            {PROJECTS_DATA.map((project, idx) => (
              <a 
                key={project.id} 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                className={`flex flex-col group block ${idx % 2 === 1 ? 'md:mt-48' : ''}`}
              >
                {/* Image Container */}
                <div className="w-full relative overflow-hidden bg-zinc-100 mb-8 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                   {project.images && project.images.length > 0 ? (
                     <img 
                       src={project.images[0]} 
                       alt={`${project.title} screenshot`} 
                       className={`w-full h-auto object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 ${idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[16/9]'}`} 
                     />
                   ) : (
                     <div className={`w-full flex items-center justify-center text-zinc-600 font-mono text-sm ${idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[16/9]'}`}>Visual Asset Coming Soon</div>
                   )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl md:text-3xl font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm md:text-base font-mono text-zinc-500 whitespace-nowrap mt-1">2025–2026</span>
                  </div>
                  <p className="text-base text-zinc-600 max-w-md leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
    </section>
  );
}
