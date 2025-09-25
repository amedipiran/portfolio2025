import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import "../css/About.css";
import PhoneCard from "./PhoneCard.jsx";

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        phoneSrc: "/assets/phone/linkedin/profile-linkedin.png",
        phoneVideo: "/assets/phone/linkedin/linkedin-video.MP4",
        phoneHref: "https://se.linkedin.com/in/robertopiranamedi/",
        words: [
            "Hi! 👋 ", "I'm Piran. ", "I'm a graduated ",
            "Software Engineer ",
            "with a ",
            "Bachelors Degree in Computer Science. ",
            "I enjoy building full-stack applications. ",
            "I'm curious, ", "driven, ", "and always learning. ",
            "Let's build something together.",
        ]
    },
    {
        phoneSrc: "/assets/phone/primate/primate.png",
        phoneVideo: "/assets/phone/primate/primate-video.mov",
        phoneHref: "https://www.primatelounge.se",
        words: [
            "Beyond my education, ",
            "I've built real-world projects like Primatelounge.se — ",
            "a custom site for a martial arts club. ",
            "It includes a lightweight CMS ",
            "and was built with Vue, Tailwind, Node, and MongoDB."
        ]
    },
    {
        phoneSrc: "/assets/phone/drillready/drillready.png",
        phoneHref: "",
        words: [
            "Currently, ",
            "I am developing a SaaS project called ",
            "DrillReady. ",
            "This platform streamlines the connection between offshore and onshore drillers, ",
            "and is built using the MERN stack."
        ]
    },
    {
        phoneSrc: "/assets/phone/github/github.png",
        phoneHref: "https://github.com/amedipiran",
        words: [
            "During my education, ",
            "I've developed in various programming languages and techniques. ",
            "Full detail regarding my education is visible bellow.",
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
            gsap.set(phones[si], { opacity: 0, x: -20, pointerEvents: 'none', zIndex: 1 });
            gsap.set(groups[si], { opacity: 0, x: 20 });
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
        tl.set(phones[0], { pointerEvents: 'auto', zIndex: 3 }, "<");

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
                tl.to(groups[si], { opacity: 0, x: 20, duration: CROSS * 0.6, ease: "none" }, "<");

                const nextWords = wordRefs.current[next] || [];
                tl.set(nextWords, { opacity: 0.35 });
                if (nextWords[0]) tl.set(nextWords[0], { opacity: 1 });

                tl.set(phones[next], { opacity: 0, x: -20, pointerEvents: 'auto', zIndex: 3 });
                tl.set(groups[next], { opacity: 0, x: 20 });
                tl.set(phones[si],   { pointerEvents: 'none', zIndex: 1 });

                tl.to({}, { duration: CROSS * 0.1 });

                tl.to(phones[next], { opacity: 1, x: 0, duration: CROSS * 0.6, ease: "none" });
                tl.to(groups[next], { opacity: 1, x: 0, duration: CROSS * 0.6, ease: "none" }, "<");
            }
        });

        const last = slides.length - 1;
        tl.to(phones[last], { opacity: 0, x: -20, duration: CROSS * 0.6, ease: "none" }, "+=0.25");
        tl.to(groups[last], { opacity: 0, x: 20, duration: CROSS * 0.6, ease: "none" }, "<");
        tl.set(phones[last], { pointerEvents: 'none', zIndex: 1 });
    }, []);

    return (
        <section id="about">
            <div className="about-hero" ref={containerRef}>
                <div className="about-content">
                    <div className="hero-card">
                        <div className="phone-stack">
                            {slides.map((s, si) => (
                                <div
                                    key={si}
                                    className="phone-layer"
                                    ref={(el) => (phoneRefs.current[si] = el)}
                                >
                                    <PhoneCard
                                        src={s.phoneSrc}
                                        videoSrc={s.phoneVideo}
                                        alt="phone preview"
                                        href={s.phoneHref}
                                        floating
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