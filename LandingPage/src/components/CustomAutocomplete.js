import React, { useEffect, useRef, useState } from "react";

function CustomAutocomplete() {
  const autocompleteInputRef = useRef(null);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    loadGoogleScript();
  }, []);

  const loadGoogleScript = () => {
    // Check if the Google script is already loaded
    if (document.getElementById("google-places-script")) {
      return;
    }

    const googleScript = document.createElement("script");
    googleScript.id = "google-places-script";
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzDN4Xj1kqGW6T4klbbqHktFEnRc3IVJ0&libraries=places`;
    googleScript.async = true;
    googleScript.onload = initAutocomplete; // Once the script is loaded, initialise the Autocomplete
    window.document.body.appendChild(googleScript);
  };

  const initAutocomplete = () => {
    if (!window.google) {
      console.error("Google Places library is not loaded!");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      {
        types: ["(cities)"],
        componentRestrictions: { country: "us" },
      }
    );

    autocomplete.setFields(["formatted_address"]);

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      setPlace(selectedPlace);
    });
  };

  return (
    <div>
      <input ref={autocompleteInputRef} type="text" />
      <div>
        {place && (
          <>
            {/* <h3>{place.name}</h3> */}
            <p>{place.formatted_address}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomAutocomplete;
