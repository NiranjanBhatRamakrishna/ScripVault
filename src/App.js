import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './MainContent'; // Import the new component

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />  {/* Add the MainContent here */}
      <Footer />
    </div>
  );
}

export default App;
