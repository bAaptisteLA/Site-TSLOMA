import React from 'react';
import CardNav from './CardNav';
import './style.css';

export default function LegalMentions({ navigate }) {
  const navItems = [
    { label: "À propos", bgColor: "#0D0716", textColor: "#fff", links: [{ label: "L'entreprise", href: "/" }] },
    { label: "Services", bgColor: "#170D27", textColor: "#fff", links: [{ label: "Conseil", href: "/#services" }] },
    { label: "Contact", bgColor: "#271E37", textColor: "#fff", links: [{ label: "Email", href: "#contact" }] }
  ];

  const handleNavigateHome = () => {
    if (navigate && typeof navigate === 'function') {
      navigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      {/* Barre de navigation */}
      <CardNav
        logoAlt="Logo de l'entreprise"
        items={navItems}
        navigate={navigate}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />

      {/* Contenu des mentions légales */}
      <main className="legal-mentions">
        <div className="container">
          <h1>Mentions Légales</h1>

          <section>
            <h2>🏢 Informations sur l’entreprise</h2>
            <p>
              Dénomination sociale : TS-LOMA<br />
              Forme juridique : Société par actions simplifiée (SAS)<br />
              Capital social : 1 000 €<br />
              Numéro SIREN : 880 676 523<br />
              Numéro SIRET : 880 676 523 00033<br />
              Numéro de TVA intracommunautaire : FR35880676523<br />
              Code APE/NAF : 7022Z – Conseil pour les affaires et autres conseils de gestion<br />
              Date d’immatriculation : 14 janvier 2020<br />
              Greffe d’immatriculation : RCS Paris<br />
              Adresse : 59 rue de Ponthieu, Bureau 326, 75008 Paris<br />
              Président : Isabelle Lory
            </p>
          </section>

          <section>
            <h2>📞 Coordonnées de contact</h2>
            <p>Email : tsloma@tsloma.com</p>
          </section>

          <section>
            <h2>🖥️ Hébergement du site</h2>
            <p>
              Le site est hébergé par :<br />
              Nom : Squarespace, Inc.<br />
              Adresse : 8 Clarkson Street, New York, NY 10014, États-Unis<br />
              Site web : <a href="https://www.squarespace.com" target="_blank" rel="noopener noreferrer">https://www.squarespace.com</a><br /><br />
              Squarespace est une plateforme américaine qui fournit des services d'hébergement et de création de sites web. 
              Conformément aux lois américaines, les données des utilisateurs peuvent être stockées et traitées aux États-Unis. 
              Il est recommandé aux utilisateurs européens de prendre connaissance de la politique de confidentialité de Squarespace pour comprendre comment leurs données sont collectées et utilisées.
            </p>
          </section>

          <section>
            <h2>📄 Mentions légales supplémentaires</h2>
            <p>
              Directeur de la publication : Isabelle Lory<br />
              Conformité RGPD : Conformément au Règlement Général sur la Protection des Données (RGPD), les utilisateurs disposent d’un droit d’accès, de rectification, de suppression et d’opposition concernant leurs données personnelles.<br />
              Cookies : Le site utilise des cookies pour améliorer l’expérience utilisateur. L’utilisateur peut gérer ses préférences en matière de cookies dans les paramètres de son navigateur.
            </p>
          </section>

          {/* Bouton pour revenir à l'accueil */}
          <button
            className="card-nav-cta-button"
            onClick={handleNavigateHome}
            style={{ marginTop: '20px' }}
          >
            Revenir à l'accueil
          </button>
        </div>
      </main>
    </>
  );
}
