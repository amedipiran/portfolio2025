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

      // The marquee may run backwards for a long time, and a reversed infinite tween
      // stalls at time 0, so start far into the timeline.
      tween.totalTime(tween.duration() * 5000);

      if (reducedMotion()) {
        tween.pause();
        return undefined;
      }

      // Scroll sets a direction and a speed boost. The actual timeScale eases toward
      // that target every frame, so reversals and velocity spikes never jerk.
      let dir = 1;
      let boost = 0;
      let current = 1;

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          if (self.direction) dir = self.direction;
          boost = Math.max(boost, gsap.utils.clamp(0, 3, Math.abs(self.getVelocity()) / 400));
        },
      });

      const tick = () => {
        const r = gsap.ticker.deltaRatio(60);
        boost *= Math.pow(0.94, r);
        const target = dir * (1 + boost);
        current += (target - current) * (1 - Math.pow(0.93, r));
        tween.timeScale(current);
      };
      gsap.ticker.add(tick);

      return () => {
        st.kill();
        gsap.ticker.remove(tick);
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
