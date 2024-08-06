import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./components/features/itinerary/itinerarySlice";

const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
    // other reducers
  },
});

export default store;
