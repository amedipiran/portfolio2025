import React, { useEffect, useRef, useState } from 'react';
import '../css/components/Cursor.css';

const Cursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const hasMoved = useRef(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const outerX = useRef(0);
  const outerY = useRef(0);

useEffect(() => {
  const moveCursor = (e) => {
    const { clientX, clientY } = e;
    mouseX.current = clientX;
    mouseY.current = clientY;

    innerRef.current.style.left = `${clientX}px`;
    innerRef.current.style.top = `${clientY}px`;

    if (!hasMoved.current) {
      outerRef.current.style.opacity = '1';
      innerRef.current.style.opacity = '1';
      hasMoved.current = true;
    }
  };

  const animate = () => {
    outerX.current += (mouseX.current - outerX.current) * 0.15;
    outerY.current += (mouseY.current - outerY.current) * 0.15;

    outerRef.current.style.left = `${outerX.current}px`;
    outerRef.current.style.top = `${outerY.current}px`;

    requestAnimationFrame(animate);
  };

  const handlePointerOver = (e) => {
    const link = e.target.closest('[data-cursor-link]');
    const hover = e.target.closest('[data-cursor-hover]');
    
    // Visa hover-effekt för inner och outer cursor
    if (hover) setHovering(true);

    // Sänk opacity endast för navbar-länkar
    if (link) {
      document.querySelectorAll('[data-cursor-link]').forEach(el => {
        el.style.opacity = el === link ? '1' : '0.3';
      });
    }
  };

  const handlePointerOut = (e) => {
    const link = e.target.closest('[data-cursor-link]');
    const hover = e.target.closest('[data-cursor-hover]');

    if (hover) setHovering(false);

    if (link) {
      document.querySelectorAll('[data-cursor-link]').forEach(el => {
        el.style.opacity = '1';
      });
    }
  };

  const handleClick = () => {
    outerRef.current.classList.add('click');
    setTimeout(() => {
      outerRef.current.classList.remove('click');
    }, 300);
  };

  document.addEventListener('mousemove', moveCursor);
  document.addEventListener('pointerover', handlePointerOver);
  document.addEventListener('pointerout', handlePointerOut);
  document.addEventListener('mousedown', handleClick);

  animate();

  return () => {
    document.removeEventListener('mousemove', moveCursor);
    document.removeEventListener('pointerover', handlePointerOver);
    document.removeEventListener('pointerout', handlePointerOut);
    document.removeEventListener('mousedown', handleClick);
  };
}, []);

  return (
    <>
      <div ref={outerRef} className={`cursor-outer ${hovering ? 'hover' : ''}`} />
      <div ref={innerRef} className={`cursor-inner ${hovering ? 'hover' : ''}`} />
    </>
  );
};

export default Cursor;