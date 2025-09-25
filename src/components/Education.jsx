import React, { useEffect, useRef, useState } from 'react';
import '../css/components/Education.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSemesters, setOpenSemesters] = useState({});
    const educationTitle = "education-title"
    const educationTitleRef = useRef(null);
    const educationTextRef = useRef(null);

    const semesterRefs = useRef([]);
    semesterRefs.current = [];



    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://portfolio-2025-e176f-default-rtdb.firebaseio.com/.json');
                if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
                const data = await response.json();

                const educationData = data.education || {};
                const formattedCourses = Object.entries(educationData).map(([id, course]) => ({
                    id,
                    ...course,
                }));

                setCourses(formattedCourses);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (educationTitleRef.current){
            gsap.fromTo(
                educationTitleRef.current,
                {x: -20, autoAlpha: 0},
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: .4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: educationTitleRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    }
                }
            )
        }
    })

    useEffect(() => {
        if (educationTextRef.current){
            gsap.fromTo(educationTextRef.current,
                {x: 20, autoAlpha: 0},
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: .4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: educationTitleRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    }
                }
                )
        }
    });


    // Animate each semester accordion block
    useEffect(() => {
        semesterRefs.current.forEach((el, i) => {
            const direction = i % 2 === 0 ? -100 : 100;

            gsap.fromTo(
                el,
                { x: direction, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        end: 'top 50%',
                        scrub: 1,
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });
    }, [courses]);

    const toggleSemester = (semester) => {
        setOpenSemesters((prev) => ({
            ...prev,
            [semester]: !prev[semester],
        }));
    };

    if (loading) return <p>Loading education...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!courses.length) return <p>No courses found.</p>;

    const groupedBySemester = courses.reduce((acc, course) => {
        acc[course.semester] = acc[course.semester] || [];
        acc[course.semester].push(course);
        return acc;
    }, {});

    return (
        <section id="education">
            <div className="education-container">
                <div className="education-intro">
                    <h2 ref={educationTitleRef}>Education</h2>
                    <p className="education-text" ref={educationTextRef}>
                        Bachelor of Science with a major in Computer Science (Software Engineering) from{" "}
                        <a
                            href="https://www.miun.se/utbildning/program/programvaruteknik2/?lang=en-GB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="education-link"
                            data-cursor-hover
                        >
                            Mid Sweden University (Mittuniversitetet)
                        </a>. This program covered topics such as software design, full-stack
                        development, databases, software testing, algorithms, agile methodologies,
                        and distributed systems. Emphasis was placed on hands-on projects, modern
                        tools, and collaboration in software engineering teams.
                    </p>
                </div>

                {Object.entries(groupedBySemester)
                    .sort(([a], [b]) => {
                        const parseSemester = (s) => {
                            const [season, year] = s.split(' ');
                            const seasonValue = season === 'Spring' ? 0 : 1;
                            return { year: parseInt(year), seasonValue };
                        };

                        const aSem = parseSemester(a);
                        const bSem = parseSemester(b);

                        if (aSem.year !== bSem.year) {
                            return bSem.year - aSem.year;
                        }

                        return bSem.seasonValue - aSem.seasonValue;
                    })
                    .map(([semester, semesterCourses], i) => {
                        const sortedCourses = semesterCourses.sort((a, b) => b.date?.seconds - a.date?.seconds);

                        return (
                            <div
                                key={semester}
                                className="accordion-block"
                                ref={(el) => el && (semesterRefs.current[i] = el)}>
                                <button data-cursor-hover className="semester-toggle" onClick={() => toggleSemester(semester)}>
                                    <span className="semester-title">{semester}</span>
                                    <span className="toggle-icon">{openSemesters[semester] ? '−' : '+'}</span>
                                </button>
                                <div className={`accordion-content ${openSemesters[semester] ? 'open' : ''}`}>
                                    <ul className="course-list">
                                        {sortedCourses.map(({ id, name, credits, description, tags, url }) => (
                                            <li key={id} className="education-item">
                                                <h3>
                                                    <a className="edu-link" data-cursor-hover href={url} target="_blank" rel="noopener noreferrer">
                                                        {name}
                                                    </a>
                                                    <small> ({credits} hp)</small>
                                                </h3>
                                                <p>{description}</p>
                                                <p className="course-code">Course Code: {id}</p>
                                                {tags?.length > 0 && (
                                                    <p>
                                                        {tags.map((tag) => (
                                                            <span key={tag} className="tag">
                                                            #{tag}
                                                        </span>
                                                        ))}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
            </div>

        </section>
    );
};

export default Education;