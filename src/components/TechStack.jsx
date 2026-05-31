import React from 'react';

import { FaHtml5, FaCss3Alt, FaReact, FaJava, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiFramer, SiShadcnui, SiCplusplus, SiC, SiPython, SiFlask, SiFastapi, SiMysql, SiMongodb, SiFirebase, SiNumpy, SiPandas, SiJupyter } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const iconClass = "w-5 h-5";

const ICONS = {
  html: <FaHtml5 className={iconClass} color="#E34F26" />,
  css: <FaCss3Alt className={iconClass} color="#1572B6" />,
  js: <SiJavascript className={iconClass} color="#F7DF1E" />,
  tailwind: <SiTailwindcss className={iconClass} color="#38BDF8" />,
  react: <FaReact className={`${iconClass} animate-[spin_12s_linear_infinite]`} color="#61DAFB" />,
  nextjs: <SiNextdotjs className={iconClass} color="#FFFFFF" />,
  framer: <SiFramer className={iconClass} color="#0055FF" />,
  shadcn: <SiShadcnui className={iconClass} color="#FFFFFF" />,
  java: <FaJava className={iconClass} color="#F89820" />,
  cpp: <SiCplusplus className={iconClass} color="#00599C" />,
  c: <SiC className={iconClass} color="#A8B9CC" />,
  python: <SiPython className={iconClass} color="#3776AB" />,
  flask: <SiFlask className={iconClass} color="#FFFFFF" />,
  fastapi: <SiFastapi className={iconClass} color="#009688" />,
  mysql: <SiMysql className={iconClass} color="#00758F" />,
  mongodb: <SiMongodb className={iconClass} color="#47A248" />,
  firebase: <SiFirebase className={iconClass} color="#FFCA28" />,
  numpy: <SiNumpy className={iconClass} color="#013243" />,
  pandas: <SiPandas className={iconClass} color="#150458" />,
  jupyter: <SiJupyter className={iconClass} color="#F37626" />,
  vscode: <VscVscode className={iconClass} color="#007ACC" />,
  git: <FaGitAlt className={iconClass} color="#F05032" />,
  github: <FaGithub className={iconClass} color="#FFFFFF" />,
  intellij: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" className={iconClass} alt="IntelliJ IDEA" />
};

// Config Row data lists
const ROW_1 = [
  { name: 'HTML', icon: ICONS.html },
  { name: 'CSS', icon: ICONS.css },
  { name: 'JavaScript', icon: ICONS.js },
  { name: 'Tailwind CSS', icon: ICONS.tailwind },
  { name: 'React.js', icon: ICONS.react },
  { name: 'Next.js', icon: ICONS.nextjs },
  { name: 'Framer Motion', icon: ICONS.framer },
  { name: 'Shadcn UI', icon: ICONS.shadcn }
];

const ROW_2 = [
  { name: 'Java', icon: ICONS.java },
  { name: 'C++', icon: ICONS.cpp },
  { name: 'C', icon: ICONS.c },
  { name: 'Python', icon: ICONS.python },
  { name: 'Flask', icon: ICONS.flask },
  { name: 'FastAPI', icon: ICONS.fastapi },
  { name: 'MySQL', icon: ICONS.mysql },
  { name: 'MongoDB', icon: ICONS.mongodb },
  { name: 'Firebase', icon: ICONS.firebase }
];

const ROW_3 = [
  { name: 'NumPy', icon: ICONS.numpy },
  { name: 'Pandas', icon: ICONS.pandas },
  { name: 'Jupyter Notebook', icon: ICONS.jupyter },
  { name: 'VS Code', icon: ICONS.vscode },
  { name: 'IntelliJ IDEA', icon: ICONS.intellij },
  { name: 'Git', icon: ICONS.git },
  { name: 'GitHub', icon: ICONS.github }
];

