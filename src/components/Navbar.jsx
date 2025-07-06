import React, { useEffect, useRef, useState } from 'react';
import '../css/components/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallWindow, setSmallWindow] = useState(window.innerWidth < 1000);
  const [revealed, setRevealed] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const logoRef = useRef(null);

  const handleLinkClick = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setRevealed(true);

      const cleanupTimer = setTimeout(() => {
        setAnimationDone(true);
      }, 1400);

      return () => clearTimeout(cleanupTimer);
    }, 500);

    return () => clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.2);
    };
    const handleResize = () => {
      setSmallWindow(window.innerWidth < 1000);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const letters = "abcdefghijklmnopqrstuvxyz";
    let animationInterval = null;
    let scrambleInterval = null;

    const handleHover = (element) => {
      clearInterval(scrambleInterval);
      const originalText = element.dataset.value;
      let iterations = 0;

      scrambleInterval = setInterval(() => {
        const newText = originalText
            .split("")
            .map((letter, index) => {
              if (index < iterations) return originalText[index];
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        element.innerText = newText;
        iterations += 0.5;
        if (iterations >= originalText.length) {
          clearInterval(scrambleInterval);
          element.innerText = originalText;
        }
      }, 50);
    };

    const handleLeave = (element) => {
      clearInterval(scrambleInterval);
      const originalText = element.dataset.value;
      let iterations = originalText.length;

      scrambleInterval = setInterval(() => {
        const newText = originalText
            .split("")
            .map((letter, index) => {
              if (index >= iterations) return originalText[index];
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        element.innerText = newText;
        iterations -= 0.5;
        if (iterations <= 0) {
          clearInterval(scrambleInterval);
          element.innerText = originalText;
        }
      }, 50);
    };

    const logo = logoRef.current;

    if (logo) {
      logo.addEventListener("mouseover", () => handleHover(logo));
      logo.addEventListener("mouseleave", () => handleLeave(logo));

      // Trigger randomly every 10–15 seconds
      animationInterval = setInterval(() => {
        handleHover(logo);
      }, 8000 + Math.random() * 2000);
    }

    return () => {
      if (logo) {
        logo.removeEventListener("mouseover", () => handleHover(logo));
        logo.removeEventListener("mouseleave", () => handleLeave(logo));
      }
      clearInterval(scrambleInterval);
      clearInterval(animationInterval);
    };
  }, []);

  return (
      <div className={`${smallWindow && scrolled ? 'navbar-glass blur' : ''} ${revealed ? 'navbar-revealed' : ''}`}>
        <div className={`navbar-logo opacity ${revealed && !animationDone ? 'link-delay-1' : ''}`}>
          <a href="#index" data-cursor-hover data-value="Piran" className="logo-link" ref={logoRef}>
            Piran
          </a>
          <span className="dot">.</span>
        </div>

        <header className={`header-absolute ${scrolled ? 'header-fixed' : ''}`}>
          <nav className={`navbar-links ${scrolled ? 'navbar-glass blur' : ''} ${menuOpen ? 'open' : ''}`}>
            <a
                href="#hero"
                className={`fade-in-left ${revealed && !animationDone ? 'link-delay-1' : ''}`}
                data-cursor-link
                onClick={handleLinkClick}
            >
              <p>01</p> ./home
            </a>
            <a
                href="#about"
                className={`fade-in-left ${revealed && !animationDone ? 'link-delay-2' : ''}`}
                data-cursor-link
                onClick={handleLinkClick}
            >
              <p>02</p> ./about
            </a>
            <a
                href="#"
                className={`fade-in-left ${revealed && !animationDone ? 'link-delay-3' : ''}`}
                data-cursor-link
                onClick={handleLinkClick}
            >
              <p>03</p> ./work
            </a>
            <a
                href="#"
                className={`fade-in-left ${revealed && !animationDone ? 'link-delay-4' : ''}`}
                data-cursor-link
                onClick={handleLinkClick}
            >
              <p>04</p> ./contact
            </a>
          </nav>

          <div className={`hamburger-container fade-in-left ${revealed && !animationDone ? 'link-delay-3' : ''}`}>
            <svg
                className={`ham hamRotate ham7 ${menuOpen ? 'active' : ''}`}
                viewBox="0 0 100 100"
                width="50"
                onClick={toggleMenu}
            >
              <path
                  className="line top"
                  d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013"
              />
              <path className="line middle" d="m 70,50 h -40" />
              <path
                  className="line bottom"
                  d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582
                8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40"
              />
            </svg>
          </div>
        </header>
      </div>
  );
};

export default Navbar;