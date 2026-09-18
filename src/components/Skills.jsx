import { skillRows } from '../data/skills';
import Marquee from './Marquee.jsx';
import './Skills.css';

const item = (s, i) => (
  <span key={`${s.name}-${i}`} className="skills__item">
    <img src={s.src} alt="" loading="lazy" width="32" height="32" />
    <span>{s.name}</span>
  </span>
);

export default function Skills() {
  return (
    <section className="skills" aria-label="Technologies">
      <div className="container">
        <p className="label">
          <span className="idx">06</span>Stack
        </p>
      </div>
      <Marquee items={skillRows[0]} render={item} speed={50} />
      <Marquee items={skillRows[1]} render={item} speed={45} reverse />
    </section>
  );
}
