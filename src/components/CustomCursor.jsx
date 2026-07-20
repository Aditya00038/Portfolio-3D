import React, { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const TEXT_TAGS = new Set(['P','H1','H2','H3','H4','H5','H6','SPAN','A','LI','LABEL',
  'BUTTON','TD','TH','BLOCKQUOTE','CODE','PRE','STRONG','EM','TIME','MARK','SMALL']);
const MEDIA_TAGS = new Set(['IMG','VIDEO','SVG','CANVAS']);

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(any-pointer: fine)').matches) return;

    const moveMouse = (e) => {
      if (!isVisible) {
        setIsVisible(true);
        document.body.classList.add('custom-cursor-active');
      }
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      const tag = target?.tagName?.toUpperCase() || '';

      const isHidden   = !!target?.closest?.('[data-cursor="hidden"]');
      const isLarge    = !!target?.closest?.('.massive-text, [data-cursor="large"]');
      const isOverText = TEXT_TAGS.has(tag) || !!target?.closest?.('p,h1,h2,h3,h4,h5,h6,span,a,li,button,label,strong,em');
      const isOverMedia= MEDIA_TAGS.has(tag);

      if (isHidden || isOverText || isOverMedia) setCursorState('hidden');
      else if (isLarge) setCursorState('large');
      else setCursorState('default');
    };

    const onLeave = () => { setIsVisible(false); document.body.classList.remove('custom-cursor-active'); };
    const onEnter = () => { setIsVisible(true);  document.body.classList.add('custom-cursor-active'); };

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  /* Use a native div — not framer-motion — so we can INSTANTLY hide opacity
     when over text without any spring/animation delay */
  const isHidden = cursorState === 'hidden';
  const isLarge  = cursorState === 'large';
  const size     = isLarge ? 160 : 20;

  return (
    <>
      {/* Smooth spring-tracked position shell */}
      <SmoothCursorDot
        smoothX={smoothX}
        smoothY={smoothY}
        size={size}
        hidden={isHidden}
        large={isLarge}
      />
    </>
  );
}

/* Inner component reads spring values via useTransform so it stays in the
   animation loop but the OPACITY is a plain CSS property — instant toggle */
import { motion } from 'framer-motion';

function SmoothCursorDot({ smoothX, smoothY, size, hidden, large }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#fff',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        /* INSTANT opacity — no spring delay when entering/leaving text */
        opacity: hidden ? 0 : 1,
        transition: hidden
          ? 'opacity 0s, width 0.25s cubic-bezier(.22,.61,.36,1), height 0.25s cubic-bezier(.22,.61,.36,1)'
          : 'opacity 0.08s, width 0.3s cubic-bezier(.22,.61,.36,1), height 0.3s cubic-bezier(.22,.61,.36,1)',
      }}
    />
  );
}
