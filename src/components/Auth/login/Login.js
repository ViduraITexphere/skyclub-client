// // NEW LOGIN COMPONENT CODE

// import React, { useState } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // Correct the import
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const { credential } = credentialResponse;

//       // Step 1: Decode the Google token to get the user details
//       const decodedToken = jwtDecode(credential);
//       console.log("Decoded Token:", decodedToken);

//       // Step 2: Make a request to your backend with the token
//       const response = await axios.post(
//         "https://skyclub-server-new.vercel.app/api/auth/google",
//         { token: credential }
//       );

//       if (response.data) {
//         // Step 3: Save the token and user data to localStorage
//         localStorage.setItem("token", response.data.token);
//         console.log("data", response.data);

//         // Step 4: Save the Google ID
//         const googleId = decodedToken.sub; // `sub` is the Google ID in the decoded token
//         localStorage.setItem("googleId", googleId);
//         console.log("googleId", googleId);

//         // Step 5: Extract the user's avatar from the decoded token, or fetch it
//         let userAvatar = decodedToken.picture;
//         if (!userAvatar) {
//           // If no avatar in token, fetch it from Google UserInfo API
//           const userInfoResponse = await axios.get(
//             `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credential}`
//           );
//           userAvatar = userInfoResponse.data.picture;
//         }

//         localStorage.setItem("userAvatar", userAvatar);
//         console.log("User Avatar:", userAvatar);

//         // Step 6: Token is valid, redirect to the homepage
//         // navigate("/");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       setLoginError("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Sign In</h2>
//       <p>Sign in to your account</p>
//       <form className="login-form">
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {loginError && <p className="login-error">{loginError}</p>}
//         <button className="login-btn" type="submit">
//           Login
//         </button>
//         <p>
//           Don't have an account? <a href="/register">Register</a>
//         </p>

//         <p>Or</p>
//         <p>Sign in with Google</p>
//         <div className="google-login-container">
//           <GoogleOAuthProvider clientId="874892976318-boa6tptdvtnq2hqoam5rpti83rsjqn8r.apps.googleusercontent.com">
//             <GoogleLogin
//               className="google-login"
//               text="Login with Google"
//               logo_alignment="center"
//               size="large"
//               width={"300px"}
//               onSuccess={handleSuccess}
//               onError={() => {
//                 console.log("Login Failed");
//                 setLoginError("Google login failed. Please try again.");
//               }}
//             />
//           </GoogleOAuthProvider>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

// NEW LOGIN COMPONENT CODE

import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom"; // import useLocation
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // correct jwtDecode import
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // get the current location
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const decodedToken = jwtDecode(credential);

      const response = await axios.post(
        "https://skyclub-server-new.vercel.app/api/auth/google",
        { token: credential }
      );

      if (response.data) {
        // Save token and user data
        localStorage.setItem("token", response.data.token);
        const googleId = decodedToken.sub;
        localStorage.setItem("googleId", googleId);

        // Save user avatar
        let userAvatar = decodedToken.picture;
        if (!userAvatar) {
          const userInfoResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credential}`
          );
          userAvatar = userInfoResponse.data.picture;
        }
        localStorage.setItem("userAvatar", userAvatar);

        // Trigger re-render by dispatching a custom event
        window.dispatchEvent(new Event("avatarUpdate"));

        // Redirect based on the current path
        if (location.pathname === "/itinerary") {
          // If the user is on the /itinerary path, redirect them to the same page
          navigate("/itinerary");
        } else {
          // If not on /itinerary, redirect to homepage
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <p>Sign in to your account</p>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p className="login-error">{loginError}</p>}
        <button className="login-btn" type="submit">
          Login
        </button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>

        <p>Or</p>
        <p>Sign in with Google</p>
        <div className="google-login-container">
          <GoogleOAuthProvider clientId="874892976318-boa6tptdvtnq2hqoam5rpti83rsjqn8r.apps.googleusercontent.com">
            <GoogleLogin
              className="google-login"
              text="Login with Google"
              logo_alignment="center"
              size="large"
              width={"300px"}
              onSuccess={handleSuccess}
              onError={() => {
                console.log("Login Failed");
                setLoginError("Google login failed. Please try again.");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </form>
    </div>
  );
}

export default Login;
