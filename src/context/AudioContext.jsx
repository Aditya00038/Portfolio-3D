import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext(null);

export const playlist = [
  { id: 0, title: 'Aria Math (Minecraft)', url: '/Musics/Aria Math from Minecraft.mp3', duration: 310 },
  { id: 1, title: 'GTA IV Theme Song', url: '/Musics/GTA IV - Theme Song .webm', duration: 141 },
  { id: 2, title: 'GTA V Soundtrack', url: '/Musics/GTA V - Welcome to Los Santos Soundtrack.webm', duration: 180 }
];

export function AudioProvider({ children }) {
  const [activeBtn, setActiveBtn] = useState('stop'); // stop, play, pause
  const [timer, setTimer] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const audioRef = useRef(null);
  const currentTrackRef = useRef(currentTrack);

  // Keep ref synchronized to avoid stale closures in event listeners
  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(currentTrackRef.current.url);
      audio.loop = false;

      audio.addEventListener('timeupdate', () => {
        setTimer(Math.floor(audio.currentTime));
      });

      audio.addEventListener('ended', () => {
        playNext();
      });

      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const playNext = () => {
    const currentIndex = playlist.findIndex((track) => track.id === currentTrackRef.current.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    
    setCurrentTrack(nextTrack);
    setTimer(0);
    
    if (audioRef.current) {
      audioRef.current.src = nextTrack.url;
      audioRef.current.load();
      audioRef.current.play().catch(err => {
        console.warn("Playback blocked by browser auto-play policy:", err);
      });
    }
  };

  const handlePlay = () => {
    if (activeBtn === 'play') return;
    setActiveBtn('play');

    if (currentTrack.url) {
      const audio = getAudio();
      const expectedSrc = window.location.origin + currentTrack.url;
      if (audio.src !== expectedSrc && !audio.src.endsWith(currentTrack.url)) {
        audio.src = currentTrack.url;
        audio.load();
      }
      audio.play().catch(err => {
        console.warn("Playback blocked by browser auto-play policy:", err);
      });
    }
  };

  const handlePause = () => {
    if (activeBtn !== 'play') return;
    setActiveBtn('pause');
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStop = () => {
    setActiveBtn('stop');
    setTimer(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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
      audioRef.current.currentTime = Math.min(currentTrack.duration, audioRef.current.currentTime + 10);
    }
  };

  const selectTrack = (track) => {
    playClickFeedback();
    handleStop();
    setCurrentTrack(track);
    setShowDropdown(false);
    
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.load();
    }
  };

  const playClickFeedback = () => {
    try {
      const clickCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = clickCtx.createOscillator();
      const gain = clickCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2500, clickCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, clickCtx.currentTime + 0.015);
      
      gain.gain.setValueAtTime(0.12, clickCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, clickCtx.currentTime + 0.015);
      
      osc.connect(gain);
      gain.connect(clickCtx.destination);
      osc.start();
      osc.stop(clickCtx.currentTime + 0.02);
    } catch (e) { }
  };

  return (
    <AudioContext.Provider
      value={{
        playlist,
        activeBtn,
        timer,
        currentTrack,
        showDropdown,
        setShowDropdown,
        handlePlay,
        handlePause,
        handleStop,
        handleRewind,
        handleFastForward,
        selectTrack,
        playClickFeedback
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
