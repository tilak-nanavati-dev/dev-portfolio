
import React from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <Section id="projects" className="bg-light-bg dark:bg-dark-bg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Projects</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Selected work demonstrating my expertise in building complex systems.</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {PROJECTS.map((project, index) => (
          <div key={index} className="bg-light-card dark:bg-dark-card rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-accent">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
