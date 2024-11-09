// src/pages/Login.jsx
import React, { useState } from 'react';
import ErrorMessage from './errorMessage';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock login validation
    if (email === 'user@example.com' && password === 'password') {
      navigate('/dashboard'); 
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

