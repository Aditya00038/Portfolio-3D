import React from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaJava, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiFramer, SiShadcnui, SiCplusplus, SiC, SiPython, SiFlask, SiFastapi, SiMysql, SiMongodb, SiFirebase, SiNumpy, SiPandas, SiJupyter } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Large inner tech icon size
const iconClass = "w-8 h-8 md:w-10 md:h-10 transition-transform duration-300";

const TOOLS = [
  { name: 'React.js', icon: <FaReact className={`${iconClass} animate-[spin_15s_linear_infinite]`} color="#61DAFB" /> },
  { name: 'JavaScript', icon: <SiJavascript className={iconClass} color="#F7DF1E" /> },
  { name: 'Next.js', icon: <SiNextdotjs className={iconClass} color="#000000" /> },
  { name: 'Framer Motion', icon: <SiFramer className={iconClass} color="#0055FF" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className={iconClass} color="#38BDF8" /> },
  { name: 'Shadcn UI', icon: <SiShadcnui className={iconClass} color="#000000" /> },
  { name: 'HTML', icon: <FaHtml5 className={iconClass} color="#E34F26" /> },
  { name: 'CSS', icon: <FaCss3Alt className={iconClass} color="#1572B6" /> },
  { name: 'VS Code', icon: <VscVscode className={iconClass} color="#007ACC" /> },
  { name: 'Git', icon: <FaGitAlt className={iconClass} color="#F05032" /> },
  { name: 'GitHub', icon: <FaGithub className={iconClass} color="#000000" /> },
  { name: 'Java', icon: <FaJava className={iconClass} color="#F89820" /> },
  { name: 'C++', icon: <SiCplusplus className={iconClass} color="#00599C" /> },
  { name: 'Python', icon: <SiPython className={iconClass} color="#3776AB" /> },
  { name: 'MySQL', icon: <SiMysql className={iconClass} color="#00758F" /> },
  { name: 'MongoDB', icon: <SiMongodb className={iconClass} color="#47A248" /> }
];

export default function TechStack() {
  return (
    <section 
      id="tools"
      className="w-full py-28 bg-[#ececed] text-zinc-900 flex flex-col items-center justify-center rounded-t-[2rem] md:rounded-t-[3rem] relative overflow-hidden"
    >
      {/* Subtle grid background for premium texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfdfdf_1px,transparent_1px),linear-gradient(to_bottom,#dfdfdf_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 px-6 relative z-10 w-full">
        
        {/* Headline Row 1 */}
        <h2 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-none select-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          Tools & technologies
        </h2>
        
        {/* Row of iOS-style rounded tool tiles with static layout & simple hover states */}
        <div className="flex flex-wrap justify-center items-center gap-4 my-6 w-full py-2">
          {TOOLS.map((tool, idx) => (
            <div 
              key={idx} 
              className="relative group cursor-pointer select-none"
            >
              {/* Tile - White rounded-2xl square */}
              <div 
                className="w-14 h-14 md:w-16 md:h-16 bg-white border border-zinc-200/80 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.01)] hover:scale-115 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out relative z-10"
              >
                {tool.icon}
              </div>

              {/* Floating Tooltip - White background with premium styling */}
              <div 
                className="absolute top-[115%] left-1/2 -translate-x-1/2 bg-white text-zinc-800 text-[10px] md:text-xs font-sans font-semibold px-2.5 py-1.5 rounded-md shadow-lg border border-zinc-200 pointer-events-none opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-30 whitespace-nowrap"
              >
                {tool.name}
              </div>
            </div>
          ))}
        </div>

        {/* Headline Row 2 */}
        <h2 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-none select-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          I work with.
        </h2>
        
        <p className="text-xs md:text-sm text-zinc-500 font-mono uppercase tracking-[0.2em] mt-4 select-none">
          Optimized for performance, responsiveness, and clean aesthetics
        </p>
      </div>
    </section>
  );
}
