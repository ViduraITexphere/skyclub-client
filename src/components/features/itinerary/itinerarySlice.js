import { createSlice } from "@reduxjs/toolkit";

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: {
    itinerary: null,
    googleId: null,
  },
  reducers: {
    setItinerary: (state, action) => {
      console.log("Setting itinerary with payload:", action.payload);
      state.itinerary = action.payload.itinerary;
      state.googleId = action.payload.googleId;
    },
    clearItinerary: (state) => {
      state.itinerary = null;
      state.googleId = null;
    },
  },
});

export const { setItinerary, clearItinerary } = itinerarySlice.actions;

export default itinerarySlice.reducer;
