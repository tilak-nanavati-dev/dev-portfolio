import React from 'react';

interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
    return (
        <section
            id={id}
            className={`w-full ${className}`}
        >
            {/* ✅ Max-width lives on the INNER wrapper, not the section itself */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
};

export default Section;