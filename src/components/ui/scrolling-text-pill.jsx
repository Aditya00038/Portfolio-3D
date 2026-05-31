import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const words = ['product', 'graphic', 'frontend'];

export function ScrollingTextPill({ className }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={cn(
        "inline-flex items-center bg-[#f0f0f0] rounded-full px-5 py-1 md:py-2 mx-2 align-middle relative overflow-hidden",
        "shadow-[0_4px_0_0_#d4d4d8,0_8px_0_0_#a1a1aa] border border-zinc-200", 
        className
      )} 
      style={{ transform: 'translateY(-0.15em)', height: '1.4em' }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "backInOut" }}
          className="flex items-center text-zinc-800 font-bold tracking-tight absolute inset-0 px-5"
          style={{ width: '100%' }}
        >
          <span className="w-3 h-3 md:w-4 md:h-4 bg-zinc-500 rounded-full mr-3 flex-shrink-0 shadow-inner border border-zinc-600"></span>
          <span style={{ transform: 'translateY(2px)' }}>{words[index]}</span>
        </motion.span>
      </AnimatePresence>
      {/* Invisible placeholder to maintain width based on longest word */}
      <span className="invisible flex items-center font-bold tracking-tight px-1">
        <span className="w-3 h-3 md:w-4 md:h-4 mr-3"></span>
        frontend
      </span>
    </span>
  );
}
