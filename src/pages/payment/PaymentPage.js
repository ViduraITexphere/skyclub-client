import React from "react";
import { useLocation } from "react-router-dom"; // To get the passed state
import "./PaymentPage.css"; // Optional: Add CSS for styling

function PaymentPage() {
  const location = useLocation();
  const { quote } = location.state || {}; // Extract quote data from state

  if (!quote) {
    return <div>No payment details available</div>; // Handle missing data
  }

  return (
    <div className="payment-page">
      <h1>Payment Details</h1>
      <p>
        Please transfer the total amount to the bank account listed below to
        complete your booking.
      </p>

      <div className="payment-info">
        <h3>Bank Transfer Details</h3>
        <p>
          <strong>Bank Name:</strong> Your Bank Name
        </p>
        <p>
          <strong>Account Number:</strong> 123456789
        </p>
        <p>
          <strong>Account Name:</strong> Your Company Name
        </p>
        <p>
          <strong>Swift Code:</strong> ABCD1234
        </p>
        <p>
          <strong>Amount Due:</strong> ${quote.cost.totalCost}
        </p>
      </div>

      <div className="payment-summary">
        <h3>Summary of Your Booking</h3>
        <p>
          <strong>Destination:</strong> {quote.itinerary[0].places[0].city}
        </p>
        <p>
          <strong>Duration:</strong> {quote.itinerary.length} days
        </p>
        <p>
          <strong>Total Cost:</strong> ${quote.cost.totalCost}
        </p>
      </div>

      <div className="payment-instructions">
        <p>Please make the payment within the next 5 business days.</p>
        <p>
          After making the transfer, kindly send a confirmation email to
          payment@yourcompany.com with your booking details.
        </p>
      </div>
    </div>
  );
}

export default PaymentPage;
