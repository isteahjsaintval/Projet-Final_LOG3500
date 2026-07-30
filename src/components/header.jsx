import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, language, toggleLanguage } = useContext(ThemeContext);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const t = {
    fr: { home: "Accueil", team: "Équipe", contact: "Contact" },
    en: { home: "Home", team: "Team",  contact: "Contact" }
  }[language] || { home: "Accueil", team: "Équipe", contact: "Contact" };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          LOG3500<span>Portfolio</span>
        </Link>

        <button 
          className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>{t.home}</Link></li>
            <li><Link to="/equipe" className={location.pathname === '/equipe' ? 'active' : ''} onClick={closeMenu}>{t.team}</Link></li>
            <li><Link to="/projets" className={location.pathname === '/projets' ? 'active' : ''} onClick={closeMenu}>{t.projects}</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>{t.contact}</Link></li>
          </ul>

          <div className="header-controls">
            <button className="control-btn" onClick={toggleLanguage}>{language === 'fr' ? 'EN' : 'FR'}</button>
            <button className="control-btn" onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;