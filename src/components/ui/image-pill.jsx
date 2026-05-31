import React from 'react';
import { cn } from '../../lib/utils';

export function ImagePill({ src, alt, text, className, imgClassName }) {
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full overflow-hidden relative mx-2 align-middle border-[3px] border-zinc-200/20 shadow-lg", className)} style={{ transform: 'translateY(-0.05em)' }}>
      <img src={src} alt={alt} className={cn("w-full h-full object-cover", imgClassName)} />
      {text && (
        <span className="absolute inset-0 flex items-center justify-center font-black text-white uppercase tracking-widest z-10" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.5)' }}>
          {text}
        </span>
      )}
    </span>
  );
}
