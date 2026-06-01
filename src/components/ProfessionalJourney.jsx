import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experienceData = [
  {
    id: 2,
    company: 'GirlScript Summer of Code 2025',
    role: 'Open Source Contributor',
    type: 'Open Source',
    date: 'Oct 2025 → Nov 2025',
    location: 'Remote',
    iconBg: 'bg-transparent', // Transparent background, no border
    icon: (
      // Maximized to fill the full container area clearly (w-full h-full)
      <img src="/Experience/gssoc-logo.png" className="w-full h-full object-contain" alt="GSSoC" />
    ),
    bullets: [
      'Contributed to open-source projects by resolving issues, submitting pull requests, and collaborating with developers in a large-scale community-driven coding program.'
    ],
    certificateUrl: '/certificates/image.png' // Linked to the newly uploaded certificate image
  },
  {
    id: 1,
    company: 'Teachnook × BTech Walleh',
    role: 'Web Development Intern',
    type: 'Internship',
    date: 'Nov 2024',
    location: 'Remote',
    iconBg: 'bg-transparent', // Transparent background, no border
    icon: (
      // Kept at original, smaller size (w-10 h-10 on mobile, w-11 h-11 on desktop)
      <img src="/Experience/teachnook-logo.png" className="w-10 h-10 md:w-11 md:h-11 object-contain rounded-xl" alt="Teachnook" />
    ),
    bullets: [
      'Completed a Web Development Internship Program focused on modern web technologies, responsive design, and practical project development.'
    ],
    certificateUrl: '/certificates/teachnook.pdf'
  }
];

export default function ProfessionalJourney() {
  // Set expandedId default state to 2 so GSSoC journey starts expanded by default, instead of Teachnook
  const [expandedId, setExpandedId] = useState(2);

  return (
    <div className="w-full max-w-4xl mx-auto mb-32 px-4 md:px-0 font-sans">
      <h2 className="text-4xl md:text-[2.5rem] font-bold tracking-tight text-white mb-10" style={{ letterSpacing: '-0.03em' }}>
        Experience
      </h2>

      <div className="flex flex-col gap-2">
        {experienceData.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl transition-colors duration-300 ${
                isExpanded ? 'bg-[#141416]' : 'hover:bg-[#141416]/50'
              }`}
            >
              {/* Clickable Header Container (Not a nested button to remain syntactically valid HTML) */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full flex items-start text-left p-5 md:p-6 gap-4 md:gap-6 cursor-pointer select-none"
              >
                {/* Icon Container (Holds the w-16/72px bounding area) */}
                <div
                  className={`w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl flex-shrink-0 flex items-center justify-center ${item.iconBg}`}
                >
                  {item.icon}
                </div>

                {/* Content Container */}
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                        <span className="text-white">{item.company}</span>
                        <span className="text-zinc-500 font-normal"> - {item.role}</span>
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.9rem] text-zinc-500 mt-1.5">
                        <span>{item.type}</span>
                        <span>{item.date}</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="mt-1 flex-shrink-0 text-zinc-500 ml-4">
                      <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Stop click events on content body from collapsing accordion
                      >
                        <div className="pt-6 pb-2">
                          <ul className="list-disc pl-5 text-zinc-400 space-y-3 text-[0.95rem] leading-relaxed">
                            {item.bullets.map((bullet, i) => (
                              <li key={i} className="pl-1 marker:text-zinc-600">{bullet}</li>
                            ))}
                          </ul>

                          {item.certificateUrl && (
                            <div className="mt-5">
                              <a
                                href={item.certificateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 bg-zinc-900/40 hover:bg-zinc-800/60 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                              >
                                <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                  <line x1="16" y1="13" x2="8" y2="13" />
                                  <line x1="16" y1="17" x2="8" y2="17" />
                                  <polyline points="10 9 9 9 8 9" />
                                </svg>
                                View Certificate
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
