import React from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaJava, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiFramer, SiShadcnui, SiCplusplus, SiC, SiPython, SiFlask, SiFastapi, SiMysql, SiMongodb, SiFirebase, SiNumpy, SiPandas, SiJupyter } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const iconClass = "w-10 h-10 md:w-14 md:h-14 transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.02)]";

const TOOLS = [
  { name: 'HTML', icon: <FaHtml5 className={iconClass} color="#E34F26" /> },
  { name: 'CSS', icon: <FaCss3Alt className={iconClass} color="#1572B6" /> },
  { name: 'JavaScript', icon: <SiJavascript className={iconClass} color="#F7DF1E" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className={iconClass} color="#38BDF8" /> },
  { name: 'React.js', icon: <FaReact className={`${iconClass} animate-[spin_12s_linear_infinite]`} color="#61DAFB" /> },
  { name: 'Next.js', icon: <SiNextdotjs className={iconClass} color="#FFFFFF" /> },
  { name: 'Framer Motion', icon: <SiFramer className={iconClass} color="#0055FF" /> },
  { name: 'Shadcn UI', icon: <SiShadcnui className={iconClass} color="#FFFFFF" /> },
  { name: 'Java', icon: <FaJava className={iconClass} color="#F89820" /> },
  { name: 'C++', icon: <SiCplusplus className={iconClass} color="#00599C" /> },
  { name: 'C', icon: <SiC className={iconClass} color="#A8B9CC" /> },
  { name: 'Python', icon: <SiPython className={iconClass} color="#3776AB" /> },
  { name: 'Flask', icon: <SiFlask className={iconClass} color="#FFFFFF" /> },
  { name: 'FastAPI', icon: <SiFastapi className={iconClass} color="#009688" /> },
  { name: 'MySQL', icon: <SiMysql className={iconClass} color="#00758F" /> },
  { name: 'MongoDB', icon: <SiMongodb className={iconClass} color="#47A248" /> },
  { name: 'Firebase', icon: <SiFirebase className={iconClass} color="#FFCA28" /> },
  { name: 'NumPy', icon: <SiNumpy className={iconClass} color="#013243" /> },
  { name: 'Pandas', icon: <SiPandas className={iconClass} color="#150458" /> },
  { name: 'Jupyter Notebook', icon: <SiJupyter className={iconClass} color="#F37626" /> },
  { name: 'VS Code', icon: <VscVscode className={iconClass} color="#007ACC" /> },
  { name: 'IntelliJ IDEA', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" className={iconClass} alt="IntelliJ IDEA" /> },
  { name: 'Git', icon: <FaGitAlt className={iconClass} color="#F05032" /> },
  { name: 'GitHub', icon: <FaGithub className={iconClass} color="#FFFFFF" /> }
];

const duplicatedTools = [...TOOLS, ...TOOLS];

export default function TechStack() {
  return (
    <section 
      id="tools"
      className="relative w-full py-16 md:py-24 bg-black text-white overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(82,39,255,0.02)_0%,transparent_60%)] pointer-events-none" />

      <div className="w-full flex flex-col items-center">
        {/* Full-width, Framed Scrolling Panel */}
        <div className="relative w-full overflow-hidden">
          
          {/* Glass edge gradient fades - wider fades for beautiful edge transition */}
          <div className="absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquees container */}
          <div className="w-full overflow-hidden flex relative py-2 select-none">
            <div className="flex w-max gap-8 md:gap-12 animate-[marqueeLeft_50s_linear_infinite]">
              {/* Copy 1 */}
              <div className="flex gap-8 md:gap-12">
                {duplicatedTools.map((tool, idx) => (
                  <div 
                    key={`t1-${idx}`} 
                    className="flex items-center justify-center hover:scale-115 transition-all duration-300 select-none cursor-pointer p-2 hover:filter hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    title={tool.name}
                  >
                    {tool.icon}
                  </div>
                ))}
              </div>
              {/* Copy 2 */}
              <div className="flex gap-8 md:gap-12">
                {duplicatedTools.map((tool, idx) => (
                  <div 
                    key={`t2-${idx}`} 
                    className="flex items-center justify-center hover:scale-115 transition-all duration-300 select-none cursor-pointer p-2 hover:filter hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                    title={tool.name}
                  >
                    {tool.icon}
                  </div>
                ))}
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
      `}} />
    </section>
  );
}
