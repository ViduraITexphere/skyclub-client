import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "./Quote.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Quote() {
  const [itinerary, setItinerary] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    country: "",
  });
  const { itineraryId } = useParams();
  const token = localStorage.getItem("token");
  const googleId = localStorage.getItem("googleId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (itineraryId && token) {
      fetch(
        `https://skyclub-server-new.vercel.app/api/itinerary/${itineraryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched itinerary:", data);
          setItinerary(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching itinerary:", error);
          setLoading(false);
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

      fetch(
        "https://skyclub-server-new.vercel.app/api/itinerary/saveWithDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(combinedData),
        }
      )
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
          toast.success("Email sent successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  if (loading) {
    return (
      <div className="quote-container-loading">
        <img
          style={{
            height: "130px",
          }}
          src="/images/checklist.gif"
          alt="Loading..."
        />
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="err-msg">
        <p>No itineraries available.</p>
      </div>
    );
  }

  return (
    <div className="quote-container">
      <div className="quote-header">
        <h1 className="header-title">Your Itinerary</h1>
        <p>
          Below is the itinerary you requested. Please fill in your details and
          submit the form to receive a quote.
        </p>
      </div>
      <div className="quote-content">
        <div className="itinerary-section">
          {itinerary.itinerary.map((day, index) => (
            <div key={index} className="day-container">
              <h3 className="day-title">Day {day.day}</h3>
              <Accordion>
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Quote;
