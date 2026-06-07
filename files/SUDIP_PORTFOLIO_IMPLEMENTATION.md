# Sudip Parajuli — Portfolio Redesign
## Complete Implementation Plan for Antigravity CLI

---

## 📹 VIDEO ANALYSIS

**File:** `Task-101650605-1-1.mp4`  
**Duration:** 10 seconds | **Resolution:** 1280×720 | **FPS:** 24 | **Total Frames:** 240

### Scene Breakdown (scroll sequence)

| Frame Range | Time | What's Happening |
|---|---|---|
| `frame_00–02` | 0–1s | **Hero face** — Photorealistic South Asian male face, front-on, calm expression. Warm taupe/greige background (`#b8aca0`). Clean, no effects yet. |
| `frame_03–06` | 1–3s | **Mesh begins forming** — Metallic silver dot-grid contour lines appear on forehead and cheeks. Face starts tilting slightly. Digital scan effect initializing. |
| `frame_07–10` | 3–5s | **Full mesh + cable burst** — Entire head covered in topographic silver sphere mesh. White braided cables begin erupting from the skull with glowing copper/amber tips. Chrome cube fragments scatter. |
| `frame_11–14` | 5–7s | **Cable explosion peak** — Camera tilts back, showing head from above-angle. Dense bundle of white cables radiates outward like fiber optic nerves. Copper tips glow warm orange. |
| `frame_15–18` | 7–9s | **Cable bundle / pull back** — Camera pulls back further. The cables sweep and coil. Face nearly gone — just the cable system visible. Dramatic abstract. |
| `frame_19` | 9–10s | **Final orb/fade** — Pure abstraction. White cable mass, ambient glow. |

### Key Visual Properties
- **Background color:** `#b8aca0` (warm greige — consistent throughout)
- **Mesh color:** Silver/chrome (`#c8c8c8`) with fine topographic contour lines
- **Cable color:** White braided (`#f0f0f0`) with copper LED tips (`#e8840a`)
- **Lighting:** Soft studio key light, warm fill, subtle rim on right
- **Mood:** Dark cinematic, premium, tech-futuristic

---

## 🗂 PROJECT STRUCTURE

```
portfolio/
├── public/
│   ├── frames/                    ← 20 WebP scroll frames (you have these!)
│   │   ├── frame_00.webp          ← Hero face (clean)
│   │   ├── frame_01.webp
│   │   ├── ...
│   │   └── frame_19.webp          ← Final cable orb
│   ├── hero_frame.png             ← High-res still for OG image / fallback
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── ScrollHero.tsx         ← The scroll-scrubbed frame sequence
│       ├── Navbar.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       └── Contact.tsx
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🚀 STEP-BY-STEP SETUP

### Step 1 — Clone and install

```bash
git clone https://github.com/sudip-parajuli/portfolio.git
cd portfolio
npm install

# Install required packages
npm install gsap @gsap/react lenis framer-motion
```

### Step 2 — Copy frames into project

```bash
# Copy all the WebP frames exported from your video
cp /path/to/scroll-frames/*.webp ./public/frames/
cp /path/to/scroll-frames/hero_frame.png ./public/
```

### Step 3 — Replace globals.css

**`src/app/globals.css`**
```css
:root {
  /* Light warm palette matching your video background */
  --bg-primary: #faf8f5;
  --bg-subtle: #f2efe9;
  --bg-card: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --text-muted: #999999;
  --border: #e5e1da;
  --accent: #1a1a1a;
  --copper: #e8840a;
  --hero-bg: #b8aca0;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
