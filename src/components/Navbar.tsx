'use client';
import { useEffect, useState } from 'react';

const NAV_ITEMS = ['About', 'Work', 'Journey', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menu on any nav link click
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .navbar-pill {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          border-radius: 50px;
          padding: 10px 28px;
          display: flex;
          gap: 24px;
          align-items: center;
          transition: background 0.4s ease, border 0.4s ease;
          white-space: nowrap;
        }
        .navbar-links { display: flex; gap: 24px; align-items: center; }
        .navbar-socials { display: flex; gap: 14px; align-items: center; }
        .navbar-divider { width: 1px; height: 16px; background: rgba(255,255,255,0.15); }
        .navbar-hamburger { display: none; }

        /* Mobile drawer */
        .navbar-drawer {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 99;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,175,55,0.18);
          padding: 80px 32px 32px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transform: translateY(-110%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .navbar-drawer.open { transform: translateY(0); }
        .drawer-link {
          font-size: 22px;
          font-weight: 300;
          color: rgba(255,255,255,0.75);
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          letter-spacing: -0.5px;
          transition: color 0.2s ease;
        }
        .drawer-link:hover { color: #d4af37; }
        .drawer-socials {
          display: flex; gap: 20px; margin-top: 20px;
        }
        .drawer-social-link {
          font-size: 13px; color: rgba(255,255,255,0.45);
          text-decoration: none; transition: color 0.2s ease;
        }
        .drawer-social-link:hover { color: #d4af37; }

        @media (max-width: 640px) {
          .navbar-pill {
            padding: 10px 20px;
            gap: 0;
          }
          .navbar-links { display: none; }
          .navbar-socials { display: none; }
          .navbar-divider { display: none; }
          .navbar-hamburger {
            display: flex;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            padding: 4px;
            background: none;
            border: none;
            margin-left: auto;
          }
          .hamburger-line {
            width: 22px; height: 2px;
            background: rgba(255,255,255,0.7);
            border-radius: 2px;
            transition: all 0.25s ease;
          }
          .hamburger-line.open-1 { transform: rotate(45deg) translate(5px, 5px); }
          .hamburger-line.open-2 { opacity: 0; }
          .hamburger-line.open-3 { transform: rotate(-45deg) translate(5px, -5px); }
        }
      `}</style>

      {/* ── Pill Navbar ── */}
      <nav
        className="navbar-pill"
        style={{
          background: scrolled ? 'rgba(15,15,15,0.88)' : 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(16px)',
          border: scrolled
            ? '1px solid rgba(212,175,55,0.25)'
            : '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {/* Desktop nav links */}
        <div className="navbar-links">
          {NAV_ITEMS.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 13,
                fontWeight: 400,
                transition: 'color 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="navbar-divider" />

        {/* Desktop social links */}
        <div className="navbar-socials">
          {[
            { label: 'GH', href: 'https://github.com/sudip-parajuli' },
            { label: 'LI', href: 'https://www.linkedin.com/in/sudip-parajuli-8073601a1' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 500, transition: 'color 0.2s ease', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line${menuOpen ? ' open-1' : ''}`} />
          <span className={`hamburger-line${menuOpen ? ' open-2' : ''}`} />
          <span className={`hamburger-line${menuOpen ? ' open-3' : ''}`} />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`navbar-drawer${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="drawer-link"
            onClick={handleNavClick}
          >
            {item}
          </a>
        ))}
        <div className="drawer-socials">
          <a href="https://github.com/sudip-parajuli" target="_blank" rel="noopener noreferrer" className="drawer-social-link">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sudip-parajuli-8073601a1" target="_blank" rel="noopener noreferrer" className="drawer-social-link">
            LinkedIn
          </a>
          <a href="mailto:sparajuli802@gmail.com" className="drawer-social-link">
            Email
          </a>
        </div>
      </div>
    </>
  );
}
