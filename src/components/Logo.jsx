import React, { useEffect, useRef } from "react";

const Logo = ({
                  text = "Piran",
                  href = "#index",
                  className = "",
                  autoScramble = true,
                  autoMinMs = 8000,
                  autoJitterMs = 2000
              }) => {
    const logoRef = useRef(null);
    const scrambleTimerRef = useRef(null);
    const autoTimerRef = useRef(null);

    useEffect(() => {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const el = logoRef.current;
        if (!el) return;

        // ensure original text is stored and visible
        el.dataset.value = text;
        el.textContent = text;

        const clearScramble = () => {
            if (scrambleTimerRef.current) {
                clearInterval(scrambleTimerRef.current);
                scrambleTimerRef.current = null;
            }
        };

        const scrambleIn = () => {
            clearScramble();
            const original = el.dataset.value || text;
            let iterations = 0;

            scrambleTimerRef.current = setInterval(() => {
                const next = original
                    .split("")
                    .map((_, i) => (i < iterations ? original[i] : letters[Math.floor(Math.random() * letters.length)]))
                    .join("");
                el.textContent = next;
                iterations += 0.5;
                if (iterations >= original.length) {
                    clearScramble();
                    el.textContent = original;
                }
            }, 50);
        };

        const scrambleOut = () => {
            clearScramble();
            const original = el.dataset.value || text;
            let iterations = original.length;

            scrambleTimerRef.current = setInterval(() => {
                const next = original
                    .split("")
                    .map((_, i) => (i >= iterations ? original[i] : letters[Math.floor(Math.random() * letters.length)]))
                    .join("");
                el.textContent = next;
                iterations -= 0.5;
                if (iterations <= 0) {
                    clearScramble();
                    el.textContent = original;
                }
            }, 50);
        };

        const onEnter = () => scrambleIn();
        const onLeave = () => scrambleOut();

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);


        if (autoScramble) {
            const tick = () => {
                scrambleIn();
                const nextDelay = autoMinMs + Math.random() * autoJitterMs;
                autoTimerRef.current = setTimeout(tick, nextDelay);
            };
            autoTimerRef.current = setTimeout(tick, autoMinMs + Math.random() * autoJitterMs);
        }

        return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            if (scrambleTimerRef.current) clearInterval(scrambleTimerRef.current);
            if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
        };
    }, [text, autoScramble, autoMinMs, autoJitterMs]);

    return (
        <div className={`logo ${className}`}>
            <a
                href={href}
                data-cursor-hover
                data-value={text}
                ref={logoRef}
                className="logo-link"
            >
                {text}
            </a>
            <span className="dot">.</span>
        </div>
    );
};

export default Logo;