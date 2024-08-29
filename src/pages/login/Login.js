import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await axios.post(
        // "https://skyclub-server-new.vercel.app/api/auth/google",
        "https://skyclub-server-new.vercel.app/api/auth/google",
        { token: credential }
      );

      if (response.data) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);
        console.log("data", response.data);

        // Decode the JWT token to get user data
        const decodedToken = jwtDecode(response.data.token);
        console.log("decoded token data:", decodedToken);

        // Save googleId to localStorage
        localStorage.setItem("googleId", decodedToken.googleId);
        console.log("googleId", decodedToken.googleId);

        // Redirect to the root directory
        // navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="874892976318-boa6tptdvtnq2hqoam5rpti83rsjqn8r.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default Login;
