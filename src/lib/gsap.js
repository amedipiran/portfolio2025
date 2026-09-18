import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

gsap.defaults({ ease: 'power3.out', duration: 1 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const EASE = {
  out: 'power3.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
  soft: 'power2.out',
};

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
