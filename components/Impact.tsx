
import React from 'react';
import Section from './Section';
import { IMPACT_HIGHLIGHTS } from '../constants';

const Impact: React.FC = () => {
  return (
    <Section id="impact" className="bg-light-card dark:bg-dark-card rounded-xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Business & Technical Impact</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Driving measurable outcomes through scalable engineering solutions.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {IMPACT_HIGHLIGHTS.map((highlight, index) => (
          <div key={index} className="text-center p-6 bg-light-bg dark:bg-dark-bg/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-4xl font-extrabold text-accent">{highlight.value}</p>
            <h3 className="text-lg font-semibold mt-2">{highlight.label}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{highlight.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Impact;
