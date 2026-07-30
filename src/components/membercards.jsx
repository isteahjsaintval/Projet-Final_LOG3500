import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const MemberCards = () => {
  const { language } = useContext(ThemeContext);

  // 1. Lis 5 manm yo ak username GitHub yo ak done lokal yo
  const initialMembers = [
    {
      id: 1,
      name: "Celys Fritz-Gerald",
      githubUsername: "celysfritzgerald", 
      role: language === 'fr' ? "Développeur Frontend & Accessibility" : "Frontend & Accessibility Developer",
      competences: ["HTML5", "CSS3", "Accessibilité ARIA", "React.js"],
      parcours: language === 'fr'
        ? "Étudiant en DUT TIC, passionné par le design UI/UX et la création d'interfaces accessibles."
        : "Software engineering student, passionate about UI/UX design and building accessible interfaces."
    },
    {
      id: 2,
      name: "Jhon Dodley Saint-Val",
      githubUsername: "isteahjsaintval", // Ranplase ak vre username GitHub manm 2 a
      role: language === 'fr' ? "Développeur React & Architecte UI" : "React Developer & UI Architect",
      competences: ["React.js", "React Router", "Context API", "JavaScript ES6+"],
      parcours: language === 'fr'
        ? "Spécialiste du développement côté client, axé sur la gestion d'état global et les applications SPA."
        : "Client-side development specialist, focused on global state management and SPA applications."
    },
    {
      id: 3,
      name: "Saint-Felix Jean-Winson",
      githubUsername: "isteahjsaintfelix-hub", 
      role: language === 'fr' ? "Ingénieur Backend & API" : "Backend & API Engineer",
      competences: ["Node.js", "Express.js", "API RESTful", "JSON"],
      parcours: language === 'fr'
        ? "Développeur backend expérimenté dans la création de serveurs robustes et la gestion des flux de données."
        : "Backend developer experienced in building robust servers and managing data streams."
    },
    {
      id: 4,
      name: "Lauredan Aunedana",
      githubUsername: "lauredanaunedan-bit", 
      role: language === 'fr' ? "Spécialiste DevOps & Cloud" : "DevOps & Cloud Specialist",
      competences: ["Git & GitHub", "GitHub Projects", "CI/CD", "Deploy"],
      parcours: language === 'fr'
        ? "Passionné par l'intégration continue, la gestion de versions en équipe et l'hébergement cloud."
        : "Passionate about continuous integration, team version control, and cloud hosting."
    },
    {
      id: 5,
      name: "Varenkajolicoeur-eng",
      githubUsername: "addyosmani", 
      role: language === 'fr' ? "QA & Assurance Qualité Web" : "QA & Web Quality Assurance",
      competences: ["Validation W3C", "Tests Unitaires", "Optimisation UI", "Sécurité Web"],
      parcours: language === 'fr'
        ? "Focalisé sur la conformité des normes W3C, la performance du code et la sécurité des données."
        : "Focused on W3C standards compliance, code performance, and data security."
    }
  ];

  // Etats pou kenbe done ki soti nan API GitHub la, chajman ak erè
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchGitHubData = async () => {
    setLoading(true);
    try {
      const updatedMembers = await Promise.all(
        initialMembers.map(async (member) => {
          try {
            const response = await fetch(`https://api.github.com/users/${member.githubUsername}`);
            
            // Si username nan pa egziste oswa limit depase, sèvi ak done lokal yo
            if (!response.ok) {
              return {
                ...member,
                avatarUrl: `https://github.com/${member.githubUsername}.png`,
                publicRepos: 0,
                followers: 0,
                htmlUrl: `https://github.com/${member.githubUsername}`
              };
            }

            const githubData = await response.json();

            return {
              ...member,
              avatarUrl: githubData.avatar_url,
              publicRepos: githubData.public_repos,
              followers: githubData.followers,
              htmlUrl: githubData.html_url
            };
          } catch (err) {
            // Si yon sèl manm gen pwoblèm rezo, pa kite l bloke lòt yo
            return {
              ...member,
              avatarUrl: `https://github.com/${member.githubUsername}.png`,
              publicRepos: 0,
              followers: 0,
              htmlUrl: `https://github.com/${member.githubUsername}`
            };
          }
        })
      );

      setMembersData(updatedMembers);
      setError(null);
    } catch (err) {
      console.error("Erreur récuperation API GitHub:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchGitHubData();
}, [language]);
  // Afichaj nan ka kote done yo ap chaje anndan API a
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-title)' }}>
        <p>{language === 'fr' ? "Chargement des statistiques GitHub..." : "Loading GitHub statistics..."}</p>
      </div>
    );
  }

  // Afichaj si gen yon erè ki rive pandan appèl API a
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#EF4444' }}>
        <p>{language === 'fr' ? "Impossible de charger les données GitHub." : "Failed to load GitHub data."}</p>
      </div>
    );
  }

  return (
    <div className="members-grid">
      {membersData.map((member) => (
        <article className="member-card" key={member.id}>
          {/* Foto Avatar ki soti dirèkteman nan API GitHub */}
          <div className="member-avatar-wrapper">
            <img 
          src={member.avatarUrl || `https://github.com/${member.githubUsername}.png`} 
  alt={member.name} 
  className="member-avatar" 
  onError={(e) => { 
    e.target.onerror = null; // 1. Li koupe bouk erè san fen an
    e.target.src = `https://placehold.co/120x120/1E293B/3B82F6?text=${member.githubUsername}`; // 2. Li itilize yon pi bon sèvis fallback
  }}
/>
            
          </div>

          <h3 className="member-name">{member.name}</h3>
          <span className="github-username-badge">@{member.githubUsername}</span>
          <span className="member-role">{member.role}</span>

          {/* Statisik reyèl ki soti nan API GitHub */}
          <div style={{
            display: 'flex',
            justify: 'space-around',
            width: '100%',
            margin: '0.8rem 0',
            padding: '0.5rem',
            background: 'var(--bg-main)',
            borderRadius: '8px',
            fontSize: '0.8rem',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <strong style={{ display: 'block', color: 'var(--primary)' }}>{member.publicRepos}</strong>
              <span style={{ color: 'var(--text-muted)' }}>{language === 'fr' ? 'Dépôts' : 'Repos'}</span>
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--primary)' }}>{member.followers}</strong>
              <span style={{ color: 'var(--text-muted)' }}>Followers</span>
            </div>
          </div>

          {/* Competences */}
          <div className="member-skills">
            {member.competences.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>

          {/* Bio / Parcours */}
          <div className="member-parcours">
            <strong>{language === 'fr' ? "Parcours :" : "Background:"}</strong>
            <p>{member.parcours}</p>
          </div>

          {/* Lyen ale sou profil GitHub la */}
          <a 
            href={member.htmlUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-link"
          >
            GitHub Profile &rarr;
          </a>
        </article>
      ))}
    </div>
  );
};

export default MemberCards;