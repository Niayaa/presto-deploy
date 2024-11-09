// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Navbar from '../component/navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for login submission logic
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome back!</h1>
        <p>Let's get you signed in</p>
        <div className="divider">OR</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember me</label>
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
        <div className="footer-links">
          <Link to="/forgot-password">Forgot your password?</Link>
          <Link to="/support">Contact support</Link>
        </div>
      </div>
      <Link to="/signup" className="signup-link">Sign up</Link>
    </div>
  );
}

export default Login;
