import { useState, useEffect } from 'react';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import Examples from './components/Examples';
import Documentation from './components/Documentation';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="app-container">
      {/* Animated background */}
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">BruhLang</span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#examples" className="nav-link">Examples</a>
          <a href="#docs" className="nav-link">Docs</a>
          <a href="https://github.com/muffakiribnhamid/bruhlang" className="nav-button">
            GitHub <FaGithub className="icon" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-title">
          <span className="gradient-text">BruhLang</span>
          <br />
          <span className="subtitle">Programming Made Epic</span>
        </h1>
        <p className="hero-description">
          A programming language that speaks your language.
          Write code that's as cool as you are, with casual syntax that makes sense.
        </p>
        <div className="cta-buttons">
          <a href="#examples" className="primary-button">Get Started</a>
          <a href="#docs" className="secondary-button">Documentation</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why BruhLang?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🗣️</div>
            <h3>Natural Syntax</h3>
            <p>Write code that reads like a casual conversation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Zero Cap</h3>
            <p>Use 'cap' and 'nocap' for boolean values</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Flex Loops</h3>
            <p>Loop with 'yoRepeat' for cleaner iterations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Say It Out</h3>
            <p>Use 'say' instead of console.log</p>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <Examples />

      {/* Documentation Section */}
      <Documentation />

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
            <a href="#examples">Examples</a>
            <a href="#features">Features</a>
          </div>
          <div className="footer-section">
            <h3>Community</h3>
            <div className="social-links">
              <a href="https://github.com/muffakiribnhamid" className="social-link"><FaGithub /></a>
              <a href="https://discord.com/users/muffakiribnhamid" className="social-link"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 BruhLang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
