import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityPicker from "./components/CityPicker";
import DaysPicker from "./components/DaysPicker";
import AttractionPicker from "./components/AttractionPicker";
import Itinerary from "./components/itinerary/Itinerary";

import "./App.css";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

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
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CityPicker setCity={setCity} />
            </ProtectedRoute>
          }
        />
        <Route path="/days" element={<DaysPicker city={city} />} />
        <Route path="/login" element={<Login />} />

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
