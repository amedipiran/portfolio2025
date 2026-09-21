import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '../lib/gsap';

/**
 * Lightweight 2D canvas: drifting colour orbs that respond to the pointer.
 * Rendered at reduced resolution and stretched via CSS for performance.
 */
const ORBS = [
  { color: [45, 206, 163], r: 0.46, a: 0.42, sx: 0.32, sy: 0.9, fx: 0.00016, fy: 0.00021, ph: 0 },
  { color: [139, 125, 255], r: 0.4, a: 0.34, sx: 0.78, sy: 0.25, fx: 0.00013, fy: 0.00017, ph: 2.1 },
  { color: [46, 190, 130], r: 0.44, a: 0.28, sx: 0.6, sy: 0.75, fx: 0.00019, fy: 0.00012, ph: 4.2 },
  { color: [255, 138, 91], r: 0.34, a: 0.2, sx: 0.15, sy: 0.3, fx: 0.00011, fy: 0.00015, ph: 1.1 },
];

export default function HeroCanvas({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const SCALE = 0.35;
    let w = 0;
    let h = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let running = true;
    const still = reducedMotion();

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * SCALE));
      h = Math.max(1, Math.floor(rect.height * SCALE));
      canvas.width = w;
      canvas.height = h;
    };

    const draw = (time) => {
      if (!running) return;
      const t = still ? 0 : time * 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const o of ORBS) {
        const dx = (mouse.x - 0.5) * 0.22;
        const dy = (mouse.y - 0.5) * 0.22;
        const x = (o.sx + Math.sin(t * o.fx + o.ph) * 0.18 + dx) * w;
        const y = (o.sy + Math.cos(t * o.fy + o.ph) * 0.18 + dy) * h;
        const r = o.r * Math.max(w, h);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const [cr, cg, cb] = o.color;
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${o.a})`);
        g.addColorStop(0.5, `rgba(${cr},${cg},${cb},${o.a * 0.35})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    io.observe(canvas);

    resize();
    gsap.ticker.add(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      gsap.ticker.remove(draw);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
