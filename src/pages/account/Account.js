import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css'; // Ensure you create this CSS file

function Account() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      const googleId = localStorage.getItem('googleId');
      if (googleId) {
        try {
          const response = await axios.post('https://skyclub-server-new.vercel.app/api/itinerary/getAllQuotes', { googleId });
          setQuotes(response.data);
        } catch (error) {
          console.error('Error fetching quotes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-container">
      {quotes.map((quote, index) => (
        <div key={index} className="quote-card">
          <h1>Travel Service Quotation</h1>

          <div className="user-details">
            <h3>Bill To</h3>
            <p><strong>Name:</strong> {quote.userDetails.name}</p>
            <p><strong>Email:</strong> {quote.userDetails.email}</p>
            <p><strong>Phone:</strong> {quote.userDetails.phone}</p>
            <p><strong>Country:</strong> {quote.userDetails.country}</p>
          </div>

          <div className="cost-details">
            <h3>Cost Details</h3>
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
                    <td>${quote.cost.accommodationCost * (quote.cost.personCount || 1)}</td>
                  </tr>
                )}
                {quote.cost.flightTicketCost !== undefined && (
                  <tr>
                    <td>Flight Ticket</td>
                    <td>${quote.cost.flightTicketCost}</td>
                    <td>{quote.cost.personCount || 1}</td>
                    <td>${quote.cost.flightTicketCost * (quote.cost.personCount || 1)}</td>
                  </tr>
                )}
                {quote.cost.trainTicketCost !== undefined && (
                  <tr>
                    <td>Train Ticket</td>
                    <td>${quote.cost.trainTicketCost}</td>
                    <td>{quote.cost.personCount || 1}</td>
                    <td>${quote.cost.trainTicketCost * (quote.cost.personCount || 1)}</td>
                  </tr>
                )}
                {quote.cost.taxiRentalCost !== undefined && (
                  <tr>
                    <td>Taxi Rental</td>
                    <td>${quote.cost.taxiRentalCost}</td>
                    <td>{quote.cost.personCount || 1}</td>
                    <td>${quote.cost.taxiRentalCost * (quote.cost.personCount || 1)}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="summary-table">
              <table>
                <tbody>
                  <tr>
                    <td><strong>Subtotal:</strong></td>
                    <td>${quote.cost.subTotal}</td>
                  </tr>
                  <tr>
                    <td><strong>Tax:</strong></td>
                    <td>${quote.cost.tax}</td>
                  </tr>
                  <tr>
                    <td><strong>Total Cost:</strong></td>
                    <td>${quote.cost.totalCost}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Account;
