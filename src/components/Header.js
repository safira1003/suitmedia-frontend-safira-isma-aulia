import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isTop, setIsTop] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);

      setIsTop(currentScrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  return (
    <header className={`header ${scrollDirection === 'down' ? 'scrolledDown' : 'scrolledUp'} ${isTop ? 'atTop' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="suitmedia-logo-white.png" alt="Logo" />
          </Link >
        </div>
        <nav className="menu">
          <ul>
            <li className={location.pathname === '/work' ? 'active' : ''}>
              <Link to="/work">Work</Link>
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about">About</Link>
            </li>
            <li className={location.pathname === '/services' ? 'active' : ''}>
              <Link to="/services">Services</Link>
            </li>
            <li className={location.pathname === '/' || location.pathname === '/ideas' ? 'active' : ''}>
              <Link to="/ideas">Ideas</Link>
            </li>
            <li className={location.pathname === '/careers' ? 'active' : ''}>
              <Link to="/careers">Careers</Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
