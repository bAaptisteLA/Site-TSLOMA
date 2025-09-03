import React from 'react';
import LetterGlitch from './LetterGlitch';
import ScrollVelocity from './ScrollVelocity';
import './style.css'; 
import './ScrollVelocity.css';
import './Home.css'; // AJOUTÉ : Import des styles pour la page Home

export default function Home({ navigate }) {
  return (
    <>
      <div className="glitch-container">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      <div className="homepage-content-top">
        <div className="scroll-velocity-title">
          <ScrollVelocity 
            texts={['TS-LOMA  TS-LOMA', 'Stratégie  Stratégie', 'Formation  Formation', 'Conseil  Conseil ']}
            velocity={50} 
            className="scroll-text"
          />
        </div>
        <button className="ui-btn" onClick={() => navigate('/site')}>
          <span> Entrer sur le site </span>
        </button>
      </div>
    </>
  );
}