import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import courses from '../data/education.json';
import SectionHead from './SectionHead.jsx';
import './Education.css';

const DEGREE_URL = 'https://www.miun.se/utbildning/program/programvaruteknik2/?lang=en-GB';

function Semester({ semester, items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const content = useRef(null);
  const credits = items.reduce((a, c) => a + Number(c.credits || 0), 0);

  useGSAP(
    () => {
      gsap.to(content.current, {
        height: open ? 'auto' : 0,
        duration: 0.75,
        ease: 'expo.inOut',
        onUpdate: () => ScrollTrigger.update(),
        onComplete: () => ScrollTrigger.refresh(),
      });
      gsap.to(content.current.querySelectorAll('.edu__course'), {
        y: open ? 0 : 12,
        opacity: open ? 1 : 0,
        duration: 0.6,
        stagger: open ? 0.05 : 0,
        delay: open ? 0.15 : 0,
      });
    },
    { dependencies: [open] }
  );

  return (
    <div className={`edu__sem ${open ? 'is-open' : ''}`}>
      <button className="edu__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} data-cursor="hover">
        <span className="edu__sem-name">{semester}</span>
        <span className="edu__sem-meta label">
          {items.length} courses · {credits} hp
        </span>
        <span className="edu__icon">
          <Plus size={18} strokeWidth={1.5} />
        </span>
      </button>
      <div ref={content} className="edu__content" style={{ height: defaultOpen ? 'auto' : 0 }}>
        <ul className="edu__courses">
          {items.map((c) => (
            <li key={c.code} className="edu__course">
              <div className="edu__course-head">
                <a href={c.url} target="_blank" rel="noreferrer" className="edu__course-name" data-cursor="hover">
                  {c.name} <ArrowUpRight size={14} />
                </a>
                <span className="label">
                  {c.code} · {c.credits} hp
                </span>
              </div>
              <p className="edu__course-desc">{c.description}</p>
              <ul className="edu__tags">
                {c.tags.map((t) => (
                  <li key={t}>#{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Education() {
  const root = useRef(null);

  const semesters = useMemo(() => {
    const map = new Map();
    for (const c of courses) {
      if (!map.has(c.semester)) map.set(c.semester, []);
      map.get(c.semester).push(c);
    }
    return Array.from(map.entries());
  }, []);

  const totalCredits = courses.reduce((a, c) => a + Number(c.credits || 0), 0);

  useGSAP(
    () => {
      gsap.from('.edu__degree > *', {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: { trigger: '.edu__degree', start: 'top 82%', once: true },
      });
      gsap.from('.edu__sem', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.07,
        scrollTrigger: { trigger: '.edu__list', start: 'top 85%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="education" className="section edu">
      <div className="container">
        <SectionHead index="05" label="Education">
          Bachelor of Science, <span className="serif-italic">Computer Science.</span>
        </SectionHead>

        <div className="edu__degree">
          <p className="edu__degree-text">
            Software engineering major at{' '}
            <a href={DEGREE_URL} target="_blank" rel="noreferrer" className="link-underline edu__degree-link" data-cursor="hover">
              Mid Sweden University
            </a>
            . Software design, full-stack development, databases, testing, algorithms, agile methods and distributed
            systems, with a strong emphasis on hands-on projects and teamwork.
          </p>
          <dl className="edu__meta">
            <div>
              <dt className="label">Degree</dt>
              <dd>BSc Computer Science</dd>
            </div>
            <div>
              <dt className="label">Years</dt>
              <dd>2022 — 2025</dd>
            </div>
            <div>
              <dt className="label">Credits</dt>
              <dd>{totalCredits} hp</dd>
            </div>
            <div>
              <dt className="label">Courses</dt>
              <dd>{courses.length}</dd>
            </div>
          </dl>
        </div>

        <div className="edu__list">
          {semesters.map(([semester, items], i) => (
            <Semester key={semester} semester={semester} items={items} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
