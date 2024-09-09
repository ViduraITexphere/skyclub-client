import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import "./AttractionPicker.css";
import ImageStrip from "./ImageStrip";

const attractionsList = [
  "hiking",
  "photography",
  "cultural tours",
  "sightseeing",
  "meditation",
  "prayer",
  "nature walks",
  "bird watching",
  "wildlife photography",
  "safari",
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AttractionPicker({ onSubmit }) {
  const [city, setCity] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [peopleCount, setPeopleCount] = useState(1);
  const [peopleNames, setPeopleNames] = useState("Solo");
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [itinerary, setItinerary] = useState(null); // State to store itinerary response
  const query = useQuery();

  useEffect(() => {
    const cityParam = query.get("city") || "Dambulla";
    const totalDaysParam = parseInt(query.get("totalDays"), 10) || 3;
    const peopleCountParam = parseInt(query.get("peopleCount"), 10) || 1;
    const peopleNamesParam = query.get("peopleName") || "Solo";
    setCity(cityParam);
    setTotalDays(totalDaysParam);
    setPeopleCount(peopleCountParam);
    setPeopleNames(peopleNamesParam);
  }, [query]);

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

  const handleSubmit = () => {
    const dataToSend = {
      city: city,
      totalDays: totalDays,
      attractions: selectedAttractions,
      peopleCount: peopleCount,
      peopleNames: peopleNames,
    };

    console.log("Final Object:", dataToSend);
    onSubmit(dataToSend);
  };

  return (
    <div>
      <ProgressBar
        animated
        now={100}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "10",
          borderRadius: "0",
          height: "5px",
        }}
      />
      <ImageStrip />
      <div
        className="container"
        style={{
          marginTop: "150px",
        }}
      >
        <h1
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
          }}
        >
          Select Attractions for {city}
        </h1>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "400",
          }}
        >
          Choose as many as you’d like.
        </p>
        <div className="attraction-list">
          {attractionsList.map((attraction, index) => (
            <div
              key={index}
              className={`attraction-item ${
                isSelected(attraction) ? "selected" : ""
              }`}
              onClick={() => toggleAttraction(attraction)}
            >
              {attraction}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
            padding: "0 20px",
          }}
        >
          <Link to="/days">
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#000",
                fontWeight: "500",
              }}
            >
              Back
            </Button>
          </Link>
          <Link
            to={{
              pathname: "/itinerary",
            }}
          >
            <Button
              variant="dark"
              style={{
                backgroundColor: "#000",
                fontWeight: "bold",
                padding: "10px 60px",
                borderRadius: "50px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AttractionPicker;
