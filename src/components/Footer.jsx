import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

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

            {/* Social Card */}
            <div className="bg-[#18181b] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between">
              <p className="text-xs text-zinc-500 tracking-widest font-bold uppercase mb-8">Social</p>
              <div className="flex items-center gap-6 text-zinc-400">
                <a href="https://github.com/Aditya00038" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub className="w-6 h-6" /></a>
                <a href="https://linkedin.com/in/aditya00038" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedinIn className="w-6 h-6" /></a>
                <a href="https://instagram.com/aditya._.suryawanshi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaInstagram className="w-6 h-6" /></a>
                <a href="mailto:adityasuryawanshi038@gmail.com" className="hover:text-white transition-colors"><FiMail className="w-6 h-6" /></a>
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

                  {/* Left Column: Contact Form (Without Budget dropdown field) */}
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

                {/* Center stage Digital Clock (Pune, India) */}
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
