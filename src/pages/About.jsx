import React from 'react';
import { motion } from 'framer-motion';
import BentoGrid from '../components/BentoGrid';
import Footer from '../components/Footer';
import PhotoStack from '../components/ui/PhotoStack';
import HorizontalGallery from '../components/HorizontalGallery';
import KineticGrid from '../components/ui/KineticGrid';

const photosList = [
  {
    id: 'photo-1',
    src: '/Gallery/me.png',
    alt: 'Aditya Suryawanshi',
    name: 'Aditya Suryawanshi',
    role: 'Computer Engineering Student'
  },
  {
    id: 'photo-2',
    src: '/Gallery/me6.jpeg',
    alt: 'Aditya Suryawanshi',
    name: 'Aditya Suryawanshi',
    role: 'Full Stack Systems'
  },
  {
    id: 'photo-3',
    src: '/Gallery/me2.png',
    alt: 'Aditya Suryawanshi',
    name: 'Aditya Suryawanshi',
    role: 'AI & Web Engineer'
  },
  {
    id: 'photo-4',
    src: '/Gallery/me3.png',
    alt: 'Aditya Suryawanshi',
    name: 'Aditya Suryawanshi',
    role: 'Collaborator & Builder'
  },
  {
    id: 'photo-5',
    src: '/Gallery/me4.png',
    alt: 'Aditya Suryawanshi',
    name: 'Aditya Suryawanshi',
    role: 'Problem Solver'
  },
  {
    id: 'photo-6',
    src: '/Gallery/me5.png',
    alt: 'Aditya Suryawanshi',
    name: 'Aditya Suryawanshi',
    role: 'Tech Enthusiast'
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
    <div className="w-full bg-transparent min-h-screen text-white relative overflow-hidden">
      {/* Intro section: contains Kinetic Grid as an absolute background */}
      <div className="w-full relative pt-44 md:pt-56 pb-20 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden z-20">
        {/* Background Kinetic Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <KineticGrid
            background="transparent"
            dotColor="#ffffff"
            lineColor="#ffffff"
            activeLineColor="#38bdf8"
            activeDotColor="#38bdf8"
            trailColor="#38bdf8"
            spacing={65}
            radius={400}
            strength={4}
            trail={true}
          />
        </div>

        {/* Main wrapper holding the 2 columns (centered vertically relative to each other) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[950px] w-full flex flex-col md:flex-row gap-10 md:gap-16 items-center justify-between relative z-10"
        >
          {/* Left Column: Text description */}
          <div className="flex-1 w-full flex flex-col items-start justify-center">
            {/* Philosophical Paragraph Blocks with Loose Line Heights */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-zinc-400 text-[1.05rem] md:text-[1.15rem] leading-[1.75] md:leading-[1.85] font-light"
              style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Inter, sans-serif" }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-white tracking-tight mt-0 pt-0 mb-6 leading-none">
                Hi, I'm Aditya Suryawanshi
              </h1>
              <p>
                A Computer Engineering student at MIT Academy of Engineering, Pune. I don't just write code. I think about the person on the other side — what they need, what slows them down, and how software can quietly make that better. Web apps, AI, backend systems — I work across the stack, but the thread that connects it all is a simple question: does this actually help someone? I'm hands-on by nature. I learn by doing, grow by collaborating, and find the most satisfaction when an idea I once sketched out is finally running in production.
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
      </div>

      {/* Bento Grid Section */}
      <div className="w-full flex flex-col justify-center items-center pb-12 px-6 md:px-12 relative z-20">
        <BentoGrid />
      </div>

      {/* Horizontal Pinning Scroll Gallery (Full screen width edge-to-edge!) */}
      <HorizontalGallery />

      <Footer />
    </div>
  );
}
