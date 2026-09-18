import { useRef, useState, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from '../lib/gsap';
import './Marquee.css';

/**
 * Infinite marquee whose speed and direction react to scroll velocity.
 * `render(item, i)` renders one item; items are repeated to fill the track.
 */
export default function Marquee({ items, render, speed = 80, reverse = false, className = '' }) {
  const root = useRef(null);
  const track = useRef(null);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const measure = () => {
      const first = track.current?.firstElementChild;
      if (!first) return;
      const w = first.getBoundingClientRect().width || 1;
      setCopies(Math.max(2, Math.ceil((window.innerWidth * 2) / w) + 1));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useGSAP(
    () => {
      const first = track.current?.firstElementChild;
      if (!first) return undefined;
      const w = first.getBoundingClientRect().width;
      if (!w) return undefined;

      const tween = gsap.fromTo(
        track.current,
        { x: reverse ? -w : 0 },
        { x: reverse ? 0 : -w, duration: w / speed, ease: 'none', repeat: -1 }
      );

      if (reducedMotion()) {
        tween.pause();
        return undefined;
      }

      let settle;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = gsap.utils.clamp(-4, 4, v / 250);
          const sign = v < 0 ? -1 : 1;
          gsap.to(tween, {
            timeScale: sign * (1 + Math.abs(boost)),
            duration: 0.3,
            overwrite: true,
          });
          clearTimeout(settle);
          settle = setTimeout(() => gsap.to(tween, { timeScale: 1, duration: 0.8 }), 120);
        },
      });

      return () => {
        st.kill();
        clearTimeout(settle);
      };
    },
    { scope: root, dependencies: [copies, speed, reverse] }
  );

  return (
    <div ref={root} className={`marquee ${className}`} aria-hidden="true">
      <div ref={track} className="marquee__track">
        {Array.from({ length: copies }).map((_, c) => (
          <div key={c} className="marquee__copy">
            {items.map((item, i) => render(item, i))}
          </div>
        ))}
      </div>
    </div>
  );
}
