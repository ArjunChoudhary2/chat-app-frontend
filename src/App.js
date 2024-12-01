import React, { useState, useEffect } from "react";
import FirstTimeLoginModal from "./components/FirstTimeLoginModal";
import ProfileWidget from "./components/ProfileWidget";
import Search from "./components/Search";

const App = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [userProfile, setUserProfile] = useState(null); // Store user profile data

  // Check if the user is already logged in by checking localStorage or cookies
  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserProfile(parsedUser); // Load the saved profile from localStorage
    } else {
      setShowModal(true); // Show the modal if no profile is found
    }
  }, []);

  // Handle the profile creation after the user enters the details
  const handleSaveProfile = async (userData) => {
    try {
      const response = await fetch(
        "https://localhost:7037/api/Users/createProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      const createdProfile = await response.json(); // Response contains the created profile
      setUserProfile(createdProfile); // Save the profile to state
      localStorage.setItem("userProfile", JSON.stringify(createdProfile)); // Save profile to localStorage

      setShowModal(false); // Hide the modal once profile is created
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  // Handle login (existing user)
  const handleLogin = async (username) => {
    try {
      const response = await fetch(
        `https://localhost:7037/api/Users/search?query=${username}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Username not found");
      }

      const loggedInProfile = await response.json(); // Get the user profile
      if (loggedInProfile.length > 0) {
        setUserProfile(loggedInProfile[0]); // Store the first profile from the list
        localStorage.setItem("userProfile", JSON.stringify(loggedInProfile[0])); // Save the first profile to localStorage
        setShowModal(false); // Close the modal after login
      } else {
        throw new Error("No profiles found");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Username not found. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUserProfile(null); // Clear the user profile from state
    localStorage.removeItem("userProfile"); // Remove user profile from localStorage
    setShowModal(true); // Show the modal again after logging out (optional)
  };

  return (
    <div>
      {showModal && (
        <FirstTimeLoginModal onSave={handleSaveProfile} onLogin={handleLogin} />
      )}

      {/* User profile and logout button */}
      {userProfile && (
        <div className="user-profile relative">
          <ProfileWidget user={userProfile} />
          <div className="flex items-center justify-center p-4">
            <Search currentUser={userProfile}/>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded z-10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
