import React, { useState } from "react";
import io from "socket.io-client";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import RoomList from "./components/RoomList";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { UserContext, UserContextType } from "./Context/UserContext";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const socket = io("http://localhost:3000");

const App: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserId = async (userName: string) => {
    if (!userName.trim()) {
      console.error("[App][fetchUserId] Error: userName cannot be empty");
      return null;
    }
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
    if (!userNameFromLogin.trim()) {
      console.error("[App][handleLogin] Error: userName cannot be empty");
      return;
    }
    console.log("[App][handleLogin] User logged in:", userNameFromLogin);
    const userId = await fetchUserId(userNameFromLogin);
    if (userId) {
      setIsLoggedIn(true);
      setUserName(userNameFromLogin);
      setUserId(userId);
      navigate("/rooms");
    }
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

  const loadUserData = async () => {
    try {
      // Carrega les dades de l'usuari des de la base de dades
      const user = await prisma.user.findFirst({ where: { userId: userId } });
      if (user) {
        setUserName(user.userName);
        setUserId(user.userId);
      }
    } catch (error) {
      console.error("[UserContext] Error loading user data:", error);
    }
  };

  const updateUserData = async () => {
    try {
      // Actualitza les dades de l'usuari a la base de dades
      await prisma.user.update({
        where: { userId: userId },
        data: { userName: userName },
      });
    } catch (error) {
      console.error("[UserContext] Error updating user data:", error);
    }
  };

  const userContextValue: UserContextType = {
    userName,
    userId,
    setUserName,
    setUserId,
    loadUserData,
    updateUserData,
  };

  return (
      <UserContext.Provider value={userContextValue}>
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
            element={<ChatRoom socket={socket} />}
          />
        </Routes>
      </UserContext.Provider>
  );
};

export default App;
