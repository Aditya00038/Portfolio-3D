import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiInstagram } from 'react-icons/fi';

const INITIAL_ITEMS = [
  {
    id: 1,
    type: 'image',
    src: '/Gallery/me6.jpeg',
    title: 'Aditya Portrait',
    rotation: -6,
    className: 'w-44 md:w-56 lg:w-64 top-2 left-2 md:top-4 md:left-4',
    imgStyle: { aspectRatio: '1 / 1.58', objectPosition: 'top' },
  },
  {
    id: 2,
    type: 'image',
    src: '/Gallery/me.png',
    title: 'Aditya Suryawanshi',
    rotation: -7,
    className: 'w-44 md:w-56 lg:w-64 top-[52%] left-2 md:top-[54%] md:left-4',
  },
  {
    id: 3,
    type: 'image',
    src: '/Gallery/me4.png',
    title: 'Aditya Shot',
    rotation: 5,
    className: 'w-44 md:w-56 lg:w-64 top-2 left-[24%] md:top-4 md:left-[25%]',
  },
  {
    id: 4,
    type: 'image',
    src: '/Gallery/me5.png',
    title: 'Aditya Shot 2',
    rotation: -6,
    className: 'w-44 md:w-56 lg:w-64 top-2 right-[24%] md:top-4 md:right-[25%]',
  },
  {
    id: 5,
    type: 'image',
    src: '/Gallery/me2.png',
    title: 'Flight Selfie',
    rotation: 8,
    className: 'w-44 md:w-56 lg:w-64 top-2 right-2 md:top-4 md:right-4',
  },
  {
    id: 6,
    type: 'image',
    src: '/Gallery/me3.png',
    title: 'Group Selfie',
    rotation: 6,
    className: 'w-44 md:w-56 lg:w-64 top-[52%] right-2 md:top-[54%] md:right-4',
  },
  {
    id: 7,
    type: 'image',
    src: '/Gallery/place.png',
    title: 'Toy in Hand',
    rotation: -4,
    className: 'w-36 md:w-48 lg:w-54 bottom-2 left-[18%] md:bottom-3 md:left-[22%]',
  },
  {
    id: 8,
    type: 'video',
    src: '/Gallery/place4.mp4',
    title: 'Skydiving Video',
    rotation: 2,
    className: 'w-44 md:w-60 lg:w-68 bottom-2 left-1/2 -translate-x-1/2 md:bottom-3',
  },
  {
    id: 9,
    type: 'image',
    src: '/Gallery/place2.png',
    title: 'Scooter Ride',
    rotation: 5,
    className: 'w-36 md:w-48 lg:w-54 bottom-2 right-[18%] md:bottom-3 md:right-[22%]',
  },
];

