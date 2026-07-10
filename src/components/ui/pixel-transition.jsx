import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

function Pixel({ pixel, scrollYProgress, fromColor }) {
  // Map this pixel's scale from 1 down to 0 over its specific random range
  const scale = useTransform(scrollYProgress, [pixel.start, pixel.end], [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [pixel.start, pixel.end], ["0%", "50%"]);

  return (
    <motion.div
      className="w-[2.083%] h-[8.333%] origin-center"
      style={{ 
        backgroundColor: fromColor,
        scale,
        borderRadius
      }}
    />
  );
}

export default function PixelTransition({ fromColor = "#000", toColor = "#fff" }) {
  const ref = useRef(null);
  
  // Track scroll position of this container
  // It starts when the top of the block hits 80% down the screen
  // It ends when the bottom of the block hits 20% down the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });

  const rows = 12;
  const cols = 48;
  
  // Pre-calculate random thresholds for each pixel so they dissolve asynchronously
  const pixels = useMemo(() => {
    return Array.from({ length: rows * cols }).map(() => {
      const start = Math.random() * 0.6; // Start shrinking between 0% and 60% of scroll
      const end = start + 0.4;           // Take 40% of the scroll range to fully shrink
      return { start, end };
    });
  }, [rows, cols]);

  return (
    <div 
      ref={ref}
      className="w-full h-[25vh] lg:h-[35vh] flex flex-wrap relative z-10"
      style={{ backgroundColor: toColor }}
    >
      {pixels.map((pixel, i) => (
        <Pixel 
          key={i} 
          pixel={pixel} 
          scrollYProgress={scrollYProgress} 
          fromColor={fromColor} 
        />
      ))}
    </div>
  );
}
