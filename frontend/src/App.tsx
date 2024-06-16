import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/ChatRoom"; // Nom del fitxer canviat aquí
import Login from "./components/Login";

const socket = io("http://localhost:3000");

const App = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]);

  const handleLogin = (userNameFromLogin: string) => {
    setIsLoggedIn(true);
    setUserName(userNameFromLogin);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/rooms/allrooms")
      .then((response) => response.json())
      .then((data) => {
        const roomNames = data.map((room: { _roomName: string }) => room._roomName);
        setRooms(roomNames);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleCreateRoom = (roomName: string) => {
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
          element={<RoomList rooms={rooms} handleCreateRoom={handleCreateRoom} userName={userName} />}
        />
        <Route
          path="/chat/:roomId"
          element={<ChatRoom socket={socket} userName={userName} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
