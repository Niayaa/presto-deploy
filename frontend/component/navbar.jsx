import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User");
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="./image/logo.png" alt="logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-buttons">
      {isLoggedIn ? (
          <>
            <Link to="/Dashboard" className="new-presentation-button">New Presentation</Link>
            <span className="username">{username}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="login-link">Log in</Link>
            <Link to="/register" className="signup-button">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
