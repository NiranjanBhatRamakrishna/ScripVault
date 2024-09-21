import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainContent = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=2QDMGD2PD01YJEWU'
        );
        setStockData(response.data);
      } catch (err) {
        setError('Error fetching stock data');
      }
    };
    fetchStockData();
  }, []);

  const renderStockData = () => {
    if (!stockData || !stockData['Time Series (Daily)']) {
      return <p>Loading stock data...</p>;
    }

    const timeSeries = stockData['Time Series (Daily)'];
    const dates = Object.keys(timeSeries); // Get the dates

    return dates.slice(0, 5).map((date) => ( // Show last 5 records
      <div key={date}>
        <h3>{date}</h3>
        <p>Open: {timeSeries[date]['1. open']}</p>
        <p>High: {timeSeries[date]['2. high']}</p>
        <p>Low: {timeSeries[date]['3. low']}</p>
        <p>Close: {timeSeries[date]['4. close']}</p>
        <p>Volume: {timeSeries[date]['5. volume']}</p>
      </div>
    ));
  };

  return (
    <div>
      <h2>Stock Information</h2>
      {error ? <p>{error}</p> : renderStockData()}
    </div>
  );
};

export default MainContent;
