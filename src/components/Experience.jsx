// src/components/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../css/components/Experience.css';

const xp = [
    {
        title: 'Freelance Software Developer',
        company: 'Self-employed',
        location: 'Remote',
        dates: 'Jan 2024 – Present',
        bullets: [
            'Delivered websites and custom system solutions for clients including Primate Lounge, covering both frontend and backend.',
            'Worked across modern stacks, ensuring performance, accessibility, and clean deployment pipelines.',
        ],
    },
    {
        title: 'Coordinator & Coach',
        company: 'Work For You AB',
        location: 'Norrköping',
        dates: 'Jan 2021 – Sep 2024',
        bullets: [
            'Guided job seekers toward employment or studies through structured coaching and follow-ups.',
            'Ensured effective use of resources based on participant needs; collaborated across teams and stakeholders.',
        ],
    },
    {
        title: 'Youth Leader (Perrongen / Lokstallarna)',
        company: 'Katrineholm Municipality',
        location: 'Katrineholm',
        dates: 'Jan 2018 – Dec 2020',
        bullets: [
            'Promoted meaningful leisure activities and supported youth in building positive relationships.',
        ],
    },
    {
        title: 'Substitute Librarian (Järvenskolan Tallås)',
        company: 'Katrineholm Municipality',
        location: 'Katrineholm',
        dates: 'Jan 2020 – Dec 2020',
        bullets: [
            'Helped students find and use information and literature to support their studies.',
        ],
    },
    {
        title: 'Coach (The Running Academy)',
        company: 'Katrineholm Municipality',
        location: 'Katrineholm',
        dates: 'Sep 2019 – Jun 2020',
        bullets: [
            'Supported participants in developing a healthy lifestyle and working toward personal goals.',
        ],
    },
    {
        title: 'Retail Summer Temp',
        company: 'Willys AB',
        location: 'Flen',
        dates: 'May 2018 – Aug 2018',
        bullets: [
            'Maintained store standards and delivered professional customer service in a fast-paced environment.',
        ],
    },
    {
        title: 'Night Football Leader',
        company: 'Katrineholm Municipality',
        location: 'Katrineholm',
        dates: 'Jan 2018 – May 2018',
        bullets: [
            'Drove an inclusive community initiative that increased youth participation and engagement.',
        ],
    },
    {
        title: 'Teaching Assistant (Järvenskolan Södra)',
        company: 'Katrineholm Municipality',
        location: 'Katrineholm',
        dates: 'Jan 2017 – Jan 2018',
        bullets: [
            'Improved student outcomes through structure, clear routines, and differentiated support.',
        ],
    },
    {
        title: 'Machine Operator',
        company: 'Kronfågel AB',
        location: 'Valla, Katrineholm',
        dates: 'Jan 2015 – Dec 2015',
        bullets: [
            'Operated and adjusted production machinery; performed quality control on products and packaging.',
        ],
    },
    {
        title: 'Orderly (Summer Temp)',
        company: 'Karsudden Regional Hospital',
        location: 'Katrineholm',
        dates: 'May 2014 – Aug 2014',
        bullets: [
            'Collected and communicated patient health information to support continued care and treatment.',
        ],
    },
    {
        title: 'Food Production Operator',
        company: 'Kronfågel AB',
        location: 'Valla, Katrineholm',
        dates: 'Jun 2011 – Aug 2013',
        bullets: [
            'Ensured continuous line operation and maintained hygiene and quality standards.',
        ],
    },
];

const placements = [
    {
        title: 'Intern (VFU) — Web Developer',
        company: 'Webbpoolen AB',
        location: 'Borås',
        dates: '6 months',
        bullets: [
            'Contributed to a CRM system using a custom PHP framework (backend) and React (frontend).',
        ],
    },
    {
        title: 'Intern (LIA) — Construction Projects',
        company: 'Sjötorps AB',
        location: 'Katrineholm',
        dates: '6 months',
        bullets: [
            'Performed quantity take-offs and drawing reviews to ensure accurate inputs for projects.',
        ],
    },
];

// Variants
const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const dividerGrow = {
    hidden: { scaleX: 0, transformOrigin: 'left center' },
    visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const itemLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const itemRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Experience = () => {
    return (
        <section id="experience" className="experience-section">
            <div className="experience-container">
                <header className="experience-intro">
                    <motion.h2
                        className="experience-title"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.6 }}
                    >
                        Experience
                    </motion.h2>

                    <motion.div
                        className="experience-divider"
                        variants={dividerGrow}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.7 }}
                        aria-hidden="true"
                    />

                    <motion.p
                        className="experience-lead"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ delay: 0.1 }}
                    >
                        I combine a full-stack engineering background with hands-on roles across tech,
                        coaching, education and operations. The mix makes me practical, collaborative,
                        and focused on outcomes.
                    </motion.p>
                </header>

                <ol className="xp-timeline">
                    {xp.map((job, i) => {
                        const v = i % 2 === 0 ? itemLeft : itemRight;
                        return (
                            <motion.li
                                key={i}
                                className="xp-item"
                                variants={v}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <div className="xp-meta">
                                    <span className="xp-dates">{job.dates}</span>
                                    <span className="xp-location">{job.location}</span>
                                </div>
                                <h3 className="xp-role">{job.title}</h3>
                                <p className="xp-company">{job.company}</p>
                                <ul className="xp-bullets">
                                    {job.bullets.map((b, bi) => (
                                        <li key={bi}>{b}</li>
                                    ))}
                                </ul>
                            </motion.li>
                        );
                    })}
                </ol>

                <div className="xp-subsection">
                    <motion.h3
                        className="xp-subtitle"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.6 }}
                    >
                        Internships & Placements
                    </motion.h3>

                    <ol className="xp-timeline xp-compact">
                        {placements.map((pl, i) => {
                            const v = i % 2 === 0 ? itemRight : itemLeft;
                            return (
                                <motion.li
                                    key={i}
                                    className="xp-item"
                                    variants={v}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.55 }}
                                >
                                    <div className="xp-meta">
                                        <span className="xp-dates">{pl.dates}</span>
                                        <span className="xp-location">{pl.location}</span>
                                    </div>
                                    <h4 className="xp-role">{pl.title}</h4>
                                    <p className="xp-company">{pl.company}</p>
                                    <ul className="xp-bullets">
                                        {pl.bullets.map((b, bi) => (
                                            <li key={bi}>{b}</li>
                                        ))}
                                    </ul>
                                </motion.li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Experience;