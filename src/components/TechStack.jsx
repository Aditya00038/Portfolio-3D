import React from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaJava, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiFramer, SiShadcnui, SiCplusplus, SiPython, SiMysql, SiMongodb, SiTypescript, SiIntellijidea } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { motion } from 'framer-motion';

const STACK_CATEGORIES = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    skills: [
      { name: 'React', icon: <FaReact className="w-8 h-8 md:w-9 md:h-9 animate-[spin_15s_linear_infinite]" color="#61DAFB" /> },
      { name: 'Next.Js', icon: <SiNextdotjs className="w-8 h-8 md:w-9 md:h-9" color="#ffffff" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8 md:w-9 md:h-9" color="#38BDF8" /> },
      { name: 'Framer Motion', icon: <SiFramer className="w-8 h-8 md:w-9 md:h-9" color="#0055FF" /> },
      { name: 'Shadcn UI', icon: <SiShadcnui className="w-8 h-8 md:w-9 md:h-9" color="#ffffff" /> },
      { name: 'HTML5', icon: <FaHtml5 className="w-8 h-8 md:w-9 md:h-9" color="#E34F26" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="w-8 h-8 md:w-9 md:h-9" color="#1572B6" /> }
    ]
  },
  {
    id: 'languages',
    title: 'LANGUAGES',
    skills: [
      { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8 md:w-9 md:h-9" color="#3178C6" /> },
      { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8 md:w-9 md:h-9" color="#F7DF1E" /> },
      { name: 'Python', icon: <SiPython className="w-8 h-8 md:w-9 md:h-9" color="#3776AB" /> },
      { name: 'Java', icon: <FaJava className="w-8 h-8 md:w-9 md:h-9" color="#F89820" /> },
      { name: 'C++', icon: <SiCplusplus className="w-8 h-8 md:w-9 md:h-9" color="#00599C" /> }
    ]
  },
  {
    id: 'database',
    title: 'DATABASE',
    skills: [
      { name: 'MySQL', icon: <SiMysql className="w-8 h-8 md:w-9 md:h-9" color="#00758F" /> },
      { name: 'MongoDB', icon: <SiMongodb className="w-8 h-8 md:w-9 md:h-9" color="#47A248" /> }
    ]
  },
  {
    id: 'tools',
    title: 'DEV TOOLS',
    skills: [
      { name: 'Git', icon: <FaGitAlt className="w-8 h-8 md:w-9 md:h-9" color="#F05032" /> },
      { name: 'VS Code', icon: <VscVscode className="w-8 h-8 md:w-9 md:h-9" color="#007ACC" /> },
      { name: 'IntelliJ IDEA', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" className="w-8 h-8 md:w-9 md:h-9 object-contain" alt="IntelliJ IDEA" /> }
    ]
  }
];

// Staggered container animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    }
  }
};

// spring pop-up animation for individual tech cards
const itemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.6, 
    y: 25 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 12 
    } 
  }
};

// Slide-in fade-in animation for headers
const headerVariants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

export default function TechStack() {
  return (
    <section
      id="tools"
      className="w-full pt-32 pb-24 md:pt-40 md:pb-32 bg-transparent text-white relative overflow-hidden"
    >
      {/* Import Oswald condensed Google Font */}
      <style dangerouslySetInnerHTML={{
        __html: `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');`
      }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header - bold uppercase matching site style */}
        <div className="w-full mb-16 text-left flex flex-col gap-4 border-b border-zinc-800 pb-6">
          <h2
            className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-sans font-black tracking-tighter uppercase text-white select-none leading-none"
            style={{ letterSpacing: "-0.04em" }}
          >
            TECH STACK
          </h2>
        </div>

        {/* Categories Stack List - Unified grid container for identical column alignments */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-12 md:gap-x-16 lg:gap-x-24 gap-y-16 items-start">
          {STACK_CATEGORIES.map((category) => (
            <React.Fragment key={category.id}>
              {/* Left Column: Category Name with scroll reveal */}
              <motion.h3
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-600/70 hover:text-zinc-500/90 transition-colors duration-300 uppercase select-none md:min-w-[240px] leading-none"
                style={{
                  fontFamily: '"Oswald", "Impact", "Arial Narrow", sans-serif',
                  letterSpacing: "0.03em",
                }}
              >
                {category.title}
              </motion.h3>

              {/* Right Column: Skills Grid with staggered pop-up animation */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 items-center w-full pt-2"
              >
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    variants={itemVariants}
                    whileHover={{ y: -3, scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4.5 group cursor-pointer select-none"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {skill.icon}
                    </div>
                    <span className="text-lg md:text-[1.18rem] font-medium text-zinc-300 group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
