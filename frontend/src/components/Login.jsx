import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAction = async (e) => {
    e.preventDefault();
    setError("");

    if (!userName.trim() || !password.trim()) {
      console.error("[Login][handleAction] Error: Please fill in all the fields.");
      setError("Please fill in all the fields.");
      return;
    }

    const url = `http://localhost:3000/api/users/${isLoginMode ? "login" : "register"}`;
    try {
      console.log("[Login][handleAction] Sending request to:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        console.error("[Login][handleAction] Error: Invalid credentials");
        throw new Error("Error: Invalid credentials");
      }

      const data = await response.json();
      console.log("[Login][handleAction] Login/Registration successful:", data);
      setUserId(data.userId);
      onLogin(userName, data.userId);
      navigate("/rooms");
    } catch (error) {
      console.error("[Login][handleAction] Error:", error.message || "Error: something went wrong.");
      setError(error.message || "Error: something went wrong.");
    }
  };

  const toggleMode = () => {
    console.log("[Login][toggleMode] Switching login mode:", isLoginMode);
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
        <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
        <button type="button" onClick={toggleMode}>
          {isLoginMode ? "I want to register" : "I already have an account"}
        </button>
        {error && <div className="alert">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
