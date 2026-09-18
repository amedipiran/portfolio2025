import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { scrollTo } from '../lib/lenis';
import { profile } from '../data/profile';
import MagneticButton from './MagneticButton.jsx';
import './Contact.css';

function useLocalTime(timeZone) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export default function Contact() {
  const root = useRef(null);
  const title = useRef(null);
  const time = useLocalTime(profile.timezone);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      const split = SplitText.create(title.current, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 110,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.04,
            scrollTrigger: { trigger: title.current, start: 'top 85%', once: true },
          }),
      });

      gsap.from('.contact__row > *, .contact__meta > *', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        scrollTrigger: { trigger: '.contact__row', start: 'top 90%', once: true },
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <footer ref={root} id="contact" className="contact">
      <div className="container">
        <p className="label">
          <span className="idx">07</span>Contact
        </p>

        <h2 ref={title} className="contact__title">
          Let’s build something that <span className="serif-italic">pays for itself.</span>
        </h2>

        <div className="contact__row">
          <MagneticButton>
            <a href={`mailto:${profile.email}`} className="btn btn--solid contact__mail" data-cursor="hover">
              {profile.email} <span className="arrow">↗</span>
            </a>
          </MagneticButton>

          <ul className="contact__links">
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="link-underline" data-cursor="hover">
                LinkedIn <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="link-underline" data-cursor="hover">
                GitHub <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </div>

        <div className="contact__meta label">
          <span>© {year} {profile.name}</span>
          <span>
            Norrköping <span className="contact__time">{time}</span> local
          </span>
          <span className="contact__built">Built with React, GSAP & Lenis</span>
          <button className="contact__top" onClick={() => scrollTo(0)} data-cursor="hover" aria-label="Back to top">
            Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
