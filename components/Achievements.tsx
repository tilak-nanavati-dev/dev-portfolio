import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { ACHIEVEMENTS } from '../constants';

// ─── Types ─────────────────────────────────────────────────────────────────────
/**
 * Expected shape of each ACHIEVEMENTS item. Add optional fields to your constants:
 *
 * {
 *   name: "National Coding Championship",
 *   details: "Ranked 1st among 4,000+ participants.",
 *   category: "Competitive Programming",  // drives filter tabs
 *   year: "2023",
 *   rank: "1st Place",                    // e.g. "Gold", "Top 1%", "1st / 4000"
 *   issuer: "Google",                     // org that gave the award
 *   icon: "trophy",                       // "trophy" | "star" | "code" | "medal" | "academic" | "rocket"
 *   featured: true,                       // renders larger card in a top row
 * }
 */
interface Achievement {
    name: string;
    details: string;
    category?: string;
    year?: string;
    rank?: string;
    issuer?: string;
    icon?: 'trophy' | 'star' | 'code' | 'medal' | 'academic' | 'rocket' | string;
    featured?: boolean;
}

// ─── Icon Map ──────────────────────────────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
    trophy: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
        </svg>
    ),
    star: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    ),
    code: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
    ),
    medal: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
    ),
    academic: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
    ),
    rocket: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
    ),
};

// ─── Category Color Map ────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<number, {
    icon: string; badge: string; gradient: string; bar: string; ring: string;
}> = {
    0: { icon: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400', badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900', gradient: 'from-amber-400 to-orange-400', bar: 'bg-amber-400', ring: 'ring-amber-200 dark:ring-amber-800' },
    1: { icon: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400', badge: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900', gradient: 'from-blue-400 to-indigo-500', bar: 'bg-blue-400', ring: 'ring-blue-200 dark:ring-blue-800' },
    2: { icon: 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400', badge: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 border-violet-100 dark:border-violet-900', gradient: 'from-violet-400 to-purple-500', bar: 'bg-violet-400', ring: 'ring-violet-200 dark:ring-violet-800' },
    3: { icon: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900', gradient: 'from-emerald-400 to-teal-500', bar: 'bg-emerald-400', ring: 'ring-emerald-200 dark:ring-emerald-800' },
};

const getCategoryColor = (categories: string[], cat?: string) => {
    const idx = cat ? categories.indexOf(cat) : 0;
    return CATEGORY_COLORS[idx % 4] ?? CATEGORY_COLORS[0];
};

// ─── Featured Achievement Card ─────────────────────────────────────────────────
const FeaturedCard: React.FC<{ ach: Achievement; color: typeof CATEGORY_COLORS[0]; inView: boolean; delay: number }> = ({
                                                                                                                            ach, color, inView, delay,
                                                                                                                        }) => (
    <div
        className="group relative rounded-2xl border border-gray-200 dark:border-gray-700/80
      bg-white dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden
      transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5
      hover:border-gray-300 dark:hover:border-gray-600"
        style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        }}
    >
        {/* Gradient top bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${color.gradient}`} />

        <div className="p-7 flex gap-5">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-2xl ${color.icon} flex items-center justify-center shrink-0 shadow-sm ring-4 ${color.ring}`}>
                {ICONS[ach.icon ?? 'trophy'] ?? ICONS.trophy}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    {ach.rank && (
                        <span className={`inline-flex items-center text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${color.badge}`}>
              {ach.rank}
            </span>
                    )}
                    {ach.year && (
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{ach.year}</span>
                    )}
                    <span className="ml-auto text-[10px] font-bold tracking-widest uppercase
            bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400
            border border-amber-100 dark:border-amber-900 px-2.5 py-1 rounded-full">
            ★ Featured
          </span>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug mb-1
          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ach.name}
                </h3>

                {ach.issuer && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">{ach.issuer}</p>
                )}

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{ach.details}</p>
            </div>
        </div>
    </div>
);

// ─── Standard Achievement Card ─────────────────────────────────────────────────
const AchievementCard: React.FC<{ ach: Achievement; color: typeof CATEGORY_COLORS[0]; inView: boolean; delay: number }> = ({
                                                                                                                               ach, color, inView, delay,
                                                                                                                           }) => (
    <div
        className="group flex flex-col h-full rounded-2xl border border-gray-200 dark:border-gray-700/70
      bg-white dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden
      transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-black/5
      hover:border-gray-300 dark:hover:border-gray-600"
        style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        }}
    >
        <div className="p-5 flex flex-col flex-1">
            {/* Top row: icon + year */}
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${color.icon} flex items-center justify-center shrink-0 shadow-sm`}>
                    {ICONS[ach.icon ?? 'trophy'] ?? ICONS.trophy}
                </div>
                {ach.year && (
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono mt-1">{ach.year}</span>
                )}
            </div>

            {/* Rank badge */}
            {ach.rank && (
                <span className={`self-start text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border mb-2 ${color.badge}`}>
          {ach.rank}
        </span>
            )}

            {/* Title */}
            <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-1
        group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {ach.name}
            </h3>

            {/* Issuer */}
            {ach.issuer && (
                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-2">{ach.issuer}</p>
            )}

            {/* Details */}
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">{ach.details}</p>

            {/* Category pill + accent bar */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                {ach.category && (
                    <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${color.badge}`}>
            {ach.category}
          </span>
                )}
                <div className={`mt-3 h-0.5 w-full rounded-full ${color.bar} opacity-30 group-hover:opacity-80 transition-opacity duration-300`} />
            </div>
        </div>
    </div>
);

// ─── Main Section ──────────────────────────────────────────────────────────────
const Achievements: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const allAchievements = ACHIEVEMENTS as Achievement[];

    // Derive unique categories
    const categories = Array.from(
        new Set(allAchievements.map((a) => a.category).filter(Boolean) as string[])
    );
    const filterTabs = ['All', ...categories];

    const featured = allAchievements.filter((a) => a.featured);
    const standard = allAchievements
        .filter((a) => !a.featured)
        .filter((a) => activeFilter === 'All' || a.category === activeFilter);

    return (
        <Section id="achievements" className="py-24">
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
            tracking-widest uppercase bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-500
            border border-amber-100 dark:border-amber-900 mb-5">
                        {ICONS.trophy}
                        Recognition
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Awards & Achievements
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Recognitions across{' '}
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
              academics, competitive programming, and sports.
            </span>
                    </p>
                </div>

                {/* ── Filter Tabs ── */}
                {filterTabs.length > 1 && (
                    <div
                        className="flex flex-wrap justify-center gap-2 mb-12"
                        style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 200ms' }}
                    >
                        {filterTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200
                  ${activeFilter === tab
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}

                {/* ── Featured ── */}
                {featured.length > 0 && activeFilter === 'All' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                        {featured.map((ach, i) => (
                            <FeaturedCard
                                key={i}
                                ach={ach}
                                color={getCategoryColor(categories, ach.category)}
                                inView={inView}
                                delay={i * 100}
                            />
                        ))}
                    </div>
                )}

                {/* ── Standard Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {standard.map((ach, i) => (
                        <AchievementCard
                            key={i}
                            ach={ach}
                            color={getCategoryColor(categories, ach.category)}
                            inView={inView}
                            delay={(featured.length > 0 && activeFilter === 'All' ? 200 : 0) + i * 80}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Achievements;