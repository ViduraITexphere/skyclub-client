import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import { setItinerary } from "../features/itinerary/itinerarySlice";
import "./Itinerary.css";
import Login from "../../pages/login/Login";

function Itinerary({ data }) {
  const [itinerary, setItineraryState] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const googleId = localStorage.getItem("googleId");
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (googleId) {
      setIsLoggedIn(true);
    }
  }, [googleId]);

  const parameters = { ...data, googleId };
  console.log("Itinerary parameters:", parameters);
  console.log("Itinerary data:", itinerary);

  useEffect(() => {
    const backendUrl =
      "https://skyclub-server-new.vercel.app/api/places/itinerary";

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    })
      .then((response) => response.json())
      .then((data) => {
        setItineraryState(data);
      })
      .catch((error) => console.error("Error fetching itinerary:", error));
  }, [parameters]);

  const saveItinerary = () => {
    if (!userToken || !googleId) return;

    // const saveUrl = "https://skyclub-server-new.vercel.app/api/itinerary/save";
    const saveUrl = "http://localhost:5000/api/itinerary/save";
    const payload = { googleId, itinerary };

    fetch(saveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage("Your itinerary was successfully saved!");
        // dispatch(setItinerary(itinerary)); // Save to Redux store
        dispatch(setItinerary({ itinerary, googleId }));
      })
      .catch((error) => console.error("Error saving itinerary:", error));
  };

  return (
    <div className="itinerary-container">
      <div className="itinerary-content">
        <h1 className="itinerary-title">Your Itinerary</h1>
        <h3 className="itinerary-subtitle">
          Your trip to {parameters.city} for {parameters.totalDays} days with
          your partner
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
      </div>
      <div className="action-container">
        <div className="back-button-container">
          <Link to="/days">
            <Button variant="primary">Back to Attractions</Button>
          </Link>
        </div>
        <div className="save-button-container">
          <Button
            variant="success"
            onClick={saveItinerary}
            disabled={!userToken || !googleId}
          >
            Save Itinerary
          </Button>
        </div>
        <Link to="/quote">
          <Button variant="info">Request a Quote</Button>
        </Link>

        {successMessage && (
          <Alert variant="success" className="mt-3">
            {successMessage}
          </Alert>
        )}
        {!isLoggedIn && (
          <div className="login-container">
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Itinerary;
