import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Carousel from "react-bootstrap/Carousel";
import Alert from "react-bootstrap/Alert";
import { setItinerary } from "../features/itinerary/itinerarySlice";
import "./Itinerary.css";
import Login from "../Auth/login/Login";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Itinerary({ data }) {
  const [itinerary, setItineraryState] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("googleId"))
  );
  console.log(localStorage.getItem("googleId")); // Should print the stored value

  console.log("isLoggedIn", isLoggedIn);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchedOnce = useRef(false);

  const googleId = localStorage.getItem("googleId");
  const userToken = localStorage.getItem("token");
  const parameters = { ...data, googleId };
  // console.log("parameters", parameters);

  const backendUrl =
    "https://skyclub-server-new.vercel.app/api/places/itinerary";

  // Effect to fetch itinerary data
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(backendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parameters),
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setItineraryState(data);
        } else {
          console.error("Unexpected data format:", data);
          setItineraryState([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
        setLoading(false);
      } finally {
      }
    };

    fetchItinerary();
  }, [parameters]);

  // Effect to fetch hotels data
  useEffect(() => {
    if (!parameters.city) return;

    const fetchHotels = async () => {
      const hotelUrl = `https://skyclub-server-new.vercel.app/api/places/hotels/${parameters.city}`;

      try {
        const response = await fetch(hotelUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setHotels(data);
        } else {
          console.error("Unexpected data format:", data);
          setHotels([]);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [parameters.city]);

  // Function to handle hotel selection
  const handleSelectHotel = (hotel) => {
    console.log(`Selected hotel: ${hotel.name}`);
    // You can handle the hotel selection logic here, e.g., displaying a confirmation message
  };

  // Function to save itinerary
  const saveItinerary = () => {
    if (!userToken || !googleId) return;

    const saveUrl = "https://skyclub-server-new.vercel.app/api/itinerary/save";
    const payload = { googleId, itinerary };

    fetch(saveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage("Your itinerary was successfully saved!");
        setIsSaved(true);
        dispatch(setItinerary({ itinerary, googleId }));

        setTimeout(() => {
          navigate("/itinerary-list");
        }, 2000);
      })
      .catch((error) => console.error("Error saving itinerary:", error));
  };

  // Effect to handle login state
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("googleId"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (itinerary.length === 0) {
    return (
      <div className="loading-container">
        {/* Replace with your loading spinner or animation */}
        <div className="loading-anim">
          <img
            style={{
              height: "130px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            src="/images/checklist.gif"
            alt="Loading..."
          />
          {/* <p>
            We're sorry, when you are refreshing the page itineraries clean up !
            <br />
            so please go back to the previous page and try again.
          </p>
          <Link to="/">
            <Button variant="primary">Back to Select City</Button>
          </Link> */}
          {!loading && itinerary.length === 0 && (
            <div>
              <p className="loading-text">
                No itinerary data available for this city.
              </p>
              <Link to="/">
                <Button variant="primary">Back to Select City</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="itinerary-container">
      <div className="itinerary-content">
        <h3 className="itinerary-subtitle  text-start">
          Your trip to {parameters.city} for {parameters.totalDays} days with{" "}
          {parameters.peopleNames}
        </h3>
        <div className="des">
          <p>
            Dambulla offers a mix of historic Buddhist temples, hidden gems, and
            delicious local cuisine for you to explore during your solo trip in
            September. You can visit ancient sites with intricate cave paintings
            and stunning views, sample traditional Sri Lankan dishes at local
            eateries, and uncover hidden treasures off the beaten path. This
            destination caters to your interests in must-see attractions, great
            food, hidden gems, and historic Buddhist temples, providing a
            well-rounded experience for your 4-day adventure.
          </p>
        </div>
        <div className="hotels-container text-start">
          <h3 className="section-title ">
            Places to stay in {parameters.city}
          </h3>
          <Swiper
            className="swiper-container"
            // install Swiper modules

            spaceBetween={20}
            slidesPerView={1.5}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {Array.isArray(hotels) && hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <SwiperSlide key={index}>
                  <div className="hotel-card">
                    <h4 className="hotel-name">{hotel.name}</h4>
                    <p className="hotel-description">{hotel.description}</p>
                    <p className="hotel-rating">
                      <strong>Rating:</strong> {hotel.rating}
                    </p>
                    {hotel.image && (
                      <div className="hotel-image">
                        {/* <img
                          src={`/images/${hotel.image}`}
                          alt={hotel.name}
                          className="d-block w-100 img-fluid rounded"
                        /> */}
                      </div>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => handleSelectHotel(hotel)}
                    >
                      Select Hotel
                    </Button>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No hotels available for this city.</p>
            )}
            ...
          </Swiper>
        </div>
        {Array.isArray(itinerary) && itinerary.length > 0 ? (
          itinerary.map((day, index) => (
            <div key={index} className="day-container">
              <h2 className="day-title  text-start">Day {day.day}</h2>
              <div className="places-container text-start">
                <h3 className="section-title ">Places to Visit</h3>
                {/* <Accordion defaultActiveKey={index === 0 ? "0" : null}> */}
                <Accordion>
                  {day.places.map((place, placeIndex) => (
                    <Accordion.Item
                      eventKey={placeIndex.toString()}
                      key={placeIndex}
                    >
                      <Accordion.Header>
                        <span className="item-number">{placeIndex + 1}</span>{" "}
                        <span className="item-name">{place.name}</span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="place-info">
                          <p>{place.description}</p>
                          <p>
                            <strong>City:</strong> {place.city}
                          </p>
                          {place.image && (
                            <div className="place-image">
                              <img
                                src={`/images/${place.image}`}
                                alt={place.name}
                                className="img-fluid rounded"
                              />
                            </div>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
              <div className="restaurants-container">
                <h3 className="section-title text-start">Restaurants</h3>
                <Accordion>
                  {day.restaurants.map((restaurant, restaurantIndex) => (
                    <Accordion.Item
                      eventKey={restaurantIndex.toString()}
                      key={restaurantIndex}
                    >
                      <Accordion.Header>
                        <span className="item-number">
                          {day.places.length + restaurantIndex + 1}
                        </span>{" "}
                        <span className="item-name">{restaurant.name}</span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="restaurant-info">
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
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary data available.</p>
        )}
      </div>

      <div className="action-container">
        <div className="back-button-container">
          <Link to="/days">
            <Button className="action-btn" variant="primary">
              Back to Attractions
            </Button>
          </Link>
        </div>
        <div className="save-button-container">
          {isSaved ? (
            <Link to="/itineraries">
              <Button className="action-btn" variant="info">
                See Itineraries
              </Button>
            </Link>
          ) : (
            <Button
              className="action-btn"
              variant="success"
              onClick={saveItinerary}
              disabled={!userToken || !googleId}
            >
              Save Itinerary
            </Button>
          )}
        </div>
        <div className="itinerary-list-button-container">
          <Link to="/itinerary-list">
            <Button
              className="action-btn"
              id="view-itinerary"
              variant="secondary"
              disabled={!userToken || !googleId}
            >
              View Saved Itineraries
            </Button>
          </Link>
        </div>

        {successMessage && (
          <Alert variant="success" className="mt-3">
            {successMessage}
          </Alert>
        )}
        {!isLoggedIn && (
          <div className="login-container-wrapper">
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Itinerary;
