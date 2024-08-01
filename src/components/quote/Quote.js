import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Quote.css"; // Import your new CSS file

function Quote(itinerary) {
  console.log("Itinerary:", itinerary);

  if (!itinerary || !itinerary.itinerary) {
    return <p>No itinerary details available.</p>;
  }

  return (
    <div className="quote-container">
      <h1 className="quote-title">Request a Quote</h1>
      <h2 className="quote-subtitle">Your Itinerary</h2>
      {itinerary.itinerary.map((day, index) => (
        <div key={index} className="day-container">
          <h3 className="day-title">Day {day.day}</h3>
          <Accordion defaultActiveKey={index === 0 ? "0" : null}>
            {day.places.map((place, placeIndex) => (
              <Accordion.Item eventKey={placeIndex.toString()} key={placeIndex}>
                <Accordion.Header className="accordion-header">
                  <span className="item-number">{placeIndex + 1}</span>{" "}
                  {place.name}
                </Accordion.Header>
                <Accordion.Body className="accordion-body">
                  <p>{place.description}</p>
                  <p>
                    <strong>City:</strong> {place.city}
                  </p>
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
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      ))}
      <div className="user-info">
        <h2 className="user-info-title">User Information</h2>
        <p className="user-info-text">
          <strong>Google ID:</strong>
        </p>
        {/* Display other user information if available */}
      </div>
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
        <button type="submit" className="form-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Quote;
