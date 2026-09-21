import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { scrollTo, getLenis } from '../lib/lenis';
import { profile } from '../data/profile';
import MagneticButton from './MagneticButton.jsx';
import './Nav.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'now', label: 'Now' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const root = useRef(null);
  const overlay = useRef(null);
  const logo = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    // The open menu pauses Lenis, and a paused Lenis ignores scrollTo.
    // Resume it before scrolling instead of waiting for the close effect.
    getLenis()?.start();
    scrollTo(`#${id}`, { offset: 0, force: true });
  };

  // Intro + hide-on-scroll + active section tracking
  useGSAP(
    () => {
      gsap.from('.nav__inner > *', {
        y: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        delay: 0.9,
        ease: 'expo.out',
      });

      const show = gsap.quickTo(root.current, 'yPercent', { duration: 0.5, ease: 'power3.out' });
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 160;
          show(hide ? -120 : 0);
          root.current.classList.toggle('nav--scrolled', self.scroll() > 40);
        },
      });

      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActive(id),
        });
      });
    },
    { scope: root }
  );

  // Logo scramble
  useGSAP(
    () => {
      const el = logo.current;
      const onEnter = () =>
        gsap.to(el, {
          duration: 0.7,
          scrambleText: { text: profile.short, chars: 'lowerCase', speed: 0.7 },
        });
      el.addEventListener('mouseenter', onEnter);
      return () => el.removeEventListener('mouseenter', onEnter);
    },
    { scope: root }
  );

  // Mobile overlay
  useEffect(() => {
    const lenis = getLenis();
    const links = overlay.current.querySelectorAll('.nav__overlay-link');
    const meta = overlay.current.querySelectorAll('.nav__overlay-meta > *');
    if (open) {
      lenis?.stop();
      gsap.timeline()
        .set(overlay.current, { pointerEvents: 'auto' })
        .to(overlay.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.inOut' })
        .from(links, { yPercent: 110, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, '-=0.45')
        .from(meta, { opacity: 0, y: 10, stagger: 0.05, duration: 0.6 }, '-=0.5');
    } else {
      lenis?.start();
      gsap.timeline()
        .to(overlay.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' })
        .set(overlay.current, { pointerEvents: 'none' });
    }
  }, [open]);

  return (
    <>
      <header ref={root} className="nav">
        <div className="nav__inner container">
          <a href="#hero" className="nav__logo" onClick={go('hero')} data-cursor="hover">
            <span ref={logo}>{profile.short}</span>
            <span className="nav__dot">.</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={go(id)}
                className={`nav__link ${active === id ? 'is-active' : ''}`}
                data-cursor="hover"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <span className="nav__status label">
              <i className="nav__pulse" />
              {profile.availability}
            </span>
            <MagneticButton>
              <a href={`mailto:${profile.email}`} className="btn nav__cta" data-cursor="hover">
                Let’s talk
              </a>
            </MagneticButton>
            <button
              className={`nav__burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              data-cursor="hover"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div ref={overlay} className="nav__overlay" data-lenis-prevent>
        <div className="nav__overlay-inner container">
          <ul className="nav__overlay-list">
            {LINKS.map(({ id, label }, i) => (
              <li key={id} className="nav__overlay-item">
                <a href={`#${id}`} onClick={go(id)} className="nav__overlay-link">
                  <span className="nav__overlay-idx">0{i + 1}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__overlay-meta label">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
