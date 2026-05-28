import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    id: 1,
    date: '2023 - Present',
    title: 'Senior Frontend Engineer',
    company: 'Tech Innovators Inc.',
    description: 'Spearheaded the development of a next-generation web platform using React and Three.js, improving user engagement by 40%.',
    icon: (
      <svg className="w-5 h-5 text-[#5227FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    date: '2021 - 2023',
    title: 'Software Developer',
    company: 'Creative Solutions',
    description: 'Built and maintained multiple high-traffic client websites. Implemented CI/CD pipelines and optimized core web vitals.',
    icon: (
      <svg className="w-5 h-5 text-[#5227FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 3,
    date: '2019 - 2021',
    title: 'Junior Web Developer',
    company: 'Digital Agency X',
    description: 'Developed responsive user interfaces, collaborated with designers, and wrote comprehensive unit tests.',
    icon: (
      <svg className="w-5 h-5 text-[#5227FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    date: '2015 - 2019',
    title: 'B.S. in Computer Science',
    company: 'University of Technology',
    description: 'Graduated with honors. Led the university coding club and participated in multiple national hackathons.',
    icon: (
      <svg className="w-5 h-5 text-[#5227FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
];

export default function ProfessionalJourney() {
  return (
    <div className="w-full mb-24">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-12 h-12 rounded-2xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg className="w-7 h-7 stroke-[#5227FF]" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#5227FF]">
          Professional Journey
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* The central line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#5227FF]/50 via-zinc-800 to-transparent md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-12">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 top-0 md:top-6 transform -translate-x-1/2 -translate-y-1/2 md:-translate-y-0 w-10 h-10 rounded-full bg-[#0d1117] border-2 border-[#5227FF] flex items-center justify-center shadow-[0_0_15px_rgba(82,39,255,0.3)] z-10">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 md:p-8 hover:border-[#5227FF]/50 transition-colors duration-300 shadow-xl group">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#5227FF]/10 text-[#5227FF] text-sm font-semibold mb-4 border border-[#5227FF]/20">
                      {item.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[#5227FF] transition-colors">
                      {item.title}
                    </h3>
                    <h4 className="text-lg text-zinc-400 font-medium mb-4">
                      {item.company}
                    </h4>
                    <p className="text-zinc-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
