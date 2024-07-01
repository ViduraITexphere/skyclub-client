import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./CityPicker.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function CityPicker({ setCity }) {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetch("https://skyclub-server.vercel.app/api/places/cities")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched cities:", data);
        setCities(data);
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);

  const handleCitySelection = (city) => {
    console.log("Selected city:", city);
    setCity(city);
    setSearchTerm("");
    searchInputRef.current.blur();
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="city-picker-container">
      <ProgressBar
        animated
        now={33.33}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "1000",
          borderRadius: "0",
          height: "8px",
        }}
      />
      <h2>Where do you want to go?</h2>
      <input
        className="city-picker-input"
        type="text"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ref={searchInputRef}
      />
      {searchTerm && (
        <ul className="city-dropdown">
          {filteredCities.map((city) => (
            <li key={city} className="city-list">
              <Link to="/days" onClick={() => handleCitySelection(city)}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" />
                {city}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CityPicker;
