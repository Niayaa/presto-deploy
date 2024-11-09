import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Our App</h1>
      <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.</p>
    </div>
  );
}

export default LandingPage;
