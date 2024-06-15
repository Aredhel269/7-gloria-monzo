import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/Chat";
import Login from "./components/Login";

const socket = io("http://localhost:3000"); // o 3001??????????

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<
    { userName: string; message: string }[]
  >([]);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]);

  const handleLogin = (userNameFromLogin: string) => {
    setIsLoggedIn(true);
    setUserName(userNameFromLogin);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.emit("requestRoomList");

    const handleRoomList = (roomList: string[]) => {
      setRooms(roomList);
    };

    socket.on("roomList", handleRoomList);

    return () => {
      socket.off("roomList", handleRoomList);
    };
  }, []);

  const handleCreateRoom = () => {
    const roomName = prompt("Enter the room name:");
    if (roomName) {
      socket.emit("createRoom", roomName);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/chat" />
            )
          }
        />
        <Route
          path="/chat"
          element={
            <RoomList
              rooms={rooms}
              handleCreateRoom={handleCreateRoom}
              userName={userName}
            />
          }
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
