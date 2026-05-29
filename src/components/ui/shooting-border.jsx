import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function ShootingBorder({ className }) {
  return (
    <div className={cn("w-full h-[2px] relative", className)}>
      <style>{`
        .shooting-sparks::after,
        .shooting-sparks::before {
          content: '';
          width: 10px;
          height: 1px;
          background: #FFF;
          position: absolute;
          top: 5px;
          right: -2px;
          transform: rotate(-45deg) translateX(0px);
          animation: coli1 0.3s linear infinite;
        }
        .shooting-sparks::before {
          top: -4px;
          transform: rotate(45deg);
          animation: coli2 0.3s linear infinite;
        }
        @keyframes coli1 {
          0% { transform: rotate(-45deg) translateX(0px); }
          100% { transform: rotate(-45deg) translateX(-45px); }
        }
        @keyframes coli2 {
          0% { transform: rotate(45deg) translateX(0px); }
          100% { transform: rotate(45deg) translateX(-45px); }
        }
      `}</style>
      <motion.div
        className="absolute h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 5, ease: "linear" }}
        viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      >
        <motion.div
          className="shooting-sparks absolute inset-0"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ duration: 0.1, delay: 4.9 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        />
      </motion.div>
    </div>
  );
}
