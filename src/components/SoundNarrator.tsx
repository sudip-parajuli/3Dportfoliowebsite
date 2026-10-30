'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const SECTIONS = [
  {
    id: 'hero',
    name: 'Introduction',
    text: "Welcome. I am Sudip Parajuli, a software and AI product builder, Business Growth and Digital Strategy Consultant, and Director of Techwired Solutions, a registered business in Budhanilkantha Municipality. I build products and help businesses grow through technology, strategy and marketing."
  },
  {
    id: 'about',
    name: 'About Me',
    text: "I turn what if into products people can use. My interests connect software development, AI, automation, entrepreneurship and agriculture."
  },
  {
    id: 'journey',
    name: 'The Journey',
    text: "I completed my Bachelor of Computer Applications at Araniko Multiple Campus, Tribhuvan University, in 2025. I completed a three month Python and Django backend development internship at Insight Workshop, and a Digital Marketing Bootcamp with a certificate provided by Budhanilkantha Municipality."
  },
  {
    id: 'build',
    name: 'Current Focus',
    text: "My current focus is improving useful products, exploring agriculture and AI through Krisearch, and testing Dashain Cards for Android. Dashain Cards is currently in Google Play internal testing."
  },
  {
    id: 'work',
    name: 'Projects',
    text: "My selected projects include LinkyPot, EasyMoto, Dashain Cards, Krisearch, ChillPill Gaming Cafe, GharBari, Gym Engine and StayWired hotel management SaaS. StayWired has a public interactive demo separate from live hotel operations."
  },
  {
    id: 'client-work',
    name: 'Business and Client Work',
    text: "My consulting work with EasyMoto and ChillPill covers business planning, marketing, advertising and digital operations. I have also worked on websites and digital presence for Amicus Institute of Law, Aryal Farm and KhelHub Nepal. A smaller collection contains independent website redesign concepts."
  },
  {
    id: 'skills',
    name: 'Skills & Stack',
    text: "My tools include Python, Django, Django REST Framework, Next.js, React, TypeScript, Supabase and PostgreSQL. I also work with AI integrations and AI-assisted development."
  },
  {
    id: 'contact',
    name: 'Contact',
    text: "For product collaborations, business websites or automation projects, use the contact form or email sparajuli802 at gmail dot com. Thank you for visiting."
  }
];

