import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import "./Quote.css";

function Quote() {
  const [itinerary, setItinerary] = useState(null);
  const googleId = localStorage.getItem("googleId");

  useEffect(() => {
    if (googleId) {
      fetch("http://localhost:5000/api/itinerary/get", {
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
          console.log("Fetched itinerary:", data);
          setItinerary(data);
        })
        .catch((error) => {
          console.error("Error fetching itinerary:", error);
        });
    }
  }, [googleId]);

  if (!itinerary || !itinerary.itinerary) {
    return <p>No itinerary details available.</p>;
  }

  return (
    <div className="quote-container">
      <div className="quote-content">
        <div className="itinerary-section">
          <h1 className="itinerary-title">Your Itinerary</h1>
          {itinerary.itinerary.map((day, index) => (
            <div key={index} className="day-container">
              <h3 className="day-title">Day {day.day}</h3>
              <Accordion defaultActiveKey={index === 0 ? "0" : null}>
                {day.places.map((place, placeIndex) => (
                  <Accordion.Item
                    eventKey={placeIndex.toString()}
                    key={placeIndex}
                  >
                    <Accordion.Header className="accordion-header">
                      <span className="item-number">{placeIndex + 1}</span>{" "}
                      {place.name}
                    </Accordion.Header>
                    <Accordion.Body className="accordion-body">
                      <p>{place.description}</p>
                      <p>
                        <strong>City:</strong> {place.city}
                      </p>
                      {place.image && (
                        <div className="place-image">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="img-fluid rounded"
                          />
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
                {day.restaurants.map((restaurant, restaurantIndex) => (
                  <Accordion.Item
                    eventKey={(day.places.length + restaurantIndex).toString()}
                    key={restaurantIndex}
                  >
                    <Accordion.Header className="accordion-header">
                      <span className="item-number">
                        {day.places.length + restaurantIndex + 1}
                      </span>{" "}
                      {restaurant.name}
                    </Accordion.Header>
                    <Accordion.Body className="accordion-body">
                      <p>{restaurant.description}</p>
                      <p>
                        <strong>City:</strong> {restaurant.city}
                      </p>
                      {restaurant.image && (
                        <div className="restaurant-image">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="img-fluid rounded"
                          />
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
        <div className="user-info-section">
          <h2 className="user-info-title">User Information</h2>
          <p className="user-info-text">
            <strong>Google ID:</strong> {googleId || "Not available"}
          </p>
          <form className="quote-form">
            <label className="form-label">
              Name:
              <input type="text" className="form-input" />
            </label>
            <label className="form-label">
              Email:
              <input type="email" className="form-input" />
            </label>
            <label className="form-label">
              Message:
              <textarea className="form-textarea"></textarea>
            </label>
            <label className="form-label">
              Phone:
              <input type="tel" className="form-input" />
            </label>
            <label className="form-label">
              Country of origin:
              <input type="text" className="form-input" />
            </label>
            <button type="submit" className="form-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Quote;
