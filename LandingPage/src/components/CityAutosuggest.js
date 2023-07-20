import React, { useState, useEffect } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";

const CityAutosuggest = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const loadCities = async () => {
      const response = await axios.get(
        "/en/api/v1/search/typeahead?search_page_id=12&query="
      );
      setCities(response.data.cities.map((city) => city.name)); // Assuming the city names are stored in the 'name' property
    };

    loadCities();
  }, []);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : cities.filter(
          (city) => city.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const inputProps = {
    placeholder: "Type a city",
    value,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      inputProps={inputProps}
    />
  );
};

export default CityAutosuggest;