```

### Step 4 — layout.tsx

**`src/app/layout.tsx`**
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Sudip Parajuli — Fullstack Dev & AI Builder',
  description: 'Co-founder of DigiLoop. Building scalable systems and AI-powered products from Kathmandu.',
  openGraph: {
    images: ['/hero_frame.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## 🎬 CORE COMPONENT — ScrollHero.tsx

This is the most important component. It preloads all 20 frames and scrubs through them based on scroll position — exactly like the Jo Mendes site.

**`src/components/ScrollHero.tsx`**
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 20;
const FRAME_PATH = (n: number) =>
  `/frames/frame_${String(n).padStart(2, '0')}.webp`;

export default function ScrollHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ── Preload all frames ──────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          framesRef.current = images;
          drawFrame(0);
          setLoaded(true);
        }
      };
      images[i] = img;
    }
  }, []);

  // ── Draw a frame to canvas ──────────────────────────────────────────
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill canvas maintaining aspect ratio, cover style
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  // ── Scroll scrubbing ────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far through the sticky scroll are we? 0 → 1
      const scrolled = -rect.top;
      const scrollable = containerHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  // ── Canvas resize ───────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [loaded]);

  return (
    // Tall container creates scroll room (500vh = 5x viewport = smooth scrub)
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      
      {/* Sticky viewport — stays fixed while user scrolls */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#b8aca0',
      }}>
        {/* Loading overlay */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0, background: '#b8aca0',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', zIndex: 10,
            gap: 16,
          }}>
            <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
              <div style={{
                width: `${loadProgress}%`, height: '100%',
                background: '#e8840a', borderRadius: 2,
                transition: 'width 0.1s ease',
              }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: 2 }}>
              {loadProgress}%
            </span>
          </div>
        )}

        {/* Canvas — the scroll-scrubbed frame */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* ── Hero text overlay (visible on first frame) ── */}
        <div style={{
          position: 'absolute',
          left: '5%',
          bottom: '15%',
          zIndex: 2,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          {/* Available badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 20, padding: '4px 12px',
            marginBottom: 16,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#4ade80', display: 'block',
              boxShadow: '0 0 8px #4ade80',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, letterSpacing: 1 }}>
              AVAILABLE FOR WORK
            </span>
          </div>

          {/* Name badge */}
          <div style={{
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
            borderRadius: 4, padding: '6px 12px', display: 'inline-block',
            marginBottom: 20,
          }}>
            <span style={{ color: '#fff', fontSize: 13, letterSpacing: 1.5, fontWeight: 500 }}>
              SUDIP PARAJULI · FULLSTACK DEV & AI BUILDER
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: 16,
            maxWidth: 600,
          }}>
            Building systems<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>that scale.</em>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.55)', fontSize: 14,
            lineHeight: 1.7, maxWidth: 380,
          }}>
            Co-founder of DigiLoop. Crafting AI-powered backends,<br />
            sleek frontends, and pixel-perfect products from Kathmandu.
          </p>
        </div>

        {/* ── Right side metadata (like Jo Mendes site) ── */}
        <div style={{
          position: 'absolute', right: '4%', top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'right', zIndex: 2,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}>
          {[
            { label: 'CURRENTLY', value: 'Building DigiLoop v2' },
            { label: 'BASED IN', value: 'Kathmandu · Nepal' },
            { label: 'THIS WEEK', value: 'Django REST + Next.js 15' },
            { label: 'OPEN TO', value: 'Freelance · Full-time' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 24 }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>
                {item.label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll indicator ── */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease 0.6s',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: 3 }}>
            SCROLL TO EXPLORE
          </span>
          <div style={{
            width: 1, height: 40, background: 'rgba(255,255,255,0.2)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, width: '100%',
              height: '40%', background: 'rgba(255,255,255,0.6)',
              animation: 'scrollDot 1.5s ease-in-out infinite',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🧭 Navbar.tsx

**`src/components/Navbar.tsx`**
```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 20, left: '50%',
      transform: 'translateX(-50%)', zIndex: 100,
      background: scrolled ? 'rgba(20,20,20,0.85)' : 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 50, padding: '10px 24px',
      display: 'flex', gap: 32, alignItems: 'center',
      transition: 'background 0.3s ease',
    }}>
      {['Work', 'About', 'Skills', 'Contact'].map(item => (
        <Link key={item} href={`#${item.toLowerCase()}`} style={{
          color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
          fontSize: 14, fontWeight: 400,
          transition: 'color 0.2s ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
        >
          {item}
        </Link>
      ))}
    </nav>
  );
}
```

---

## 📄 page.tsx — Full Page Assembly

**`src/app/page.tsx`**
```tsx
import Navbar from '@/components/Navbar';
import ScrollHero from '@/components/ScrollHero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollHero />

      {/* Below-the-fold sections — light theme */}
      <div style={{ background: '#faf8f5' }}>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
