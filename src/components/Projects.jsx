import React, { useRef, useState, useEffect } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';

// Sample high-fidelity Projects Data with custom redirection routes
const PROJECTS_DATA = [
  {
    id: 1,
    num: "01",
    category: "SHARECHAT · MOJ",
    title: "Moj Spot — Creator Monetisation System",
    description: "Tens of millions of creators, zero paid growth tools. Designed Moj Spot from scratch, a content-boosting system that opened a new revenue stream and scaled through targeting, multi-campaign support, and analytics.",
    github: "https://github.com",
    live: "https://github.com",
    link: "/project/moj-spot",
    accentColor: "rgba(249, 115, 22, 0.15)", // Orange glow
    glowColor: "#f97316",
    mockupType: "moj-spot"
  },
  {
    id: 2,
    num: "02",
    category: "SHARECHAT · VIBELY",
    title: "Referral & Starter Challenge Growth System",
    description: "A two-part growth system that drove 82.6% first-call activation. Designed sender, receiver, and competition layers — then scaled the same framework from FriendZone into Vibely with minimal engineering lift.",
    github: "https://github.com",
    live: "https://github.com",
    link: "/project/referral-vibely",
    accentColor: "rgba(168, 85, 247, 0.15)", // Purple glow
    glowColor: "#a855f7",
    mockupType: "referral-vibely"
  },
  {
    id: 3,
    num: "03",
    category: "WEBGL · SHADER",
    title: "Helios — Autonomous Rendering Engine",
    description: "A low-overhead, browser-based WebGL ray-caster. Engineered customized glsl shaders to optimize micro-light scattering and real-time glossy reflection mapping, delivering triple-A scene fidelity offline.",
    github: "https://github.com",
    live: "https://github.com",
    link: "/project/helios-engine",
    accentColor: "rgba(59, 130, 246, 0.15)", // Blue glow
    glowColor: "#3b82f6",
    mockupType: "helios-engine"
  },
  {
    id: 4,
    num: "04",
    category: "REACT · COMPONENT",
    title: "Apex — Decoupled State Broker",
    description: "A transactional, multi-thread reactive state manager. Designed lock-free synchronization layers that achieve microsecond state propagation with zero main-thread blocking across large distributed views.",
    github: "https://github.com",
    live: "https://github.com",
    link: "/project/apex-broker",
    accentColor: "rgba(16, 185, 129, 0.15)", // Emerald glow
    glowColor: "#10b981",
    mockupType: "apex-broker"
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  
  // Track scroll position of the entire projects section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"]
  });

  // Smooth scroll interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Header "PROJECTS" outline to solid white fill transitions
  const clipPercent = useTransform(smoothProgress, [0.15, 0.85], [100, 0]);
  const clipPathStyle = useTransform(clipPercent, (v) => `inset(0 ${v}% 0 0)`);
  const scannerLeft = useTransform(smoothProgress, [0.15, 0.85], ["0%", "100%"]);
  const scannerOpacity = useTransform(smoothProgress, [0.0, 0.12, 0.82, 0.90], [0, 1, 1, 0]);

  // Dynamic sound plucks for projects entry if audio unmuted
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const cardTriggered = useRef([false, false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      cardRefs.forEach((ref, idx) => {
        const element = ref.current;
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.75;
        
        if (rect.top < triggerPoint && !cardTriggered.current[idx]) {
          // Play a beautiful, soft note on card entry if synth active
          if (window.lenis && window.lenis.isAudioEnabled || (window.audioContextActive)) {
            // High soft chiming sound
            const scale = [293.66, 329.63, 440.00, 523.25]; // D4, E4, A4, C5
            const freq = scale[idx % scale.length];
            if (window.playCinematicChime) {
              window.playCinematicChime(freq);
            }
          }
          cardTriggered.current[idx] = true;
        } else if (rect.top > window.innerHeight && cardTriggered.current[idx]) {
          cardTriggered.current[idx] = false; // Reset trigger when scrolled out of view
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="projects"
      ref={containerRef}
      className="relative w-full py-32 bg-black text-white overflow-hidden"
      style={{
        // High-end, technical dot grid overlay background
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.055) 1.5px, transparent 1.5px)",
        backgroundSize: "32px 32px",
        backgroundPosition: "center top"
      }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center">
        
        {/* Outline to Solid Ink-Fill "PROJECTS" Header */}
        <div className="relative select-none mb-24 text-center mt-12" data-cursor="large">
          {/* Layer 1: Outlined Text */}
          <h2 
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none uppercase"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)"
            }}
          >
            PROJECTS
          </h2>

          {/* Layer 2: Filled glowing white text clipped on scroll */}
          <motion.h2 
            style={{ clipPath: clipPathStyle }}
            className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none uppercase text-white pointer-events-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              clipPath: clipPathStyle,
              color: "#ffffff",
              textShadow: "0 0 35px rgba(255, 255, 255, 0.45)"
            }}
          >
            PROJECTS
          </motion.h2>

          {/* Micro-glow scanner line at clipping boundary */}
          <motion.div 
            style={{
              left: scannerLeft,
              opacity: scannerOpacity
            }}
            className="absolute top-0 w-[2.5px] h-[90%] bg-white shadow-[0_0_15px_#fff,0_0_30px_#5227FF] pointer-events-none"
          />
        </div>

        {/* 4 Alternating Project Cards list */}
        <div className="w-full flex flex-col gap-32 lg:gap-48 mt-12">
          {PROJECTS_DATA.map((project, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                ref={cardRefs[idx]}
                key={project.id}
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                // once: false ensures project card transitions run dynamically in both directions (fade on scroll up/down)
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                
                {/* Text Description Column */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  
                  {/* Category Label */}
                  <span className="text-[#5227FF] text-xs font-bold tracking-[0.25em] uppercase mb-3">
                    {project.num} — {project.category}
                  </span>

                  {/* Project Title */}
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                    {project.title}
                  </h3>

                  {/* Faint gray short horizontal underline below header */}
                  <div className="w-16 h-[2px] bg-zinc-800 mb-6" />

                  {/* Project Description Paragraph */}
                  <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed md:leading-[1.8] mb-8 max-w-xl">
                    {project.description}
                  </p>

                  {/* Action Buttons bar: GitHub & Know More */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* GitHub Button */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700/80 text-white rounded-full px-6 py-3 flex items-center gap-2 text-xs font-bold uppercase transition-all duration-300 active:scale-95 shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer"
                    >
                      {/* GitHub Icon */}
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub Repo
                    </a>

                    {/* Know More Button (Solid White Pill, redirects in same tab) */}
                    <a
                      href={project.link}
                      className="bg-white hover:bg-zinc-200 text-black rounded-full px-6 py-3 flex items-center gap-2 text-xs font-bold uppercase transition-all duration-300 active:scale-95 shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer animate-pulse"
                    >
                      Know More
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-3" viewBox="0 0 24 24">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Project Image Column */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  
                  {/* Interactive container triggering glassmorphic button overlay on hover, opens live demo on click */}
                  <div 
                    onClick={() => window.open(project.live, '_blank')}
                    className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden group border border-zinc-800/80 bg-zinc-950/40 shadow-2xl flex items-center justify-center cursor-pointer pointer-events-auto"
                  >
                    
                    {/* Simulated High-fidelity Tech Mockup Graphic */}
                    <div 
                      className="absolute inset-0 transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at center, ${project.accentColor} 0%, transparent 70%)`
                      }}
                    >
                      {/* Technical Mockup wireframes & details built inside pure CSS for maximum premium aesthetics */}
                      <div className="relative w-[85%] h-[80%] rounded-2xl border border-white/5 bg-zinc-950/80 backdrop-blur-sm overflow-hidden flex flex-col justify-between p-6 shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]">
                        {/* Header bar */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4 w-full">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                          </div>
                          <span className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
                            SECURE_CONNECTION // {project.num}
                          </span>
                        </div>

                        {/* Interactive UI Mockups */}
                        {project.mockupType === "moj-spot" && (
                          <div className="w-full flex-grow flex items-center justify-center gap-4 relative py-4">
                            {/* Glowing charts or structures */}
                            <div className="w-[50%] h-[90%] rounded-xl border border-white/5 bg-zinc-900/50 p-4 flex flex-col justify-between">
                              <span className="text-[10px] font-bold text-zinc-400">Campaign Stats</span>
                              <div className="flex items-end justify-between h-12 w-full gap-1">
                                <div className="w-full bg-[#f97316]/20 border border-[#f97316]/40 h-[30%] rounded-sm" />
                                <div className="w-full bg-[#f97316]/30 border border-[#f97316]/50 h-[50%] rounded-sm" />
                                <div className="w-full bg-[#f97316]/40 border border-[#f97316]/60 h-[80%] rounded-sm animate-pulse" />
                                <div className="w-full bg-[#f97316]/20 border border-[#f97316]/40 h-[40%] rounded-sm" />
                              </div>
                            </div>
                            <div className="w-[50%] h-[90%] rounded-xl border border-white/5 bg-[#f97316]/5 p-4 flex flex-col justify-between items-center text-center">
                              <span className="text-[9px] font-mono text-zinc-500">MONETIZATION</span>
                              <span className="text-xl font-black text-[#f97316] tracking-tight">$42,940</span>
                              <span className="text-[8px] font-mono text-zinc-600">+18% this week</span>
                            </div>
                          </div>
                        )}

                        {project.mockupType === "referral-vibely" && (
                          <div className="w-full flex-grow flex items-center justify-center gap-4 relative py-4">
                            {/* Connected grid structures */}
                            <div className="relative w-full h-[85%] rounded-xl border border-white/5 bg-zinc-900/40 p-4 flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-zinc-400">Viral Coefficient</span>
                                <span className="text-[10px] font-bold text-[#a855f7]">K = 2.4</span>
                              </div>
                              {/* Sine wave or nodes illustration */}
                              <div className="w-full h-12 flex items-center justify-center relative overflow-hidden">
                                <svg className="w-full h-full stroke-[#a855f7] opacity-60" viewBox="0 0 100 40">
                                  <path d="M0,20 Q25,5 50,20 T100,20" fill="none" strokeWidth="2" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}

                        {project.mockupType === "helios-engine" && (
                          <div className="w-full flex-grow flex items-center justify-center gap-4 relative py-4">
                            {/* Ray-traced 3D geometry simulated grid */}
                            <div className="w-full h-[85%] rounded-xl border border-white/5 bg-gradient-to-tr from-blue-900/10 to-zinc-900/60 p-4 flex flex-col justify-between relative overflow-hidden">
                              <span className="text-[10px] font-bold text-zinc-400">WebGL Render Viewport</span>
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {/* Glowing wireframe sphere */}
                                <div className="w-16 h-16 rounded-full border border-blue-500/20 border-dashed animate-spin flex items-center justify-center">
                                  <div className="w-10 h-10 rounded-full border border-blue-500/40 border-double" />
                                </div>
                              </div>
                              <span className="text-[8px] font-mono text-zinc-600 z-10">FPS: 60.0 // WebGL2</span>
                            </div>
                          </div>
                        )}

                        {project.mockupType === "apex-broker" && (
                          <div className="w-full flex-grow flex items-center justify-center gap-4 relative py-4">
                            {/* Multithreaded broker stats layout */}
                            <div className="w-full h-[85%] rounded-xl border border-white/5 bg-zinc-900/40 p-4 flex flex-col justify-between">
                              <span className="text-[10px] font-bold text-zinc-400">Lock-Free Propagation</span>
                              <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
                                <span className="text-xs font-mono text-[#10b981]">0.12 μs latency</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Footer bar */}
                        <div className="flex items-center justify-between border-t border-white/5 pt-3 w-full text-[8px] font-mono text-zinc-600">
                          <span>SYSTEM_STATE // SECURE</span>
                          <span>STABLE</span>
                        </div>
                      </div>
                    </div>

                    {/* Frosted Glassmorphic Button Overlay revealed on hover (showing "Live Demo" as requested) */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        className="text-white rounded-full px-8 py-3.5 shadow-2xl transition-all duration-300 font-medium tracking-wide text-sm flex items-center gap-2.5"
                        style={{
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "1px solid rgba(255, 255, 255, 0.16)",
                          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.35)",
                          backdropFilter: "blur(14px)",
                          WebkitBackdropFilter: "blur(14px)"
                        }}
                        whileHover={{ scale: 1.05, background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)" }}
                      >
                        Live Demo
                        <svg className="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
