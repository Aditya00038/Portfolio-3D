import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';

/* ─── constants ─── */
const EMAIL = 'adityasuryawanshi038@gmail.com';
const RESUME_URL = '/Aditya-Resume.pdf';

const SOCIALS = [
  { icon: FaLinkedinIn,  href: 'https://www.linkedin.com/in/aditya-suryawanshi-20b60930a/',  label: 'LinkedIn',  color: '#0A66C2' },
  { icon: FaGithub,      href: 'https://github.com/Aditya00038',                              label: 'GitHub',    color: '#e4e4e7' },
  { icon: FaInstagram,   href: 'https://www.instagram.com/_aditya_038/',                      label: 'Instagram', color: '#E1306C' },
];

/* ─── Copy Email Button Styled Component ─── */
const StyledEmailWrapper = styled.div`
  width: 100%;

  .email-box {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px 6px 6px;
    border-radius: 10px;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: all 0.2s ease;
  }

  .email-box:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: #202024;
  }

  .email-text {
    color: #e4e4e7;
    font-size: 0.85rem;
    font-weight: 500;
    font-family: monospace, sans-serif;
    text-decoration: none;
    transition: color 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .email-text:hover {
    color: #ffffff;
  }

  /* tooltip settings 👇 */
  .copy {
    /* button */
    --button-bg: #353434;
    --button-hover-bg: #464646;
    --button-text-color: #CCCCCC;
    --button-hover-text-color: #8bb9fe;
    --button-border-radius: 8px;
    --button-diameter: 34px;
    --button-outline-width: 1px;
    --button-outline-color: rgb(141, 141, 141);
    /* tooltip */
    --tooltip-bg: #f4f3f3;
    --toolptip-border-radius: 4px;
    --tooltip-font-family: Menlo, Roboto Mono, monospace;
    --tooltip-font-size: 11px;
    --tootip-text-color: rgb(50, 50, 50);
    --tooltip-padding-x: 7px;
    --tooltip-padding-y: 6px;
    --tooltip-offset: 8px;
  }

  .copy {
    box-sizing: border-box;
    width: var(--button-diameter);
    height: var(--button-diameter);
    border-radius: var(--button-border-radius);
    background-color: var(--button-bg);
    color: var(--button-text-color);
    border: none;
    cursor: pointer;
    position: relative;
    outline: none;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tooltip {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font: var(--tooltip-font-size) var(--tooltip-font-family);
    color: var(--tootip-text-color);
    background: var(--tooltip-bg);
    padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
    border-radius: var(--toolptip-border-radius);
    pointer-events: none;
    transition: opacity 0.2s ease, top 0.2s ease;
    z-index: 50;
  }

  .tooltip::before {
    content: attr(data-text-initial);
  }

  .is-copied .tooltip::before {
    content: attr(data-text-end);
  }

  .tooltip::after {
    content: "";
    position: absolute;
    bottom: calc(var(--tooltip-padding-y) / 2 * -1);
    width: var(--tooltip-padding-y);
    height: var(--tooltip-padding-y);
    background: inherit;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
    pointer-events: none;
  }

  .copy svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .copy:hover .tooltip,
  .copy:focus .tooltip {
    opacity: 1;
    visibility: visible;
    top: calc((100% + var(--tooltip-offset)) * -1);
  }

  .copy:hover,
  .copy:focus {
    background-color: var(--button-hover-bg);
  }

  .copy:active {
    outline: var(--button-outline-width) solid var(--button-outline-color);
  }

  .copy:hover svg {
    color: var(--button-hover-text-color);
  }
`;

function CopyEmailBtn() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <StyledEmailWrapper>
      <div className="email-box">
        <button
          type="button"
          onClick={handleCopy}
          className={`copy ${copied ? 'is-copied' : ''}`}
          aria-label="Copy email"
        >
          <span
            data-text-end="Copied!"
            data-text-initial="Copy to clipboard"
            className="tooltip"
          />
          <span>
            {!copied ? (
              <svg
                xmlSpace="preserve"
                style={{ enableBackground: 'new 0 0 512 512' }}
                viewBox="0 0 6.35 6.35"
                height={18}
                width={18}
                xmlns="http://www.w3.org/2000/svg"
                className="clipboard"
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                  />
                </g>
              </svg>
            ) : (
              <svg
                xmlSpace="preserve"
                style={{ enableBackground: 'new 0 0 512 512' }}
                viewBox="0 0 24 24"
                height={16}
                width={16}
                xmlns="http://www.w3.org/2000/svg"
                className="checkmark"
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  />
                </g>
              </svg>
            )}
          </span>
        </button>

        <a href={`mailto:${EMAIL}`} className="email-text">
          {EMAIL}
        </a>
      </div>
    </StyledEmailWrapper>
  );
}

/* ─── LinkedIn Button Styled Component ─── */
const StyledLinkedInWrapper = styled.div`
  width: 100%;

  .button {
    background-color: #fff;
    border: 1px solid #0077b5;
    padding: 11px 20px;
    position: relative;
    width: 100%;
    transition: 0.5s;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
  }

  .button .text {
    position: relative;
    margin: 0;
    padding: 0;
    transition: 0.5s;
    color: #0077b5;
    white-space: nowrap;
    pointer-events: none;
  }

  .button .svg {
    pointer-events: none;
    position: absolute;
    transform-origin: 50% 50%;
    transform: translateY(-50%) translateX(100px);
    top: 50%;
    right: 14px;
    margin: 0;
    padding: 0;
    opacity: 0;
    transition-duration: 0.5s;
    transition-delay: 0;
    height: 20px;
    width: 20px;
    fill: #fff;
  }

  .button:hover .text {
    color: #fff;
  }

  .button:hover .svg {
    opacity: 1;
    transition-delay: 0.3s;
    transition-duration: 0.3s;
    transform: translateY(-50%) translateX(0px);
  }

  .button:hover {
    background-color: #0077b5;
    padding-right: 40px;
  }
`;

function LinkedInBtn() {
  return (
    <StyledLinkedInWrapper>
      <a
        href="https://www.linkedin.com/in/aditya-suryawanshi-20b60930a/"
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        <p className="text">Connect on LinkedIn</p>
        <svg viewBox="0 0 16 16" fill="currentColor" height={16} width={16} className="svg">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
        </svg>
      </a>
    </StyledLinkedInWrapper>
  );
}

/* ─── Version of Sites ─── */
function VersionOfSites() {
  return (
    <div style={{ padding: '0 clamp(1.5rem, 5vw, 5rem) 1.25rem', margin: 0 }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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
      background: 'transparent',
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
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '280px', maxWidth: '320px', width: '100%' }}
        >
          {/* Connect on LinkedIn button */}
          <LinkedInBtn />

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
