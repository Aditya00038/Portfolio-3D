import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';
import { subscribeToLikes, incrementLikes } from '../firebase';

export default function Footer() {
  const [showContact, setShowContact] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Pune, India Live Ticking Clock Standard Hook
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setShowContact(false);
  };

  // Toggle contact drawer and visually redirect the user by smooth scrolling directly to the form
  const toggleContact = () => {
    const willShow = !showContact;
    setShowContact(willShow);

    if (willShow) {
      setTimeout(() => {
        const element = document.getElementById('contact-form-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120); // slight delay to let Framer Motion mount the drawer
    }
  };

  // Mechanical switch clicking sound feedback for Like button
  const playLikeClickSound = () => {
    try {
      const clickCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = clickCtx.createOscillator();
      const gain = clickCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, clickCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, clickCtx.currentTime + 0.015);
      
      gain.gain.setValueAtTime(0.1, clickCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, clickCtx.currentTime + 0.015);
      
      osc.connect(gain);
      gain.connect(clickCtx.destination);
      osc.start();
      osc.stop(clickCtx.currentTime + 0.02);
    } catch (e) { }
  };

  // Like Button component linked to real-time Firebase counts
  const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(38);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      // Load user's past liked state from localStorage
      const hasLiked = localStorage.getItem('aditya_portfolio_has_liked') === 'true';
      setLiked(hasLiked);

      // Subscribe to live database count (falls back to local storage automatically if Firebase is unconfigured)
      const unsubscribe = subscribeToLikes((count) => {
        setLikesCount(count);
      });

      return () => unsubscribe();
    }, []);

    const handleToggle = () => {
      playLikeClickSound();
      
      const nextLiked = !liked;
      setLiked(nextLiked);
      localStorage.setItem('aditya_portfolio_has_liked', nextLiked ? 'true' : 'false');
      
      // Trigger animation on liking
      if (nextLiked) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 250);
      }
      
      // Update global count in database
      incrementLikes(nextLiked);
    };

    // Calculate display sliding values dynamically
    const valOne = liked ? likesCount - 1 : likesCount;
    const valTwo = liked ? likesCount : likesCount + 1;

    return (
      <LikeWrapper>
        <div className={`like-button ${liked ? 'liked' : ''} ${isAnimating ? 'animating' : ''}`} onClick={handleToggle}>
          <label className="like">
            <svg className="like-icon" fillRule="nonzero" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            <span className="like-text">Likes</span>
          </label>
          <span className="like-count one">{valOne}</span>
          <span className="like-count two">{valTwo}</span>
        </div>
      </LikeWrapper>
    );
  };

  return (
    <footer className="w-full bg-black px-4 md:px-8 pt-16 md:pt-24 font-['Inter',sans-serif] relative z-30">
      {/* Import premium signature typography suite dynamically */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Alex+Brush&family=Herr+Von+Muellerhoff&family=Sacramento&display=swap');
      `}} />

      <div className="max-w-7xl mx-auto flex flex-col gap-4">

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">

          {/* Left Card */}
          <div className="bg-[#111111] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
            <div>
              <p className="text-xs text-zinc-500 tracking-widest font-bold uppercase mb-8">Footer</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Made it this far?</h2>
              <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-xl leading-relaxed">
                If you're interested in collaborating on projects, open source, or networking, let's get in touch.
              </p>
            </div>

            {/* Aditya Suryawanshi Cursive Signature styled exactly like reference image */}
            <div className="mt-12 mb-6 select-none">
              <div
                className="text-[#f43f5e] text-4xl md:text-[4.8rem] lg:text-[5.2rem] w-fit flex flex-col items-center transform -rotate-3 origin-left tracking-normal leading-[0.75] font-normal"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  textShadow: "0 0 35px rgba(244,63,94,0.35)"
                }}
              >
                <span className="block relative z-10">Aditya</span>
                <span className="block -mt-3 md:-mt-5 relative z-0">Suryawanshi</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 min-h-[400px]">

            {/* Call to Action Card (Toggles Contact Drawer and scrolls to it) */}
            <div
              onClick={toggleContact}
              className="group flex-1 bg-[#3ba2f6] hover:bg-[#2a8add] transition-colors rounded-[2rem] p-8 md:p-12 flex flex-col justify-between cursor-pointer select-none"
            >
              <p className="text-xs text-black/80 tracking-widest font-bold uppercase">Call to Action</p>
              <div className="flex items-center justify-between mt-12">
                <h3 className="text-4xl md:text-5xl font-semibold text-black">
                  {showContact ? 'Close contact' : 'Get in touch'}
                </h3>
                <FiArrowRight className={`w-8 h-8 text-black transform transition-all duration-300 ${showContact ? 'rotate-90' : 'group-hover:translate-x-2'}`} />
              </div>
            </div>

            {/* Social Card (Houses LikeButton) */}
            <div className="bg-[#18181b] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between">
              <p className="text-xs text-zinc-500 tracking-widest font-bold uppercase mb-8">Social</p>
              <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-6 text-zinc-400">
                  <a href="https://github.com/Aditya00038" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub className="w-6 h-6" /></a>
                  <a href="https://linkedin.com/in/aditya00038" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedinIn className="w-6 h-6" /></a>
                  <a href="https://instagram.com/aditya._.suryawanshi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaInstagram className="w-6 h-6" /></a>
                  <a href="mailto:adityasuryawanshi038@gmail.com" className="hover:text-white transition-colors"><FiMail className="w-6 h-6" /></a>
                </div>
                
                {/* Like Button component rendering here */}
                <LikeButton />
              </div>
            </div>

          </div>
        </div>

        {/* Expandable Contact Drawer - Center stage styled perfectly to match reference */}
        <AnimatePresence initial={false}>
          {showContact && (
            <motion.div
              id="contact-form-section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden w-full bg-[#0a0a0c] rounded-[2rem] border border-white/5 mt-4 p-8 md:p-12 relative"
            >
              <div className="w-full max-w-6xl mx-auto flex flex-col pt-4">

                {/* Heading */}
                <h2 className="text-2xl md:text-4xl lg:text-[2.6rem] font-bold text-white mb-16 tracking-tight leading-tight select-none">
                  Open for freelance projects & full-time roles
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16">

                  {/* Left Column: Contact Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#161618] border border-zinc-800/80 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="awesome-brand@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#161618] border border-zinc-800/80 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Message</label>
                      <textarea
                        rows="5"
                        name="message"
                        placeholder="Please write your project brief"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-[#161618] border border-zinc-800/80 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold py-4 rounded-xl transition-all tracking-wider text-xs uppercase cursor-pointer"
                    >
                      Submit
                    </button>

                  </form>

                  {/* Right Column: Dynamic Social Rows */}
                  <div className="flex flex-col justify-center gap-6">

                    {/* LinkedIn */}
                    <a href="https://linkedin.com/in/aditya00038" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                        <FaLinkedinIn className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">LinkedIn</p>
                        <p className="text-xs text-zinc-500 mt-0.5">@ADITYASURYAWANSHI</p>
                      </div>
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/Aditya00038" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                        <FaGithub className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">GitHub</p>
                        <p className="text-xs text-zinc-500 mt-0.5">@ADITYA00038</p>
                      </div>
                    </a>

                    {/* Gmail */}
                    <a href="mailto:adityasuryawanshi038@gmail.com" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                        <FiMail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Gmail</p>
                        <p className="text-xs text-zinc-500 mt-0.5">adityasuryawanshi038@gmail.com</p>
                      </div>
                    </a>

                    {/* Instagram */}
                    <a href="https://instagram.com/aditya._.suryawanshi" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                        <FaInstagram className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Instagram</p>
                        <p className="text-xs text-zinc-500 mt-0.5">@ADITYA._.SURYAWANSHI</p>
                      </div>
                    </a>

                  </div>

                </div>

                {/* Center stage Digital Clock */}
                <div className="flex flex-col items-center mt-8 pt-10 border-t border-zinc-900/60 select-none">
                  <span className="text-[10px] font-bold tracking-[0.35em] text-[#00f2fe] uppercase">
                    LOCAL TIME
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mt-2">
                    [ PUNE, INDIA ]
                  </span>
                  <h3
                    className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-white tracking-widest leading-none mt-6 select-none"
                    style={{ textShadow: "0 0 30px rgba(0,242,254,0.15)" }}
                  >
                    {localTime}
                  </h3>
                </div>

                {/* Subtitle Rate Tag */}
                <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 select-none text-center mt-12">
                  The services start from ₹2000 onwards
                </p>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Version of the Sites (Timeline) */}
        <div className="mt-24 w-full">
          <p className="text-xs text-white tracking-widest font-bold uppercase mb-8">Version of the sites</p>

          {/* Ruler Line */}
          <div className="w-full flex flex-col">
            <div
              className="w-full h-3 border-b border-zinc-800"
              style={{ background: 'repeating-linear-gradient(to right, #3f3f46 0, #3f3f46 1px, transparent 1px, transparent 16px)' }}
            ></div>

            {/* Years */}
            <div className="flex mt-6 justify-between w-full text-zinc-500 font-mono text-sm">
              <div className="px-4 py-1.5 border border-zinc-500 rounded-lg text-white font-semibold cursor-default">
                2026
              </div>
              <a href="https://aditya-portfolio-6sybe6fpt-adityas-projects-9c9aa8cb.vercel.app/" target="_blank" rel="noreferrer" className="px-4 py-1.5 hover:text-zinc-300 transition-colors cursor-pointer block">
                2025
              </a>
              <a href="https://2024-portfolio-beige.vercel.app/" target="_blank" rel="noreferrer" className="px-4 py-1.5 hover:text-zinc-300 transition-colors cursor-pointer block">
                2024
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

const LikeWrapper = styled.div`
  #heart {
    display: none;
  }

  .like-button {
    position: relative;
    cursor: pointer;
    display: flex;
    height: 48px;
    width: 136px;
    border-radius: 16px;
    border: none;
    background-color: #1d1d1d;
    overflow: hidden;
    box-shadow:
      inset -2px -2px 5px rgba(255, 255, 255, 0.2),
      inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      4px 4px 10px rgba(0, 0, 0, 0.4),
      -2px -2px 8px rgba(255, 255, 255, 0.1);
    user-select: none;
  }

  .like {
    width: 70%;
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: space-evenly;
  }

  .like-icon {
    fill: #505050;
    height: 28px;
    width: 28px;
  }

  .like-text {
    color: #fcfcfc;
    font-size: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .like-count {
    position: absolute;
    right: 0;
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #717070;
    font-size: 16px;
    border-left: 2px solid #4e4e4e;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease;
  }

  .like-count.one {
    transform: translateY(0);
  }

  .like-count.two {
    transform: translateY(48px);
  }

  .liked .like-icon {
    fill: #fc4e4e;
    transition: fill 0.2s ease-out;
  }

  .animating .like-icon {
    animation: enlarge 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
  }

  .liked .like-count.two {
    transform: translateY(0);
    color: #fcfcfc;
  }

  .liked .like-count.one {
    transform: translateY(-48px);
  }

  @keyframes enlarge {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1.2);
    }
  }
`;
