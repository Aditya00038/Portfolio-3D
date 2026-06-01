import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaReact, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiFramer, SiMongodb, SiPython } from 'react-icons/si';

const iconClass = "w-10 h-10"; // Increased inner SVG size to w-10 h-10 for higher visual clarity

const CLOUD_ITEMS = [
  {
    name: 'React',
    icon: <FaReact className={`${iconClass} animate-[spin_16s_linear_infinite]`} color="#61DAFB" />,
    color: '#61DAFB'
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript className={iconClass} color="#F7DF1E" />,
    color: '#F7DF1E'
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className={iconClass} color="#38BDF8" />,
    color: '#38BDF8'
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs className={iconClass} color="#FFFFFF" />,
    color: '#FFFFFF'
  },
  {
    name: 'Framer Motion',
    icon: <SiFramer className={iconClass} color="#0055FF" />,
    color: '#0055FF'
  },
  {
    name: 'Python',
    icon: <SiPython className={iconClass} color="#3776AB" />,
    color: '#3776AB'
  },
  {
    name: 'Git',
    icon: <FaGitAlt className={iconClass} color="#F05032" />,
    color: '#F05032'
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb className={iconClass} color="#47A248" />,
    color: '#47A248'
  }
];

export default function TechCloud() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Spacious dimensions to cover the right viewport area and keep clean separations
  const width = 540;
  const height = 520;
  const itemSize = 80;

  // Spaced out coordinates covering the full rectangular height & width bounds
  const scatteredCoordinates = [
    { x: 30, y: 30 },   // React - Top Left
    { x: 420, y: 50 },  // JS - Top Right (Wide Column 2)
    { x: 120, y: 150 }, // Tailwind - Upper Mid Left
    { x: 320, y: 160 }, // Next.js - Upper Mid Right
    { x: 25, y: 270 },  // Framer - Lower Mid Left
    { x: 425, y: 280 }, // Python - Lower Mid Right (Wide Column 2)
    { x: 110, y: 390 }, // Git - Bottom Mid Left
    { x: 310, y: 400 }  // MongoDB - Bottom Right
  ];

  // Initialize coordinates state DIRECTLY inside useState to solve React Fast Refresh state preservation bugs
  const [items, setItems] = useState(() => {
    return CLOUD_ITEMS.map((item, idx) => {
      const coords = scatteredCoordinates[idx] || { x: 100, y: idx * 50 + 20 };
      const baseX = coords.x;
      const baseY = coords.y;

      return {
        ...item,
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        // Individual speed multipliers & phase offsets to avoid synchronous movement
        speedX: 0.7 + Math.random() * 0.5,
        speedY: 0.7 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        driftAmp: 14 + Math.random() * 6, // drifting amplitude in px for spacious movement
        isDragging: false
      };
    });
  });

  // Update item locations inside continuous requestAnimationFrame loop for ultimate smoothness
  useEffect(() => {
    if (items.length === 0) return;

    let animId;
    const start = Date.now();

    const updatePhysics = () => {
      const elapsed = (Date.now() - start) / 1000; // in seconds

      setItems(prevItems => 
        prevItems.map((item, idx) => {
          // If being dragged, let Framer Motion handle it completely
          if (idx === draggingIndex) return item;

          // Continuous floating drift based on sine waves
          const driftX = Math.sin(elapsed * item.speedX + item.phase) * item.driftAmp;
          const driftY = Math.cos(elapsed * item.speedY + item.phase) * item.driftAmp;

          let targetX = item.baseX + driftX;
          let targetY = item.baseY + driftY;

          // Apply cursor repulsion force
          if (mousePos.active) {
            // Find center of current item card relative to container
            const itemCenterX = targetX + 40;
            const itemCenterY = targetY + 40;

            const dx = itemCenterX - mousePos.x;
            const dy = itemCenterY - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 0.1;

            const repulsionRadius = 140; // repulsion activation radius in px
            if (distance < repulsionRadius) {
              const force = (repulsionRadius - distance) / repulsionRadius;
              const pushStrength = 55; // push strength in px
              
              targetX += (dx / distance) * force * pushStrength;
              targetY += (dy / distance) * force * pushStrength;
            }
          }

          // Bound coordinates to stay strictly inside the container (bubble chamber)
          const limitMinX = 20;
          const limitMaxX = width - itemSize - 20; // 440px
          const limitMinY = 20;
          const limitMaxY = height - itemSize - 20; // 420px
          
          const clampedX = Math.max(limitMinX, Math.min(limitMaxX, targetX));
          const clampedY = Math.max(limitMinY, Math.min(limitMaxY, targetY));

          // Interpolate current position towards target for fluid momentum
          const lerp = 0.08;
          const newX = item.x + (clampedX - item.x) * lerp;
          const newY = item.y + (clampedY - item.y) * lerp;

          return {
            ...item,
            x: newX,
            y: newY
          };
        })
      );

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, draggingIndex, items.length]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, active: false }));
  };

  const handleDragStart = (idx) => {
    setDraggingIndex(idx);
  };

  const handleDragEnd = (idx, info) => {
    setDraggingIndex(null);
    if (!containerRef.current) return;

    setItems(prevItems =>
      prevItems.map((item, i) => {
        if (i !== idx) return item;

        const dropX = item.x;
        const dropY = item.y;

        const limitMinX = 25;
        const limitMaxX = width - itemSize - 25;
        const limitMinY = 25;
        const limitMaxY = height - itemSize - 25;

        const boundedX = Math.max(limitMinX, Math.min(limitMaxX, dropX));
        const boundedY = Math.max(limitMinY, Math.min(limitMaxY, dropY));

        return {
          ...item,
          baseX: boundedX,
          baseY: boundedY,
          x: boundedX,
          y: boundedY
        };
      })
    );
  };

  return (
    <div className="relative select-none pointer-events-auto">
      {/* Invisible Physics Container (No background, borders, or shadows) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[540px] h-[520px] overflow-hidden"
      >
        {/* Dynamic Nodes */}
        {items.map((item, idx) => {
          const isDragging = idx === draggingIndex;
          
          return (
            <motion.div
              key={item.name}
              drag
              dragConstraints={containerRef}
              dragElastic={0.12}
              dragMomentum={true}
              onDragStart={() => handleDragStart(idx)}
              onDragEnd={(e, info) => handleDragEnd(idx, info)}
              onUpdate={(latest) => {
                if (isDragging) {
                  setItems(prevItems =>
                    prevItems.map((pi, i) => {
                      if (i !== idx) return pi;
                      return {
                        ...pi,
                        x: latest.x,
                        y: latest.y
                      };
                    })
                  );
                }
              }}
              animate={isDragging ? {} : { x: item.x, y: item.y }}
              transition={{
                type: "spring",
                stiffness: 95,
                damping: 16,
                mass: 0.6
              }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 80, // w-20
                height: 80, // h-20
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: isDragging ? 50 : 20
              }}
              className="flex items-center justify-center"
            >
              {/* Massive Sleek Square Card - Gray background, completely clean with NO shadow */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10"
                style={{
                  background: 'rgba(39, 39, 42, 0.75)', // zinc-800/75 glassmorphic gray blend
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: 'none' // Completely shadowless
                }}
                title={item.name}
              >
                {item.icon}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
