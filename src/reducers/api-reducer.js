export const initState = {
  input_value: "",
  location_data: null,
};

export const dataReducer = (state, action) => {
  if (action.type === "CITY") {
    return { ...state, input_value: action.city_payload };
  }

  if (action.type === "LOCATION_DATA") {
    return { ...state, location_data: action.data_payload };
  }

  return state;
};
