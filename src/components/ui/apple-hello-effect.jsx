"use client";

import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const initialProps = {
  strokeDashoffset: 1000,
  strokeDasharray: 1000,
  fillOpacity: 0,
};

const animateProps = {
  strokeDashoffset: 0,
  fillOpacity: 1,
};

function AdityaLoadingEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}) {
  const calc = (x) => x * speed;

  return (
    <motion.svg
      className={cn("h-32 w-auto max-w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 200"
      fill="white"
      stroke="white"
      strokeWidth="2"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>Aditya</title>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: "'Lobster Two', cursive",
          fontSize: '140px',
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          strokeDashoffset: {
            duration: calc(2),
            ease: "easeInOut",
          },
          fillOpacity: {
            duration: calc(1),
            delay: calc(1.5),
            ease: "easeIn",
          }
        }}
        onAnimationComplete={onAnimationComplete}
      >
        Aditya
      </motion.text>
    </motion.svg>
  );
}

export { AdityaLoadingEffect };
