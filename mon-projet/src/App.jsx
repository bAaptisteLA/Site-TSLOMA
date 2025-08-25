import React from 'react';

/*----------------------------------*/
// IMPORTS DES COMPOSANTS EXTERNES
import Lenis from "lenis";
import Home from './Home';
import CardNav from './CardNav';
import TiltedCard from './TiltedCard';

// IMPORTS DES STYLES
import './style.css';
import './ScrollStack.css';

/*----------------------------------*/
// SOUS-COMPOSANT POUR L'EFFET DE DÉFILEMENT (ScrollStack)

const { useLayoutEffect, useRef, useCallback } = React;

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
// COMPOSANT DE LA PAGE PRINCIPALE (TSLomaSections)

function TSLomaSections() {
    const navItems = [
        { label: "À propos", bgColor: "#0D0716", textColor: "#fff", links: [{ label: "L'entreprise", href: "#about" }, { label: "Nos valeurs", href: "#values" }] },
        { label: "Services", bgColor: "#170D27", textColor: "#fff", links: [{ label: "Conseil", href: "#services" }, { label: "Formation", href: "#services" }] },
        { label: "Contact", bgColor: "#271E37", textColor: "#fff", links: [{ label: "Email", href: "#contact" }, { label: "Réseaux sociaux", href: "#" }] }
    ];

    return (
        <main>
            <CardNav logoAlt="Logo de l'entreprise" items={navItems} baseColor="#fff" menuColor="#000" buttonBgColor="#111" buttonTextColor="#fff" ease="power3.out" />

            <section className="hero-section">
                <div className="hero-content">
                    <h2 className="slogan">TS-LOMA vous accompagne pour atteindre vos objectifs et viser votre cible précisément. </h2>
                    <a href="#contact" className="cta-button">Contactez-nous</a>
                </div>
            </section>

            <section id="about" className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="portrait-container"></div>
                        <div className="bio-text">
                            <h3>TS-LOMA</h3>
                            <p>L'équipe TS-LOMA est un ensemble d'experts reconnu dans le conseil aux entreprises informatiques. Fort de leurs expériences, ils mettent leur expertise au service de leurs clients pour les aider à surmonter les défis et à atteindre leurs objectifs stratégiques. La philosophie de l'équipe est basée sur l'écoute, le sur-mesure et l'humain au cœur de chaque projet.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="services-section">
                <h2 className="section-title" style={{ paddingBottom: '2rem', textAlign: 'center' }}>Nos services</h2>
                <ScrollStack>
                    <ScrollStackItem itemClassName="service-card-custom">
                        <h2>Conseil en architecture MainFrame Z/OS</h2>
                        <p>Définissez votre vision et vos objectifs avec des stratégies claires et efficaces.</p>
                    </ScrollStackItem>
                    <ScrollStackItem itemClassName="service-card-custom">
                        <h2>Formation en MainFrame et Z/OS</h2>
                        <p>Développez les compétences de vos équipes pour un leadership éclairé et performant.</p>
                    </ScrollStackItem>
                    <ScrollStackItem itemClassName="service-card-custom">
                        <h2>Accompagnement des indépendants</h2>
                        <p>Portage salarial.</p>
                    </ScrollStackItem>
                    <ScrollStackItem itemClassName="service-card-custom">
                        <h2>Support aux grandes entreprises</h2>
                        <p>Optimisez vos processus et gagnez en efficacité opérationnelle.</p>
                    </ScrollStackItem>
                </ScrollStack>
            </section>

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
            <div className="values-image-container">
                <TiltedCard
                    imageSrc="/golf.jpg"
                    
                    captionText="La rigueur du golf, notre inspiration"
                    containerHeight="300px"
                    containerWidth="300px"
                    imageHeight="300px"
                    imageWidth="300px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                        <p className="tilted-card-demo-text">
                            Précision & Stratégie
                        </p>
                    }
                />
            </div>
        </div>
    </div>
</section>

            <section id="references" className="references-section">
                <div className="container">
                    <h2 className="section-title">Références et collaborations</h2>
                    <div className="references-grid"></div>
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

/*----------------------------------*/
// COMPOSANT RACINE DE L'APPLICATION (App)

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