import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function CassettePlayer() {
  const [activeBtn, setActiveBtn] = useState('stop'); // stop, play, pause
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState(197); // fallback to 3:17 (197 seconds)

  const audioRef = useRef(null);

  // Initialize and load the custom Baby Blue MP3 song
  useEffect(() => {
    const audio = new Audio('/extra_images/baby-blue-remastered-2010-128-ytshorts.savetube.me.mp3');
    audio.loop = true;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setTimer(Math.floor(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      if (audio.duration) {
        setDuration(Math.floor(audio.duration));
      }
    };

    const handleEnded = () => {
      setActiveBtn('stop');
      setTimer(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
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
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
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

  const progressPercent = duration ? (timer / duration) * 100 : 0;

  return (
    <StyledWrapper>
      <div className="win95-card">
        {/* Title bar */}
        <div className="card-titlebar">
          <span className="card-title-text">Media Player</span>
        </div>

        {/* Menu bar */}
        <div className="card-menubar">
          <span className="menu-item" onClick={playClickFeedback}>File</span>
          <span className="menu-item" onClick={() => { playClickFeedback(); handlePlay(); }}>Play</span>
          <span className="menu-item" onClick={() => { playClickFeedback(); handlePause(); }}>Pause</span>
          <span className="menu-item" onClick={playClickFeedback}>Options</span>
        </div>

        {/* Player Body */}
        <div className="card-body">
          {/* Display screen */}
          <div className="player-display">
            <span className="track-name">Badfinger_BabyBlue.wav</span>
            <span className="track-time">
              {formatTime(timer)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress Slider */}
          <div className="player-progress">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            <div className="progress-thumb" style={{ left: `${progressPercent}%` }} />
          </div>

          {/* Controls Row */}
          <div className="player-controls">
            <button 
              className="ctrl-btn ctrl-prev" 
              onClick={handleRewind}
              title="Seek Backward (10s)"
            />
            <button 
              className={`ctrl-btn ${activeBtn === 'play' ? 'ctrl-pause' : 'ctrl-play'}`}
              onClick={() => {
                playClickFeedback();
                if (activeBtn === 'play') {
                  handlePause();
                } else {
                  handlePlay();
                }
              }}
              title={activeBtn === 'play' ? 'Pause' : 'Play'}
            />
            <button 
              className="ctrl-btn ctrl-stop" 
              onClick={() => { playClickFeedback(); handleStop(); }}
              title="Stop"
            />
            <button 
              className="ctrl-btn ctrl-next" 
              onClick={handleFastForward}
              title="Seek Forward (10s)"
            />
          </div>
        </div>

        {/* Status bar */}
        <div className="card-statusbar">
          <span className="status-text">
            {activeBtn === 'play' ? 'Playing' : activeBtn === 'pause' ? 'Paused' : 'Stopped'}
          </span>
          <span className="status-vol">Vol: 75%</span>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .win95-card {
    --card-bg: #c0c0c0;
    --card-border-light: #ffffff;
    --card-border-dark: #808080;
    --card-border-darker: #404040;
    --card-titlebar: linear-gradient(90deg, #000080, #1084d0);
    --card-title-text: #ffffff;
    --card-text: #000000;
    --card-display-bg: #000000;
    --card-display-text: #00ff00;

    font-family: "Segoe UI", Tahoma, sans-serif;
    font-size: 14px;
    width: 320px; /* Increased card width from 250px to 320px */
    background: var(--card-bg);
    border: 1px solid;
    border-color: var(--card-border-light) var(--card-border-darker)
      var(--card-border-darker) var(--card-border-light);
    box-shadow:
      inset 1px 1px 0 var(--card-border-light),
      inset -1px -1px 0 var(--card-border-dark);
    user-select: none;
  }

  .card-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px 6px 10px; /* Increased titlebar height/padding */
    background: var(--card-titlebar);
    color: var(--card-title-text);
  }

  .card-title-text {
    font-size: 13px; /* Scaled text size */
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .card-menubar {
    display: flex;
    gap: 3px;
    padding: 5px 8px; /* Increased menubar padding */
    border-bottom: 1px solid var(--card-border-dark);
  }

  .menu-item {
    font-size: 12px; /* Scaled menu text size */
    padding: 2px 10px;
    color: var(--card-text);
    cursor: pointer;
  }

  .menu-item:hover {
    background: #000080;
    color: #ffffff;
  }

  .card-body {
    padding: 20px 18px; /* Increased body padding (expands height and margins) */
  }

  .player-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 12px; /* Taller monochrome screen */
    margin-bottom: 18px;
    background: var(--card-display-bg);
    border: 1px solid;
    border-color: var(--card-border-dark) var(--card-border-light)
      var(--card-border-light) var(--card-border-dark);
    box-shadow: inset 1px 1px 0 var(--card-border-darker);
  }

  .track-name {
    font-size: 12px;
    font-family: monospace;
    color: var(--card-display-text);
    animation: blink-text 1.5s step-end infinite;
  }

  @keyframes blink-text {
    50% {
      opacity: 0.7;
    }
  }

  .track-time {
    font-size: 11px;
    font-family: monospace;
    color: var(--card-display-text);
  }

  .player-progress {
    position: relative;
    height: 16px; /* Taller progress track */
    margin-bottom: 18px;
    background: var(--card-bg);
    border: 1px solid;
    border-color: var(--card-border-dark) var(--card-border-light)
      var(--card-border-light) var(--card-border-dark);
    box-shadow: inset 1px 1px 0 var(--card-border-darker);
  }

  .progress-fill {
    height: 100%;
    background: #000080;
  }

  .progress-thumb {
    position: absolute;
    top: -1px;
    width: 12px; /* Wider thumb */
    height: 18px; /* Taller thumb */
    background: var(--card-bg);
    border: 1px solid;
    border-color: var(--card-border-light) var(--card-border-darker)
      var(--card-border-darker) var(--card-border-light);
    transform: translateX(-50%);
  }

  .player-controls {
    display: flex;
    justify-content: center;
    gap: 8px; /* Wider gap between controls */
    margin-top: 6px;
  }

  .ctrl-btn {
    width: 38px; /* Wider buttons */
    height: 28px; /* Taller buttons */
    background: var(--card-bg);
    border: 2px solid;
    border-color: var(--card-border-light) var(--card-border-darker)
      var(--card-border-darker) var(--card-border-light);
    cursor: pointer;
    position: relative;
    outline: none;
  }

  .ctrl-btn:hover {
    background: #d4d4d4;
  }

  .ctrl-btn:active {
    border-color: var(--card-border-darker) var(--card-border-light)
      var(--card-border-light) var(--card-border-darker);
  }

  .ctrl-prev::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    border: 4px solid transparent;
    border-right: 5px solid var(--card-text);
    transform: translate(-50%, -50%);
  }

  .ctrl-prev::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 35%;
    width: 2px;
    height: 8px;
    background: var(--card-text);
    transform: translate(-50%, -50%);
  }

  .ctrl-play::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    border: 5px solid transparent;
    border-left: 6px solid var(--card-text);
    transform: translate(-50%, -50%);
  }

  .ctrl-pause::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 40%;
    width: 2px;
    height: 8px;
    background: var(--card-text);
    transform: translate(-50%, -50%);
  }

  .ctrl-pause::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 60%;
    width: 2px;
    height: 8px;
    background: var(--card-text);
    transform: translate(-50%, -50%);
  }

  .ctrl-stop::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: var(--card-text);
    transform: translate(-50%, -50%);
  }

  .ctrl-next::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 45%;
    border: 4px solid transparent;
    border-left: 5px solid var(--card-text);
    transform: translate(-50%, -50%);
  }

  .ctrl-next::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 65%;
    width: 2px;
    height: 8px;
    background: var(--card-text);
    transform: translate(-50%, -50%);
  }

  .card-statusbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px; /* More padding on status bar */
    background: var(--card-bg);
    border-top: 1px solid var(--card-border-light);
    box-shadow: inset 0 1px 0 var(--card-border-dark);
  }

  .status-text {
    font-size: 11px;
    color: var(--card-text);
    padding: 2px 4px;
    border: 1px solid;
    border-color: var(--card-border-dark) var(--card-border-light)
      var(--card-border-light) var(--card-border-dark);
    flex: 1;
  }

  .status-vol {
    font-size: 10px;
    padding: 2px 6px;
    margin-left: 4px;
    background: var(--card-bg);
    border: 1px solid;
    border-color: var(--card-border-dark) var(--card-border-light)
      var(--card-border-light) var(--card-border-dark);
    color: var(--card-text);
  }
`;
