import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-black px-4 md:px-8 pt-16 md:pt-24 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
          
          {/* Left Card */}
          <div className="bg-[#111111] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
            <div>
              <p className="text-xs text-zinc-500 tracking-widest font-bold uppercase mb-8">Footer</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Made it this far?</h2>
              <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-xl leading-relaxed">
                If you're interested in collaborating on projects, open source, or networking, let's get in touch.
              </p>
            </div>
            
            {/* Aditya Suryawanshi Typography */}
            <div className="mt-16">
              <span 
                className="text-[#f43f5e] text-5xl md:text-[4rem] block transform -rotate-2"
                style={{ 
                  fontFamily: "'Brush Script MT', 'Great Vibes', cursive", 
                  textShadow: "0 4px 15px rgba(244,63,94,0.3)" 
                }}
              >
                Aditya Suryawanshi
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 min-h-[400px]">
            
            {/* Call to Action Card */}
            <a 
              href="/contact" 
              className="group flex-1 bg-[#3ba2f6] hover:bg-[#2a8add] transition-colors rounded-[2rem] p-8 md:p-12 flex flex-col justify-between cursor-pointer"
            >
              <p className="text-xs text-black/80 tracking-widest font-bold uppercase">Call to Action</p>
              <div className="flex items-center justify-between mt-12">
                <h3 className="text-4xl md:text-5xl font-semibold text-black">Say hello</h3>
                <FiArrowRight className="w-8 h-8 text-black transform group-hover:translate-x-2 transition-transform" />
              </div>
            </a>

            {/* Social Card */}
            <div className="bg-[#18181b] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between">
              <p className="text-xs text-zinc-500 tracking-widest font-bold uppercase mb-8">Social</p>
              <div className="flex items-center gap-6 text-zinc-400">
                <a href="https://github.com/Aditya00038" className="hover:text-white transition-colors"><FaGithub className="w-6 h-6" /></a>
                <a href="#" className="hover:text-white transition-colors"><FaLinkedinIn className="w-6 h-6" /></a>
                <a href="#" className="hover:text-white transition-colors"><FaInstagram className="w-6 h-6" /></a>
              </div>
            </div>

          </div>
        </div>

        {/* Version of the Sites (Timeline) */}
        <div className="mt-24 w-full">
          <p className="text-xs text-white tracking-widest font-bold uppercase mb-8">Version of the sites</p>
          
          {/* Ruler Line */}
          <div className="w-full flex flex-col">
            <div 
              className="w-full h-3 border-b border-zinc-800" 
              style={{ background: 'repeating-linear-gradient(to right, #3f3f46 0, #3f3f46 1px, transparent 1px, transparent 16px)' }}
            ></div>
            
            {/* Years */}
            <div className="flex mt-6 justify-between w-full text-zinc-500 font-mono text-sm">
              <div className="px-4 py-1.5 border border-zinc-500 rounded-lg text-white font-semibold cursor-default">
                2026
              </div>
              <a href="https://aditya-portfolio-6sybe6fpt-adityas-projects-9c9aa8cb.vercel.app/" target="_blank" rel="noreferrer" className="px-4 py-1.5 hover:text-zinc-300 transition-colors cursor-pointer block">
                2025
              </a>
              <a href="https://2024-portfolio-beige.vercel.app/" target="_blank" rel="noreferrer" className="px-4 py-1.5 hover:text-zinc-300 transition-colors cursor-pointer block">
                2024
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
