import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function MyPlacesAutocomplete({ setLocation }) {
  return (
    <GooglePlacesAutocomplete
      onSelect={(selected) => setLocation(selected.description)}
      placeholder="Search for a place"
    />
  );
}

export default MyPlacesAutocomplete;
