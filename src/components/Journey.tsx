'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: '2022',     title: 'Started Freelancing',       desc: 'Began building Django-based backends and REST APIs for local clients. First taste of production deployments.' },
  { year: '2023',     title: 'Built GymSite',             desc: 'Launched a full gym management platform with member tracking, class scheduling, and diet recommendation engine.' },
  { year: '2024 Q1',  title: 'Co-founded DigiLoop',       desc: 'Started a full-service digital agency in Nepal. Led all technical architecture, built first 3 client sites.' },
  { year: '2024 Q3',  title: 'EasyMoto & TechWired',      desc: "Delivered EasyMoto (eSewa e-commerce) and TechWired Solutions (corporate) — DigiLoop's flagship projects." },
  { year: '2025',     title: 'AI & Amicus',               desc: 'Deep-dived into LangChain, RAG pipelines, and vector databases. Delivered Amicus (legal) and Aryal Farm (agri).' },
  { year: 'Now',      title: 'DigiLoop v2 + AI Products', desc: 'Building DigiLoop v2, exploring AI-powered SaaS, and expanding the agency to international clients.', active: true },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.milestone').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const gold = '#d4af37';
  const textDark = '#ffffff';
  const textMid = 'rgba(255, 255, 255, 0.65)';

  return (
    <section 
      id="journey" 
      ref={sectionRef} 
      style={{ 
        padding: '120px 5%', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        background: 'rgba(12, 10, 6, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <span style={{ fontSize: 11, color: gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>My story</span>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, letterSpacing: -1, margin: '10px 0 64px', color: textDark }}>
          The journey
        </h2>

        <div style={{ position: 'relative' }}>
          {/* Vertical timeline line */}
          <div className="timeline-line" style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(to bottom, ${gold}, rgba(212,175,55,0.12))`,
            transform: 'translateX(-50%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="milestone" style={{
                display: 'flex',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                gap: 32,
                alignItems: 'flex-start',
              }}>
                {/* Content card */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    background: m.active ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${m.active ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 18,
                    padding: '22px 24px',
                    boxShadow: m.active ? '0 8px 32px rgba(212,175,55,0.08)' : '0 4px 20px rgba(0,0,0,0.15)',
                    textAlign: i % 2 === 0 ? 'left' : 'right',
                  }}>
                    <div style={{ fontSize: 11, color: gold, letterSpacing: 2, marginBottom: 8, fontWeight: 600 }}>{m.year}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 500, color: textDark, marginBottom: 8 }}>{m.title}</h3>
                    <p style={{ fontSize: 13, color: textMid, lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div style={{ flexShrink: 0, width: 16, display: 'flex', justifyContent: 'center', marginTop: 24, zIndex: 2 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: m.active ? gold : '#0a0a0a',
                    border: `3px solid ${m.active ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.35)'}`,
                    boxShadow: m.active ? `0 0 12px ${gold}` : 'none',
                    flexShrink: 0,
                  }} />
                </div>

                {/* Spacer opposite side */}
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
