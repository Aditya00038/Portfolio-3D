import React from 'react';
import StaggeredMenu from './StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '#projects' },
  { label: 'Tools', ariaLabel: 'View tech stack and tools', link: '#tools' },
  { label: 'Activity', ariaLabel: 'View coding contributions and stats', link: '#activity' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="relative w-full h-full flex items-center justify-between px-8 md:px-16 lg:px-24 pt-8">
        {/* Left Side: Logo */}
        <div className="pointer-events-auto z-[100] flex items-center mix-blend-difference">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="no-underline outline-none"
            aria-label="Aditya Home"
          >
            <h1 
              className="text-3xl md:text-4xl font-bold text-white transition-all duration-300 hover:text-[#5227FF] hover:scale-105 cursor-pointer"
              style={{ fontFamily: "'Lobster Two', cursive" }}
            >
              Aditya.
            </h1>
          </a>
        </div>

        {/* Right Side: Contact Button & StaggeredMenu */}
        <div className="absolute top-0 right-0 h-screen w-full pointer-events-none">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#000"
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
