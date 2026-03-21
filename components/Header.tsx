
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS, PROFILE_DATA } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold tracking-tight text-light-text dark:text-dark-text">{PROFILE_DATA.name}</a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="font-medium text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-4 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} w-6 h-6`}></i>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-light-card dark:bg-dark-card py-4">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