export default function SoundNarrator() {
  const [prompted, setPrompted]     = useState(false);
  const [active, setActive]         = useState(false);
  const [playing, setPlaying]       = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeRef = useRef(active);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  // Show opt-in prompt after 2s on first load
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setPrompted(true);
      }
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const stopTour = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
    setActive(false);
    setCurrentIndex(0);
  };

  const getVoice = useCallback((synth: SpeechSynthesis) => {
    const voices = synth.getVoices();
    
    // 1. Look for English (India) male voice
    let voice = voices.find(v => 
      v.lang.toLowerCase().replace('_', '-').startsWith('en-in') && 
      (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('prabhat') || v.name.toLowerCase().includes('rishi'))
    );
    if (voice) return voice;

    // 2. Look for English (India) any voice
    voice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith('en-in'));
    if (voice) return voice;

    // 3. Look for standard English male voices
    voice = voices.find(v => 
      v.lang.toLowerCase().startsWith('en') && 
      (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('mark') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('james'))
    );
    if (voice) return voice;

    // 4. Any English voice
    return voices.find(v => v.lang.toLowerCase().startsWith('en')) || null;
  }, []);

  const speakSection = useCallback((idx: number) => {
    if (typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const section = SECTIONS[idx];
    if (!section) return;

    const utterance = new SpeechSynthesisUtterance(section.text);
    utterance.rate = 0.94;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voice = getVoice(synth);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setPlaying(true);
    };

    utterance.onend = () => {
      setPlaying(false);
      // Wait 1.5s, then advance to the next section automatically
      setTimeout(() => {
        if (activeRef.current && currentIndexRef.current === idx) {
          if (idx < SECTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            stopTour();
          }
        }
      }, 1500);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setPlaying(false);
    };

    synth.speak(utterance);
  }, [getVoice]);

  // Handle section progression
  useEffect(() => {
    if (!active) return;

    // 1. Scroll smoothly to the current section element
    const section = SECTIONS[currentIndex];
    if (section) {
      if (section.id === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else if (section.id === 'about') {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      } else if (section.id === 'journey') {
        window.scrollTo({
          top: window.innerHeight * 2,
          behavior: 'smooth',
        });
      } else if (section.id === 'build') {
        window.scrollTo({
          top: window.innerHeight * 3,
          behavior: 'smooth',
        });
      } else {
        const el = document.getElementById(section.id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top: y,
            behavior: 'smooth',
          });
        }
      }
    }

    // 2. Wait for scroll animation to settle before narrating
    const t = setTimeout(() => {
      if (activeRef.current) {
        speakSection(currentIndex);
      }
    }, 950);

    return () => clearTimeout(t);
  }, [currentIndex, active, speakSection]);

  // Stop tour if user manually scrolls or interacts
  useEffect(() => {
    const handleUserInteracted = () => {
      if (activeRef.current) {
        stopTour();
      }
    };

    window.addEventListener('wheel', handleUserInteracted, { passive: true });
    window.addEventListener('touchmove', handleUserInteracted, { passive: true });
    window.addEventListener('mousedown', handleUserInteracted, { passive: true });
    window.addEventListener('keydown', handleUserInteracted, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteracted);
      window.removeEventListener('touchmove', handleUserInteracted);
      window.removeEventListener('mousedown', handleUserInteracted);
      window.removeEventListener('keydown', handleUserInteracted);
    };
  }, []);

  const togglePlayPause = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      if (synth.paused) {
        synth.resume();
        setPlaying(true);
      } else {
        synth.pause();
        setPlaying(false);
      }
    } else {
      speakSection(currentIndex);
    }
  };

  const skipNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      stopTour();
    }
  };

  if (!prompted) return null;

  return (
    <>
      {/* Opt-in modal */}
      {!active && prompted && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
          animation: 'fadeUp 0.4s ease',
        }}>
          <div style={{
            background: 'rgba(15,15,15,0.94)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 24, padding: '40px 36px',
            maxWidth: 420, width: '100%', textAlign: 'center',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎙️</div>
            <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 400, letterSpacing: -0.5, marginBottom: 12 }}>
              Experience with narration?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
              Let me narrate my portfolio for you! I will guide you through my projects and journey, scrolling the website automatically as I speak.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setActive(true); setPrompted(false); }} style={{
                background: '#d4af37', color: '#000000', border: 'none',
                borderRadius: 50, padding: '13px 28px', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#b89327'}
              onMouseLeave={e => e.currentTarget.style.background = '#d4af37'}>
                🎧 Yes, start audio tour
              </button>
              <button onClick={() => setPrompted(false)} style={{
                background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 50, padding: '13px 28px', fontSize: 14,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio control bar */}
      {active && (
        <div style={{
          position: 'fixed', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          background: 'rgba(15,15,15,0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: 50,
          padding: '10px 24px',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          animation: 'fadeUp 0.3s ease',
        }}>
          <span style={{ color: '#d4af37', fontSize: 11, letterSpacing: 1.5, fontWeight: 500, whiteSpace: 'nowrap' }}>
            NARRATING: {SECTIONS[currentIndex].name.toUpperCase()}
          </span>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
          
          {/* Play / Pause */}
          <button onClick={togglePlayPause} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16, padding: 0 }} title={playing ? "Pause" : "Play"}>
            {playing ? '⏸' : '▶'}
          </button>

          {/* Skip Next */}
          <button onClick={skipNext} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 16, padding: 0 }} title="Skip Section">
            ⏭
          </button>

          {/* Stop */}
          <button onClick={stopTour} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 14, padding: 0 }} title="Exit Tour">
            ✕
          </button>
        </div>
      )}
    </>
  );
}
