import React, { useContext, useState } from "react";

import Search from "./components/Search";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import WeatherContext from "./store/api-context";
import { forecastApi } from "./store/api";
import "./App.css";

const App = () => {
  const ctx = useContext(WeatherContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  console.log(ctx.data);

  async function fetchWeatherHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(forecastApi(ctx.value));
      if (!response.ok) {
        throw new Error(`Oops! Something went wrong... (${response.status})`);
      }

      const data = await response.json();
      ctx.fillData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }

  let content = null;

  if (ctx.data !== null && ctx.data.city !== undefined) {
    content = <Forecast />;
  }

  if (error) {
    content = (
      <div className="error-content">
        <p className="error-msg">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    content = <Loader />;
  }

  return (
    <div className="container">
      <Search onSubmit={fetchWeatherHandler} />
      <section>{content}</section>
    </div>
  );
};

export default App;
