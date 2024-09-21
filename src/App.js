import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './MainContent';
import Auth from './components/Auth';

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
        <MainContent />
      )}
      <Footer />
    </div>
  );
}

export default App;
