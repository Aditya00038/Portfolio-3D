import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ShineText({ children, className }) {
  return (
    <>
      <style>{`
        @keyframes shine-text-anim {
          0% {
            background-position: 100% 0;
          }
          85% {
            background-position: 0% 0;
          }
          100% {
            background-position: 0% 0;
          }
        }
      `}</style>
      <span
        className={cn(
          "inline-block",
          className
        )}
        style={{
          background: 'linear-gradient(to right, #9f9f9f 35%, #fff 50%, #9f9f9f 65%)',
          backgroundSize: '300% 100%',
          backgroundPosition: '100% 0',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'shine-text-anim 6s infinite linear',
          WebkitTextSizeAdjust: 'none',
        }}
      >
        {children}
      </span>
    </>
  );
}
