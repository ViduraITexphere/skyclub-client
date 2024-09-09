import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  IconUser,
  IconHeartHandshake,
  IconFriends,
  IconUsersGroup,
} from "@tabler/icons-react";
import "./People.css";

export function People() {
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Solo");
  console.log("selectedOprion:::", selectedOption);
  const [disableNext, setDisableNext] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const city = query.get("city") || "Default City";
  const totalDays = parseInt(query.get("totalDays"), 10) || 1;

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    if (option === "solo") {
      setPeopleCount(1);
      setDisableNext(false);
    } else if (option === "partner") {
      setPeopleCount(2);
      setDisableNext(false);
    } else {
      setPeopleCount(""); // Reset count when selecting friends or family
      setDisableNext(true);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPeopleCount(value);

    if (value > 0) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  };

  return (
    <Container fluid className="main-container">
      <div>
        <ProgressBar
          animated
          now={66.66}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "10",
            borderRadius: "0",
            height: "5px",
          }}
        />

        <h1 className="main-heading">How many people are traveling?</h1>
        <p className="sub-heading">
          Select the number of people you are traveling with to get the best
        </p>
        <Row>
          <Col
            className={`card-col ${
              selectedOption === "solo" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("solo")}
          >
            <IconUser className="icon-people" /> Going Solo
          </Col>
          <Col
            className={`card-col ${
              selectedOption === "partner" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("partner")}
          >
            <IconHeartHandshake className="icon-people" /> Partner
          </Col>
          <Col
            className={`card-col ${
              selectedOption === "friends" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("friends")}
          >
            <IconFriends className="icon-people" /> Friends
          </Col>
          <Col
            className={`card-col ${
              selectedOption === "family" ? "selected" : ""
            }`}
            onClick={() => handleOptionClick("family")}
          >
            <IconUsersGroup className="icon-people" /> Family
          </Col>
        </Row>

        {(selectedOption === "friends" || selectedOption === "family") && (
          <Row className="mt-3">
            <Col>
              <h2 className="input-heading">
                How many{" "}
                {selectedOption === "friends" ? "friends" : "family members"}{" "}
                are joining you? :
              </h2>
              <input
                type="number"
                min="1"
                className="form-control mt-2"
                placeholder={`Enter number of ${selectedOption}`}
                value={peopleCount}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
        )}
      </div>

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
        <Link to="/days">
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
        <Link
          to={{
            pathname: "/attractions",
            search: `?city=${city}&totalDays=${totalDays}&peopleCount=${peopleCount}&peopleName=${selectedOption}`,
          }}
        >
          <Button
            variant="dark"
            style={{
              backgroundColor: "#000",
              fontWeight: "bold",
              padding: "10px 60px",
              borderRadius: "50px",
            }}
            disabled={disableNext}
          >
            Next
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default People;
