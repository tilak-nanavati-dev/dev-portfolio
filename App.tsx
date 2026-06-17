
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/Header';
import SplashCursor from './components/SplashCursor';
import Hero from './components/Hero';
import Impact from './components/Impact';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <SplashCursor />
      <div className="flex flex-col width-full">
        <Header />
        <main className="flex-grow">
            <Hero />
            <Impact />
            <Projects />
            <Experience />
            <Skills />
            <Education />
            <Achievements />
        </main>
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
