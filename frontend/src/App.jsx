import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import LandingPage from './landingpage';
import Login from './pages/login';
import Register from './pages/register';
import Navbar from '../component/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
