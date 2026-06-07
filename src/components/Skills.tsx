'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS: Record<string, { items: string[] }> = {
  Backend: {
    items: [
      'Python',
      'Django',
      'Django REST Framework',
      'FastAPI',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'REST APIs',
      'JWT Authentication',
    ],
  },

  Frontend: {
    items: [
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'HTML5',
      'CSS3',
    ],
  },

  'AI Engineering': {
    items: [
      'OpenAI API',
      'LangChain',
      'LangGraph',
      'RAG Systems',
      'AI Agents',
      'Prompt Engineering',
      'Vector Databases',
      'Scikit-learn',
      'Pandas',
    ],
  },

  DevOps: {
    items: [
      'Docker',
      'Git',
      'GitHub Actions',
      'Linux',
      'Nginx',
      'Apache',
      'Vercel',
      'Render',
    ],
  },
};

const AI_TOOLS = [
  // LLMs
  'ChatGPT',
  'Claude',
  'Gemini',
  'DeepSeek',
  'Groq',
  'Qwen',

  // AI Frameworks
  'LangChain',
  'LangGraph',
  'CrewAI',
  'Flowise',

  // Automation
  'n8n',
  'Make',

  // Vector Databases
  'Pinecone',
  'ChromaDB',

  // AI Media
  'Midjourney',
  'ElevenLabs',
  'HeyGen',
  'DALL-E 3',
  'Flux 1.1 Pro',
  'Runway Gen-3',
  'Suno AI',
  'Kling AI',
  'Google Veo',

  // Design & Productivity
  'Figma',
  'Canva',
  'Adobe Express',
] as const;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.skill-panel').forEach((panel, i) => {
        gsap.fromTo(panel,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: panel, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
      gsap.fromTo('.ai-tool-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: { trigger: '.ai-tool-card', start: 'top 92%', toggleActions: 'play none none none' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const gold = '#d4af37';
  const textDark = '#111111';
  const textMid = 'rgba(30,25,15,0.6)';

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      style={{ 
        padding: '120px 5%', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative', 
        zIndex: 1,
        background: '#f5f5f5',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 11, color: gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Expertise</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, letterSpacing: -1, margin: '10px 0 48px', color: textDark }}>
            What I work with
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(SKILLS).map(([category, { items }]) => (
            <div key={category} className="skill-panel" style={{
              background: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(212,175,55,0.18)',
              borderRadius: 20,
              padding: '24px 20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = gold;
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(212,175,55,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.03)';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: gold, boxShadow: `0 0 8px ${gold}`, flexShrink: 0 }} />
                <h3 style={{ fontSize: 12, fontWeight: 600, color: textDark, letterSpacing: 1, textTransform: 'uppercase' }}>{category}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {items.map(skill => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(212,175,55,0.07)',
                      border: '1px solid rgba(212,175,55,0.22)',
                      borderRadius: 20,
                      padding: '5px 12px',
                      fontSize: 12,
                      color: textMid,
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = gold;
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(212,175,55,0.07)';
                      e.currentTarget.style.color = textMid;
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.22)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI & Creative Suite */}
        <div style={{ marginTop: 64 }}>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 11, color: gold, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
              AI & Creative Suite
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 500, color: textDark, marginTop: 6 }}>
              Tools & Automation Ecosystem
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {AI_TOOLS.map(tool => (
              <div
                key={tool}
                className="ai-tool-card"
                style={{
                  background: 'rgba(12, 10, 6, 0.9)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212, 175, 55, 0.22)',
                  borderRadius: 14,
                  padding: '12px 20px',
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 500,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.22s ease',
                  cursor: 'default',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = gold;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.22)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: gold, boxShadow: `0 0 6px ${gold}` }} />
                {tool}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
