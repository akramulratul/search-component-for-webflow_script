import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DropSkeleton from "./DropSkeleton";
import Skeleton from "react-loading-skeleton";
import useDebounce from "../utilities/useDebounce";
import CityResults from "./CityResults";
import PropTypes from "prop-types";
function SearchBar({
  setSelectedCityName,
  setSelectedCityCords,
  onCitySelect,
  setIsFocused,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCity, setSelectCity] = useState(null);
  const [noResultsFound, setNoResultsFound] = useState(false); // new state
  const debouncedQuery = useDebounce(query, 250);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (selectCity) {
      onCitySelect(selectCity);
    }
  }, [selectCity, onCitySelect]);

  useEffect(() => {
    let timerId; // declare timerId inside the useEffect
    if (debouncedQuery.length > 0) {
      setIsLoading(true);
      setNoResultsFound(false); // Reset the no results flag
      axios
        .get(
          `https://guest-book-backend.vercel.app/api/v1/search/typeahead?query=${debouncedQuery}`
        )
        .then((res) => {
          setResults(res.data); // update results state with fetched data
          if (res.data.length === 0) {
            timerId = setTimeout(() => {
              setNoResultsFound(true);
            }, 180000); // 180000 milliseconds = 3 minutes
          }
        })
        .catch((err) => {
          console.error(err);
          setNoResultsFound(true); // If there's an error, immediately indicate no results.
        })
        .finally(() => {
          setIsLoading(false); // stop loading after the request is complete (both on success and error)
        });
    }
    return () => {
      clearTimeout(timerId); // Clear the timer when the component unmounts or when the query changes.
    };
  }, [debouncedQuery]); // execute effect whenever the query state changes

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
              long: res.data.longitude,
              lat: res.data.latitude,
              hLong: res.data.lng,
              hLat: res.data.lat,
            });
          })
          .catch((err) => console.error(err));
      }
    }
  }, [selectCity]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    const handleDocumentClick = () => {
      setDropdownVisible(false);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div className="dropDown_component">
      <input
        className="inputSize truncate"
        type="text"
        value={query}
        ref={inputRef}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Las Vegas"
        onFocus={() => {
          setDropdownVisible(true);
          setIsFocused(true); // Set isFocused to true on focus
        }}
        onBlur={(e) => {
          if (
            dropdownRef.current &&
            dropdownRef.current.contains(e.relatedTarget)
          ) {
            return;
          }
          setIsFocused(false);
        }}
      />
      {query.length > 0 && showDropdown && (
        <div
          className="dropDown"
          ref={dropdownRef}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className="search-bar-dropdown">
            <div className="dropdown">
              <div className="frame">
                {isLoading ? (
                  <DropSkeleton cards={4} />
                ) : noResultsFound ? ( // If noResultsFound is true, show 'No results found' message
                  <p>No results found.</p>
                ) : // show this while loading
                results.length > 0 ? (
                  results.map((result, index) => {
                    return (
                      <CityResults
                        result={result}
                        index={index}
                        key={result.searchable_id}
                        setQuery={setQuery}
                        setShowDropdown={setShowDropdown}
                        setSelectCity={setSelectCity}
                        setSelectedCityName={setSelectedCityName}
                        inputRef={inputRef}
                      />
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

SearchBar.defaultProps = {
  setIsFocused: () => {}, // A no-op function as a fallback
};

export default SearchBar;
