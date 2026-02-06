
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
          <div key={index} className="mb-10 ml-8">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-accent rounded-full -left-4 ring-4 ring-light-bg dark:ring-dark-bg">
              <i className="fas fa-briefcase text-white"></i>
            </span>
            <h3 className="flex items-center mb-1 text-xl font-semibold">
              {job.role} <span className="text-accent/80 text-sm font-medium ml-2">@ {job.company}</span>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{job.period}</time>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              {job.description.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
