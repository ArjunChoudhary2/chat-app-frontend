import React, { useState } from "react";

const FirstTimeLoginModal = ({ onSave, onLogin }) => {
  const [username, setUsername] = useState("");
  const [moodStatus, setMoodStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false); // Toggle between sign up and login mode
  
  // Function to check if username exists
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(
        `https://localhost:7037/api/Users/search?query=${username}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("User not found"); // Username does not exist
      }

      return true; // Username exists
    } catch (error) {
      return false; // Username does not exist
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    // Check if the username already exists
    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
      setUsernameError("Username already exists. Please choose another or login.");
      setIsSubmitting(false);
      return;
    }

    // Proceed with saving the user profile if username doesn't exist
    alert("Username Accepted");
    const userData = { username, moodStatus };
    onSave(userData);
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
    const usernameExists = await checkUsernameExists(username);

    if (!usernameExists) {
      setUsernameError("Username not found. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // If username exists, log in the user
    console.log(onSave);
    onLogin(username);
  };

  return (
    <div className="modal bg-gray-500 h-screen w-screen flex justify-center items-center">
      <div className="modal-content bg-white w-[30vw] h-[47vh] p-4 rounded">
        <h2 className="text-center font-bold text-xl">
          Welcome to the Chat App!
        </h2>
        <p className="text-sm text-center py-3">
          {isLoginMode
            ? "Please enter your username to login."
            : "Please enter your username and mood status to get started."}
        </p>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input my-2 mx-5 p-2 border-2"
            disabled={isSubmitting}
          />
          {usernameError && <p className="text-red-500">{usernameError}</p>}

          {!isLoginMode && (
            <input
              type="text"
              placeholder="Enter your mood status"
              value={moodStatus}
              onChange={(e) => setMoodStatus(e.target.value)}
              className="input my-2 mx-5 p-2 border-2"
              disabled={isSubmitting}
            />
          )}
        </div>
        <div className="flex justify-end py-2 px-4">
          <button
            onClick={isLoginMode ? handleLogin : handleSave}
            disabled={isSubmitting}
            className="btn flex p-2 bg-blue-600 rounded text-white"
          >
            {isSubmitting ? "Processing..." : isLoginMode ? "Login" : "Save"}
          </button>
        </div>
        <div className="text-center mt-4">
          {isLoginMode ? (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setIsLoginMode(false)}
                className="text-blue-600 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsLoginMode(true)}
                className="text-blue-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstTimeLoginModal;
