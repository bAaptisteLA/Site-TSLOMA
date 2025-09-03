import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css'; // Styles globaux
import App from './App.jsx'; // Composant racine

// Rendu de l'application dans l'élément root
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
