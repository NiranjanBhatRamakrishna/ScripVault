import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/login" element={<Auth onLogin={handleLogin} />} /> {/* Login page */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Home />} // Redirect to Home if not logged in
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
