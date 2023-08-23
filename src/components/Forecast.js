import React, { Fragment, useContext } from "react";

import WeatherContext from "../store/api-context";
import "./Forecast.css";
import "../index.css";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = () => {
  const ctx = useContext(WeatherContext);
  const data = ctx.data;
  if (ctx.data === null) {
    return;
  }

  // Days in week
  const dayInAWeek = new Date().getDay();
  const forcastDays = weekDays
    .slice(dayInAWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInAWeek));

  // Average temperature
  const tempArr = data.list.slice(0, 5).flatMap((dayTemp) => dayTemp.main.temp);
  const avgTemp = tempArr.reduce((x, y) => {
    return x + y;
  });

  // Date period for 5 days average temperature
  const today = new Date();
  const in5Days = new Date();
  in5Days.setDate(in5Days.getDate() + 5);

  const avgTempDate = `${today.toLocaleString("default", {
    month: "short",
  })} ${today.getDate()}. - ${
    today.getMonth() === in5Days.getMonth()
      ? in5Days.getDate()
      : in5Days.toLocaleString("default", {
          month: "short",
        }) +
        " " +
        in5Days.getDate()
  }. ${today.getFullYear()}`;

  // Background color change
  let newPercentage = Math.round(avgTemp / tempArr.length);

  if (newPercentage >= 40) {
    newPercentage = -100;
  } else if (newPercentage < 40 && newPercentage >= 30) {
    newPercentage = -80;
  } else if (newPercentage < 30 && newPercentage >= 20) {
    newPercentage = -60;
  } else if (newPercentage < 20 && newPercentage >= 10) {
    newPercentage = -40;
  } else if (newPercentage < 10 && newPercentage >= 5) {
    newPercentage = -20;
  } else if (newPercentage < 5 && newPercentage >= -5) {
    newPercentage = 20;
  } else if (newPercentage < -5 && newPercentage >= -10) {
    newPercentage = 40;
  } else if (newPercentage < -10 && newPercentage >= -20) {
    newPercentage = 60;
  } else if (newPercentage < -20 && newPercentage >= -30) {
    newPercentage = 80;
  } else {
    newPercentage = 100;
  }

  document.documentElement.style.setProperty(
    "--cold-percent",
    `${newPercentage}%`
  );

  return (
    <Fragment>
      <div className="items-container">
        <p className="city">
          {data.city.name}, {data.city.country}
        </p>
      </div>
      <div className="items-container">
        <div className="daily-item">
          <label className="day">{avgTempDate}</label>
          <label className="temp-top">
            {Math.round(avgTemp / tempArr.length)}°C
          </label>
        </div>
      </div>
      <div className="items-container">
        {data.list.slice(0, 7).map((item, i) => (
          <div key={i} className="daily-item">
            <label className="day">{forcastDays[i]}</label>
            <label className="temp">{Math.round(item.main.temp)}°C</label>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Forecast;
