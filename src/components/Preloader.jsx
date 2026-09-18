import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { profile } from '../data/profile';
import './Preloader.css';

const MIN_DURATION = 2.1;

export default function Preloader({ onReady, onDone }) {
  const root = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);

  useGSAP(
    () => {
      const state = { v: 0 };
      let finished = false;
      let assetsReady = false;

      const exit = () => {
        onReady?.();
        const tl = gsap.timeline({
          delay: 0.15,
          defaults: { ease: 'expo.inOut' },
          onComplete: () => onDone?.(),
        });
        tl.to('.pre__meta, .pre__counter', { yPercent: -40, opacity: 0, duration: 0.6, stagger: 0.05 })
          .to(bar.current, { scaleX: 0, transformOrigin: 'right', duration: 0.5 }, '<')
          .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.05 }, '-=0.25');
      };

      const tryExit = () => {
        if (finished && assetsReady) exit();
      };

      const count = gsap.to(state, {
        v: 100,
        duration: MIN_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(state.v);
          if (counter.current) counter.current.textContent = String(v).padStart(3, '0');
          if (bar.current) gsap.set(bar.current, { scaleX: v / 100 });
        },
        onComplete: () => {
          finished = true;
          tryExit();
        },
      });

      const fonts = document.fonts
        ? Promise.all(
            [
              '800 1em "Syne"',
              '700 1em "Syne"',
              '600 1em "Syne"',
              '500 1em "Syne"',
              '400 1em "Inter Tight"',
              '500 1em "Inter Tight"',
              'italic 400 1em "Instrument Serif"',
              '400 1em "JetBrains Mono"',
            ].map((f) => document.fonts.load(f, 'Norrköping åäö ÅÄÖ é').catch(() => null))
          ).then(() => document.fonts.ready)
        : Promise.resolve();
      const loaded =
        document.readyState === 'complete'
          ? Promise.resolve()
          : new Promise((res) => window.addEventListener('load', res, { once: true }));

      Promise.all([fonts, loaded]).then(() => {
        assetsReady = true;
        tryExit();
      });

      gsap.from('.pre__meta span', { y: 12, opacity: 0, stagger: 0.08, duration: 0.8, delay: 0.1 });
      gsap.from(counter.current, { y: 30, opacity: 0, duration: 0.9, delay: 0.1 });

      return () => count.kill();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="pre" aria-hidden="true">
      <div className="pre__meta label">
        <span>{profile.name}</span>
        <span>Portfolio · {new Date().getFullYear()}</span>
        <span>{profile.location}</span>
      </div>
      <div className="pre__bottom">
        <div ref={counter} className="pre__counter">
          000
        </div>
        <div className="pre__bar">
          <div ref={bar} className="pre__bar-fill" />
        </div>
      </div>
    </div>
  );
}
