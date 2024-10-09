// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import MainContent from '../MainContent'; // Correct import path

const Dashboard = () => {
  const [netWorth, setNetWorth] = useState(0);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/user-data'); // Adjust this endpoint as needed
      const data = await response.json();
      setNetWorth(data.netWorth);
      setPortfolio(data.portfolio);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Your Investment Portfolio</h1>
      <p>Net Worth: ${netWorth}</p>
      <h2>Your Stocks:</h2>
      <ul>
        {portfolio.map(item => (
          <li key={item.id}>{item.name}: {item.shares} shares at ${item.price}</li>
        ))}
      </ul>

      <h2>Stock Information</h2>
      <MainContent /> {/* Render stock information from MainContent */}
    </div>
  );
};

export default Dashboard;
