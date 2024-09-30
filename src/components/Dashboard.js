// src/components/Dashboard.js

import React from 'react';
import MainContent from '../MainContent'; // Correct import path

const Dashboard = () => {
  return (
    <div>
      <h1>Your Investment Portfolio</h1>
      <p>Apple Inc: 10 shares at $150</p>
      <p>Google LLC: 5 shares at $2800</p>

      <h2>Stock Information</h2>
      <MainContent /> {/* Render stock information from MainContent */}
    </div>
  );
};

export default Dashboard;
