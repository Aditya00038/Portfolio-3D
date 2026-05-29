import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experienceData = [
  {
    id: 1,
    company: 'Emplorium / IONIK',
    role: 'Co-Founder & Product Designer',
    type: 'Full-time',
    date: 'May 2023 → Present',
    location: 'Remote (London / Global)',
    iconBg: 'bg-[#5227FF]',
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
      </svg>
    ),
    bullets: [
      'Led 0→1 product vision for an AI CRM and customer engagement platform',
      'Built complete design system from foundation to production',
      'Shipped platform from concept to live product with measurable adoption'
    ]
  },
  {
    id: 2,
    company: 'EleeN',
    role: 'Lead Product Designer',
    type: 'Part-time',
    date: 'Aug 2023 → Present',
    location: 'Remote (Saudi Arabia)',
    iconBg: 'bg-emerald-950',
    icon: (
      <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 12 2.1 7.1" />
        <path d="m12 12 7.1-7.1" />
      </svg>
    ),
    bullets: [
      'Directed end-to-end UX/UI design for regional e-commerce experiences',
      'Optimized user flows and improved overall accessibility standards',
      'Collaborated closely with cross-functional teams to ensure high-fidelity implementation'
    ]
  }
];

export default function ProfessionalJourney() {
  const [expandedId, setExpandedId] = useState(1);

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
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full flex items-start text-left p-5 md:p-6 gap-4 md:gap-6 focus:outline-none"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${item.iconBg}`}
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
                      >
                        <div className="pt-6 pb-2">
                          <ul className="list-disc pl-5 text-zinc-400 space-y-3 text-[0.95rem] leading-relaxed">
                            {item.bullets.map((bullet, i) => (
                              <li key={i} className="pl-1 marker:text-zinc-600">{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
