import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values for ultra-smooth rendering outside React's render cycle
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apply spring physics for that buttery smooth tracking
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on devices that likely have a fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveMouse = (e) => {
      if (!isVisible) setIsVisible(true);

      // Center the cursor exactly on the pointer tip
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check what we are hovering over
      const target = e.target;
      
      // Determine cursor state based on explicit class or data attribute
      const isLargeCursor = target.closest('.massive-text, [data-cursor="large"]');
      
      if (isLargeCursor) {
        setCursorState('large');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Define the sizes for our different states
  const variants = {
    default: {
      width: 20,
      height: 20,
      x: "-50%",
      y: "-50%"
    },
    large: {
      width: 160,
      height: 160,
      x: "-50%",
      y: "-50%"
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999]"
      style={{
        left: smoothX,
        top: smoothY,
        mixBlendMode: 'difference',
      }}
      variants={variants}
      animate={cursorState}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
    />
  );
}
