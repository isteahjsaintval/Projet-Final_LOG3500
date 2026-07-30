import React from 'react';

const ProjetCard = ({ title, badge, description, tags, link }) => {
  return (
    <article className="projet-card">
      <span className="projet-badge">{badge}</span>
      <h3 className="projet-title">{title}</h3>
      <p className="projet-description">{description}</p>
      
      {tags && (
        <div className="projet-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}

      {link && <a href={link} className="projet-link">Voir le projet &rarr;</a>}
    </article>
  );
};

export default ProjetCard;