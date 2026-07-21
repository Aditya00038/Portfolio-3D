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
  { label: 'GitHub', link: 'https://github.com/Aditya00038' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/aditya-suryawanshi-20b60930a/' }
];

export default function Navbar() {
  const [isLightBg, setIsLightBg] = useState(false);

  // Dynamic background color detection: Toggles logo and menu colors to black when scrolling over white/light backgrounds
  useEffect(() => {
    const checkBackgroundTheme = () => {
      // Find element at the logo's position (x: 50, y: 40)
      const element = document.elementFromPoint(50, 40);
      if (!element) {
        setIsLightBg(false);
        return;
      }

      let current = element;
      let lightBgFound = false;

      // Traverse up to find the background color
      while (current && current !== document.body) {
        const bg = window.getComputedStyle(current).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = parseInt(match[0]);
            const g = parseInt(match[1]);
            const b = parseInt(match[2]);
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            lightBgFound = luminance > 180;
            break;
          }
        }
        current = current.parentElement;
      }

      if (!lightBgFound) {
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)' && bodyBg !== 'transparent') {
          const match = bodyBg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = parseInt(match[0]);
            const g = parseInt(match[1]);
            const b = parseInt(match[2]);
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            lightBgFound = luminance > 180;
          }
        }
      }

      setIsLightBg(lightBgFound);
    };

    window.addEventListener('scroll', checkBackgroundTheme);
    window.addEventListener('resize', checkBackgroundTheme);
    
    // Check initially and periodically when drawers might open/close
    checkBackgroundTheme();
    const interval = setInterval(checkBackgroundTheme, 250);

    return () => {
      window.removeEventListener('scroll', checkBackgroundTheme);
      window.removeEventListener('resize', checkBackgroundTheme);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none translate-y-0 opacity-100 transition-all duration-300 bg-transparent">
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
