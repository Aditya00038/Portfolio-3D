"use client";

import React, { useEffect, useRef } from "react";

interface ParticleNebulaProps {
  width?: number;
  height?: number;
  particleCount?: number;
  spread?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  angle: number;
  distance: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  speed: number;
  phase: number;
}

export default function ParticleNebula({
  width = 280,
  height = 280,
  particleCount = 1400,
  spread = 28,
  className = ""
}: ParticleNebulaProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;

    const randomNormal = (): number => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    const makeParticle = (): Particle => {
      const angle = Math.random() * 2 * Math.PI;
      const d = Math.abs(randomNormal()) * spread; 
      
      const baseX = cx + d * Math.cos(angle);
      const baseY = cy + d * Math.sin(angle);
      
      const centerFade = Math.max(0, 1 - (d / (spread * 3.5)));
      const baseOpacity = (Math.random() * 0.65 + 0.35) * centerFade;

      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        angle,
        distance: d,
        size: Math.random() * 0.9 + 0.3,
        baseOpacity,
        opacity: baseOpacity,
        speed: Math.random() * 0.8 + 0.2,
        phase: Math.random() * 2 * Math.PI
      };
    };

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(makeParticle());
    }

    let raf = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.001;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        const orbitalAngle = p.angle + time * (0.02 * p.speed);
        const driftX = Math.sin(time * p.speed + p.phase) * 1.5;
        const driftY = Math.cos(time * p.speed + p.phase) * 1.5;

        let targetX = cx + p.distance * Math.cos(orbitalAngle) + driftX;
        let targetY = cy + p.distance * Math.sin(orbitalAngle) + driftY;

        if (mouse.active) {
          const dx = mouse.x - targetX;
          const dy = mouse.y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const limit = 55;

          if (dist < limit) {
            const force = (limit - dist) / limit;
            const pushX = (dx / (dist || 1)) * force * 16;
            const pushY = (dy / (dist || 1)) * force * 16;
            targetX -= pushX;
            targetY -= pushY;
          }
        }

        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;

        p.opacity = p.baseOpacity * (0.8 + Math.sin(time * 2.5 + p.phase) * 0.2);

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [width, height, particleCount, spread]);

  return (
    <canvas
      ref={canvasRef}
      className={`block select-none cursor-pointer ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        mixBlendMode: "screen"
      }}
    />
  );
}
