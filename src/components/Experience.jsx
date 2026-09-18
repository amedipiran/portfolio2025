import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import experience from '../data/experience.json';
import placements from '../data/placements.json';
import SectionHead from './SectionHead.jsx';
import './Experience.css';

export default function Experience() {
  const root = useRef(null);
  const list = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.xp__line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
        }
      );

      gsap.utils.toArray('.xp__item').forEach((item) => {
        gsap.from(item, {
          y: 36,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        });
      });

      gsap.from('.xp__place', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        scrollTrigger: { trigger: '.xp__placements', start: 'top 85%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="section xp">
      <div className="container">
        <SectionHead index="04" label="Experience">
          Where I’ve <span className="serif-italic">worked.</span>
        </SectionHead>

        <div className="xp__layout">
          <aside className="xp__aside">
            <p className="xp__years display-lg">
              2011<span className="serif-italic">→</span>now
            </p>
            <p className="xp__aside-text">
              Fifteen years of showing up, from factory floors and youth work to building software that runs an agency.
            </p>
          </aside>

          <ol ref={list} className="xp__list">
            <span className="xp__line" aria-hidden="true">
              <span className="xp__line-fill" />
            </span>
            {experience.map((job) => (
              <li key={job.title + job.start} className={`xp__item ${job.current ? 'is-current' : ''}`}>
                <div className="xp__dates label">
                  {job.start} — {job.end}
                  {job.current && <span className="xp__now">Now</span>}
                </div>
                <div className="xp__body">
                  <h3 className="xp__role">{job.title}</h3>
                  <p className="xp__company">
                    {job.company} <span className="xp__loc">· {job.location}</span>
                  </p>
                  <ul className="xp__bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="xp__placements">
          <p className="label">
            <span className="idx">//</span>Internships & placements
          </p>
          <div className="xp__place-grid">
            {placements.map((p) => (
              <div key={p.title} className="xp__place">
                <span className="label">{p.duration}</span>
                <h4 className="xp__place-title">{p.title}</h4>
                <p className="xp__company">
                  {p.company} <span className="xp__loc">· {p.location}</span>
                </p>
                <p className="xp__place-text">{p.bullets[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
