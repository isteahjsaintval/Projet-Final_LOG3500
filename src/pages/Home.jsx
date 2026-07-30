import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import MemberCards from '../components/membercards';

const Home = () => {
  const { language } = useContext(ThemeContext);
  const isFr = language === 'fr';

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            {isFr ? 'Portfolio Professionnel Collectif' : 'Collective Professional Portfolio'}
          </h1>
          <p className="hero-subtitle">
            {isFr
              ? 'Une vitrine technologique moderne présentant nos réalisations, compétences et architectures web.'
              : 'A modern technological showcase presenting our achievements, skills, and web architectures.'}
          </p>
        </div>
      </section>

      <section id="equipe" className="section-container">
        <MemberCards />
      </section>
    </div>
  );
};

export default Home;

