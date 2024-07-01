import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import "./Itinerary.css"; // Import your CSS file for styling

function Itinerary({ data }) {
  const [itinerary, setItinerary] = useState(null);
  const parameters = data;
  console.log("Itinerary parameters😀:", parameters);

  useEffect(() => {
    const backendUrl = "https://skyclub-server.vercel.app/api/places/itinerary";

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Itinerary Response:", data);
        setItinerary(data); // Set the itinerary state with the response data
      })
      .catch((error) => {
        console.error("Error fetching itinerary:", error);
        // Handle error
      });
  }, [data]);

  return (
    <div className="itinerary-container">
      <h1 className="itinerary-title">Your Itinerary</h1>
      <h3
        className="itinerary-subtitle"
        style={{
          fontSize: "1.7rem",
          fontWeight: "600",
          fontFamily: "Poppins",
        }}
      >
        Your trip to {parameters.city} for {parameters.totalDays} days with your
        partner
      </h3>
      {itinerary ? (
        itinerary.map((day, index) => (
          <div key={index} className="day-container">
            <h2 className="day-title">Day {day.day}</h2>
            <div className="places-container">
              <h3 className="section-title">Places to Visit</h3>
              <Accordion defaultActiveKey={index === 0 ? "0" : null}>
                {day.places.map((place, placeIndex) => (
                  <Accordion.Item
                    eventKey={placeIndex.toString()}
                    key={placeIndex}
                  >
                    <Accordion.Header>
                      <span className="item-number">{placeIndex + 1}</span>{" "}
                      {place.name}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="place-info">
                        <p>{place.description}</p>
                        <p>
                          <strong>City:</strong> {place.city}
                        </p>
                        {place.image && (
                          <div className="place-image">
                            <img
                              src={`/images/${place.image}`}
                              alt={place.name}
                              className="img-fluid rounded"
                            />
                          </div>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            <div className="restaurants-container">
              <h3 className="section-title">Restaurants</h3>
              <Accordion defaultActiveKey={index === 0 ? "0" : null}>
                {day.restaurants.map((restaurant, restaurantIndex) => (
                  <Accordion.Item
                    eventKey={restaurantIndex.toString()}
                    key={restaurantIndex}
                  >
                    <Accordion.Header>
                      <span className="item-number">
                        {day.places.length + restaurantIndex + 1}
                      </span>{" "}
                      {restaurant.name}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="restaurant-info">
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
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        ))
      ) : (
        <p>Loading itinerary...</p>
      )}
      <div className="back-button-container mt-3">
        <Link to="/days">
          <Button variant="primary">Back to Attractions</Button>
        </Link>
      </div>
    </div>
  );
}

export default Itinerary;
