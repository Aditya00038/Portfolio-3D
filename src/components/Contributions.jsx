import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ContributionGraph from './ContributionGraph';
import ProfessionalJourney from './ProfessionalJourney';


const GITHUB_USERNAME = "Aditya00038";

export default function Contributions() {
  const [contribs, setContribs] = useState(null);
  const [loadingGit, setLoadingGit] = useState(true);

  useEffect(() => {
    // Fetch Contributions
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d?.contributions) { setLoadingGit(false); return; }

        // Filter out future dates and sort chronologically
        const todayStr = new Date().toISOString().split('T')[0];
        const sorted = [...d.contributions]
          .filter(x => x.date <= todayStr)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setContribs(d.contributions);
        setLoadingGit(false);
      })
      .catch(() => setLoadingGit(false));
  }, []);

  return (
    <section
      id="activity"
      className="relative w-full py-24 bg-transparent text-white overflow-hidden rounded-b-[1rem] md:rounded-b-[1.5rem] border-t border-white/5 font-sans"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Professional Journey Timeline */}
        <ProfessionalJourney />

        {/* ═══════════════════════ TWO-COLUMN DECO / STATS GRID ═══════════════════════ */}
        <div className="w-full max-w-4xl mx-auto mt-16 mb-8">

          {/* ACTIVITIES header - bold uppercase matching site style */}
          <div className="w-full mb-6 text-left border-b border-zinc-800 pb-6">
            <h2
              className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-sans font-black tracking-tighter uppercase text-white select-none leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              ACTIVITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
            
            {/* LEFT COLUMN: COMPACT GITHUB CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black border border-[#30363d] rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col justify-between backdrop-blur-md relative overflow-hidden"
            >
              {/* Header: GitHub logo on left, handle on right */}
              <div className="flex justify-between items-center w-full mb-6 select-none">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-black border border-zinc-800/80 flex items-center justify-center shadow-inner">
                    <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.162 6.839 9.48.5.092.683-.216.683-.481 0-.237-.009-1.017-.013-1.842-2.782.604-3.369-1.198-3.369-1.198-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </div>
                  <span className="text-[0.75rem] md:text-[0.8rem] font-bold tracking-[0.18em] text-zinc-400 font-mono">CONTRIBUTIONS</span>
                </div>
                <span className="text-[#8b949e] text-xs md:text-sm font-semibold tracking-tight font-sans">@{GITHUB_USERNAME}</span>
              </div>

              {/* Compact 18-week Graph */}
              {loadingGit ? (
                <div className="h-32 flex flex-col items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#4493f8] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px] text-zinc-500 font-mono">Loading graph...</span>
                </div>
              ) : (
                <ContributionGraph 
                  data={contribs || []} 
                  weeksToShow={18}
                  showDayLabels={false}
                  showLegend={false}
                  compact={true}
                />
              )}
            </motion.div>

            {/* RIGHT COLUMN: LEETCODE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="bg-black border border-[#30363d] rounded-2xl shadow-2xl overflow-hidden"
            >
              <a
                href="https://leetcode.com/u/Aditya_Suryawanshi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center cursor-pointer"
                title="LeetCode Profile"
              >
                <img 
                  src="/extras/leetcode.png" 
                  className="w-32 h-32 md:w-40 md:h-40 object-contain" 
                  alt="LeetCode Logo" 
                />
              </a>
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #21262d;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6e7681;
          border-radius: 6px;
          border: 2px solid #21262d;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8b949e;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6e7681 #21262d;
        }
      `}</style>
    </section>
  );
}
