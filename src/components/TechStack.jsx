import React from 'react';

// Mathematically precise, official Simple Icons vector configurations
const ICONS = {
  html: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E34F26">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 11.202.001.242-2.72H5.79l.685 8.129h8.22l-.337 3.799-3.358.91-3.372-.92-.213-2.396H6.216l.422 4.74 5.362 1.46 5.378-1.46.786-8.835H8.531z"/>
    </svg>
  ),
  css: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1572B6">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 11.202.001.242-2.72H5.79l.685 8.129H14.7l-.338 3.799-3.358.91-3.372-.92-.213-2.396H6.216l.422 4.74 5.362 1.46 5.378-1.46.786-8.835H8.531z"/>
    </svg>
  ),
  js: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F7DF1E">
      <path d="M0 0h24v24H0V0zm22.034 18.268c-.153-1.19-.728-2.277-2.341-2.902-1.447-.591-2.7-.834-3.73-1.077-.778-.173-1.425-.33-1.825-.548-.19-.092-.341-.229-.404-.397-.082-.223-.054-.454.02-.63.104-.241.292-.41.696-.51.356-.083.748-.073 1.037.015.409.158.655.502.775.826.245-.092.799-.313 1.217-.483.563-.23.173-.844-.015-1.224-.463-.943-1.493-1.64-3.1-1.794-1.352-.158-2.612.18-3.428.937-.87.777-1.261 1.81-1.129 3.003.123 1.07.697 1.954 2.19 2.58 1.414.577 2.9.89 3.967 1.142.847.19 1.433.372 1.83.6.26.15.426.39.462.68.046.348-.109.617-.29.774-.328.272-.882.355-1.413.236-.638-.137-.999-.481-1.284-.966-.237.135-.856.49-1.246.708-.127.07-.073.236.036.326.685.806 1.637 1.425 3.328 1.425 2.05.009 3.428-1.042 3.626-2.732zM12.108 8v8.9c0 .889-.089 1.777-.533 2.578-.445.8-1.244 1.333-2.31 1.422-1.333.178-2.58-.266-3.111-1.066-.356-.533-.445-1.156-.445-1.867H7.13c0 .356.089.8.356 1.066.266.266.622.356 1.066.307.4-.04.75-.25.9-0.55.25-.45.25-1.25.25-1.85V8h2.406z"/>
    </svg>
  ),
  tailwind: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#38BDF8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .25 1.7.99 2.48 1.79 1.27 1.3 2.75 2.81 5.92 2.81 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.25-1.6-.99-2.38-1.79-1.27-1.3-2.75-2.81-5.92-2.81zm-6 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.25 1.6.99 2.38 1.79 1.27 1.3 2.75 2.81 5.92 2.81 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1-.25-1.7-.99-2.48-1.79-1.27-1.3-2.75-2.81-5.92-2.81z"/>
    </svg>
  ),
  react: (
    <svg className="w-5 h-5 animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="#61DAFB">
      <path d="M24 10.65c0-1.07-.63-1.82-1.46-1.82-.45 0-.91.24-1.38.65l-1.09.95C18.6 8.5 16.48 7.37 14 7.08v-3.7C14 1.5 13.12.8 12 .8s-2 .7-2 2.58v3.7c-2.48.29-4.6 1.42-6.07 3.35l-1.09-.95C2.37 9.07 1.91 8.83 1.46 8.83.63 8.83 0 9.58 0 10.65c0 .66.36 1.21.9 1.5.3.17.65.25.99.25.26 0 .52-.05.78-.15l1.64-.62C4.1 11.9 4 12.22 4 12.5s.1.6.31.87l1.64-.62c.26.1.52.15.78.15.34 0 .69-.08.99-.25.54-.29.9-.84.9-1.5 0-1.07-.63-1.82-1.46-1.82-.45 0-.91.24-1.38.65l-1.09.95C4.24 9.07 3.78 8.83 3.33 8.83c-.83 0-1.46.75-1.46 1.82 0 .66.36 1.21.9 1.5M12 10a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(30 12 12)"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(90 12 12)"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.3" fill="none" transform="rotate(150 12 12)"/>
    </svg>
  ),
  nextjs: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.88 18.2L11 9.58V18H9.37V6h1.56l6.83 8.62V6h1.63v12.2h-.51z"/>
    </svg>
  ),
  framer: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0055FF">
      <path d="M12 0L24 12H12V0zM0 12L12 24V12H0zM12 12H24V24L12 12z" fill="#0055FF"/>
      <path d="M0 0H12V12H0V0z" fill="#FF007F"/>
      <path d="M12 0H24V12H12V0z" fill="#00F5FF"/>
    </svg>
  ),
  shadcn: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L4 9V15L12 21L20 15V9L12 3Z"/>
      <path d="M8 11L12 13L16 11"/>
    </svg>
  ),
  java: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F89820">
      <path d="M2.5 19.5c0 0 6 3 13.5 0C21.5 17.5 22.5 13 22.5 13s-6.5 1.5-12.5 0c-4.5-1-7.5-2.5-7.5 6.5zm5.5-12C8 6 12 5 12 5s3.5 1.5 5 1.5c1.2 0 2.5-1.5 2.5-1.5M6 13C6 13 8 9.5 11.5 9.5c3 0 4.5 3.5 4.5 3.5" stroke="#5382A1" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9.5 11c0 0 1-2.5 3-2.5C14.5 8.5 15.5 11 15.5 11" stroke="#E44D26" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  cpp: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00599C">
      <path d="M22.025 10.978h-2.034v2.035h-1.018v-2.035h-2.034V9.96h2.034V7.925h1.018v2.035h2.034v1.018zm1.975-1.018H22v2.035h-1.017V9.96H19v-1.018h2.025V6.907h1.017v2.035H24v1.018zM10.82 17.472c-3.568 0-6.444-2.457-6.444-5.472s2.876-5.472 6.444-5.472c2.096 0 3.944.85 5.097 2.186l-1.922 1.62c-.754-.888-1.854-1.422-3.175-1.422-2.222 0-4.025 1.385-4.025 3.088s1.803 3.088 4.025 3.088c1.321 0 2.421-.534 3.175-1.422l1.922 1.62c-1.153 1.336-3.001 2.186-5.097 2.186z"/>
    </svg>
  ),
  c: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#A8B9CC">
      <path d="M12.002 21.996c-5.52 0-9.997-4.477-9.997-9.997S6.482 2.002 12.002 2.002c3.15 0 5.96 1.46 7.78 3.74l-2.88 2.42c-1.16-1.41-2.92-2.31-4.9-2.31-3.41 0-6.19 2.78-6.19 6.19s2.78 6.19 6.19 6.19c1.98 0 3.74-.9 4.9-2.31l2.88 2.42c-1.82 2.28-4.63 3.74-7.78 3.74z"/>
    </svg>
  ),
  python: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M11.97 0C9.17 0 7 2.1 7 4.8v2.1h5v.9H5.5C3.8 7.8 2 9.1 2 11.8c0 2.7 1.8 4 3.5 4H7v-2.1c0-2.7 2.2-4 5-4h6c1.7 0 3.5-1.3 3.5-4C21.5 3 19.7 1.8 18 1.8h-2V3.9c0 2.7-2.2 4-5 4H8.5" fill="#3776AB"/>
      <path d="M12.03 24c2.8 0 4.97-2.1 4.97-4.8v-2.1h-5v-.9h6.5c1.7 0 3.5-1.3 3.5-4 0-2.7-1.8-4-3.5-4H17v2.1c0 2.7-2.2 4-5 4H6c-1.7 0-3.5 1.3-3.5 4C2.5 21 4.3 22.2 6 22.2h2v-2.1c0-2.7 2.2-4 5-4h3" fill="#FFD43B"/>
    </svg>
  ),
  flask: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
      <path d="M9 3H15M10 3V6L6 18C5 20 6.5 21 8 21H16C17.5 21 19 20 18 18L14 6V3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 15H16" stroke="#48C9B0" strokeWidth="1.5"/>
    </svg>
  ),
  fastapi: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#009688">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm2.5 16h-4v-3H8l4.5-6.5L17 13h-2.5v3z"/>
    </svg>
  ),
  mysql: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00758F">
      <path d="M12.12 1.6C7.03 2.12 3 6.38 3 11.5c0 5.12 4.03 9.38 9.12 9.9l.88-9.9-10 1.5C3.5 11 5 8.5 7.5 7.5 10 6.5 13 7 13.5 9c-.5-1-1.5-1.5-3-1.5-2 0-3 1.5-3 3.5 0 2.5 1.5 3.5 3 3.5 2.5 0 3-1.5 3-3.5l.62-9.4z" fill="#00758F"/>
      <path d="M13.5 10c-.5-1-1.5-1.5-3-1.5-2 0-3 1.5-3 3.5 0 2.5 1.5 3.5 3 3.5 2.5 0 3-1.5 3-3.5V10z" fill="#F29111"/>
    </svg>
  ),
  mongodb: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#47A248">
      <path d="M12 .003c-.144 0-.282.057-.384.159C10.74 1.037 6 5.897 6 11.664c0 3.2 1.6 6.4 4.8 8.6v2.133c0 .889.711 1.6 1.6 1.6s1.6-.711 1.6-1.6v-2.133c3.2-2.2 4.8-5.4 4.8-8.6 0-5.767-4.74-10.627-5.616-11.502a.542.542 0 0 0-.384-.159zm-.4 5.33c0 .267.2.47.47.47s.47-.2.47-.47v-.8c0-.267-.2-.47-.47-.47s-.47.2-.47.47v.8z"/>
    </svg>
  ),
  firebase: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFCA28">
      <path d="M3.89 15.4L8.12 3.12C8.25 2.75 8.75 2.75 8.88 3.12L11.12 9.7L3.89 15.4Z" fill="#FFC400"/>
      <path d="M20.11 15.4L15.88 3.12C15.75 2.75 15.25 2.75 15.12 3.12L12.88 9.7L20.11 15.4Z" fill="#FF9100"/>
      <path d="M3.89 15.4L11.5 21C11.8 21.2 12.2 21.2 12.5 21L20.11 15.4L12 9.6L3.89 15.4Z" fill="#DD2C00"/>
    </svg>
  ),
  numpy: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#013243" stroke="#4DABCF" strokeWidth="1.5">
      <path d="M6 6L12 3L18 6V18L12 21L6 18V6Z"/>
      <path d="M12 3V21"/>
      <path d="M6 12H18"/>
    </svg>
  ),
  pandas: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#150458">
      <rect width="24" height="24" rx="4"/>
      <circle cx="8" cy="12" r="3" fill="#FFCA28"/>
      <circle cx="16" cy="12" r="3" fill="#E10098"/>
    </svg>
  ),
  jupyter: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F37626">
      <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#F37626" strokeWidth="2" transform="rotate(-25 12 12)"/>
      <circle cx="9" cy="8" r="2.5" fill="#F37626"/>
      <circle cx="15" cy="16" r="2" fill="#F37626"/>
    </svg>
  ),
  vscode: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#007ACC">
      <path d="M23.984 6.303l-2.072-.733L18.25 8.16l-3.328-2.61L12.5 6.303 3.328 12 12.5 17.697l2.422-.753 3.328-2.61 3.662 2.59 2.072-.733V6.303z" fill="#007ACC"/>
      <path d="M18.25 8.16V15.84L21.91 18V6L18.25 8.16z" fill="#1F9CF0"/>
    </svg>
  ),
  git: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F05032">
      <path d="M23.384 11.233L12.766 1.615c-.48-.48-1.266-.48-1.746 0L1.616 11.22c-.48.48-.48 1.266 0 1.746l10.62 10.62c.48.48 1.266.48 1.746 0l10.62-10.62c.48-.48.48-1.266 0-1.746z"/>
      <circle cx="12" cy="12" r="3.2" fill="#FFF"/>
      <path d="M12 12v-5" stroke="#FFF" strokeWidth="2"/>
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.865 20.162 8.83 21.48C9.33 21.572 9.513 21.264 9.513 20.999C9.513 20.765 9.503 19.986 9.499 19.16C6.717 19.764 6.13 17.962 6.13 17.962C5.674 16.804 5.016 16.497 5.016 16.497C4.108 15.877 5.085 15.89 5.085 15.89C6.088 15.96 6.616 16.92 6.616 16.92C7.508 18.448 8.955 18.008 9.524 17.753C9.615 17.106 9.875 16.665 10.162 16.415C7.942 16.163 5.607 15.303 5.607 11.472C5.607 10.381 5.997 9.49 6.637 8.792C6.534 8.539 6.19 7.521 6.735 6.155C6.735 6.155 7.574 5.886 9.485 7.179C10.282 6.957 11.138 6.847 11.987 6.843C12.836 6.847 13.692 6.957 14.49 7.179C16.398 5.886 17.235 6.155 17.235 6.155C17.782 7.521 17.438 8.539 17.336 8.792C17.978 9.49 18.365 10.381 18.365 11.472C18.365 15.313 16.027 16.16 13.8 16.407C14.159 16.717 14.478 17.329 14.478 18.265C14.478 19.607 14.466 20.69 14.466 21.015C14.466 21.282 14.646 21.59 15.155 21.49C19.123 20.158 21.986 16.418 21.986 12C21.986 6.477 17.523 2 12 2Z"/>
    </svg>
  )
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
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Tech Stack Content */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Header */}
            <div className="text-left mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-[3.3rem] font-bold tracking-tight text-white mb-2 leading-none">
                What do I use
              </h2>
              <div className="w-12 h-[2.5px] bg-[#5227FF] mt-4" />
            </div>

            {/* Bounded, Framed Scrolling Panel */}
            <div className="relative w-full rounded-[2rem] border border-white/5 bg-[#0a0a0c]/50 backdrop-blur-xl p-6 md:p-8 overflow-hidden">
              
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

          {/* Right Side: Video Placeholder */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="w-full aspect-video rounded-[2rem] border border-zinc-800 bg-[#0d1117] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
              <svg className="w-16 h-16 text-zinc-700 mb-4 group-hover:text-[#5227FF] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-zinc-500 font-medium text-lg">Your Video Here</span>
              
              {/* Optional: Once you have the video, replace the SVG and span above with: */}
              {/* <video src="/path/to/video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /> */}
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
