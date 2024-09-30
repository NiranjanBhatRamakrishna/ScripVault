import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const MainContent = () => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStockData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=2QDMGD2PD01YJEWU'
      );
      console.log("Raw response:", response.data); // Debugging log to check data structure

      if (response.data['Time Series (Daily)']) {
        const timeSeries = response.data['Time Series (Daily)'];
        
        // Get unique dates and sort them in descending order
        const sortedUniqueDates = [...new Set(Object.keys(timeSeries))]
          .sort((a, b) => new Date(b) - new Date(a)); // Sort by most recent date

        // Rebuild the data with only unique sorted dates
        const filteredTimeSeries = sortedUniqueDates.reduce((acc, date) => {
          acc[date] = timeSeries[date];
          return acc;
        }, {});

        setStockData({
          ...response.data,
          'Time Series (Daily)': filteredTimeSeries,
        });
      } else {
        setError('Unexpected response format.');
      }
    } catch (err) {
      setError('Error fetching stock data');
    }
  }, []);

  useEffect(() => {
    fetchStockData();
  }, [fetchStockData]);

  const renderStockData = () => {
    if (!stockData || !stockData['Time Series (Daily)']) {
      return <p>Loading stock data...</p>;
    }

    const timeSeries = stockData['Time Series (Daily)'];
    const dates = Object.keys(timeSeries);

    console.log("Rendering filtered stock data..."); // Debugging log
    return dates.map((date, index) => (
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
      {error ? <p>{error}</p> : renderStockData()}
    </div>
  );
};

export default MainContent;
