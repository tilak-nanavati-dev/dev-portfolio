
import React from 'react';
import Section from './Section';
import { EDUCATION } from '../constants';

const Education: React.FC = () => {
  return (
    <Section id="education" className="bg-light-card dark:bg-dark-card rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-center mb-12 tracking-tight sm:text-4xl">Education</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {EDUCATION.map((edu, index) => (
          <div key={index} className="relative pl-10">
             <span className="absolute flex items-center justify-center w-8 h-8 bg-accent/20 text-accent rounded-full -left-0 top-1 ring-4 ring-light-card dark:ring-dark-card">
              <i className="fas fa-graduation-cap"></i>
            </span>
            <h3 className="text-xl font-semibold">{edu.degree}</h3>
            <p className="text-accent font-medium">{edu.institution}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 my-1">{edu.period}</p>
            <p className="text-md text-gray-600 dark:text-gray-300 mt-2 italic">"{edu.notes}"</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
