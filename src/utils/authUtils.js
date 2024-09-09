// // src/utils/authUtils.js
// import { jwtDecode } from "jwt-decode";

// export const isTokenExpired = (token) => {
//   try {
//     const decodedToken = jwtDecode(token);
//     const expirationTime = decodedToken.exp * 1; // Convert seconds to milliseconds
//     console.log(
//       "Token expiration time:",
//       new Date(expirationTime).toLocaleString()
//     );
//     const currentTime = Date.now();
//     return currentTime > expirationTime;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return true; // Assume expired if there's an error
//   }
// };

import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const oneMinuteInMilliseconds = 60 * 1000; // 60 seconds * 1000 milliseconds

    // Get the current time in milliseconds
    const currentTime = Date.now();

    // Set the expiration time to one minute from now
    const expirationTime = currentTime + oneMinuteInMilliseconds;

    // Convert current time and expiration time to readable date formats
    const currentReadableDate = new Date(currentTime).toLocaleString();
    const expirationReadableDate = new Date(expirationTime).toLocaleString();

    // Print both dates
    console.log("Current Time:", currentReadableDate);
    console.log(
      "Expiration Time (one minute from now):",
      expirationReadableDate
    );

    return currentTime > expirationTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Assume expired if there's an error
  }
};
