import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Languages, Gamepad2, MapPin, User, Code2 } from 'lucide-react';

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
  const [quote, setQuote] = useState({ text: "Make it feel obvious.", author: "Aditya" });

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

  // Fetch daily quote
  useEffect(() => {
    const dailyQuotes = [
      { text: "Build solutions, not excuses.", author: "Daily Reminder" },
      { text: "Think deeply. Build simply.", author: "Daily Reminder" },
      { text: "The best way to learn is to build.", author: "Daily Reminder" },
      { text: "Code with purpose. Build with passion.", author: "Daily Reminder" },
      { text: "Great products solve real problems.", author: "Daily Reminder" },
      { text: "Stay curious. Keep building.", author: "Daily Reminder" },
      { text: "Innovation starts with action.", author: "Daily Reminder" },
      { text: "Make it work. Make it right. Make it fast.", author: "Kent Beck" },
      { text: "Turning ideas into impact.", author: "Daily Reminder" },
      { text: "Small improvements compound over time.", author: "Daily Reminder" }
    ];
    
    // Pick a quote based on the day of the year so it changes exactly once every day
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    setQuote(dailyQuotes[dayOfYear % dailyQuotes.length]);
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
        {/* Local Time */}
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

        {/* Languages (Middle) */}
        <motion.div variants={itemVariants} className="bg-[#161616] rounded-3xl p-5 flex flex-col h-[170px] border border-white/5 relative overflow-hidden group">
          <div className="flex items-center text-zinc-500 gap-2 mb-4 text-sm font-medium">
            <Languages size={16} />
            <span>I speak</span>
          </div>
          <div className="flex flex-col gap-2 mt-auto w-full">
            <div className="flex justify-between items-center w-full">
              <span className="text-zinc-200 font-medium">Marathi</span>
              <span className="text-zinc-600 text-sm">Native</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-zinc-200 font-medium">Hindi</span>
              <span className="text-zinc-600 text-sm">Fluent</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-zinc-200 font-medium">English</span>
              <span className="text-zinc-600 text-sm">Fluent</span>
            </div>
          </div>
        </motion.div>

        {/* Quote of the Day (Top Right) */}
        <motion.div variants={itemVariants} className="bg-[#161616] rounded-3xl p-6 h-[170px] border border-white/5 relative overflow-hidden group flex flex-col justify-between">
          <div className="flex items-center text-zinc-500 gap-2 text-xs font-semibold tracking-wider uppercase">
            Quote of the Day
          </div>
          <div className="flex-1 flex flex-col justify-center mt-2">
            <p className="text-zinc-200 text-sm italic mb-2 line-clamp-3">"{quote.text}"</p>
            <span className="text-emerald-400 text-xs font-medium">— {quote.author}</span>
          </div>
        </motion.div>

        {/* Location (Bottom Left) */}
        <motion.div variants={itemVariants} className="bg-[#161616] rounded-3xl p-5 h-[170px] border border-white/5 relative overflow-hidden group flex flex-col justify-end">
          <div className="absolute inset-0 z-0">
            <img 
              src="/extra_images/place.png" 
              alt="Pune Location" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col">
            <span className="text-lg font-bold text-white tracking-wide">Pune, India</span>
            <span className="text-[13px] text-zinc-400 mt-1 font-medium">{weather.temp}° {weather.description}</span>
          </div>
        </motion.div>

        {/* Now Playing */}
        <motion.div variants={itemVariants} className="md:col-span-2 bg-[#161616] rounded-3xl p-6 h-[170px] border border-white/5 relative overflow-hidden group">
          {/* Background video covering the box */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <iframe 
              src="https://www.youtube.com/embed/xzuHWKdrBzg?autoplay=1&mute=1&loop=1&playlist=xzuHWKdrBzg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-1/2 left-1/2 w-[120%] h-[300%] md:w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none mix-blend-luminosity"
              style={{ border: 0 }}
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-end pointer-events-none">
            <div className="flex items-center text-zinc-300 gap-2 mb-1 text-sm font-medium">
              <Gamepad2 size={16} />
              <span>Now Playing</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Valorant</h3>
            <span className="text-zinc-500 text-sm">PC</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
