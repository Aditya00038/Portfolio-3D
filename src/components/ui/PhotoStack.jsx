import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Resting offset/scale per stack position (0 = front).
const POSITIONS = [
  { x: 0, y: 0, scale: 1 },
  { x: 12, y: 10, scale: 0.95 },
  { x: 24, y: 20, scale: 0.9 },
];

export default function PhotoStack({
  className,
  photos,
  onCycle,
}) {
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const justDragged = useRef(false);

  const cycle = () => {
    setOrder((prev) => {
      const next = [...prev.slice(1), prev[0]];
      onCycle?.(next.map((i) => photos[i].id));
      return next;
    });
  };

  return (
    <div className={cn("relative select-none", className)}>
      {order.map((photoIndex, pos) => {
        const photo = photos[photoIndex];
        const rest = POSITIONS[Math.min(pos, POSITIONS.length - 1)];
        const isFront = pos === 0;

        return (
          <motion.div
            animate={{ x: rest.x, y: rest.y, scale: rest.scale, rotate: 0 }}
            aria-label={
              isFront ? `${photo.name ?? photo.alt} — next` : undefined
            }
            className="absolute inset-0 overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_12px_28px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
            drag={isFront && !reduceMotion ? "x" : false}
            dragSnapToOrigin
            key={photo.id}
            onClick={() => {
              if (!isFront) {
                return;
              }
              // Swallow the click that trails a drag so it doesn't double-cycle.
              if (justDragged.current) {
                justDragged.current = false;
                return;
              }
              cycle();
            }}
            onDragEnd={() => {
              // Any drag release sends the dragged (front) card to the back.
              justDragged.current = true;
              cycle();
            }}
            onKeyDown={(e) => {
              if (isFront && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                cycle();
              }
            }}
            role={isFront ? "button" : undefined}
            style={{
              zIndex: photos.length - pos,
              cursor: isFront ? "grab" : "default",
            }}
            tabIndex={isFront ? 0 : -1}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 30 }
            }
            whileDrag={{ cursor: "grabbing" }}
          >
            <img
              alt={photo.alt}
              className="h-full w-full object-cover object-top"
              draggable={false}
              src={photo.src}
            />
            {pos > 0 && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black"
                style={{ opacity: pos === 1 ? 0.2 : 0.4 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
