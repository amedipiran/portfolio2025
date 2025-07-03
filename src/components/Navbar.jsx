import React, { useEffect, useRef, useState } from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [smallWindow, setSmallWindow] = useState(window.innerWidth < 1000);
  const logoRef = useRef(null); // ✅ reference for the logo

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
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    const handleHover = (e) => {
      let iterations = 0;
      const originalText = e.target.dataset.value;

      clearInterval(interval);
      interval = setInterval(() => {
        e.target.innerText = e.target.innerText
            .split("")
            .map((letter, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        iterations += 1 / 2;

        if (iterations >= originalText.length) {
          clearInterval(interval);
          e.target.innerText = originalText;
        }
      }, 30);
    };

    const logo = logoRef.current;
    if (logo) {
      logo.addEventListener('mouseover', handleHover);
    }

    return () => {
      if (logo) {
        logo.removeEventListener('mouseover', handleHover);
      }
      clearInterval(interval);
    };
  }, []);

  return (
      <div className={`${smallWindow && scrolled ? 'navbar-glass blur' : ''}`}>
        <a
            href="#index"
            data-cursor-hover
            data-value="PIRAN"
            className="navbar-logo"
            ref={logoRef} // ✅ attach ref
        >
          PIRAN
        </a>
        <header className={`header-absolute ${scrolled ? 'header-fixed' : ''}`}>
          <nav className={`navbar-links ${scrolled ? 'navbar-glass blur' : ''} ${menuOpen ? 'open' : ''}`}>
            <a href="#" data-cursor-link data-cursor-hover onClick={handleLinkClick}><p>01</p> // home</a>
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