import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';

// ─── Types ─────────────────────────────────────────────────────────────────────
/**
 * Expected shape of each PROJECTS item. Add these fields to your constants:
 *
 * {
 *   title: "QueryIQ",
 *   description: "...",
 *   longDescription: "Optional deeper context shown on hover / expand",
 *   impact: ["10x faster queries", "40% cost reduction"],
 *   tags: ["Python", "PostgreSQL", "Redis"],
 *   category: "Data Systems",   // used for filter tabs
 *   status: "Production",       // "Production" | "Open Source" | "WIP"
 *   featured: true,             // pins to top as a hero card
 *   year: "2024",
 *   github: "https://...",
 *   demo: "https://...",
 * }
 */
interface Project {
    title: string;
    description: string;
    longDescription?: string;
    impact?: string[];
    tags: string[];
    category?: string;
    status?: 'Production' | 'Open Source' | 'WIP' | string;
    featured?: boolean;
    year?: string;
    github?: string;
    demo?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { bg: string; dot: string; text: string }> = {
    Production: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800',
        dot: 'bg-emerald-500',
        text: 'text-emerald-700 dark:text-emerald-400',
    },
    'Open Source': {
        bg: 'bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800',
        dot: 'bg-violet-500',
        text: 'text-violet-700 dark:text-violet-400',
    },
    WIP: {
        bg: 'bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800',
        dot: 'bg-amber-500 animate-pulse',
        text: 'text-amber-700 dark:text-amber-400',
    },
    default: {
        bg: 'bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700',
        dot: 'bg-gray-400',
        text: 'text-gray-600 dark:text-gray-400',
    },
};

const getStatus = (s?: string) => STATUS_CONFIG[s ?? ''] ?? STATUS_CONFIG.default;

