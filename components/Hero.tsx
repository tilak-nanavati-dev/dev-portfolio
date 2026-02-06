
import React from 'react';
import Section from './Section';
import { PROFILE_DATA } from '../constants';

const Hero: React.FC = () => {
  return (
    <Section id="hero" className="text-center min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          {PROFILE_DATA.name}
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          {PROFILE_DATA.title}
        </p>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
          {PROFILE_DATA.positioningStatement}
        </p>
        <div className="flex justify-center items-center gap-4">
          <a href="#projects" className="px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent-hover transition-transform transform hover:scale-105">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform transform hover:scale-105">
            Contact Me
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
