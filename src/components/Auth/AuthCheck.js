// src/components/AuthCheck.js
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { isTokenExpired } from "../../utils/authUtils";

// const AuthCheck = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem("authToken");
//       if (token && isTokenExpired(token)) {
//         // Token has expired
//         localStorage.removeItem("token");
//         localStorage.removeItem("googleId");
//         localStorage.removeItem("userAvatar");
//         navigate("/login"); // Redirect to login page
//       }
//     };

//     // Check token expiration every minute (60000 ms)
//     const intervalId = setInterval(checkToken, 60000);

//     // Cleanup on component unmount
//     return () => clearInterval(intervalId);
//   }, [navigate]);

//   return null; // This component does not render anything
// };

// export default AuthCheck;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authUtils"; // Ensure this path is correct

const AuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("authToken");
      console.log("Checking token:", token);
      if (token && isTokenExpired(token)) {
        console.log("Token expired, redirecting to login.");
        // Token has expired
        localStorage.removeItem("authToken"); // Ensure this is consistent with the token stored
        localStorage.removeItem("googleId");
        localStorage.removeItem("userAvatar");
        navigate("/login"); // Redirect to login page
      }
    };

    // Initial check
    checkToken();

    // Check token expiration every minute (60000 ms)
    const intervalId = setInterval(checkToken, 60000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  return null; // This component does not render anything
};

export default AuthCheck;
