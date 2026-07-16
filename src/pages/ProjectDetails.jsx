import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../data/projectsData';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectDetails() {
  const { id } = useParams();
  const project = PROJECTS_DATA.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans px-6">
        <h2 className="text-3xl font-bold mb-4">Project not found</h2>
        <Link to="/" className="text-blue-500 hover:text-blue-400 font-semibold flex items-center gap-2">
          <FiArrowLeft /> Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans pt-32 pb-24 overflow-x-hidden relative">
      {/* Background gradients for premium ambiance */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 font-semibold text-sm mb-12 group cursor-pointer"
        >
          <FiArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header Block */}
        <div className="flex flex-col text-left mb-12">
          <span className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-widest mb-3">
            {project.num} — {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-tight mb-6">
            {project.title}
          </h1>
          <div className="w-20 h-1 bg-[#3ba2f6] rounded-full mb-8" />
        </div>

        {/* Large Mockup Image Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-950 mb-16"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto block rounded-3xl"
          />
        </motion.div>

        {/* Project Meta and Description Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          
          {/* Side Info Box */}
          <div className="flex flex-col gap-8 text-left bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-3xl backdrop-blur-md">
            <div>
              <h4 className="text-xs text-zinc-500 font-mono tracking-wider uppercase mb-3">Domain</h4>
              <p className="text-base text-zinc-100 font-semibold">{project.domain}</p>
            </div>

            <div>
              <h4 className="text-xs text-zinc-500 font-mono tracking-wider uppercase mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span 
                    key={idx} 
                    className="bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 px-3 py-1 rounded-md text-xs font-medium cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs text-zinc-500 font-mono tracking-wider uppercase mb-3">Roles / Attributes</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <a 
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg text-sm"
              >
                <FiGithub size={16} />
                <span>Source Code</span>
                <FiExternalLink size={14} className="opacity-60" />
              </a>
            </div>
          </div>

          {/* Detailed Project Story */}
          <div className="flex flex-col text-left font-sans">
            <h3 className="text-2xl font-bold text-white mb-6">Project Overview</h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              {project.description}
            </p>
            
            <h3 className="text-2xl font-bold text-white mb-6">The Story & Implementation</h3>
            <p className="text-zinc-400 text-base leading-relaxed whitespace-pre-line mb-8">
              {project.longDescription}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
