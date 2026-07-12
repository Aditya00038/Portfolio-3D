import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CassettePlayer() {
  const [activeBtn, setActiveBtn] = useState('stop'); // stop, play, pause
  const [timer, setTimer] = useState(0);

  const audioRef = useRef(null);

  // Initialize and load the custom Baby Blue MP3 song
  useEffect(() => {
    const audio = new Audio('/extra_images/baby-blue-remastered-2010-128-ytshorts.savetube.me.mp3');
    audio.loop = true;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setTimer(Math.floor(audio.currentTime));
    };

    const handleEnded = () => {
      setActiveBtn('stop');
      setTimer(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, []);

  const handlePlay = () => {
    if (activeBtn === 'play') return;
    setActiveBtn('play');
    audioRef.current?.play().catch(err => {
      console.warn("Playback blocked by browser auto-play policy:", err);
    });
  };

  const handlePause = () => {
    if (activeBtn !== 'play') return;
    setActiveBtn('pause');
    audioRef.current?.pause();
  };

  const handleStop = () => {
    setActiveBtn('stop');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setTimer(0);
  };

  const handleRewind = () => {
    playClickFeedback();
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleFastForward = () => {
    playClickFeedback();
    if (audioRef.current) {
      // Seek forward by 10s
      audioRef.current.currentTime = Math.min(audioRef.current.duration || 999, audioRef.current.currentTime + 10);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const playClickFeedback = () => {
    try {
      const clickCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = clickCtx.createOscillator();
      const gain = clickCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, clickCtx.currentTime);
      gain.gain.setValueAtTime(0.08, clickCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, clickCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(clickCtx.destination);
      osc.start();
      osc.stop(clickCtx.currentTime + 0.05);
    } catch (e) { }
  };

  // Spindle Gear graphics (rotates when active, sits over the image spool holes)
  const GearSpindle = () => (
    <motion.svg
      className="w-10 h-10 text-[#4c4c4e] opacity-90"
      viewBox="0 0 100 100"
      animate={activeBtn === 'play' ? { rotate: 360 } : {}}
      transition={activeBtn === 'play' ? { repeat: Infinity, ease: "linear", duration: 3.5 } : {}}
    >
      <circle cx="50" cy="50" r="18" fill="currentColor" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect
          key={deg}
          x="44"
          y="12"
          width="12"
          height="28"
          rx="4"
          fill="currentColor"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#1b1714" />
    </motion.svg>
  );

  return (
    /* Premium Stealth-Black Casing: border highlights, inset lines and bevel shadows */
    <div className="w-[400px] p-5 rounded-[2.2rem] bg-[#1a1a1c] border border-[#2b2b2e] flex flex-col gap-4 select-none shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_1px_1px_0_rgba(255,255,255,0.06),inset_-1px_-1px_0_rgba(0,0,0,0.4)] font-sans text-[#a1a1aa] relative overflow-hidden">

      {/* 4 decorative rectangular vents on top of case */}
      <div className="flex justify-center gap-1.5 w-full mb-1 opacity-70">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-8 h-2 rounded-[2px] bg-[#0c0c0d] border-b border-[#2d2d30] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]" />
        ))}
      </div>

      {/* Tape Shell Frame (Inset beveled casing compartment) */}
      <div className="relative w-full aspect-[1.66] bg-[#121213] rounded-2xl p-2.5 flex flex-col justify-between border-2 border-t-[#0c0c0d] border-l-[#0c0c0d] border-b-[#2c2c2f] border-r-[#2c2c2f] shadow-[inset_2px_2px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.03)]">

        {/* Cassette Body window displaying the cropped/zoomed middle cassette of radio-tape.png */}
        <div className="w-full h-full rounded-xl relative overflow-hidden border border-zinc-950 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.9)] bg-[#0b0b0c]">

          <img
            src="/extra_images/radio-tape.png"
            className="absolute inset-0 w-full h-full object-cover scale-[1.28] -translate-y-[15.5%] z-0 select-none pointer-events-none brightness-90 contrast-105"
            alt="Mixtape Label"
            draggable={false}
          />

          {/* Left Spindle Gear overlay centered over the spindle hole in the cropped image */}
          <div className="absolute top-[49%] left-[35.8%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <GearSpindle />
          </div>

          {/* Right Spindle Gear overlay centered over the spindle hole in the cropped image */}
          <div className="absolute top-[49%] left-[64.2%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <GearSpindle />
          </div>

        </div>

      </div>

      {/* LED Digital Display Band (Sleek deep-inset panel) */}
      <div className="w-full bg-[#0a0a0b] border border-[#1f2022] rounded-xl px-4 py-2 flex items-center justify-between text-xs font-mono select-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.02)]">
        <div className="flex items-center gap-2">
          {/* Led Dot */}
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeBtn === 'play'
                ? 'bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse'
                : activeBtn === 'pause'
                  ? 'bg-[#ff9900] shadow-[0_0_8px_#ff9900]'
                  : 'bg-zinc-800 shadow-none'
              }`}
          />
          <span className="text-[9.5px] text-[#ff9900] tracking-wider font-semibold uppercase">
            {activeBtn === 'play' ? 'PLAYING STATION' : activeBtn === 'pause' ? 'PAUSED' : 'READY - SELECT A STATION'}
          </span>
        </div>
        <span className={`text-[11px] font-bold ${activeBtn === 'play' ? 'text-[#00ff66]' : 'text-zinc-700'}`}>
          {formatTime(timer)}
        </span>
      </div>

      {/* 3D MECHANICAL STEALTH BUTTONS PANEL */}
      <div className="w-full bg-[#151516] border border-t-[#0e0e0f] border-l-[#0e0e0f] border-b-[#2a2a2d] border-r-[#2a2a2d] rounded-xl p-3 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.03)] flex items-center justify-between gap-1 relative z-10">

        {/* Left-side speaker/grill lines (Recessed open slots) */}
        <div className="flex flex-col gap-[2.5px] w-3.5 select-none pr-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[2px] bg-[#0c0c0d] rounded-full border-b border-white/5" />
          ))}
        </div>

        {/* Buttons Row */}
        <div className="flex-1 flex justify-between items-center gap-1.5 px-0.5">

          {/* STOP/EJECT */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[5.5px] font-bold tracking-tight uppercase text-zinc-500">STOP/EJECT</span>
            <button
              type="button"
              onClick={() => { playClickFeedback(); handleStop(); }}
              style={{
                background: activeBtn === 'stop'
                  ? 'radial-gradient(circle at 50% 80%, #151517 0%, #0d0d0e 100%)'
                  : 'radial-gradient(circle at 50% 20%, #353539 0%, #1b1b1d 100%)',
              }}
              className={`w-full aspect-[1.25] rounded-[6px] border-t border-l border-t-[#4c4c52] border-l-[#3a3a3e] border-b border-r border-b-[#0b0b0c] border-r-[#0b0b0c] cursor-pointer flex items-center justify-center transition-all duration-150 select-none ${activeBtn === 'stop'
                  ? 'shadow-[inset_0_3px_5px_rgba(0,0,0,0.85)] translate-y-[3px]'
                  : 'shadow-[0_4px_6px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.07)] active:translate-y-[2px] hover:brightness-105'
                }`}
              title="Stop / Eject"
            >
              <svg className="w-3.5 h-3.5 text-[#8e8e93] opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="12" height="3" rx="0.5" />
                <polygon points="12,11 6,18 18,18" />
              </svg>
            </button>
          </div>

          {/* PLAY */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[5.5px] font-bold tracking-tight uppercase text-zinc-500 font-sans">PLAY</span>
            <button
              type="button"
              onClick={() => { playClickFeedback(); handlePlay(); }}
              style={{
                background: activeBtn === 'play'
                  ? 'radial-gradient(circle at 50% 80%, #151517 0%, #0d0d0e 100%)'
                  : 'radial-gradient(circle at 50% 20%, #353539 0%, #1b1b1d 100%)',
              }}
              className={`w-full aspect-[1.25] rounded-[6px] border-t border-l border-t-[#4c4c52] border-l-[#3a3a3e] border-b border-r border-b-[#0b0b0c] border-r-[#0b0b0c] cursor-pointer flex items-center justify-center transition-all duration-150 select-none ${activeBtn === 'play'
                  ? 'shadow-[inset_0_3px_5px_rgba(0,0,0,0.85)] translate-y-[3px]'
                  : 'shadow-[0_4px_6px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.07)] active:translate-y-[2px] hover:brightness-105'
                }`}
              title="Play"
            >
              <svg className="w-3.5 h-3.5 text-[#8e8e93] opacity-80 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="8,5 19,12 8,19" />
              </svg>
            </button>
          </div>

          {/* BACK (Rewind) */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[5.5px] font-bold tracking-tight uppercase text-zinc-500 font-sans">BACK</span>
            <button
              type="button"
              onMouseDown={handleRewind}
              style={{
                background: 'radial-gradient(circle at 50% 20%, #353539 0%, #1b1b1d 100%)'
              }}
              className="w-full aspect-[1.25] rounded-[6px] border-t border-l border-t-[#4c4c52] border-l-[#3a3a3e] border-b border-r border-b-[#0b0b0c] border-r-[#0b0b0c] cursor-pointer flex items-center justify-center transition-all duration-100 select-none shadow-[0_4px_6px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.07)] active:translate-y-[3px] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.85)] hover:brightness-105"
              title="Rewind"
            >
              <svg className="w-3.5 h-3.5 text-[#8e8e93] opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,5 4,12 12,19" />
                <polygon points="20,5 12,12 20,19" />
              </svg>
            </button>
          </div>

          {/* NEXT (Fast Forward) */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[5.5px] font-bold tracking-tight uppercase text-zinc-500 font-sans">NEXT</span>
            <button
              type="button"
              onMouseDown={handleFastForward}
              style={{
                background: 'radial-gradient(circle at 50% 20%, #353539 0%, #1b1b1d 100%)'
              }}
              className="w-full aspect-[1.25] rounded-[6px] border-t border-l border-t-[#4c4c52] border-l-[#3a3a3e] border-b border-r border-b-[#0b0b0c] border-r-[#0b0b0c] cursor-pointer flex items-center justify-center transition-all duration-100 select-none shadow-[0_4px_6px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.07)] active:translate-y-[3px] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.85)] hover:brightness-105"
              title="Fast Forward"
            >
              <svg className="w-3.5 h-3.5 text-[#8e8e93] opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="4,5 12,12 4,19" />
                <polygon points="12,5 20,12 12,19" />
              </svg>
            </button>
          </div>

          {/* PAUSE */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[5.5px] font-bold tracking-tight uppercase text-zinc-500 font-sans">PAUSE</span>
            <button
              type="button"
              onClick={() => { playClickFeedback(); handlePause(); }}
              style={{
                background: activeBtn === 'pause'
                  ? 'radial-gradient(circle at 50% 80%, #151517 0%, #0d0d0e 100%)'
                  : 'radial-gradient(circle at 50% 20%, #353539 0%, #1b1b1d 100%)',
              }}
              className={`w-full aspect-[1.25] rounded-[6px] border-t border-l border-t-[#4c4c52] border-l-[#3a3a3e] border-b border-r border-b-[#0b0b0c] border-r-[#0b0b0c] cursor-pointer flex items-center justify-center transition-all duration-150 select-none ${activeBtn === 'pause'
                  ? 'shadow-[inset_0_3px_5px_rgba(0,0,0,0.85)] translate-y-[3px]'
                  : 'shadow-[0_4px_6px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.07)] active:translate-y-[2px] hover:brightness-105'
                }`}
              title="Pause"
            >
              <svg className="w-3.5 h-3.5 text-[#8e8e93] opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="0.5" />
                <rect x="14" y="5" width="4" height="14" rx="0.5" />
              </svg>
            </button>
          </div>

        </div>

        {/* Right-side BATT led */}
        <div className="flex items-center gap-1.5 pl-2 pr-0.5 border-l border-zinc-950 select-none">
          <div className="flex flex-col text-[5.5px] font-bold leading-none text-zinc-500 font-sans">
            <span>BATT</span>
          </div>
          <span
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeBtn === 'play' ? 'bg-[#00ff66] shadow-[0_0_6px_#00ff66]' : 'bg-[#154622]'
              }`}
          />
        </div>

      </div>

    </div>
  );
}
