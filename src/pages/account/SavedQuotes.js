import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SavedQuotes.css"; // Import the CSS file for styling
import Sidebar from "./Sidebar";

const SavedQuotes = () => {
  const [googleId, setGoogleId] = useState(null); // Store the Google ID from local storage
  const [pinnedQuotes, setPinnedQuotes] = useState([]); // Store fetched pinned quotes
  const [error, setError] = useState(""); // To store any error messages
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch Google ID from local storage on component mount and get all pinned quotes
  useEffect(() => {
    const storedGoogleId = localStorage.getItem("googleId");
    if (storedGoogleId) {
      setGoogleId(storedGoogleId);
      fetchPinnedQuotes(storedGoogleId);
    } else {
      setError("Google ID not found in local storage.");
    }
  }, []);

  // Function to fetch all pinned quotes related to the Google ID
  const fetchPinnedQuotes = async (googleId) => {
    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post(
        "http://localhost:5000/api/itinerary/getPinnedQuotes",
        { googleId: googleId } // Send Google ID in request body
      );

      setPinnedQuotes(response.data); // Store the fetched pinned quotes
    } catch (error) {
      setError(
        "Error fetching pinned quotes: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="saved-quotes-container">
        <h2>Pinned Quotes</h2>

        {/* Display any error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Display loading spinner or message */}
        {loading && <p className="loading-message">Loading...</p>}

        {/* Display the fetched pinned quotes */}
        {pinnedQuotes.length > 0
          ? pinnedQuotes.map((quote) => (
              <div key={quote._id} className="quote-card-pinned">
                <h3 className="quote-id-pinned">Quote ID: {quote._id}</h3>
                <div className="quote-details-pinned">
                  <div className="user-details-pinned">
                    <p>
                      <strong>User Name:</strong> {quote.userDetails.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {quote.userDetails.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {quote.userDetails.phone}
                    </p>
                    <p>
                      <strong>Country:</strong> {quote.userDetails.country}
                    </p>
                  </div>
                  <div className="cost-details-pinned">
                    <p>
                      <strong>Total Cost:</strong> $
                      {quote.cost.totalCost.toFixed(2)}
                    </p>
                    <p>
                      <strong>Accommodation Cost:</strong> $
                      {quote.cost.accommodationCost.toFixed(2)}
                    </p>
                    <p>
                      <strong>Flight Ticket Cost:</strong> $
                      {quote.cost.flightTicketCost.toFixed(2)}
                    </p>
                    <p>
                      <strong>Train Ticket Cost:</strong> $
                      {quote.cost.trainTicketCost.toFixed(2)}
                    </p>
                    <p>
                      <strong>Taxi Rental Cost:</strong> $
                      {quote.cost.taxiRentalCost.toFixed(2)}
                    </p>
                    <p>
                      <strong>Subtotal:</strong> $
                      {quote.cost.subTotal.toFixed(2)}
                    </p>
                    <p>
                      <strong>Tax:</strong> ${quote.cost.tax.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="itinerary-details">
                  <h4>Itinerary Details</h4>
                  {quote.itinerary.map((day, index) => (
                    <div key={index} className="day-details">
                      <h5>Day {day.day}</h5>
                      <div className="places">
                        <h6>Places</h6>
                        {day.places.map((place) => (
                          <div
                            key={`${place._id}-${index}`}
                            className="place-item"
                          >
                            <h6>{place.name}</h6>
                            <p>
                              <strong>City:</strong> {place.city}
                            </p>
                            <p>
                              <strong>Country:</strong> {place.country}
                            </p>
                            <p>
                              <strong>Description:</strong> {place.description}
                            </p>
                            <p>
                              <strong>Rating:</strong> {place.rating}
                            </p>
                            {/* Add image and other details as needed */}
                          </div>
                        ))}
                      </div>
                      <div className="restaurants">
                        <h6>Restaurants</h6>
                        {day.restaurants.map((restaurant) => (
                          <div
                            key={`${restaurant._id}-${index}`}
                            className="restaurant-item"
                          >
                            <h6>{restaurant.name}</h6>
                            <p>
                              <strong>City:</strong> {restaurant.city}
                            </p>
                            <p>
                              <strong>Country:</strong> {restaurant.country}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {restaurant.description}
                            </p>
                            <p>
                              <strong>Rating:</strong> {restaurant.rating}
                            </p>
                            {/* Add image and other details as needed */}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="divider" />
              </div>
            ))
          : !loading && (
              <p className="no-quotes">
                No pinned quotes found for this Google ID.
              </p>
            )}
      </div>
    </>
  );
};

export default SavedQuotes;
