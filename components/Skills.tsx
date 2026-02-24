import React, {useEffect, useRef, useState} from 'react';
import Section from './Section';
import {SKILLS} from '../constants';

// ─── react-icons — verified exports only ───────────────────────────────────────
// npm install react-icons
//
// Every import below has been cross-checked against Simple Icons (react-icons/si).
// Icons that don't exist in /si are sourced from /fa, /md, or /tb instead.
// react-icons/si  →  Simple Icons (brand logos)
import {
    SiDocker,
    SiGit,
    SiGithub,
    SiJavascript,
    SiJenkins,
    SiMysql,
    SiNextdotjs,
    SiPostgresql,
    SiPython,
    SiSpring,
} from 'react-icons/si';

// react-icons/vsc  →  VS Code Icons (for Azure DevOps, which isn't in Simple Icons)
import {VscAzureDevops} from "react-icons/vsc";

// react-icons/fa  →  Font Awesome  (for brands /si doesn't cover)
import {FaBrain, FaCogs, FaDatabase, FaJava, FaSearch,} from 'react-icons/fa';

// react-icons/tb  →  Tabler Icons
import {TbApi, TbVectorBezier2,} from 'react-icons/tb';

// react-icons/md  →  Material Design Icons
import {MdOutlineAutoGraph, MdOutlineHub,} from 'react-icons/md';

// ─── Logo Registry ─────────────────────────────────────────────────────────────
// Add new skills here. Find Si icons at: https://react-icons.github.io/react-icons/icons/si
const LOGOS: Record<string, { icon: React.ElementType; color: string }> = {
    // Languages
    Java: {icon: FaJava, color: '#E76F00'},
    JavaScript: {icon: SiJavascript, color: '#F7DF1E'},
    Python: {icon: SiPython, color: '#3776AB'},

    // Frameworks & Libraries
    'Spring Boot': {icon: SiSpring, color: '#6DB33F'},
    'Next.js': {icon: SiNextdotjs, color: '#000000'},
    REST: {icon: TbApi, color: '#6366F1'},
    Hibernate: {icon: FaDatabase, color: '#59666C'},  // no Si icon exists
    LangChain: {icon: MdOutlineHub, color: '#1FB8CD'},  // no Si icon exists

    // AI/ML
    LLMs: {icon: FaBrain, color: '#8B5CF6'},
    'Retrieval-Augmented Generation (RAG)': {icon: FaSearch, color: '#7C3AED'},
    'Vector Search': {icon: TbVectorBezier2, color: '#6D28D9'},
    'AI-driven Analytics': {icon: MdOutlineAutoGraph, color: '#5B21B6'},

    // Databases
    'MS SQL Server': {icon: FaDatabase, color: '#CC2927'},
    PostgreSQL: {icon: SiPostgresql, color: '#336791'},
    MySQL: {icon: SiMysql, color: '#4479A1'},
    'Performance Tuning': {icon: FaCogs, color: '#0EA5E9'},

    // DevOps & Tools
    'Azure DevOps': {icon: VscAzureDevops, color: '#0078D7'},  // SiAzuredevops ≠ valid
    Docker: {icon: SiDocker, color: '#2496ED'},
    Jenkins: {icon: SiJenkins, color: '#D33833'},
    GitHub: {icon: SiGithub, color: '#181717'},
    Git: {icon: SiGit, color: '#F05032'},
};

// ─── Category Config ───────────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, {
    icon: React.ReactNode;
    gradient: string;
    badge: string;
    accentText: string;
}> = {
    Languages: {
        gradient: 'from-orange-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:to-yellow-500/20',
        badge: 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-900',
        accentText: 'text-orange-600 dark:text-orange-400',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
            </svg>
        ),
    },
    'Frameworks & Libraries': {
        gradient: 'from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20',
        badge: 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900',
        accentText: 'text-green-600 dark:text-green-400',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
            </svg>
        ),
    },
    'AI/ML': {
        gradient: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20',
        badge: 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900',
        accentText: 'text-violet-600 dark:text-violet-400',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
            </svg>
        ),
    },
    Databases: {
        gradient: 'from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20',
        badge: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900',
        accentText: 'text-blue-600 dark:text-blue-400',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
            </svg>
        ),
    },
    'DevOps & Tools': {
        gradient: 'from-red-500/10 to-rose-500/10 dark:from-red-500/20 dark:to-rose-500/20',
        badge: 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900',
        accentText: 'text-red-600 dark:text-red-400',
        icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
            </svg>
        ),
    },
};

