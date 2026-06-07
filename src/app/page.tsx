import Navbar        from '@/components/Navbar';
import ScrollHero    from '@/components/ScrollHero';
import Projects      from '@/components/Projects';
import Skills        from '@/components/Skills';
import Contact       from '@/components/Contact';
import Chatbot       from '@/components/Chatbot';
import SoundNarrator from '@/components/SoundNarrator';

export default function Home() {
  return (
    <>
      <SoundNarrator />
      <Navbar />
      {/* Canvas background + storytelling intro */}
      <ScrollHero />
      {/* Content sections — sit above the fixed canvas via z-index */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        padding: '28px 5%',
        background: 'rgba(251,249,244,0.95)',
        borderTop: '1px solid rgba(212, 175, 55, 0.18)',
        color: 'rgba(30,25,15,0.45)',
        fontSize: 12,
        letterSpacing: 0.5,
      }}>
        © {new Date().getFullYear()} Sudip Parajuli · Built with Next.js & ☕ from Kathmandu
      </footer>
      <Chatbot />
    </>
  );
}
