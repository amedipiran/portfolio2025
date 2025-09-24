// src/components/Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../css/Hero.css';
import DotLottie from './DotLottie.jsx';
import LightRays from './LightRays.jsx';

const Hero = () => {
    const [revealed, setRevealed] = useState(false);
    const vantaRef = useRef(null);
    const vantaInstance = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setRevealed(true), 600);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        // guard: scripts must be present on window
        if (!vantaRef.current || typeof window === 'undefined') return;
        if (!window.VANTA || !window.THREE) return;
        if (vantaInstance.current) return; // StrictMode double-mount guard

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
                color: 0x0,
                shininess: 35.0,
                waveHeight: 22.0,
                waveSpeed: 0.8,
                zoom: 1.0
            });
        };

        raf = requestAnimationFrame(initWhenSized);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            try { vantaInstance.current?.destroy(); } catch {}
            vantaInstance.current = null;
        };
    }, []);

    return (
        <section className={`hero ${revealed ? 'revealed' : ''}`} id="hero">
            {/* Vanta canvas target */}
            <div ref={vantaRef} className="vanta-bg" aria-hidden="true" />

            {/* Gradient overlay */}
            <div className="hero-overlay" aria-hidden="true" />

            {/* Optional light rays layer */}
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

            {/* Foreground text */}
            <div className="text">
                <h1 className="hero-blur fade-in-up delay-1">ROBERTO PIRAN AMEDI</h1>
                <h2 className="hero-blur fade-in-up delay-2">Software Engineer</h2>
            </div>

            <a href="#about" data-cursor-hover className="arrow-wrapper fade-in-up delay-3">
                <DotLottie />
            </a>
        </section>
    );
};

export default Hero;