import React from 'react';
import { motion } from 'framer-motion';
import MinimalBackground from '../components/ui/minimal-background';
import GeometricBlurMesh from '../components/ui/geometric-blur-mesh';
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';

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
    <div className="w-full bg-[#0a0a0a] min-h-screen text-white relative overflow-hidden">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <MinimalBackground className="w-full h-full opacity-60" />
      </div>

      {/* Content layer: left-aligned reading container layered over the background */}
      <div className="w-full min-h-screen flex flex-col justify-start items-center pt-20 md:pt-24 pb-12 px-6 md:px-12 relative z-20 overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[950px] w-full flex flex-col items-start"
        >
          {/* Geometric WebGL Mesh Animation */}
          <motion.div 
            variants={itemVariants} 
            className="relative w-[150px] h-[100px] mb-4 select-none overflow-hidden rounded-xl flex items-center justify-start"
          >
            <GeometricBlurMesh />
          </motion.div>

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
        </motion.div>

        {/* The new obvious feeling bento grid */}
        <BentoGrid />
      </div>
      
      <Footer />
    </div>
  );
}
