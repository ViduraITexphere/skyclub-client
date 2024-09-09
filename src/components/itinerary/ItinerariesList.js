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
    return (
      <div className="err-msg">
        <p>No itineraries available.</p>
      </div>
    );
  }

  return (
    <div className="container-wrapper">
      <h1 className="itineraries-list-title">Your Itineraries</h1>
      <p>
        Here are the itineraries you have saved. Click on "View Quote" to see
        the details.
      </p>
      <div className="itineraries-list-container">
        <table className="itineraries-table">
          <tbody>
            {itineraries.map((itinerary) => {
              const firstDay =
                itinerary.itinerary && itinerary.itinerary.length > 0
                  ? itinerary.itinerary[0]
                  : null;
              const city =
                firstDay && firstDay.places && firstDay.places.length > 0
                  ? firstDay.places[0].city
                  : "Unknown City";
              const numberOfDays = itinerary.itinerary
                ? itinerary.itinerary.length
                : 0;

              return (
                <tr key={itinerary._id} className="itinerary-row">
                  <td className="itinerary-text">
                    <h2 className="itinerary-title">
                      Your Trip is in {city} for {numberOfDays} days
                    </h2>
                  </td>
                  <td className="itinerary-button">
                    <button
                      className="view-quote-button"
                      onClick={() => handleItineraryClick(itinerary._id)}
                    >
                      View Quote
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItinerariesList;
