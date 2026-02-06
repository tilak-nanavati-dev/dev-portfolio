
import React from 'react';
import Section from './Section';
import { ACHIEVEMENTS } from '../constants';

const Achievements: React.FC = () => {
  return (
    <Section id="achievements">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Awards & Achievements</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Recognitions for excellence in academics, coding, and sports.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((ach, index) => (
          <div key={index} className="p-6 bg-light-card dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-4">
            <div className="text-accent text-2xl mt-1">
              <i className="fas fa-trophy"></i>
            </div>
            <div>
              <h3 className="font-semibold text-md">{ach.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{ach.details}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Achievements;
