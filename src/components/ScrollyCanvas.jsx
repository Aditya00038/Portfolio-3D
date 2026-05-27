import React, { useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';

const pad = (n) => String(n).padStart(3, '0');

export default function ScrollyCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  const frameIndexRef = useRef(0);
  const rafIdRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const totalFrames = 240;
  // Frame where the "2 fingers action" ends and scroll control begins.
  // Set to 65 as requested for the end of the waving animation.
  const introEndFrame = 65;

  // 1. Preload all 240 frames
  useEffect(() => {
    let loadedCount = 0;
    const tempImages = [];

    const handleImageLoad = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalFrames) * 100);
      setProgress(currentProgress);

      if (loadedCount === totalFrames) {
        imagesRef.current = tempImages;
        setLoading(false);
      }
    };

    const handleImageError = (e) => {
      console.error("Failed to load image frame", e);
      loadedCount++;
      if (loadedCount === totalFrames) {
        imagesRef.current = tempImages;
        setLoading(false);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Updated to match delay-0.041s
      img.src = `/sequence/frame_${pad(i)}_delay-0.041s.png`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      tempImages.push(img);
    }
  }, []);

  // 2. High-performance canvas drawing
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * devicePixelRatio || canvas.height !== h * devicePixelRatio) {
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    ctx.clearRect(0, 0, w, h);

    const iw = img.width;
    const ih = img.height;

    // Calculate the "cover" scale, then decrease it (e.g., to 75%) to make the character smaller
    const baseScale = Math.max(w / iw, h / ih);
    const scale = baseScale * 0.75; // Increased slightly as requested

    const nw = iw * scale;
    const nh = ih * scale;

    // Center horizontally
    const dx = (w - nw) / 2;

    // Ground the character at the bottom of the screen
    const dy = h - nh;

    ctx.drawImage(img, dx, dy, nw, nh);
  };

  // 3. Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!loading) {
        drawFrame(frameIndexRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loading]);

  // 4. Play Intro Autoplay Animation
  useEffect(() => {
    if (loading) return;

    let currentFrame = 0;
    let lastTime = 0;
    const fpsInterval = 1000 / 24; // 0.041s delay implies ~24 FPS playback

    const playIntro = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        drawFrame(currentFrame);
        frameIndexRef.current = currentFrame;

        if (currentFrame < introEndFrame) {
          currentFrame++;
          rafIdRef.current = requestAnimationFrame(playIntro);
        } else {
          setIntroDone(true);
        }
      } else {
        rafIdRef.current = requestAnimationFrame(playIntro);
      }
    };

    rafIdRef.current = requestAnimationFrame(playIntro);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [loading]);

  // 5. Update frame based on scroll (Only after intro is done)
  useEffect(() => {
    if (loading || !introDone) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map scroll progress to remaining frames
      const remainingFrames = totalFrames - 1 - introEndFrame;
      const targetFrame = introEndFrame + Math.floor(latest * remainingFrames);
      const boundedFrame = Math.max(introEndFrame, Math.min(targetFrame, totalFrames - 1));

      if (frameIndexRef.current !== boundedFrame) {
        frameIndexRef.current = boundedFrame;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => drawFrame(boundedFrame));
      }
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [loading, introDone, scrollYProgress]);

  const [showIntroText, setShowIntroText] = useState(true);
  const [showAboutText, setShowAboutText] = useState(false);

  // 6. Manage visibility of text blocks based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Hide intro text immediately when scroll starts
      if (latest > 0.01) {
        setShowIntroText(false);
      } else {
        setShowIntroText(true);
      }

      // Show about text when character moves left (around 15% scroll)
      if (latest > 0.15 && latest < 0.85) {
        setShowAboutText(true);
      } else {
        setShowAboutText(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full h-[500vh] bg-black">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <h3 className="mb-8 text-sm tracking-widest text-gray-400 uppercase">
            Loading Animation
          </h3>
          <div className="text-6xl font-black mb-6">{progress}%</div>
          <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10 bg-black">
        {/* The Transparent Canvas (z-10) */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none"
        />

        {/* Foreground Intro Text - IN FRONT of Canvas (z-20) */}
        {showIntroText && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-32 md:pb-48 lg:pb-64 z-20 pointer-events-none"
          >
            <div className="max-w-xl">
              <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-white mb-6 tracking-tighter leading-none uppercase">
                HI, I'M ADITYA
              </h2>
              <p className="text-xs md:text-sm text-gray-400 font-semibold tracking-[0.2em] uppercase leading-[2.2]">
                A CREATIVE DEVELOPER FOCUSED ON CLEAN UI, SMART SOLUTIONS AND REAL WORLD PROJECTS
              </p>
            </div>
          </motion.div>
        )}

        {/* About Me Text - Appears when scrolling down and character moves left */}
        {showAboutText && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-center items-end p-8 md:p-16 lg:p-24 z-20 pointer-events-none"
          >
            <div className="max-w-md text-right">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none uppercase">
                ABOUT ME
              </h2>
              <div className="w-12 h-1 bg-white/30 mb-6 ml-auto"></div>
              <p className="text-sm md:text-base text-gray-300 font-medium tracking-wide leading-relaxed">
                I am a passionate creative developer specializing in building immersive web experiences. With a strong foundation in modern web technologies, I bridge the gap between design and engineering to create products that are both beautiful and functional.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}


