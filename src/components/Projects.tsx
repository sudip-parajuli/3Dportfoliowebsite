'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { tag: 'E-Commerce · 2024', name: 'EasyMoto',          desc: 'Automotive e-commerce with real-time inventory, eSewa payment, and rental booking system.',                       stack: ['Django', 'PostgreSQL', 'Bootstrap', 'eSewa API'], url: 'https://www.easymoto.com.np/public-home/', via: 'DigiLoop'   },
  { tag: 'Agency · 2024',     name: 'DigiLoop',          desc: 'Co-founded full-service digital agency. Lead developer for all tech architecture, builds, and client delivery.',   stack: ['Next.js', 'GSAP', 'Framer Motion', 'Vercel'],     url: 'https://digi-loop.vercel.app',            via: 'Co-founded', featured: true },
  { tag: 'Legal · 2025',      name: 'Amicus',            desc: 'Premium legal services website with trust-building design and appointment scheduling.',                           stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],          url: 'https://amicus.com.np',                   via: 'DigiLoop'   },
  { tag: 'Corporate · 2024',  name: 'TechWired Solutions',desc: 'Technology company website with service showcase, case studies, and lead generation.',                           stack: ['Next.js', 'Tailwind CSS', 'Vercel'],              url: 'https://techwired-solutions.vercel.app',  via: 'DigiLoop'   },
  { tag: 'Agriculture · 2025',name: 'Aryal Farm',         desc: 'Agriculture business branding and web presence with product catalogue and digital marketing.',                  stack: ['Next.js', 'Figma', 'Canva'],                     url: 'https://aryalfarm.com.np',                via: 'DigiLoop'   },
  { tag: 'Fitness App · 2024',name: 'GymSite',           desc: 'Gym management platform with member tracking, class scheduling, and diet recommendations.',                      stack: ['TypeScript', 'Next.js', 'Tailwind CSS'],          url: 'https://github.com/sudip-parajuli/gymsite',via: 'GitHub'    },
];

const STATS_ITEMS = [
  { value: '4+ Years', label: 'Experience' },
  { value: '10+',     label: 'Projects Shipped' },
  { value: '1000+',   label: 'Users Impacted' },
  { value: 'Fullstack',label: 'Developer' },
  { value: 'Co-Founder',label: '@ DigiLoop' },
] as const;

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
            delay: (i % 3) * 0.1,
          }
        );
      });
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.stats-strip', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const gold = '#d4af37';
  const textDark = '#111111';
  const textMid = 'rgba(30,25,15,0.55)';

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      style={{ 
        padding: '100px 5% 120px', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        background: '#ffffff',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        
        {/* Stats Strip */}
        <div className="stats-strip" style={{
          background: '#fbf9f4',
          border: '1px solid rgba(212, 175, 55, 0.18)',
          borderRadius: 24,
          padding: '32px 20px',
          marginBottom: 64,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24,
          textAlign: 'center',
        }}>
          {STATS_ITEMS.map((item, idx) => (
            <div key={idx} className="stat-item" style={{ position: 'relative' }}>
              <div style={{ fontSize: 26, fontWeight: 300, color: '#d4af37', letterSpacing: '-1px', marginBottom: 4 }}>
                {item.value}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(30,25,15,0.6)', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {item.label}
              </div>
              {/* Divider for desktop */}
              {idx < STATS_ITEMS.length - 1 && (
                <div className="hidden lg:block" style={{
                  position: 'absolute',
                  right: 0,
                  top: '15%',
                  bottom: '15%',
                  width: 1,
                  background: 'rgba(212, 175, 55, 0.15)'
                }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 11, color: gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
            Selected work
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, letterSpacing: -1, marginTop: 10, color: textDark }}>
            Things I&apos;ve shipped
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={{
                background: p.featured ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${p.featured ? 'rgba(212,175,55,0.45)' : 'rgba(212,175,55,0.22)'}`,
                borderRadius: 20,
                padding: '24px 22px',
                display: 'block',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = gold;
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(212,175,55,0.15)';
                e.currentTarget.style.background = p.featured ? 'rgba(212,175,55,0.09)' : 'rgba(251,249,244,0.9)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = p.featured ? 'rgba(212,175,55,0.45)' : 'rgba(212,175,55,0.22)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)';
                e.currentTarget.style.background = p.featured ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.65)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(0,0,0,0.04)', color: textMid, fontSize: 10, padding: '3px 10px', borderRadius: 10 }}>{p.tag}</span>
                  <span style={{ background: p.via === 'DigiLoop' ? 'rgba(212,175,55,0.12)' : 'rgba(0,0,0,0.04)', color: gold, fontSize: 10, padding: '3px 10px', borderRadius: 10 }}>{p.via}</span>
                </div>
                <span style={{ color: gold, fontSize: 18 }}>↗</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: textDark, marginBottom: 8 }}>{p.name}</h3>
              <p style={{ fontSize: 13, color: textMid, lineHeight: 1.65, marginBottom: 18 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.stack.map(s => (
                  <span key={s} style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    color: 'rgba(30,25,15,0.65)',
                    fontSize: 11, padding: '3px 10px', borderRadius: 8,
                  }}>{s}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
