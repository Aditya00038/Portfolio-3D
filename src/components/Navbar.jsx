import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import StaggeredMenu from './StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'About Aditya', link: '/about' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/#projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/#contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/Aditya00038'},
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/aditya-suryawanshi-20b60930a/'}
];

export default function Navbar() {
  const [isLightBg, setIsLightBg] = useState(false);

  // Pixel-based scroll listener: Toggles logo and menu colors to black exactly when the light-gray Tools section covers the navbar area (y <= 80px)
  useEffect(() => {
    const handleScroll = () => {
      const toolsSection = document.getElementById('tools');
      if (!toolsSection) return;
      const rect = toolsSection.getBoundingClientRect();
      
      // If the top of the tools section has crossed the navbar (80px) and its bottom is still below the navbar
      if (rect.top <= 80 && rect.bottom >= 80) {
        setIsLightBg(true);
      } else {
        setIsLightBg(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially to set the correct state on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none translate-y-0 opacity-100 transition-all duration-300">
      <div className="relative w-full h-full flex items-center justify-between px-8 md:px-16 lg:px-24 pt-8">
        {/* Left Side: Logo (Changes color dynamically based on background theme) */}
        <motion.div layoutId="navbar-logo" className="pointer-events-auto z-[100] flex items-center">
          <Link 
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="no-underline outline-none"
            aria-label="Aditya Home"
          >
            <h1 
              className={`text-3xl md:text-4xl font-bold transition-colors duration-500 hover:text-[#5227FF] hover:scale-105 cursor-pointer ${isLightBg ? 'text-black' : 'text-white'}`}
              style={{ fontFamily: "'Lobster Two', cursive" }}
            >
              Aditya.
            </h1>
          </Link>
        </motion.div>
 
        {/* Right Side: Contact Button & StaggeredMenu */}
        <div className="absolute top-0 right-0 h-screen w-full pointer-events-none">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor={isLightBg ? "#000000" : "#ffffff"}
            openMenuButtonColor="#000000"
            changeMenuColorOnOpen={true}
            colors={['#333', '#111']}
            logoUrl=""
            accentColor="#5227FF"
          />
        </div>
      </div>
    </div>
  );
}
