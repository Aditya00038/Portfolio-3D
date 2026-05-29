import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const KEY_PREFIX_LENGTH = 3;

export default function ScrollRevealParagraph({
  paragraph,
  className = "",
  globalProgress,
}) {
  // Map the global scroll progress to 0-1 for this paragraph
  // Matched with the audio chime trigger window (0.30 to 0.58) for perfectly slow, synced filling
  const localProgress = useTransform(globalProgress, [0.30, 0.58], [0, 1]);


  const words = paragraph.split(" ");

  return (
    <p className={`text-lg leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`word-${i}-${word.slice(0, KEY_PREFIX_LENGTH)}`}
            progress={localProgress}
            range={[start, end]}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }) => {
  const shouldReduceMotion = useReducedMotion();
  const opacity = useTransform(
    progress,
    range,
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <span className="relative mr-[0.25em] inline-block">
      {shouldReduceMotion ? null : (
        <span className="text-white/20">{children}</span>
      )}
      <motion.span
        className="absolute inset-0 text-white"
        style={{ opacity }}
      >
        {children}
      </motion.span>
    </span>
  );
};
