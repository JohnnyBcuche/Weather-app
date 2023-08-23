import React, { Fragment, useContext, useRef, useState } from "react";

import WeatherContext from "../store/api-context";
import ErrorModal from "./ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

const Search = (props) => {
  const ctx = useContext(WeatherContext);
  const cityInputValue = useRef();
  const [error, setError] = useState();

  const onChangeHandler = () => {
    const enteredCity = cityInputValue.current.value;
    ctx.addCity(enteredCity);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredCity = cityInputValue.current.value;

    if (enteredCity.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid city (non-empty values).",
      });
      return;
    }

    cityInputValue.current.value = "";
    props.onSubmit();
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form className="form" onSubmit={submitHandler}>
        <div>
          {ctx.data !== null && (
            <img
              src={`http://openweathermap.org/img/w/${
                ctx.data.list[0].weather[0].icon
              }.png`}
              alt="weather icon"
            />
          )}
        </div>

        <div className="select-container">
          <select name="" id="">
            <option value="" />
            <option value="">US</option>
            <option value="">UK</option>
          </select>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Please enter your location"
            onChange={onChangeHandler}
            ref={cityInputValue}
          />
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
      </form>
    </Fragment>
  );
};

export default Search;
