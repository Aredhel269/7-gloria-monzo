import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login.jsx

const handleAction = async (e) => {
  e.preventDefault();
  setError("");

  if (!userName.trim() || !password.trim()) {
    setError("Please fill in all the fields.");
    return;
  }

  const url = `http://localhost:3000/api/users/${isLoginMode ? "login" : "register"}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }), // Use 'userName' instead of 'name'
    });

    if (!response.ok) {
      throw new Error("Error: Invalid credentials"); // Handle specific errors here
    }

    const data = await response.json();
    console.log("Response:", data); // Log the response from the server

    onLogin(userName);
    navigate("/chat");
  } catch (error) {
    console.error("Fetch error:", error);
    setError(error.message || "Error: something went wrong.");
  }
};


  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="login-container">
      <h2>{isLoginMode ? "Login" : "Register"}</h2>
      <form onSubmit={handleAction}>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isLoginMode ? "Login" : "Register"}
        </button>
        <button type="button" onClick={toggleMode}>
          {isLoginMode ? "I want to register" : "I already have an account"}
        </button>
        {error && <div className="alert">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
