import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile based on Google ID
  useEffect(() => {
    const googleId = localStorage.getItem("googleId");
    if (googleId) {
      fetchUserProfile(googleId);
    } else {
      setError("Google ID not found in local storage.");
    }
  }, []);

  // Function to fetch user profile
  const fetchUserProfile = async (googleId) => {
    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/profile/${googleId}`
      );
      setUserProfile(response.data);
      setFormData(response.data); // Initialize form data with user profile
    } catch (error) {
      setError(
        "Error fetching user profile: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const googleId = localStorage.getItem("googleId");

    try {
      await axios.put(
        `http://localhost:5000/api/user/profile/${googleId}`,
        formData
      );
      alert("Profile updated successfully!");
      fetchUserProfile(googleId); // Refresh the profile
    } catch (error) {
      setError(
        "Error updating user profile: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div>
      <h2>User Profile</h2>

      {/* Display any error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display loading spinner or message */}
      {loading && <p>Loading...</p>}

      {/* Display user profile and form */}
      {userProfile && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
