import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { format } from "date-fns";
import "./assets/styles/search.css";
import Modal from "react-modal";
import SearchBar from "./components/SearchBar";
import DatePicker from "react-datepicker";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import CustomInput from "./components/CustomInput";

Modal.setAppElement(document.getElementById("react-target"));

function App() {
  const [location, setLocation] = useState("");

  const handleDropdownChange = (e) => {
    setLocation(e.target.value);
  };

  const [checkInSelected, setCheckInSelected] = useState(false);
  const [checkOutSelected, setCheckOutSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inDate, setInDate] = useState(new Date());
  const [outDate, setOutDate] = useState(
    new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
  );
  const [isToday, setIsToday] = useState(true);
  const [checkInDate, setCheckInDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [checkOutDate, setCheckOutDate] = useState(
    format(new Date().getTime() + 1 * 24 * 60 * 60 * 1000, "yyyy-MM-dd")
  );

  const isSmallScreen = window.innerWidth <= 768;
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [selectedCityCords, setSelectedCityCords] = useState({
    neBoxLat: "",
    neBoxLng: "",
    swBoxLat: "",
    swBoxLng: "",
    long: "",
    lat: "",
    hLong: "",
    hLat: "",
  });
  const [selectedCityName, setSelectedCityName] = useState({
    cityName: "",
    stateName: "",
    countryName: "",
    hotelName: "",
    content: "",
    searchID: "",
  });
  const [selectedCity, setSelectedCity] = useState(null);
  // Log selectedCity to console

  const handleCitySelection = (city) => {
    setSelectedCity(city);
    // Here you can add your URL generation and redirection logic
  };

  useEffect(() => {}, [selectedCityName]);
  useEffect(() => {}, [selectedCityCords]);
  useEffect(() => {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    const NextDate = format(
      new Date().getTime() + 1 * 24 * 60 * 60 * 1000,
      "yyyy-MM-dd"
    );
    if (NextDate !== checkOutDate || currentDate !== checkInDate) {
      setShowPlaceholder(false);
      let checkInDateObj = new Date(checkInDate);
      let checkOutDateObj = new Date(checkOutDate);
      if (checkInDateObj.toDateString() === checkOutDateObj.toDateString()) {
        const newOutDate = new Date(checkInDateObj);
        newOutDate.setDate(newOutDate.getDate() + 1);
        setCheckOutDate(format(newOutDate, "yyyy-MM-dd"));
      }
      if (checkInDateObj.getTime() > checkOutDateObj.getTime()) {
        setCheckOutDate(format(new Date(checkInDateObj), "yyyy-MM-dd"));
        setCheckInDate(format(new Date(checkInDateObj), "yyyy-MM-dd"));
      }
    } else {
      setShowPlaceholder(true);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    console.log("In Date", inDate.toDateString());
    console.log("Out Date", outDate.toDateString());
    if (inDate.toDateString() === outDate.toDateString()) {
      const newOutDate = new Date(inDate);
      newOutDate.setDate(newOutDate.getDate() + 1);
      setOutDate(newOutDate);
    }
    if (inDate.getTime() > outDate.getTime()) {
      setOutDate(new Date(inDate + 1));
      setInDate(new Date(inDate));
    }
  }, [inDate, outDate]);
  const handleSearch = () => {
    let baseUrl = "";
    if (selectedCity && selectedCity.searchable_type === "City") {
      baseUrl = `https://theguestbook.com/destinations/guestbook?page=1&query%5Blocation%5D%5Btext%5D=${encodeURIComponent(
        selectedCityName.cityName
      )}%2C%20${encodeURIComponent(
        selectedCityName.stateName
      )}%2C%20${encodeURIComponent(
        selectedCityName.countryName
      )}&query%5Bproperty%5D%5Bcenter%5D%5B0%5D=${encodeURIComponent(
        selectedCityCords.lat
      )}&query%5Bproperty%5D%5Bcenter%5D%5B1%5D=${encodeURIComponent(
        selectedCityCords.long
      )}&stayDates%5BcheckinDate%5D=${format(
        inDate,
        "yyyy-MM-dd"
      )}&stayDates%5BcheckoutDate%5D=${format(outDate, "yyyy-MM-dd")}`;
    } else if (
      selectedCity &&
      selectedCity.searchable_type === "SearchPageHotels"
    ) {
      baseUrl = `https://theguestbook.com/destinations/guestbook/property_details?propertySelected=${selectedCityName.searchID}&stayDates%5BcheckinDate%5D=${inDate}&stayDates%5BcheckoutDate%5D=${outDate}`;
    } else if (selectedCity && selectedCity.searchable_type === "States") {
      baseUrl = `https://theguestbook.com/destinations/guestbook?page=1&stayDates%5BcheckinDate%5D=${format(
        inDate,
        "yyyy-MM-dd"
      )}&stayDates%5BcheckoutDate%5D=${format(
        outDate,
        "yyyy-MM-dd"
      )}&query%5Blocation%5D%5Btext%5D=${encodeURIComponent(
        selectedCityName.content
      )}&query%5Bproperty%5D%5Bcenter%5D%5B0%5D=${encodeURIComponent(
        selectedCityCords.lat
      )}&query%5Bproperty%5D%5Bcenter%5D%5B1%5D=${encodeURIComponent(
        selectedCityCords.long
      )}&query%5Bproperty%5D%5Btype%5D=States`;
    } else {
      baseUrl = `https://theguestbook.com/destinations/guestbook?page=1&query%5Blocation%5D%5Btext%5D=Las%20Vegas%2C%20Nevada%2C%20United%20States&query%5Blocation%5D%5Bcity%5D=North%20Las%20Vegas&query%5Blocation%5D%5Bstate%5D=Nevada&query%5Blocation%5D%5Bcountry%5D=Nevada&query%5Blocation%5D%5Bbbox%5D%5B0%5D=36.34886790273162&query%5Blocation%5D%5Bbbox%5D%5B1%5D=-114.84558105468751&query%5Blocation%5D%5Bbbox%5D%5B2%5D=35.90073127378863&query%5Blocation%5D%5Bbbox%5D%5B3%5D=-115.50476074218751&stayDates%5BcheckinDate%5D=${format(
        inDate,
        "yyyy-MM-dd"
      )}&stayDates%5BcheckoutDate%5D=${format(outDate, "yyyy-MM-dd")}`;
    }
    window.open(baseUrl, "_blank");
  };

  const handleMobileSearch = () => {
    let baseUrl = "";
    if (selectedCity && selectedCity.searchable_type === "City") {
      baseUrl = `https://theguestbook.com/destinations/guestbook?page=1&query%5Blocation%5D%5Btext%5D=${encodeURIComponent(
        selectedCityName.cityName
      )}%2C%20${encodeURIComponent(
        selectedCityName.stateName
      )}%2C%20${encodeURIComponent(
        selectedCityName.countryName
      )}&query%5Bproperty%5D%5Bcenter%5D%5B0%5D=${encodeURIComponent(
        selectedCityCords.lat
      )}&query%5Bproperty%5D%5Bcenter%5D%5B1%5D=${encodeURIComponent(
        selectedCityCords.long
      )}&stayDates%5BcheckinDate%5D=${checkInDate}&stayDates%5BcheckoutDate%5D=${checkOutDate}`;
    } else if (
      selectedCity &&
      selectedCity.searchable_type === "SearchPageHotels"
    ) {
      baseUrl = `https://theguestbook.com/destinations/guestbook/property_details?propertySelected=${selectedCityName.searchID}&stayDates%5BcheckinDate%5D=${checkInDate}&stayDates%5BcheckoutDate%5D=${checkOutDate}`;
    } else if (selectedCity && selectedCity.searchable_type === "States") {
      baseUrl = `https://theguestbook.com/destinations/guestbook?page=1&stayDates%5BcheckinDate%5D=${checkInDate}&stayDates%5BcheckoutDate%5D=${checkOutDate}&query%5Blocation%5D%5Btext%5D=${encodeURIComponent(
        selectedCityName.content
      )}&query%5Bproperty%5D%5Bcenter%5D%5B0%5D=${encodeURIComponent(
        selectedCityCords.lat
      )}&query%5Bproperty%5D%5Bcenter%5D%5B1%5D=${encodeURIComponent(
        selectedCityCords.long
      )}&query%5Bproperty%5D%5Btype%5D=States`;
    } else {
      baseUrl = `https://theguestbook.com/destinations/guestbook?page=1&query%5Blocation%5D%5Btext%5D=Las%20Vegas%2C%20Nevada%2C%20United%20States&query%5Blocation%5D%5Bcity%5D=North%20Las%20Vegas&query%5Blocation%5D%5Bstate%5D=Nevada&query%5Blocation%5D%5Bcountry%5D=Nevada&query%5Blocation%5D%5Bbbox%5D%5B0%5D=36.34886790273162&query%5Blocation%5D%5Bbbox%5D%5B1%5D=-114.84558105468751&query%5Blocation%5D%5Bbbox%5D%5B2%5D=35.90073127378863&query%5Blocation%5D%5Bbbox%5D%5B3%5D=-115.50476074218751&stayDates%5BcheckinDate%5D=${checkInDate}&stayDates%5BcheckoutDate%5D=${checkOutDate}`;
    }
    window.open(baseUrl, "_blank");
  };
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  useEffect(() => {
    if (isTouchDevice()) {
      Array.from(document.styleSheets).forEach((stylesheet) => {
        try {
          if (
            stylesheet.href === null ||
            stylesheet.href.startsWith(window.location.origin)
          ) {
            for (let i = stylesheet.cssRules.length - 1; i >= 0; i--) {
              let cssRule = stylesheet.cssRules[i];
              if (
                cssRule.selectorText &&
                cssRule.selectorText.includes(":hover")
              ) {
                stylesheet.deleteRule(i);
              }
            }
          }
        } catch (error) {
          console.error("Unable to modify stylesheet:", error);
        }
      });
    }
  }, []);

  return (
    // <div className="application_backgroud">
    <div className={`search_container ${isFocused ? "focused" : ""}`}>
      <div className="search_body big hide-tablet">
        <div className="search_content big">
          <div className="search_text-wrapper">
            <div className="search_headline">Location</div>
            <SearchBar
              setSelectedCityName={setSelectedCityName}
              setSelectedCityCords={setSelectedCityCords}
              onCitySelect={handleCitySelection}
            />
          </div>
          <div className="search_divider-wrapper hide-tablet">
            <div className="search_divider"></div>
          </div>
          <div className="search_text-wrapper hide-tablet">
            <div className="search_headline">Check in</div>
            <div>
              <DatePicker
                onChange={(date) => {
                  setInDate(date);
                  setCheckInSelected(true);
                  setIsToday(false);
                }}
                minDate={new Date()}
                showDisabledMonthNavigation
                selected={inDate}
                value={
                  checkInSelected || checkOutSelected
                    ? format(inDate, "yyyy-MM-dd")
                    : "Today"
                }
                className={`placeholder-font ${
                  isToday ? "placeholder-font" : "placeholder-selected"
                }`}
              />
            </div>
          </div>
          <div className="search_divider-wrapper hide-tablet">
            <div className="search_divider"></div>
          </div>
          <div className="search_text-wrapper hide-tablet">
            <div className="search_headline">Check out</div>
            <div>
              <DatePicker
                selected={outDate}
                minDate={inDate || format(new Date(), "yyyy-MM-dd")}
                onChange={(date) => {
                  setOutDate(date);
                  setCheckOutSelected(true);
                  setIsToday(false);
                }}
                value={
                  checkInSelected || checkOutSelected
                    ? format(outDate, "yyyy-MM-dd")
                    : "Tomorrow"
                }
                className={`placeholder-font ${
                  isToday ? "placeholder-font" : "placeholder-selected"
                }`}
              />
            </div>
          </div>
          <div className="search_content show-tablet">
            <div className="search_divider-wrapper-horizontal">
              <div className="search_divider-horizontal"></div>
            </div>
            <div className="div-block-7">
              <div className="search_text-wrapper tablet">
                <div className="search_headline">Check in</div>
                {showPlaceholder && (
                  <span id="inputPlace" className="inputPlaceholder">
                    Today
                  </span>
                )}
                <input
                  className="inputDate hide-date-icon inputDatePadding nativeInputFont"
                  id="datein "
                  type="date"
                  min={format(new Date(), "yyyy-MM-dd")}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
              <div className="search_divider-wrapper">
                <div className="search_divider"></div>
              </div>
              <div className="search_text-wrapper tablet">
                <div className="search_headline">Check out</div>
                {showPlaceholder && (
                  <span id="inputPlace" className="inputPlaceholder">
                    Tomorrow
                  </span>
                )}
                <input
                  id="dateOut"
                  type="date"
                  className="inputDate hide-date-icon inputDatePadding nativeInputFont"
                  value={checkOutDate}
                  min={checkInDate || format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <a href="#" onClick={handleSearch} className="search_icon">
          <div className="search_icon-wrap">
            <svg
              className="search_arrow"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.7075 16.7075L18.7075 25.7075C18.5199 25.8951 18.2654 26.0006 18 26.0006C17.7346 26.0006 17.4801 25.8951 17.2925 25.7075C17.1049 25.5199 16.9994 25.2654 16.9994 25C16.9994 24.7346 17.1049 24.4801 17.2925 24.2925L24.5863 17H5C4.73478 17 4.48043 16.8947 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16C4 15.7348 4.10536 15.4804 4.29289 15.2929C4.48043 15.1054 4.73478 15 5 15H24.5863L17.2925 7.70751C17.1049 7.51987 16.9994 7.26537 16.9994 7.00001C16.9994 6.73464 17.1049 6.48015 17.2925 6.29251C17.4801 6.10487 17.7346 5.99945 18 5.99945C18.2654 5.99945 18.5199 6.10487 18.7075 6.29251L27.7075 15.2925C27.8005 15.3854 27.8742 15.4957 27.9246 15.6171C27.9749 15.7385 28.0008 15.8686 28.0008 16C28.0008 16.1314 27.9749 16.2615 27.9246 16.3829C27.8742 16.5043 27.8005 16.6146 27.7075 16.7075Z"
                fill="white"
              />
            </svg>
          </div>
        </a>
        <div className="search_button-wrapper show-tablet">
          <a href="#" onClick={handleMobileSearch} className="search_button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.85">
                <path
                  opacity="0.2"
                  d="M18 10.5C18 11.9834 17.5601 13.4334 16.736 14.6668C15.9119 15.9001 14.7406 16.8614 13.3701 17.4291C11.9997 17.9968 10.4917 18.1453 9.03683 17.8559C7.58197 17.5665 6.2456 16.8522 5.1967 15.8033C4.14781 14.7544 3.4335 13.418 3.14411 11.9632C2.85472 10.5083 3.00325 9.00032 3.57091 7.62987C4.13856 6.25943 5.09986 5.08809 6.33323 4.26398C7.5666 3.43987 9.01664 3 10.5 3C11.4849 3 12.4602 3.19399 13.3701 3.5709C14.2801 3.94781 15.1069 4.50026 15.8033 5.1967C16.4997 5.89314 17.0522 6.71993 17.4291 7.62987C17.806 8.53982 18 9.51509 18 10.5Z"
                  fill="white"
                />
                <path
                  d="M21.5306 20.4694L16.8375 15.7762C18.2004 14.1416 18.8807 12.0445 18.7368 9.92113C18.5928 7.79774 17.6358 5.81159 16.0648 4.37586C14.4937 2.94013 12.4296 2.16536 10.3019 2.21275C8.17416 2.26013 6.1466 3.12601 4.64103 4.63025C3.13546 6.13449 2.26779 8.16128 2.21853 10.289C2.16926 12.4167 2.9422 14.4814 4.37654 16.0537C5.81088 17.626 7.79619 18.5848 9.91945 18.7306C12.0427 18.8764 14.1404 18.198 15.7762 16.8366L20.4694 21.5306C20.5391 21.6003 20.6218 21.6556 20.7128 21.6933C20.8039 21.731 20.9015 21.7504 21 21.7504C21.0985 21.7504 21.1961 21.731 21.2872 21.6933C21.3782 21.6556 21.4609 21.6003 21.5306 21.5306C21.6003 21.4609 21.6556 21.3782 21.6933 21.2872C21.731 21.1961 21.7504 21.0985 21.7504 21C21.7504 20.9015 21.731 20.8039 21.6933 20.7128C21.6556 20.6218 21.6003 20.5391 21.5306 20.4694ZM3.75 10.5C3.75 9.16497 4.14588 7.85993 4.88758 6.7499C5.62928 5.63987 6.68348 4.7747 7.91689 4.26381C9.15029 3.75292 10.5075 3.61925 11.8169 3.8797C13.1262 4.14015 14.329 4.78302 15.273 5.72703C16.217 6.67103 16.8598 7.87377 17.1203 9.18314C17.3808 10.4925 17.2471 11.8497 16.7362 13.0831C16.2253 14.3165 15.3601 15.3707 14.2501 16.1124C13.1401 16.8541 11.835 17.25 10.5 17.25C8.7104 17.248 6.99466 16.5362 5.72922 15.2708C4.46378 14.0053 3.75198 12.2896 3.75 10.5Z"
                  fill="white"
                />
              </g>
            </svg>

            <div className="button_link">Search hotel deals</div>
          </a>
        </div>
      </div>
      <div className="search_body-tablet homepage">
        <div className="search_text-wrapper">
          <div className="search_headline">Location</div>
          <div className="inputText">
            <SearchBar
              setSelectedCityName={setSelectedCityName}
              setSelectedCityCords={setSelectedCityCords}
              onCitySelect={handleCitySelection}
              setIsFocused={setIsFocused}
            />
          </div>
          {/* <LocationSearchInput /> */}
        </div>
        <div className="search_content">
          <div className="search_divider-wrapper-horizontal">
            <div className="search_divider-horizontal"></div>
          </div>
          <div className="div-block-7">
            <div className="search_text-wrapper tablet">
              <div className="search_headline">Check in</div>
              {showPlaceholder && (
                <span id="inputPlace" className="inputPlaceholder">
                  Today
                </span>
              )}
              <input
                className="inputDate hide-date-icon inputDatePadding nativeInputFont"
                id="datein"
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className="search_divider-wrapper">
              <div className="search_divider"></div>
            </div>
            <div className="search_text-wrapper tablet">
              <div className="search_headline">Check out</div>
              {showPlaceholder && (
                <span id="inputPlace" className="inputPlaceholder">
                  Tomorrow
                </span>
              )}
              <input
                id="dateOut"
                type="date"
                className="inputDate hide-date-icon inputDatePadding nativeInputFont"
                value={checkOutDate}
                min={checkInDate || format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <a href="#" onClick={handleSearch} className="search_icon ">
          <div className="search_icon-wrap">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="search_arrow"
            >
              <path
                d="M27.7075 16.7075L18.7075 25.7075C18.5199 25.8951 18.2654 26.0006 18 26.0006C17.7346 26.0006 17.4801 25.8951 17.2925 25.7075C17.1049 25.5199 16.9994 25.2654 16.9994 25C16.9994 24.7346 17.1049 24.4801 17.2925 24.2925L24.5863 17H5C4.73478 17 4.48043 16.8947 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16C4 15.7348 4.10536 15.4804 4.29289 15.2929C4.48043 15.1054 4.73478 15 5 15H24.5863L17.2925 7.70751C17.1049 7.51987 16.9994 7.26537 16.9994 7.00001C16.9994 6.73464 17.1049 6.48015 17.2925 6.29251C17.4801 6.10487 17.7346 5.99945 18 5.99945C18.2654 5.99945 18.5199 6.10487 18.7075 6.29251L27.7075 15.2925C27.8005 15.3854 27.8742 15.4957 27.9246 15.6171C27.9749 15.7385 28.0008 15.8686 28.0008 16C28.0008 16.1314 27.9749 16.2615 27.9246 16.3829C27.8742 16.5043 27.8005 16.6146 27.7075 16.7075Z"
                fill="white"
              />
            </svg>
          </div>
        </a>
      </div>
      <div className="search_button-wrapper show-tablet">
        <a href="#" onClick={handleMobileSearch} className="search_button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.85">
              <path
                opacity="0.2"
                d="M18 10.5C18 11.9834 17.5601 13.4334 16.736 14.6668C15.9119 15.9001 14.7406 16.8614 13.3701 17.4291C11.9997 17.9968 10.4917 18.1453 9.03683 17.8559C7.58197 17.5665 6.2456 16.8522 5.1967 15.8033C4.14781 14.7544 3.4335 13.418 3.14411 11.9632C2.85472 10.5083 3.00325 9.00032 3.57091 7.62987C4.13856 6.25943 5.09986 5.08809 6.33323 4.26398C7.5666 3.43987 9.01664 3 10.5 3C11.4849 3 12.4602 3.19399 13.3701 3.5709C14.2801 3.94781 15.1069 4.50026 15.8033 5.1967C16.4997 5.89314 17.0522 6.71993 17.4291 7.62987C17.806 8.53982 18 9.51509 18 10.5Z"
                fill="white"
              />
              <path
                d="M21.5306 20.4694L16.8375 15.7762C18.2004 14.1416 18.8807 12.0445 18.7368 9.92113C18.5928 7.79774 17.6358 5.81159 16.0648 4.37586C14.4937 2.94013 12.4296 2.16536 10.3019 2.21275C8.17416 2.26013 6.1466 3.12601 4.64103 4.63025C3.13546 6.13449 2.26779 8.16128 2.21853 10.289C2.16926 12.4167 2.9422 14.4814 4.37654 16.0537C5.81088 17.626 7.79619 18.5848 9.91945 18.7306C12.0427 18.8764 14.1404 18.198 15.7762 16.8366L20.4694 21.5306C20.5391 21.6003 20.6218 21.6556 20.7128 21.6933C20.8039 21.731 20.9015 21.7504 21 21.7504C21.0985 21.7504 21.1961 21.731 21.2872 21.6933C21.3782 21.6556 21.4609 21.6003 21.5306 21.5306C21.6003 21.4609 21.6556 21.3782 21.6933 21.2872C21.731 21.1961 21.7504 21.0985 21.7504 21C21.7504 20.9015 21.731 20.8039 21.6933 20.7128C21.6556 20.6218 21.6003 20.5391 21.5306 20.4694ZM3.75 10.5C3.75 9.16497 4.14588 7.85993 4.88758 6.7499C5.62928 5.63987 6.68348 4.7747 7.91689 4.26381C9.15029 3.75292 10.5075 3.61925 11.8169 3.8797C13.1262 4.14015 14.329 4.78302 15.273 5.72703C16.217 6.67103 16.8598 7.87377 17.1203 9.18314C17.3808 10.4925 17.2471 11.8497 16.7362 13.0831C16.2253 14.3165 15.3601 15.3707 14.2501 16.1124C13.1401 16.8541 11.835 17.25 10.5 17.25C8.7104 17.248 6.99466 16.5362 5.72922 15.2708C4.46378 14.0053 3.75198 12.2896 3.75 10.5Z"
                fill="white"
              />
            </g>
          </svg>
          <div className="button_link">Search hotel deals</div>
        </a>
      </div>
    </div>
    // </div>
  );
}

// import { createRoot } from "react-dom/client";
// const container = document.getElementById("react-target");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);
ReactDOM.render(
  <React.StrictMode>
    <App tab="home" />
  </React.StrictMode>,
  document.getElementById("react-target")
);
reportWebVitals();
