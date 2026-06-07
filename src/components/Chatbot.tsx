'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { from: 'user' | 'bot'; text: string };

const SUGGESTIONS = [
  "What's your tech stack?",
  "Tell me about DigiLoop",
  "Are you available for work?",
  "What projects have you built?",
  "How can I contact you?",
];

function getReply(input: string): string {
  const q = input.toLowerCase();
  if (/stack|tech|language|framework|use/i.test(q))
    return "My core stack is Django (Python) for backends, Next.js + TypeScript for frontends, and PostgreSQL for databases. I also work with FastAPI, Tailwind CSS, GSAP, Docker, and Redis. On the AI side — LangChain, RAG pipelines, and the OpenAI API. 🛠️";
  if (/digiloop|agency/i.test(q))
    return "DigiLoop is the digital agency I co-founded in 2024 🚀. We build websites, branding, and AI-powered products for businesses across Nepal. Check us out at digi-loop.vercel.app — I lead all the technical work there.";
  if (/available|hire|freelance|job|work|opportun/i.test(q))
    return "Yes! I'm currently open to freelance projects and full-time opportunities. I work remotely from Kathmandu, Nepal. Best way to reach me is sparajuli802@gmail.com or via the contact form on this page. 📩";
  if (/project|built|ship|portfolio|easymoto|amicus|gymsite/i.test(q))
    return "I've shipped 8+ live projects! Highlights: EasyMoto (e-commerce, easymoto.com.np), Amicus (legal, amicus.com.np), TechWired Solutions, Aryal Farm, GymSite (GitHub), and DigiLoop itself. Scroll up to the Work section to see them all! 🎯";
  if (/contact|email|reach|message|talk/i.test(q))
    return "You can reach me at sparajuli802@gmail.com, or fill out the contact form just above! I'm also on LinkedIn (sudip-parajuli-8073601a1) and GitHub (github.com/sudip-parajuli). I typically reply within 24 hours. 📬";
  if (/ai|machine learning|langchain|rag|gpt|openai/i.test(q))
    return "I build with LangChain, RAG pipelines, vector databases, and the OpenAI API. I've worked on recommendation systems (content-based filtering with TF-IDF) and custom AI integrations for client products. 🤖";
  if (/location|based|kathmandu|nepal|where/i.test(q))
    return "I'm based in Kathmandu, Nepal 🇳🇵. I work fully remote and collaborate with clients globally. My timezone is NPT (UTC+5:45).";
  if (/leetcode|dsa|algorithm|competitive/i.test(q))
    return "I've solved 50+ LeetCode problems as part of my DSA practice. Find me at leetcode.com/u/sudip_parajuli/ 🧠";
  if (/hello|hi|hey|greet|sup|yo/i.test(q))
    return "Hey there! 👋 I'm Sudip's portfolio assistant. Ask me anything about his work, stack, availability, or projects!";
  if (/bye|goodbye|thanks|thank/i.test(q))
    return "Thanks for stopping by! Feel free to reach out at sparajuli802@gmail.com anytime. Have a great day! 🙌";
  return "Good question! I'm best at answering about Sudip's tech stack, projects, DigiLoop, availability, and how to contact him. What would you like to know? 😊";
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
        <div style={{
          position: 'fixed', bottom: 96, right: 28, zIndex: 999,
          width: 360, height: 480, maxHeight: 520,
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
              <div style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>Sudip&apos;s Assistant</div>
              <div style={{ color: '#d4af37', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4af37', display: 'inline-block' }} />
                Online
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
              placeholder="Ask me anything…"
              style={{
                flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '10px 14px', color: '#fff', fontSize: 13,
                outline: 'none', fontFamily: 'inherit',
              }}
            />
            <button onClick={() => send(input)} style={{
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
