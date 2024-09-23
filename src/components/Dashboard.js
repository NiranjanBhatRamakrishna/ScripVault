import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=2QDMGD2PD01YJEWU`
      );
      const data = await response.json();
      setStockData(data);
    };

    fetchStockData();
  }, []);

  return (
    <div>
      <h1>Your Investment Portfolio</h1>
      <p>Apple Inc: 10 shares at $150</p>
      <p>Google LLC: 5 shares at $2800</p>
      
      <h2>Stock Information</h2>
      {stockData ? (
        <div>
          {Object.keys(stockData['Time Series (Daily)']).map((date, index) => (
            <div key={index}>
              <h3>{date}</h3>
              <p>Open: {stockData['Time Series (Daily)'][date]['1. open']}</p>
              <p>High: {stockData['Time Series (Daily)'][date]['2. high']}</p>
              <p>Low: {stockData['Time Series (Daily)'][date]['3. low']}</p>
              <p>Close: {stockData['Time Series (Daily)'][date]['4. close']}</p>
              <p>Volume: {stockData['Time Series (Daily)'][date]['5. volume']}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading stock data...</p>
      )}
    </div>
  );
};

export default Dashboard;
