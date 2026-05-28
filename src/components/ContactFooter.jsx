import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactFooter() {
  const [showContact, setShowContact] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="w-full font-['Inter',sans-serif]">
      
      <AnimatePresence>
        {showContact && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden bg-white text-black"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          >
            <div className="w-full max-w-6xl mx-auto px-8 py-24 flex flex-col md:flex-row gap-16">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col justify-center gap-10">
                <div>
                  <span className="inline-block bg-[#fce588] px-2 py-0.5 text-xl font-medium mb-3">
                    Email
                  </span>
                  <p className="text-zinc-800 text-lg font-medium">adityasuryawanshi038@gmail.com</p>
                </div>

                <div>
                  <span className="inline-block bg-[#fce588] px-2 py-0.5 text-xl font-medium mb-4">
                    Socials
                  </span>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-800 text-lg font-medium hover:underline">
                        Aditya.
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-800 text-lg font-medium hover:underline">
                        Aditya.
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Form) */}
              <div className="flex-1 flex flex-col">
                <span className="inline-block self-start bg-[#fce588] px-2 py-0.5 text-xl font-medium mb-8">
                  Contact Form
                </span>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-md">
                  
                  <div className="flex items-center gap-4 border-b border-zinc-400 pb-2">
                    <span className="bg-[#96d9ff] px-1 py-0.5 text-sm font-semibold whitespace-nowrap">Name</span>
                    <input 
                      type="text" 
                      placeholder="Mr.Modi"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent outline-none text-zinc-600 placeholder:text-zinc-400 font-medium"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4 border-b border-zinc-400 pb-2">
                    <span className="bg-[#96d9ff] px-1 py-0.5 text-sm font-semibold whitespace-nowrap">Email</span>
                    <input 
                      type="email" 
                      placeholder="abc@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent outline-none text-zinc-600 placeholder:text-zinc-400 font-medium"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4 border-b border-zinc-400 pb-2">
                    <span className="bg-[#96d9ff] px-1 py-0.5 text-sm font-semibold whitespace-nowrap">Your Message</span>
                    <input 
                      type="text" 
                      placeholder="Hi, Aditya"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent outline-none text-zinc-600 placeholder:text-zinc-400 font-medium"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="mt-4 bg-black text-white rounded-full py-3 px-8 font-semibold text-lg hover:bg-zinc-800 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Massive Black Footer */}
      <footer className="w-full bg-black rounded-t-3xl text-white pt-12 pb-8 px-8 md:px-16 flex flex-col justify-between min-h-[60vh]">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-end items-start md:items-center w-full max-w-7xl mx-auto gap-6">
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors" aria-label="Instagram">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors" aria-label="LinkedIn">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto my-20 px-4">
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-medium leading-tight mb-8" data-cursor="large">
            Code, creativity, and curiosity — that’s the journey.
          </h2>
          <p className="text-zinc-300 text-base md:text-lg mb-10">
            Let’s connect, create, and build something meaningful together.
          </p>
          <button 
            onClick={() => setShowContact(!showContact)}
            className="bg-white text-black px-10 py-3 rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors"
          >
            {showContact ? 'Close Contact' : 'Contact'}
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto border-t border-zinc-800 pt-8 mt-auto gap-4">
          <a href="mailto:adityasuryawanshi038@gmail.com" className="font-medium text-lg hover:text-zinc-300 transition-colors">
            adityasuryawanshi038@gmail.com
          </a>
          
          <div className="flex items-center gap-4">
            <div className="h-6 w-px bg-zinc-600 hidden md:block"></div>
            <span className="relative font-medium text-lg px-3 py-1 rounded cursor-default overflow-hidden group">
              <span className="absolute inset-0 bg-white origin-left transform scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></span>
              <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                Made with code, caffeine, and curiosity.
              </span>
            </span>
          </div>
        </div>

      </footer>
    </section>
  );
}
