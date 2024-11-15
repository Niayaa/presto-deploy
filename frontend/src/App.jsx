import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import LandingPage from './pages/landingpage';
import Login from './pages/login';
import Register from './pages/register';
import Navbar from '../component/navbar';
import Dashboard from './pages/presentation/dashboard';
import SlideEditor from './pages/presentation/slideEditor';
import EditorPage from './pages/presentation/editorpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../component/authcontext';
import { PresentationProvider } from './pages/presentation/presentationContext';
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
    <AuthProvider>
      <PresentationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/editor/:presentationId" element={<EditorPage />} />
            <Route path="/editor/:presentationId/slides/:slideNumber" element={<SlideEditor />} />
          </Routes>
        </Router>
      </PresentationProvider>
    </AuthProvider>
    </>
  )
}

export default App
