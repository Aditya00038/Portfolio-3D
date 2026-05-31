import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import ScrollRevealParagraph from './ScrollRevealParagraph';
import { LiquidMetalButton } from './ui/liquid-metal-button';
import { AnimatedDock } from './ui/animated-dock';
import ShimmerButton from "./ui/shimmer-button";
import KnowMoreButton from "./ui/know-more-button";
import ShimmerText from "./ui/shimmer-text";
import ShineText from "./ui/shine-text";
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa';

const pad = (n) => String(n).padStart(3, '0');

// --- Dynamic Sci-Fi Web Audio Synthesizer ---
class CinematicSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneGain = null;
    this.droneOscs = [];
    this.droneFilter = null;
    this.delayNode = null;
    this.delayFeedback = null;
    this.isInitialized = false;
    this.isPlaying = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.35, this.ctx.currentTime);

      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.setValueAtTime(0.45, this.ctx.currentTime);

      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);

      this.setupDrone();

      this.masterGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 1.5);

      this.isInitialized = true;
      this.isPlaying = true;
    } catch (e) {
      console.error("Web Audio API is not supported or was blocked by the browser:", e);
    }
  }

  setupDrone() {
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.droneFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);
    this.droneFilter.connect(this.masterGain);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.droneGain.connect(this.droneFilter);

    const frequencies = [55.0, 110.0, 110.4];
    const types = ['sine', 'triangle', 'triangle'];

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = types[idx];
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(idx === 0 ? 0.7 : 0.25, this.ctx.currentTime);

      osc.connect(subGain);
      subGain.connect(this.droneGain);
      osc.start();
      this.droneOscs.push(osc);
    });
  }

  modulateScroll(velocity) {
    if (!this.isInitialized || !this.isPlaying) return;

    const normVelocity = Math.min(Math.max(velocity, 0), 4.0);
    const targetFreq = 140 + normVelocity * 80;
    this.droneFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.15);

    const targetGain = 0.04 + normVelocity * 0.04;
    this.droneGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.2);
  }

  playChime(frequency) {
    if (!this.isInitialized || !this.isPlaying) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.018, this.ctx.currentTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    gainNode.connect(this.delayNode);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.95);
  }

  mute() {
    if (!this.isInitialized) return;
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
    this.isPlaying = false;
  }

  unmute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.masterGain.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.25);
  }

  destroy() {
    if (!this.isInitialized) return;
    try {
      this.droneOscs.forEach(osc => osc.stop());
      this.ctx.close();
    } catch (e) {
      console.error(e);
    }
  }
}


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

  const synthRef = useRef(null);
  const lastProgress = useRef(0);
  const lastTime = useRef(Date.now());
  const lastWordIndex = useRef(-1);
  const headerChordTriggered = useRef(false);

  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Smooth scroll animations with spring physics for high-end easing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Authentic paragraph content exactly matching user screenshot design layout
  const bioText = "I am a passionate creative developer specializing in building immersive web experiences. With a strong foundation in modern web technologies, I bridge the gap between design and engineering to create products that are both beautiful and functional.";
  const words = bioText.split(" ");
  const totalWords = words.length;

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
      // Map scroll progress to remaining frames, increasing speed multiplier for faster sequence
      const scrollMultiplier = 2.5;
      const remainingFrames = totalFrames - 1 - introEndFrame;
      const targetFrame = introEndFrame + Math.floor((latest * scrollMultiplier) * remainingFrames);
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

  // Initialize synth instance
  useEffect(() => {
    synthRef.current = new CinematicSynth();
    return () => {
      if (synthRef.current) {
        synthRef.current.destroy();
      }
    };
  }, []);

  // 6. Manage visibility, audio, speed modulation, and note triggers based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Manage intro text visibility
      if (latest > 0.01) {
        setShowIntroText(false);
      } else {
        setShowIntroText(true);
      }

      // Manage about text visibility (character moves left, text appears)
      if (latest > 0.15) {
        setShowAboutText(true);
      } else {
        setShowAboutText(false);
      }

      // A. Dynamic audio speed modulation
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 16) {
        const dp = Math.abs(latest - lastProgress.current);
        const velocity = (dp / dt) * 10000;
        if (synthRef.current) {
          synthRef.current.modulateScroll(velocity);
        }
        lastProgress.current = latest;
        lastTime.current = now;
      }

      // Hide audio tooltip on scroll
      if (latest > 0.05 && showTooltip) {
        setShowTooltip(false);
      }

      // B. Play majestic pentatonic sweep chord on header completion
      if (latest >= 0.32 && !headerChordTriggered.current) {
        if (synthRef.current && isAudioEnabled) {
          synthRef.current.playChime(440.00); // A4
          setTimeout(() => synthRef.current && synthRef.current.playChime(523.25), 70); // C5
          setTimeout(() => synthRef.current && synthRef.current.playChime(659.25), 140); // E5
          setTimeout(() => synthRef.current && synthRef.current.playChime(783.99), 210); // G5
        }
        headerChordTriggered.current = true;
      } else if (latest < 0.28 && headerChordTriggered.current) {
        headerChordTriggered.current = false;
      }

      // C. Play pentatonic chimes synchronously as bio words light up
      if (latest > 0.30 && latest < 0.58) {
        const subProgress = (latest - 0.30) / 0.28; // Map text zone to [0, 1]
        const wordIndex = Math.floor(subProgress * totalWords);
        const clampedIndex = Math.max(0, Math.min(wordIndex, totalWords - 1));

        if (clampedIndex !== lastWordIndex.current) {
          const pentatonic = [
            220.00, // A3
            246.94, // B3
            293.66, // D4
            329.63, // E4
            392.00, // G4
            440.00, // A4
            493.88, // B4
            587.33, // D5
            659.25, // E5
            783.99, // G5
            880.00  // A5
          ];
          const frequency = pentatonic[clampedIndex % pentatonic.length];
          if (synthRef.current && isAudioEnabled) {
            synthRef.current.playChime(frequency);
          }
          lastWordIndex.current = clampedIndex;
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isAudioEnabled, totalWords, showTooltip]);

  // B. Ink-Fill motion values linked to smooth progress
  const clipPercent = useTransform(smoothProgress, [0.18, 0.30], [100, 0]);
  const clipPathStyle = useTransform(clipPercent, (v) => `inset(0 ${v}% 0 0)`);
  const scannerLeft = useTransform(smoothProgress, [0.18, 0.30], ["0%", "100%"]);
  const scannerOpacity = useTransform(smoothProgress, [0.17, 0.19, 0.29, 0.31], [0, 1, 1, 0]);

  // Audio mute/unmute control
  const toggleAudio = () => {
    if (!synthRef.current) return;
    if (isAudioEnabled) {
      synthRef.current.mute();
      setIsAudioEnabled(false);
      window.audioContextActive = false;
    } else {
      synthRef.current.unmute();
      setIsAudioEnabled(true);
      window.audioContextActive = true;
      setShowTooltip(false);
      // Expose play chime player globally so other sections can easily reuse our synth
      window.playCinematicChime = (freq) => {
        if (synthRef.current && synthRef.current.isPlaying) {
          synthRef.current.playChime(freq);
        }
      };
    }
  };

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
            className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 pt-32 md:pt-40 z-20 pointer-events-none"
          >
            <div className="max-w-xl">
              <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-white mb-6 tracking-tighter leading-none uppercase" data-cursor="large">
                HI, I'M ADITYA
              </h2>
              <ShineText className="block text-xs md:text-sm font-semibold tracking-[0.2em] uppercase leading-[2.2]">
                A CREATIVE DEVELOPER FOCUSED ON CLEAN UI,<br /> SMART SOLUTIONS AND REAL WORLD PROJECTS
              </ShineText>

              <div className="mt-8 flex flex-col gap-4 pointer-events-auto items-start">
                <a href="/Aditya%20Resume.pdf" target="_blank" rel="noreferrer" className="block">
                  <ShimmerButton>
                    View Resume
                  </ShimmerButton>
                </a>
              </div>
            </div>

            {/* Contact Me Button at bottom right of hero */}
            <div className="absolute bottom-8 right-8 pointer-events-auto">
              <div onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <LiquidMetalButton label="Contact Me" />
              </div>
            </div>
          </motion.div>
        )}

        {/* About Me Text - Left-aligned text on the right side of the screen matching user screenshot */}
        {showAboutText && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col justify-center items-end p-8 md:p-16 lg:p-24 z-20 pointer-events-none"
          >
            <div className="max-w-xl text-left pointer-events-auto flex flex-col items-start pr-0 md:pr-12 lg:pr-24">

              {/* Dual-layered outlined/filled Header */}
              <div className="relative select-none mb-2" data-cursor="large">
                {/* Outlined text */}
                <h2
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase whitespace-nowrap"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)"
                  }}
                >
                  ABOUT ME
                </h2>

                {/* Filled text overlaid with clip-path mask */}
                <motion.h2
                  className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase text-white pointer-events-none whitespace-nowrap"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    clipPath: clipPathStyle,
                    color: "#ffffff",
                    textShadow: "0 0 35px rgba(255, 255, 255, 0.45)"
                  }}
                >
                  ABOUT ME
                </motion.h2>

                {/* Vertical neon scanner glow line */}
                <motion.div
                  style={{
                    left: scannerLeft,
                    opacity: scannerOpacity
                  }}
                  className="absolute top-0 w-[2.5px] h-[90%] bg-white shadow-[0_0_15px_#fff,0_0_30px_#5227FF] pointer-events-none"
                />
              </div>

              {/* Faint gray short horizontal underline below the header exactly as in the screenshot */}
              <div className="w-16 h-[2px] bg-zinc-800 mt-2 mb-6" />

              <ScrollRevealParagraph
                paragraph={bioText}
                globalProgress={scrollYProgress}
                className="font-light tracking-wide text-base md:text-lg max-w-lg mb-8"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                className="mt-4 pointer-events-auto flex items-center gap-6"
              >
                <Link to="/about" className="no-underline">
                  <KnowMoreButton />
                </Link>
                <AnimatedDock
                  items={[
                    {
                      link: "https://github.com",
                      target: "_blank",
                      Icon: <FaGithub size={22} />,
                    },
                    {
                      link: "https://linkedin.com",
                      target: "_blank",
                      Icon: <FaLinkedinIn size={22} />,
                    },
                    {
                      link: "https://instagram.com",
                      target: "_blank",
                      Icon: <FaInstagram size={22} />,
                    },
                    {
                      link: "mailto:adityasuryawanshi038@gmail.com",
                      target: "_blank",
                      Icon: <FaEnvelope size={20} />,
                    },
                  ]}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}


