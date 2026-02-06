
import React from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Professional Experience</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">A journey of growth, leadership, and impact.</p>
      </div>
      <div className="relative border-l-2 border-accent/30 ml-4 md:ml-0">
        {EXPERIENCE.map((job, index) => (
          <div key={index} className="mb-12 ml-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-accent rounded-full -left-4 ring-4 ring-light-bg dark:ring-dark-bg z-10 transition-colors duration-300">
              <i className="fas fa-briefcase text-white text-sm"></i>
            </span>
            <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
              <h3 className="flex flex-col sm:flex-row sm:items-center mb-2 text-xl font-bold text-light-text dark:text-dark-text">
                {job.role} 
                <span className="hidden sm:inline mx-2 text-gray-400">•</span>
                <span className="text-accent text-base font-medium">{job.company}</span>
              </h3>
              <time className="block mb-4 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{job.period}</time>
              <ul className="list-disc list-outside ml-4 text-gray-600 dark:text-gray-300 space-y-2 text-base leading-relaxed">
                {job.description.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
