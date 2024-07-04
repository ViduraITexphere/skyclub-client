import React, { useState } from "react";
import "./AttractionPicker.css";

function PopularActivities() {
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const attractionsList = [
    "hiking",
    "photography",
    "cultural tours",
    "sightseeing",
    "meditation",
    "safari",
    "prayer",
    "nature walks",
    "bird watching",
    "wildlife photography",
    "walking tours",
    "elephant feeding",
    "elephant bathing",
    "pilgrimage",
    "exhibitions",
    "guided tours",
    "educational",
    "watching cricket",
    "stadium tours",
    "events",
  ];

  const images = {
    hiking: "/images/hiking.jpg",
    photography: "/images/photography.jpg",
    "cultural tours": "/images/cultural_tours.jpg",
    sightseeing: "/images/sightseeing.jpg",
    meditation: "/images/meditation.jpg",
    safari: "/images/safari.jpg",
  };

  const toggleAttraction = (attraction) => {
    setSelectedAttractions((prevSelected) => {
      if (prevSelected.includes(attraction)) {
        return prevSelected.filter((item) => item !== attraction);
      } else {
        return [...prevSelected, attraction];
      }
    });
  };

  const isSelected = (attraction) => {
    return selectedAttractions.includes(attraction);
  };

  const displayedAttractions = showAll
    ? attractionsList
    : attractionsList.slice(0, 6);

  return (
    <div>
      <h1 className="city-list-title">Popular Activities</h1>
      <div className="activity-list">
        {displayedAttractions.map((attraction, index) => (
          <div
            key={index}
            className={`activity-item ${
              isSelected(attraction) ? "selected" : ""
            }`}
            onClick={() => toggleAttraction(attraction)}
          >
            <div className="attraction-overlay">
              <img
                src={images[attraction]}
                alt={attraction}
                className="activity-image"
              />
              <span>{attraction}</span>
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <button className="show_more" onClick={() => setShowAll(true)}>
          Show More
        </button>
      )}
      {showAll && (
        <button className="show_more" onClick={() => setShowAll(false)}>
          Show Less
        </button>
      )}
    </div>
  );
}

export default PopularActivities;
