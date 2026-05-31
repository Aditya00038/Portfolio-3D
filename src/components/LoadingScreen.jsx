import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AdityaLoadingEffect } from './ui/apple-hello-effect';

export default function LoadingScreen({ onComplete }) {
  // Fallback timer just in case onAnimationComplete doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div layoutId="navbar-logo" className="flex items-center justify-center">
        <AdityaLoadingEffect 
          speed={1.5} 
          onAnimationComplete={() => {
            // Small delay after animation finishes before moving
            setTimeout(onComplete, 800);
          }} 
        />
      </motion.div>
    </motion.div>
  );
}
