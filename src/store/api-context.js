import React, { createContext, useReducer } from "react";

import { dataReducer } from "../reducers/api-reducer";
import { initState } from "../reducers/api-reducer";

const WeatherContext = createContext({
  value: "",
  location_data: null,
  addCity: (city) => {},
  fillData: (data) => {},
});

export const WeatherContextProvider = (props) => {
  const [state, dispatch] = useReducer(dataReducer, initState);

  const addCityHandler = (city) => {
    dispatch({ type: "CITY", city_payload: city });
  };

  const fillDataHandler = (data) => {
    dispatch({ type: "LOCATION_DATA", data_payload: data });
  };

  const WeatherContextValue = {
    value: state.input_value,
    data: state.location_data,
    addCity: addCityHandler,
    fillData: fillDataHandler,
  };

  return (
    <WeatherContext.Provider value={WeatherContextValue}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
