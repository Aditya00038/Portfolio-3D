import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Languages, Gamepad2 } from 'lucide-react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiPython, SiMysql, SiMongodb } from 'react-icons/si';

const TypewriterText = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(timeout);
  }, []);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 15 : 40, Math.random() * 30 + (reverse ? 10 : 20)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity font-light text-zinc-500`}>|</span>
    </span>
  );
};

export default function BentoGrid() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 26, description: "Light rain shower" });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather for Pune
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current_weather=true');
        const data = await res.json();
        if (data && data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          const code = data.current_weather.weathercode;
          let desc = "Clear";
          if (code === 1 || code === 2 || code === 3) desc = "Partly cloudy";
          else if (code >= 45 && code <= 48) desc = "Foggy";
          else if (code >= 51 && code <= 67) desc = "Rain shower";
          else if (code >= 71 && code <= 77) desc = "Snow";
          else if (code >= 95) desc = "Thunderstorm";
          setWeather({ temp, description: desc });
        }
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };
    fetchWeather();
  }, []);

  // Format time for Pune (UTC+5:30)
  const timeString = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const bentoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full max-w-[950px] mx-auto mt-32 mb-24 font-sans z-20 relative px-6 md:px-0">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white min-h-[96px] md:min-h-[60px]"
        style={{ letterSpacing: "-0.04em" }}
      >
        <TypewriterText words={[
          "Make it feel obvious.",
          "Build it with purpose.",
          "Turning ideas into products.",
          "Creating experiences that matter.",
          "Engineering for impact."
        ]} />
      </motion.h2>

      <motion.div 
        variants={bentoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Col 1, Row 1: Local Time */}
        <motion.div variants={itemVariants} className="bg-[#161616] rounded-3xl p-5 flex flex-col justify-between h-[170px] border border-white/5 relative overflow-hidden group">
          <div className="flex items-center text-zinc-500 gap-2 mb-4 text-sm font-medium">
            <Clock size={16} />
            <span>Local Time</span>
          </div>
          <div className="mt-auto">
            <div className="text-[3.5rem] leading-none font-bold text-white tracking-tight tabular-nums mb-1">
              {timeString}
            </div>
            <div className="text-zinc-500 text-sm">
              Pune, UTC+5:30
            </div>
          </div>
        </motion.div>

        {/* Col 2-3, Row 1 & 2: Now Playing Call of Duty (Gaming on Right, row-span-2) */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2 bg-[#161616] rounded-3xl p-6 h-[356px] border border-white/5 relative overflow-hidden group">
          {/* Background video covering the box */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <video 
              src="/videos/cod-portfolio.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-end pointer-events-none">
            <div className="flex items-center text-zinc-300 gap-2 mb-1 text-sm font-medium">
              <Gamepad2 size={16} />
              <span>Last Played 1 year ago</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Call of Duty: Modern Warfare 2</h3>
          </div>
        </motion.div>

        {/* Col 1, Row 2: Languages (Positioned below Local Time) */}
        <motion.div 
          variants={itemVariants} 
          className="bg-[#161616] rounded-3xl p-5 flex flex-col h-[170px] border border-white/5 relative overflow-hidden group select-none"
        >
          <div className="flex items-center text-zinc-400 gap-2 mb-4 text-sm font-bold">
            <Languages size={16} className="text-zinc-400" />
            <span>Languages</span>
          </div>
          
          {/* Scattered Interactive Pills exactly matching the user's design style */}
          <div className="relative w-full h-full">
            <motion.div 
              initial={{ rotate: -6 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute bg-white text-zinc-950 border border-zinc-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
              style={{ top: '2%', left: '4%' }}
            >
              Marathi
            </motion.div>
            
            <motion.div 
              initial={{ rotate: 5 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute bg-white text-zinc-950 border border-zinc-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
              style={{ top: '0%', right: '4%' }}
            >
              English
            </motion.div>
            
            <motion.div 
              initial={{ rotate: -3 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute bg-white text-zinc-950 border border-zinc-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer"
              style={{ top: '28%', left: '34%' }}
            >
              Hindi
            </motion.div>
            
            <motion.div 
              initial={{ rotate: 4 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute bg-white text-zinc-500 border border-zinc-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase cursor-pointer"
              style={{ bottom: '10%', left: '6%' }}
            >
              Native
            </motion.div>
            
            <motion.div 
              initial={{ rotate: -5 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute bg-white text-zinc-500 border border-zinc-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase cursor-pointer"
              style={{ bottom: '12%', right: '6%' }}
            >
              Fluent
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}


