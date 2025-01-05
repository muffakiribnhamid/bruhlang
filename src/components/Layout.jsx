import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';
import HomePage from '../pages/HomePage';
import Documentation from '../pages/Documentation';
import Playground from '../pages/Playground';
import About from '../pages/About';

const Layout = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* Animated background */}
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      {/* Navigation */}
      <Navbar theme={theme} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main className={`main-content ${isVisible ? 'visible' : ''}`}>
        {children}
        <section id="home" className="snap-start min-h-screen pt-16">
          <HomePage />
        </section>
        
        <section id="docs" className="snap-start min-h-screen">
          <Documentation />
        </section>
        
        <section id="playground" className="snap-start min-h-screen">
          <Playground />
        </section>
        
        <section id="about" className="snap-start min-h-screen">
          <About />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BruhLang</h3>
            <p>Making coding a vibe</p>
          </div>
          <div className="footer-section">
            <h3>Learn</h3>
            <a href="#docs">Documentation</a>
            <a href="#tutorial">Tutorial</a>
            <a href="#examples">Examples</a>
          </div>
          <div className="footer-section">
            <h3>Community</h3>
            <div className="social-links">
              <a href="https://github.com/muffakiribnhamid" className="social-link">GitHub</a>
              <a href="https://twitter.com/muffakiribnhamid" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BruhLang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