// ─── Language Hero Card ────────────────────────────────────────────────────────
const LanguageHeroCard: React.FC<{ name: string; inView: boolean; delay: number }> = ({
                                                                                          name, inView, delay,
                                                                                      }) => {
    const entry = LOGOS[name];
    const Icon = entry?.icon;

    return (
        <div
            className="group relative flex flex-col items-center justify-center p-8 rounded-2xl
        border border-gray-200 dark:border-gray-700/80
        bg-white dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden
        transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/8
        hover:border-gray-300 dark:hover:border-gray-600 cursor-default aspect-square"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.95)',
                transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
            }}
        >
            {/* Brand-colour radial glow on hover */}
            {entry && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{background: `radial-gradient(circle at 50% 60%, ${entry.color}25 0%, transparent 70%)`}}
                />
            )}

            {/* Icon */}
            <div
                className="relative mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                {Icon ? (
                    <Icon size={56} color={entry.color} title={name}/>
                ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-500">{name[0]}</span>
                    </div>
                )}
            </div>

            <p className="text-sm font-bold text-gray-800 dark:text-gray-100 text-center z-10">{name}</p>

            {/* Bottom sweep bar */}
            <div
                className="absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-700 ease-out"
                style={{
                    background: entry?.color ?? '#6366f1',
                    width: inView ? '100%' : '0%',
                    transitionDelay: `${delay + 350}ms`,
                }}
            />
        </div>
    );
};

// ─── Skill Chip ────────────────────────────────────────────────────────────────
const SkillChip: React.FC<{ name: string; inView: boolean; delay: number }> = ({
                                                                                   name, inView, delay,
                                                                               }) => {
    const entry = LOGOS[name];
    const Icon = entry?.icon;

    return (
        <div
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
        border border-gray-200 dark:border-gray-700/70
        bg-white dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 text-sm font-medium
        hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:-translate-y-0.5
        transition-all duration-200 cursor-default select-none"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
            }}
        >
            {Icon ? (
                <span
                    className="shrink-0 transition-transform duration-200 group-hover:scale-110 leading-none flex items-center">
          <Icon size={15} color={entry.color} title={name}/>
        </span>
            ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0"/>
            )}
            {name}
        </div>
    );
};

// ─── Category Card ─────────────────────────────────────────────────────────────
const CategoryCard: React.FC<{
    category: string;
    skills: string[];
    inView: boolean;
    cardDelay: number;
}> = ({category, skills, inView, cardDelay}) => {
    const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG['DevOps & Tools'];

    return (
        <div
            className="rounded-2xl border border-gray-200 dark:border-gray-700/70
        bg-white dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden
        transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${cardDelay}ms, transform 0.6s ease ${cardDelay}ms`,
            }}
        >
            <div className={`px-6 pt-5 pb-4 bg-gradient-to-br ${config.gradient}`}>
                <div className="flex items-center gap-2.5">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center border ${config.badge}`}>
            {config.icon}
          </span>
                    <h3 className={`text-sm font-bold tracking-wide ${config.accentText}`}>{category}</h3>
                    <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-mono">
            {skills.length} skills
          </span>
                </div>
            </div>

            <div className="px-5 py-5 flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <SkillChip key={skill} name={skill} inView={inView} delay={cardDelay + 80 + i * 50}/>
                ))}
            </div>
        </div>
    );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const Skills: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true);
            },
            {threshold: 0.1},
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const allEntries = Object.entries(SKILLS as Record<string, string[]>);
    const languages = allEntries.find(([cat]) => cat === 'Languages')?.[1] ?? [];
    const otherCategories = allEntries.filter(([cat]) => cat !== 'Languages');
    const totalSkills = allEntries.reduce((acc, [, s]) => acc + s.length, 0);

    return (
        <Section id="skills" className="py-24">
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
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>
                        </svg>
                        Technical Toolkit
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Technical Proficiency
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                        A curated stack for building{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">modern, scalable, intelligent software</span>
                        {' '}— from systems to AI.
                    </p>
                </div>

                {/* ── Language Hero Bento ── */}
                <div className="mb-6">
                    <p
                        className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4 text-center"
                        style={{opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 100ms'}}
                    >
                        Core Languages
                    </p>
                    <div
                        className="grid gap-5 max-w-xl mx-auto"
                        style={{gridTemplateColumns: `repeat(${languages.length}, 1fr)`}}
                    >
                        {languages.map((lang, i) => (
                            <LanguageHeroCard key={lang} name={lang} inView={inView} delay={150 + i * 100}/>
                        ))}
                    </div>
                </div>

                {/* ── Divider ── */}
                <div
                    className="flex items-center gap-4 my-10 max-w-3xl mx-auto"
                    style={{opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 500ms'}}
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-700"/>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300 dark:text-gray-600">Full Stack</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-700"/>
                </div>

                {/* ── Category Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {otherCategories.map(([category, skills], i) => (
                        <CategoryCard
                            key={category}
                            category={category}
                            skills={skills}
                            inView={inView}
                            cardDelay={600 + i * 120}
                        />
                    ))}
                </div>

                {/* ── Summary Strip ── */}
                <div
                    className="mt-14 flex flex-wrap justify-center gap-10"
                    style={{opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 900ms'}}
                >
                    {[
                        {value: totalSkills, label: 'Technologies'},
                        {value: Object.keys(SKILLS).length, label: 'Domains'},
                        {value: `${new Date().getFullYear() - 2020}+`, label: 'Years Coding'},
                    ].map(({value, label}) => (
                        <div key={label} className="flex flex-col items-center">
                            <span
                                className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono tracking-tight">{value}</span>
                            <span
                                className="text-xs text-gray-400 dark:text-gray-500 mt-1 tracking-widest uppercase">{label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </Section>
    );
};

export default Skills;