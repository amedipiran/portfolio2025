import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { profile } from '../data/profile';
import SectionHead from './SectionHead.jsx';
import './About.css';

const FACTS = [
  ['Based in', 'Norrköping, Sweden'],
  ['Currently', 'AI & Automation Developer, Cyntora'],
  ['Education', 'BSc Computer Science, Mid Sweden University'],
  ['Focus', 'Agents, integrations, reporting, clean architecture'],
  ['Member', 'Active member of Mensa'],
];

export default function About() {
  const root = useRef(null);
  const statement = useRef(null);

  useGSAP(
    () => {
      // Word-by-word reading effect tied to scroll
      const split = SplitText.create(statement.current, {
        type: 'words',
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.04,
              ease: 'none',
              scrollTrigger: { trigger: statement.current, start: 'top 72%', end: 'bottom 45%', scrub: 0.6 },
            }
          ),
      });

      // Facts rows
      gsap.from('.about__fact', {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: { trigger: '.about__facts', start: 'top 80%', once: true },
      });

      // Counters
      gsap.utils.toArray('.about__stat').forEach((el) => {
        const num = el.querySelector('.about__stat-num');
        const target = Number(num.dataset.value);
        const suffix = num.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            num.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="section about">
      <div className="container">
        <SectionHead index="01" label="About">
          A software engineer who <span className="serif-italic">builds things end to end.</span>
        </SectionHead>

        <p ref={statement} className="about__statement">
          {profile.about.join(' ')}
        </p>

        <div className="about__grid">
          <ul className="about__facts">
            {FACTS.map(([k, v]) => (
              <li key={k} className="about__fact">
                <span className="label">{k}</span>
                <span className="about__fact-val">{v}</span>
              </li>
            ))}
          </ul>

          <div className="about__stats">
            {profile.stats.map((s) => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-num" data-value={s.value} data-suffix={s.suffix}>
                  0{s.suffix}
                </span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
