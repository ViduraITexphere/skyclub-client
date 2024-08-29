import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "./Quote.css";

function Quote() {
  const [itinerary, setItinerary] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    country: "",
  });
  const { itineraryId } = useParams(); // Extract itineraryId from URL
  const token = localStorage.getItem("token");
  const googleId = localStorage.getItem("googleId");

  useEffect(() => {
    if (itineraryId && token) {
      // fetch(`http://localhost:5000/api/itinerary/${itineraryId}`, {
      fetch(`https://skyclub-server-new.vercel.app/api/itinerary/${itineraryId}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
  }, [itineraryId, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itinerary && googleId) {
      const combinedData = {
        googleId,
        itinerary: itinerary.itinerary,
        userDetails,
      };
  
      // fetch("http://localhost:5000/api/itinerary/saveWithDetails", {
      fetch("https://skyclub-server-new.vercel.app/api/itinerary/saveWithDetails",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(combinedData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data saved successfully:", data);
          // Send email
          return fetch("https://skyclub-server-new.vercel.app/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send email");
          }
          return response.json();
        })
        .then((emailResponse) => {
          console.log("Email sent successfully:", emailResponse);
          // Optionally redirect or show success message
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  

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
          <form className="quote-form" onSubmit={handleSubmit}>
            <label className="form-label">
              Name:
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Email:
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Message:
              <textarea
                name="message"
                value={userDetails.message}
                onChange={handleInputChange}
                className="form-textarea"
              ></textarea>
            </label>
            <label className="form-label">
              Phone:
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Country of origin:
              <input
                type="text"
                name="country"
                value={userDetails.country}
                onChange={handleInputChange}
                className="form-input"
              />
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
