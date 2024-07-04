import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./CityPicker.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function CityPicker({ setCity }) {
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);
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

  useEffect(() => {
    fetch("https://skyclub-server.vercel.app/api/places/place")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched places:", data);
        setPlaces(data);
      })
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  }, []);

  const handleCitySelection = (location) => {
    console.log("Selected location:", location);
    setCity(location); // Assuming `setCity` updates state or context with the selected location
    setSearchTerm("");
    searchInputRef.current.blur();
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const placesToShow = places.slice(0, 6);

  return (
    <>
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
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2023603.398518402!2d79.38682834494365!3d7.858350394202677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1720006081149!5m2!1sen!2slk"
          width="800"
          height="400"
          style={{ border: "0", borderRadius: "16px", marginTop: "20px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="city-list-wrapper">
        <h1 className="city-list-title">Popular Destinations</h1>
        <div className="city-list-suggestion">
          {placesToShow.map((place) => {
            const imagePath = `/images/${place.image}`;
            return (
              <div
                key={place._id}
                className="city-item"
                onClick={() => handleCitySelection(place.city)} // Ensure it passes the correct identifier
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to="/days"
                  onClick={() => handleCitySelection(place.city)}
                >
                  <div className="city-item-inner">
                    <img
                      src={imagePath}
                      alt={place.name}
                      onError={(e) => {
                        console.error(`Failed to load image: ${imagePath}`);
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="city-name">
                      <p>{place.city}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CityPicker;
