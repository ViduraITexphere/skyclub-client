import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import the Sidebar
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three dots icon
import "./Account.css";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function Account() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const [selectedQuote, setSelectedQuote] = useState(null); // Track selected quote
  const [openDialog, setOpenDialog] = useState(false); // State for delete confirmation dialog
  const [quoteToDelete, setQuoteToDelete] = useState(null); // Track the quote to be deleted
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false); // Track if the user is revising a quote
  const [revisedQuote, setRevisedQuote] = useState(""); // Track the revised quote text
  const [quoteToRevise, setQuoteToRevise] = useState(null); // Track which quote is being revised
  const [isRevising, setIsRevising] = useState(null);

  const openMenu = Boolean(anchorEl);

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

  const handleMenuOpen = (event, quote) => {
    setAnchorEl(event.currentTarget);
    setSelectedQuote(quote);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBookNow = (quote) => {
    // Navigate to the payment page with the selected quote
    navigate("/payment", { state: { quote } });
    handleMenuClose();
  };

  const handlePinQuote = async (quoteId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/itinerary/pinQuote/${quoteId}`
      );

      const updatedQuote = response.data;

      // Update the quotes state with the pinned quote
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote._id === updatedQuote._id ? updatedQuote : quote
        )
      );

      console.log("Quote pinned successfully");
    } catch (error) {
      console.error("Error pinning quote:", error);
    }
  };

  const handleDeleteQuote = (quoteId) => {
    setOpenDialog(true);
    setQuoteToDelete(quoteId);
    handleMenuClose();
  };

  const handleSelectQuote = (quote) => {
    console.log("Select quote:", quote);
    // Add your select quote logic here
    handleMenuClose();
  };

  // Revise quote logic
  const handleReviseQuote = (quote) => {
    setIsRevising(quote._id);
    setRevisedQuote(quote.revision || "");
    handleMenuClose(); // Close the menu after clicking Revise
  };

  const handleSubmitRevision = async () => {
    try {
      const updatedQuote = quotes.find((quote) => quote._id === isRevising);
      updatedQuote.revision = revisedQuote;

      await axios.put(
        `http://localhost:5000/api/itinerary/reviseQuote/${isRevising}`,
        updatedQuote
      );

      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote._id === isRevising ? updatedQuote : quote
        )
      );

      setIsRevising(null);
      setRevisedQuote("");
      console.log("Quote revised successfully");
    } catch (error) {
      console.error("Error revising quote:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/itinerary/deleteQuote/${quoteToDelete}`
      );
      setQuotes((prevQuotes) =>
        prevQuotes.filter((quote) => quote._id !== quoteToDelete)
      );
      console.log("Quote deleted successfully");
    } catch (error) {
      console.error("Error deleting quote:", error);
    } finally {
      setOpenDialog(false);
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

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
            <div className="user-details">
              <div className="quote-acc-header">
                <h3>Bill To</h3>

                <p>
                  <strong>
                    Your Trip is in {quote.itinerary[0].places[0].city} for{" "}
                    {quote.itinerary.length} days
                  </strong>
                </p>
                {/* Three dots menu for each quote card */}
                <IconButton
                  aria-label="more"
                  aria-controls={`menu-${index}`}
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e, quote)}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id={`menu-${index}`}
                  anchorEl={anchorEl}
                  open={openMenu && selectedQuote === quote}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": `menu-button-${index}`,
                  }}
                >
                  <MenuItem onClick={() => handleBookNow(quote)}>
                    Book Now
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteQuote(quote._id)}>
                    Delete Quote
                  </MenuItem>
                  <MenuItem onClick={() => handlePinQuote(quote._id)}>
                    Pin Quote
                  </MenuItem>

                  <MenuItem onClick={() => handleReviseQuote(quote)}>
                    Revise Quote
                  </MenuItem>
                </Menu>
              </div>

              {/* Supportive text */}
              <p>
                The following is the information of the person who requested the
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

            <div className="cost-details">
              <h3>Cost Details</h3>
              <p>
                The following is the cost details of the services requested{" "}
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
            <div key={index} className={` ${quote.revision ? "revised" : ""}`}>
              {/* Revised Indicator */}
              {quote.revision && (
                <div className="revised-indicator">Revised</div>
              )}

              <div className="user-details">
                {/* Existing user details code */}
              </div>

              <div className="cost-details">
                {/* Existing cost details code */}
              </div>
              {isRevising === quote._id && (
                <div className="revise-quote-form">
                  <textarea
                    value={revisedQuote}
                    onChange={(e) => setRevisedQuote(e.target.value)}
                    placeholder="Enter your revisions here"
                    rows="4"
                    className="revise-textarea"
                  />
                  <Button
                    onClick={handleSubmitRevision}
                    variant="contained"
                    color="primary"
                  >
                    Submit Revision
                  </Button>
                  <Button onClick={() => setIsRevising(null)} color="secondary">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this quote? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Account;
