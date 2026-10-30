'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 60;
const frameSrc = (n: number) => `/frames_v2/frame_${String(n).padStart(2, '0')}.webp`;

const SCENES = [
  {
    id: 'hero', headline: ['From ideas', 'to useful', 'em:products.'],
    subtitle: 'Software & AI Product Builder · Business Growth Consultant · Director at Techwired Solutions. I build products and help businesses grow through technology, strategy and marketing.',
    rightType: 'meta', rightItems: [
      { label: 'DIRECTOR', value: 'Techwired Solutions' },
      { label: 'BASED IN', value: 'Kathmandu · Nepal' },
      { label: 'FLAGSHIP PRODUCT', value: 'LinkyPot / OneQRCard' },
      { label: 'FOCUS', value: 'Software · AI · Automation' },
    ]
  },
  {
    id: 'about', headline: ['Curious mind.', 'Practical', 'em:builder.'],
    subtitle: 'I turn ideas into products people can use. As Director of Techwired Solutions and a Business Growth & Digital Strategy Consultant, I work across product development, business planning, websites, branding, advertising and digital operations.',
    rightType: 'stats', rightItems: [
      { label: 'APPROACH', value: 'Idea → usable product' },
      { label: 'EDUCATION', value: 'BCA · completed 2025' },
      { label: 'BUSINESS', value: 'Techwired Solutions' },
      { label: 'INTEREST', value: 'AI for agriculture' },
    ]
  },
  {
    id: 'journey', headline: ['Learning.', 'Building.', 'em:Growing.'],
    subtitle: 'A foundation in computer applications, practical business software and a growing interest in AI for Nepal’s agricultural communities.',
    rightType: 'timeline', rightItems: [
      { year: '2025', text: 'BCA completed · Tribhuvan University' },
      { year: 'Internship', text: 'Python / Django · Insight Workshop' },
      { year: 'Learned', text: 'Digital Marketing Bootcamp' },
      { year: 'Built', text: 'LinkyPot & business platforms' },
      { year: 'Exploring', text: 'Agriculture + AI through Krisearch' },
      { year: 'Testing', text: 'Dashain Cards on Google Play' },
    ]
  },
  {
    id: 'build-today', headline: ['Software.', 'AI.', 'em:Possibilities.'],
    subtitle: 'Improving the products I have built, connecting AI with useful workflows and bringing Dashain Cards from the web to Android.',
    rightType: 'culmination', rightItems: [
      { label: 'LINKYPOT', value: 'Digital identity & business pages' },
      { label: 'EASYMOTO', value: 'Rental business workflows' },
      { label: 'KRISEARCH', value: 'Agriculture & bilingual AI' },
      { label: 'DASHAIN CARDS', value: 'Google Play internal testing' },
      { label: 'TECHWIRED', value: 'Products & client solutions' },
    ]
  }
] as const;

