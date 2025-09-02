import React, { useLayoutEffect, useRef, useCallback, useState, useEffect } from 'react';
import Lenis from "lenis";
import emailjs from "emailjs-com";

/*----------------------------------*/
// IMPORTS DES COMPOSANTS EXTERNES
import CardNav from './CardNav';
import TiltedCard from './TiltedCard';
import SpotlightCard from "./SpotlightCard";
import LogoLoop from './LogoLoop';
import "./style.css";
import './SpotlightCard.css';
import './LogoLoop.css';
import LegalMentions from './LegalMentions'; // Import de la page des mentions légales

/*----------------------------------*/
// SOUS-COMPOSANT POUR L'EFFET DE DÉFILEMENT (ScrollStack)

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
}) => {
  const scrollerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;

    const parsePercentage = (value, height) => (parseFloat(value) / 100) * height;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = scroller.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = endElementTop - containerHeight / 2;

      const calculateProgress = (current, start, end) => {
        if (current < start) return 0;
        if (current > end) return 1;
        return (current - start) / (end - start);
      };

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          if (scrollTop >= (cardsRef.current[j].offsetTop - stackPositionPx - (itemStackDistance * j))) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : '';
    });
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    cardsRef.current = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
    });

    const lenis = new Lenis({ wrapper: scroller });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    scroller.addEventListener('scroll', updateCardTransforms);
    updateCardTransforms();

    return () => {
      scroller.removeEventListener('scroll', updateCardTransforms);
      cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

/*----------------------------------*/
// DÉCLARATION DE LA VARIABLE companyLogos
const companyLogos = [
  { src: "/logos/logo-societe-generale.svg", alt: "Société Générale", href: "https://www.societegenerale.com/" },
  { src: "/logos/logo-bnp.svg", alt: "BNP Paribas", href: "https://group.bnpparibas/" },
  { src: "/logos/logo-credit-agricole.svg", alt: "Crédit Agricole", href: "https://www.credit-agricole.com/" },
  { src: "/logos/logo-allianz.svg", alt: "Allianz", href: "https://www.allianz.fr/" },
  { src: "/logos/logo-la-poste.svg", alt: "La Poste", href: "https://www.laposte.fr/" },
  { src: "/logos/logo-credit-mutuel.jpg", alt: "Crédit Mutuel", href: "https://www.creditmutuel.fr/fr/index.html" },
  { src: "/logos/logo-carrefour.svg", alt: "Carrefour", href: "https://www.carrefour.fr/" },
  { src: "/logos/logo-bred.svg", alt: "BRED Banque Populaire", href: "https://www.bred.fr/" },
  { src: "/logos/logo-gmf.png", alt: "GMF Assurances", href: "https://www.gmf.fr/" },
  { src: "/logos/logo-t-system.svg", alt: "T-Systems", href: "https://www.t-systems.com/" },
  { src: "/logos/logo-edf.svg", alt: "EDF", href: "https://www.edf.fr/" },
  { src: "/logos/logo-intermarche.svg", alt: "INTERMARCHE", href: "https://www.intermarche.fr/" },
];

/*----------------------------------*/
// COMPOSANT DE LA PAGE PRINCIPALE (TSLomaSections)

function TSLomaSections() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
          .send(
            "service_hdjt8mu",     // ✅ ton Service ID
            "template_d0mgtus",    // ✅ ton Template ID
            formData,
            "vOeeWp2LyfK9cinAH"    // ✅ ta Public Key
          )
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
              setStatus("✅ Message envoyé avec succès !");
            },
            (error) => {
              console.error("FAILED...", error);
              setStatus("❌ Erreur lors de l’envoi. Merci de réessayer.");
            }
          );

        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main>
            <section className="hero-section">
                <div className="hero-content">
                    <h2 className="slogan">TS-LOMA vous accompagne pour atteindre vos objectifs et viser votre cible précisément. </h2>
                    <a href="#contact" className="cta-button">Contactez-nous</a>
                </div>
            </section>

            {/* About */}
            <section id="about" className="about-section">
                <div className="container">
                    <div className="about-content" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div className="about-image-container" style={{ flex: '0 0 auto' }}>
                            <TiltedCard
                                imageSrc="/golf2.jpg"
                                altText="Golf - Inspiration"
                                captionText="L'esprit du golf"
                                containerHeight="400px"
                                containerWidth="400px"
                                imageHeight="400px"
                                imageWidth="400px"
                                rotateAmplitude={12}
                                scaleOnHover={1.15}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                            />
                        </div>
                        <div className="bio-text" style={{ flex: '1 1 0' }}>
                            <h3>TS-LOMA</h3>
                            <p>
                                L'équipe TS-LOMA est un ensemble d'experts reconnu dans le conseil aux entreprises informatiques. Fort de leurs expériences, ils mettent leur expertise au service de leurs clients pour les aider à surmonter les défis et à atteindre leurs objectifs stratégiques. La philosophie de l'équipe est basée sur l'écoute, le sur-mesure et l'humain au cœur de chaque projet.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="services-section">
                <h2 className="section-title" style={{ paddingBottom: '2rem', textAlign: 'center' }}>Nos services</h2>
                <div className="services-row">
                    <SpotlightCard className="card-spotlight">
                        <h2>Conseil en architecture MainFrame Z/OS</h2>
                        <p>Définissez votre vision et vos objectifs avec des stratégies claires et efficaces.</p>
                    </SpotlightCard>
                    <SpotlightCard className="card-spotlight">
                        <h2>Formation en MainFrame et Z/OS</h2>
                        <p>Développez les compétences de vos équipes pour un leadership éclairé et performant.</p>
                    </SpotlightCard>
                    <SpotlightCard className="card-spotlight">
                        <h2>Accompagnement des indépendants</h2>
                        <p>Portage salarial.</p>
                    </SpotlightCard>
                    <SpotlightCard className="card-spotlight">
                        <h2>Support aux grandes entreprises</h2>
                        <p>Optimisez vos processus et gagnez en efficacité opérationnelle.</p>
                    </SpotlightCard>
                </div>
            </section>

            {/* Values */}
            <section id="values" className="values-section">
                <div className="container">
                    <div className="values-content">
                        <div className="values-text">
                            <h2 className="section-title">Nos valeurs</h2>
                            <p>Chez TS-LOMA, notre philosophie s'inspire de la rigueur et de la vision du golf. Chaque projet est un nouveau parcours où nous appliquons nos principes fondamentaux :</p>
                            <ul>
                                <li><strong>Précision & Stratégie :</strong> Comme un golfeur qui choisit le bon club pour le bon coup, nous définissons avec précision la meilleure stratégie pour atteindre vos objectifs.</li>
                                <li><strong>Patience & Persévérance :</strong> La réussite ne se construit pas en un seul coup. Nous vous accompagnons à chaque étape, avec constance et engagement, jusqu'au succès.</li>
                                <li><strong>Intégrité & Respect :</strong> Nous jouons toujours selon les règles, avec transparence et honnêteté, pour bâtir une relation de confiance durable.</li>
                            </ul>
                        </div>
                        <div className="values-image-container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', minHeight: '420px' }}>
                            <TiltedCard
                                imageSrc="/golf.jpg"
                                altText="Golf - Précision et stratégie"
                                captionText="La rigueur du golf, notre inspiration"
                                containerHeight="400px"
                                containerWidth="400px"
                                imageHeight="400px"
                                imageWidth="400px"
                                rotateAmplitude={14}
                                scaleOnHover={1.2}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* References */}
            <section id="references" className="references-section">
                <div className="container">
                    <h2 className="section-title">Références et collaborations</h2>
                    <LogoLoop
                        logos={companyLogos}
                        speed={100}
                        direction="left"
                        logoHeight={60}
                        gap={60}
                        pauseOnHover
                        scaleOnHover
                        fadeOut
                        ariaLabel="Nos références et collaborations"
                    />
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <h2 className="section-title">Contactez-nous</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Votre message"
                            rows="5"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <button type="submit" className="cta-button submit-button">Envoyer le message</button>
                    </form>
                    {status && <p className="status-message">{status}</p>}
                    <div className="contact-info">
                        <p>Email: tsloma@tsloma.com</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

/*----------------------------------*/
// COMPOSANT RACINE DE L'APPLICATION (App)

export default function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    window.history.pushState(null, '', path);
    setCurrentPage(path);
  };

  const navItems = [
    { label: "À propos", bgColor: "#0D0716", textColor: "#fff", links: [{ label: "L'entreprise", href: "#about" }, { label: "Nos valeurs", href: "#values" }] },
    { label: "Services", bgColor: "#170D27", textColor: "#fff", links: [{ label: "Conseil", href: "#services" }, { label: "Formation", href: "#services" }] },
    { label: "Contact", bgColor: "#271E37", textColor: "#fff", links: [{ label: "Email", href: "#contact" }] }
  ];

  return (
    <React.StrictMode>
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

      {/* Contenu des pages */}
      {currentPage === '/mentions-legales' ? (
        <LegalMentions />
      ) : (
        <TSLomaSections />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 TS-LOMA. Tous droits réservés.</p>
          <div className="footer-links">
            <a
              href="/mentions-legales"
              onClick={(e) => {
                e.preventDefault();
                navigate('/mentions-legales');
              }}
            >
              Mentions légales
            </a>
          </div>
        </div>
      </footer>
    </React.StrictMode>
  );
}
