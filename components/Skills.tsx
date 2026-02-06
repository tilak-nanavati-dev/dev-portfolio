
import React from 'react';
import Section from './Section';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <Section id="skills">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Proficiency</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">A curated toolkit for building modern, scalable software.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(SKILLS).map(([category, skills]) => (
          <div key={category} className="p-6 bg-light-card dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-accent">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text text-sm font-medium px-3 py-1 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
