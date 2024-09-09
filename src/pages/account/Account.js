import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import the Sidebar
import "./Account.css";

function Account() {
  const [quotes, setQuotes] = useState([]);
  // console.log("quotes::", quotes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      const googleId = localStorage.getItem("googleId");
      if (googleId) {
        try {
          const response = await axios.post(
            "https://skyclub-server-new.vercel.app/api/itinerary/getAllQuotes",
            { googleId }
          );
          setQuotes(response.data);
        } catch (error) {
          console.error("Error fetching quotes:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-page">
      <Sidebar /> {/* Add Sidebar Component */}
      <div className="account-container">
        <div className="account-header">
          <h1>Travel Service Quotation</h1>
          <p>
            Here are your travel service quotations. Please review and let us
            know if you have any questions
          </p>
        </div>
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            {/* <div className="user-details">
              <h3>Bill To</h3>
              <p>
                <strong>Name:</strong> {quote.userDetails.name}
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
            </div> */}

            {/* /////////////////////////////////////////////// */}

            <div className="user-details">
              <div className="quote-header">
                <h3>Bill To</h3>

                <p>
                  <strong>
                    Your Trip is in {quote.itinerary[0].places[0].city} for{" "}
                    {quote.itinerary.length} days
                  </strong>
                </p>
              </div>

              {/* supportive text */}
              <p>
                the following is the information of the person who requested the
                quote
              </p>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                  </tr>
                </thead>

                <tbody>
                  {quote.userDetails.name !== undefined && (
                    <tr>
                      <td>{quote.userDetails.name}</td>
                      <td>{quote.userDetails.email}</td>
                      <td>{quote.userDetails.phone}</td>
                      <td>{quote.userDetails.country}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* //////////////////////////////////////////////// */}

            <div className="cost-details">
              <h3>Cost Details</h3>
              {/* supportive text */}
              <p>
                the following is the cost details of the services requested{" "}
              </p>
              <table className="cost-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Cost per Person</th>
                    <th>Persons</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.cost.accommodationCost !== undefined && (
                    <tr>
                      <td>Accommodation</td>
                      <td>${quote.cost.accommodationCost}</td>
                      <td>{quote.cost.personCount || 1}</td>
                      <td>
                        $
                        {quote.cost.accommodationCost *
                          (quote.cost.personCount || 1)}
                      </td>
                    </tr>
                  )}
                  {quote.cost.flightTicketCost !== undefined && (
                    <tr>
                      <td>Flight Ticket</td>
                      <td>${quote.cost.flightTicketCost}</td>
                      <td>{quote.cost.personCount || 1}</td>
                      <td>
                        $
                        {quote.cost.flightTicketCost *
                          (quote.cost.personCount || 1)}
                      </td>
                    </tr>
                  )}
                  {quote.cost.trainTicketCost !== undefined && (
                    <tr>
                      <td>Train Ticket</td>
                      <td>${quote.cost.trainTicketCost}</td>
                      <td>{quote.cost.personCount || 1}</td>
                      <td>
                        $
                        {quote.cost.trainTicketCost *
                          (quote.cost.personCount || 1)}
                      </td>
                    </tr>
                  )}
                  {quote.cost.taxiRentalCost !== undefined && (
                    <tr>
                      <td>Taxi Rental</td>
                      <td>${quote.cost.taxiRentalCost}</td>
                      <td>{quote.cost.personCount || 1}</td>
                      <td>
                        $
                        {quote.cost.taxiRentalCost *
                          (quote.cost.personCount || 1)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="summary-table">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Subtotal:</strong>
                      </td>
                      <td>${quote.cost.subTotal}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax:</strong>
                      </td>
                      <td>${quote.cost.tax}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Cost:</strong>
                      </td>
                      <td>${quote.cost.totalCost}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Account;
