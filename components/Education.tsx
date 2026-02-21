import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { EDUCATION } from '../constants';

// ─── Types ─────────────────────────────────────────────────────────────────────
/**
 * Expected shape of each EDUCATION item. Add optional fields to your constants:
 *
 * {
 *   degree: "B.Tech in Computer Science",
 *   institution: "IIT Bombay",
 *   institutionUrl: "https://iitb.ac.in",   // optional — links institution name
 *   period: "2019 – 2023",
 *   location: "Mumbai, India",              // optional
 *   grade: "9.1 / 10 CGPA",               // optional — GPA / grade / percentage
 *   current: true,                          // pulsing "Ongoing" badge
 *   notes: "Thesis on distributed query optimisation.",
 *   highlights: ["Dean's List 2022", "Merit Scholarship"],   // optional key wins
 *   coursework: ["Algorithms", "OS", "ML", "Databases"],     // optional tag row
 * }
 */
interface EducationItem {
    degree: string;
    institution: string;
    institutionUrl?: string;
    period: string;
    location?: string;
    grade?: string;
    current?: boolean;
    notes?: string;
    highlights?: string[];
    coursework?: string[];
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
const GraduationIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
);

const PinIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);

const QuoteIcon = () => (
    <svg className="w-4 h-4 opacity-40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
);

// ─── Education Card ────────────────────────────────────────────────────────────
const EducationCard: React.FC<{
    edu: EducationItem;
    index: number;
    inView: boolean;
    isLast: boolean;
}> = ({ edu, index, inView, isLast }) => {
    return (
        <div
            className="relative flex gap-6 md:gap-8"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.6s ease ${index * 180}ms, transform 0.6s ease ${index * 180}ms`,
            }}
        >
            {/* ── Timeline node + spine ── */}
            <div className="relative flex flex-col items-center">
                {/* Node */}
                <div className={`relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all duration-300
          ${edu.current
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                }`}
                >
                    <GraduationIcon />
                    {edu.current && (
                        <span className="absolute inset-0 rounded-2xl bg-blue-500/40 animate-ping" />
                    )}
                </div>

                {/* Spine */}
                {!isLast && (
                    <div
                        className="w-0.5 flex-1 mt-3 rounded-full"
                        style={{
                            background: inView
                                ? 'linear-gradient(to bottom, #6366f1, #e5e7eb)'
                                : 'transparent',
                            minHeight: '2rem',
                            transition: 'background 0.8s ease 400ms',
                        }}
                    />
                )}
            </div>

            {/* ── Card ── */}
            <div className="flex-1 mb-10 rounded-2xl border border-gray-200 dark:border-gray-700/70
        bg-white dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden
        transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5
        hover:border-blue-200 dark:hover:border-blue-800/60 group">

                {/* Gradient top accent bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-blue-400/50 to-indigo-500/50
          group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300" />

                <div className="p-6 md:p-7">
                    {/* ── Top row: badges + grade ── */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {edu.current && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase
                px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400
                border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ongoing
              </span>
                        )}

                        {edu.grade && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase
                px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400
                border border-amber-100 dark:border-amber-800">
                <StarIcon />
                                {edu.grade}
              </span>
                        )}
                    </div>

                    {/* ── Degree & Institution ── */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-1
            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {edu.degree}
                    </h3>

                    <p className="text-sm font-semibold mb-3">
                        {edu.institutionUrl ? (
                            <a
                                href={edu.institutionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {edu.institution}
                            </a>
                        ) : (
                            <span className="text-blue-600 dark:text-blue-400">{edu.institution}</span>
                        )}
                    </p>

                    {/* ── Meta row ── */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-400 dark:text-gray-500 mb-5">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
                {edu.period}
            </span>
                        {edu.location && (
                            <span className="inline-flex items-center gap-1.5">
                <PinIcon />
                                {edu.location}
              </span>
                        )}
                    </div>

                    {/* ── Highlights ── */}
                    {edu.highlights && edu.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {edu.highlights.map((h, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold
                  px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40
                  text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
                  ⚡ {h}
                </span>
                            ))}
                        </div>
                    )}

                    {/* ── Notes / Thesis ── */}
                    {edu.notes && (
                        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 mb-5">
              <span className="text-blue-400 dark:text-blue-500 shrink-0 mt-0.5">
                <QuoteIcon />
              </span>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                                {edu.notes}
                            </p>
                        </div>
                    )}

                    {/* ── Coursework tags ── */}
                    {edu.coursework && edu.coursework.length > 0 && (
                        <div>
                            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2.5">
                                Key Coursework
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {edu.coursework.map((course, i) => (
                                    <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full
                    bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400
                    border border-gray-200 dark:border-gray-700">
                    {course}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const Education: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const educationList = EDUCATION as EducationItem[];

    return (
        <Section id="education" className="py-24">
            <div ref={sectionRef}>
                {/* ── Header ── */}
                <div
                    className="text-center mb-16"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
            tracking-widest uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400
            border border-blue-100 dark:border-blue-900 mb-5">
                        <GraduationIcon />
                        Academic Background
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Education
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                        The academic foundation behind{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
              every system built and problem solved.
            </span>
                    </p>
                </div>

                {/* ── Timeline ── */}
                <div className="max-w-3xl mx-auto">
                    {educationList.map((edu, index) => (
                        <EducationCard
                            key={index}
                            edu={edu}
                            index={index}
                            inView={inView}
                            isLast={index === educationList.length - 1}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Education;