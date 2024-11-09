import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';

function LandingPage() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to Our App</h1>
        <p>Explore our templates, features, and join our community!</p>
      </main>
    </div>
  );
}

export default LandingPage;
