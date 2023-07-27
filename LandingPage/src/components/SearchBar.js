import React, { useState, useEffect } from "react";
import axios from "axios";
import DropSkeleton from "./DropSkeleton";
import Skeleton from "react-loading-skeleton";

function SearchBar({
  setSelectedCityName,
  setSelectedCityCords,
  onCitySelect,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCity, setSelectCity] = useState(null);
  useEffect(() => {
    if (selectCity) {
      onCitySelect(selectCity);
    }
  }, [selectCity, onCitySelect]);
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      axios
        .get(
          `https://guest-book-backend.vercel.app/api/v1/search/typeahead?query=${query}`
        )
        .then((res) => {
          setResults(res.data); // update results state with fetched data
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false); // stop loading after the request is complete (both on success and error)
        });
    }
  }, [query]); // execute effect whenever the query state changes

  useEffect(() => {
    if (selectCity) {
      const { searchable_type: type } = selectCity;
      if (type) {
        const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
        axios
          .get(
            `https://guest-book-backend.vercel.app/api/v1/search/get_coords?&search_type=${formattedType}&query=${selectCity.searchable_id}`
          )
          .then((res) => {
            setSelectedCityCords({
              neBoxLat: res.data.ne_box_lat,
              neBoxLng: res.data.ne_box_lng,
              swBoxLat: res.data.sw_box_lat,
              swBoxLng: res.data.sw_box_lng,
            });
          })
          .catch((err) => console.error(err));
      }
    }
  }, [selectCity]);

  return (
    <div>
      <input
        className="inputSize"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Anywhere"
        // onFocus={() => setIsFocused(true)}
      />
      {query.length > 0 && showDropdown && (
        <div className="dropDown">
          <div className="search-bar-dropdown">
            <div className="dropdown">
              <div className="frame">
                {isLoading ? (
                  <DropSkeleton cards={4} />
                ) : // show this while loading
                results.length > 0 ? (
                  results.map((result, index) => {
                    return (
                      <div className="active" key={index}>
                        <div className="list-item">
                          <div
                            className="frame2"
                            onClick={() => {
                              let locationName = "";
                              if (result.hotel_name) {
                                locationName = result.hotel_name;
                              } else if (result.city_name) {
                                locationName = result.city_name;
                              } else if (result.state_name) {
                                locationName = result.state_name;
                              }
                              setQuery(result.content);
                              setShowDropdown(false);
                              setSelectCity(result);
                              setSelectedCityName({
                                cityName: result.city_name,
                                stateName: result.state_name,
                                countryName: result.country_name,
                                hotelName: result.hotel_name,
                              });
                            }}
                          >
                            <div className="label">
                              {result.hotel_name
                                ? result.hotel_name
                                : result.city_name
                                ? result.city_name
                                : result.state_name}
                            </div>
                            <div className="caption">
                              {result.state_name}, {result.city_name},
                              {result.country_name}
                            </div>
                          </div>
                          <img
                            className="icon"
                            // src={
                            //   result.hotel_name
                            //     ? "https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/64bfab922cc46c71a5af0e74_hotel.svg"
                            //     : "https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/64b420a332dbf85fa5a2b6a9_Icon.svg"
                            // }
                            alt=""
                            src="https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/64b420a332dbf85fa5a2b6a9_Icon.svg"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <DropSkeleton cards={4} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
