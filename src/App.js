import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityPicker from "./components/CityPicker";
import DaysPicker from "./components/DaysPicker";
import AttractionPicker from "./components/AttractionPicker";
import Itinerary from "./components/itinerary/Itinerary";

import "./App.css";
import Header from "./components/header/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Quote from "./components/quote/Quote";
import ItinerariesList from "./components/itinerary/ItinerariesList";
import Account from "./pages/account/Account";
import People from "./components/People";
import Login from "./components/Auth/login/Login";
import AuthCheck from "./components/Auth/AuthCheck";
import PaymentPage from "./pages/payment/PaymentPage";
import SavedQuotes from "./pages/account/SavedQuotes";
import UserProfile from "./components/user/UserProfile";

function App() {
  const [city, setCity] = useState("");
  const [itineraryData, setItineraryData] = useState(null);

  const handleAttractionSubmit = (data) => {
    setItineraryData(data); // Store data in state
    // Optionally, perform any additional actions (e.g., navigate to itinerary page)
  };

  return (
    <div className="App">
      <Header />
      <AuthCheck />
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <CityPicker setCity={setCity} />
            // </ProtectedRoute>
          }
        />
        <Route path="/days" element={<DaysPicker city={city} />} />
        <Route path="/People" element={<People />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/saved-quotes" element={<SavedQuotes />} />
        <Route path="/quote/:itineraryId" element={<Quote />} />
        <Route path="/itinerary-list" element={<ItinerariesList />} />
        <Route path="/account" element={<Account />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route
          path="attractions"
          element={<AttractionPicker onSubmit={handleAttractionSubmit} />}
        />
        <Route path="itinerary" element={<Itinerary data={itineraryData} />} />
      </Routes>
    </div>
  );
}

export default App;
