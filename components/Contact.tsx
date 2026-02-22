import React, { useEffect, useRef, useState } from 'react';
import { PROFILE_DATA } from '../constants';

// ─── Types ─────────────────────────────────────────────────────────────────────
/**
 * Expected shape of PROFILE_DATA.contact. Add optional fields:
 *
 * contact: {
 *   email: "you@example.com",
 *   linkedin: "https://linkedin.com/in/you",
 *   github: "https://github.com/you",
 *   twitter: "https://twitter.com/you",     // optional
 *   resumeUrl: "https://...",               // optional
 * }
 *
 * Also used from PROFILE_DATA root:
 *   name, title, location (optional), availableForWork (boolean, optional)
 */

// ─── Icons ─────────────────────────────────────────────────────────────────────
const EmailIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 110-3.96 1.98 1.98 0 010 3.96zm1.707 13.019H3.63V9h3.414v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0112 6.8c1.02.005 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const PinIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const ArrowUpIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
);

// ─── Social Link ───────────────────────────────────────────────────────────────
const SocialLink: React.FC<{
    href: string;
    label: string;
    icon: React.ReactNode;
}> = ({ href, label, icon }) => (
    <a
        href={href}
        target={href.startsWith('mailto') ? undefined : '_blank'}
        rel="noopener noreferrer"
        aria-label={label}
        className="group flex items-center gap-3 px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700/80
      bg-white dark:bg-gray-900/60 backdrop-blur-sm
      text-gray-500 dark:text-gray-400
      hover:text-blue-600 dark:hover:text-blue-400
      hover:border-blue-200 dark:hover:border-blue-800
      hover:shadow-md hover:-translate-y-0.5
      transition-all duration-200"
    >
        <span className="shrink-0">{icon}</span>
        <span className="text-sm font-semibold">{label}</span>
    </a>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
    const { contact } = PROFILE_DATA;
    const currentYear = new Date().getFullYear();

    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const fadeUp = (delay: number) => ({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    });

    const socialLinks = [
        contact.linkedin && { href: contact.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
        contact.github && { href: contact.github, label: 'GitHub', icon: <GitHubIcon /> },
        contact.twitter && { href: contact.twitter, label: 'Twitter / X', icon: <TwitterIcon /> },
    ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

    return (
        <footer
            id="contact"
            ref={sectionRef}
            className="relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden"
        >
            {/* ── Subtle background orbs ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-3xl" />
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">

                {/* ── Main CTA Block ── */}
                <div style={fadeUp(0)} className="text-center mb-14">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
            tracking-widest uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400
            border border-blue-100 dark:border-blue-900 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Get In Touch
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-5 leading-tight">
                        Let's Build Something{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Remarkable
            </span>
                    </h2>

                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Open to discussing new opportunities, challenging projects, and
                        impactful collaborations.
                    </p>
                </div>

                {/* ── Availability Card ── */}
                <div style={fadeUp(150)} className="mb-12 flex justify-center">
                    <div className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700/80
            bg-white dark:bg-gray-900/60 backdrop-blur-sm p-6 flex flex-col sm:flex-row items-center gap-5
            shadow-sm">

                        {/* Avatar placeholder / initials */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <span className="text-white text-lg font-bold select-none">
                {PROFILE_DATA.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .slice(0, 2)}
              </span>
                        </div>

                        <div className="text-center sm:text-left flex-1 min-w-0">
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{PROFILE_DATA.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{PROFILE_DATA.title}</p>
                            {PROFILE_DATA.location && (
                                <p className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    <PinIcon /> {PROFILE_DATA.location}
                                </p>
                            )}
                        </div>

                        {/* Status + CTA */}
                        <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase
                px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400
                border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </span>

                            <a
                                href={`mailto:${contact.email}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                  bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                  hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25
                  transition-all duration-200"
                            >
                                <EmailIcon />
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Social Links ── */}
                <div style={fadeUp(300)} className="flex flex-wrap justify-center gap-3 mb-10">

                    <div className="w-full flex justify-center">
                        {contact.resumeUrl && (
                            <a
                                href={contact.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold
                border border-dashed border-gray-300 dark:border-gray-600
                text-blue-500 dark:text-gray-400 transition-smooth duration-400
                hover:border-blue-400 dark:hover:border-blue-600
                hover:text-blue-600 dark:hover:text-blue-400
                hover:-translate-y-0.5 hover:shadow-md
                transition-all duration-200"
                            >
                                <DownloadIcon />
                                Download Résumé
                            </a>
                        )}
                    </div>

                    {socialLinks.map((link) => (
                        <SocialLink key={link.href} {...link} />
                    ))}
                </div>

                {/* ── Divider ── */}
                <div style={fadeUp(400)} className="border-t border-gray-100 dark:border-gray-800 mb-8" />

                {/* ── Footer Bar ── */}
                <div
                    style={fadeUp(500)}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-gray-600"
                >
                    {/* Copyright */}
                    <p>
                        &copy; {currentYear}{' '}
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{PROFILE_DATA.name}</span>
                        . All rights reserved.
                    </p>

                    {/* Built with */}
                    <p className="flex items-center gap-1.5">
                        Built with
                        <span className="text-gray-500 dark:text-gray-400 font-medium">React</span>
                        &
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Tailwind CSS</span>
                    </p>

                    {/* Back to top */}
                    <button
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="inline-flex items-center gap-1.5 text-gray-400 dark:text-gray-600
              hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5
              transition-all duration-200 font-medium"
                    >
                        <ArrowUpIcon />
                        Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Contact;