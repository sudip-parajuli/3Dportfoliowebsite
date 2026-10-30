'use client';

import { useState, useRef, useEffect } from 'react';

import { projects, clientWork, conceptWork, automationProjects } from '@/data/portfolio';

type Message = { from: 'user' | 'bot'; text: string };

const SUGGESTIONS = [
  "What's your tech stack?",
  "Tell me about LinkyPot",
  "Are you available for work?",
  "What projects have you built?",
  "How can I contact you?",
];

function getReply(input: string): string {
  const q = input.toLowerCase();
  const automation = automationProjects.find(p => q.includes(p.name.toLowerCase()) || (p.name === 'FootyBitez' && /football|shorts/.test(q)) || (p.name === 'Trending Today' && /news.automation|ontrending/.test(q)));
  if (automation) return `${automation.name}: ${automation.description} Tools: ${automation.stack.join(', ')}. ${automation.links.map(l => `${l.label}: ${l.url}`).join(' · ')}`;
  if (/automation|social media project/.test(q)) return 'Sudip’s social media automation projects are FootyBitez, a Python/Remotion football video pipeline, and Trending Today, a Nepali news image-card and daily digest workflow. The automation section links their repositories and social channels.';
  if (/consult|marketing|advertis|growth|client|graphic|branding|google business/.test(q)) return `Sudip is a Business Growth & Digital Strategy Consultant alongside his Director role at Techwired Solutions. For EasyMoto and ChillPill, his work spans business planning, marketing and advertising execution, and digital operations. His broader client work includes websites, social media graphics and Google Business Profiles. Businesses include ${clientWork.map(c => c.name).join(', ')}. See the Business & Client Work section for scope.`;
  if (/sample|concept|redesign/.test(q)) return `The smaller redesign collection includes ${conceptWork.map(c => c.name).join(', ')}. These are independent sample concepts, not official business websites or commissioned launches. Expand Website redesign concepts below the client work.`;
  const project = projects.find(p => q.includes(p.name.toLowerCase()) || (p.name === 'LinkyPot' && /oneqrcard/.test(q)) || (p.name === 'ChillPill Gaming Cafe' && /chillpill|gaming cafe/.test(q)));
  if (project) return `${project.name}: ${project.description} ${project.focus} Status: ${project.status}. Explore: ${project.url}`;
  if (/education|experience|internship|insight|bca|college|university|degree|certificate|bootcamp/.test(q)) return 'Sudip completed his BCA at Araniko Multiple Campus, Tribhuvan University, in 2025; a three-month Python/Django backend development internship at Insight Workshop; and a Digital Marketing Bootcamp with a completion certificate provided by Budhanilkantha Municipality.';
  if (/techwired|business|agency|director|leadership/.test(q)) return 'Sudip is Director of Techwired Solutions, a registered business in Budhanilkantha Municipality, Nepal. He leads its software products, client websites and digital solutions. Explore https://www.techwiredsolutions.com.np/ and https://github.com/techwired-solutions.';
  if (/play store|google play|android|mobile|game/.test(q)) return 'Dashain Cards is playable on the web and currently in Google Play internal testing. There is no public Play Store download link listed yet.';
  if (/project|built|ship|portfolio/.test(q)) return `Selected work: ${projects.map(p => p.name).join(', ')}. LinkyPot is the flagship. Each project card includes its current status, website and repository.`;
  if (/stack|language|framework|tools|technology/.test(q)) return 'Sudip works with Next.js, React, TypeScript, Python, Django, Django REST Framework and Supabase/PostgreSQL. His projects also include Gemini integrations, Android web companions and Expo staff tools.';
  if (/ai|agriculture|automation/.test(q)) return 'Sudip is interested in practical AI, automation and modern agriculture. Krisearch combines agricultural information for Nepal with an English/Nepali AI assistant. This portfolio guide answers from the information on this site.';
  if (/contact|email|reach|available|hire|work|collaborat/.test(q)) return 'For product collaborations, websites, software or automation projects, email sparajuli802@gmail.com or use the contact form. More links: https://sudip-parajuli.linkypot.com/';
  if (/location|based|where|nepal/.test(q)) return 'Sudip is based in Kathmandu, Nepal (UTC+5:45).';
  return 'I’m a guide to Sudip’s portfolio. Ask about LinkyPot, his selected projects, Techwired Solutions, education, app release status or contact details.';
}

export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState<Message[]>([
    { from: 'bot', text: "Hi! 👋 I'm here to answer questions about Sudip's work, skills, and availability. What would you like to know?" }
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { from: 'bot', text: getReply(text) }]);
    }, 1100);
  };

  return (
    <>
      {/* Floating button */}
      <button
        id="chatbot-toggle"
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          width: 56, height: 56, borderRadius: '50%',
          background: open ? '#333' : '#d4af37',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(212,175,55,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, transition: 'all 0.3s ease',
          transform: open ? 'rotate(45deg) scale(1)' : 'scale(1)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = open ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = open ? 'rotate(45deg) scale(1)' : 'scale(1)'}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {open && (
        <div role="dialog" aria-label="Portfolio guide" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }} style={{
          position: 'fixed', bottom: 96, right: 20, zIndex: 999,
          width: 'min(360px, calc(100vw - 40px))', height: 480, maxHeight: 'calc(100dvh - 128px)',
          background: 'rgba(15,15,15,0.92)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: 20,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
          overflow: 'hidden',
          animation: 'fadeUp 0.3s ease',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #b89327)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div>
            <div>
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>Portfolio guide</div>
              <div style={{ color: '#d4af37', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4af37', display: 'inline-block' }} />
                About Sudip’s work
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="glass-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  background: m.from === 'user' ? '#d4af37' : 'rgba(255,255,255,0.07)',
                  color: m.from === 'user' ? '#000000' : 'rgba(255,255,255,0.85)',
                  borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding: '10px 14px',
                  fontSize: 13,
                  lineHeight: 1.6,
                  fontWeight: m.from === 'user' ? 500 : 400,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '16px 16px 16px 4px', padding: '10px 16px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0,1,2].map(j => (
                    <span key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4af37', display: 'inline-block', animation: `pulse 1.2s ease ${j * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div style={{ padding: '8px 12px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {SUGGESTIONS.slice(0, 3).map(s => (
              <button key={s} onClick={() => send(s)} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212, 175, 55, 0.15)',
                borderRadius: 20, padding: '4px 10px', fontSize: 11, color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer', transition: 'all 0.15s ease', fontFamily: 'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Ask about Sudip’s work…"
              aria-label="Question for portfolio guide"
              style={{
                flex: 1, minWidth: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '10px 14px', color: '#fff', fontSize: 13,
                outline: 'none', fontFamily: 'inherit',
              }}
            />
            <button aria-label="Send question" onClick={() => send(input)} style={{
              background: '#d4af37', border: 'none', borderRadius: 12,
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 16, flexShrink: 0, color: '#000000', fontWeight: 600,
            }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
