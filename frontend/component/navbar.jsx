import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5005/admin/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);
          setUsername("User"); 
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('token'); 
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('token'); 
      }
    };

    checkAuthStatus();
  }, []);
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
            <Link to="/dashboard" className="new-presentation-button">New Presentation</Link>
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
