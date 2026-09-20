import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { systems, earlier } from '../data/projects';
import SectionHead from './SectionHead.jsx';
import './Work.css';

function Cover({ project }) {
  if (project.image) {
    return <img src={project.image} alt="" loading="lazy" className="work__img" />;
  }
  return (
    <div className="work__cover" style={{ '--c': project.accent, '--len': project.cover.word.length }}>
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
        const items = gsap.utils.toArray('.work__item');
        const pointer = { x: 0, y: 0, seen: false };
        let active = -1;

        const show = (i) => {
          if (active === i) return;
          const wasHidden = active === -1;
          active = i;
          if (wasHidden) {
            // Appear right at the pointer instead of gliding in from a stale position
            xTo(pointer.x, pointer.x);
            yTo(pointer.y, pointer.y);
            rTo(0, 0);
          }
          media.forEach((m, mi) => {
            gsap.to(m, {
              clipPath: mi === i ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
              scale: mi === i ? 1 : 1.15,
              duration: wasHidden ? 0.5 : 0.7,
              ease: 'expo.out',
              overwrite: true,
            });
          });
          gsap.to(el, { opacity: 1, scale: 1, duration: 0.4, overwrite: 'auto' });
        };

        const hide = () => {
          if (active === -1) return;
          active = -1;
          gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.3, overwrite: 'auto' });
        };

        // Works for both pointer movement and scrolling under a resting pointer
        const sync = () => {
          if (!pointer.seen) return;
          const hit = document.elementFromPoint(pointer.x, pointer.y)?.closest?.('.work__item');
          const i = hit ? items.indexOf(hit) : -1;
          if (i === -1) hide();
          else show(i);
        };

        const onMove = (e) => {
          const vx = pointer.seen ? e.clientX - pointer.x : 0;
          pointer.x = e.clientX;
          pointer.y = e.clientY;
          pointer.seen = true;
          sync();
          if (active !== -1) {
            xTo(e.clientX);
            yTo(e.clientY);
            rTo(gsap.utils.clamp(-10, 10, vx * 0.4));
          }
        };
        const onLeaveWindow = () => hide();

        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', onLeaveWindow);
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: sync,
          onLeave: hide,
          onLeaveBack: hide,
        });

        return () => {
          st.kill();
          window.removeEventListener('pointermove', onMove);
          document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
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
