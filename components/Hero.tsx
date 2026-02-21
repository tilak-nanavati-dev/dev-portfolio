import React, { useEffect, useState, useRef } from 'react';
import Section from './Section';
import { PROFILE_DATA } from '../constants';

// ─── Typed Roles Animation ────────────────────────────────────────────────────
const ROLES = [
    'Senior Software Engineer',
    'Systems Architect',
    'AI Systems Engineer',
    'Data Platform Specialist',
];

const useTypedText = (words: string[], speed = 90, pause = 1800) => {
    const [display, setDisplay] = useState('');
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIdx];
        const timeout = setTimeout(
            () => {
                if (!deleting) {
                    setDisplay(current.slice(0, charIdx + 1));
                    if (charIdx + 1 === current.length) {
                        setTimeout(() => setDeleting(true), pause);
                    } else {
                        setCharIdx((c) => c + 1);
                    }
                } else {
                    setDisplay(current.slice(0, charIdx - 1));
                    if (charIdx - 1 === 0) {
                        setDeleting(false);
                        setWordIdx((w) => (w + 1) % words.length);
                        setCharIdx(0);
                    } else {
                        setCharIdx((c) => c - 1);
                    }
                }
            },
            deleting ? speed / 2 : speed,
        );
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, wordIdx, words, speed, pause]);

    return display;
};

// ─── Floating Orb ─────────────────────────────────────────────────────────────
const Orb = ({
                 className,
                 style,
             }: {
    className?: string;
    style?: React.CSSProperties;
}) => (
    <div
        className={`absolute rounded-full blur-3xl opacity-20 dark:opacity-10 pointer-events-none ${className}`}
        style={style}
    />
);

// ─── Stat Pill ────────────────────────────────────────────────────────────────
const StatPill = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-blue-200/60 shadow-md dark:shadow-white/5 dark:border-white/10 backdrop-blur-sm">
    <span className="text-3xl font-bold text-blue-600 dark:text-blue-600 font-mono">
      {value}
    </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
      {label}
    </span>
    </div>
);

// ─── Social Link ──────────────────────────────────────────────────────────────
const SocialLink = ({
                        href,
                        label,
                        icon,
                    }: {
    href: string;
    label: string;
    icon: React.ReactNode;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:scale-110 transition-all duration-200"
    >
        {icon}
    </a>
);

// ─── Main Hero ────────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
    const typedRole = useTypedText(ROLES);
    const heroRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // Staggered entrance
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const fadeUp = (delay: number) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    });

    return (
        <Section
            id="hero"
            className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden"
        >
            {/* ── Background Orbs ── */}
            <Orb
                className="w-[520px] h-[520px] bg-blue-400 dark:bg-blue-600 -top-32 -left-32"
                style={{ animationName: 'float', animationDuration: '8s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            />
            <Orb
                className="w-[400px] h-[400px] bg-indigo-400 dark:bg-indigo-600 bottom-0 right-0"
                style={{ animationName: 'float', animationDuration: '11s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '-4s' }}
            />
            <Orb
                className="w-[240px] h-[240px] bg-sky-300 dark:bg-sky-500 top-1/2 left-1/4"
                style={{ animationName: 'float', animationDuration: '14s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '-7s' }}
            />

            {/* ── Subtle dot-grid overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* ── Content ── */}
            <div ref={heroRef} className="relative z-10 pt-15 max-w-4xl mx-auto px-6 py-20">

                {/* Name */}
                <h1
                    style={fadeUp(150)}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 leading-[1.1]"
                >
                    {PROFILE_DATA.name}
                </h1>

                {/* Typed Role */}
                <div style={fadeUp(300)} className="h-10 flex items-center justify-center mb-6">
                    <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 font-mono">
                        {typedRole}
                        <span className="inline-block w-1.5 h-6 ml-1 bg-blue-500 align-middle animate-pulse" />
                    </p>
                </div>

                {/* Positioning Statement */}
                <p
                    style={fadeUp(450)}
                    className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10"
                >
                    Designing scalable data systems, intelligent retrieval architectures,
                    and performance-optimized platforms that transform engineering metrics
                    into{' '}
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
            actionable product intelligence.
          </span>
                </p>

                {/* CTA Buttons */}
                <div
                    style={fadeUp(600)}
                    className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-14"
                >
                    <a
                        href="#projects"
                        className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                    >
                        Explore My Work
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </a>

                    <a
                        href={PROFILE_DATA.contact.resumeUrl ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-white dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                    >
                        {/* Download icon */}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
                        </svg>
                        Download Résumé
                    </a>

                    <a
                        href="#contact"
                        className="px-8 py-3.5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Let's Connect
                    </a>
                </div>
                {/* Social Links */}
                <div style={fadeUp(750)} className="flex justify-center gap-3 mb-14">
                    {/* GitHub */}
                    <SocialLink
                        href={PROFILE_DATA.contact.github ?? '#'}
                        label="GitHub"
                        icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 6.8c1.02.005 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        }
                    />
                    {/* LinkedIn */}
                    <SocialLink
                        href={PROFILE_DATA.contact.linkedin ?? '#'}
                        label="LinkedIn"
                        icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 01-1.972-1.98 1.98 1.98 0 011.972-1.979 1.98 1.98 0 011.972 1.98 1.98 1.98 0 01-1.972 1.979zm1.707 13.019H3.63V9h3.414v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        }
                    />
                    {/* Twitter/X */}
                    <SocialLink
                        href={PROFILE_DATA.contact.twitter ?? '#'}
                        label="Twitter / X"
                        icon={
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        }
                    />
                    {/* Email */}
                    <SocialLink
                        href={`mailto:${PROFILE_DATA.contact.email ?? ''}`}
                        label="Email"
                        icon={
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        }
                    />
                </div>

                {/* Credibility Stats */}
                <div style={fadeUp(900)} className="flex flex-wrap justify-center gap-5 mb-11">
                    <StatPill value="6+" label="Years Experience" />
                    <StatPill value="25+" label="Features Shipped" />
                    <StatPill value="10x" label="Performance Gains" />
                    <StatPill value="9+" label="Deployments" />
                </div>

                {/* Scroll Cue */}
                <div
                    style={fadeUp(1050)}
                    className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
                >
                    <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
                    <div className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center pt-1.5">
                        <div className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce" />
                    </div>
                </div>
            </div>

            {/* ── Float keyframe injected via style tag ── */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-30px) scale(1.04); }
        }
      `}</style>
        </Section>
    );
};

export default Hero;