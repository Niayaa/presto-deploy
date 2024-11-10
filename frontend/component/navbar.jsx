import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { AuthContext } from './authcontext';


function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
          <>
            <Link to="/login" className="login-link">Log in</Link>
            <Link to="/register" className="signup-button">Sign up</Link>
          </>
        )}
    </nav>
  );
}

export default Navbar;
