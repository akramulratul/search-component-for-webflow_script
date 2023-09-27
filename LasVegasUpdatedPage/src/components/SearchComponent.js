import React, { useState } from "react";
import axios from "axios"; // We use axios to make HTTP requests

const SearchComponent = () => {
  const [query, setQuery] = useState(""); // Initialize state for the search query
  const [results, setResults] = useState([]); // Initialize state for the results

  // Function that handles the search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Make a GET request to the API
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://joingopher.com/en/api/v1/search/typeahead?search_page_id=12&query=${query}`
      );
      // Set the results in state
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function that handles changes in the search input
  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length >= 3) {
      // Only search when the query length is at least 3
      handleSearch(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {results.map((result, index) => (
        <div key={index}>
          <p>{result.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchComponent;
