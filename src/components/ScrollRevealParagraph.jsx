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
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <p className={`text-lg leading-relaxed ${className}`} ref={container}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={`word-${i}-${word.slice(0, KEY_PREFIX_LENGTH)}`}
            progress={scrollYProgress}
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
