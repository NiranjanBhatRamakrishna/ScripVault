// src/MainContent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainContent = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        console.log("Fetching stock data...");
        const response = await axios.get(
          'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=2QDMGD2PD01YJEWU'
        );
        console.log("Data fetched:", response.data);
        setStockData(response.data['Time Series (Daily)']);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError('Error fetching stock data');
      }
    };
    fetchStockData();
  }, []);

  const renderStockData = () => {
    if (!stockData) {
      return <p>Loading stock data...</p>;
    }

    const dates = Object.keys(stockData).slice(0, 5); // Show last 5 records
    console.log('Dates to display:', dates);

    return dates.map((date) => (
      <div key={date}>
        <h3>{date}</h3>
        <p>Open: {stockData[date]['1. open']}</p>
        <p>High: {stockData[date]['2. high']}</p>
        <p>Low: {stockData[date]['3. low']}</p>
        <p>Close: {stockData[date]['4. close']}</p>
        <p>Volume: {stockData[date]['5. volume']}</p>
      </div>
    ));
  };

  return (
    <div>
      {error ? <p>{error}</p> : renderStockData()} {/* Show error if any */}
    </div>
  );
};

export default MainContent;
