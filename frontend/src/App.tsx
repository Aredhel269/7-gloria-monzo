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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userNameFromLogin: string) => {
    console.log("[App][handleLogin] User logged in:", userNameFromLogin);
    setIsLoggedIn(true);
    setUserName(userNameFromLogin);
  };

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
          element={<ChatRoom socket={socket} userName={userName} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
