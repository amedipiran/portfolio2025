import React from 'react';
import Spline from '@splinetool/react-spline';
import '../css/Hero.css';
import DotLottie from './DotLottie';

const Hero = () => {
  return (
<section className="hero gradient-bg" id="index">
  <div className="text">
    <h1 className='blur'>ROBERTO PIRAN AMEDI</h1>
    <h2 className='blur'>Software Engineer</h2>
  </div>

  <Spline scene="https://prod.spline.design/iNTfoEhQbpRiPupM/scene.splinecode" />

  <a href='#about' className="arrow-wrapper">
    <DotLottie />
  </a>
</section>

  );
};

export default Hero;