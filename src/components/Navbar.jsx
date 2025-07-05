import React, { useEffect, useRef, useState } from 'react';
import '../css/components/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallWindow, setSmallWindow] = useState(window.innerWidth < 1000);
  const logoRef = useRef(null);

  const handleLinkClick = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

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
    let interval = null;

    const handleHover = (e) => {
      clearInterval(interval);
      const originalText = e.target.dataset.value;
      let iterations = 0;

      interval = setInterval(() => {
        const newText = originalText
            .split("")
            .map((letter, index) => {
              if (index < iterations) return originalText[index];
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        e.target.innerText = newText;

        iterations += 0.5;
        if (iterations >= originalText.length) {
          clearInterval(interval);
          e.target.innerText = originalText;
        }
      }, 50);
    };

    const handleLeave = (e) => {
      clearInterval(interval);
      const originalText = e.target.dataset.value;
      let iterations = originalText.length;

      interval = setInterval(() => {
        const newText = originalText
            .split("")
            .map((letter, index) => {
              if (index >= iterations) return originalText[index];
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        e.target.innerText = newText;

        iterations -= 0.5;
        if (iterations <= 0) {
          clearInterval(interval);
          e.target.innerText = originalText;
        }
      }, 50);
    };

    const logo = logoRef.current;
    if (logo) {
      logo.addEventListener("mouseover", handleHover);
      logo.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      if (logo) {
        logo.removeEventListener("mouseover", handleHover);
        logo.removeEventListener("mouseleave", handleLeave);
      }
      clearInterval(interval);
    };
  }, []);

  return (
      <div className={`${smallWindow && scrolled ? 'navbar-glass blur' : ''}`}>
        <div className="navbar-logo">
          <a
              href="#index"
              data-cursor-hover
              data-value="Piran"
              className="logo-link"
              ref={logoRef}
          >
            Piran
          </a>
          <span className="dot">.</span>
        </div>

        <header className={`header-absolute ${scrolled ? 'header-fixed' : ''}`}>
          <nav className={`navbar-links ${scrolled ? 'navbar-glass blur' : ''} ${menuOpen ? 'open' : ''}`}>
            <a href="#index" data-cursor-link data-cursor-hover onClick={handleLinkClick}><p>01</p> // home</a>
            <a href="#about" data-cursor-link data-cursor-hover onClick={handleLinkClick}><p>02</p> // about</a>
            <a href="#" data-cursor-link data-cursor-hover onClick={handleLinkClick}><p>03</p> // work</a>
            <a href="#" data-cursor-link data-cursor-hover onClick={handleLinkClick}><p>04</p> // contact</a>
          </nav>
          <div className={`navbar-burger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </div>
        </header>
      </div>
  );
};

export default Navbar;