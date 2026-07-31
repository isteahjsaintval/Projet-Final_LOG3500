# 🎓 Portfolio Professionnel Collectif — LOG3500 (ISTEAH)

> Projet de Session — Été 2026 
> Établissement :Institut des Sciences, des Technologies et des Études Avancées d'Haïti (ISTEAH)  
> Cours : LOG3500 – Conception et Programmation de Sites Web I (3 Crédits)

---

## 📋 Présentation du Projet

Ce projet consiste en la conception, le développement et le déploiement d'une 
Application Web Monopage (SPA) faisant office de Portfolio Professionnel Collectif.

L'application sert de vitrine technologique pour présenter l'équipe, ses compétences individuelles et collectives, ses réalisations académiques (Devoirs 1 et 2), tout en intégrant une passerelle de communication asynchrone sécurisée avec un serveur d'application Express.

---

## 🛠️ Architecture Technologique (Stack)

### Frontend
- Framework / Outillage :React.js (v18) avec [Vite](https://vitejs.dev/).
- Routage :`react-router-dom` (v6) pour une navigation sémantique sans rechargement de page.
- Gestion d'État Global :React Context API (`ThemeContext.jsx`) pour la gestion dynamique du thème (Sombre/Clair) et de la langue (FR/EN).
- Design & Style : CSS3 Pur (Flexbox & CSS Grid) sans aucun framework tiers (pas de Tailwind ni Bootstrap).
- Consommation API : Intégration asynchrone (`fetch`) de l'API REST publique de GitHub pour afficher les statistiques en temps réel des membres.

### Backend & DevOps
- Serveur d'Application : Node.js avec le framework [Express](https://expressjs.com/) (`server.js`).
- persistance de Données : Route API `POST /api/contact` stockant les messages du formulaire dans un fichier JSON local (`data/messages.json`).
- Versionnement : Git & GitHub (Workflows par branches, revues de code).
- **Déploiement Cloud : Déploiement continuous automatisé via Render / 

---

## 📂 Structure du Projet

```plaintext
portfolio-log3500/
├── data/
│   └── messages.json          # Fichier JSON pour la persistance des messages du formulaire
├── public/
│   └── images/ 
├── src/
│   ├── components/
│   │   ├── contactform.jsx    # Formulaire de contact avec validation asynchrone
│   │   ├── footer.jsx         # Pied de page sémantique
│   │   ├── header.jsx         # Barre de navigation & contrôles (Thème/Langue)
│   │   ├── membercards.jsx    # Affichage des 5 cartes membres + API GitHub
│   │   └── projetcard.jsx     # Carte réutilisable pour la galerie de projets
│   ├── pages/
│   │   ├── Home.jsx           # Page d'accueil moderne, animée et multilingue
│   │   └── Home.css           # Feuille de style dédiée à la page d'accueil
│   ├── App.jsx                # Configuration des routes React Router v6
│   ├── index.css              # Feuille de style globale (Variables CSS, Flex/Grid)
│   ├── main.jsx               # Point d'entrée React avec Providers
│   └── ThemeContext.jsx       # Gestion d'état global (Thème & Langue)
├── index.html                 # Fichier HTML principal à la racine
├── package.json               # Scripts d'exécution et dépendances
└── server.js                  # Serveur Express pour fichiers statiques & API
