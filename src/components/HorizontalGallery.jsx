import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiInstagram } from 'react-icons/fi';

const INITIAL_ITEMS = [
  {
    id: 1,
    type: 'image',
    src: '/Gallery/tech_workspace_lego.png',
    title: 'Technic Audi',
    rotation: -12,
    className: 'w-56 md:w-76 lg:w-84 top-[-6%] left-[-2%] md:left-[0%]',
    dragConstraints: { left: -100, right: 450, top: -100, bottom: 400 },
  },
  {
    id: 2,
    type: 'image',
    src: '/Gallery/me.png',
    title: 'Presentation',
    rotation: -4,
    className: 'w-44 md:w-60 lg:w-64 top-[-10%] left-[22%] md:left-[24%]',
    dragConstraints: { left: -200, right: 350, top: -80, bottom: 450 },
  },
  {
    id: 3,
    type: 'image',
    src: '/Gallery/me2.png',
    title: 'Flight Selfie',
    rotation: 8,
    className: 'w-44 md:w-60 lg:w-64 top-[-8%] right-[20%] md:right-[22%]',
    dragConstraints: { left: -350, right: 200, top: -80, bottom: 450 },
  },
  {
    id: 4,
    type: 'image',
    src: '/Gallery/place2.png',
    title: 'Scooter',
    rotation: -5,
    className: 'w-44 md:w-56 lg:w-60 top-[-6%] right-[-3%] md:right-[-2%]',
    dragConstraints: { left: -450, right: 90, top: -90, bottom: 400 },
  },
  {
    id: 5,
    type: 'spotify',
    title: 'Aria Math',
    artist: 'C418 · Minecraft',
    src: '/Musics/Aria Math from Minecraft.mp3',
    cover: '/Gallery/me.png',
    rotation: -6,
    className: 'w-60 md:w-80 lg:w-84 top-[32%] left-[-4%] md:left-[-2%]',
    dragConstraints: { left: -120, right: 500, top: -200, bottom: 200 },
  },
  {
    id: 6,
    type: 'image',
    src: '/Gallery/travel_view_sunset.png',
    title: 'Lego F1',
    rotation: 10,
    className: 'w-44 md:w-60 lg:w-68 top-[28%] right-[-4%] md:right-[-2%]',
    dragConstraints: { left: -500, right: 120, top: -200, bottom: 200 },
  },
  {
    id: 7,
    type: 'video',
    src: '/Gallery/place4.mp4',
    title: 'Skydiving',
    rotation: -14,
    className: 'w-48 md:w-64 lg:w-72 bottom-[14%] left-[-5%] md:left-[-3%]',
    dragConstraints: { left: -120, right: 450, top: -350, bottom: 100 },
  },
  {
    id: 8,
    type: 'image',
    src: '/Gallery/me3.png',
    title: 'Group Selfie',
    rotation: 6,
    className: 'w-44 md:w-56 lg:w-60 bottom-[-10%] left-[1%] md:left-[2%]',
    dragConstraints: { left: -80, right: 350, top: -450, bottom: 90 },
  },
  {
    id: 9,
    type: 'image',
    src: '/project_thumbnails/parivartan.jpeg',
    title: 'Zoom Call',
    rotation: -4,
    className: 'w-44 md:w-56 lg:w-60 bottom-[-12%] left-[20%] md:left-[22%]',
    dragConstraints: { left: -180, right: 300, top: -450, bottom: 90 },
  },
  {
    id: 10,
    type: 'image',
    src: '/Gallery/place.png',
    title: 'Toy in Hand',
    rotation: 5,
    className: 'w-40 md:w-52 lg:w-56 bottom-[-6%] left-[37%] md:left-[39%]',
    dragConstraints: { left: -250, right: 250, top: -450, bottom: 90 },
  },
  {
    id: 11,
    type: 'image',
    src: '/project_thumbnails/dhansathi_mockup.jpeg',
    title: 'Office Ceiling',
    rotation: -6,
    className: 'w-44 md:w-56 lg:w-60 bottom-[-10%] left-[51%] md:left-[53%]',
    dragConstraints: { left: -300, right: 180, top: -450, bottom: 90 },
  },
  {
    id: 12,
    type: 'image',
    src: '/project_thumbnails/Glyvora.png',
    title: 'Microsoft Wall',
    rotation: 8,
    className: 'w-44 md:w-56 lg:w-60 bottom-[-10%] right-[16%] md:right-[18%]',
    dragConstraints: { left: -350, right: 120, top: -450, bottom: 90 },
  },
  {
    id: 13,
    type: 'image',
    src: '/project_thumbnails/ChemStock.png',
    title: 'Room View',
    rotation: -5,
    className: 'w-44 md:w-56 lg:w-60 bottom-[-12%] right-[-3%] md:right-[-2%]',
    dragConstraints: { left: -450, right: 90, top: -450, bottom: 90 },
  },
  {
    id: 14,
    type: 'spotify',
    title: 'Welcome to Los Santos',
    artist: 'Oh No · GTA V Soundtrack',
    src: '/Musics/GTA V - Welcome to Los Santos Soundtrack.webm',
    cover: '/Gallery/place.png',
    rotation: -7,
    className: 'w-60 md:w-80 lg:w-84 bottom-[18%] right-[4%] md:right-[6%]',
    dragConstraints: { left: -500, right: 120, top: -350, bottom: 100 },
  }
];

