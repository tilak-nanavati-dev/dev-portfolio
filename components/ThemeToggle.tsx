
import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-light-text dark:text-dark-text bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <i className="fas fa-moon w-5 h-5"></i>
      ) : (
        <i className="fas fa-sun w-5 h-5"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
