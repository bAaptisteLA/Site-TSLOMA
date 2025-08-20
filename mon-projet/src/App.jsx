import React from 'react';
import Home from './Home';
import './style.css'; 

// Remplacez les images par de vraies images dans le dossier public/assets
const placeholderImage = "https://via.placeholder.com/250";
const placeholderGolfImage = "https://via.placeholder.com/400x300/cccccc/ffffff?text=Image+de+golf";
const placeholderLogo = "https://via.placeholder.com/150x80/cccccc";

function TSLomaSections() {
    return (
        <main>
            <header className="header">
                <div className="container">
                    <div className="logo-container">
                        <h1 className="logo-text">TS-LOMA</h1>
                    </div>
                    <nav className="nav">
                        <a href="#about">À propos</a>
                        <a href="#services">Services</a>
                        <a href="#values">Nos valeurs</a>
                        <a href="#references">Références</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </header>

            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h2 className="slogan">Accompagner les entreprises et les particuliers vers la réussite grâce à un conseil stratégique et une formation adaptée.</h2>
                        <a href="#contact" className="cta-button">Contactez-nous</a>
                    </div>
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="portrait-container">
                            <img src={placeholderImage} alt="Portrait de Vincent Amara" className="portrait-photo" />
                        </div>
                        <div className="bio-text">
                            <h3>Vincent Amara, Dirigeant</h3>
                            <p>Fondateur de TS-LOMA, Vincent Amara est un expert reconnu dans le conseil aux entreprises et la formation professionnelle. Fort de son expérience, il met son expertise au service de ses clients pour les aider à surmonter les défis et à atteindre leurs objectifs stratégiques. Sa philosophie est basée sur l'écoute, le sur-mesure et l'humain au cœur de chaque projet.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="services-section">
                <div className="container">
                    <h2 className="section-title">Nos services</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <h4>Conseil en stratégie</h4>
                            <p>Définissez votre vision et vos objectifs avec des stratégies claires et efficaces.</p>
                        </div>
                        <div className="service-card">
                            <h4>Formation en management</h4>
                            <p>Développez les compétences de vos équipes pour un leadership éclairé et performant.</p>
                        </div>
                        <div className="service-card">
                            <h4>Accompagnement des particuliers</h4>
                            <p>Bénéficiez d'un coaching personnalisé pour vos projets de carrière ou de reconversion.</p>
                        </div>
                        <div className="service-card">
                            <h4>Support PME</h4>
                            <p>Optimisez vos processus et gagnez en efficacité opérationnelle.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="values" className="values-section">
                <div className="container">
                    <div className="values-content">
                        <div className="values-text">
                            <h2 className="section-title">Nos valeurs</h2>
                            <p>Chez TS-LOMA, notre philosophie s'inspire de la rigueur et de la vision du golf. Chaque projet est un nouveau parcours où nous appliquons nos principes fondamentaux :</p>
                            <ul>
                                <li>**Précision & Stratégie :** Comme un golfeur qui choisit le bon club pour le bon coup, nous définissons avec précision la meilleure stratégie pour atteindre vos objectifs.</li>
                                <li>**Patience & Persévérance :** La réussite ne se construit pas en un seul coup. Nous vous accompagnons à chaque étape, avec constance et engagement, jusqu'au succès.</li>
                                <li>**Intégrité & Respect :** Nous jouons toujours selon les règles, avec transparence et honnêteté, pour bâtir une relation de confiance durable.</li>
                            </ul>
                        </div>
                        <div className="values-image-container">
                            <img src={placeholderGolfImage} alt="Image d'un golfeur sur un parcours" className="values-image" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="references" className="references-section">
                <div className="container">
                    <h2 className="section-title">Références et collaborations</h2>
                    <div className="references-grid">
                        <img src={placeholderLogo} alt="Logo Entreprise 1" className="ref-logo" />
                        <img src={placeholderLogo} alt="Logo Entreprise 2" className="ref-logo" />
                        <img src={placeholderLogo} alt="Logo Entreprise 3" className="ref-logo" />
                        <img src={placeholderLogo} alt="Logo Entreprise 4" className="ref-logo" />
                        <img src={placeholderLogo} alt="Logo Entreprise 5" className="ref-logo" />
                        <img src={placeholderLogo} alt="Logo Entreprise 6" className="ref-logo" />
                    </div>
                </div>
            </section>

            <section id="contact" className="contact-section">
                <div className="container">
                    <h2 className="section-title">Contactez-nous</h2>
                    <form className="contact-form">
                        <input type="text" name="name" placeholder="Votre nom" required />
                        <input type="email" name="email" placeholder="Votre email" required />
                        <textarea name="message" placeholder="Votre message" rows="5" required></textarea>
                        <button type="submit" className="cta-button submit-button">Envoyer le message</button>
                    </form>
                    <div className="contact-info">
                        <p>Email: contact@ts-loma.fr</p>
                        <p>Téléphone: +33 6 12 34 56 78</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 TS-LOMA. Tous droits réservés.</p>
                    <div className="footer-links">
                        <a href="#">Mentions légales</a>
                        <a href="#">LinkedIn</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}

export default function App() {
  const [currentPage, setCurrentPage] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, '', path);
    setCurrentPage(path);
  };

  return (
    <React.StrictMode>
      {currentPage === '/site' ? (
        <TSLomaSections />
      ) : (
        <Home navigate={navigate} />
      )}
    </React.StrictMode>
  );
}