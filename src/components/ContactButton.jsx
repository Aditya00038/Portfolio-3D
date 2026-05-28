import React from 'react';
import './ContactButton.css';

export default function ContactButton() {
  return (
    <button 
      className="shiny-cta" 
      onClick={() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <span>Contact Me</span>
    </button>
  );
}