export default function TechStack() {
  return (
    <section 
      id="tools"
      className="relative w-full py-24 bg-black text-white overflow-hidden"
    >
      
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(82,39,255,0.02)_0%,transparent_60%)] pointer-events-none" />

      {/* Standard Bounded Container matching text margins */}
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">
        
        <div className="flex flex-col gap-12 items-center">
          
          {/* Tech Stack Content */}
          <div className="w-full flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-12 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl lg:text-[3.3rem] font-bold tracking-tight text-white mb-2 leading-none">
                What do I use
              </h2>
              <div className="w-12 h-[2.5px] bg-[#5227FF] mt-4" />
            </div>

            {/* Bounded, Framed Scrolling Panel */}
            <div className="relative w-full rounded-[2rem] border border-white/5 bg-[#0a0a0c]/50 backdrop-blur-xl p-6 md:p-8 overflow-hidden max-w-5xl mx-auto">
              
              {/* Glass edge gradient fades for stunning visual framed border transitions */}
              <div className="absolute top-0 left-0 h-full w-12 md:w-16 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 h-full w-12 md:w-16 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

              {/* Scrolling Marquees container */}
              <div className="w-full flex flex-col gap-4 md:gap-5 relative select-none">
                
                {/* Row 1: Left scrolling */}
                <div className="w-full overflow-hidden flex relative py-0.5">
                  <div className="flex w-max gap-3 md:gap-4 animate-[marqueeLeft_35s_linear_infinite]">
                    {/* Copy 1 */}
                    <div className="flex gap-3 md:gap-4">
                      {ROW_1.map((tech, idx) => (
                        <div 
                          key={`r1-c1-${idx}`} 
                          className="flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/40 hover:border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-3 md:px-5 md:py-3.5 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.015)]"
                        >
                          {tech.icon}
                          <span className="text-sm font-medium tracking-wide text-zinc-300 hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* Copy 2 */}
                    <div className="flex gap-3 md:gap-4">
                      {ROW_1.map((tech, idx) => (
                        <div 
                          key={`r1-c2-${idx}`} 
                          className="flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/40 hover:border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-3 md:px-5 md:py-3.5 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.015)]"
                        >
                          {tech.icon}
                          <span className="text-sm font-medium tracking-wide text-zinc-300 hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Right scrolling */}
                <div className="w-full overflow-hidden flex relative py-0.5">
                  <div className="flex w-max gap-3 md:gap-4 animate-[marqueeRight_38s_linear_infinite]">
                    {/* Copy 1 */}
                    <div className="flex gap-3 md:gap-4">
                      {ROW_2.map((tech, idx) => (
                        <div 
                          key={`r2-c1-${idx}`} 
                          className="flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/40 hover:border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-3 md:px-5 md:py-3.5 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.015)]"
                        >
                          {tech.icon}
                          <span className="text-sm font-medium tracking-wide text-zinc-300 hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* Copy 2 */}
                    <div className="flex gap-3 md:gap-4">
                      {ROW_2.map((tech, idx) => (
                        <div 
                          key={`r2-c2-${idx}`} 
                          className="flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/40 hover:border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-3 md:px-5 md:py-3.5 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.015)]"
                        >
                          {tech.icon}
                          <span className="text-sm font-medium tracking-wide text-zinc-300 hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 3: Left scrolling */}
                <div className="w-full overflow-hidden flex relative py-0.5">
                  <div className="flex w-max gap-3 md:gap-4 animate-[marqueeLeft_32s_linear_infinite]">
                    {/* Copy 1 */}
                    <div className="flex gap-3 md:gap-4">
                      {ROW_3.map((tech, idx) => (
                        <div 
                          key={`r3-c1-${idx}`} 
                          className="flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/40 hover:border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-3 md:px-5 md:py-3.5 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.015)]"
                        >
                          {tech.icon}
                          <span className="text-sm font-medium tracking-wide text-zinc-300 hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* Copy 2 */}
                    <div className="flex gap-3 md:gap-4">
                      {ROW_3.map((tech, idx) => (
                        <div 
                          key={`r3-c2-${idx}`} 
                          className="flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/40 hover:border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-3 md:px-5 md:py-3.5 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.015)]"
                        >
                          {tech.icon}
                          <span className="text-sm font-medium tracking-wide text-zinc-300 hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS Inject for Hardware Accelerated loops */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}} />
    </section>
  );
}
