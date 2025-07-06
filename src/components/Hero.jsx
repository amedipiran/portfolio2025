import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import '../css/components/Hero.css';
import DotLottie from './DotLottie';

const Hero = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setRevealed(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
      <section className={`hero ${revealed ? 'revealed' : ''}`} id="hero">
        <div className="text">
          <h1 className='blur fade-in-up'>ROBERTO PIRAN AMEDI</h1>
          <h2 className='blur fade-in-up delay-1'>Software Engineer</h2>
        </div>

        <Spline
            scene="https://prod.spline.design/rql8AVMc5Gy2pknI/scene.splinecode"
            className="fade-in-up delay-2"
        />

        <a href="#about"
           data-cursor-hover
           className="arrow-wrapper fade-in-up delay-3">
          <DotLottie />
        </a>
      </section>
  );
};

export default Hero;