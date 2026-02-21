
import React from 'react';
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import Impact from './components/Impact';
import Architecture from './components/Architecture';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col">
        <Header />
        <main className="flex-grow">
            <Hero />
            <Impact />
            <Architecture />
            <Projects />
            <Experience />
            <Skills />
            <Achievements />
            <Education />
        </main>
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
