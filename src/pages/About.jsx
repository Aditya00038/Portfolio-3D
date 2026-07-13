import React from 'react';
import { motion } from 'framer-motion';
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';
import PhotoStack from '../components/ui/PhotoStack';
import HorizontalGallery from '../components/HorizontalGallery';

const photosList = [
  {
    id: 'photo-1',
    src: '/extra_images/me.png',
    alt: 'Aditya Suryawanshi - Beach Portrait',
    name: 'Aditya Suryawanshi',
    role: 'Computer Engineering Student'
  },
  {
    id: 'photo-2',
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    alt: 'MIT Academy of Engineering, Pune',
    name: 'Engineering & Code',
    role: 'MIT AOE, Pune'
  },
  {
    id: 'photo-3',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    alt: 'Full Stack Web Developer',
    name: 'Full Stack Systems',
    role: 'React, Node, Python'
  }
];

export default function About() {
  // Staggered motion container variant
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.18
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <div className="w-full bg-black min-h-screen text-white relative overflow-hidden">
      {/* Content layer: vertically and horizontally centered with top clearance for fixed navbar */}
      <div className="w-full flex flex-col justify-center items-center pt-32 md:pt-36 pb-12 px-6 md:px-12 relative z-20">
        
        {/* Main wrapper holding the 2 columns (centered vertically relative to each other) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[950px] w-full flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-between mb-16"
        >
          {/* Left Column: Text description */}
          <div className="flex-1 w-full flex flex-col items-start justify-center">
            {/* Philosophical Paragraph Blocks with Loose Line Heights */}
            <motion.div 
              variants={itemVariants}
              className="space-y-4 text-zinc-400 text-[1.05rem] md:text-[1.15rem] leading-[1.75] md:leading-[1.85] font-light"
              style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" }}
            >
              <p>
                I'm Aditya Suryawanshi — a Computer Engineering student at MIT Academy of Engineering, Pune.
              </p>
              <p>
                I don't just write code. I think about the person on the other side — what they need, what slows them down, and how software can quietly make that better.
              </p>
              <p>
                Web apps, AI, backend systems — I work across the stack, but the thread that connects it all is a simple question: does this actually help someone?
              </p>
              <p>
                I'm hands-on by nature. I learn by doing, grow by collaborating, and find the most satisfaction when an idea I once sketched out is finally running in production.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Interactive Widescreen Photo Stack */}
          <motion.div 
            variants={itemVariants}
            className="w-[280px] lg:w-[320px] h-[370px] md:h-[400px] lg:h-[420px] flex-shrink-0 relative group self-center md:self-auto"
          >
            {/* Subtle glow border behind the stack */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <PhotoStack 
              photos={photosList} 
              className="w-full h-full relative z-10" 
            />
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid />
      </div>

      {/* Horizontal Pinning Scroll Gallery (Full screen width edge-to-edge!) */}
      <HorizontalGallery />
      
      <Footer />
    </div>
  );
}
