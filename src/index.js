import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { WeatherContextProvider } from "./store/api-context";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WeatherContextProvider>
    <App />
  </WeatherContextProvider>
);
