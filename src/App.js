import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './MainContent'; // Import the MainContent component
import Auth from './components/Auth'; // Import the Auth component

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />  {/* Add the MainContent here */}
      <Auth />  {/* Add the Auth component here */}
      <Footer />
    </div>
  );
}

export default App;
