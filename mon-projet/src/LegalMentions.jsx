import React from 'react';
import CardNav from './CardNav';
import './style.css';

export default function LegalMentions({ navigate }) {
  const navItems = [
    { label: "À propos", bgColor: "#0D0716", textColor: "#fff", links: [{ label: "L'entreprise", href: "/" }] },
    { label: "Services", bgColor: "#170D27", textColor: "#fff", links: [{ label: "Conseil", href: "/#services" }] },
    { label: "Contact", bgColor: "#271E37", textColor: "#fff", links: [{ label: "Email", href: "#contact" }] }
  ];

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
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la Loi pour la Confiance dans l'Économie Numérique (LCEN), nous vous informons des éléments suivants :
          </p>
          <h2>Éditeur du site</h2>
          <p>
            Nom de l'entreprise : TS-LOMA<br />
            Adresse : 123 Rue Exemple, 75000 Paris, France<br />
            Téléphone : +33 6 12 34 56 78<br />
            Email : contact@ts-loma.fr<br />
            SIRET : 123 456 789 00012
          </p>
          <h2>Hébergement</h2>
          <p>
            Hébergeur : OVH<br />
            Adresse : 2 Rue Kellermann, 59100 Roubaix, France<br />
            Téléphone : +33 9 72 10 10 07
          </p>
          <h2>Propriété intellectuelle</h2>
          <p>
            Tous les contenus présents sur ce site (textes, images, logos, etc.) sont protégés par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>

          {/* Bouton pour revenir à l'accueil */}
          
        </div>
      </main>
    </>
  );
}