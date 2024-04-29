import React, { useEffect, useState } from "react";
import { CryptoTable } from "./components/CryptoTable";
import { CircularProgress } from "@mui/material";

const defaultCryptoList = [
  {
    id: 0,
    created_at: "",
    updated_at: "",
    name: "",
    short_name: null,
    price: null,
    one_hour_change: null,
    one_day_change: null,
    one_week_change: null,
    market_cap: null,
    volume_in_dollars: null,
    volume_in_crypto: null,
    circulating_supply: null,
  },
];

const App = () => {
  const [data, setData] = useState(defaultCryptoList);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(process.env.REACT_APP_API_URL!);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <h1>Coin market</h1>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        "Error fetching the data"
      ) : (
        <CryptoTable cryptoList={data} />
      )}
    </div>
  );
};

export default App;
