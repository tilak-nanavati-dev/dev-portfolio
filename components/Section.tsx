
import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
  return (
    <section id={id} className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
