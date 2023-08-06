import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
const CityResults = ({
  result,
  setQuery,
  setShowDropdown,
  setSelectCity,
  setSelectedCityName,
  index,
}) => {
  console.log("New Component", result.searchable_type);
  const [hoverIndex, setHoverIndex] = useState(-1); // new state
  const [activeIndex, setActiveIndex] = useState(-1);
  const hotelIcon =
    "https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/64bfab922cc46c71a5af0e74_hotel.svg";
  const cityIcon =
    "https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/64b420a332dbf85fa5a2b6a9_Icon.svg";
  const hotelHoverIcon =
    "https://uploads-ssl.webflow.com/64c0d745032daeee059a783c/64c0d745032daeee059a7a06_hotelHover.svg";
  const cityHoverIcon =
    "https://uploads-ssl.webflow.com/645a6f68de0f1a36cccdbead/64b5763404f2fbab0d8ec588_hoverLocation.svg";

  const onClickHandler = () => {
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
      content: result.content,
      searchID: result.searchable_id,
    });
  };

  const label = result.hotel_name
    ? result.hotel_name
    : result.city_name
    ? result.city_name
    : result.state_name;
  const source =
    activeIndex === index
      ? result.hotel_name
        ? hotelHoverIcon
        : cityHoverIcon
      : hoverIndex === index
      ? result.hotel_name
        ? hotelHoverIcon
        : cityHoverIcon
      : result.hotel_name
      ? hotelIcon
      : cityIcon;
  //   const caption =
  //     result.state_name && result.country_name
  //       ? `${result.state_name}, ${result.country_name}`
  //       : "";

  const getCaption = (result) => {
    if (result.searchable_type === "City") {
      if (!result.country_name) {
        return "";
      } else if (!result.state_name && result.country_name) {
        return `${result.city_name}, ${result.country_name}`;
      } else if (result.state_name && result.country_name) {
        return `${result.state_name}, ${result.country_name}`;
      }
    }
    if (result.searchable_type === "SearchPageHotels") {
      if (!result.country_name) {
        return "";
      } else if (
        !result.state_name &&
        result.city_name &&
        result.country_name
      ) {
        return `${result.city_name}, ${result.country_name}`;
      } else if (result.state_name && result.country_name && result.city_name) {
        return `${result.city_name}, ${result.state_name}, ${result.country_name}`;
      }
    }
    if (result.searchable_type === "States") {
      if (!result.country_name) {
        return "";
      } else if (result.state_name && result.country_name) {
        return `${result.country_name}`;
      }
    }
  };

  return (
    <div className="active">
      <div
        className="list-item"
        onMouseEnter={() => setHoverIndex(index)} // set index on hover
        onMouseLeave={() => setHoverIndex(-1)} // reset index on mouse leave
        onTouchStart={() => setActiveIndex(index)}
        onTouchEnd={() => setActiveIndex(-1)} // add this line
      >
        <div className="frame2" onClick={onClickHandler}>
          <div className="label">{label}</div>
          <div className="caption"> {getCaption(result)}</div>
        </div>
        <img className="icon" src={source} alt="" />
      </div>
    </div>
  );
};

export default CityResults;