export default function ScrollHero() {
  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef         = useRef<HTMLDivElement>(null);
  const sceneRefs         = useRef<(HTMLDivElement | null)[]>([]);
  const framesRef         = useRef<HTMLImageElement[]>([]);

  const [loaded, setLoaded]     = useState(false);
  const [progress, setProgress] = useState(0);

  // ── Draw frame with cross-blend ──────────────────────────────────
  const drawBlendedFrame = useCallback((base: number, next: number, alpha: number) => {
    const canvas = canvasRef.current;
    const imgB = framesRef.current[base];
    const imgN = framesRef.current[next];
    if (!canvas || !imgB?.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width, ch = canvas.height;
    const iw = imgB.naturalWidth  || 1280;
    const ih = imgB.naturalHeight || 720;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale, sh = ih * scale;
    const dx = (cw - sw) / 2, dy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.globalAlpha = 1.0;
    ctx.drawImage(imgB, dx, dy, sw, sh);
    if (imgN?.complete && alpha > 0) {
      ctx.globalAlpha = alpha;
      ctx.drawImage(imgN, dx, dy, sw, sh);
    }
    ctx.globalAlpha = 1.0;
  }, []);

  // ── Preload all frames ───────────────────────────────────────────
  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let done = 0;
    const onDone = () => {
      done++;
      setProgress(Math.round((done / TOTAL_FRAMES) * 100));
      if (done === TOTAL_FRAMES) {
        framesRef.current = imgs;
        drawBlendedFrame(0, 0, 0);
        setLoaded(true);
      }
    };
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = onDone;
      img.onerror = onDone;
      imgs[i] = img;
    }
  }, [drawBlendedFrame]);

  // ── Resize canvas ────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      if (loaded) {
        const scrolled   = window.scrollY;
        const scrollable = (storyContainerRef.current?.offsetHeight || window.innerHeight) - window.innerHeight;
        const pct        = Math.max(0, Math.min(1, scrolled / (scrollable || 1)));
        const floatFrame = pct * (TOTAL_FRAMES - 1);
        const base       = Math.floor(floatFrame);
        drawBlendedFrame(base, Math.min(TOTAL_FRAMES - 1, base + 1), floatFrame - base);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded, drawBlendedFrame]);

  // ── GSAP Storytelling Animations ─────────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    // 1. ScrollTrigger for canvas frame scrubbing:
    const trigger = ScrollTrigger.create({
      trigger: storyContainerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const floatFrame = self.progress * (TOTAL_FRAMES - 1);
        const base = Math.floor(floatFrame);
        const nxt = Math.min(TOTAL_FRAMES - 1, base + 1);
        drawBlendedFrame(base, nxt, floatFrame - base);
      }
    });

    // 2. Timeline for scene transitions — non-overlapping exit → gap → enter
    const N = SCENES.length;
    const seg = 1 / N; // 0.25 per scene for N=4

    // Set initial hidden states for all scenes except hero
    for (let s = 1; s < N; s++) {
      const el = sceneRefs.current[s];
      if (!el) continue;
      gsap.set(el, { opacity: 0, pointerEvents: 'none' });
      const left  = el.querySelector('.scene-left')  as HTMLElement | null;
      const right = el.querySelector('.scene-right') as HTMLElement | null;
      if (left)  gsap.set(left,  { y: 90,  opacity: 0 });
      if (right) gsap.set(right, { x: 160, opacity: 0 });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    SCENES.forEach((_, i) => {
      const sceneEl = sceneRefs.current[i];
      if (!sceneEl) return;
      const leftEl  = sceneEl.querySelector('.scene-left')  as HTMLElement | null;
      const rightEl = sceneEl.querySelector('.scene-right') as HTMLElement | null;

      const segStart = i * seg;

      // ── EXIT (scenes 0 → N-2): start at 58% of segment, done by 90% ──
      if (i < N - 1) {
        const exitAt  = segStart + seg * 0.58; // exit starts here
        const exitDur = seg * 0.28;             // takes 28% of segment

        if (leftEl) {
          tl.to(leftEl,
            { y: -260, opacity: 0, duration: exitDur, ease: 'power2.in' },
            exitAt
          );
        }
        if (rightEl) {
          tl.to(rightEl,
            { x: 180, opacity: 0, duration: exitDur, ease: 'power2.in' },
            exitAt
          );
        }
        // Hide the scene container only AFTER content has slid out
        tl.to(sceneEl,
          { opacity: 0, pointerEvents: 'none', duration: 0.001 },
          exitAt + exitDur + 0.001
        );
      }

      // ── ENTRANCE (scenes 1 → N-1): start right at segment boundary ──
      if (i > 0) {
        const enterAt  = segStart;          // enters exactly when segment begins
        const enterDur = seg * 0.25;        // 25% of segment to slide in

        // Snap scene container to visible
        tl.to(sceneEl,
          { opacity: 1, pointerEvents: 'all', duration: 0.001 },
          enterAt
        );
        if (leftEl) {
          tl.fromTo(leftEl,
            { y: 90, opacity: 0 },
            { y: 0, opacity: 1, duration: enterDur, ease: 'power3.out' },
            enterAt
          );
        }
        if (rightEl) {
          tl.fromTo(rightEl,
            { x: 160, opacity: 0 },
            { x: 0, opacity: 1, duration: enterDur + seg * 0.04, ease: 'power3.out' },
            enterAt + seg * 0.03  // right panel enters 3% after left for slight stagger
          );
        }
      }
    });

    // 3. Scroll indicator exit:
    gsap.to(scrollRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: storyContainerRef.current,
        start: 'top top',
        end: '8% top',
        scrub: true,
      }
    });

    // 4. Staggered load animation on first load (only if scroll is at 0):
    if (window.scrollY === 0) {
      const heroEl = sceneRefs.current[0];
      if (heroEl) {
        const badgeEl = heroEl.querySelector('.hero-badge');
        const h1El    = heroEl.querySelector('h1');
        const subEl   = heroEl.querySelector('p');
        const rightEl = heroEl.querySelector('.scene-right');

        gsap.set([badgeEl, subEl, rightEl], { opacity: 0 });
        const lines = h1El?.querySelectorAll('.hero-line');
        if (lines?.length) {
          gsap.set(lines, { y: 80, opacity: 0 });
          gsap.to(lines, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.25 });
        }

        gsap.fromTo(badgeEl, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.1 });
        gsap.fromTo(subEl, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.55 });
        gsap.fromTo(rightEl, { x: 120, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: 'power4.out', delay: 0.6 });
        gsap.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7, delay: 1.2 });
      }
    }

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, [loaded, drawBlendedFrame]);

  return (
    <>
      {/* ─── Loading screen ───────────────────────────────────────── */}
      {!loaded && (
        <div style={{
          position: 'fixed', inset: 0,
          background: '#0a0a0a',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          zIndex: 200, gap: 18,
        }}>
          <div style={{ fontSize: 10, color: 'rgba(212,175,55,0.45)', letterSpacing: 5 }}>
            SUDIP PARAJULI
          </div>
          <div style={{ width: 220, height: 1, background: 'rgba(212,175,55,0.1)' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#d4af37', transition: 'width 0.12s ease' }} />
          </div>
          <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: 10, letterSpacing: 3 }}>{progress}%</span>
        </div>
      )}

      {/* ─── Storytelling Pinned Section Wrapper ──────────────────── */}
      <div ref={storyContainerRef} style={{ height: '400vh', position: 'relative' }}>
        
        {/* Invisible anchors for Navbar scroll navigation */}
        <div id="hero" style={{ position: 'absolute', top: 0, height: 1 }} />
        <div id="about" style={{ position: 'absolute', top: '100vh', height: 1 }} />
        <div id="journey" style={{ position: 'absolute', top: '200vh', height: 1 }} />

        {/* ─── Sticky viewport element ────────────────────────────── */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}>
          
          {/* Fixed Background Canvas */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              zIndex: 0,
              display: 'block',
              background: '#0a0a0a',
            }}
          />

          {/* Left Gradient Overlay for text contrast */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.5) 100%)',
          }} />

          {/* Stacked Interactive Overlay Scenes */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            {SCENES.map((scene, idx) => {
              const Heading = idx === 0 ? 'h1' : 'h2';
              return (
              <div
                key={scene.id}
                ref={el => { sceneRefs.current[idx] = el; }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 8%',
                  opacity: idx === 0 ? 1 : 0,
                  pointerEvents: idx === 0 ? 'all' : 'none',
                }}
              >
                {/* ── LEFT CONTENT ── */}
                <div className="scene-left" style={{ maxWidth: 560 }}>
                  
                  {/* Scene-specific top badge */}
                  {scene.id === 'hero' ? (
                    <div className="hero-badge" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(212,175,55,0.35)',
                        borderRadius: 50, padding: '7px 18px',
                      }}>
                        <span style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: '#d4af37', display: 'block',
                          animation: 'pulse 2s ease infinite',
                        }} />
                        <span style={{ color: '#d4af37', fontSize: 11, letterSpacing: 1.5, fontWeight: 500 }}>
                          AVAILABLE FOR WORK
                        </span>
                      </span>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center',
                        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 50, padding: '7px 18px',
                        color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: 1.5,
                      }}>
                        SUDIP PARAJULI · PRODUCT BUILDER
                      </span>
                    </div>
                  ) : (
                    <span className="hero-badge" style={{
                      fontSize: 10, color: '#d4af37', letterSpacing: 2.5,
                      textTransform: 'uppercase', display: 'block', fontWeight: 600, marginBottom: 18,
                    }}>
                      {scene.id === 'about' ? 'About Me' : scene.id === 'journey' ? "The Builder's Story" : 'Build Today'}
                    </span>
                  )}

                  {/* Staggered headline lines */}
                  <Heading
                    style={{
                      fontSize: 'clamp(38px, 5.8vw, 76px)',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.07,
                      letterSpacing: '-2.5px',
                      marginBottom: 24,
                      overflow: 'hidden',
                    }}
                  >
                    {scene.headline.map((line, lidx) => {
                      const isItalic = line.startsWith('em:');
                      const cleanLine = isItalic ? line.replace('em:', '') : line;
                      return (
                        <span key={lidx} className="hero-line" style={{ display: 'block', overflow: 'hidden' }}>
                          <span style={{ display: 'block' }}>
                            {isItalic ? (
                              <em style={{ fontStyle: 'italic', color: '#d4af37' }}>{cleanLine}</em>
                            ) : (
                              cleanLine
                            )}
                          </span>
                        </span>
                      );
                    })}
                  </Heading>

                  {/* Subtitle text */}
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.92)',
                      fontSize: 15,
                      lineHeight: 1.85,
                      maxWidth: 460,
                    }}
                  >
                    {scene.subtitle}
                  </p>
                  {scene.id === 'hero' && <div className="hero-actions"><a href="#work">Explore selected work ↗</a><a href="#contact">Let’s talk</a></div>}
                </div>

                {/* ── RIGHT METADATA PANEL ── */}
                <div className="scene-right" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-end' }}>
                  
                  {scene.rightType === 'meta' && (scene.rightItems as readonly { readonly label: string; readonly value: string }[]).map(({ label, value }) => (
                    <div key={label} style={{ textAlign: 'right' }}>
                      <div style={{
                        color: '#d4af37', fontSize: 10,
                        letterSpacing: 2, fontWeight: 600,
                        textTransform: 'uppercase', marginBottom: 5,
                      }}>
                        {label}
                      </div>
                      <div style={{
                        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8, padding: '6px 14px',
                        color: '#ffffff', fontSize: 13, letterSpacing: 0.3,
                        display: 'inline-block',
                      }}>
                        {value}
                      </div>
                    </div>
                  ))}

                  {scene.rightType === 'stats' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right', minWidth: 220 }}>
                      {(scene.rightItems as readonly { readonly label: string; readonly value: string }[]).map(({ label, value }) => (
                        <div
                          key={label}
                          style={{
                            padding: '12px 0',
                            borderBottom: '1px solid rgba(212,175,55,0.18)',
                          }}
                        >
                          <div style={{
                            fontSize: 34, fontWeight: 200, letterSpacing: '-1.5px',
                            color: '#d4af37', lineHeight: 1, marginBottom: 2,
                          }}>
                            {value}
                          </div>
                          <div style={{ fontSize: 11, color: '#ffffff', fontWeight: 500, letterSpacing: 0.5 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {scene.rightType === 'timeline' && (
                    <div style={{
                      display: 'flex', flexDirection: 'column', gap: 18,
                      textAlign: 'left', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
                      padding: '28px 32px', maxWidth: 380,
                    }}>
                      {(scene.rightItems as readonly { readonly year: string; readonly text: string }[]).map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 6px #d4af37' }} />
                            {idx < (scene.rightItems as readonly { readonly year: string; readonly text: string }[]).length - 1 && (
                              <div style={{ width: 1, height: 24, background: 'rgba(212,175,55,0.25)', margin: '3px 0' }} />
                            )}
                          </div>
                          <div>
                            <span style={{ color: '#d4af37', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>{item.year}</span>
                            <div style={{ color: '#ffffff', fontSize: 13.5, fontWeight: 400, lineHeight: 1.45 }}>{item.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {scene.rightType === 'culmination' && (scene.rightItems as readonly { readonly label: string; readonly value: string }[]).map(({ label, value }) => (
                    <div key={label} style={{ textAlign: 'right' }}>
                      <div style={{
                        color: '#d4af37', fontSize: 10,
                        letterSpacing: 2, fontWeight: 600,
                        textTransform: 'uppercase', marginBottom: 5,
                      }}>
                        {label}
                      </div>
                      <div style={{
                        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 8, padding: '6px 14px',
                        color: '#ffffff', fontSize: 13, letterSpacing: 0.3,
                        display: 'inline-block',
                      }}>
                        {value}
                      </div>
                    </div>
                  ))}

                </div>

              </div>
              );
            })}
          </div>

          {/* ── SCROLL TO EXPLORE INDICATOR ── */}
          <div
            ref={scrollRef}
            style={{
              position: 'absolute', bottom: 30, left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              opacity: 0,
              zIndex: 2,
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: 3 }}>
              SCROLL TO EXPLORE
            </span>
            <div style={{ width: 1, height: 48, background: 'rgba(212,175,55,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '40%',
                background: '#d4af37',
                animation: 'scrollDot 1.8s ease-in-out infinite',
              }} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
