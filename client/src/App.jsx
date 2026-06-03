import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import GestureRecognition from './pages/GestureRecognition';
import OcrReader from './pages/OcrReader';
import Profile from './pages/Profile';
import SosPage from './pages/SosPage';
import SpeechAssistant from './pages/SpeechAssistant';
import VisionAssistant from './pages/VisionAssistant';

export default function App() {
  const [dark, setDark] = useState(localStorage.getItem('onepulse_dark') === 'true');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('onepulse_dark', dark);
  }, [dark, highContrast]);

  return (
    <div className="min-h-screen">
      <Navbar dark={dark} setDark={setDark} highContrast={highContrast} setHighContrast={setHighContrast} />
      <Routes>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/speech" element={<ProtectedRoute><SpeechAssistant /></ProtectedRoute>} />
        <Route path="/ocr" element={<ProtectedRoute><OcrReader /></ProtectedRoute>} />
        <Route path="/vision" element={<ProtectedRoute><VisionAssistant /></ProtectedRoute>} />
        <Route path="/gesture" element={<ProtectedRoute><GestureRecognition /></ProtectedRoute>} />
        <Route path="/sos" element={<ProtectedRoute><SosPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
