import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import "../css/About.css";
import PhoneCard from "./PhoneCard.jsx";

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        phoneSrc: "/assets/phone/linkedin/profile-linkedin.png",            // fallback image
        phoneVideo: "/assets/phone/linkedin/linkedin-video.MP4",        // <- video to play in phone
        phoneHref: "https://se.linkedin.com/in/robertopiranamedi/",
        words: [
            "Hi! 👋 ", "I'm Piran. ", "I'm a recently graduated ",
            "Software Engineer. ", "I enjoy building full-stack applications. ",
            "I'm curious, ", "driven, ", "and always learning. ",
            "Let's build something meaningful together.",
        ]
    },
    {
        phoneSrc: "/assets/phone/primate/primate.png",
        phoneVideo: "/assets/phone/primate/primate-video.mov",            // <- add or omit per slide
        phoneHref: "https://www.primatelounge.se",
        words: [
            "Beyond my education, ",
            "I've built real-world projects like Primatelounge.se — ",
            "a custom site for a martial arts club. ",
            "It includes a lightweight CMS ",
            "and was built with Vue, Tailwind, Node, and MongoDB."
        ]
    }
];

const About = () => {
    const containerRef = useRef(null);
    const phoneRefs = useRef([]);
    const wordRefs  = useRef(slides.map(() => []));
    const textGroupRefs = useRef([]);

    useGSAP(() => {
        const phones = phoneRefs.current;
        const groups = textGroupRefs.current;

        slides.forEach((_, si) => {
            const words = wordRefs.current[si] || [];
            words.forEach((el, wi) => gsap.set(el, { opacity: (si === 0 && wi === 0) ? 1 : 0.35 }));
            gsap.set(phones[si], { opacity: 0, x: -20, pointerEvents: si === 0 ? 'auto' : 'none' });
            gsap.set(groups[si],  { opacity: 0, x:  20 });
        });

        const STEP  = 0.45;
        const CROSS = 0.8;

        const totalDistance =
            slides.reduce((acc, s) => acc + (s.words.length - 1) * STEP, 0) +
            (slides.length - 1) * CROSS + 0.6;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top+=-10% top',
                end:   `+=${Math.round(totalDistance * 600)}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                markers: false,
                pinSpacing: true,
            },
        });

        tl.to(phones[0], { opacity: 1, x: 0, duration: CROSS * 0.6, ease: "none" });
        tl.to(groups[0], { opacity: 1, x: 0, duration: CROSS * 0.6, ease: "none" }, "<");
        tl.add(() => { gsap.set(phones[0], { pointerEvents: 'auto' }); });

        slides.forEach((_, si) => {
            const words = wordRefs.current[si];

            for (let i = 1; i < words.length; i++) {
                tl.to(words[i - 1], { opacity: 0.35, duration: 0.25 }, `+=${STEP - 0.25}`);
                tl.to(words[i],     { opacity: 1,    duration: 0.25 }, "<");
            }

            const hasNext = si < slides.length - 1;
            if (hasNext) {
                const next = si + 1;

                tl.to(phones[si], { opacity: 0, x: -20, duration: CROSS * 0.6, ease: "none" }, `+=0.25`);
                tl.to(groups[si], { opacity: 0, x:  20, duration: CROSS * 0.6, ease: "none" }, "<");

                tl.add(() => {
                    const nextWords = wordRefs.current[next] || [];
                    nextWords.forEach((el, wi) => gsap.set(el, { opacity: wi === 0 ? 1 : 0.35 }));
                    gsap.set(phones[next], { opacity: 0, x: -20 });
                    gsap.set(groups[next], { opacity: 0, x:  20 });
                    gsap.set(phones[si],   { pointerEvents: 'none' });
                    gsap.set(phones[next], { pointerEvents: 'auto' });
                });

                tl.to({}, { duration: CROSS * 0.1 });

                tl.to(phones[next], { opacity: 1, x: 0, duration: CROSS * 0.6, ease: "none" });
                tl.to(groups[next], { opacity: 1, x: 0, duration: CROSS * 0.6, ease: "none" }, "<");
            }
        });

        {
            const last = slides.length - 1;
            tl.to(phones[last], { opacity: 0, x: -20, duration: CROSS * 0.6, ease: "none" }, "+=0.25");
            tl.to(groups[last], { opacity: 0, x:  20, duration: CROSS * 0.6, ease: "none" }, "<");
            tl.add(() => { gsap.set(phones[last], { pointerEvents: 'none' }); });
        }
    }, []);

    return (
        <section id="about">
            <div className="about-hero" ref={containerRef}>
                <div className="about-content">
                    <div className="hero-card">
                        <div data-cursor-hover className="phone-stack">
                            {slides.map((s, si) => (
                                <div
                                    key={si}
                                    className="phone-layer"
                                    ref={(el) => (phoneRefs.current[si] = el)}
                                >
                                    <PhoneCard
                                        src={s.phoneSrc}              // fallback image
                                        videoSrc={s.phoneVideo}       // optional video
                                        alt="phone preview"
                                        href={s.phoneHref}
                                        floating
                                        /* notch/status bar will be shown only when falling back to image */
                                        notch
                                        glow
                                        glare
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hero-text text-stack">
                        {slides.map((s, si) => (
                            <div
                                key={si}
                                className="text-group"
                                ref={(el) => (textGroupRefs.current[si] = el)}
                                data-slide={si}
                            >
                                {s.words.map((w, wi) => (
                                    <span
                                        key={wi}
                                        className="hero-word"
                                        ref={(el) => (wordRefs.current[si][wi] = el)}
                                    >
                    {w}
                  </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;