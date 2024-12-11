import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Navbar from './components/nav';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Clear any stored token
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth onLogin={handleLogin} />} />
          <Route  path="/dashboard"  element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <Dashboard /></ProtectedRoute> }/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
