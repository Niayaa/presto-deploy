import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="./image/logo.png" alt="logo" className="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/presentations">Presentations</Link></li>
        <li><Link to="/templates">Templates</Link></li>
        <li><Link to="/features">Features</Link></li>
      </ul>
      <div className="navbar-buttons">
        <Link to="/login" className="login-link">Log in</Link>
        <Link to="/register" className="signup-button">Sign up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
