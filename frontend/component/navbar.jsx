import React, { useState, useEffect,useContext}  from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from './authcontext';


function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="navbar-logo">
        <Link to="/">
            <img src="./image/logo.png" alt="logo" className="logo" />
          </Link>
      </ul>
      {isLoggedIn ? (
        <>
          <ul className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          </ul>
          <div className="navbar-buttons">      
            <button onClick={logout}>Logout</button>
          </div>    
        </>
      ) : (
          <>
            <div className="navbar-buttons">
            <Link to="/login" className="login-link">Log in</Link>
            <Link to="/register" className="signup-button">Sign up</Link>
            </div>
          </>
        )}
    </nav>
  );
}

export default Navbar;
