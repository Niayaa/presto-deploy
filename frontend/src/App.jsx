import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import LandingPage from './pages/landingpage';
import Login from './pages/login';
import Register from './pages/register';
import Navbar from '../component/navbar';
import Dashboard from './pages/dashboard';
import PresentationView from './pages/presentation/presentationView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/presentation/:id" element={<PresentationView />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App
