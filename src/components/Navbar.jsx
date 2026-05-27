import React from 'react';
import StaggeredMenu from './StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="relative w-full h-full flex items-center justify-between px-8 md:px-16 lg:px-24 pt-8">
        {/* Left Side: Logo */}
        <div className="pointer-events-auto z-50 flex items-center">
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

        {/* Right Side: StaggeredMenu */}
        {/* We use an absolute container overlaid on the right so the StaggeredMenu is positioned correctly */}
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
