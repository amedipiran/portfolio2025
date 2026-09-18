import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import './Cursor.css';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches) return undefined;

    document.body.classList.add('has-cursor');

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });

    let shown = false;
    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 });
      }
    };

    const setMode = (mode, text) => {
      const r = ring.current;
      r.dataset.mode = mode || '';
      if (label.current) label.current.textContent = text || '';
    };

    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (!el) return;
      setMode(el.dataset.cursor, el.dataset.cursorText);
    };

    const onOut = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (!el) return;
      if (e.relatedTarget && el.contains(e.relatedTarget)) return;
      setMode('', '');
    };

    const onDown = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    const onLeave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const onEnter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
    </>
  );
}