export default function HorizontalGallery() {
  const containerRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const [zIndices, setZIndices] = useState(
    INITIAL_ITEMS.reduce((acc, item, idx) => ({ ...acc, [item.id]: idx + 20 }), {})
  );
  const [maxZ, setMaxZ] = useState(INITIAL_ITEMS.length + 30);

  const bringToFront = (id) => {
    const nextZ = maxZ + 1;
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
      className="w-full relative h-[650px] md:h-[750px] lg:h-[820px] bg-black overflow-hidden select-none py-10 px-4 border-t border-zinc-900 cursor-default"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Center Hero Content (pointer-events-none so cards underneath are 100% clickable/draggable) */}
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center justify-center h-full pointer-events-none pb-4">
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
            {/* Pushpin decorative elements near title */}
            <div className="absolute -right-8 bottom-2 hidden md:flex items-center gap-1 opacity-90 pointer-events-none">
              <svg className="w-5 h-5 text-blue-400 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
              </svg>
              <svg className="w-4 h-4 text-blue-500 transform -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
              </svg>
            </div>
          </h2>
        </div>

        {/* Center Drag Instruction Badge */}
        <div className="inline-flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-mono text-[11px] px-3.5 py-1.5 rounded-md shadow-xl mb-4 tracking-wider uppercase backdrop-blur-md pointer-events-none">
          <span>[ Drag object to move ]</span>
        </div>

        {/* Subtitle */}
        <p className="text-zinc-400 text-xs md:text-sm max-w-md leading-relaxed mb-6 pointer-events-none">
          My digital sketchbook. A space for unfinished thoughts and late-night experiments.
        </p>

        {/* CTA Button */}
        <a
          href="https://instagram.com/aditya.suryawanshi038"
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
          dragConstraints={item.dragConstraints}
          dragElastic={0.05}
          dragMomentum={true}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
          onDragStart={() => bringToFront(item.id)}
          onPointerDown={() => bringToFront(item.id)}
          onMouseDown={() => bringToFront(item.id)}
          onTouchStart={() => bringToFront(item.id)}
          initial={{ rotate: item.rotation, scale: 0.9, opacity: 0 }}
          animate={{ rotate: item.rotation, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileDrag={{ scale: 1.07, rotate: 0, zIndex: 999 }}
          whileHover={{ scale: 1.03 }}
          className={`absolute cursor-grab active:cursor-grabbing ${item.className} will-change-transform transform-gpu`}
          style={{ zIndex: zIndices[item.id] || 20 }}
        >
          {item.type === 'image' && (
            <div className="relative bg-zinc-950 p-2.5 md:p-3 rounded-2xl md:rounded-[2rem] border border-zinc-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-md group">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover rounded-xl md:rounded-[1.5rem] select-none pointer-events-none"
                draggable={false}
              />
            </div>
          )}

          {item.type === 'video' && (
            <div className="relative bg-zinc-950 p-2.5 md:p-3 rounded-2xl md:rounded-[2rem] border border-zinc-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-md">
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-xl md:rounded-[1.5rem] select-none pointer-events-none"
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
