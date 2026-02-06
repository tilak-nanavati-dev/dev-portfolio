
import React from 'react';
import { PROFILE_DATA } from '../constants';

const Contact: React.FC = () => {
  const { contact } = PROFILE_DATA;
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-light-card dark:bg-dark-card border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Let's Connect</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          I'm open to discussing new opportunities and challenging projects.
        </p>
        <div className="flex justify-center items-center gap-6 mb-8">
          <a href={`mailto:${contact.email}`} className="text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors text-3xl" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors text-3xl" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors text-3xl" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          &copy; {currentYear} {PROFILE_DATA.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Contact;
