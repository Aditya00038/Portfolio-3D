import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAudio } from '../context/AudioContext';

export default function CassettePlayer() {
  const {
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
  } = useAudio();

  // Click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showDropdown && !e.target.closest('.file-menu-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showDropdown, setShowDropdown]);

  const progressPercent = currentTrack.duration ? (timer / currentTrack.duration) * 100 : 0;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <StyledWrapper>
      <div className="win95-card">
        {/* Title bar */}
        <div className="card-titlebar">
          <span className="card-title-text">Media Player</span>
        </div>

        {/* Menu bar */}
        <div className="card-menubar">
          {/* File Menu (Interactive Dropdown) */}
          <div className="file-menu-container relative">
            <span className="menu-item" onClick={(e) => { e.stopPropagation(); playClickFeedback(); setShowDropdown(!showDropdown); }}>
              File
            </span>
            {showDropdown && (
              <div className="file-dropdown">
                {playlist.map((track) => (
                  <div 
                    key={track.id} 
                    className={`dropdown-item ${currentTrack.id === track.id ? 'active-track' : ''}`}
                    onClick={() => selectTrack(track)}
                  >
                    {currentTrack.id === track.id ? '✓ ' : ''}{track.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <span className="menu-item" onClick={() => { playClickFeedback(); handlePlay(); }}>Play</span>
          <span className="menu-item" onClick={() => { playClickFeedback(); handlePause(); }}>Pause</span>
        </div>

        {/* Player Body */}
        <div className="card-body">
          {/* Display screen */}
          <div className="player-display">
            <span className="track-name">{currentTrack.title}</span>
            <span className="track-time">
              {formatTime(timer)} / {formatTime(currentTrack.duration)}
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
    width: 320px;
    background: var(--card-bg);
    border: 1px solid;
    border-color: var(--card-border-light) var(--card-border-darker)
      var(--card-border-darker) var(--card-border-light);
    box-shadow:
      inset 1px 1px 0 var(--card-border-light),
      inset -1px -1px 0 var(--card-border-dark);
    user-select: none;
    position: relative;
  }

  .card-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px 6px 10px;
    background: var(--card-titlebar);
    color: var(--card-title-text);
  }

  .card-title-text {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .card-menubar {
    display: flex;
    gap: 3px;
    padding: 5px 8px;
    border-bottom: 1px solid var(--card-border-dark);
    position: relative;
  }

  .menu-item {
    font-size: 12px;
    padding: 2px 10px;
    color: var(--card-text);
    cursor: pointer;
    display: inline-block;
  }

  .menu-item:hover {
    background: #000080;
    color: #ffffff;
  }

  /* Retro Win95 Dropdown Menu */
  .file-dropdown {
    position: absolute;
    top: 100%;
    left: 4px;
    background: var(--card-bg);
    border: 1px solid;
    border-color: var(--card-border-light) var(--card-border-darker)
      var(--card-border-darker) var(--card-border-light);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    z-index: 110;
    width: 175px;
    padding: 2px;
    margin-top: 1px;
  }

  .dropdown-item {
    font-size: 11px;
    padding: 4px 8px;
    color: var(--card-text);
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dropdown-item:hover {
    background: #000080;
    color: #ffffff;
  }

  .active-track {
    font-weight: bold;
  }

  .card-body {
    padding: 20px 18px;
  }

  .player-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 12px;
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
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    white-space: nowrap;
  }

  .player-progress {
    position: relative;
    height: 16px;
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
    width: 12px;
    height: 18px;
    background: var(--card-bg);
    border: 1px solid;
    border-color: var(--card-border-light) var(--card-border-darker)
      var(--card-border-darker) var(--card-border-light);
    transform: translateX(-50%);
  }

  .player-controls {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 6px;
  }

  .ctrl-btn {
    width: 38px;
    height: 28px;
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
    padding: 6px 8px;
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
