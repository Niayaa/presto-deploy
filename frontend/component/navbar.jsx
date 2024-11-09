import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/auth/status', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // 假设你在本地存储了 token
          },
        });
        const data = await response.json();
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
          setUsername(data.email);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching auth status:', error);
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
