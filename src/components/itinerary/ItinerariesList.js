import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ItinerariesList.css";

function ItinerariesList() {
  const [itineraries, setItineraries] = useState([]);
  const googleId = localStorage.getItem("googleId");
  const navigate = useNavigate();

  useEffect(() => {
    if (googleId) {
      fetch("https://skyclub-server-new.vercel.app/api/itinerary/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ googleId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched itineraries:", data);
          setItineraries(data);
        })
        .catch((error) => {
          console.error("Error fetching itineraries:", error);
        });
    }
  }, [googleId]);

  const handleItineraryClick = (itineraryId) => {
    navigate(`/quote/${itineraryId}`);
  };

  if (itineraries.length === 0) {
    return <p>No itineraries available.</p>;
  }

  return (
    <div className="itineraries-list-container">
      <h1 className="itineraries-list-title">Your Itineraries</h1>
      <div className="itineraries-list">
        {itineraries.map((itinerary) => {
          // Ensure itinerary and itinerary.itinerary are defined and non-empty
          const firstDay = itinerary.itinerary && itinerary.itinerary.length > 0 ? itinerary.itinerary[0] : null;
          const city = firstDay && firstDay.places && firstDay.places.length > 0
            ? firstDay.places[0].city
            : "Unknown City";
          const numberOfDays = itinerary.itinerary ? itinerary.itinerary.length : 0;

          return (
            <div
              key={itinerary._id}
              className="itinerary-card"
              onClick={() => handleItineraryClick(itinerary._id)}
            >
              <h2 className="itinerary-title">
                Your Trip is in {city} for {numberOfDays} days
              </h2>
              <button className="view-quote-button">View Quote</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItinerariesList;
