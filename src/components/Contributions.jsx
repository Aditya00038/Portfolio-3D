import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="relative w-full py-24 bg-[#010409] text-white overflow-hidden border-t border-white/5 font-sans"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Professional Journey Timeline */}
        <ProfessionalJourney />

        {/* GitHub Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-7 h-7 fill-[#4493f8]" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.162 6.839 9.48.5.092.683-.216.683-.481 0-.237-.009-1.017-.013-1.842-2.782.604-3.369-1.198-3.369-1.198-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#4493f8]">
            GitHub Contributions
          </h2>
        </div>

        {/* Separator line with subtle gradient */}
        <div className="w-full h-px bg-gradient-to-r from-[#1f2937] via-[#374151] to-transparent mb-12 opacity-50" />

        {/* ═══════════════════════ GITHUB HEATMAP CARD ═══════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 md:p-8 shadow-2xl mb-8"
        >
          {loadingGit ? (
            <div className="h-48 flex flex-col items-center justify-center gap-3">
              <div className="w-6 h-6 border-2 border-[#4493f8] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-zinc-400">Loading contributions...</span>
            </div>
          ) : (
            <ContributionGraph data={contribs || []} />
          )}
        </motion.div>
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
