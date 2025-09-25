import React, { useState, useEffect } from "react";
import {ChevronUp} from "lucide-react";
import "../css/components/ArrowUp.css"

const ArrowUp = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setVisible(window.scrollY > 300);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <button
            className={`arrowup ${visible ? "show" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <ChevronUp
                className="arrowup-icon" />
        </button>
    );
};

export default ArrowUp;