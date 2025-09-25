import React, { useEffect, useRef, useState } from 'react';
import '../css/Hero.css';
import DotLottie from './DotLottie.jsx';
import LightRays from './LightRays.jsx';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [revealed, setRevealed] = useState(false);

    const vantaRef = useRef(null);
    const vantaInstance = useRef(null);

    const heroRef = useRef(null);
    const textScrollRef = useRef(null); // GSAP scroll y
    const textMouseRef = useRef(null);  // GSAP mouse x/y

    useEffect(() => {
        const t = setTimeout(() => setRevealed(true), 600);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!vantaRef.current || typeof window === 'undefined') return;
        if (!window.VANTA || !window.THREE) return;
        if (vantaInstance.current) return;

        let raf;
        const initWhenSized = () => {
            const el = vantaRef.current;
            if (!el) return;
            const { width, height } = el.getBoundingClientRect();
            if (width < 10 || height < 10) {
                raf = requestAnimationFrame(initWhenSized);
                return;
            }

            vantaInstance.current = window.VANTA.WAVES({
                el,
                THREE: window.THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.0,
                minWidth: 200.0,
                scale: 1.0,
                scaleMobile: 1.0,
                backgroundColor: 0x000000,
                color: 0x1522, // your value; adjust to taste
                shininess: 35.0,
                waveHeight: 22.0,
                waveSpeed: 0.8,
                zoom: 1.0
            });
        };

        raf = requestAnimationFrame(initWhenSized);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            try { vantaInstance.current?.destroy(); } catch (e) {
                console.error(e);
            }
            vantaInstance.current = null;
        };
    }, []);

    useEffect(() => {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduce) return;

        const heroEl = heroRef.current;
        const scrollEl = textScrollRef.current;
        if (!heroEl || !scrollEl) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroEl,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        tl.fromTo(
            scrollEl,
            { y: 0, opacity: 1 },
            { y: -60, opacity: 0.92, ease: 'none' } // tweak -60 for more/less lift
        );

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    useEffect(() => {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (reduce) return;

        const heroEl = heroRef.current;
        const mouseEl = textMouseRef.current;
        if (!heroEl || !mouseEl) return;

        const setX = gsap.quickTo(mouseEl, 'x', { duration: 0.35, ease: 'power3.out' });
        const setY = gsap.quickTo(mouseEl, 'y', { duration: 0.35, ease: 'power3.out' });

        const strengthX = 12; // px at viewport edges (reverse dir below)
        const strengthY = 6;

        const onPointerMove = (e) => {
            const rect = heroEl.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

            const x = -nx * strengthX;
            const y = -ny * strengthY;

            setX(x);
            setY(y);
        };

        const onPointerLeave = () => {
            setX(0);
            setY(0);
        };

        heroEl.addEventListener('pointermove', onPointerMove, { passive: true });
        heroEl.addEventListener('pointerleave', onPointerLeave, { passive: true });

        return () => {
            heroEl.removeEventListener('pointermove', onPointerMove);
            heroEl.removeEventListener('pointerleave', onPointerLeave);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className={`hero ${revealed ? 'revealed' : ''}`}
            id="hero"
        >
            <div ref={vantaRef} className="vanta-bg" aria-hidden="true" />
            <div className="hero-overlay" aria-hidden="true" />

            <LightRays
                className="rays-layer"
                raysOrigin="top-center"
                raysColor="#7cd9ff"
                raysSpeed={1.4}
                lightSpread={0.9}
                rayLength={1.3}
                followMouse
                mouseInfluence={0.15}
                noiseAmount={0.08}
                distortion={0.03}
            />

            <div ref={textScrollRef} className="text">
                <div ref={textMouseRef}>
                    <h1 className="hero-blur fade-in-up delay-1">ROBERTO PIRAN AMEDI</h1>
                    <h2 className="hero-blur fade-in-up delay-2">Software Engineer</h2>
                </div>
            </div>

            <a href="#about" data-cursor-hover className="arrow-wrapper fade-in-up delay-3">
                <DotLottie />
            </a>
        </section>
    );
};

export default Hero;