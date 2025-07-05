import { useEffect, useRef } from "react";
import '../css/components/GrainLayer.css';

export default function GrainLayer() {
    const grainRef = useRef(null);

    useEffect(() => {
        const el = grainRef.current;

        if (window.grained && el) {
            el.id = "grain";

            const options = {
                animate: true,
                patternWidth: 100,
                patternHeight: 100,
                grainOpacity: 0.04,
                grainDensity: 2,
                grainWidth: 2,
                grainHeight: 2,
            };

            window.grained("#grain", options);
        } else {
            console.error("Grained not loaded or target element not found.");
        }
    }, []);

    return <div ref={grainRef} className="grain-layer" />; // No inline styles
}