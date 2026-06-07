'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: '8+',  label: 'Live Projects',   sub: 'GitHub + DigiLoop' },
  { num: '2+',  label: 'Years Building',  sub: 'Django · Next.js'  },
  { num: '5+',  label: 'Clients Served',  sub: 'via DigiLoop'      },
  { num: '50+', label: 'LeetCode Solved', sub: 'DSA practice'      },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-animate').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.75,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const gold = '#d4af37';
  const textDark = '#ffffff';
  const textMid = 'rgba(255,255,255,0.6)';
  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '120px 5%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      <div style={{ maxWidth: 1050, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <div
          className="glass-panel"
          style={{
            padding: '50px clamp(24px, 5vw, 60px)',
            width: '100%',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* ── LEFT COLUMN ── text */}
            <div className="md:col-span-7">
              <span className="about-animate" style={{
                fontSize: 10, color: gold, letterSpacing: 2,
                textTransform: 'uppercase', display: 'block', fontWeight: 600, marginBottom: 14,
              }}>
                About
              </span>

              <h2 className="about-animate" style={{
                fontSize: 'clamp(26px, 3.5vw, 42px)',
                fontWeight: 400,
                letterSpacing: '-1.5px',
                color: textDark,
                lineHeight: 1.12,
                marginBottom: 22,
              }}>
                Fullstack dev<br />
                <em style={{ color: gold, fontStyle: 'italic' }}>& co-founder.</em>
              </h2>

              <p className="about-animate" style={{
                color: textMid, fontSize: 14, lineHeight: 1.85, marginBottom: 14,
              }}>
                I&apos;m Sudip Parajuli — a fullstack developer from Kathmandu, Nepal, focused on building
                scalable Django backends, modern Next.js frontends, and AI-powered applications.
              </p>

              <p className="about-animate" style={{
                color: textMid, fontSize: 13, lineHeight: 1.8, marginBottom: 32,
              }}>
                I co-founded <strong style={{ color: textDark }}>DigiLoop</strong>, a full-service digital
                agency delivering websites, branding, and AI integrations for clients across Nepal.
              </p>

              <div className="about-animate" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'LinkedIn →', href: 'https://www.linkedin.com/in/sudip-parajuli-8073601a1', primary: true },
                  { label: 'GitHub', href: 'https://github.com/sudip-parajuli', primary: false },
                  { label: 'LeetCode', href: 'https://leetcode.com/u/sudip_parajuli/', primary: false },
                ].map(({ label, href, primary }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      background: primary ? gold : 'transparent',
                      color: primary ? '#000000' : textMid,
                      border: primary ? 'none' : `1px solid rgba(212,175,55,0.3)`,
                      padding: '10px 22px',
                      borderRadius: 50,
                      fontSize: 13,
                      fontWeight: primary ? 600 : 400,
                      transition: 'all 0.22s ease',
                      textAlign: 'center',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = primary ? '#b89327' : 'rgba(212,175,55,0.1)';
                      if (!primary) e.currentTarget.style.color = gold;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = primary ? gold : 'transparent';
                      if (!primary) e.currentTarget.style.color = textMid;
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN ── stats */}
            <div className="md:col-span-5 md:pl-6">
              <div className="about-animate" style={{ marginBottom: 14 }}>
                <span style={{
                  fontSize: 10, color: gold, letterSpacing: 2,
                  textTransform: 'uppercase', fontWeight: 600,
                }}>
                  In numbers
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {STATS.map(({ num, label, sub }, i) => (
                  <div
                    key={label}
                    className="about-animate"
                    style={{
                      padding: '16px 0',
                      borderBottom: i < STATS.length - 1 ? '1px solid rgba(212,175,55,0.18)' : 'none',
                    }}
                  >
                    <div style={{
                      fontSize: 36, fontWeight: 200, letterSpacing: '-2px',
                      color: gold, lineHeight: 1, marginBottom: 4,
                    }}>
                      {num}
                    </div>
                    <div style={{ fontSize: 13, color: textDark, fontWeight: 500 }}>{label}</div>
                    <div style={{ fontSize: 11, color: textMid, marginTop: 2 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
