import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import StaggeredMenu from './StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/#projects' },
  { label: 'Tools', ariaLabel: 'View tech stack and tools', link: '/#tools' },
  { label: 'Activity', ariaLabel: 'View coding contributions and stats', link: '/#activity' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/#contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/Aditya00038'},
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/aditya-suryawanshi-20b60930a/'}
];

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);

  // Observer 1: Hide Navbar when Projects section is active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHidden(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.05,
      }
    );

    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      observer.observe(projectsSection);
    }

    return () => {
      if (projectsSection) {
        observer.unobserve(projectsSection);
      }
    };
  }, []);

  // Observer 2: Toggle logo and menu colors to black when scrolling over the light-gray Tools section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsLightBg(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '-80px 0px 0px 0px', // Trigger color change as soon as navbar header overlaps it
        threshold: 0.1,
      }
    );

    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      observer.observe(toolsSection);
    }

    return () => {
      if (toolsSection) {
        observer.unobserve(toolsSection);
      }
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-[100] pointer-events-none transition-transform duration-700 ease-in-out ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
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
