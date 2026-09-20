import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import Cursor from '../components/Cursor.jsx';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Now from '../components/Now.jsx';
import Work from '../components/Work.jsx';
import Experience from '../components/Experience.jsx';
import Education from '../components/Education.jsx';
import Skills from '../components/Skills.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  const progress = useRef(null);

  useGSAP(() => {
    gsap.to(progress.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  });

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener('load', refresh);
    document.fonts?.ready?.then(refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <>
      {/* Shared filters: outline a glyph's outer edge (text-stroke would expose Syne's overlapping contours) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="hollow-text" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="erode" radius="1.4" result="inner" />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>
        <filter id="hollow-text-thin" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="erode" radius="1" result="inner" />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>
      </svg>
      <div ref={progress} className="progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Now />
        <Work />
        <Experience />
        <Education />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
