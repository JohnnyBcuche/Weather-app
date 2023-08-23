export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "*****e70a184f5842d0bf9790df*****";

export const forecastApi = (location) =>
  `${WEATHER_API_URL}/forecast?q=${location}&units=metric&appid=${WEATHER_API_KEY}`;

export const api = (city, country) =>
  `${WEATHER_API_URL}/forecast?q=${city},${country}&appid=${WEATHER_API_KEY}`;
