import React, { useState } from "react";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";

const socket = io("http://localhost:3000");

const App = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetchUserId = async (userName: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/userid/${userName}`);
      if (response.ok) {
        const { userId } = await response.json();
        return userId;
      } else {
        console.error("[App][fetchUserId] Error fetching user ID:", response.status);
        return null;
      }
    } catch (error) {
      console.error("[App][fetchUserId] Error:", error);
      return null;
    }
  };

  const handleLogin = async (userNameFromLogin: string) => {
    console.log("[App][handleLogin] User logged in:", userNameFromLogin);
    const userId = await fetchUserId(userNameFromLogin);
    if (userId) {
      setIsLoggedIn(true);
      setUserName(userNameFromLogin);
      setUserId(userId);
    }
  };
/*   const handleUserId= (userIdFromLogin: string) => {
    console.log("[App][handleUserId] User with Id in:", userIdFromLogin);
    setIsLoggedIn(true);
    setUserId(userIdFromLogin);
  }; */

  const handleLogout = () => {
    console.log("[App][handleLogout] User logged out:", userName);
    setIsLoggedIn(false);
    setUserName("");
  };

  const handleCreateRoom = (roomName: string) => {
    console.log("[App][handleCreateRoom] Creating new room:", roomName);
    socket.emit("createRoom", roomName);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/rooms" replace />}
        />
        <Route
          path="/rooms"
          element={<RoomList handleCreateRoom={handleCreateRoom} />}
        />
        <Route
          path="/chat/:roomName"
          element={<ChatRoom socket={socket} userName={userName} userId={userId} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
