import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollyCanvas from '../components/ScrollyCanvas';
import PixelTransition from '../components/ui/pixel-transition';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Contributions from '../components/Contributions';
import Footer from '../components/Footer';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <main>
      <ScrollyCanvas />
      
      {/* Top Pixel Dissolve: Black into White */}
      <PixelTransition fromColor="#000" toColor="#fff" />
      
      {/* Modern Cinematic Projects section */}
      <Projects />

      {/* Bottom Pixel Dissolve: White into Black */}
      <PixelTransition fromColor="#fff" toColor="#000" />

      {/* Cinematic Tech Stack & Tools section */}
      <TechStack />

      {/* Dynamic Coding Footprint (GitHub & DSA analytics) */}
      <Contributions />

      {/* Cinematic Footer */}
      <Footer />
    </main>
  );
}
