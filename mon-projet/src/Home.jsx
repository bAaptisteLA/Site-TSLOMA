import React from 'react';
import LetterGlitch from './LetterGlitch';
import ScrollVelocity from './ScrollVelocity';
import './style.css'; 
import './ScrollVelocity.css'; 

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
            texts={['TS-LOMA ', 'Stratégie ', 'Formation ', 'Conseil  Conseil ']}
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