'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Get your free key at https://web3forms.com → enter sparajuli802@gmail.com ──
const WEB3FORMS_KEY = 'a6cf6d35-2273-475a-bb59-628626c5cac4';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '',           // spam protection (must be empty)
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const gold     = '#d4af37';
  const textDark = '#111111';

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(251,249,244,0.85)',
    border: '1px solid rgba(212,175,55,0.22)',
    borderRadius: 12,
    padding: '14px 16px',
    color: textDark,
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 7,
    fontWeight: 600,
  };

  return (
    <>
      <style>{`
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .contact-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .contact-submit-btn {
          align-self: flex-start;
          width: auto;
        }
        @media (max-width: 768px) {
          .contact-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .contact-name-email {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .contact-submit-btn {
            width: 100%;
            text-align: center;
          }
        }
        .contact-card {
          padding: clamp(28px, 5vw, 60px);
          background: rgba(12, 10, 6, 0.72);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(212,175,55,0.18);
          border-radius: 24px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.15);
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          transition: color 0.2s ease;
          text-decoration: none;
          word-break: break-word;
        }
        .contact-link:hover { color: #d4af37; }
        @media (max-width: 480px) {
          .contact-link { font-size: 13px; }
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        style={{
          padding: 'clamp(60px, 10vw, 120px) clamp(16px, 5%, 80px)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: '#fbf9f4',
          borderTop: '1px solid rgba(212,175,55,0.18)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div ref={cardRef} className="contact-card">
            <div className="contact-inner">

              {/* ── LEFT: info ── */}
              <div>
                <span style={{
                  fontSize: 11, color: gold,
                  letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600,
                }}>
                  Get in touch
                </span>
                <h2 style={{
                  fontSize: 'clamp(26px, 5vw, 54px)',
                  fontWeight: 400,
                  color: '#ffffff',
                  letterSpacing: '-1.5px',
                  margin: '14px 0 16px',
                  lineHeight: 1.08,
                }}>
                  Let&apos;s build something<br />
                  <em style={{ color: gold, fontStyle: 'italic' }}>useful.</em>
                </h2>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 'clamp(13px, 2vw, 15px)',
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}>
                  Available for freelance projects, full-time roles, and startup
                  collaborations. Co-building DigiLoop — Nepal&apos;s emerging digital agency.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { icon: '✉️', label: 'sparajuli802@gmail.com',   href: 'mailto:sparajuli802@gmail.com' },
                    { icon: '💼', label: 'LinkedIn',                  href: 'https://www.linkedin.com/in/sudip-parajuli-8073601a1' },
                    { icon: '🐙', label: 'github.com/sudip-parajuli', href: 'https://github.com/sudip-parajuli' },
                    { icon: '🚀', label: 'DigiLoop Agency',           href: 'https://digi-loop.vercel.app' },
                  ].map(({ icon, label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="contact-link"
                    >
                      <span style={{ fontSize: 18, minWidth: 24, color: gold }}>{icon}</span>
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: form ── */}
              <div>
                {status === 'success' ? (
                  <div style={{
                    background: 'rgba(212,175,55,0.06)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: 16, padding: 'clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px)',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
                    <h3 style={{ color: gold, fontSize: 20, marginBottom: 8, fontWeight: 400 }}>Message sent!</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                      Thanks! I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      style={{
                        marginTop: 24, background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff',
                        padding: '10px 24px', borderRadius: 50, fontSize: 13,
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                    {/* Name + Email row */}
                    <div className="contact-name-email">
                      <div>
                        <label style={labelStyle}>Name</label>
                        <input
                          required value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Your name"
                          style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = gold; e.target.style.boxShadow = '0 0 10px rgba(212,175,55,0.15)'; }}
                          onBlur={e  => { e.target.style.borderColor = 'rgba(212,175,55,0.22)'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input
                          required type="email" value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="your@email.com"
                          style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = gold; e.target.style.boxShadow = '0 0 10px rgba(212,175,55,0.15)'; }}
                          onBlur={e  => { e.target.style.borderColor = 'rgba(212,175,55,0.22)'; e.target.style.boxShadow = 'none'; }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={labelStyle}>Message</label>
                      <textarea
                        required value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell me about your project…"
                        rows={6}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => { e.target.style.borderColor = gold; e.target.style.boxShadow = '0 0 10px rgba(212,175,55,0.15)'; }}
                        onBlur={e  => { e.target.style.borderColor = 'rgba(212,175,55,0.22)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {status === 'error' && (
                      <p style={{ color: '#b91c1c', fontSize: 13 }}>
                        Something went wrong. Try emailing sparajuli802@gmail.com directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="contact-submit-btn"
                      style={{
                        background: status === 'sending' ? 'rgba(212,175,55,0.4)' : gold,
                        color: '#000000',
                        border: 'none', borderRadius: 50,
                        padding: '14px 32px',
                        fontSize: 14, fontWeight: 600,
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s ease',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = '#b89327'; }}
                      onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = gold; }}
                    >
                      {status === 'sending' ? 'Sending…' : 'Send message →'}
                    </button>

                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
