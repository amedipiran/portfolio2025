import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import "../css/pages/About.css"

gsap.registerPlugin(ScrollTrigger);

const words = [
    "Hi! 👋",
    "I'm Piran.",
    "I'm a recently graduated ",
    "software developer.",
    "I enjoy building full-stack applications.",
    "I'm curious,",
    "driven,",
    "and always learning.",
    "Let's build something meaningful together.",
];

const About = () => {
    const containerRef = useRef();
    const wordRefs = useRef([]);

    useGSAP(() => {
        wordRefs.current.forEach((el, i) => {
            gsap.set(el, { opacity: i === 0 ? 1 : 0.3 });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top+=-50 top',
                end: `+=${(words.length + 1) * 150}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                markers: true,
                pinSpacing: true,
                onLeave: () => {
                    containerRef.current.classList.add('unpin-collapse');
                },
                onEnterBack: () => {
                    containerRef.current.classList.remove('unpin-collapse');
                },
            },
        });

        for (let i = 1; i < words.length; i++) {
            tl.to(wordRefs.current[i - 1], { opacity: 0.3, duration: 0.3 }, "+=0.5");
            tl.to(wordRefs.current[i], { opacity: 1, duration: 0.3 }, "-=0.3");
        }

        tl.to(wordRefs.current[words.length - 1], { opacity: 1, duration: 0.3 });
    }, []);

    return (
        <section id="about" className="about-hero" ref={containerRef}>
            <div className="hero-text">
                {words.map((word, i) => (
                    <span
                        key={i}
                        className="hero-word"
                        ref={(el) => (wordRefs.current[i] = el)}
                    >
            {word}
        </span>
                ))}
            </div>
        </section>
    );
};

export default About;