```

---

## 🃏 Projects.tsx

**`src/components/Projects.tsx`**
```tsx
const PROJECTS = [
  {
    tag: 'E-Commerce',
    name: 'EasyMoto',
    desc: 'Bike rental platform with real-time availability, eSewa payment integration, and booking management.',
    stack: ['Django', 'PostgreSQL', 'React', 'Celery'],
    url: '#',
  },
  {
    tag: 'Machine Learning',
    name: 'Movie Recommendation API',
    desc: 'Content-based filtering engine using TF-IDF vectorization, built on FastAPI.',
    stack: ['FastAPI', 'Pandas', 'Scikit-learn', 'PostgreSQL'],
    url: '#',
  },
  {
    tag: 'Agency',
    name: 'DigiLoop',
    desc: 'Co-founded full-service digital agency. Lead developer, tech strategy, and client delivery.',
    stack: ['Next.js', 'GSAP', 'Vercel', 'Supabase'],
    url: 'https://digi-loop.vercel.app',
  },
  {
    tag: 'Real Estate',
    name: 'Property Listing Platform',
    desc: 'Modern listings platform with advanced filters, map view, and agent dashboard.',
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Leaflet'],
    url: '#',
  },
];

export default function Projects() {
  return (
    <section id="work" style={{ padding: '100px 5%', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: 11, color: '#999', letterSpacing: 2, textTransform: 'uppercase' }}>
          Selected work
        </span>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, letterSpacing: -1, marginTop: 8 }}>
          Things I've built
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {PROJECTS.map(p => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
            style={{
              background: '#fff', border: '1px solid #e5e1da',
              borderRadius: 16, padding: 24, textDecoration: 'none',
              display: 'block', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{
                background: '#f2efe9', color: '#888', fontSize: 10,
                padding: '3px 10px', borderRadius: 10,
              }}>{p.tag}</span>
              <span style={{ color: '#1a1a1a', fontSize: 18 }}>↗</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 500, color: '#1a1a1a', marginBottom: 8 }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.stack.map(s => (
                <span key={s} style={{
                  background: '#f5f3ef', color: '#555',
                  fontSize: 11, padding: '3px 10px', borderRadius: 8,
                }}>{s}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
```

---

## 💪 Skills.tsx

**`src/components/Skills.tsx`**
```tsx
const SKILLS = {
  'Backend': ['Django', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'Celery', 'REST APIs', 'GraphQL'],
  'Frontend': ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js'],
  'AI & ML': ['LangChain', 'RAG pipelines', 'OpenAI API', 'Scikit-learn', 'Vector DBs'],
  'DevOps': ['Docker', 'GitHub Actions', 'Vercel', 'Linux', 'Nginx'],
};

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '80px 5%', maxWidth: 1100, margin: '0 auto' }}>
      <span style={{ fontSize: 11, color: '#999', letterSpacing: 2, textTransform: 'uppercase' }}>
        Expertise
      </span>
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, letterSpacing: -1, margin: '8px 0 48px' }}>
        What I work with
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category}>
            <h3 style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', marginBottom: 16, letterSpacing: 0.5 }}>
              {category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {items.map(skill => (
                <span key={skill} style={{
                  background: '#fff', border: '1px solid #e5e1da',
                  borderRadius: 20, padding: '6px 14px',
                  fontSize: 12, color: '#444',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 📬 Contact.tsx

**`src/components/Contact.tsx`**
```tsx
export default function Contact() {
  return (
    <section id="contact" style={{ padding: '80px 5% 120px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{
        background: '#1a1a1a', borderRadius: 24,
        padding: 'clamp(40px, 6vw, 80px)', textAlign: 'center',
      }}>
        <span style={{ fontSize: 11, color: '#666', letterSpacing: 2, textTransform: 'uppercase' }}>
          Get in touch
        </span>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 400,
          color: '#fff', letterSpacing: -2, margin: '16px 0 12px',
        }}>
          Let's build something<br />
          <em style={{ color: '#666', fontStyle: 'italic' }}>together.</em>
        </h2>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 40, lineHeight: 1.7 }}>
          Available for freelance projects, full-time roles, and collaborations.<br />
          Currently co-building DigiLoop — a digital agency from Nepal.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:sudip@example.com" style={{
            background: '#fff', color: '#1a1a1a',
            padding: '12px 28px', borderRadius: 50,
            textDecoration: 'none', fontSize: 14, fontWeight: 500,
          }}>
            Send a message →
          </a>
          <a href="https://www.linkedin.com/in/sudip-parajuli-8073601a1" target="_blank"
            style={{
              background: 'transparent', color: '#666',
              border: '1px solid #333', padding: '12px 28px',
              borderRadius: 50, textDecoration: 'none', fontSize: 14,
            }}>
            LinkedIn
          </a>
          <a href="https://github.com/sudip-parajuli" target="_blank"
            style={{
              background: 'transparent', color: '#666',
              border: '1px solid #333', padding: '12px 28px',
              borderRadius: 50, textDecoration: 'none', fontSize: 14,
            }}>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## ⚙️ next.config.ts

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  // Serve WebP frames with aggressive caching
  async headers() {
    return [
      {
        source: '/frames/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 🎨 Add scroll animation CSS

Add to **`globals.css`**:
```css
@keyframes scrollDot {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(300%); }
}

/* Smooth transitions for all interactive elements */
a, button { transition: all 0.2s ease; }

/* Remove default focus ring, add custom */
:focus-visible {
  outline: 2px solid #e8840a;
  outline-offset: 2px;
}
```

---

## 🚢 Build & Deploy

```bash
# 1. Test locally
npm run dev
# → Open http://localhost:3000
# → Scroll to test the frame sequence

# 2. Build for production
npm run build

# 3. Push to GitHub (Vercel auto-deploys)
git add -A
git commit -m "feat: redesign - scroll-driven frame sequence hero, light theme"
git push origin main

# 4. If not on Vercel yet:
npx vercel --prod
```

---

## 🖼 FRAME FILES (20 WebP files to put in /public/frames/)

| File | Timestamp | Content |
|---|---|---|
| `frame_00.webp` | 0.0s | Hero face — clean, front-on, photorealistic |
| `frame_01.webp` | 0.5s | Face, slight warmth, pre-mesh |
| `frame_02.webp` | 1.0s | Mesh begins on forehead |
| `frame_03.webp` | 1.5s | Mesh spreading down cheeks |
| `frame_04.webp` | 2.0s | Face tilting, mesh half-formed |
| `frame_05.webp` | 2.5s | Mesh nearly full, cables starting |
| `frame_06.webp` | 3.0s | First cables burst from skull |
| `frame_07.webp` | 3.5s | Cables mid-eruption, cubes scattering |
| `frame_08.webp` | 4.0s | Full cable explosion, camera tilting back |
| `frame_09.webp` | 4.5s | Head from slight above, cables spread wide |
| `frame_10.webp` | 5.0s | Peak cable eruption, copper tips glowing |
| `frame_11.webp` | 5.5s | Cable bundle view, dramatic angle |
| `frame_12.webp` | 6.0s | Camera pulling back, cables sweep |
| `frame_13.webp` | 6.5s | Abstract cable mass |
| `frame_14.webp` | 7.0s | Cables beginning to coil |
| `frame_15.webp` | 7.5s | Cable orb forming |
| `frame_16.webp` | 8.0s | Orb nearly complete |
| `frame_17.webp` | 8.5s | Full cable orb, rotating |
| `frame_18.webp` | 9.0s | Orb with ambient glow |
| `frame_19.webp` | 9.5s | Final frame — pure abstraction |

---

## ✅ CHECKLIST

- [ ] Clone repo: `git clone https://github.com/sudip-parajuli/portfolio.git`
- [ ] `npm install gsap lenis framer-motion`
- [ ] Copy 20 WebP frames → `public/frames/`
- [ ] Copy `hero_frame.png` → `public/`
- [ ] Replace `globals.css` with light theme
- [ ] Replace `layout.tsx`
- [ ] Create `ScrollHero.tsx` (the main scroll component)
- [ ] Create `Navbar.tsx`
- [ ] Create `Projects.tsx`, `Skills.tsx`, `Contact.tsx`
- [ ] Replace `page.tsx`
- [ ] Update `next.config.ts` for frame caching
- [ ] Test scroll scrubbing on localhost
- [ ] `git push` → auto-deploy on Vercel

---

*Built for Sudip Parajuli — sudip-parajuli.com.np | DigiLoop — digi-loop.vercel.app*
