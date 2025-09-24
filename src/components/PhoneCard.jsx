import React, { useRef, useEffect, useState } from "react";
import "../css/components/PhoneCard.css";
import { motion, useAnimation } from "motion/react";

export default function PhoneCard({
                                      src,                 // fallback image
                                      videoSrc,            // optional video to play in screen
                                      videoType = "video/mp4",
                                      videoRate = 0.6,     // playback speed (1 = normal, 0.5 = half speed)
                                      alt = "preview",
                                      href,
                                      className = "",
                                      floating = true,
                                      notch = true,
                                      glow = true,
                                      glare = true,
                                      onClick,
                                  }) {
    const phoneRef = useRef(null);
    const videoRef = useRef(null);
    const floatCtrl = useAnimation();

    const [useImageFallback, setUseImageFallback] = useState(!videoSrc);

    // Prefer-reduced-motion -> use image
    useEffect(() => {
        if (!videoSrc) return;
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (media.matches) setUseImageFallback(true);
        const listener = () => setUseImageFallback(media.matches || false);
        media.addEventListener?.("change", listener);
        return () => media.removeEventListener?.("change", listener);
    }, [videoSrc]);

    // apply playback rate safely
    const applyPlaybackRate = (rate) => {
        const v = videoRef.current;
        if (!v) return;
        try {
            v.defaultPlaybackRate = rate;
            v.playbackRate = rate;
            if (!v.paused) v.play().catch(() => {});
        } catch {}
    };

    // video events
    const handleVideoCanPlay = () => {
        setUseImageFallback(false);
        applyPlaybackRate(videoRate);
        videoRef.current?.play().catch(() => setUseImageFallback(true));
    };
    const handleVideoError = () => setUseImageFallback(true);

    // keep playbackRate in sync if prop changes
    useEffect(() => {
        if (!videoSrc || useImageFallback) return;
        applyPlaybackRate(videoRate);
    }, [videoRate, videoSrc, useImageFallback]);

    // Safari sometimes forgets rates on tab switch
    useEffect(() => {
        const onVis = () => {
            if (document.visibilityState === "visible" && videoRef.current && !useImageFallback) {
                applyPlaybackRate(videoRate);
            }
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, [videoRate, useImageFallback]);

    // hover parallax
    const handleMove = (e) => {
        if (!phoneRef.current) return;
        const rect = phoneRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rx = (py - 0.5) * 12;
        const ry = (0.5 - px) * 14;
        const tx = (px - 0.5) * 10;
        const ty = (py - 0.5) * 10;

        phoneRef.current.style.setProperty("--rx", `${rx}deg`);
        phoneRef.current.style.setProperty("--ry", `${ry}deg`);
        phoneRef.current.style.setProperty("--tx", `${tx}px`);
        phoneRef.current.style.setProperty("--ty", `${ty}px`);
        phoneRef.current.style.setProperty("--mx", `${px * 100}%`);
        phoneRef.current.style.setProperty("--my", `${py * 100}%`);
    };
    const handleLeave = () => {
        if (!phoneRef.current) return;
        phoneRef.current.style.setProperty("--rx", `0deg`);
        phoneRef.current.style.setProperty("--ry", `0deg`);
        phoneRef.current.style.setProperty("--tx", `0px`);
        phoneRef.current.style.setProperty("--ty", `0px`);
        phoneRef.current.style.setProperty("--mx", `50%`);
        phoneRef.current.style.setProperty("--my", `50%`);
    };

    // floating anim
    useEffect(() => {
        if (!floating) return;
        floatCtrl.start({
            y: [-2, 2, -2],
            transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        });
    }, [floating, floatCtrl]);

    // Always show status bar; notch follows prop
    const showStatusBar = true;
    const showNotch = notch;

    const Device = (
        <motion.div
            className="phone-fx-wrap"
            animate={floatCtrl}
            whileHover={{ y: -10, scale: 1.03, rotateZ: -0.35 }}
            transition={{ type: "spring", stiffness: 520, damping: 20, mass: 0.8 }}
        >
            <div className="phone-device" ref={phoneRef}>
                <div className="phone-bezel">
                    <div className="phone-bezel-gradient" />

                    {/* Transparent overlay host for status bar + notch */}
                    <div className="phone-white">
                        {showStatusBar && (
                            <div className="status-bar">
                                <div className="sb-left">9:41</div>
                                <div className="sb-right">
                                    <svg className="sb-icon" viewBox="0 0 24 24" aria-hidden="true">
                                        <rect x="3" y="14" width="3" height="7" rx="1"></rect>
                                        <rect x="8" y="11" width="3" height="10" rx="1"></rect>
                                        <rect x="13" y="8" width="3" height="13" rx="1"></rect>
                                        <rect x="18" y="5" width="3" height="16" rx="1"></rect>
                                    </svg>
                                    <svg className="sb-icon" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M2.1 8.6a15 15 0 0 1 19.8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M5.5 12a10.5 10.5 0 0 1 13 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M9 15.2a6 6 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <circle cx="12" cy="18" r="1.6" fill="currentColor"/>
                                    </svg>
                                    <div className="sb-battery">
                                        <svg className="sb-icon-battery" viewBox="0 0 32 16" aria-hidden="true">
                                            <rect x="1" y="3" width="26" height="10" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                            <rect x="28" y="6" width="3" height="4" rx="1" ry="1" fill="currentColor"/>
                                            <rect className="sb-battery-fill" x="3" y="5" width="22" height="6" rx="1"/>
                                        </svg>
                                        <span className="sb-battery-text">100</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showNotch && (
                            <div className="phone-notch">
                                <span className="notch-speaker" />
                                <span className="notch-camera" />
                            </div>
                        )}
                    </div>

                    {/* Screen (rounded, clips img/video) */}
                    <div className="phone-screen">
                        {useImageFallback ? (
                            <img
                                className="phone-screen-img"
                                src={src}
                                alt={alt}
                                style={{
                                    transform: "translateX(var(--tx)) translateY(var(--ty)) scale(1.02)",
                                    transition: "transform 120ms ease, filter 140ms ease",
                                }}
                            />
                        ) : (
                            <video
                                ref={videoRef}
                                className="phone-screen-video"
                                src={videoSrc}
                                type={videoType}
                                poster={src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                onCanPlay={handleVideoCanPlay}
                                onError={handleVideoError}
                                style={{
                                    transform: "translateX(var(--tx)) translateY(var(--ty)) scale(1.02)",
                                    transition: "transform 120ms ease, filter 140ms ease",
                                }}
                            />
                        )}

                        {glow && <div className="phone-screen-glow" />}
                        {glare && <div className="phone-screen-glare" />}
                        <div className="phone-hover-glow" />
                        <div className="phone-edge-sheen" />
                    </div>
                </div>

                <span className="side-btn btn-power" />
                <span className="side-btn btn-vol-up" />
                <span className="side-btn btn-vol-down" />
            </div>
        </motion.div>
    );

    const Wrapper = (
        <motion.div
            className={`phone-card ${className}`}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onClick={onClick}
            initial={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.45))", opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.35, margin: "0px 0px -10% 0px" }}
            whileHover={{ filter: "drop-shadow(0 44px 90px rgba(0,0,0,0.7))" }}
            transition={{ duration: 0.14, ease: "easeOut" }}
        >
            {Device}
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className="phone-link">
                {Wrapper}
            </a>
        );
    }
    return Wrapper;
}