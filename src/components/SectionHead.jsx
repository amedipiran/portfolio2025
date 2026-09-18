import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';

export default function SectionHead({ index, label, children, className = '' }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const h2 = root.current.querySelector('h2');
      const split = SplitText.create(h2, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: h2, start: 'top 85%', once: true },
          }),
      });

      gsap.fromTo(
        root.current.querySelector('.label'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: root.current, start: 'top 88%', once: true } }
      );

      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className={`section-head ${className}`}>
      <p className="label">
        <span className="idx">{index}</span>
        {label}
      </p>
      <h2>{children}</h2>
    </div>
  );
}
