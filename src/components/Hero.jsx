import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, SplitText, useGSAP, reducedMotion } from '../lib/gsap';
import { scrollTo } from '../lib/lenis';
import { profile } from '../data/profile';
import HeroCanvas from './HeroCanvas.jsx';
import Marquee from './Marquee.jsx';
import MagneticButton from './MagneticButton.jsx';
import './Hero.css';

const TICKER = [
  'AI agents',
  'Automation',
  'Integrations',
  'Claude',
  'MCP',
  'Windmill',
  'GoHighLevel',
  'Cloudflare',
  'Reporting',
  'Outreach',
  'TypeScript',
  'Python',
];

export default function Hero() {
  const root = useRef(null);
  const title = useRef(null);
  const inner = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      const still = reducedMotion();
      let cancelled = false;
      let splits = [];

      // Shrink the title lines until each fits on one line (fonts must be loaded first)
      const fitLines = () => {
        const lines = title.current.querySelectorAll('.hero__line');
        const max = title.current.clientWidth;
        lines.forEach((line) => {
          line.style.fontSize = '';
          let size = parseFloat(getComputedStyle(line).fontSize);
          let guard = 0;
          while (line.scrollWidth > max && guard < 40) {
            size *= 0.96;
            line.style.fontSize = `${size}px`;
            guard += 1;
          }
        });
      };

      const intro = contextSafe(() => {
        if (cancelled) return;
        fitLines();

        const roleSplit = SplitText.create('.hero__role', { type: 'lines', mask: 'lines' });
        const introSplit = SplitText.create('.hero__intro', { type: 'lines', mask: 'lines' });
        const titleSplit = SplitText.create(title.current, { type: 'lines,chars', mask: 'lines' });
        splits = [roleSplit, introSplit, titleSplit];

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 });
        tl.from('.hero__canvas', { opacity: 0, scale: 1.15, duration: 2.2, ease: 'power2.out' }, 0)
          .from(titleSplit.chars, { yPercent: 115, duration: 1.3, stagger: { each: 0.028, from: 'start' } }, 0.1)
          .from('.hero__top > *', { y: 14, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.5)
          .from(roleSplit.lines, { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.75)
          .from(introSplit.lines, { yPercent: 110, opacity: 0, duration: 1, stagger: 0.07 }, 0.95)
          .from('.hero__cta > *', { y: 18, opacity: 0, duration: 0.9, stagger: 0.08 }, 1.1)
          .from('.hero__foot', { opacity: 0, y: 10, duration: 1 }, 1.25);

        if (still) tl.progress(1);
      });

      gsap.set(title.current, { visibility: 'hidden' });
      (document.fonts?.ready ?? Promise.resolve()).then(() => {
        gsap.set(title.current, { visibility: 'visible' });
        intro();
      });

      const onResize = () => fitLines();
      window.addEventListener('resize', onResize);

      // Scroll: content drifts up and fades while the canvas zooms
      gsap.to(inner.current, {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__canvas', {
        scale: 1.2,
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Pointer parallax on the title
      if (!still && window.matchMedia('(pointer: fine)').matches) {
        const xTo = gsap.quickTo(title.current, 'x', { duration: 0.8, ease: 'power3.out' });
        const yTo = gsap.quickTo(title.current, 'y', { duration: 0.8, ease: 'power3.out' });
        const onMove = (e) => {
          const nx = (e.clientX / window.innerWidth) * 2 - 1;
          const ny = (e.clientY / window.innerHeight) * 2 - 1;
          xTo(nx * -14);
          yTo(ny * -8);
        };
        root.current.addEventListener('pointermove', onMove, { passive: true });
      }

      return () => {
        cancelled = true;
        window.removeEventListener('resize', onResize);
        splits.forEach((sp) => sp.revert());
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="hero" className="hero">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="hollow-text" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="erode" radius="1.4" result="inner" />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>
      </svg>
      <HeroCanvas className="hero__canvas" />
      <div className="hero__vignette" aria-hidden="true" />

      <div ref={inner} className="hero__inner container">
        <div className="hero__top label">
          <span>{profile.name}</span>
          <span className="hero__top-mid">{profile.location}</span>
          <span className="hero__top-status">
            <i className="hero__dot" /> {profile.availability}
          </span>
        </div>

        <h1 ref={title} className="hero__title display-xl">
          <span className="hero__line outline-text">Roberto</span>
          <span className="hero__line">
            Piran <span className="outline-text">Amedi</span>
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__role">
            <span className="serif-italic">AI &amp; automation</span> developer
            <br />
            at <span className="hero__company">Cyntora</span>
          </p>

          <div className="hero__side">
            <p className="hero__intro">{profile.heroIntro}</p>
            <div className="hero__cta">
              <MagneticButton>
                <a href="#work" className="btn btn--solid" data-cursor="hover" onClick={(e) => { e.preventDefault(); scrollTo('#work'); }}>
                  See the work <span className="arrow">↗</span>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="#now" className="btn" data-cursor="hover" onClick={(e) => { e.preventDefault(); scrollTo('#now'); }}>
                  What I do at Cyntora
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__foot">
        <button className="hero__scroll label" onClick={() => scrollTo('#about')} data-cursor="hover">
          <ArrowDown size={14} className="hero__scroll-icon" /> Scroll
        </button>
        <Marquee
          className="hero__marquee"
          items={TICKER}
          speed={60}
          render={(item, i) => (
            <span key={i} className="hero__tick">
              {item}
              <i className="hero__tick-sep" />
            </span>
          )}
        />
      </div>
    </section>
  );
}
