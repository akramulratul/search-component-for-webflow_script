import React, { useState, Component, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { format } from "date-fns";
Modal.setAppElement(document.getElementById("react-target"));
import "./assets/styles/search.css";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
Modal.setAppElement(document.getElementById("react-target"));

function App() {
  const [checkInSelected, setCheckInSelected] = useState(false);
  const [checkOutSelected, setCheckOutSelected] = useState(false);
  const [inDate, setInDate] = useState(new Date(), "yyyy-MM-dd");
  const [outDate, setOutDate] = useState(
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    "yyyy-MM-dd"
  );
  const isSmallScreen = window.innerWidth <= 768;
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  console.log("In Date", inDate);
  console.log("OUT Date", outDate);
  const handleSearch = () => {
    const encodedLocation = encodeURIComponent(location);
    console.log(encodedLocation);
    const url = `https://joingopher.com/destinations/guestbook?page=1&query%5Bproperty%5D%5Btext%5D=Las%20Vegas%2C%20Nevada%2C%20United%20States&query%5Bproperty%5D%5Bcity%5D=${encodedLocation}&query%5Bproperty%5D%5Bstate%5D=Nevada&query%5Bproperty%5D%5Bcountry%5D=United%20States&query%5Bproperty%5D%5Bid%5D=22416&query%5Bproperty%5D%5Btype%5D=City&query%5Bproperty%5D%5Bcenter%5D%5B0%5D=36.17497&query%5Bproperty%5D%5Bcenter%5D%5B1%5D=-115.13722&stayDates%5BcheckinDate%5D=${inDate}&stayDates%5BcheckoutDate%5D=${outDate}`;
    window.open(url, "_blank");
  };
  return (
    // <div className="application_backgroud">
      <div className="search-component">
        <div className="search-field">
          <div className="search-details">
            <div className="input-item first-input">
              <label className="title-text">Check-in</label>
              <DatePicker
                // onClick={() => }
                minDate={new Date()}
                showDisabledMonthNavigation
                selected={inDate}
                className="placeholder-font"
                // onSelect={inDate}
                onChange={(date) => {
                  setInDate(date), setCheckInSelected(true);
                }}
                value={checkInSelected ? inDate : "Today"}
              />
            </div>
            <div className="input-item middle-input">
              <label className="title-text">Check-out</label>
              <div className="placeholder-font">
                <DatePicker
                  selected={outDate}
                  onChange={(date) => {
                    setOutDate(date), setCheckOutSelected(true);
                  }}
                  className="placeholder-font"
                  value={checkOutSelected ? outDate : "Next Week"}
                  // onClick={() => setCheckOutSelected(true)}
                  // onChange={setOutDate}
                />
              </div>
            </div>
            <div className=" last-button">
              {isSmallScreen ? (
                <button onClick={handleSearch} className="mobile-button">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      d="M18 10.5C18 11.9834 17.5601 13.4334 16.736 14.6668C15.9119 15.9001 14.7406 16.8614 13.3701 17.4291C11.9997 17.9968 10.4917 18.1453 9.03683 17.8559C7.58197 17.5665 6.2456 16.8522 5.1967 15.8033C4.14781 14.7544 3.4335 13.418 3.14411 11.9632C2.85472 10.5083 3.00325 9.00032 3.57091 7.62987C4.13856 6.25943 5.09986 5.08809 6.33323 4.26398C7.5666 3.43987 9.01664 3 10.5 3C11.4849 3 12.4602 3.19399 13.3701 3.5709C14.2801 3.94781 15.1069 4.50026 15.8033 5.1967C16.4997 5.89314 17.0522 6.71993 17.4291 7.62987C17.806 8.53982 18 9.51509 18 10.5Z"
                      fill="white"
                    />
                    <path
                      d="M21.5306 20.4694L16.8375 15.7762C18.2004 14.1416 18.8807 12.0445 18.7368 9.92113C18.5928 7.79774 17.6358 5.81159 16.0648 4.37586C14.4937 2.94013 12.4296 2.16536 10.3019 2.21275C8.17416 2.26013 6.1466 3.12601 4.64103 4.63025C3.13546 6.13449 2.26779 8.16128 2.21853 10.289C2.16926 12.4167 2.9422 14.4814 4.37654 16.0537C5.81088 17.626 7.79619 18.5848 9.91945 18.7306C12.0427 18.8764 14.1404 18.198 15.7762 16.8366L20.4694 21.5306C20.5391 21.6003 20.6218 21.6556 20.7128 21.6933C20.8039 21.731 20.9015 21.7504 21 21.7504C21.0985 21.7504 21.1961 21.731 21.2872 21.6933C21.3782 21.6556 21.4609 21.6003 21.5306 21.5306C21.6003 21.4609 21.6556 21.3782 21.6933 21.2872C21.731 21.1961 21.7504 21.0985 21.7504 21C21.7504 20.9015 21.731 20.8039 21.6933 20.7128C21.6556 20.6218 21.6003 20.5391 21.5306 20.4694ZM3.75 10.5C3.75 9.16497 4.14588 7.85993 4.88758 6.7499C5.62928 5.63987 6.68348 4.7747 7.91688 4.26381C9.15029 3.75292 10.5075 3.61925 11.8169 3.8797C13.1262 4.14015 14.329 4.78302 15.273 5.72703C16.217 6.67103 16.8598 7.87377 17.1203 9.18314C17.3807 10.4925 17.2471 11.8497 16.7362 13.0831C16.2253 14.3165 15.3601 15.3707 14.2501 16.1124C13.1401 16.8541 11.835 17.25 10.5 17.25C8.7104 17.248 6.99466 16.5362 5.72922 15.2708C4.46378 14.0053 3.75198 12.2896 3.75 10.5Z"
                      fill="white"
                    />
                  </svg>
                  Search hotel deals
                </button>
              ) : (
                // <button onClick={handleSearch} className="btn">
                //   <svg
                //     width="25"
                //     height="20"
                //     viewBox="0 0 25 20"
                //     fill="none"
                //     xmlns="http://www.w3.org/2000/svg"
                //   >
                //     <path
                //       d="M23.7983 10.7075L14.7983 19.7075C14.6107 19.8951 14.3562 20.0006 14.0908 20.0006C13.8255 20.0006 13.571 19.8951 13.3833 19.7075C13.1957 19.5199 13.0903 19.2654 13.0903 19C13.0903 18.7346 13.1957 18.4801 13.3833 18.2925L20.6771 11H1.09082C0.825604 11 0.57125 10.8947 0.383714 10.7071C0.196177 10.5196 0.0908203 10.2652 0.0908203 10C0.0908203 9.73479 0.196177 9.48044 0.383714 9.2929C0.57125 9.10536 0.825604 9.00001 1.09082 9.00001H20.6771L13.3833 1.70751C13.1957 1.51987 13.0903 1.26537 13.0903 1.00001C13.0903 0.734643 13.1957 0.480147 13.3833 0.292507C13.571 0.104866 13.8255 -0.000549316 14.0908 -0.000549316C14.3562 -0.000549316 14.6107 0.104866 14.7983 0.292507L23.7983 9.29251C23.8913 9.38538 23.9651 9.49567 24.0154 9.61707C24.0657 9.73846 24.0916 9.86859 24.0916 10C24.0916 10.1314 24.0657 10.2615 24.0154 10.3829C23.9651 10.5043 23.8913 10.6146 23.7983 10.7075Z"
                //       fill="white"
                //     />
                //   </svg>
                // </button>
                <a
                  id="w-node-_311d26e7-ecf6-6790-258f-60095d6dc1d1-27ef0823"
                  href="#"
                  class="search_icon w-inline-block"
                  onClick={handleSearch}
                >
                  <div class="search_icon-wrap">
                    <svg
                      width="25"
                      height="20"
                      viewBox="0 0 25 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.7983 10.7075L14.7983 19.7075C14.6107 19.8951 14.3562 20.0006 14.0908 20.0006C13.8255 20.0006 13.571 19.8951 13.3833 19.7075C13.1957 19.5199 13.0903 19.2654 13.0903 19C13.0903 18.7346 13.1957 18.4801 13.3833 18.2925L20.6771 11H1.09082C0.825604 11 0.57125 10.8947 0.383714 10.7071C0.196177 10.5196 0.0908203 10.2652 0.0908203 10C0.0908203 9.73479 0.196177 9.48044 0.383714 9.2929C0.57125 9.10536 0.825604 9.00001 1.09082 9.00001H20.6771L13.3833 1.70751C13.1957 1.51987 13.0903 1.26537 13.0903 1.00001C13.0903 0.734643 13.1957 0.480147 13.3833 0.292507C13.571 0.104866 13.8255 -0.000549316 14.0908 -0.000549316C14.3562 -0.000549316 14.6107 0.104866 14.7983 0.292507L23.7983 9.29251C23.8913 9.38538 23.9651 9.49567 24.0154 9.61707C24.0657 9.73846 24.0916 9.86859 24.0916 10C24.0916 10.1314 24.0657 10.2615 24.0154 10.3829C23.9651 10.5043 23.8913 10.6146 23.7983 10.7075Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById("react-target")
);
reportWebVitals();
