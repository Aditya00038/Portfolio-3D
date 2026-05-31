import React from 'react';
import { motion } from 'framer-motion';
import { ImagePill } from '../components/ui/image-pill';
import { ScrollingTextPill } from '../components/ui/scrolling-text-pill';

export default function About() {
  return (
    <main className="w-full bg-black min-h-screen pt-32 md:pt-48 flex flex-col items-center font-sans overflow-hidden relative">
      <div className="max-w-[1400px] w-full px-4 md:px-12 flex flex-col items-center text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-4xl lg:text-[3.5rem] font-bold text-white leading-[1.3] md:leading-[1.5] tracking-tight"
        >
          {/* Line 1 */}
          <div className="flex flex-wrap items-center justify-center gap-y-4 mb-2 md:mb-6">
            <span>I'm</span>
            <span className="text-zinc-500 mx-3 md:mx-6 font-medium tracking-tighter" style={{ fontFamily: "'Inter', sans-serif" }}>aditya balkrishna suryawanshi</span>
            <ImagePill 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
              alt="Aditya" 
              className="w-16 h-8 md:w-[120px] md:h-[60px] ml-2"
            />
            <span>,</span>
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap items-center justify-center gap-y-4 mb-2 md:mb-6">
            <span>a Hybrid</span>
            <ScrollingTextPill />
            <span>Creative</span>
          </div>

          {/* Line 3 */}
          <div className="flex flex-wrap items-center justify-center gap-y-4">
            <span className="text-zinc-500 font-medium tracking-tight">based in</span>
            <ImagePill 
              src="https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?q=80&w=600&auto=format&fit=crop" 
              alt="Pune" 
              text="PUNE"
              className="w-20 h-10 md:w-[140px] md:h-[70px] ml-4 md:ml-6"
              imgClassName="brightness-50"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 md:mt-24 text-zinc-300 text-base md:text-xl font-light tracking-wide"
        >
          Bringing <span className="text-white font-medium border-b-[2px] border-white pb-1 mx-1">UX Magic</span> to life through design.
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          <button className="bg-[#0055FF] hover:bg-[#0044CC] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 shadow-lg shadow-blue-500/20">
            Let's work together
          </button>
          <button className="bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 backdrop-blur-sm">
            Explore my work
          </button>
        </motion.div>

      </div>
      
      {/* Background radial grid/gradient for subtle tech feel */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5227FF]/15 rounded-full blur-[150px] pointer-events-none z-0" />
    </main>
  );
}