export default function HorizontalGallery() {
  const containerRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const [zIndices, setZIndices] = useState(
    INITIAL_ITEMS.reduce((acc, item, idx) => ({ ...acc, [item.id]: idx + 5 }), {})
  );
  const [maxZ, setMaxZ] = useState(INITIAL_ITEMS.length + 10);

  const bringToFront = (id) => {
    const nextZ = Math.min(40, maxZ + 1);
    setMaxZ(nextZ);
    setZIndices((prev) => ({ ...prev, [id]: nextZ }));
  };

  const toggleAudio = (id, audioSrc) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(audioSrc);
      newAudio.play().catch(() => {});
      audioRef.current = newAudio;
      setPlayingId(id);
      newAudio.onended = () => setPlayingId(null);
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full relative h-[680px] md:h-[780px] lg:h-[860px] bg-black overflow-hidden select-none py-10 px-4 border-t border-b border-zinc-800/80 cursor-default"
    >
      {/* Ambient Blue Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(56,189,248,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Center Hero Content (pointer-events-none so cards underneath are 100% clickable/draggable) */}
      <div className="relative z-50 max-w-xl mx-auto flex flex-col items-center text-center justify-center h-full pointer-events-none pb-4">
        {/* Cursive overlay + Big Title */}
        <div className="relative mb-3">
          <span
            className="text-4xl md:text-6xl text-zinc-300 absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
            style={{ fontFamily: "'Lobster Two', cursive" }}
          >
            Connect on
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-sans text-white tracking-tight pt-3 relative pointer-events-none">
            Instagram<span className="text-blue-500">.</span>
          </h2>
        </div>

        {/* Center Drag Instruction Badge */}
        <div className="inline-flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-mono text-[11px] px-3.5 py-1.5 rounded-md shadow-xl mb-4 tracking-wider uppercase backdrop-blur-md pointer-events-none">
          <span>[ Drag object to move ]</span>
        </div>

        {/* CTA Button */}
        <a
          href="https://www.instagram.com/_aditya_038/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-bold text-xs md:text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-2xl hover:scale-105 no-underline cursor-pointer pointer-events-auto"
        >
          <FiInstagram size={18} />
          <span>Follow me</span>
        </a>
      </div>

      {/* Scattered Large Draggable Canvas Elements */}
      {INITIAL_ITEMS.map((item) => (
        <motion.div
          key={item.id}
          drag
          dragConstraints={containerRef}
          dragElastic={0.12}
          dragMomentum={true}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
          onDragStart={() => bringToFront(item.id)}
          onPointerDown={() => bringToFront(item.id)}
          onMouseDown={() => bringToFront(item.id)}
          onTouchStart={() => bringToFront(item.id)}
          initial={{ rotate: item.rotation, scale: 0.9, opacity: 0 }}
          animate={{ rotate: item.rotation, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileDrag={{ scale: 1.08, rotate: 0, zIndex: 45, filter: 'brightness(1.06)' }}
          whileHover={{ scale: 1.04, y: -4 }}
          className={`absolute cursor-grab active:cursor-grabbing ${item.className} will-change-transform transform-gpu`}
          style={{ zIndex: zIndices[item.id] || 5 }}
        >
          {item.type === 'image' && (
            <div className="relative rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/5 transition-colors duration-300 hover:border-white/20 overflow-hidden group">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover rounded-2xl md:rounded-3xl select-none pointer-events-none"
                style={item.imgStyle || {}}
                draggable={false}
              />
            </div>
          )}

          {item.type === 'video' && (
            <div className="relative rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-2xl md:rounded-3xl select-none pointer-events-none"
              />
            </div>
          )}

          {item.type === 'spotify' && (
            <div className="relative bg-zinc-900/90 border border-zinc-800 p-3 md:p-4 rounded-2xl md:rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex items-center gap-3.5 text-left pointer-events-auto">
              {/* Spotify Icon Badge */}
              <div className="absolute top-2.5 right-3 text-emerald-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.358-.685.474-1.043.256-2.86-1.748-6.462-2.143-10.704-1.173-.404.093-.809-.161-.902-.564-.093-.403.161-.808.564-.902 4.646-1.062 8.627-.615 11.83 1.341.357.218.473.685.255 1.042zm1.478-3.29c-.275.447-.859.593-1.306.317-3.273-2.012-8.263-2.597-12.135-1.421-.502.152-1.031-.133-1.183-.635-.152-.502.133-1.031.635-1.183 4.423-1.343 9.914-.696 13.672 1.619.447.275.592.86.317 1.303zm.142-3.418C15.228 8.487 8.853 8.274 5.155 9.397c-.604.183-1.243-.166-1.427-.77-.183-.604.166-1.243.77-1.427 4.251-1.29 11.282-1.04 15.54 1.491.545.324.726 1.03.402 1.575-.325.544-1.03.725-1.575.402z" />
                </svg>
              </div>

              {/* Album Art Thumb */}
              <img
                src={item.cover}
                alt={item.title}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl object-cover select-none flex-shrink-0"
                draggable={false}
              />

              {/* Track Info */}
              <div className="flex-1 min-w-0 pr-6">
                <p className="text-white text-xs md:text-sm font-bold truncate mb-0.5">
                  {item.title}
                </p>
                <p className="text-zinc-400 text-[11px] truncate">
                  {item.artist}
                </p>
              </div>

              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAudio(item.id, item.src);
                }}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-md flex-shrink-0 cursor-pointer pointer-events-auto"
                aria-label={playingId === item.id ? 'Pause track' : 'Play track'}
              >
                {playingId === item.id ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
}
