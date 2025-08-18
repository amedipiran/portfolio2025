import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import './css/Hero.css';
import DotLottie from './components/DotLottie.jsx';
import Orb from "./components/Orb.jsx";

const Hero = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setRevealed(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
      <section className={`hero ${revealed ? 'revealed' : ''}`} id="hero">
        <div className="text">
          <h1 className='hero-blur fade-in-up delay-1'>ROBERTO PIRAN AMEDI</h1>
          <h2 className='hero-blur fade-in-up delay-2'>Software Engineer</h2>
        </div>

          <Spline
              scene="https://prod.spline.design/rql8AVMc5Gy2pknI/scene.splinecode"
              className="spline-canvas fade-in-up"
          />

{/*          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
              <Orb
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  hue={0}
                  forceHoverState={false}
              />
          </div>*/}

        <a href="#about"
           data-cursor-hover
           className="arrow-wrapper fade-in-up delay-3">
          <DotLottie />
        </a>
      </section>
  );
};

export default Hero;