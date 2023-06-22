import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 43.6532,
  lng: -79.3832,
};

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      bounds: null,
      searchValue: "",
      suggestions: [],
    };
    this.searchService = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 200 * 1000,
      },
    });
    this.onLoad = this.onLoad.bind(this);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
  }

  onLoad(map) {
    this.setState({ map });
    this.setState({ bounds: map.getBounds().toJSON() });
  }

  async onPlacesChanged(address) {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      this.state.map.setCenter({ lat, lng });
      this.setState({ bounds: this.state.map.getBounds().toJSON() });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
        <Combobox onSelect={this.onPlacesChanged}>
          <ComboboxInput
            value={this.state.searchValue}
            onChange={(e) => this.setState({ searchValue: e.target.value })}
            placeholder="Enter an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {this.state.suggestions.length > 0 &&
                this.state.suggestions.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          onLoad={this.onLoad}
        />
      </LoadScript>
    );
  }
}

export default MapComponent;
