import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import { systems, earlier } from '../data/projects';
import SectionHead from './SectionHead.jsx';
import './Work.css';

function Cover({ project }) {
  if (project.image) {
    return <img src={project.image} alt="" loading="lazy" className="work__img" />;
  }
  return (
    <div className="work__cover" style={{ '--c': project.accent }}>
      <span className="work__cover-word">{project.cover.word}</span>
      <span className="work__cover-sub">{project.cover.sub}</span>
    </div>
  );
}

export default function Work() {
  const root = useRef(null);
  const preview = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray('.work__item').forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: i * 0.05,
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });

      gsap.from('.work__earlier-card', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: { trigger: '.work__earlier', start: 'top 85%', once: true },
      });

      // Floating preview that follows the pointer over the list (fine pointers only)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (pointer: fine)', () => {
        const el = preview.current;
        const media = gsap.utils.toArray('.work__preview-media', el);
        const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
        const rTo = gsap.quickTo(el, 'rotation', { duration: 0.8, ease: 'power3.out' });
        let lastX = 0;
        let active = -1;

        const onMove = (e) => {
          xTo(e.clientX);
          yTo(e.clientY);
          const vx = e.clientX - lastX;
          lastX = e.clientX;
          rTo(gsap.utils.clamp(-10, 10, vx * 0.4));
        };

        const show = (i) => {
          if (active === i) return;
          active = i;
          media.forEach((m, mi) => {
            gsap.to(m, {
              clipPath: mi === i ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
              scale: mi === i ? 1 : 1.15,
              duration: 0.7,
              ease: 'expo.out',
              overwrite: true,
            });
          });
          gsap.to(el, { opacity: 1, scale: 1, duration: 0.5, overwrite: 'auto' });
        };
        const hide = () => {
          active = -1;
          gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.4, overwrite: 'auto' });
        };

        gsap.utils.toArray('.work__item').forEach((item, i) => {
          item.addEventListener('pointerenter', () => show(i));
        });
        const list = root.current.querySelector('.work__list');
        list.addEventListener('pointerleave', hide);
        root.current.addEventListener('pointermove', onMove, { passive: true });

        return () => {
          list.removeEventListener('pointerleave', hide);
          root.current?.removeEventListener('pointermove', onMove);
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="section work">
      <div className="container">
        <SectionHead index="03" label="Selected work">
          Systems I’ve <span className="serif-italic">built and run.</span>
        </SectionHead>

        <ul className="work__list">
          {systems.map((p, i) => (
            <li key={p.id} className="work__item">
              <div className="work__row" data-cursor="hide">
                <span className="work__num label">0{i + 1}</span>
                <div className="work__main">
                  <h3 className="work__title">{p.title}</h3>
                  <p className="work__kind">{p.kind}</p>
                </div>
                <p className="work__desc">{p.description}</p>
                <ul className="work__tags">
                  {p.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className={`work__meta label ${p.meta === 'In production' ? 'is-live' : ''}`}>
                  <i className="work__meta-dot" />
                  {p.meta}
                </span>
              </div>
              <div className="work__mobile-media" aria-hidden="true">
                <Cover project={p} />
              </div>
            </li>
          ))}
        </ul>

        <div className="work__earlier">
          <p className="label">
            <span className="idx">//</span>Before Cyntora
          </p>
          <div className="work__earlier-grid">
            {earlier.map((p) => {
              const Tag = p.url ? 'a' : 'div';
              const linkProps = p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {};
              return (
                <Tag key={p.id} {...linkProps} className="work__earlier-card" data-cursor={p.url ? 'hover' : undefined}>
                  <div className="work__earlier-head">
                    <span className="label">{p.year}</span>
                    {p.url && <ArrowUpRight size={18} strokeWidth={1.5} className="work__earlier-arrow" />}
                  </div>
                  <h4 className="work__earlier-title">{p.title}</h4>
                  <p className="work__earlier-kind">{p.kind}</p>
                  <ul className="work__tags">
                    {p.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={preview} className="work__preview" aria-hidden="true">
        {systems.map((p) => (
          <div key={p.id} className="work__preview-media">
            <Cover project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