// ─── External Link Icon ────────────────────────────────────────────────────────
const ExternalIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const GithubIcon = () => (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 6.8c1.02.005 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

// ─── Featured Card (large, hero-style) ────────────────────────────────────────
const FeaturedCard: React.FC<{ project: Project; inView: boolean; delay: number }> = ({
                                                                                          project, inView, delay,
                                                                                      }) => {
    const status = getStatus(project.status);

    return (
        <div
            className="group relative rounded-2xl border border-gray-200 dark:border-gray-700/80
        bg-white dark:bg-gray-900/70 backdrop-blur-sm overflow-hidden
        transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1
        hover:border-blue-200 dark:hover:border-blue-800/60"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
            }}
        >
            {/* Gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

            <div className="p-8 md:p-10">
                {/* Top row */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    {/* Featured badge */}
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase
            px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400
            border border-blue-100 dark:border-blue-900">
            ★ Featured
          </span>

                    {/* Status */}
                    {project.status && (
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${status.bg} ${status.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {project.status}
            </span>
                    )}

                    {/* Year */}
                    {project.year && (
                        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-mono">{project.year}</span>
                    )}
                </div>

                <div className="md:flex md:gap-10">
                    {/* Left: main content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="text-xs font-medium px-3 py-1 rounded-full
                  bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
                  border border-gray-200 dark:border-gray-700">
                  {tag}
                </span>
                            ))}
                        </div>

                        {/* CTA Links */}
                        <div className="flex gap-4">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    bg-gray-900 dark:bg-white text-white dark:text-gray-900
                    hover:scale-105 transition-transform duration-200 shadow-md">
                                    <GithubIcon /> View Code
                                </a>
                            )}
                            {project.demo && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400
                    hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:scale-105 transition-all duration-200">
                                    Live Demo <ExternalIcon />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right: Impact metrics */}
                    {project.impact && project.impact.length > 0 && (
                        <div className="mt-8 md:mt-0 md:w-60 shrink-0">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-3">
                                Impact Highlights
                            </p>
                            <div className="space-y-2.5">
                                {project.impact.map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl
                    bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 hover:bg-gray-100/10 hover:border-blue-500 hover:shadow-md dark:hover:bg-gray-700/80 transition-colors">
                    <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50
                      flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                                        <span className="text-xs text-gray-600 dark:text-gray-300 leading-snug font-medium hover:text-blue-600 dark:hover:text-white transition-colors">
                      {item}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Standard Card ─────────────────────────────────────────────────────────────
const ProjectCard: React.FC<{ project: Project; inView: boolean; delay: number }> = ({
                                                                                         project, inView, delay,
                                                                                     }) => {
    const status = getStatus(project.status);

    return (
        <div
            className="group flex flex-col h-full rounded-2xl border border-gray-200 dark:border-gray-700/80
        bg-white dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden
        transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/8 hover:-translate-y-1.5
        hover:border-blue-200 dark:hover:border-blue-800/60"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
            }}
        >
            {/* Thin top accent */}
            <div className="h-[3px] w-full bg-gradient-to-r from-blue-400/60 to-indigo-400/60
        group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300" />

            <div className="flex flex-col flex-1 p-6">
                {/* Status + Year row */}
                <div className="flex items-center gap-2 mb-4">
                    {project.status && (
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {project.status}
            </span>
                    )}
                    {project.year && (
                        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-mono">{project.year}</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2
          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
                    {project.description}
                </p>

                {/* Impact pills */}
                {project.impact && project.impact.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.impact.map((item, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-[11px] font-semibold
                px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300
                border border-blue-100 dark:border-blue-900/50">
                ⚡ {item}
              </span>
                        ))}
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full
              bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400
              border border-gray-200 dark:border-gray-700/60">
              {tag}
            </span>
                    ))}
                </div>

                {/* CTA row */}
                {(project.github || project.demo) && (
                    <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                               className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400
                  hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <GithubIcon /> Code
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer"
                               className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400
                  hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <ExternalIcon /> Live Demo
                            </a>
                        )}
                        {/* Arrow hover cue */}
                        <span className="ml-auto text-gray-300 dark:text-gray-700 group-hover:text-blue-400 dark:group-hover:text-blue-600
              group-hover:translate-x-1 transition-all duration-200 text-sm">→</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('All');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Derive filter tabs from data
    const allCategories = ['All', ...Array.from(
        new Set((PROJECTS as Project[]).map((p) => p.category).filter(Boolean) as string[])
    )];

    const featured = (PROJECTS as Project[]).filter((p) => p.featured);
    const standard = (PROJECTS as Project[])
        .filter((p) => !p.featured)
        .filter((p) => activeFilter === 'All' || p.category === activeFilter);

    return (
        <Section id="projects" className="py-24">
            <div ref={sectionRef}>
                {/* ── Header ── */}
                <div
                    className="text-center mb-14"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
            tracking-widest uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400
            border border-blue-100 dark:border-blue-900 mb-5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        Selected Work
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Key Projects
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Real-world systems built to solve{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
              performance, scalability, and data intelligence
            </span>{' '}
                        challenges at scale.
                    </p>
                </div>

                {/* ── Featured Projects ── */}
                {featured.length > 0 && (
                    <div className="space-y-6 mb-10">
                        {featured.map((project, i) => (
                            <FeaturedCard key={i} project={project} inView={inView} delay={i * 100} />
                        ))}
                    </div>
                )}

                {/* ── Standard Projects Grid ── */}
                {standard.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {standard.map((project, i) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                inView={inView}
                                delay={featured.length > 0 ? 200 + i * 100 : i * 100}
                            />
                        ))}
                    </div>
                )}

                {/* ── Empty state for filters ── */}
                {standard.length === 0 && featured.length === 0 && (
                    <div className="text-center py-20 text-gray-400 dark:text-gray-600">
                        No projects in this category yet.
                    </div>
                )}

                {/* ── Footer CTA ── */}
                <div
                    className="text-center mt-14"
                    style={{
                        opacity: inView ? 1 : 0,
                        transition: 'opacity 0.6s ease 600ms',
                    }}
                >
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
              border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300
              hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400
              hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <GithubIcon />
                        View Projects on GitHub
                        <ExternalIcon />
                    </a>
                </div>
            </div>
        </Section>
    );
};

export default Projects;