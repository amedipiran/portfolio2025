import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { cyntora } from '../data/cyntora';
import SectionHead from './SectionHead.jsx';
import './Now.css';

export default function Now() {
  const root = useRef(null);
  const scroller = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);

  useGSAP(
    () => {
      const introSplit = SplitText.create('.now__intro', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.06,
            scrollTrigger: { trigger: '.now__intro', start: 'top 82%', once: true },
          }),
      });

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const getDistance = () => track.current.scrollWidth - window.innerWidth;

        const tween = gsap.to(track.current, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scroller.current,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
          },
        });

        // Parallax inside each card while the track moves
        gsap.utils.toArray('.now__card-num').forEach((num) => {
          const card = num.closest('.now__card');
          gsap.fromTo(
            num,
            { xPercent: 30 },
            {
              xPercent: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.from('.now__card', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          scrollTrigger: { trigger: track.current, start: 'top 80%', once: true },
        });
      });

      // Stack chips + "how I work"
      gsap.from('.now__chip', {
        y: 14,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        scrollTrigger: { trigger: '.now__stack', start: 'top 85%', once: true },
      });

      const howSplit = SplitText.create('.now__how p', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 100,
            duration: 1.1,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.now__how', start: 'top 80%', once: true },
          }),
      });

      return () => {
        introSplit.revert();
        howSplit.revert();
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="now" className="section now">
      <div className="container">
        <SectionHead index="02" label="Now · Cyntora">
          {cyntora.title[0]} <span className="serif-italic">{cyntora.title[1]}</span>
        </SectionHead>

        <div className="now__lead">
          <p className="now__intro">{cyntora.intro}</p>
          <p className="now__site label">
            <span className="idx">↳</span>Cyntora AB · Norrköping
          </p>
        </div>
      </div>

      <div ref={scroller} className="now__scroller">
        <div ref={track} className="now__track">
          <div className="now__spacer" aria-hidden="true">
            <span className="label">
              <span className="idx">→</span>What I do
            </span>
            <p className="now__spacer-text">
              Six areas, one goal: <span className="serif-italic">less manual work, better decisions.</span>
            </p>
          </div>

          {cyntora.areas.map((a) => (
            <article key={a.id} className="now__card" data-cursor="hover">
              <span className="now__card-num" aria-hidden="true">
                {a.id}
              </span>
              <div className="now__card-body">
                <h3 className="now__card-title">{a.title}</h3>
                <p className="now__card-text">{a.body}</p>
                <ul className="now__card-tags">
                  {a.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <div className="now__card now__card--end">
            <span className="now__end-title">
              One goal behind all of it: <span className="serif-italic">less manual work, better decisions.</span>
            </span>
            <span className="now__end-link">Built and run in production</span>
          </div>
        </div>
        <div className="now__progress" aria-hidden="true">
          <div ref={progress} className="now__progress-fill" />
        </div>
      </div>

      <div className="container now__after">
        <div className="now__stack">
          <p className="label">
            <span className="idx">//</span>Stack at work
          </p>
          <ul className="now__chips">
            {cyntora.stack.map((s) => (
              <li key={s} className="chip now__chip">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="now__how">
          <p className="label">
            <span className="idx">//</span>How I work
          </p>
          <p className="now__how-text">
            {cyntora.howIWork[0]} <span className="serif-italic">{cyntora.howIWork[1]}</span> {cyntora.howIWork[2]}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
