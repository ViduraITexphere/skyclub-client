import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ProgressBar from "react-bootstrap/ProgressBar";

export function DaysPicker({ city }) {
  const [selected, setSelected] = useState([]);
  const [disableNext, setDisableNext] = useState(false);

  const handleSelect = (dates) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight to prevent any time comparison issues

    const hasPastDates = dates.some((date) => date < today);
    setDisableNext(hasPastDates);

    setSelected(dates);
  };

  const calculateTotalDays = (dates) => {
    if (dates && dates.length > 0) {
      const sortedDates = dates.sort((a, b) => a - b);
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];
      const dateRange = getDateRange(startDate, endDate);
      return { startDate, endDate, dateRange, totalDays: dateRange.length };
    }
    return { startDate: null, endDate: null, dateRange: [], totalDays: 0 };
  };

  const getDateRange = (startDate, endDate) => {
    const dateRange = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateRange;
  };

  const { startDate, endDate, totalDays } = calculateTotalDays(selected);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to midnight to prevent any time comparison issues

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <div>
        <ProgressBar
          animated
          now={66.66}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "1000",
            borderRadius: "0",
            height: "8px",
          }}
        />
        <h1
          className="text-center mb-4"
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            fontFamily: "Poppins",
          }}
        >
          When do you want to go?
        </h1>
        <Row className="justify-content-center">
          <Col xs="auto">
            <DayPicker
              mode="multiple"
              selected={selected}
              onSelect={handleSelect}
              disabled={{ before: today }} // Disable dates before today
            />
          </Col>
        </Row>
        <div className="text-center mt-4">
          {selected && selected.length > 0 ? (
            <>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    display: "inline-block",
                    color: "#000",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {totalDays} Days have been selected
                </div>
              </p>
              <p style={{ fontSize: "0.8rem", fontFamily: "Poppins" }}>
                {startDate.toDateString()} - {endDate.toDateString()}
              </p>
              <Link
                to={{
                  pathname: "/attractions",
                  search: `?city=${city}&totalDays=${totalDays}`,
                }}
              >
                <div
                  style={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "80px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "0 20px",
                  }}
                >
                  <Link to="/">
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#000",
                        fontWeight: "500",
                      }}
                    >
                      Back
                    </Button>
                  </Link>
                  <Button
                    variant="dark"
                    style={{
                      backgroundColor: "#000",
                      fontWeight: "bold",
                      padding: "10px 60px",
                      borderRadius: "50px",
                    }}
                    disabled={disableNext} // Disable button if past dates are selected
                  >
                    Next
                  </Button>
                </div>
              </Link>
            </>
          ) : (
            <p>No days selected yet</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default DaysPicker;
