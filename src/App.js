// src/App.js

import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Header />
      {!isAuthenticated ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <Dashboard />  
      )}
      <Footer />
    </div>
  );
}

export default App;
