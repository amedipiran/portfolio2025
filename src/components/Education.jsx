import React, { useEffect, useState } from 'react';
import '../css/components/Education.css';

const Education = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSemesters, setOpenSemesters] = useState({});

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
        <section id="education" className="education-container">
            <h2>Education</h2>

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
                .map(([semester, semesterCourses]) => {
                    const sortedCourses = semesterCourses.sort((a, b) => b.date?.seconds - a.date?.seconds);

                    return (
                        <div key={semester} className="accordion-block">
                            <button data-cursor-hover className="semester-toggle" onClick={() => toggleSemester(semester)}>
                                <span className="semester-title">{semester}</span>
                                <span className="toggle-icon">{openSemesters[semester] ? '−' : '+'}</span>
                            </button>
                            <div className={`accordion-content ${openSemesters[semester] ? 'open' : ''}`}>
                                <ul className="course-list">
                                    {sortedCourses.map(({ id, name, credits, description, tags, url }) => (
                                        <li key={id} className="education-item">
                                            <h3>
                                                <a href={url} target="_blank" rel="noopener noreferrer">
                                                    {name}
                                                </a>
                                                <small> ({credits} hp)</small>
                                            </h3>
                                            <p>{description}</p>
                                            <p>Course Code: {id}</p>
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
        </section>
    );
};

export default Education;