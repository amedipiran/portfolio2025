import React, { useRef } from "react";
import "../css/components/TechSwiper.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const items = [
    { name: "HTML",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Sass",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Vue",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "React",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Laravel",    src: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/laravel/laravel-line.svg" },
    { name: "PHP",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "MongoDB",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "SQL (MySQL)",src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Java",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "RxJava",     src: "https://cdn.simpleicons.org/reactivex/ff2d55" },
    { name: "C#",         src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
];


const loopItems = [...items, ...items];

export default function TechSwiper() {
    const swiperRef = useRef(null);

    return (
        <section className="tech-swiper-section">
            <div className="tech-swiper">
                <Swiper
                    modules={[Autoplay]}
                    onSwiper={(s) => (swiperRef.current = s)}
                    loop
                    loopedslides={loopItems.length}
                    loopAdditionalSlides={loopItems.length}
                    slidesPerView={6}
                    spaceBetween={8}
                    speed={12000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    allowTouchMove
                    grabCursor
                    breakpoints={{
                        1280: { slidesPerView: 7, spaceBetween: 10 },
                        1024: { slidesPerView: 6, spaceBetween: 10 },
                        768:  { slidesPerView: 5, spaceBetween: 10 },
                        640:  { slidesPerView: 4, spaceBetween: 8  },
                        0:    { slidesPerView: 3, spaceBetween: 8  },
                    }}
                >
                    {loopItems.map((it, i) => (
                        <SwiperSlide key={`${it.name}-${i}`} className="tech-slide">
                            <div className="tech-card">
                                <img className="tech-logo" src={it.src} alt={it.name} />
                                <div className="tech-label">{it.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}