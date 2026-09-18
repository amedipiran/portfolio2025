import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export default function MagneticButton({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !window.matchMedia('(pointer: fine)').matches) return undefined;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`magnetic ${className}`} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
