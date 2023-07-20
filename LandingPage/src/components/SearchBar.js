import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      axios
        .get(`http://localhost:3001/api/v1/search/typeahead?query=${query}`)
        .then((res) => {
          setResults(res.data); // update results state with fetched data
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false); // stop loading after the request is complete (both on success and error)
        });
    }
  }, [query]); // execute effect whenever the query state changes

  // useEffect(() => {
  //   if (query.length > 0) {
  //     setShowDropdown(true);
  //   } else {
  //     setShowDropdown(false);
  //   }
  // }, [query]);

  useEffect(() => {
    if (selectedCity !== null) {
      const { searchable_id: cityId, type } = selectedCity;
      axios
        .get(
          `http://localhost:3001/api/v1/search/get_coords?search_type=City&query=${cityId}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCity]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  console.log(showDropdown);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Any Where"
        // onFocus={() => setIsFocused(true)}
      />
      {query.length > 0 && showDropdown && (
        <div className="dropDown">
          <div className="search-bar-dropdown">
            <div className="dropdown">
              <div className="frame">
                {isLoading ? (
                  <p>Searching...</p> // show this while loading
                ) : results.length > 0 ? (
                  results.map((result, index) => (
                    <div className="active" key={index}>
                      <div className="list-item">
                        <div
                          className="frame2"
                          onClick={() => {
                            setQuery(result.city_name);
                            // setSelectedIndex(index);
                            setShowDropdown(false);
                            setSelectedCity(result);
                            props.setLocation(result.city_name); // update location state in parent component
                          }}
                          // onChange={handleDropdownChange}
                        >
                          <div className="label">
                            {result.hotel_name
                              ? result.hotel_name
                              : result.city_name}
                          </div>
                          <div className="caption">
                            {result.city_name}, {result.country_name}
                          </div>
                        </div>
                        <img
                          className="icon"
                          src={
                            result.hotel_name
                              ? "https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/649785b6203e0fb466bce545_getademo_icon.svg"
                              : "https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/64b420a332dbf85fa5a2b6a9_Icon.svg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Searching...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.hotel_name}
            {result.city_name}, {result.country_name}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default SearchBar;
