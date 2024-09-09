// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; // Corrected import statement

// function useAuth() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve the token from localStorage
//     const token = localStorage.getItem("token");

//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token); // Decode the token
//         const currentTime = Date.now() / 1000;

//         if (decodedToken.exp < currentTime) {
//           console.log("Token expired, please log in again.");
//           localStorage.removeItem("token");
//           localStorage.removeItem("googleId");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         // Handle errors if the token is invalid or decoding fails
//         localStorage.removeItem("token");
//         localStorage.removeItem("googleId");
//         navigate("/login");
//       }
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);
// }

// export default useAuth;
