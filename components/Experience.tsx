import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';

interface ExperienceItem {
    role: string;
    company: string;
    companyUrl?: string;
    period: string;
    location?: string;
    type?: 'Full-time' | 'Contract' | 'Internship' | string;
    current?: boolean;
    description: string[];
    highlights?: string[];
    skills?: string[];
}

const TYPE_CONFIG: Record<string, string> = {
    'Full-time': 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900',
    Contract: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900',
    Internship: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900',
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700',
};

const BriefcaseIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V14.15M16.5 4.5V3a1.5 1.5 0 00-1.5-1.5H9A1.5 1.5 0 007.5 3v1.5M16.5 4.5H7.5M16.5 4.5h3.75A1.5 1.5 0 0121.75 6v4.15M7.5 4.5H3.75A1.5 1.5 0 002.25 6v4.15m19.5 0a2.625 2.625 0 01-5.25 0m5.25 0H21m-19.5 0H2.25m19.5 0a2.625 2.625 0 00-5.25 0M2.25 10.15a2.625 2.625 0 005.25 0" />
    </svg>
);
const PinIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);
const CalendarIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
);
const CheckIcon = () => (
    <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

// ─── Card ──────────────────────────────────────────────────────────────────────
const ExperienceCard: React.FC<{
    job: ExperienceItem; index: number; inView: boolean; isLast: boolean;
}> = ({ job, index, inView, isLast }) => {
    const [expanded, setExpanded] = useState(index === 0);
    const typeStyle = TYPE_CONFIG[job.type ?? ''] ?? TYPE_CONFIG.default;

    return (
        <div
            className="relative flex gap-6 md:gap-8"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
            }}
        >
            {/* Timeline node + spine */}
            <div className="relative flex flex-col items-center">
                <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-all duration-300
                    ${job.current
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30'
                    : 'bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 backdrop-blur-sm'
                }`}
                >
                    <BriefcaseIcon />
                    {job.current && <span className="absolute inset-0 rounded-xl bg-blue-500/40 animate-ping" />}
                </div>
                {!isLast && (
                    <div
                        className={`w-0.5 flex-1 mt-3 transition-all duration-700 rounded-full
                            ${inView ? 'bg-gradient-to-b from-blue-300 dark:from-blue-700 to-gray-200 dark:to-gray-800' : 'bg-transparent'}`}
                        style={{ minHeight: '2rem' }}
                    />
                )}
            </div>

            {/* Card */}
            <div className={`flex-1 mb-10 rounded-2xl border transition-all duration-300 backdrop-blur-sm
                ${expanded
                ? 'border-blue-200 dark:border-blue-800/60 shadow-lg shadow-blue-500/5 bg-white/90 dark:bg-gray-900/80'
                : 'border-white/80 dark:border-gray-700/50 shadow-sm hover:shadow-md hover:border-blue-200/70 dark:hover:border-blue-900/60 bg-white/60 dark:bg-gray-900/50'
            }`}
            >
                <button
                    onClick={() => setExpanded(e => !e)}
                    className="w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                    aria-expanded={expanded}
                >
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{job.role}</h3>
                            <p className="text-sm font-semibold mt-0.5">
                                {job.companyUrl ? (
                                    <a href={job.companyUrl} target="_blank" rel="noopener noreferrer"
                                       onClick={e => e.stopPropagation()}
                                       className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >{job.company}</a>
                                ) : (
                                    <span className="text-blue-600 dark:text-blue-400">{job.company}</span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            {job.current && (
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase
                                    px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400
                                    border border-emerald-200 dark:border-emerald-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Current
                                </span>
                            )}
                            {job.type && (
                                <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${typeStyle}`}>
                                    {job.type}
                                </span>
                            )}
                            <span className={`ml-1 text-gray-400 dark:text-gray-600 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-500">
                        <span className="inline-flex items-center gap-1.5"><CalendarIcon />{job.period}</span>
                        {job.location && <span className="inline-flex items-center gap-1.5"><PinIcon />{job.location}</span>}
                    </div>

                    {job.highlights && job.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {job.highlights.map((h, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold
                                    px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40
                                    text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
                                    ⚡ {h}
                                </span>
                            ))}
                        </div>
                    )}
                </button>

                <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: expanded ? '1000px' : '0' }}>
                    <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800/60 pt-5 space-y-5">
                        <ul className="space-y-3">
                            {job.description.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50
                                        flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <CheckIcon />
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        {job.skills && job.skills.length > 0 && (
                            <div>
                                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2.5">
                                    Technologies Used
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {job.skills.map((skill, i) => (
                                        <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full
                                            bg-white/80 dark:bg-gray-800 text-gray-600 dark:text-gray-400
                                            border border-gray-200 dark:border-gray-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Main ──────────────────────────────────────────────────────────────────────
const Experience: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        // Fire immediately if already in viewport (e.g. section near top of page)
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                setInView(true);
                return;
            }
        }
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.05, rootMargin: '0px 0px -50px 0px' },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const jobs = EXPERIENCE as ExperienceItem[];

    return (
        // ── Full-bleed backdrop wrapper ────────────────────────────────────────
        // This sits outside <Section> so the background fills edge-to-edge
        // regardless of the content max-width constraint inside Section.
        <div className="relative w-full overflow-hidden">

            {/* 1. Base gradient wash */}
            <div className="absolute inset-0
                bg-gradient-to-b from-white via-blue-50/50 to-white
                dark:from-gray-950 dark:via-[#0d1829] dark:to-gray-950"
            />

            {/* 2. Mesh orbs */}
            <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full
                bg-blue-300/20 dark:bg-blue-800/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-48 -right-48 w-[560px] h-[560px] rounded-full
                bg-indigo-300/20 dark:bg-indigo-800/15 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full
                bg-sky-200/15 dark:bg-sky-900/10 blur-3xl pointer-events-none" />

            {/* 3. Dot-grid texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                }}
            />

            {/* 4. Top + bottom feather — blends seamlessly with adjacent sections */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b
                from-white dark:from-gray-950 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t
                from-white dark:from-gray-950 to-transparent pointer-events-none" />

            {/* 5. Content */}
            <Section id="experience" className="relative z-10 py-24">
                <div ref={sectionRef}>

                    {/* Header */}
                    <div
                        className="text-center mb-16"
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.6s ease, transform 0.6s ease',
                        }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                            tracking-widest uppercase bg-white/80 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400
                            border border-blue-100 dark:border-blue-900 mb-5 backdrop-blur-sm shadow-sm">
                            <BriefcaseIcon />
                            Career Timeline
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Professional Experience
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                            A journey of{' '}
                            <span className="text-blue-600 dark:text-blue-400 font-medium">growth, leadership, and impact</span>
                            {' '}across high-scale engineering environments.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="max-w-3xl mx-auto">
                        {jobs.map((job, index) => (
                            <ExperienceCard
                                key={index}
                                job={job}
                                index={index}
                                inView={inView}
                                isLast={index === jobs.length - 1}
                            />
                        ))}
                    </div>

                </div>
            </Section>
        </div>
    );
};

export default Experience;