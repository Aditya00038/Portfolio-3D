import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';

/* ─── constants ─── */
const EMAIL = 'adityasuryawanshi038@gmail.com';
const RESUME_URL = '/Aditya Resume.pdf';

const SOCIALS = [
  { icon: FaLinkedinIn,  href: 'https://linkedin.com/in/aditya00038',            label: 'LinkedIn',  color: '#0A66C2' },
  { icon: FaTwitter,     href: 'https://twitter.com/',                            label: 'Twitter',   color: '#1D9BF0' },
  { icon: FaGithub,      href: 'https://github.com/Aditya00038',                  label: 'GitHub',    color: '#e4e4e7' },
  { icon: FaInstagram,   href: 'https://instagram.com/aditya._.suryawanshi',      label: 'Instagram', color: '#E1306C' },
];

/* ─── Copy Email Button ─── */
function CopyEmailBtn() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '13px 28px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'transparent',
        color: '#e4e4e7',
        fontSize: '0.95rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
        fontFamily: 'inherit',
        letterSpacing: '0.01em',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
    >
      {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
      {copied ? 'Copied!' : 'Copy Email'}
    </button>
  );
}

/* ─── Version of Sites ─── */
function VersionOfSites() {
  return (
    <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem) clamp(2.5rem, 5vw, 4rem)' }}>
      <p style={{
        fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.18em',
        color: '#3f3f46', textTransform: 'uppercase', margin: '0 0 1rem',
      }}>
        Version of the sites
      </p>
      {/* Tick ruler */}
      <div style={{
        width: '100%', height: '10px',
        borderBottom: '1px solid #27272a',
        background: 'repeating-linear-gradient(to right, #3f3f46 0, #3f3f46 1px, transparent 1px, transparent 16px)',
        marginBottom: '0.9rem',
      }} />
      {/* Year chips */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{
          padding: '5px 14px', border: '1px solid #52525b', borderRadius: '6px',
          color: '#fff', fontWeight: 600, fontSize: '0.82rem', fontFamily: 'monospace',
        }}>2026</span>
        <a href="https://aditya-portfolio-6sybe6fpt-adityas-projects-9c9aa8cb.vercel.app/"
          target="_blank" rel="noreferrer"
          style={{ padding: '5px 14px', color: '#52525b', fontWeight: 500, fontSize: '0.82rem', fontFamily: 'monospace', textDecoration: 'none', transition: 'color 0.18s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#a1a1aa'}
          onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
        >2025</a>
        <a href="https://2024-portfolio-beige.vercel.app/"
          target="_blank" rel="noreferrer"
          style={{ padding: '5px 14px', color: '#52525b', fontWeight: 500, fontSize: '0.82rem', fontFamily: 'monospace', textDecoration: 'none', transition: 'color 0.18s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#a1a1aa'}
          onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
        >2024</a>
      </div>
    </div>
  );
}

/* ─── Main Footer ─── */
export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(to bottom, transparent, #0a0a0a 80px)',
      color: '#fff',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      position: 'relative',
      zIndex: 30,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>

      {/* ── TOP HERO SECTION ── */}
      <div style={{
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        {/* Left: Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ flex: '1 1 320px' }}
        >
          <h2 style={{
            margin: '0 0 0.35rem',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#a8a8a8',
          }}>
            Have an{' '}
            <span style={{ color: '#f4f4f5' }}>idea in mind?</span>
          </h2>
          <h2 style={{
            margin: '0 0 1rem',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#d4a85a',
          }}>
            Let&apos;s Talk!
          </h2>
          <p style={{
            margin: 0,
            fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
            color: '#52525b',
            letterSpacing: '0.01em',
          }}>
            &amp; create something meaningful together
          </p>
        </motion.div>

        {/* Right: Buttons stacked */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '170px', width: '200px' }}
        >
          {/* View Resume — filled blue */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '13px 28px',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
              letterSpacing: '0.01em',
              textAlign: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
          >
            View Resume
          </a>

          {/* Copy Email — outlined */}
          <CopyEmailBtn />
        </motion.div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 clamp(1.5rem, 5vw, 5rem)' }} />

      {/* ── SOCIAL ICONS + COPYRIGHT ── */}
      <div style={{
        padding: 'clamp(1.8rem, 3.5vw, 2.5rem) clamp(1.5rem, 5vw, 5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#18181b',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#71717a',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#71717a';
                  e.currentTarget.style.background = '#18181b';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <span style={{ fontSize: '0.8rem', color: '#3f3f46', letterSpacing: '0.01em' }}>
            ©{new Date().getFullYear()}, Aditya Suryawanshi
          </span>
        </motion.div>
      </div>

      {/* ── VERSION OF SITES ── */}
      <VersionOfSites />
    </footer>
  );
}
