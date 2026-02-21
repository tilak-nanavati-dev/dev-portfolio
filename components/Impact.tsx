import React, { useEffect, useRef, useState } from 'react';
import Section from './Section';
import { IMPACT_HIGHLIGHTS } from '../constants';

// ─── Types ─────────────────────────────────────────────────────────────────────
/**
 * Expected shape of each IMPACT_HIGHLIGHTS item.
 * Add `icon`, `trend`, `color`, and `suffix` to your constants for full effect.
 *
 * Example constant entry:
 * {
 *   value: "10",        // numeric part only (string or number)
 *   suffix: "x",       // e.g. "x", "%", "+", "ms"
 *   label: "Faster Queries",
 *   description: "Reduced P95 query latency from 800ms to 80ms via index tuning & caching.",
 *   trend: "up",       // "up" | "down" | undefined
 *   color: "blue",     // "blue" | "indigo" | "violet" | "emerald"
 *   icon: "bolt",      // see iconMap below
 * }
 */
interface ImpactHighlight {
    value: string | number;
    suffix?: string;
    label: string;
    description: string;
    trend?: 'up' | 'down';
    color?: 'blue' | 'indigo' | 'violet' | 'emerald' | 'amber';
    icon?: string;
}

// ─── Icon Map ──────────────────────────────────────────────────────────────────
const IconMap: Record<string, React.ReactNode> = {
    bolt: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    chart: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
    ),
    cube: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
    ),
    users: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
    ),
    server: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v.75a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-.75m17.25 0a2.25 2.25 0 00-4.5 0m4.5 0H2.25m3 0a2.25 2.25 0 01-4.5 0m.75-3.75V3.375A2.625 2.625 0 014.125 0h15.75A2.625 2.625 0 0122.5 2.625v10.875" />
        </svg>
    ),
    default: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    ),
};

// ─── Color Configs ─────────────────────────────────────────────────────────────
const COLOR_CONFIG = {
    blue: {
        badge: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
        value: 'from-blue-600 to-blue-400',
        bar: 'bg-blue-500',
        glow: 'group-hover:shadow-blue-500/20',
        border: 'group-hover:border-blue-300 dark:group-hover:border-blue-700',
    },
    indigo: {
        badge: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400',
        value: 'from-indigo-600 to-indigo-400',
        bar: 'bg-indigo-500',
        glow: 'group-hover:shadow-indigo-500/20',
        border: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-700',
    },
    violet: {
        badge: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400',
        value: 'from-violet-600 to-violet-400',
        bar: 'bg-violet-500',
        glow: 'group-hover:shadow-violet-500/20',
        border: 'group-hover:border-violet-300 dark:group-hover:border-violet-700',
    },
    emerald: {
        badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
        value: 'from-emerald-600 to-emerald-400',
        bar: 'bg-emerald-500',
        glow: 'group-hover:shadow-emerald-500/20',
        border: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-700',
    },
    amber: {
        badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
        value: 'from-amber-500 to-amber-400',
        bar: 'bg-amber-500',
        glow: 'group-hover:shadow-amber-500/20',
        border: 'group-hover:border-amber-300 dark:group-hover:border-amber-700',
    },
};

// ─── Count-Up Hook ─────────────────────────────────────────────────────────────
const useCountUp = (target: number, duration = 1800, shouldStart = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;
        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, [target, duration, shouldStart]);

    return count;
};

// ─── Impact Card ───────────────────────────────────────────────────────────────
const ImpactCard: React.FC<{
    highlight: ImpactHighlight;
    index: number;
    inView: boolean;
}> = ({ highlight, index, inView }) => {
    const colorKey = highlight.color ?? 'blue';
    const colors = COLOR_CONFIG[colorKey] ?? COLOR_CONFIG.blue;
    const iconKey = highlight.icon ?? 'default';
    const icon = IconMap[iconKey] ?? IconMap.default;

    const numericValue = parseFloat(String(highlight.value).replace(/[^0-9.]/g, ''));
    const suffix = highlight.suffix ?? String(highlight.value).replace(/[0-9.]/g, '');
    const animated = useCountUp(numericValue, 1600, inView);

    const displayValue = isNaN(numericValue) ? String(highlight.value) : `${animated}${suffix}`;

    return (
        <div
            className={`group relative flex flex-col p-7 rounded-2xl border border-gray-200 dark:border-gray-800
        bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${colors.glow} ${colors.border}`}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
            }}
        >
            {/* Top row: icon badge + trend indicator */}
            <div className="flex items-center justify-between mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.badge}`}>
                    {icon}
                </div>

                {highlight.trend && (
                    <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
              ${highlight.trend === 'up'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                            : 'bg-red-50 dark:bg-red-950/50 text-red-500 dark:text-red-400'
                        }`}
                    >
            {highlight.trend === 'up' ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
            ) : (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
            )}
                        Improved
          </span>
                )}
            </div>

            {/* Animated Value */}
            <p
                className={`text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-br bg-clip-text text-transparent ${colors.value}`}
            >
                {displayValue}
            </p>

            {/* Label */}
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {highlight.label}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">
                {highlight.description}
            </p>

            {/* Animated bottom accent bar */}
            <div className="mt-6 h-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                    className={`h-full rounded-full ${colors.bar} transition-all duration-[1500ms] ease-out`}
                    style={{ width: inView ? '100%' : '0%', transitionDelay: `${index * 120 + 400}ms` }}
                />
            </div>
        </div>
    );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const Impact: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.15 },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Section id="impact" className="py-24">
            <div ref={sectionRef} className="bg-gradient-to-br from-blue-100/50 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80 rounded-3xl p-12 max-w-9xl mx-auto">
                {/* ── Section Header ── */}
                <div
                    className="text-center mb-16"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 mb-5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                        By the Numbers
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                        Measurable Engineering Impact
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Scalable systems and performance-optimized platforms that deliver
                        <span className="text-blue-600 dark:text-blue-400 font-medium"> tangible, quantifiable business value.</span>
                    </p>
                </div>

                {/* ── Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(IMPACT_HIGHLIGHTS as ImpactHighlight[]).map((highlight, index) => (
                        <ImpactCard
                            key={index}
                            highlight={highlight}
                            index={index}
                            inView={inView}
                        />
                    ))}
                </div>

                {/* ── Footer note ── */}
                <p
                    className="text-center text-xs text-gray-400 dark:text-gray-600 mt-10"
                    style={{
                        opacity: inView ? 1 : 0,
                        transition: 'opacity 0.6s ease 800ms',
                    }}
                >
                    Metrics derived from production systems across multiple orgs · Updated 2026
                </p>
            </div>
        </Section>
    );
};

export default Impact;